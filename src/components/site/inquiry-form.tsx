"use client";

import { FormEvent, useState } from "react";

type InquiryFormProps = {
  locale: "en" | "zh";
};

type Status = "idle" | "loading" | "success" | "error";

export function InquiryForm({ locale }: InquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!res.ok) {
        throw new Error("submit-failed");
      }

      setStatus("success");
      setMessage("Submitted. Our team will contact you shortly.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Submission failed. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-[var(--text-soft)]">
          Name
          <input name="name" required className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)]" />
        </label>
        <label className="grid gap-1 text-sm text-[var(--text-soft)]">
          Email
          <input type="email" name="email" required className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)]" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-[var(--text-soft)]">
          Company
          <input name="company" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)]" />
        </label>
        <label className="grid gap-1 text-sm text-[var(--text-soft)]">
          Target Capacity
          <input name="capacity" placeholder="e.g. 20HL" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)]" />
        </label>
      </div>

      <label className="grid gap-1 text-sm text-[var(--text-soft)]">
        Project Requirements
        <textarea name="message" required rows={5} className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)]" />
      </label>

      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <button type="submit" disabled={status === "loading"} className="brand-button brand-button-primary w-fit disabled:opacity-70">
        {status === "loading" ? "Submitting..." : "Send Inquiry"}
      </button>

      {message ? (
        <p className={`text-sm ${status === "success" ? "text-[var(--brand-dark)]" : "text-red-600"}`}>{message}</p>
      ) : null}
    </form>
  );
}
