import { useState } from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import SocialLinks from "../components/SocialLinks";
import { site, socialLinks } from "../data/site";
import { isEmailjsConfigured, sendContactEmail } from "../config/emailjs";
import "../styles/contact.css";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) errors.email = "An email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email looks incomplete.";
  if (!values.subject.trim()) errors.subject = "A short subject helps me prioritise.";
  if (values.message.trim().length < 20)
    errors.message = "A little more detail helps — at least 20 characters.";

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  // null until a submit resolves, then { type: 'success' | 'error', text }.
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return; // guard against double submits

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setIsSending(true);
    setResult(null);

    try {
      await sendContactEmail({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setResult({ type: "success", text: "Thanks — your message is on its way. I'll reply soon." });
      setValues(EMPTY_FORM); // only cleared once the send succeeded
    } catch (error) {
      // Keep the entered values so nothing is lost; log the detail for debugging.
      console.error("Contact form submission failed:", error);
      setResult({
        type: "error",
        text: `Sorry, the message could not be sent. Please email me directly at ${site.email}.`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const details = [
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: "phone",
      label: "Phone",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
    },
    { icon: "location", label: "Location", value: site.location },
  ];

  const profiles = socialLinks.filter((link) => link.icon !== "mail");

  return (
    <div className="page">
      <div className="container">
        <Reveal>
          <SectionTitle
            as="h1"
            eyebrow="Contact"
            title="Let's get in touch"
            subtitle="Questions about my work, an opportunity, or a technical conversation — all welcome."
          />
        </Reveal>

        <div className="contact__layout">
          <Reveal className="contact__aside">
            <ul className="contact__details">
              {details.map(({ icon, label, value, href }) => (
                <li key={label} className="contact__detail">
                  <span className="contact__detail-icon" aria-hidden="true">
                    <Icon name={icon} size={18} />
                  </span>
                  <span className="contact__detail-body">
                    <span className="contact__detail-label">{label}</span>
                    {href ? (
                      <a className="contact__detail-value" href={href}>
                        {value}
                      </a>
                    ) : (
                      <span className="contact__detail-value">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="contact__profiles">
              <h2 className="contact__aside-heading">Profiles</h2>
              <ul className="contact__profile-list">
                {profiles.map(({ label, icon, url }) => (
                  <li key={label}>
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      <Icon name={icon} size={18} />
                      <span>{label}</span>
                      <Icon name="arrowUpRight" size={16} className="contact__profile-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__availability">
              <span className="contact__availability-dot" aria-hidden="true" />
              {site.status}
            </div>

            <SocialLinks size={18} className="contact__social" />
          </Reveal>

          <Reveal className="contact__form-wrap" delay={100}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {!isEmailjsConfigured && (
                <p className="contact-form__note">
                  Email delivery isn&apos;t configured yet — add your EmailJS keys to{" "}
                  <code>.env</code>. In the meantime, reach me at{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
              )}

              <div className="contact-form__row">
                <div className="field">
                  <label className="field__label" htmlFor="name">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    className={`field__input ${errors.name ? "field__input--error" : ""}`.trim()}
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Arjun Hanwate"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p className="field__error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    className={`field__input ${errors.email ? "field__input--error" : ""}`.trim()}
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p className="field__error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="subject">
                  Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  className={`field__input ${errors.subject ? "field__input--error" : ""}`.trim()}
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange}
                  placeholder="Project enquiry"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  required
                />
                {errors.subject && (
                  <p className="field__error" id="subject-error">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="message">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  className={`field__input field__input--textarea ${
                    errors.message ? "field__input--error" : ""
                  }`.trim()}
                  id="message"
                  name="message"
                  rows="6"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="What are you building, and what does success look like?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  required
                />
                {errors.message && (
                  <p className="field__error" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="contact-form__actions">
                <Button type="submit" icon="send" iconPosition="left" disabled={isSending}>
                  {isSending ? "Sending…" : "Send message"}
                </Button>

                {/* aria-live so the outcome is announced, not just shown. */}
                <p className="contact-form__status" role="status" aria-live="polite">
                  {result && (
                    <span className={`contact-form__${result.type}`}>
                      <Icon name={result.type === "success" ? "check" : "close"} size={16} />
                      {result.text}
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
