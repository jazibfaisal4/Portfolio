const FALLBACK_SITE_URL = "https://portfolio-jazib.vercel.app";

export function getSiteUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      // fall through to the deploy fallback
    }
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) {
    try {
      return new URL(`https://${vercelHost.replace(/^https?:\/\//, "")}`);
    } catch {
      // fall through
    }
  }

  return new URL(FALLBACK_SITE_URL);
}
