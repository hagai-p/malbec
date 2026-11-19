"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/actions";
import { requestLoginLink, submitAttestation, submitInterest } from "@/lib/lp-actions";

const initial: FormState = { status: "idle" };
const Err = ({ id, text }: { id: string; text?: string }) =>
  text ? <p id={id} className="mt-2 text-sm text-danger">{text}</p> : null;

export function LoginForm() {
  const [state, action, pending] = useActionState(requestLoginLink, initial);
  if (state.status === "ok")
    return (
      <p role="status" className="rounded-xl border border-gold-deep/40 bg-paper p-6 leading-relaxed text-ink">
        If that address has been invited, a sign-in link is on its way. It works once and expires in an hour.
      </p>
    );
  return (
    <form action={action} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className="label">Email address</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="field" aria-describedby="email-error" />
        <Err id="email-error" text={state.errors?.email} />
      </div>
      <button type="submit" disabled={pending} className="btn-wine w-full disabled:opacity-60">
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}

export function AttestationForm({ statuses }: { statuses: readonly string[] }) {
  const [state, action, pending] = useActionState(submitAttestation, initial);
  return (
    <form action={action} noValidate className="space-y-8">
      <fieldset aria-describedby="status-error">
        <legend className="label">Which of these describes you?</legend>
        <div className="space-y-3">
          {statuses.map((s) => (
            <label key={s} className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-paper p-4 has-[:checked]:border-accent">
              <input type="radio" name="investor_status" value={s} className="mt-1 accent-accent" />
              <span>{s}</span>
            </label>
          ))}
        </div>
        <Err id="status-error" text={state.errors?.investor_status} />
      </fieldset>
      <div>
        <label htmlFor="jurisdiction" className="label">Country of residence</label>
        <input id="jurisdiction" name="jurisdiction" required autoComplete="country-name" className="field" aria-describedby="jurisdiction-error" />
        <Err id="jurisdiction-error" text={state.errors?.jurisdiction} />
      </div>
      <div className="space-y-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="confirm_identity" className="mt-1 accent-accent" />
          <span>This invitation was addressed to me personally, and I will not share my access.</span>
        </label>
        <Err id="identity-error" text={state.errors?.confirm_identity} />
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="accept_terms" className="mt-1 accent-accent" />
          <span>I have read and accept the confidentiality terms above.</span>
        </label>
        <Err id="terms-error" text={state.errors?.accept_terms} />
      </div>
      {state.message && <p role="alert" className="text-sm text-danger">{state.message}</p>}
      <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">
        {pending ? "One moment…" : "Enter the investor site"}
      </button>
    </form>
  );
}

export function InterestForm({ ranges }: { ranges: readonly string[] }) {
  const [state, action, pending] = useActionState(submitInterest, initial);
  if (state.status === "ok")
    return (
      <div role="status" className="rounded-xl border border-gold-deep/40 bg-paper p-8">
        <p className="display text-2xl text-heading">Thank you.</p>
        <p className="mt-3 leading-relaxed text-muted">Hagai has your note and will be in touch personally.</p>
      </div>
    );
  return (
    <form action={action} noValidate className="space-y-7 rounded-xl border border-line bg-paper p-7 sm:p-9">
      <fieldset aria-describedby="vehicles-error">
        <legend className="label">I&apos;m interested in</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[["poc", "Malbec POC", "$5M"], ["malbec-1", "Malbec 1", "$25M target"]].map(([value, name, size]) => (
            <label key={value} className="flex cursor-pointer items-start gap-3 rounded-md border border-line p-4 has-[:checked]:border-accent has-[:checked]:bg-sand/50">
              <input type="checkbox" name="vehicles" value={value} className="mt-1 accent-accent" />
              <span>
                <span className="block font-display text-lg text-heading">{name}</span>
                <span className="text-sm text-muted">{size}</span>
              </span>
            </label>
          ))}
        </div>
        <Err id="vehicles-error" text={state.errors?.vehicles} />
      </fieldset>
      <div>
        <label htmlFor="amount_range" className="label">Indicative amount</label>
        <select id="amount_range" name="amount_range" defaultValue="" className="field" aria-describedby="amount-error">
          <option value="" disabled>Choose a range</option>
          {ranges.map((r) => <option key={r}>{r}</option>)}
        </select>
        <Err id="amount-error" text={state.errors?.amount_range} />
      </div>
      <div>
        <label htmlFor="note" className="label">Anything you&apos;d like us to know <span className="ml-2 font-normal text-muted">optional</span></label>
        <textarea id="note" name="note" rows={4} className="field" />
      </div>
      {state.message && <p role="alert" className="text-sm text-danger">{state.message}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn-wine disabled:opacity-60">
          {pending ? "Sending…" : "Send indication"}
        </button>
        <p className="text-sm text-muted">Non-binding. It simply starts the conversation.</p>
      </div>
    </form>
  );
}
