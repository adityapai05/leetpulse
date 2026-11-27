import { describe, it, expect, vi } from "vitest";
import {
  GoogleAccountConflictError,
  isDuplicateKeyError,
  resolveGoogleAccount,
  type NewGoogleUser,
  type UserRepo,
} from "./account";

const profile = {
  googleId: "g-1",
  email: "sam@example.com",
  name: "Sam Lee",
  firstName: "Sam",
};

function makeRepo(overrides: Partial<UserRepo> = {}): UserRepo {
  return {
    findByGoogleId: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    isUsernameTaken: vi.fn().mockResolvedValue(false),
    create: vi
      .fn()
      .mockImplementation(async (u: NewGoogleUser) => ({
        id: "new-1",
        googleId: u.googleId,
        isVerified: true,
      })),
    linkGoogleId: vi
      .fn()
      .mockImplementation(async (id: string, googleId: string) => ({
        id,
        googleId,
        isVerified: true,
      })),
    ...overrides,
  };
}

describe("resolveGoogleAccount", () => {
  it("creates a verified account for a new Google email", async () => {
    const repo = makeRepo();
    const result = await resolveGoogleAccount(profile, repo);

    expect(result.outcome).toBe("created");
    expect(repo.create).toHaveBeenCalledWith({
      username: "sam",
      firstName: "SAM",
      email: "sam@example.com",
      googleId: "g-1",
    });
    expect(repo.linkGoogleId).not.toHaveBeenCalled();
  });

  it("picks another username when the first one is taken", async () => {
    const repo = makeRepo({
      isUsernameTaken: vi.fn().mockImplementation(async (n: string) => n === "sam"),
    });
    await resolveGoogleAccount(profile, repo);

    const created = (repo.create as ReturnType<typeof vi.fn>).mock
      .calls[0][0] as NewGoogleUser;
    expect(created.username).not.toBe("sam");
    expect(created.username.startsWith("sam")).toBe(true);
  });

  it("signs in a returning Google user without touching anything else", async () => {
    const repo = makeRepo({
      findByGoogleId: vi.fn().mockResolvedValue({ id: "u1", googleId: "g-1" }),
    });
    const result = await resolveGoogleAccount(profile, repo);

    expect(result).toEqual({
      user: { id: "u1", googleId: "g-1" },
      outcome: "existing",
    });
    expect(repo.findByEmail).not.toHaveBeenCalled();
    expect(repo.create).not.toHaveBeenCalled();
  });

  it("links a matching verified account instead of creating a second one", async () => {
    const repo = makeRepo({
      findByEmail: vi.fn().mockResolvedValue({ id: "u2", isVerified: true }),
    });
    const result = await resolveGoogleAccount(profile, repo);

    expect(result.outcome).toBe("linked");
    expect(repo.linkGoogleId).toHaveBeenCalledWith("u2", "g-1", false);
    expect(repo.create).not.toHaveBeenCalled();
  });

  it("removes the old password when linking an account that was never verified", async () => {
    const repo = makeRepo({
      findByEmail: vi.fn().mockResolvedValue({ id: "u3", isVerified: false }),
    });
    await resolveGoogleAccount(profile, repo);

    expect(repo.linkGoogleId).toHaveBeenCalledWith("u3", "g-1", true);
  });

  it("refuses to take over an account linked to a different Google account", async () => {
    const repo = makeRepo({
      findByEmail: vi
        .fn()
        .mockResolvedValue({ id: "u4", googleId: "g-OTHER", isVerified: true }),
    });

    await expect(resolveGoogleAccount(profile, repo)).rejects.toBeInstanceOf(
      GoogleAccountConflictError
    );
    expect(repo.linkGoogleId).not.toHaveBeenCalled();
  });

  it("returns the existing account when two sign-ins race to create it", async () => {
    const repo = makeRepo({
      findByEmail: vi
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: "winner" }),
      create: vi.fn().mockRejectedValue({ code: 11000 }),
    });
    const result = await resolveGoogleAccount(profile, repo);

    expect(result).toEqual({ user: { id: "winner" }, outcome: "existing" });
  });

  it("passes other database errors on", async () => {
    const repo = makeRepo({
      create: vi.fn().mockRejectedValue(new Error("database down")),
    });

    await expect(resolveGoogleAccount(profile, repo)).rejects.toThrow(
      "database down"
    );
  });
});

describe("isDuplicateKeyError", () => {
  it("recognises MongoDB duplicate key errors only", () => {
    expect(isDuplicateKeyError({ code: 11000 })).toBe(true);
    expect(isDuplicateKeyError({ code: 1 })).toBe(false);
    expect(isDuplicateKeyError(new Error("x"))).toBe(false);
    expect(isDuplicateKeyError(null)).toBe(false);
  });
});
