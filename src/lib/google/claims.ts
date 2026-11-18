export interface GoogleClaims {
  iss?: string;
  aud?: string;
  exp?: number;
  sub?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  given_name?: string;
}

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  firstName: string;
}

export type ClaimsResult =
  | { ok: true; profile: GoogleProfile }
  | {
      ok: false;
      reason:
        | "invalid_token"
        | "issuer"
        | "audience"
        | "expired"
        | "missing_fields"
        | "unverified_email";
    };

const ISSUERS = ["https://accounts.google.com", "accounts.google.com"];

export function decodeIdToken(idToken: string): GoogleClaims | null {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function validateGoogleClaims(
  claims: GoogleClaims | null,
  clientId: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): ClaimsResult {
  if (!claims) return { ok: false, reason: "invalid_token" };
  if (!claims.iss || !ISSUERS.includes(claims.iss))
    return { ok: false, reason: "issuer" };
  if (claims.aud !== clientId) return { ok: false, reason: "audience" };
  if (typeof claims.exp !== "number" || claims.exp <= nowSeconds)
    return { ok: false, reason: "expired" };
  if (!claims.sub || !claims.email)
    return { ok: false, reason: "missing_fields" };
  if (claims.email_verified !== true && claims.email_verified !== "true") {
    return { ok: false, reason: "unverified_email" };
  }

  const email = claims.email.toLowerCase();
  const name = claims.name?.trim() || email.split("@")[0];
  const firstName = claims.given_name?.trim() || name.split(" ")[0];
  return {
    ok: true,
    profile: { googleId: claims.sub, email, name, firstName },
  };
}
