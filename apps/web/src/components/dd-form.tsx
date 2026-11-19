"use client";

import { useEffect, useRef, useState } from "react";
import type { DdStep } from "@/content/dd";
import { saveDd } from "@/lib/dd-actions";

type Props = { token: string; steps: DdStep[]; initial: Record<string, string>; required: string[] };

export function DdForm({ token, steps, initial, required }: Props) {
  const [answers, setAnswers] = useState(initial);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [missing, setMissing] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dirty = useRef(false);
  const latest = useRef(answers);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    latest.current = answers;
  }, [answers]);

  // Autosave two seconds after the last keystroke.
  useEffect(() => {
    if (!dirty.current || done) return;
    const t = setTimeout(async () => {
      setSaved("saving");
      const res = await saveDd(token, latest.current);
      dirty.current = false;
      setSaved(res.ok ? "saved" : "error");
    }, 2000);
    return () => clearTimeout(t);
  }, [answers, token, done]);

  const set = (key: string, value: string) => {
    dirty.current = true;
    setSaved("idle");
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const go = async (next: number) => {
    if (dirty.current) {
      setSaved("saving");
      const res = await saveDd(token, latest.current);
      dirty.current = false;
      setSaved(res.ok ? "saved" : "error");
    }
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");
    const res = await saveDd(token, latest.current, true);
    setSubmitting(false);
    if (res.ok) return setDone(true);
    if (res.missing) {
      setMissing(res.missing);
      setStep(0);
      setError("A few required answers are still missing on the first page.");
    } else setError(res.error ?? "Something went wrong.");
  };

  if (done)
    return (
      <div role="status" className="rounded-xl border border-gold-deep/40 bg-paper p-10 text-center">
        <p className="display text-3xl text-heading">Submitted. Thank you.</p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          We have everything we need for now. We&apos;ll read it carefully and come back to you personally.
        </p>
      </div>
    );

  const current = steps[step];
  const last = step === steps.length - 1;

  return (
    <div>
      <ol className="flex gap-1.5" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s.title} className="flex-1">
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className={`block h-1.5 w-full rounded-full transition-colors ${i <= step ? "bg-wine-800" : "bg-line hover:bg-gold"}`}
            />
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-baseline justify-between text-xs text-muted">
        <span>Step {step + 1} of {steps.length}</span>
        <span aria-live="polite">
          {saved === "saving" && "Saving…"}
          {saved === "saved" && "Draft saved"}
          {saved === "error" && <span className="text-danger">Couldn&apos;t save. Check your connection.</span>}
        </span>
      </div>

      <h2 ref={heading} tabIndex={-1} className="display mt-10 text-3xl text-heading outline-none">{current.title}</h2>
      <p className="mt-2 text-muted">{current.intro}</p>

      <div className="mt-8 space-y-7">
        {current.fields.map((f) => {
          const isMissing = missing.includes(f.key) && !answers[f.key]?.trim();
          const common = {
            id: f.key,
            value: answers[f.key] ?? "",
            maxLength: f.maxLength,
            "aria-invalid": isMissing || undefined,
            "aria-describedby": f.hint ? `${f.key}-hint` : undefined,
            className: `field ${isMissing ? "!border-danger" : ""}`,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(f.key, e.target.value),
          };
          return (
            <div key={f.key}>
              <label htmlFor={f.key} className="label">
                {f.label}
                {required.includes(f.key) && <span className="ml-2 font-normal text-muted">required</span>}
              </label>
              {f.short ? <input type={f.type ?? "text"} {...common} /> : <textarea rows={f.rows ?? 4} {...common} />}
              {f.hint && (
                <p id={`${f.key}-hint`} className="mt-2 text-sm text-muted">
                  {f.hint}
                  {f.maxLength && ` ${(answers[f.key] ?? "").length}/${f.maxLength}`}
                </p>
              )}
              {isMissing && <p className="mt-2 text-sm text-danger">Please fill this in before submitting.</p>}
            </div>
          );
        })}
      </div>

      {error && <p role="alert" className="mt-8 text-sm text-danger">{error}</p>}

      <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
        <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-ghost disabled:invisible">
          ← Back
        </button>
        {last ? (
          <button type="button" onClick={submit} disabled={submitting} className="btn-wine disabled:opacity-60">
            {submitting ? "Submitting…" : "Submit questionnaire"}
          </button>
        ) : (
          <button type="button" onClick={() => go(step + 1)} className="btn-wine">
            Save and continue →
          </button>
        )}
      </div>
      <p className="mt-6 text-sm text-muted">
        Your answers save as you type. You can close this page and return on the same link at any time before submitting.
      </p>
    </div>
  );
}
