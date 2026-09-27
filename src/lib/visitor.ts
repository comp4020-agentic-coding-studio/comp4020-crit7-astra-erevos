import type { AstroCookies } from "astro";

// Pins are per-browser, not per-account: this is a prototype about finding
// and pinning functions, not about identity, so an anonymous cookie is the
// whole "auth" model. No login belongs here.
const COOKIE = "visitor_id";
const MAX_AGE = 60 * 60 * 24 * 365;

export function ensureVisitorId(cookies: AstroCookies): string {
  const existing = cookies.get(COOKIE)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  cookies.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    path: "/",
    maxAge: MAX_AGE,
  });
  return id;
}
