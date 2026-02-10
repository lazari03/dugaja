"use client";

import { FormEvent, useState } from "react";

interface ContactFormCopy {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  genericErrorMessage: string;
  honeypotLabel: string;
}

const initialState = {
  name: "",
  email: "",
  message: "",
  company: ""
};

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [notice, setNotice] = useState<string | null>(null);

  const updateField = (field: keyof typeof initialState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? copy.genericErrorMessage);
      }

      setStatus("success");
      setNotice(copy.successMessage);
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : copy.genericErrorMessage);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="company">
        {copy.honeypotLabel}
      </label>
      <input
        id="company"
        name="company"
        type="text"
        value={formState.company}
        onChange={(event) => updateField("company", event.target.value)}
        autoComplete="off"
        className="honeypot"
        tabIndex={-1}
      />
      <div className="field-grid">
        <label>
          {copy.nameLabel}
          <input
            required
            name="name"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={copy.namePlaceholder}
          />
        </label>
        <label>
          {copy.emailLabel}
          <input
            required
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder={copy.emailPlaceholder}
          />
        </label>
      </div>
      <label>
        {copy.messageLabel}
        <textarea
          required
          name="message"
          rows={5}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={copy.messagePlaceholder}
        />
      </label>
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? copy.sendingLabel : copy.submitLabel}
      </button>
      {notice ? <p className={`form-notice ${status}`}>{notice}</p> : null}
    </form>
  );
}
