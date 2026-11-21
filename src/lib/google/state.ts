import { randomBytes, timingSafeEqual } from "crypto";

export function createState(): string {
  return randomBytes(32).toString("hex");
}

/** True only when the cookie value and the value returned by Google are equal. */
export function statesMatch(
  cookieState: string | null | undefined,
  queryState: string | null | undefined
): boolean {
  if (!cookieState || !queryState) return false;
  const a = Buffer.from(cookieState);
  const b = Buffer.from(queryState);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}