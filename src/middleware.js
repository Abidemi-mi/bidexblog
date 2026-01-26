import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware Path:", pathname, "| Token found:", !!token);

  // 1. Always allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 2. Logic for Authenticated Users
  if (token) {
    // Redirect logged-in users away from Login/Register to Home
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect Admin Page (Admin Only)
    if (pathname.startsWith("/admin") && token.isAdmin !== true) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow everything else for members
    return NextResponse.next();
  }

  // 3. Logic for Guests (Unauthenticated)
  // Only allow Login and Register pages
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  // Force redirect all other guest requests to Login
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)'],
};
