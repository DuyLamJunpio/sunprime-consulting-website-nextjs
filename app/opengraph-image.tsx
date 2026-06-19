import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "SunPrime Consulting — Kế toán, pháp lý doanh nghiệp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ảnh OG mặc định, sinh động theo thương hiệu (tông nâu đất). Áp dụng cho mọi trang
// chưa tự đặt ảnh OG riêng.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #9c5a34 0%, #6f3f26 55%, #3d2415 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          SunPrime Consulting
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Kế toán · Pháp lý · Vận hành doanh nghiệp
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.82)", maxWidth: 880 }}>
            Chuẩn luật · Rõ số · Vững hệ thống
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}
