import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#12181D",
          color: "#1AD9C5",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: -0.4,
        }}
      >
        JF
      </div>
    ),
    { ...size },
  );
}
