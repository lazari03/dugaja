"use client";

import { FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
  company: ""
};

export function ContactForm() {
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
        throw new Error(data.message ?? "Unable to send your message.");
      }

      setStatus("success");
      setNotice("Message sent. We'll reply within 48 hours.");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="company">
        Company (leave blank)
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
          Name
          <input
            required
            name="name"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            required
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label>
        Project details
        <textarea
          required
          name="message"
          rows={5}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me about your vision, dates, and location."
        />
      </label>
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send inquiry"}
      </button>
      {notice ? <p className={`form-notice ${status}`}>{notice}</p> : null}
    </form>
  );
}
