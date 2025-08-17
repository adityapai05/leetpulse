import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
