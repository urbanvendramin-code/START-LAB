/**
 * Unified form submission utility.
 * 
 * Submits to the secure Express backend on Cloud Run.
 * If that is unavailable or fails, it seamlessly falls back to FormSubmit.co.
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string
): Promise<{ success: boolean; error?: string }> {
  // Determine the correct backend API URL.
  // If we are on localhost/127.0.0.1 or already on Cloud Run, use relative path.
  // If we are on a static custom domain like startlab.si or Vercel, route directly to our Cloud Run backend!
  const isLocalOrDirect = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.endsWith(".run.app");

  const backendBase = isLocalOrDirect 
    ? "" 
    : "https://ais-pre-iqrm3rp3dtfktc6mqtwp3h-15790397287.europe-west3.run.app";

  const targetUrl = `${backendBase}${endpoint}`;

  console.log(`[FormSubmit] Initiating submission to target URL: ${targetUrl}`);

  // 1. Try sending to Express backend API (local or remote Cloud Run)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout for backend

    const response = await fetch(targetUrl, {
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
        if (result && typeof result === "object") {
          if (result.success) {
            console.log("[FormSubmit] Successfully sent via secure SMTP backend.");
            return { success: true };
          } else {
            console.warn("[FormSubmit] SMTP backend returned success=false, trying direct FormSubmit fallback...", result.error);
          }
        }
      } else {
        console.warn("[FormSubmit] SMTP backend returned non-JSON response, trying direct FormSubmit fallback...");
      }
    } else {
      console.warn(`[FormSubmit] SMTP backend returned status ${response.status}, trying direct FormSubmit fallback...`);
    }
  } catch (backendError: any) {
    console.warn(`[FormSubmit] Connection to backend at ${targetUrl} failed or timed out. Falling back to direct client-side FormSubmit:`, backendError);
  }

  // 2. Client-side FormSubmit Fallback
  // This executes when the Express server is not available or connection fails
  try {
    const payload: Record<string, any> = {
      _subject: formSubmitSubject,
      _template: "table",
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
      if (result && result.success === "false") {
        return { success: false, error: result.message || "FormSubmit rejected submission" };
      }
      console.log("[Client FormSubmit Success] Successfully dispatched form directly from browser.");
      return { success: true };
    } else {
      return { success: false, error: `FormSubmit HTTP error: ${response.status}` };
    }
  } catch (fallbackError: any) {
    console.error("Direct client-side FormSubmit fallback failed as well:", fallbackError);
    return { success: false, error: fallbackError.message || "Failed to submit form" };
  }
}
