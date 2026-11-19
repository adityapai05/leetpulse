export const STATE_COOKIE = "google_oauth_state";
export const STATE_COOKIE_PATH = "/api/auth/google";
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

/** Site address without a trailing slash. Falls back to the request's own origin. */
export function getBaseUrl(fallbackOrigin: string): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  const base = configured && configured.length > 0 ? configured : fallbackOrigin;
  return base.replace(/\/+$/, "");
}

export function getRedirectUri(baseUrl: string): string {
  return `${baseUrl}/api/auth/google/callback`;
}

/** Asks Google only for the visitor's name and email address */
export function buildAuthUrl(
  clientId: string,
  redirectUri: string,
  state: string
): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}
