/**
 * Unified form submission utility.
 * 
 * Submits form data to the Express backend API with direct Neoserv SMTP delivery
 * to info@startlab.si and persistent database storage.
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, any>,
  formSubmitSubject: string,
  formType?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Send to Express backend API
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
    console.error(`Povezava s strežnikom na ${endpoint} ni uspela:`, networkError);
    return {
      success: false,
      error: "Povezava s strežnikom ni uspela. Prosimo preverite internetno povezavo ali nas neposredno kontaktirajte na info@startlab.si."
    };
  }
}


