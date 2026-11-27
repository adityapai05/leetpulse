import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { findOne, sendEmail, connectDB } = vi.hoisted(() => ({
  findOne: vi.fn(),
  sendEmail: vi.fn(),
  connectDB: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ default: connectDB }));
vi.mock("@/models/Users", () => ({ default: () => ({ findOne }) }));
vi.mock("@/lib/sendEmail", () => ({ sendEmail }));

import { POST } from "./route";

const knownUser = {
  _id: { toString: () => "u1" },
  email: "sam@example.com",
  firstName: "SAM",
  password: "stored-hash",
};

function request(body: unknown) {
  return new NextRequest("http://localhost/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  findOne.mockReset();
  sendEmail.mockReset().mockResolvedValue(undefined);
  connectDB.mockReset().mockResolvedValue(undefined);
  process.env.JWT_SECRET = "test-secret";
  process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
});

describe("POST /api/auth/forgot-password", () => {
  it("gives identical responses for a known and an unknown account", async () => {
    findOne.mockResolvedValueOnce(knownUser);
    const known = await POST(request({ emailOrUsername: "sam@example.com" }));

    findOne.mockResolvedValueOnce(null);
    const unknown = await POST(request({ emailOrUsername: "nobody@example.com" }));

    expect(known.status).toBe(200);
    expect(unknown.status).toBe(200);
    expect(await known.json()).toEqual(await unknown.json());
  });

  it("sends the email only when the account exists", async () => {
    findOne.mockResolvedValueOnce(null);
    await POST(request({ emailOrUsername: "nobody@example.com" }));
    expect(sendEmail).not.toHaveBeenCalled();

    findOne.mockResolvedValueOnce(knownUser);
    await POST(request({ emailOrUsername: "sam@example.com" }));
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail.mock.calls[0][0]).toBe("sam@example.com");
    expect(sendEmail.mock.calls[0][2]).toContain("/reset-password?token=");
  });

  it("still answers the same way when the email cannot be sent", async () => {
    findOne.mockResolvedValueOnce(knownUser);
    sendEmail.mockRejectedValueOnce(new Error("smtp down"));
    const res = await POST(request({ emailOrUsername: "sam@example.com" }));

    expect(res.status).toBe(200);
  });

  it("asks the learner to try again when the database cannot be reached", async () => {
    connectDB.mockRejectedValueOnce(new Error("db down"));
    const res = await POST(request({ emailOrUsername: "sam@example.com" }));

    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/try again/i);
  });
});
