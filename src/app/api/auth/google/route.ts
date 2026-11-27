import { NextRequest, NextResponse } from "next/server";
import { createState } from "@/lib/google/state";
import {
  STATE_COOKIE,
  STATE_COOKIE_PATH,
  buildAuthUrl,
  getBaseUrl,
  getRedirectUri,
} from "@/lib/google/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrl(req.nextUrl.origin);
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(new URL("/login?google=failed", baseUrl));
  }

  const state = createState();
  const response = NextResponse.redirect(
    buildAuthUrl(clientId, getRedirectUri(baseUrl), state)
  );

  // "lax" so the cookie is still sent when Google sends the visitor back.
  response.cookies.set({
    name: STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: STATE_COOKIE_PATH,
    maxAge: 60 * 10,
  });

  return response;
}
