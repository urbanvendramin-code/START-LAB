/**
 * Unified form submission utility.
 * 
 * Submits form data to the Express backend API / Vercel Serverless Function
 * with direct Neoserv SMTP delivery to info@startlab.si (and urban.vendramin@gmail.com)
 * and persistent storage.
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string,
  formType?: string
): Promise<{ success: boolean; error?: string }> {
  // Ensure endpoints start with /api/
  const cleanEndpoint = endpoint.startsWith("/api") ? endpoint : `/api${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  try {
    const response = await fetch(cleanEndpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (result && result.success) {
          return { success: true };
        } else {
          return { 
            success: false, 
            error: result?.error || "Prišlo je do napake pri pošiljanju. Prosimo poskusite ponovno ali nam pišite na info@startlab.si." 
          };
        }
      }
      return { success: true };
    } else {
      let errMsg = `Napaka pri oddaji (${response.status}). Prosimo poskusite ponovno ali pišite na info@startlab.si.`;
      try {
        const errJson = await response.json();
        if (errJson?.error) errMsg = errJson.error;
      } catch {
        // use default error message
      }
      return { success: false, error: errMsg };
    }
  } catch (networkError: any) {
    console.error(`Povezava s strežnikom na ${cleanEndpoint} ni uspela:`, networkError);
    return {
      success: false,
      error: "Povezava s strežnikom ni uspela. Prosimo preverite internetno povezavo ali nas neposredno kontaktirajte na info@startlab.si."
    };
  }
}

/**
 * Builds a convenient mailto URL with pre-filled subject and body as guaranteed fallback
 */
export function buildMailtoUrl(to: string, subject: string, data: Record<string, any>): string {
  const lines = Object.entries(data)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${v}`);
  const body = lines.join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
