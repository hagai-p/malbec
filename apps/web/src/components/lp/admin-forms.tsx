"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/actions";
import { inviteLp, postUpdate, uploadDocument } from "@/lib/admin-actions";

const initial: FormState = { status: "idle" };

function Status({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p role={state.status === "ok" ? "status" : "alert"} className={`text-sm ${state.status === "ok" ? "text-ink" : "text-danger"}`}>
      {state.message}
    </p>
  );
}

function Input({ name, label, state, type = "text", required }: { name: string; label: string; state: FormState; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} type={type} required={required} className="field !py-2.5" />
      {state.errors?.[name] && <p className="mt-1.5 text-sm text-danger">{state.errors[name]}</p>}
    </div>
  );
}

export function InviteForm() {
  const [state, action, pending] = useActionState(inviteLp, initial);
  return (
    <form action={action} noValidate className="space-y-5 rounded-xl border border-line bg-paper p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="full_name" label="Full name" state={state} required />
        <Input name="email" label="Email" type="email" state={state} required />
        <Input name="firm" label="Firm" state={state} />
        <Input name="country" label="Country" state={state} />
        <Input name="investor_type" label="Investor type" state={state} />
        <Input name="access_expires_at" label="Access expires (optional)" type="date" state={state} />
      </div>
      <div>
        <label htmlFor="personal_note" className="label">Personal line (optional)</label>
        <textarea id="personal_note" name="personal_note" rows={3} className="field" />
        <p className="mt-1.5 text-sm text-muted">Added to the invitation email and shown on their welcome screen.</p>
      </div>
      <Status state={state} />
      <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">{pending ? "Sending…" : "Send invitation"}</button>
    </form>
  );
}

export function UploadForm() {
  const [state, action, pending] = useActionState(uploadDocument, initial);
  return (
    <form action={action} noValidate className="space-y-5 rounded-xl border border-line bg-paper p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="title" label="Title" state={state} required />
        <Input name="category" label="Category" state={state} />
      </div>
      <Input name="description" label="Short description" state={state} />
      <div>
        <label htmlFor="file" className="label">File (PDF or image)</label>
        <input id="file" name="file" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="block text-sm" />
        {state.errors?.file && <p className="mt-1.5 text-sm text-danger">{state.errors.file}</p>}
      </div>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="published" className="accent-accent" /> Visible to LPs straight away</label>
      <Status state={state} />
      <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">{pending ? "Uploading…" : "Add document"}</button>
    </form>
  );
}

export function UpdateForm() {
  const [state, action, pending] = useActionState(postUpdate, initial);
  return (
    <form action={action} noValidate className="space-y-5 rounded-xl border border-line bg-paper p-6">
      <Input name="title" label="Title" state={state} required />
      <div>
        <label htmlFor="body" className="label">Text</label>
        <textarea id="body" name="body" rows={6} className="field" />
      </div>
      <Status state={state} />
      <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">{pending ? "Publishing…" : "Publish update"}</button>
    </form>
  );
}
