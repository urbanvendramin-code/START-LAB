/**
 * Unified form submission utility for Start Lab.
 * 
 * DESIGN PRINCIPLE:
 * 1. If running in Development (localhost or AI Studio Cloud Run sandbox):
 *    It sends to the secure Express backend using neutral URLs (e.g., /api/submit-general)
 *    to bypass adblockers. This allows direct SMTP sending with server logs.
 * 
 * 2. If running in Production (GitHub Pages, Vercel, startlab.si):
 *    It sends via Ajax to FormSubmit.co (https://formsubmit.co/ajax/info@startlab.si).
 * 
 * 3. ULTIMATE FAILSAFE (For both Dev & Production):
 *    If any background network request (fetch) fails with "Failed to fetch" (which happens
 *    constantly if the user has an adblocker like uBlock Origin, Brave Shield, or AdBlock),
 *    the utility AUTOMATICALLY and instantly falls back to creating a hidden standard HTML <form>
 *    and submitting it via browser navigation to FormSubmit.co.
 *    Adblockers NEVER block standard HTML form navigations because doing so would break the internet.
 *    The form specifies "_next" as the current page, ensuring the user is redirected right back
 *    to where they were after a seamless dispatch.
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
  } else if (endpoint.includes("newsletter") || endpoint.includes("news")) {
    payload["Tip Obrazca"] = "Prijava na E-novice";
    payload["E-pošta"] = data.email || "/";
  } else if (endpoint.includes("workshop") || endpoint.includes("work")) {
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
): Promise<{ success: boolean; error?: string; redirected?: boolean }> {
  
  // Neutralize endpoint to bypass adblockers blocking words like "/contact" or "/register"
  let apiEndpoint = endpoint;
  if (endpoint === "/api/contact/partner") apiEndpoint = "/api/submit-partner";
  if (endpoint === "/api/contact/developer") apiEndpoint = "/api/submit-developer";
  if (endpoint === "/api/contact/mentor") apiEndpoint = "/api/submit-mentor";
  if (endpoint === "/api/contact/general") apiEndpoint = "/api/submit-general";
  if (endpoint === "/api/newsletter/subscribe") apiEndpoint = "/api/submit-news";
  if (endpoint === "/api/workshop/register") apiEndpoint = "/api/submit-work";

  const isLocalOrSandbox = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.endsWith(".run.app");

  if (isLocalOrSandbox) {
    // === DEVELOPMENT / SANDBOX MODE ===
    // Submit to our local Express SMTP backend
    console.log(`[FormSubmit] Dev Mode: Sending to Express backend API endpoint: ${apiEndpoint}`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

      const response = await fetch(apiEndpoint, {
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
  console.log("[FormSubmit] Dispatching directly to FormSubmit.co...");
  
  const payload = getFriendlyPayload(apiEndpoint, data, formSubmitSubject);

  try {
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
        throw new Error(result.message || "FormSubmit service rejected the message.");
      }
      console.log("[FormSubmit Success] Message successfully dispatched to info@startlab.si via direct browser pipeline!");
      return { success: true };
    } else {
      throw new Error(`FormSubmit HTTP Error: ${response.status}`);
    }
  } catch (err: any) {
    console.warn("[FormSubmit AJAX Failure] Background fetch failed (potentially blocked by adblocker). Invoking ULTIMATE HTML Form Failsafe...", err);
    
    // === ULTIMATE FAILSAFE: STANDARD HTML FORM SUBMISSION ===
    // Since background AJAX/Fetch requests to formsubmit.co can be aggressively blocked
    // by privacy shields or adblockers, we dynamically generate a standard HTML <form> element 
    // and submit it. Browsers process this as a standard page navigation POST request, 
    // which adblockers CANNOT block without completely breaking standard HTML websites.
    try {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://formsubmit.co/info@startlab.si";
      form.style.display = "none";

      // Configure a redirect back to the current page after submission completes
      const nextInput = document.createElement("input");
      nextInput.type = "hidden";
      nextInput.name = "_next";
      nextInput.value = window.location.href;
      form.appendChild(nextInput);

      // Add all key-value payload fields as input elements
      for (const [key, val] of Object.entries(payload)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = typeof val === "object" ? JSON.stringify(val) : String(val);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      
      // Return success because the form is actively submitting and page will navigate
      return { success: true, redirected: true };
    } catch (fallbackErr: any) {
      console.error("[FormSubmit Fallback Failure] Standard HTML Form POST submission failed:", fallbackErr);
      return { success: false, error: "Pošiljanje ni uspelo. Prosimo kontaktirajte nas direktno na info@startlab.si." };
    }
  }
}
