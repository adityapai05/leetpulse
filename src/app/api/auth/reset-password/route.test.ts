import { describe, it, expect, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { passwordFingerprint, signResetToken } from "@/lib/resetToken";

const { findById, connectDB } = vi.hoisted(() => ({
  findById: vi.fn(),
  connectDB: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ default: connectDB }));
vi.mock("@/models/Users", () => ({ default: () => ({ findById }) }));

import { POST } from "./route";

const SECRET = "test-secret";
const NEW_PASSWORD = "Newpass#123";

let user: { password: string | undefined; save: ReturnType<typeof vi.fn> };

function request(body: unknown) {
  return new NextRequest("http://localhost/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  process.env.JWT_SECRET = SECRET;
  user = { password: "old-hash", save: vi.fn().mockResolvedValue(undefined) };
  findById.mockReset().mockResolvedValue(user);
  connectDB.mockReset().mockResolvedValue(undefined);
});

describe("POST /api/auth/reset-password", () => {
  it("changes the password the first time a valid link is used", async () => {
    const token = signResetToken("u1", user.password, SECRET);
    const res = await POST(request({ token, password: NEW_PASSWORD }));

    expect(res.status).toBe(200);
    expect(bcrypt.compareSync(NEW_PASSWORD, user.password as string)).toBe(true);
    expect(user.save).toHaveBeenCalledTimes(1);
  });

  it("rejects the same link the second time", async () => {
    const token = signResetToken("u1", user.password, SECRET);
    const first = await POST(request({ token, password: NEW_PASSWORD }));
    const second = await POST(request({ token, password: "Another#Pass9" }));

    expect(first.status).toBe(200);
    expect(second.status).toBe(400);
    expect((await second.json()).error).toMatch(/request a new one/i);
    expect(user.save).toHaveBeenCalledTimes(1);
  });

  it("rejects a token that was issued for another purpose", async () => {
    const token = jwt.sign(
      {
        sub: "u1",
        purpose: "email_verification",
        pwf: passwordFingerprint("old-hash"),
      },
      SECRET,
      { expiresIn: 60 }
    );
    const res = await POST(request({ token, password: NEW_PASSWORD }));

    expect(res.status).toBe(400);
    expect(user.save).not.toHaveBeenCalled();
  });

  it("connects to the database before looking up the user", async () => {
    const token = signResetToken("u1", user.password, SECRET);
    await POST(request({ token, password: NEW_PASSWORD }));

    expect(connectDB.mock.invocationCallOrder[0]).toBeLessThan(
      findById.mock.invocationCallOrder[0]
    );
  });

  it("asks the learner to try again when the database cannot be reached", async () => {
    connectDB.mockRejectedValueOnce(new Error("db down"));
    const token = signResetToken("u1", user.password, SECRET);
    const res = await POST(request({ token, password: NEW_PASSWORD }));

    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/try again/i);
    expect(user.save).not.toHaveBeenCalled();
  });

  it("lets a Google-only account set a password", async () => {
    user.password = undefined;
    const token = signResetToken("u1", undefined, SECRET);
    const res = await POST(request({ token, password: NEW_PASSWORD }));

    expect(res.status).toBe(200);
    expect(user.password).toBeDefined();
  });

  it("rejects a weak password", async () => {
    const token = signResetToken("u1", user.password, SECRET);
    const res = await POST(request({ token, password: "weak" }));

    expect(res.status).toBe(400);
    expect(user.save).not.toHaveBeenCalled();
  });
});
