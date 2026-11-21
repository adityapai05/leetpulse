import { describe, it, expect } from "vitest";
import { decodeIdToken, validateGoogleClaims, GoogleClaims } from "./claims";

const CLIENT = "client-123";
const NOW = 1_000_000;
const good: GoogleClaims = {
  iss: "https://accounts.google.com",
  aud: CLIENT,
  exp: NOW + 600,
  sub: "g-1",
  email: "Sam@Example.com",
  email_verified: true,
  name: "Sam Lee",
  given_name: "Sam",
};

describe("validateGoogleClaims", () => {
  it("accepts a valid token and lowercases the email", () => {
    const r = validateGoogleClaims(good, CLIENT, NOW);
    expect(r).toEqual({
      ok: true,
      profile: {
        googleId: "g-1",
        email: "sam@example.com",
        name: "Sam Lee",
        firstName: "Sam",
      },
    });
  });
  it("accepts the short issuer form", () => {
    expect(
      validateGoogleClaims({ ...good, iss: "accounts.google.com" }, CLIENT, NOW)
        .ok,
    ).toBe(true);
  });
  it("rejects a wrong issuer", () => {
    expect(
      validateGoogleClaims(
        { ...good, iss: "https://evil.example" },
        CLIENT,
        NOW,
      ),
    ).toEqual({ ok: false, reason: "issuer" });
  });
  it("rejects a token meant for another client", () => {
    expect(
      validateGoogleClaims({ ...good, aud: "other" }, CLIENT, NOW),
    ).toEqual({ ok: false, reason: "audience" });
  });
  it("rejects an expired token", () => {
    expect(
      validateGoogleClaims({ ...good, exp: NOW - 1 }, CLIENT, NOW),
    ).toEqual({ ok: false, reason: "expired" });
  });
  it("rejects unverified emails in boolean and string form", () => {
    expect(
      validateGoogleClaims({ ...good, email_verified: false }, CLIENT, NOW),
    ).toEqual({ ok: false, reason: "unverified_email" });
    expect(
      validateGoogleClaims({ ...good, email_verified: "false" }, CLIENT, NOW),
    ).toEqual({ ok: false, reason: "unverified_email" });
  });
  it("rejects a token without subject or email", () => {
    expect(
      validateGoogleClaims({ ...good, sub: undefined }, CLIENT, NOW),
    ).toEqual({ ok: false, reason: "missing_fields" });
  });
  it("rejects null claims", () => {
    expect(validateGoogleClaims(null, CLIENT, NOW)).toEqual({
      ok: false,
      reason: "invalid_token",
    });
  });
});

describe("decodeIdToken", () => {
  it("reads the payload of a well-formed token", () => {
    const payload = Buffer.from(JSON.stringify({ sub: "x" })).toString(
      "base64url",
    );
    expect(decodeIdToken(`a.${payload}.c`)).toEqual({ sub: "x" });
  });
  it("returns null for garbage", () => {
    expect(decodeIdToken("not-a-token")).toBeNull();
    expect(decodeIdToken("a.%%%.c")).toBeNull();
  });
});
