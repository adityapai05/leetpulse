import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import {
  passwordFingerprint,
  signResetToken,
  tokenMatchesPassword,
  verifyResetToken,
} from "./resetToken";

const SECRET = "test-secret";

describe("reset tokens", () => {
  it("accepts a fresh token and returns who it belongs to", () => {
    const token = signResetToken("user-1", "hash-a", SECRET);
    const result = verifyResetToken(token, SECRET);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.userId).toBe("user-1");
      expect(tokenMatchesPassword(result.fingerprint, "hash-a")).toBe(true);
    }
  });

  it("rejects a token that was issued for another purpose", () => {
    const verification = jwt.sign({ id: "user-1", email: "a@b.c" }, SECRET, {
      expiresIn: 60,
    });
    const other = jwt.sign(
      { sub: "user-1", purpose: "email_verification", pwf: "x" },
      SECRET,
      { expiresIn: 60 }
    );

    expect(verifyResetToken(verification, SECRET)).toEqual({
      ok: false,
      reason: "purpose",
    });
    expect(verifyResetToken(other, SECRET)).toEqual({
      ok: false,
      reason: "purpose",
    });
  });

  it("rejects a token older than 20 minutes", () => {
    const issuedAgo = Math.floor(Date.now() / 1000) - 25 * 60;
    const old = jwt.sign(
      {
        sub: "user-1",
        purpose: "password_reset",
        pwf: passwordFingerprint("hash-a"),
        iat: issuedAgo,
      },
      SECRET,
      { expiresIn: 20 * 60 }
    );

    expect(verifyResetToken(old, SECRET)).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("rejects tokens signed with another secret, garbage and non-strings", () => {
    const token = signResetToken("user-1", "hash-a", "other-secret");
    expect(verifyResetToken(token, SECRET).ok).toBe(false);
    expect(verifyResetToken("not-a-token", SECRET).ok).toBe(false);
    expect(verifyResetToken(undefined, SECRET).ok).toBe(false);
    expect(verifyResetToken("", SECRET).ok).toBe(false);
    expect(verifyResetToken({ token: "x" }, SECRET).ok).toBe(false);
  });

  it("stops matching once the password has changed, so a link works once", () => {
    const token = signResetToken("user-1", "old-hash", SECRET);
    const result = verifyResetToken(token, SECRET);
    if (!result.ok) throw new Error("token should be valid");

    expect(tokenMatchesPassword(result.fingerprint, "old-hash")).toBe(true);
    expect(tokenMatchesPassword(result.fingerprint, "new-hash")).toBe(false);
  });

  it("works for Google-only accounts that have no password yet", () => {
    const token = signResetToken("user-2", undefined, SECRET);
    const result = verifyResetToken(token, SECRET);
    if (!result.ok) throw new Error("token should be valid");

    expect(tokenMatchesPassword(result.fingerprint, undefined)).toBe(true);
    expect(tokenMatchesPassword(result.fingerprint, null)).toBe(true);
    expect(tokenMatchesPassword(result.fingerprint, "some-new-hash")).toBe(false);
  });
});

describe("passwordFingerprint", () => {
  it("differs for different hashes and is stable for the same one", () => {
    expect(passwordFingerprint("a")).toBe(passwordFingerprint("a"));
    expect(passwordFingerprint("a")).not.toBe(passwordFingerprint("b"));
    expect(passwordFingerprint("a")).toHaveLength(16);
  });
});
