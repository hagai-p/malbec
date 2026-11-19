"use client";

import { useEffect, useRef, useState } from "react";

/**
 * View-only document display. PDFs are drawn page by page onto canvases (no browser PDF toolbar,
 * so no download or print button), with the viewer's name overlaid.
 * This deters casual copying; it cannot stop screenshots.
 */
export function DocumentViewer({ src, isPdf, watermark }: { src: string; isPdf: boolean; watermark: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!isPdf) return;
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        const pdf = await pdfjs.getDocument({ url: src, withCredentials: true }).promise;
        for (let n = 1; n <= pdf.numPages && !cancelled; n++) {
          const page = await pdf.getPage(n);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = "w-full h-auto block";
          const wrap = document.createElement("div");
          wrap.className = "relative mb-6 overflow-hidden rounded-lg border border-line bg-white shadow-sm";
          const mark = document.createElement("div");
          mark.textContent = watermark;
          mark.className =
            "pointer-events-none absolute inset-0 flex items-center justify-center -rotate-[24deg] text-center font-sans text-[clamp(1rem,3vw,2rem)] font-medium text-accent/10 select-none";
          wrap.append(canvas, mark);
          holder.current?.append(wrap);
          await page.render({ canvas, viewport }).promise;
        }
        if (!cancelled) setState("ready");
      } catch (e) {
        console.error(e);
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src, isPdf, watermark]);

  return (
    <div className="mx-auto mt-8 max-w-4xl select-none" onContextMenu={(e) => e.preventDefault()}>
      {isPdf ? (
        <>
          {state === "loading" && <p className="text-sm text-muted">Loading document…</p>}
          {state === "error" && <p role="alert" className="text-sm text-danger">This document could not be opened. Please try again or write to Hagai.</p>}
          <div ref={holder} />
        </>
      ) : (
        <div className="relative overflow-hidden rounded-lg border border-line bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- private, per-request file; must not pass through the image optimiser cache */}
          <img src={src} alt="" draggable={false} className="block h-auto w-full" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center -rotate-[24deg] text-2xl font-medium text-accent/10">
            {watermark}
          </div>
        </div>
      )}
    </div>
  );
}
