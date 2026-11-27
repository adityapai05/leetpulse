import { describe, it, expect } from "vitest";
import { baseUsername, generateUniqueUsername } from "./username";

describe("baseUsername", () => {
  it("lowercases and strips symbols from the email name", () => {
    expect(baseUsername("Aditya.Pai+x@gmail.com")).toBe("adityapaix");
  });
  it("pads names that are too short", () => {
    expect(baseUsername("ab@x.com")).toBe("abuser");
  });
  it("falls back when nothing valid is left", () => {
    expect(baseUsername("...@x.com")).toBe("user");
  });
  it("truncates very long names to 20 characters", () => {
    expect(baseUsername("a".repeat(40) + "@x.com")).toHaveLength(20);
  });
});

describe("generateUniqueUsername", () => {
  it("returns the base name when it is free", async () => {
    expect(await generateUniqueUsername("sam@x.com", async () => false)).toBe("sam");
  });
  it("adds a numeric suffix when the base name is taken", async () => {
    const name = await generateUniqueUsername("sam@x.com", async (n) => n === "sam", () => 0);
    expect(name).toBe("sam1000");
  });
  it("never exceeds 20 characters when adding a suffix", async () => {
    const base = "a".repeat(20);
    const name = await generateUniqueUsername(`${base}@x.com`, async (n) => n === base, () => 0);
    expect(name.length).toBeLessThanOrEqual(20);
    expect(name).not.toBe(base);
  });
  it("still returns a valid name when every candidate is taken", async () => {
    const name = await generateUniqueUsername("sam@x.com", async () => true);
    expect(name).toMatch(/^[a-z0-9_]{3,20}$/);
  });
});