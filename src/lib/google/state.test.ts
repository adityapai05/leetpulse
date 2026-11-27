import { describe, it, expect } from "vitest";
import { createState, statesMatch } from "./state";

describe("state", () => {
  it("creates a different 64-character value each time", () => {
    const a = createState();
    expect(a).toHaveLength(64);
    expect(createState()).not.toBe(a);
  });
  it("accepts equal values", () => {
    const s = createState();
    expect(statesMatch(s, s)).toBe(true);
  });
  it("rejects altered, missing or different-length values", () => {
    const s = createState();
    expect(statesMatch(s, s.slice(0, -1) + "x")).toBe(false);
    expect(statesMatch(undefined, s)).toBe(false);
    expect(statesMatch(s, null)).toBe(false);
    expect(statesMatch(s, s + "0")).toBe(false);
  });
});