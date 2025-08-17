import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookieStore = cookies();
    cookieStore.delete("authToken", { path: "/" });

    // redirect to login after logout
    return NextResponse.redirect(new URL("/login", request.url));
}
