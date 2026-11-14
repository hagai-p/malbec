import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { confirmLogin } from "@/lib/lp-actions";

export const metadata: Metadata = { title: "Continue" };

async function ConfirmForm({ searchParams }: { searchParams: Promise<{ token_hash?: string; type?: string }> }) {
  const { token_hash = "", type = "" } = await searchParams;
  return (
    <form action={confirmLogin}>
      <input type="hidden" name="token_hash" value={token_hash} />
      <input type="hidden" name="type" value={type} />
      <button type="submit" className="btn-gold mt-10">Continue to the investor site</button>
    </form>
  );
}

export default function Confirm({ searchParams }: { searchParams: Promise<{ token_hash?: string; type?: string }> }) {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center bg-wine-950 p-8 text-center text-cream">
      <Logo href="/lp/login" />
      <h1 className="display mt-12 max-w-xl text-4xl sm:text-5xl">
        Welcome. <em className="text-gold">Your glass is poured.</em>
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-cream/75">One more step to confirm it&apos;s you.</p>
      <Suspense>
        <ConfirmForm searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
