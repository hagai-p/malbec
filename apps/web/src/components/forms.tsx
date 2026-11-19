"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/lib/actions";

const initial: FormState = { status: "idle" };

function Field({
  name, label, state, type = "text", required = false, textarea = false, rows = 4, maxLength, hint, autoComplete,
}: {
  name: string; label: string; state: FormState; type?: string; required?: boolean; textarea?: boolean;
  rows?: number; maxLength?: number; hint?: string; autoComplete?: string;
}) {
  const error = state.errors?.[name];
  const describedBy = [error && `${name}-error`, hint && `${name}-hint`].filter(Boolean).join(" ") || undefined;
  const props = {
    id: name, name, required, maxLength, autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: "field",
  };
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
        {!required && <span className="ml-2 font-normal text-muted">optional</span>}
      </label>
      {textarea ? <textarea rows={rows} {...props} /> : <input type={type} {...props} />}
      {hint && !error && <p id={`${name}-hint`} className="mt-2 text-sm text-muted">{hint}</p>}
      {error && <p id={`${name}-error`} className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Done({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="rounded-xl border border-gold-deep/40 bg-paper p-8">
      <p className="display text-2xl text-heading">{title}</p>
      <p className="mt-3 leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  if (state.status === "ok") return <Done title="Thank you." body="Your message is with us. We'll be in touch shortly." />;
  return (
    <form action={action} className="relative space-y-6" noValidate>
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" required state={state} autoComplete="name" />
        <Field name="email" label="Email" type="email" required state={state} autoComplete="email" />
      </div>
      <Field name="organisation" label="Organisation" state={state} autoComplete="organization" />
      <Field name="message" label="Message" required textarea rows={6} state={state} />
      {state.message && <p role="alert" className="text-sm text-danger">{state.message}</p>}
      <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
