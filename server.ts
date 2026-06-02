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
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "465"),
          secure: process.env.SMTP_SECURE !== "false", // defaults to true
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Start Lab Website" <${smtpUser}>`,
          to: "info@startlab.si",
          subject: subject,
          html: htmlContent,
        });
        console.log(`[Direct Email Sent] To: info@startlab.si | Subject: ${subject}`);
        return true;
      } catch (error) {
        console.error("SMTP direct send failed:", error);
        return false;
      }
    } else {
      console.warn("SMTP credentials not configured. Graceful fallback. Email simulated successfully:");
      console.log(`--- SIMULATED EMAIL SUBMISSION TO info@startlab.si ---`);
      console.log(`Subject: ${subject}`);
      console.log(`Content:\n${htmlContent.replace(/<[^>]*>/g, '')}`);
      console.log(`-----------------------------------------------------`);
      return false;
    }
  };

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
    const sent = await sendEmail(subject, html);
    res.json({ success: true, sent });
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
    const sent = await sendEmail(subject, html);
    res.json({ success: true, sent });
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
    const sent = await sendEmail(subject, html);
    res.json({ success: true, sent });
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
    const sent = await sendEmail(subject, html);
    res.json({ success: true, sent });
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
