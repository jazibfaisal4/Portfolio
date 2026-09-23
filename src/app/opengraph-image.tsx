import { ImageResponse } from "next/og";
import { profile } from "@/constants";

export const alt = `${profile.name}, AI/ML developer and full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bg = "#12181D";
const text = "#E8E6EE";
const textDim = "#9AAEB4";
const accent = "#1AD9C5";
const line = "#2E343A";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: bg,
          backgroundImage:
            "linear-gradient(rgba(46,52,58,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(46,52,58,0.35) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: accent,
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: accent }} />
          {profile.hero.pill}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ color: text, fontSize: 72, lineHeight: 1.05, fontWeight: 600, letterSpacing: -1.5 }}>
            {profile.name}
          </div>
          <div style={{ color: textDim, fontSize: 32, lineHeight: 1.3, maxWidth: 920 }}>
            AI/ML developer and full-stack developer. Fresh BSCS graduate.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: accent,
            fontSize: 22,
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
          }}
        >
          Voice-first AI systems and the full-stack products around them
        </div>
      </div>
    ),
    { ...size },
  );
}
