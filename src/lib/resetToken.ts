import jwt from "jsonwebtoken";
import { createHash } from "crypto";

export const RESET_PURPOSE = "password_reset";
export const RESET_TTL_SECONDS = 20 * 60;

interface ResetClaims {
  sub?: string;
  purpose?: string;
  pwf?: string;
}

/**
 * Short fingerprint of the current password hash. It is stored inside the reset
 * token, so the token stops matching as soon as the password changes. That is
 * what makes a reset link work only once, without any new database field.
 */
export function passwordFingerprint(
  passwordHash: string | null | undefined
): string {
  return createHash("sha256")
    .update(passwordHash ?? "")
    .digest("hex")
    .slice(0, 16);
}

export function signResetToken(
  userId: string,
  passwordHash: string | null | undefined,
  secret: string,
  ttlSeconds: number = RESET_TTL_SECONDS
): string {
  return jwt.sign(
    {
      sub: userId,
      purpose: RESET_PURPOSE,
      pwf: passwordFingerprint(passwordHash),
    },
    secret,
    { expiresIn: ttlSeconds }
  );
}

export type ResetTokenResult =
  | { ok: true; userId: string; fingerprint: string }
  | { ok: false; reason: "invalid" | "purpose" };

export function verifyResetToken(
  token: unknown,
  secret: string
): ResetTokenResult {
  if (typeof token !== "string" || token.length === 0) {
    return { ok: false, reason: "invalid" };
  }

  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (typeof decoded === "string") return { ok: false, reason: "invalid" };

  const claims = decoded as ResetClaims;
  if (claims.purpose !== RESET_PURPOSE) return { ok: false, reason: "purpose" };
  if (!claims.sub || typeof claims.pwf !== "string") {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, userId: claims.sub, fingerprint: claims.pwf };
}

export function tokenMatchesPassword(
  fingerprint: string,
  passwordHash: string | null | undefined
): boolean {
  return fingerprint === passwordFingerprint(passwordHash);
}
