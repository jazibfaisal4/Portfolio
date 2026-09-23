import type { NextConfig } from "next";

const FALLBACK_BACKEND_URL = "http://127.0.0.1:8000";
const backendFromEnv = process.env.BACKEND_URL?.trim();

if (process.env.NODE_ENV === "production" && !backendFromEnv) {
  console.warn(
    "[next.config] BACKEND_URL is not set for this production build. /api/chat, /api/contact and /api/health will rewrite to http://127.0.0.1:8000 and will fail on the hosted site. Set BACKEND_URL to the deployed FastAPI origin.",
  );
}

const BACKEND_URL = (backendFromEnv || FALLBACK_BACKEND_URL).replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // The browser talks to /api/* on the same origin; Next forwards to the backend.
  // That means no CORS setup and the backend URL never reaches the client.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/api/chat", destination: `${BACKEND_URL}/api/chat` },
        { source: "/api/contact", destination: `${BACKEND_URL}/api/contact` },
        { source: "/api/health", destination: `${BACKEND_URL}/api/health` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
