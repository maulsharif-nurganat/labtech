/**
 * The canonical base URL for the site.
 * Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel env to override.
 * Falls back to labtech.kz for production.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://labtech.kz";
