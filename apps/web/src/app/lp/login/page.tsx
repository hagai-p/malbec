import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/lp/forms";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Sign in" };

async function LinkError({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (error !== "link") return null;
  return (
    <p role="alert" className="mb-6 rounded-md border border-wine-600/40 bg-paper px-4 py-3 text-sm text-wine-700">
      That link has expired or was already used. Enter your email for a new one.
    </p>
  );
}

export default function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <main id="main" className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-wine-950 p-8 text-cream sm:p-14">
        <Logo href="/lp/login" />
        <div className="py-16">
          <p className="eyebrow !text-gold">Investor site</p>
          <h1 className="display mt-5 text-4xl sm:text-5xl">
            A private room <em className="text-gold">for our limited partners.</em>
          </h1>
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-cream/50">Tel Aviv — Buenos Aires</p>
      </div>
      <div className="flex items-center p-8 sm:p-14">
        <div className="w-full max-w-md">
          <h2 className="display text-3xl text-wine-900">Sign in</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Access is by invitation. Enter the email address your invitation was sent to and we&apos;ll email you a
            one-time sign-in link. No password needed.
          </p>
          <div className="mt-8">
            <Suspense>
              <LinkError searchParams={searchParams} />
            </Suspense>
            <LoginForm />
          </div>
          <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">
            Not invited yet? Write to{" "}
            <a href={`mailto:${site.email}`} className="text-wine-800 underline">{site.email}</a>, or visit{" "}
            <a href={site.publicUrl} className="text-wine-800 underline">malbec.ventures</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
