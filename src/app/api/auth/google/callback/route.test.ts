import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const { resolveGoogleAccount, connectDB } = vi.hoisted(() => ({
  resolveGoogleAccount: vi.fn(),
  connectDB: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ default: connectDB }));
vi.mock("@/lib/google/mongoRepo", () => ({ createMongoUserRepo: () => ({}) }));
vi.mock("@/lib/google/account", () => ({ resolveGoogleAccount }));

import { GET } from "./route";

const STATE = "a".repeat(64);

function idToken(claims: Record<string, unknown>) {
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `header.${payload}.signature`;
}

function goodClaims(): Record<string, unknown> {
  return {
    iss: "https://accounts.google.com",
    aud: "client-id",
    exp: Math.floor(Date.now() / 1000) + 600,
    sub: "g-1",
    email: "sam@example.com",
    email_verified: true,
    name: "Sam Lee",
    given_name: "Sam",
  };
}

function callback(query: string, withStateCookie = true) {
  return new NextRequest(
    `http://localhost:3000/api/auth/google/callback?${query}`,
    { headers: withStateCookie ? { cookie: `google_oauth_state=${STATE}` } : {} }
  );
}

const fetchMock = vi.fn();

function googleReturns(claims: Record<string, unknown>) {
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify({ id_token: idToken(claims) }), { status: 200 })
  );
}

const location = (res: Response) => res.headers.get("location") ?? "";

beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = "client-id";
  process.env.GOOGLE_CLIENT_SECRET = "client-secret";
  process.env.JWT_SECRET = "test-secret";
  process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  connectDB.mockReset().mockResolvedValue(undefined);
  resolveGoogleAccount
    .mockReset()
    .mockResolvedValue({ user: { id: "u1" }, outcome: "created" });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GET /api/auth/google/callback", () => {
  it("TC-10: refused consent returns to login with a message and no session", async () => {
    const res = await GET(callback(`error=access_denied&state=${STATE}`));

    expect(location(res)).toContain("/login?google=cancelled");
    expect(res.cookies.get("authToken")).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats any other Google error as a failed sign-in", async () => {
    const res = await GET(callback(`error=server_error&state=${STATE}`));
    expect(location(res)).toContain("/login?google=failed");
  });

  it("TC-11: rejects a missing or altered state and creates no session", async () => {
    const missing = await GET(callback(`code=abc&state=${STATE}`, false));
    const altered = await GET(callback(`code=abc&state=${"b".repeat(64)}`));

    for (const res of [missing, altered]) {
      expect(location(res)).toContain("/login?google=invalid_state");
      expect(res.cookies.get("authToken")).toBeUndefined();
    }
    expect(fetchMock).not.toHaveBeenCalled();
    expect(resolveGoogleAccount).not.toHaveBeenCalled();
  });

  it("TC-12: an invalid or expired code shows a message and creates no session", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "invalid_grant" }), { status: 400 })
    );
    const res = await GET(callback(`code=bad&state=${STATE}`));

    expect(location(res)).toContain("/login?google=failed");
    expect(res.cookies.get("authToken")).toBeUndefined();
    expect(resolveGoogleAccount).not.toHaveBeenCalled();
  });

  it("asks the visitor to try again when Google cannot be reached", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    const res = await GET(callback(`code=abc&state=${STATE}`));

    expect(location(res)).toContain("/login?google=unavailable");
    expect(res.cookies.get("authToken")).toBeUndefined();
  });

  it("TC-09: an unverified Google email creates and links nothing", async () => {
    googleReturns({ ...goodClaims(), email_verified: false });
    const res = await GET(callback(`code=abc&state=${STATE}`));

    expect(location(res)).toContain("/login?google=unverified");
    expect(resolveGoogleAccount).not.toHaveBeenCalled();
    expect(res.cookies.get("authToken")).toBeUndefined();
  });

  it("rejects a token that was issued for another client", async () => {
    googleReturns({ ...goodClaims(), aud: "someone-else" });
    const res = await GET(callback(`code=abc&state=${STATE}`));

    expect(location(res)).toContain("/login?google=failed");
    expect(resolveGoogleAccount).not.toHaveBeenCalled();
  });

  it("returns to login without a session when the database fails", async () => {
    googleReturns(goodClaims());
    connectDB.mockRejectedValue(new Error("db down"));
    const res = await GET(callback(`code=abc&state=${STATE}`));

    expect(location(res)).toContain("/login?google=failed");
    expect(res.cookies.get("authToken")).toBeUndefined();
  });

  it("signs in: sets the session cookie and moves on to /explore", async () => {
    googleReturns(goodClaims());
    const res = await GET(callback(`code=abc&state=${STATE}`));

    expect(res.status).toBe(200);
    expect(res.cookies.get("authToken")?.value).toBeDefined();
    expect(await res.text()).toContain("/explore");
    expect(resolveGoogleAccount).toHaveBeenCalledTimes(1);
  });
});