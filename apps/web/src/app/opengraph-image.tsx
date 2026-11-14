import { ImageResponse } from "next/og";

export const alt = "Malbec Ventures — the first and only Israel–LATAM cross-border VC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "linear-gradient(135deg, #1a070f 0%, #4e0e25 100%)", color: "#f7f3ec", padding: 72, fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#d1c09f" }}>TEL AVIV — BUENOS AIRES</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.1 }}>Great ventures start</div>
          <div style={{ fontSize: 76, lineHeight: 1.1, color: "#d1c09f", fontStyle: "italic" }}>with a glass of Malbec.</div>
        </div>
        <div style={{ fontSize: 30 }}>malbec ventures · The first and only Israel–LATAM cross-border VC</div>
      </div>
    ),
    size,
  );
}
