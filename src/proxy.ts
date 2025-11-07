import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const user = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  if (user && pathname === "/") {
    return NextResponse.redirect(new URL("/explore", req.url));
  }

  if (!user && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/explore",
    "/review",
    "/profile",
    "/problems/:path*",
    "/leaderboard",
  ],
};
