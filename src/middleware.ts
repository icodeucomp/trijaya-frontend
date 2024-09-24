import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const localeMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle /dashboard routes with custom logic if needed
  if (pathname.startsWith("/admin")) {
    // Add any custom middleware logic for /dashboard here
    return NextResponse.next();
  }

  // For other routes, fallback to the locale middleware
  return localeMiddleware(req);
}

export const config = {
  matcher: ["/", "/(id|en|cn)/:path*", "/dashboard/:path*"],
};
