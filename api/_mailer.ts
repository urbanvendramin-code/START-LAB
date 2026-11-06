import nodemailer from "nodemailer";

export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "eh3.neoserv.si",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
  user: process.env.SMTP_USER || "info@startlab.si",
  pass: process.env.SMTP_PASS || "SL2026##!go",
  recipients: ["info@startlab.si", "urban.vendramin@gmail.com"]
};

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

export async function sendMailNotification(params: {
  subject: string;
  html: string;
  replyTo?: string;
  senderName?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    const info = await transporter.sendMail({
      from: `"Start Lab Spletna Stran" <${SMTP_CONFIG.user}>`,
      to: SMTP_CONFIG.recipients,
      replyTo: params.replyTo ? `"${params.senderName || 'Pošiljatelj'}" <${params.replyTo}>` : SMTP_CONFIG.user,
      subject: params.subject,
      text: stripHtml(params.html),
      html: params.html,
      headers: {
        'X-Mailer': 'StartLab-Vercel-Engine',
        'X-Priority': '1'
      }
    });

    console.log(`[SMTP Mailer Sent] ${params.subject} -> ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[SMTP Mailer Error]", err);
    return { success: false, error: err.message || "Failed to send email via SMTP" };
  }
}

export async function parseRequestBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk: any) => { data += chunk; });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}
