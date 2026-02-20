import { GOOGLE_SCRIPT_URL } from "./config";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Submits form data to Google Apps Script via a hidden form + iframe.
 * This bypasses CORS entirely since form submissions aren't subject to CORS.
 */
export function submitForm(
  data: FormData,
  source: "lead_capture" | "contact_page"
): Promise<SubmitResult> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      cleanup();
      resolve({ success: false, error: "Request timed out. Please try again." });
    }, 10000);

    const iframeName = `__submit_frame_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = GOOGLE_SCRIPT_URL;
    form.target = iframeName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message || "",
      source,
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);

    const cleanup = () => {
      clearTimeout(timeout);
      iframe.remove();
      form.remove();
    };

    iframe.onload = () => {
      // The iframe loaded (Google Apps Script responded).
      // We can't read the response due to cross-origin, but the data was sent.
      cleanup();
      resolve({ success: true });
    };

    iframe.onerror = () => {
      cleanup();
      resolve({ success: false, error: "Network error. Please check your connection." });
    };

    form.submit();
  });
}
