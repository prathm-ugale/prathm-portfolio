import emailjs from "@emailjs/browser";

/**
 * Single place where EmailJS is configured.
 *
 * All three values are public, browser-safe identifiers and come from .env
 * (see .env.example). Never put an EmailJS private key here — it belongs on a
 * server only, and anything imported into this app ships to the browser.
 */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/**
 * False until the three env vars hold real values, so the UI can say so.
 * The `your_` prefix keeps the .env.example placeholders from counting as set.
 */
export const isEmailjsConfigured = Object.values(emailjsConfig).every(
  (value) => typeof value === "string" && value.trim() !== "" && !value.startsWith("your_"),
);

if (isEmailjsConfigured) {
  emailjs.init({ publicKey: emailjsConfig.publicKey });
}

/**
 * Sends the contact form. The parameter names must match the variables used in
 * the EmailJS template: {{name}}, {{email}}, {{subject}} and {{message}}.
 */
export function sendContactEmail({ name, email, subject, message }) {
  if (!isEmailjsConfigured) {
    return Promise.reject(
      new Error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env.",
      ),
    );
  }

  return emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, {
    name,
    email,
    subject,
    message,
  });
}
