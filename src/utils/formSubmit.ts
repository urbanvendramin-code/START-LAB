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

// Mapping helper to convert developer keys into beautiful Slovenian labels for email notifications (used for FormSubmit fallback or logging).
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

// Netlify form name generator from target endpoint
function getNetlifyFormName(endpoint: string): string {
  if (endpoint.includes("partner")) return "partner";
  if (endpoint.includes("developer")) return "developer";
  if (endpoint.includes("mentor")) return "mentor";
  if (endpoint.includes("general")) return "general";
  if (endpoint.includes("newsletter") || endpoint.includes("news")) return "newsletter";
  if (endpoint.includes("workshop") || endpoint.includes("work")) return "workshop";
  return "general";
}

// URL-encoding helper for Netlify Forms
function encodeForm(data: Record<string, any>): string {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
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
            console.warn("[FormSubmit] Backend SMTP returned success=false. Trying fallback...");
          }
        }
      } else {
        console.warn(`[FormSubmit] Backend API returned HTTP ${response.status}. Trying fallback...`);
      }
    } catch (err: any) {
      console.warn("[FormSubmit] Connection to backend failed or timed out. Trying fallback...", err);
    }
  }

  // === PRODUCTION MODE (NETLIFY FORMS) ===
  // Submit securely to Netlify's native Form Processing Engine!
  const formName = getNetlifyFormName(apiEndpoint);
  console.log(`[NetlifyForms] Production Mode: Sending to Netlify Form "${formName}"`);

  const payload = {
    "form-name": formName,
    ...data
  };

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(payload)
    });

    if (response.ok) {
      console.log(`[NetlifyForms Success] Form "${formName}" successfully registered by Netlify!`);
      return { success: true };
    } else {
      throw new Error(`Netlify HTTP Error: ${response.status}`);
    }
  } catch (err: any) {
    console.warn("[NetlifyForms AJAX Failure] Background fetch failed (potentially blocked by strict adblock/privacy shields). Invoking standard HTML Form navigation Failsafe...", err);
    
    // === ULTIMATE FAILSAFE: STANDARD HTML FORM SUBMISSION TO NETLIFY ===
    // Since background AJAX/Fetch requests can be aggressively blocked by privacy extensions,
    // we dynamically generate a standard HTML <form> element and submit it.
    // Browsers process this as a standard page navigation POST request, which adblockers 
    // CANNOT block without completely breaking search engines and form logins.
    try {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/";
      form.style.display = "none";

      // Configure Netlify Identification
      const nameInput = document.createElement("input");
      nameInput.type = "hidden";
      nameInput.name = "form-name";
      nameInput.value = formName;
      form.appendChild(nameInput);

      // Add all key-value payload fields as input elements
      for (const [key, val] of Object.entries(data)) {
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
      console.error("[NetlifyForms Fallback Failure] Standard HTML Form POST submission failed:", fallbackErr);
      return { success: false, error: "Pošiljanje ni uspelo. Prosimo kontaktirajte nas direktno na info@startlab.si." };
    }
  }
}
