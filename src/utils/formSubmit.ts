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
  formSubmitSubject: string
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
      return { success: false, error: errMsg };
    }
  } catch (fallbackError: any) {
    console.error("Direct client-side FormSubmit fallback failed as well:", fallbackError);
    return { success: false, error: fallbackError.message || "Failed to submit form" };
  }
}
