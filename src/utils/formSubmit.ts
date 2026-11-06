/**
 * Unified form submission utility powered by Web3Forms.
 * 
 * Directly submits form inquiries from the client's browser to Web3Forms
 * using the configured access key (d98ecf8a-06bf-4653-84ff-10be7613bf16).
 * 
 * Web3Forms routes all emails directly to the inbox that was registered 
 * when creating the access key (info@startlab.si).
 */

export const WEB3FORMS_ACCESS_KEY = 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) || 
  "d98ecf8a-06bf-4653-84ff-10be7613bf16";

export const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string,
  formType?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Primary: Direct Client-Side Web3Forms Submission
  // Web3Forms delivers messages to the email bound to the access key (info@startlab.si).
  try {
    const replyEmail = data.email || data.contactEmail || data.mail || undefined;
    const senderName = data.name || data.fullName || data.contactPerson || data.organizacija || undefined;

    const payload: Record<string, any> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: formSubmitSubject,
      from_name: senderName ? `${senderName} via Start Lab` : "Start Lab Obrazec",
      botcheck: "", // Honeypot spam protection
      ...data
    };

    if (replyEmail) {
      payload.replyto = replyEmail;
    }

    const response = await fetch(WEB3FORMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => null);

    if (response.ok && result && (result.success === true || result.success === "true")) {
      console.log("[Client Web3forms Success] Form successfully delivered via Web3forms.");

      // Asynchronously notify local backend if available (for server logging/analytics), without blocking user UI
      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, _web3formsDispatched: true })
        }).catch(() => {});
      }

      return { success: true };
    } else {
      const errMsg = result?.message || `Web3forms napaka: status ${response.status}`;
      console.warn("[Web3forms AJAX Warning] Response was not success:", errMsg);

      // If AJAX fetch is restricted or adblocker blocks cross-origin fetch, use HTML form POST fallback
      try {
        submitViaWeb3formsHTML(data, formSubmitSubject, formType);
        return { success: true };
      } catch (htmlErr) {
        return { success: false, error: errMsg };
      }
    }
  } catch (fallbackError: any) {
    console.warn("Direct Web3forms AJAX fetch error (e.g. adblocker). Triggering HTML form POST fallback...", fallbackError);
    try {
      submitViaWeb3formsHTML(data, formSubmitSubject, formType);
      return { success: true };
    } catch (htmlSubmitError: any) {
      console.error("Both AJAX and HTML form submissions failed:", htmlSubmitError);
      return { 
        success: false, 
        error: fallbackError.message || "Napaka pri oddaji obrazca preko Web3forms" 
      };
    }
  }
}

/**
 * Standard HTML form POST submission to Web3Forms.
 * Foolproof fallback that works even if client adblockers block AJAX fetch requests.
 */
export function submitViaWeb3formsHTML(data: Record<string, any>, subject: string, formType?: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = WEB3FORMS_API_URL;
  form.style.display = "none";

  // Access Key
  const accessKeyInput = document.createElement("input");
  accessKeyInput.type = "hidden";
  accessKeyInput.name = "access_key";
  accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
  form.appendChild(accessKeyInput);

  // Subject line
  const subjectInput = document.createElement("input");
  subjectInput.type = "hidden";
  subjectInput.name = "subject";
  subjectInput.value = subject;
  form.appendChild(subjectInput);

  // From Name
  const fromNameInput = document.createElement("input");
  fromNameInput.type = "hidden";
  fromNameInput.name = "from_name";
  fromNameInput.value = "Start Lab Spletna Stran";
  form.appendChild(fromNameInput);

  // Honeypot spam prevention
  const botcheckInput = document.createElement("input");
  botcheckInput.type = "checkbox";
  botcheckInput.name = "botcheck";
  botcheckInput.style.display = "none";
  form.appendChild(botcheckInput);

  // Redirect URL after submission to return user back to current page
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("submit_status", formType ? `success_${formType}` : "success");
  
  const redirectInput = document.createElement("input");
  redirectInput.type = "hidden";
  redirectInput.name = "redirect";
  redirectInput.value = currentUrl.toString();
  form.appendChild(redirectInput);

  // Form fields
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = typeof val === "object" ? JSON.stringify(val) : String(val);
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

// Backward-compatibility alias
export const submitViaFormSubmitHTML = submitViaWeb3formsHTML;
