"use server";

import { insertRow } from "./store";
import { site } from "@/content/site";

export type FormState = { status: "idle" | "ok" | "error"; message?: string; errors?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const failure = `Something went wrong on our side. Please email ${site.email} instead.`;

function read(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

export async function submitContact(_prev: FormState, form: FormData): Promise<FormState> {
  if (read(form, "website_url", 200)) return { status: "ok" }; // honeypot: silently accept bots
  const row = {
    name: read(form, "name", 200),
    email: read(form, "email", 320),
    organisation: read(form, "organisation", 200),
    message: read(form, "message", 5000),
  };
  const errors: Record<string, string> = {};
  if (!row.name) errors.name = "Please tell us your name.";
  if (!EMAIL.test(row.email)) errors.email = "Please enter a valid email address.";
  if (row.message.length < 10) errors.message = "Please add a few words about why you're writing.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const { ok } = await insertRow("contact_messages", row);
  return ok ? { status: "ok" } : { status: "error", message: failure };
}

export async function submitPitch(_prev: FormState, form: FormData): Promise<FormState> {
  if (read(form, "website_url", 200)) return { status: "ok" };
  const row = {
    founder_name: read(form, "founder_name", 200),
    founder_email: read(form, "founder_email", 320),
    company_name: read(form, "company_name", 200),
    company_url: read(form, "company_url", 500),
    country: read(form, "country", 100),
    sector: read(form, "sector", 100),
    stage: read(form, "stage", 100),
    short_pitch: read(form, "short_pitch", 280),
    bridge: read(form, "bridge", 2000),
  };
  const errors: Record<string, string> = {};
  if (!row.founder_name) errors.founder_name = "Please tell us your name.";
  if (!EMAIL.test(row.founder_email)) errors.founder_email = "Please enter a valid email address.";
  if (!row.company_name) errors.company_name = "Please tell us the company name.";
  if (row.short_pitch.length < 20) errors.short_pitch = "Give us a sentence or two on what you're building.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const { ok } = await insertRow("founder_pitches", row);
  return ok ? { status: "ok" } : { status: "error", message: failure };
}
