import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE, LOCALE_PREFIX } from "@/i18n/config";

// Create the middleware
const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: LOCALE_PREFIX
});

// Main middleware handler
export default async function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

// Configure matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico).*)"]
};
