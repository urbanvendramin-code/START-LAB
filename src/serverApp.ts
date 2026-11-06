import express from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Simple helper to strip HTML and format text elegantly for fallback email delivery
export const stripHtml = (htmlContent: string): string => {
  return htmlContent
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n=== $1 ===\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim()
    .replace(/\n{3,}/g, '\n\n');
};

export interface InquiryRecord {
  id: string;
  timestamp: number;
  date: string;
  formType: string;
  subject: string;
  senderName?: string;
  senderEmail?: string;
  phone?: string;
  content: string;
  emailDelivered: boolean;
  messageId?: string;
  error?: string;
}

export function createApiApp() {
  const app = express();

  // Normalize request URL for Vercel serverless rewrites
  app.use((req, res, next) => {
    const matchedPath = (req.headers["x-matched-path"] as string) || (req.headers["x-invoke-path"] as string);
    if (matchedPath && (req.url === "/" || req.url === "/api" || req.url === "")) {
      req.url = matchedPath;
    }
    next();
  });

  // Log incoming requests
  app.use((req, res, next) => {
    console.log(`[API Request] ${req.method} ${req.originalUrl || req.url}`);
    next();
  });

  // Enable CORS headers for cross-domain / preview safety
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // In-memory + file-based inquiry cache
  const inquiriesFile = path.join(process.cwd(), "inquiries.json");
  const inMemoryInquiries: InquiryRecord[] = [];

  const saveInquiry = (record: Omit<InquiryRecord, "id" | "timestamp" | "date">) => {
    try {
      const newEntry: InquiryRecord = {
        id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        ...record
      };

      inMemoryInquiries.unshift(newEntry);
      if (inMemoryInquiries.length > 200) inMemoryInquiries.pop();

      try {
        let list: InquiryRecord[] = [];
        if (fs.existsSync(inquiriesFile)) {
          try {
            list = JSON.parse(fs.readFileSync(inquiriesFile, "utf8"));
            if (!Array.isArray(list)) list = [];
          } catch {
            list = [];
          }
        }
        list.unshift(newEntry);
        if (list.length > 200) list = list.slice(0, 200);
        fs.writeFileSync(inquiriesFile, JSON.stringify(list, null, 2), "utf8");
      } catch (fileErr) {
        // Read-only filesystem in some serverless environments is normal
      }

      console.log(`[Inquiry Saved] ${newEntry.id} - ${newEntry.subject} (Delivered: ${newEntry.emailDelivered})`);
      return newEntry;
    } catch (saveErr) {
      console.error("[Inquiry Storage Error]", saveErr);
      return null;
    }
  };

  const sendEmail = async (
    subject: string, 
    htmlContent: string, 
    senderEmail?: string, 
    senderName?: string, 
    targetTo?: string,
    formType: string = "contact",
    phone?: string
  ): Promise<{ success: boolean; error?: string; messageId?: string }> => {
    const smtpHost = process.env.SMTP_HOST || "eh3.neoserv.si";
    const smtpPort = process.env.SMTP_PORT || "587";
    const smtpUser = process.env.SMTP_USER || "info@startlab.si";
    const smtpPass = process.env.SMTP_PASS || "SL2026##!go";

    const plainTextContent = stripHtml(htmlContent);

    // Primary recipients: Always deliver to info@startlab.si AND urban.vendramin@gmail.com
    const recipients = targetTo 
      ? [targetTo, "urban.vendramin@gmail.com"] 
      : ["info@startlab.si", "urban.vendramin@gmail.com"];

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const isSecure = process.env.SMTP_SECURE === "true" || smtpPort === "465";
        console.log(`[SMTP Sending] Host: ${smtpHost}:${smtpPort}, User: ${smtpUser}, Secure: ${isSecure}, To: ${recipients.join(', ')}`);

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: isSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000
        });

        const info = await transporter.sendMail({
          from: `"Start Lab Spletna Stran" <${smtpUser}>`,
          to: recipients,
          replyTo: senderEmail ? `"${senderName || 'Pošiljatelj'}" <${senderEmail}>` : smtpUser,
          subject: subject,
          text: plainTextContent,
          html: htmlContent,
          headers: {
            'X-Mailer': 'StartLab-Website-Engine',
            'X-Priority': '1'
          }
        });

        console.log(`[Direct Email Sent] MessageId: ${info.messageId} | Subject: ${subject}`);

        saveInquiry({
          formType,
          subject,
          senderName,
          senderEmail,
          phone,
          content: plainTextContent,
          emailDelivered: true,
          messageId: info.messageId
        });

        return { success: true, messageId: info.messageId };
      } catch (error: any) {
        console.error("[SMTP Send Failed]", error);
        
        saveInquiry({
          formType,
          subject,
          senderName,
          senderEmail,
          phone,
          content: plainTextContent,
          emailDelivered: false,
          error: error.message || "SMTP error"
        });

        return { 
          success: false, 
          error: `E-pošte ni bilo mogoče oddati: ${error.message || 'Neznana napaka'}. Sporočilo je varno zabeleženo.` 
        };
      }
    } else {
      console.warn("[SMTP Warning] No SMTP credentials. Storing inquiry.");
      saveInquiry({
        formType,
        subject,
        senderName,
        senderEmail,
        phone,
        content: plainTextContent,
        emailDelivered: false,
        error: "No SMTP credentials"
      });
      return { success: true, messageId: "saved_locally" };
    }
  };

  // --- ANALYTICS STORAGE ENGINE ---
  const analyticsFile = path.join(process.cwd(), "analytics.json");
  interface SessionRecord {
    sessionId: string;
    ipHash: string;
    firstSeen: number;
    lastSeen: number;
    durationSeconds: number;
    pages: { [path: string]: number };
    dateCreated: string;
  }

  let analyticsStore: { [sessionId: string]: SessionRecord } = {};

  try {
    if (fs.existsSync(analyticsFile)) {
      const raw = fs.readFileSync(analyticsFile, "utf8");
      analyticsStore = JSON.parse(raw);
    }
  } catch (err) {
    analyticsStore = {};
  }

  const saveAnalytics = () => {
    try {
      fs.writeFileSync(analyticsFile, JSON.stringify(analyticsStore, null, 2), "utf8");
    } catch (err) {
      // In serverless, filesystem may be read-only; in-memory store continues
    }
  };

  // --- CREATE ROUTER (Works with or without /api prefix) ---
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. Partner Form
  router.post("/contact/partner", async (req, res) => {
    try {
      const { company, name, email, message, subscribeToNewsletter } = req.body;
      const subject = `Start Lab Partnerstvo - ${company || name}`;
      const html = `
        <h3>Spletni obrazec: Partnerstvo</h3>
        <p><strong>Ime organizacije:</strong> ${company || '/'}</p>
        <p><strong>Ime in priimek:</strong> ${name}</p>
        <p><strong>E-pošta:</strong> ${email}</p>
        <p><strong>Prijava na novice:</strong> ${subscribeToNewsletter || 'NE'}</p>
        <p><strong>Sporočilo:</strong></p>
        <p style="white-space: pre-wrap;">${message || '/'}</p>
      `;
      const result = await sendEmail(subject, html, email, name || company, "info@startlab.si", "partner");
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[PARTNER ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 2. Developer Form
  router.post("/contact/developer", async (req, res) => {
    try {
      const { devCompany, devName, devEmail, devExpertise, devMessage, subscribeToNewsletter } = req.body;
      const subject = `Start Lab Razvijalec Talentov - ${devName}${devCompany ? ` (${devCompany})` : ''}`;
      const html = `
        <h3>Spletni obrazec: Razvijalec Talentov</h3>
        ${devCompany ? `<p><strong>Podjetje:</strong> ${devCompany}</p>` : ''}
        <p><strong>Ime in priimek:</strong> ${devName}</p>
        <p><strong>E-pošta:</strong> ${devEmail}</p>
        ${devExpertise ? `<p><strong>Izbira/Strokovnost:</strong> ${devExpertise}</p>` : ''}
        <p><strong>Prijava na novice:</strong> ${subscribeToNewsletter || 'NE'}</p>
        <p><strong>Sporočilo:</strong></p>
        <p style="white-space: pre-wrap;">${devMessage || '/'}</p>
      `;
      const result = await sendEmail(subject, html, devEmail, devName, "info@startlab.si", "developer");
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[DEVELOPER ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 3. Mentor Form
  router.post("/contact/mentor", async (req, res) => {
    try {
      const { mentorName, mentorEmail, mentorArea, mentorMessage, subscribeToNewsletter } = req.body;
      const subject = `Start Lab Mentorstvo - ${mentorName}`;
      const html = `
        <h3>Spletni obrazec: Mentorstvo</h3>
        <p><strong>Ime in priimek:</strong> ${mentorName}</p>
        <p><strong>E-pošta:</strong> ${mentorEmail}</p>
        <p><strong>Strokovno področje:</strong> ${mentorArea || '/'}</p>
        <p><strong>Prijava na novice:</strong> ${subscribeToNewsletter || 'NE'}</p>
        <p><strong>Sporočilo:</strong></p>
        <p style="white-space: pre-wrap;">${mentorMessage || '/'}</p>
      `;
      const result = await sendEmail(subject, html, mentorEmail, mentorName, "info@startlab.si", "mentor");
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[MENTOR ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 4. General Contact Form
  router.post("/contact/general", async (req, res) => {
    try {
      const { name, email, message, subscribeToNewsletter } = req.body;
      const subject = `Start Lab - Sporočilo od ${name}`;
      const html = `
        <h3>Spletni obrazec: Splošni kontakt</h3>
        <p><strong>Ime in priimek:</strong> ${name}</p>
        <p><strong>E-pošta:</strong> ${email}</p>
        <p><strong>Prijava na novice:</strong> ${subscribeToNewsletter || 'NE'}</p>
        <p><strong>Sporočilo:</strong></p>
        <p style="white-space: pre-wrap;">${message || '/'}</p>
      `;
      const result = await sendEmail(subject, html, email, name, "info@startlab.si", "general");
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[GENERAL CONTACT ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 5. Driving Simulator Booking Form
  router.post("/contact/simulator", async (req, res) => {
    try {
      const { ime, email, telefon, program, sporocilo, newsletter } = req.body;
      const subject = `Start Lab Simulator Vožnje - ${ime || 'Zainteresirani'} (${program || 'Program'})`;
      const html = `
        <h3>Spletni obrazec: Simulator varne in zabavne vožnje</h3>
        <p><strong>Ime in priimek:</strong> ${ime}</p>
        <p><strong>E-pošta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${telefon || '/'}</p>
        <p><strong>Izbrani program / vozilo:</strong> ${program || '/'}</p>
        <p><strong>Prijava na novice:</strong> ${newsletter || 'NE'}</p>
        <p><strong>Sporočilo / opombe:</strong></p>
        <p style="white-space: pre-wrap;">${sporocilo || '/'}</p>
      `;
      const result = await sendEmail(subject, html, email, ime, "info@startlab.si", "simulator", telefon);
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[SIMULATOR ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 6. Newsletter Subscription
  router.post("/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      const subject = `Nova naročnina na novice - Start Lab`;
      const html = `
        <h3>Prijava na novice: Bodi na tekočem</h3>
        <p>Prejeta je bila nova prijava na e-novosti Start Lab.</p>
        <p><strong>E-pošta:</strong> ${email}</p>
      `;
      const result = await sendEmail(subject, html, email, "Naročnik na novice", "info@startlab.si", "newsletter");
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[NEWSLETTER ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 7. Workshop Registration Form
  router.post("/workshop/register", async (req, res) => {
    try {
      const { name, email, phone, age, participantLanguage, workshopTitle, dateSelected, referralSource, note, subscribeToNewsletter, selectedGroup, workshopPrice } = req.body;
      const subject = `Prijava na delavnico: ${workshopTitle || 'Delavnica'} - ${name}`;
      const html = `
        <h3>Spletni obrazec: Prijava na delavnico</h3>
        <p><strong>Delavnica:</strong> ${workshopTitle || '/'}</p>
        <p><strong>Izbrani termin:</strong> ${dateSelected || '/'}</p>
        ${selectedGroup ? `<p><strong>Izbrana starostna skupina:</strong> ${selectedGroup}</p>` : ''}
        ${workshopPrice ? `<p><strong>Cena:</strong> ${workshopPrice}</p>` : ''}
        <p><strong>Ime in priimek udeleženca:</strong> ${name}</p>
        <p><strong>E-pošta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || '/'}</p>
        <p><strong>Starost:</strong> ${age || '/'}</p>
        <p><strong>Jezik udeleženca:</strong> ${participantLanguage || 'Slovenščina'}</p>
        ${referralSource ? `<p><strong>Izvedel/a za delavnico preko:</strong> ${referralSource}</p>` : ''}
        <p><strong>Prijava na novice:</strong> ${subscribeToNewsletter || 'NE'}</p>
        <p><strong>Opombe / sporočilo:</strong></p>
        <p style="white-space: pre-wrap;">${note || '/'}</p>
      `;
      const result = await sendEmail(subject, html, email, name, "info@startlab.si", "workshop", phone);
      res.json({ success: result.success, error: result.error, messageId: result.messageId });
    } catch (err: any) {
      console.error("[WORKSHOP REGISTRATION ENDPOINT ERROR]", err);
      res.status(500).json({ success: false, error: err.message || "Unknown error occurred" });
    }
  });

  // 8. Diagnostic Test Email Endpoint
  router.get("/contact/test-email", async (req, res) => {
    try {
      const result = await sendEmail(
        "Start Lab Diagnostični Preizkus: Delovanje SMTP e-pošte",
        `<h3>Preizkus e-poštnega sistema Start Lab</h3>
         <p>To je avtomatsko diagnostično sporočilo, ki potrjuje, da povezava z Neoserv SMTP strežnikom deluje brezhibno.</p>
         <p>Čas pošiljanja: <strong>${new Date().toLocaleString('sl-SI')}</strong></p>`,
        "info@startlab.si",
        "Start Lab Diagnostika",
        "info@startlab.si",
        "diagnostic"
      );
      res.json({ success: result.success, messageId: result.messageId, error: result.error, timestamp: new Date().toISOString() });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Storage Inspection Endpoint
  router.get("/contact/inquiries", (req, res) => {
    try {
      if (fs.existsSync(inquiriesFile)) {
        const raw = fs.readFileSync(inquiriesFile, "utf8");
        const list = JSON.parse(raw);
        return res.json({ success: true, count: list.length, inquiries: list });
      }
      res.json({ success: true, count: inMemoryInquiries.length, inquiries: inMemoryInquiries });
    } catch (err: any) {
      res.json({ success: true, count: inMemoryInquiries.length, inquiries: inMemoryInquiries });
    }
  });

  // 10. Analytics Track Endpoint
  router.post("/analytics/track", (req, res) => {
    try {
      const { sessionId, path: reqPath, duration, eventType } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: "Missing sessionId" });
      }

      const clientIp = ((req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1").split(",")[0].trim();
      const ipHash = Buffer.from(clientIp).toString("base64").substring(0, 10);
      const now = Date.now();
      const todayStr = new Date().toISOString().split("T")[0];

      let record = analyticsStore[sessionId];
      if (!record) {
        record = {
          sessionId,
          ipHash,
          firstSeen: now,
          lastSeen: now,
          durationSeconds: 0,
          pages: {},
          dateCreated: todayStr,
        };
        analyticsStore[sessionId] = record;
      }

      record.lastSeen = now;
      if (typeof duration === "number" && duration > record.durationSeconds) {
        record.durationSeconds = Math.min(duration, 86400);
      }

      const normalizedPath = reqPath || "/";
      if (eventType === "pageview" || !record.pages[normalizedPath]) {
        record.pages[normalizedPath] = (record.pages[normalizedPath] || 0) + 1;
      }

      saveAnalytics();
      res.json({ success: true });
    } catch (err: any) {
      console.error("[Analytics Track Error]", err);
      res.status(500).json({ error: "Failed to log event" });
    }
  });

  // 11. Analytics Stats Endpoint
  router.get("/analytics/stats", (req, res) => {
    try {
      const records = Object.values(analyticsStore);
      const totalVisitors = records.length;

      let totalPageviews = 0;
      let totalDurationSeconds = 0;
      const pageCounts: { [p: string]: number } = {};
      const dailyMap: { [date: string]: { visitors: Set<string>; pageviews: number; totalDuration: number } } = {};

      const now = Date.now();
      const twoMinutesAgo = now - 2 * 60 * 1000;
      let activeVisitors = 0;

      records.forEach((rec) => {
        totalDurationSeconds += rec.durationSeconds || 0;
        if (rec.lastSeen >= twoMinutesAgo) {
          activeVisitors++;
        }

        const dateKey = rec.dateCreated || new Date(rec.firstSeen).toISOString().split("T")[0];
        if (!dailyMap[dateKey]) {
          dailyMap[dateKey] = { visitors: new Set(), pageviews: 0, totalDuration: 0 };
        }
        dailyMap[dateKey].visitors.add(rec.sessionId);
        dailyMap[dateKey].totalDuration += rec.durationSeconds || 0;

        Object.entries(rec.pages || {}).forEach(([p, count]) => {
          totalPageviews += count;
          pageCounts[p] = (pageCounts[p] || 0) + count;
          dailyMap[dateKey].pageviews += count;
        });
      });

      const avgDurationSeconds = totalVisitors > 0 ? Math.round(totalDurationSeconds / totalVisitors) : 0;

      const topPages = Object.entries(pageCounts)
        .map(([p, views]) => ({ path: p, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      const dailyBreakdown = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const dayData = dailyMap[dateStr];
        const dayVisitors = dayData ? dayData.visitors.size : 0;
        const dayPageviews = dayData ? dayData.pageviews : 0;
        const dayAvgDuration = dayVisitors > 0 && dayData ? Math.round(dayData.totalDuration / dayVisitors) : 0;

        dailyBreakdown.push({
          date: dateStr,
          label: d.toLocaleDateString("sl-SI", { month: "short", day: "numeric" }),
          visitors: dayVisitors,
          pageviews: dayPageviews,
          avgDurationSeconds: dayAvgDuration,
        });
      }

      const gaId = process.env.VITE_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID || "";

      res.json({
        totalVisitors,
        totalPageviews,
        avgDurationSeconds,
        activeVisitors,
        topPages,
        dailyBreakdown,
        gaMeasurementId: gaId ? gaId.replace(/^(.{3}).*(.{3})$/, "$1***$2") : null,
        gaConfigured: Boolean(gaId && gaId.startsWith("G-")),
      });
    } catch (err: any) {
      console.error("[Analytics Stats Error]", err);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Mount the router under BOTH "/api" AND "/" so requests resolve regardless of Vercel prefix stripping
  app.use("/api", router);
  app.use("/", router);

  return app;
}
