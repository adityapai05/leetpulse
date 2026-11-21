import { describe, it, expect, afterEach, vi } from "vitest";
import { buildAuthUrl, getBaseUrl, getRedirectUri } from "./config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getBaseUrl", () => {
  it("uses NEXT_PUBLIC_BASE_URL and removes a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://leetpulse-demo.vercel.app/");
    expect(getBaseUrl("http://localhost:3000")).toBe(
      "https://leetpulse-demo.vercel.app"
    );
  });

  it("falls back to the request origin when the variable is empty", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    expect(getBaseUrl("http://localhost:3000")).toBe("http://localhost:3000");
  });
});

describe("Google URLs", () => {
  it("builds the redirect address Google must be told about", () => {
    expect(getRedirectUri("http://localhost:3000")).toBe(
      "http://localhost:3000/api/auth/google/callback"
    );
  });

  it("asks only for name and email and carries the state", () => {
    const url = new URL(buildAuthUrl("client-1", "http://x/cb", "state-abc"));
    expect(url.origin + url.pathname).toBe(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    expect(url.searchParams.get("scope")).toBe("openid email profile");
    expect(url.searchParams.get("state")).toBe("state-abc");
    expect(url.searchParams.get("client_id")).toBe("client-1");
    expect(url.searchParams.get("response_type")).toBe("code");
  });
});
