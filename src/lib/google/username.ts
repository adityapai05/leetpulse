const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

/** Builds a valid base username from the name part of an email address. */
export function baseUsername(email: string): string {
  const local = email.split("@")[0] ?? "";
  let base = local.toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (base.length < MIN_LENGTH) base = base + "user";
  return base.slice(0, MAX_LENGTH);
}

/** Returns a username that isTaken reports as free. */
export async function generateUniqueUsername(
  email: string,
  isTaken: (username: string) => Promise<boolean>,
  random: () => number = Math.random,
): Promise<string> {
  const base = baseUsername(email);
  if (!(await isTaken(base))) return base;

  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = String(Math.floor(random() * 9000) + 1000);
    const candidate = base.slice(0, MAX_LENGTH - suffix.length) + suffix;
    if (!(await isTaken(candidate))) return candidate;
  }

  const stamp = Date.now().toString(36).slice(-6);
  return base.slice(0, MAX_LENGTH - stamp.length) + stamp;
}
