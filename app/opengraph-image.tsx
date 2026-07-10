import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TypoFind — Daily spelling challenge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "72px",
          color: "#1f1b16",
          backgroundColor: "#f4eddf",
          backgroundImage: "radial-gradient(ellipse at center, transparent 0 58%, #e6dcc8 100%)",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: "34px", fontWeight: 700 }}>
          <div style={{ display: "flex", width: "58px", height: "58px", alignItems: "center", justifyContent: "center", border: "3px solid #1f1b16", borderRadius: "10px" }}>Tf</div>
          TypoFind
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: "18px", color: "#b42a20", fontSize: "28px", letterSpacing: "4px" }}>DAILY CHALLENGE</div>
          <div style={{ display: "flex", maxWidth: "980px", fontSize: "82px", fontWeight: 800, lineHeight: 1.05 }}>Find the correct spelling.</div>
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#746b60" }}>A free daily quiz for sharper proofreading.</div>
      </div>
    ),
    size
  );
}
