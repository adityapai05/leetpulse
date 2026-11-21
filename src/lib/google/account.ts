import type { GoogleProfile } from "./claims";
import { generateUniqueUsername } from "./username";

export interface AccountUser {
  id: string;
  googleId?: string | null;
  isVerified?: boolean;
}

export interface NewGoogleUser {
  username: string;
  firstName: string;
  email: string;
  googleId: string;
}

export interface UserRepo {
  findByGoogleId(googleId: string): Promise<AccountUser | null>;
  findByEmail(email: string): Promise<AccountUser | null>;
  isUsernameTaken(username: string): Promise<boolean>;
  create(user: NewGoogleUser): Promise<AccountUser>;
  linkGoogleId(
    userId: string,
    googleId: string,
    clearPassword: boolean
  ): Promise<AccountUser>;
}

export type AccountOutcome = "created" | "linked" | "existing";

export interface AccountResult {
  user: AccountUser;
  outcome: AccountOutcome;
}

export class GoogleAccountConflictError extends Error {
  constructor() {
    super("This email is already linked to a different Google account");
    this.name = "GoogleAccountConflictError";
  }
}

export function isDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    (err as { code?: unknown }).code === 11000
  );
}

/**
 * Finds, links or creates the account for a verified Google profile.
 * FR-1.2 (create), FR-1.3 (link by email without a second account).
 */
export async function resolveGoogleAccount(
  profile: GoogleProfile,
  repo: UserRepo
): Promise<AccountResult> {
  const byGoogleId = await repo.findByGoogleId(profile.googleId);
  if (byGoogleId) return { user: byGoogleId, outcome: "existing" };

  const byEmail = await repo.findByEmail(profile.email);
  if (byEmail) {
    if (byEmail.googleId && byEmail.googleId !== profile.googleId) {
      throw new GoogleAccountConflictError();
    }
    // An account whose email was never verified may have been registered by
    // someone else with a password they chose. Google has now proven the
    // address belongs to this person, so that old password is removed.
    const clearPassword = byEmail.isVerified !== true;
    const linked = await repo.linkGoogleId(
      byEmail.id,
      profile.googleId,
      clearPassword
    );
    return { user: linked, outcome: "linked" };
  }

  const username = await generateUniqueUsername(profile.email, (name) =>
    repo.isUsernameTaken(name)
  );

  try {
    const created = await repo.create({
      username,
      firstName: profile.firstName.toUpperCase(),
      email: profile.email,
      googleId: profile.googleId,
    });
    return { user: created, outcome: "created" };
  } catch (err) {
    // Two sign-ins for the same new person at once: the other one won.
    if (isDuplicateKeyError(err)) {
      const existing = await repo.findByEmail(profile.email);
      if (existing) return { user: existing, outcome: "existing" };
    }
    throw err;
  }
}
