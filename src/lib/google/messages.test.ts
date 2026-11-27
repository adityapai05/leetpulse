import { describe, it, expect } from "vitest";
import { googleErrorMessage } from "./messages";

describe("googleErrorMessage", () => {
  it("returns nothing when there is no error code", () => {
    expect(googleErrorMessage(null)).toBeNull();
    expect(googleErrorMessage(undefined)).toBeNull();
    expect(googleErrorMessage("")).toBeNull();
  });

  it("returns a plain-language message for known codes", () => {
    expect(googleErrorMessage("cancelled")).toMatch(/cancelled/i);
    expect(googleErrorMessage("unavailable")).toMatch(/try again/i);
  });

  it("uses the general message for unknown codes and shows no technical detail", () => {
    const message = googleErrorMessage("something_odd");
    expect(message).toBe(googleErrorMessage("failed"));
    expect(message).not.toMatch(/something_odd|error|token|exception/i);
  });
});
