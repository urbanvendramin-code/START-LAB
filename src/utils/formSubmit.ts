/**
 * Unified form submission utility for Start Lab.
 * 
 * DESIGN PRINCIPLE:
 * 1. If running in Development (localhost or AI Studio Cloud Run sandbox):
 *    It sends to the secure Express backend (`server.ts`). This allows direct SMTP sending 
 *    with server logs, falling back to FormSubmit.co if SMTP fails.
 * 
 * 2. If running in Production (GitHub Pages, Vercel, startlab.si):
 *    It bypasses the temporary development sandbox completely and sends directly from the client 
 *    to FormSubmit.co (https://formsubmit.co/ajax/info@startlab.si). This is 100% reliable, serverless,
 *    eliminates CORS issues, avoids 500/503 sandbox offline errors, and ensures forms work forever.
 */

// Mapping helper to convert developer keys into beautiful Slovenian labels for email notifications.
function getFriendlyPayload(endpoint: string, data: Record<string, any>, subject: string): Record<string, any> {
  const payload: Record<string, any> = {
    _subject: subject,
    _template: "table",
  };

  if (endpoint.includes("partner")) {
    payload["Tip Obrazca"] = "Partnerstvo / Sodelovanje";
    payload["Ime Podjetja"] = data.company || "/";
    payload["Ime in Priimek"] = data.name || "/";
    payload["E-pošta"] = data.email || "/";
    payload["Sporočilo"] = data.message || "/";
  } else if (endpoint.includes("developer")) {
    payload["Tip Obrazca"] = "Razvijalec Talentov";
    payload["Podjetje"] = data.devCompany || "/";
    payload["Ime in Priimek"] = data.devName || "/";
    payload["E-pošta"] = data.devEmail || "/";
    payload["Strokovnost / Področje"] = data.devExpertise || "/";
    payload["Sporočilo"] = data.devMessage || "/";
  } else if (endpoint.includes("mentor")) {
    payload["Tip Obrazca"] = "Mentorstvo";
    payload["Ime in Priimek"] = data.mentorName || "/";
    payload["E-pošta"] = data.mentorEmail || "/";
    payload["Področje Mentorstva"] = data.mentorArea || "/";
    payload["Sporočilo"] = data.mentorMessage || "/";
  } else if (endpoint.includes("general")) {
    payload["Tip Obrazca"] = "Splošni Kontakt";
    payload["Ime in Priimek"] = data.name || "/";
    payload["E-pošta"] = data.email || "/";
    payload["Sporočilo"] = data.message || "/";
  } else if (endpoint.includes("newsletter")) {
    payload["Tip Obrazca"] = "Prijava na E-novice";
    payload["E-pošta"] = data.email || "/";
  } else if (endpoint.includes("workshop")) {
    payload["Tip Obrazca"] = "Prijava na Delavnico";
    payload["Naziv Delavnice"] = data.workshopTitle || "/";
    payload["Izbrani Termin"] = data.dateSelected || "/";
    payload["Ime in Priimek"] = data.name || "/";
    payload["E-pošta"] = data.email || "/";
    payload["Telefon"] = data.phone || "/";
    payload["Starost"] = data.age || "/";
    payload["Opombe"] = data.note || "/";
  } else {
    // Generic fallback mapping
    Object.assign(payload, data);
  }

  return payload;
}

export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string
): Promise<{ success: boolean; error?: string }> {
  const isLocalOrSandbox = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.endsWith(".run.app");

  if (isLocalOrSandbox) {
    // === DEVELOPMENT / SANDBOX MODE ===
    // Submit to our local Express SMTP backend
    console.log(`[FormSubmit] Dev Mode: Sending to Express backend API endpoint: ${endpoint}`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          if (result && result.success) {
            console.log("[FormSubmit] Successfully sent via secure backend SMTP.");
            return { success: true };
          } else {
            console.warn("[FormSubmit] Backend SMTP returned success=false. Trying browser FormSubmit.co fallback...", result?.error);
          }
        }
      } else {
        console.warn(`[FormSubmit] Backend API returned HTTP ${response.status}. Trying browser FormSubmit.co fallback...`);
      }
    } catch (err: any) {
      console.warn("[FormSubmit] Connection to backend failed or timed out. Trying browser FormSubmit.co fallback...", err);
    }
  }

  // === PRODUCTION MODE (GitHub Pages, Vercel, startlab.si) ===
  // OR fallback mode if local backend failed or timed out.
  // Direct client-to-email form submission via FormSubmit.co!
  console.log("[FormSubmit] Dispatching directly to FormSubmit.co for maximum speed and production reliability.");
  
  try {
    const payload = getFriendlyPayload(endpoint, data, formSubmitSubject);

    const response = await fetch("https://formsubmit.co/ajax/info@startlab.si", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      if (result && result.success === "false") {
        return { success: false, error: result.message || "FormSubmit service rejected the message." };
      }
      console.log("[FormSubmit Success] Message successfully dispatched to info@startlab.si via direct browser pipeline!");
      return { success: true };
    } else {
      return { success: false, error: `FormSubmit HTTP Error: ${response.status}` };
    }
  } catch (err: any) {
    console.error("[FormSubmit Failure] Direct dispatch failed:", err);
    return { success: false, error: err.message || "Interne težave s povezavo do poštnega strežnika." };
  }
}
