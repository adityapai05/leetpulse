import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { statesMatch } from "@/lib/google/state";
import { decodeIdToken, validateGoogleClaims } from "@/lib/google/claims";
import { resolveGoogleAccount } from "@/lib/google/account";
import { createMongoUserRepo } from "@/lib/google/mongoRepo";
import {
  GOOGLE_TOKEN_URL,
  STATE_COOKIE,
  STATE_COOKIE_PATH,
  getBaseUrl,
  getRedirectUri,
} from "@/lib/google/config";

export const dynamic = "force-dynamic";

type TokenResult =
  | { ok: true; idToken: string }
  | { ok: false; reason: "unavailable" | "failed" };

async function exchangeCode(
  code: string,
  redirectUri: string
): Promise<TokenResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, reason: res.status >= 500 ? "unavailable" : "failed" };
    }

    const data = (await res.json()) as { id_token?: string };
    return data.id_token
      ? { ok: true, idToken: data.id_token }
      : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "unavailable" };
  } finally {
    clearTimeout(timer);
  }
}

function failure(baseUrl: string, code: string): NextResponse {
  const response = NextResponse.redirect(
    new URL(`/login?google=${code}`, baseUrl)
  );
  response.cookies.delete({ name: STATE_COOKIE, path: STATE_COOKIE_PATH });
  return response;
}

// The session cookie is SameSite=Strict. A plain redirect that started at
// Google would be sent without it and bounce the visitor to the landing page,
// so we answer with a page that moves on by itself instead.
const SUCCESS_PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=/explore" />
    <title>Signing you in</title>
  </head>
  <body>
    <script>window.location.replace("/explore");</script>
    <noscript><a href="/explore">Continue to leetpulse</a></noscript>
  </body>
</html>`;

export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrl(req.nextUrl.origin);
  const params = req.nextUrl.searchParams;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const jwtSecret = process.env.JWT_SECRET;
  if (!clientId || !process.env.GOOGLE_CLIENT_SECRET || !jwtSecret) {
    return failure(baseUrl, "failed");
  }

  // The visitor refused consent or closed the consent screen.
  const googleError = params.get("error");
  if (googleError) {
    return failure(
      baseUrl,
      googleError === "access_denied" ? "cancelled" : "failed"
    );
  }

  // The response must belong to a sign-in that this browser started.
  const cookieState = req.cookies.get(STATE_COOKIE)?.value;
  if (!statesMatch(cookieState, params.get("state"))) {
    return failure(baseUrl, "invalid_state");
  }

  const code = params.get("code");
  if (!code) return failure(baseUrl, "failed");

  const tokens = await exchangeCode(code, getRedirectUri(baseUrl));
  if ("reason" in tokens) return failure(baseUrl, tokens.reason);

  const result = validateGoogleClaims(decodeIdToken(tokens.idToken), clientId);
  if ("reason" in result) {
    return failure(
      baseUrl,
      result.reason === "unverified_email" ? "unverified" : "failed"
    );
  }
  
  let userId: string;
  try {
    await connectDB();
    const { user } = await resolveGoogleAccount(
      result.profile,
      createMongoUserRepo()
    );
    userId = user.id;
  } catch {
    console.error("[google-callback] could not complete sign-in");
    return failure(baseUrl, "failed");
  }

  const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: "30d" });

  const response = new NextResponse(SUCCESS_PAGE, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
  response.cookies.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  response.cookies.delete({ name: STATE_COOKIE, path: STATE_COOKIE_PATH });
  return response;
}
