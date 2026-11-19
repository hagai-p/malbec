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
