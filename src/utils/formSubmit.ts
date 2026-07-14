/**
 * Unified form submission utility.
 * 
 * First tries to submit to the local Express backend endpoint.
 * If that fails (e.g., when hosted as a static site on GitHub Pages),
 * it seamlessly falls back to submitting directly from the client's browser
 * to FormSubmit.co, ensuring email delivery to info@startlab.si.
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string,
  formType?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Try sending to local Express backend API
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (result && typeof result === "object") {
          // If server successfully handled or returned simulated success
          if (result.success) {
            return { success: true };
          } else {
            // Server returned error, let's try direct client-side fallback
            console.warn("Express backend returned success=false, trying direct FormSubmit fallback...", result.error);
          }
        }
      } else {
        console.warn("Express backend returned non-JSON response, trying direct FormSubmit fallback...");
      }
    } else {
      console.warn(`Express backend returned status ${response.status}, trying direct FormSubmit fallback...`);
    }
  } catch (backendError) {
    console.warn(`Local backend submission to ${endpoint} failed (expected on GitHub Pages). Falling back to direct client-side FormSubmit:`, backendError);
  }

  // 2. Client-side FormSubmit Fallback
  // This executes when the Express server is not available (e.g. deployed to static GitHub Pages)
  try {
    // Map fields cleanly
    const payload: Record<string, any> = {
      _subject: formSubmitSubject,
      _template: "table", // Nice tables in FormSubmit emails
      ...data
    };

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
      if (result && (result.success === "false" || result.success === false)) {
        let errMsg = result.message || "FormSubmit rejected submission";
        if (errMsg.toLowerCase().includes("activate") || errMsg.toLowerCase().includes("confirm")) {
          errMsg = "Aktivacija e-pošte je potrebna: Na naslov info@startlab.si je bil poslan aktivacijski mail s strani FormSubmit.co. Prosimo, odprite vaš poštni predal in potrdite aktivacijo, da bo obrazec začel delovati.";
        }
        return { success: false, error: errMsg };
      }
      console.log("[Client FormSubmit Success] Successfully dispatched form directly from browser.");
      return { success: true };
    } else {
      let errMsg = `FormSubmit HTTP error: ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson && errorJson.message) {
          errMsg = errorJson.message;
          if (errMsg.toLowerCase().includes("activate") || errMsg.toLowerCase().includes("confirm")) {
            errMsg = "Aktivacija e-pošte je potrebna: Na naslov info@startlab.si je bil poslan aktivacijski mail s strani FormSubmit.co. Prosimo, odprite vaš poštni predal in potrdite aktivacijo, da bo obrazec začel delovati.";
          }
        }
      } catch (e) {
        // failed to parse JSON, use status code
      }
      
      // Try HTML Form submit if we got an error response
      console.warn("AJAX FormSubmit returned error status. Triggering robust HTML Form submit fallback...");
      submitViaFormSubmitHTML(data, formSubmitSubject, formType);
      return { success: true };
    }
  } catch (fallbackError: any) {
    console.error("Direct client-side FormSubmit fallback failed as well, trying robust HTML form submit navigation...", fallbackError);
    try {
      submitViaFormSubmitHTML(data, formSubmitSubject, formType);
      return { success: true };
    } catch (htmlSubmitError: any) {
      console.error("Absolute failure: Both AJAX and HTML form submissions failed.", htmlSubmitError);
      return { success: false, error: fallbackError.message || "Failed to submit form" };
    }
  }
}

/**
 * Standard, foolproof HTML form POST submission.
 * This can never be blocked by ad-blockers, tracking protection, or CORS.
 */
export function submitViaFormSubmitHTML(data: Record<string, any>, subject: string, formType?: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://formsubmit.co/info@startlab.si";
  form.style.display = "none";

  // Subject line
  const subjectInput = document.createElement("input");
  subjectInput.type = "hidden";
  subjectInput.name = "_subject";
  subjectInput.value = subject;
  form.appendChild(subjectInput);

  // Layout template
  const templateInput = document.createElement("input");
  templateInput.type = "hidden";
  templateInput.name = "_template";
  templateInput.value = "table";
  form.appendChild(templateInput);

  // Redirect URL after submission to redirect the user back to the current page
  const nextInput = document.createElement("input");
  nextInput.type = "hidden";
  nextInput.name = "_next";
  
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("submit_status", formType ? `success_${formType}` : "success");
  nextInput.value = currentUrl.toString();
  form.appendChild(nextInput);

  // Form fields
  Object.entries(data).forEach(([key, val]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = typeof val === "object" ? JSON.stringify(val) : String(val);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

