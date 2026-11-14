import "server-only";

type Email = { to: string; subject: string; text: string; replyTo?: string };

/** Sends a plain, personal email through Resend. In development without a key, prints it instead. */
export async function sendEmail({ to, subject, text, replyTo }: Email): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Malbec Ventures <hagai@malbec.ventures>";
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] (not sent, no RESEND_API_KEY)\nTo: ${to}\nSubject: ${subject}\n\n${text}\n`);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY missing; email not sent:", subject);
    return { ok: false };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
    cache: "no-store",
  });
  if (!res.ok) console.error("[email] send failed:", res.status, await res.text());
  return { ok: res.ok };
}

export async function notifyAdmin(subject: string, text: string) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (to) await sendEmail({ to, subject, text });
}
