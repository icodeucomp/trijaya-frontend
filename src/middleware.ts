import { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const localeMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  return localeMiddleware(req);
}

export const config = {
  matcher: ["/", "/(id|en|cn)/:path*"],
};
