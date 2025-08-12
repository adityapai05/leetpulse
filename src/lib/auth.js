import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromCookies() {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        cookieStore.delete("authToken", { path: "/" });
        return null;
    }
}
