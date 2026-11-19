import { Footer } from "@/components/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-page text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      {children}
      <Footer />
    </div>
  );
}
