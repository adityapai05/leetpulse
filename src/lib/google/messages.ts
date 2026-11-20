const MESSAGES: Record<string, string> = {
  cancelled:
    "Google sign-in was cancelled. You can try again or log in with your password.",
  invalid_state:
    "We could not verify that Google sign-in. Please try again from this page.",
  unverified:
    "Your Google email address is not verified, so we could not sign you in.",
  unavailable: "We could not reach Google. Please try again in a moment.",
  failed: "Google sign-in did not work. Please try again.",
};

/** Plain-language message for the ?google=<code> value on the login page. */
export function googleErrorMessage(
  code: string | null | undefined
): string | null {
  if (!code) return null;
  return MESSAGES[code] ?? MESSAGES.failed;
}
