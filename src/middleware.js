import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 1. Allow auth routes & API routes
  if (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 2. Protect All Other Pages (Force Login)
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Protect Admin Page (Admin Only)
  if (pathname.startsWith("/admin") && token.isAdmin !== true) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)'],
};
