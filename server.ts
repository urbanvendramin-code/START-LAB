import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON and form-urlencoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Helper function to send email via SMTP or fallback to console log
  const sendEmail = async (subject: string, htmlContent: string) => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const isSecure = process.env.SMTP_SECURE !== "false";
        console.log(`[SMTP Initiating] Host: ${smtpHost}, Port: ${smtpPort}, User: ${smtpUser}, Secure: ${isSecure}`);
        
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "465"),
          secure: isSecure, // defaults to true
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const info = await transporter.sendMail({
          from: `"Start Lab Website" <${smtpUser}>`,
          to: "info@startlab.si",
          subject: subject,
          html: htmlContent,
        });
        console.log(`[Direct Email Sent] To: info@startlab.si | MessageId: ${info.messageId} | Subject: ${subject}`);
        return { success: true };
      } catch (error: any) {
        console.error("SMTP direct send failed with full error:", error);
        return { success: false, error: error?.message || String(error) };
      }
    } else {
      console.warn("SMTP credentials not configured. Graceful fallback. Email simulated successfully:");
      console.log(`--- SIMULATED EMAIL SUBMISSION TO info@startlab.si ---`);
      console.log(`Subject: ${subject}`);
      console.log(`Content:\n${htmlContent.replace(/<[^>]*>/g, '')}`);
      console.log(`-----------------------------------------------------`);
      return { success: false, error: "Credentials missing in env" };
    }
  };

  // Run instant connection check on server startup to verify credentials & port settings
  const checkSmtpConnection = () => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const isSecure = process.env.SMTP_SECURE !== "false";
      console.log(`[SMTP Connection Diagnostic] Verifying connection to ${smtpHost}:${smtpPort} as ${smtpUser} ...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "465"),
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      transporter.verify((error) => {
        if (error) {
          console.error(`[SMTP Startup Diagnostic] ❌ Verification failed for ${smtpHost}:${smtpPort}!`, error);
        } else {
          console.log(`[SMTP Startup Diagnostic]  Verification verified successfully! SMTP server is ready.`);
        }
      });
    } else {
      console.warn("[SMTP Startup Diagnostic] No SMTP credentials provided in environment variables.");
    }
  };

  checkSmtpConnection();

  // API Call matching: Partner Form
  app.post("/api/contact/partner", async (req, res) => {
    const { company, email, coopType, message } = req.body;
    const subject = `Start Lab Partnerstvo - ${company}`;
    const html = `
      <h3>Spletni obrazec: Partnerstvo</h3>
      <p><strong>Organizacija:</strong> ${company}</p>
      <p><strong>E-pošta:</strong> ${email}</p>
      <p><strong>Izbira sodelovanja:</strong> ${coopType}</p>
      <p><strong>Sporočilo:</strong></p>
      <p style="white-space: pre-wrap;">${message || '/'}</p>
    `;
    const result = await sendEmail(subject, html);
    res.json({ success: result.success, error: result.error });
  });

  // API Call matching: Developer Form
  app.post("/api/contact/developer", async (req, res) => {
    const { devName, devEmail, devExpertise, devMessage } = req.body;
    const subject = `Start Lab Razvijalec Talentov - ${devName}`;
    const html = `
      <h3>Spletni obrazec: Razvijalec Talentov</h3>
      <p><strong>Ime in priimek:</strong> ${devName}</p>
      <p><strong>E-pošta:</strong> ${devEmail}</p>
      <p><strong>Strokovno področje:</strong> ${devExpertise}</p>
      <p><strong>Sporočilo:</strong></p>
      <p style="white-space: pre-wrap;">${devMessage || '/'}</p>
    `;
    const result = await sendEmail(subject, html);
    res.json({ success: result.success, error: result.error });
  });

  // API Call matching: Mentor Form
  app.post("/api/contact/mentor", async (req, res) => {
    const { mentorName, mentorEmail, mentorArea, mentorMessage } = req.body;
    const subject = `Start Lab Mentorstvo - ${mentorName}`;
    const html = `
      <h3>Spletni obrazec: Mentorstvo</h3>
      <p><strong>Ime in priimek:</strong> ${mentorName}</p>
      <p><strong>E-pošta:</strong> ${mentorEmail}</p>
      <p><strong>Strokovano področje:</strong> ${mentorArea}</p>
      <p><strong>Sporočilo:</strong></p>
      <p style="white-space: pre-wrap;">${mentorMessage || '/'}</p>
    `;
    const result = await sendEmail(subject, html);
    res.json({ success: result.success, error: result.error });
  });

  // API Call matching: General Contact Form
  app.post("/api/contact/general", async (req, res) => {
    const { name, email, message } = req.body;
    const subject = `Start Lab - Sporočilo od ${name}`;
    const html = `
      <h3>Spletni obrazec: Splošni kontakt</h3>
      <p><strong>Ime in priimek:</strong> ${name}</p>
      <p><strong>E-pošta:</strong> ${email}</p>
      <p><strong>Sporočilo:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `;
    const result = await sendEmail(subject, html);
    res.json({ success: result.success, error: result.error });
  });

  // Serve with Vite in dev, static built assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
