import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

const { findOne, cookieSet } = vi.hoisted(() => ({
  findOne: vi.fn(),
  cookieSet: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ default: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/models/Users", () => ({ default: () => ({ findOne }) }));
vi.mock("next/headers", () => ({
  cookies: async () => ({ set: cookieSet }),
}));

import { POST } from "./route";

const PASSWORD = "Correct#Horse1";
const hash = bcrypt.hashSync(PASSWORD, 4);

function request(body: unknown) {
  return new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  findOne.mockReset();
  cookieSet.mockReset();
  process.env.JWT_SECRET = "test-secret";
});

describe("POST /api/auth/login", () => {
  it("gives the same answer for an unknown user and a wrong password", async () => {
    findOne.mockResolvedValueOnce(null);
    const unknown = await POST(
      request({ usernameORemail: "nobody", password: PASSWORD })
    );

    findOne.mockResolvedValueOnce({
      _id: "u1",
      username: "sam",
      password: hash,
      isVerified: true,
    });
    const wrong = await POST(
      request({ usernameORemail: "sam", password: "Wrong#Pass1" })
    );

    expect(unknown.status).toBe(401);
    expect(wrong.status).toBe(401);
    expect(await unknown.json()).toEqual(await wrong.json());
  });

  it("answers a password login on a Google-only account with the general message", async () => {
    findOne.mockResolvedValueOnce({
      _id: "g1",
      username: "gina",
      isVerified: true,
    });
    const res = await POST(
      request({ usernameORemail: "gina", password: PASSWORD })
    );

    expect(res.status).toBe(401);
    expect((await res.json()).error).toBe("Incorrect username or password.");
  });

  it("shows the not-verified message only after the correct password", async () => {
    const unverified = {
      _id: "u2",
      username: "newbie",
      password: hash,
      isVerified: false,
    };

    findOne.mockResolvedValueOnce(unverified);
    const wrong = await POST(
      request({ usernameORemail: "newbie", password: "Wrong#Pass1" })
    );
    expect(wrong.status).toBe(401);
    expect((await wrong.json()).error).toBe("Incorrect username or password.");

    findOne.mockResolvedValueOnce(unverified);
    const right = await POST(
      request({ usernameORemail: "newbie", password: PASSWORD })
    );
    expect(right.status).toBe(403);
    expect((await right.json()).error).toMatch(/verify your email/i);
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it("logs in a verified user and sets the session cookie", async () => {
    findOne.mockResolvedValueOnce({
      _id: "u1",
      username: "sam",
      password: hash,
      isVerified: true,
    });
    const res = await POST(
      request({ usernameORemail: "sam", password: PASSWORD })
    );

    expect(res.status).toBe(200);
    expect(cookieSet).toHaveBeenCalledWith(
      expect.objectContaining({ name: "authToken", httpOnly: true })
    );
  });

  it("rejects non-text identifiers without querying the database", async () => {
    const res = await POST(
      request({ usernameORemail: { $ne: "" }, password: "x" })
    );

    expect(res.status).toBe(400);
    expect(findOne).not.toHaveBeenCalled();
  });
});
