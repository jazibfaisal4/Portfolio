import type { NextConfig } from "next";

// Where the FastAPI backend runs.
// Local: http://127.0.0.1:8000. Production: your deployed backend URL (set BACKEND_URL in Vercel).
const BACKEND_URL = (process.env.BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // The browser talks to /api/* on the same origin; Next forwards to the backend.
  // That means no CORS setup and the backend URL never reaches the client.
  async rewrites() {
    return {
      // beforeFiles so these win over any leftover route handlers in src/app/api.
      beforeFiles: [
        { source: "/api/chat", destination: `${BACKEND_URL}/api/chat` },
        { source: "/api/contact", destination: `${BACKEND_URL}/api/contact` },
        { source: "/api/github/repos", destination: `${BACKEND_URL}/api/github/repos` },
        { source: "/api/health", destination: `${BACKEND_URL}/health` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
