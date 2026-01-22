import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value || null;

  const protectedPaths = ["/dashboard","/expenses", "/reports", "/export"];
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}