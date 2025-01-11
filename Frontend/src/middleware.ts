import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE, LOCALE_PREFIX } from "@/lib/i18n/config";
import { getToken } from "next-auth/jwt";

// Create the intl middleware
const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: LOCALE_PREFIX
});

// Define unprotected routes that don't require authentication
const unprotectedPaths = ["/", "/login"];

// Check if the path matches any unprotected route
const isUnprotectedRoute = (pathname: string) => {
  // Remove locale prefix if exists (e.g., /en/login -> /login)
  const pathWithoutLocale = pathname.split("/").slice(2).join("/");

  const normalizedPath = `/${pathWithoutLocale}`;

  return unprotectedPaths.some(
    (path) => normalizedPath === path || normalizedPath === path + "/"
  );
};

// Main middleware handler
export default async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith("https://") ??
        !!process.env.VERCEL_URL
    });

    const { pathname } = request.nextUrl;

    // Handle unprotected routes first
    if (isUnprotectedRoute(pathname)) {
      return intlMiddleware(request);
    }

    // For all other routes, require authentication
    if (!token) {
      // Get locale from path or use default
      const locale = pathname.split("/")[1] || DEFAULT_LOCALE;

      // Create login URL with callback
      const loginUrl = new URL(`/${locale}`, request.url);

      return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, continue with intl middleware
    return intlMiddleware(request);
  } catch (error) {
    console.error("Middleware error:", error);
    return intlMiddleware(request);
  }
}

// Configure matcher
export const config = {
  matcher: [
    // Skip all internal paths
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)"
  ]
};
