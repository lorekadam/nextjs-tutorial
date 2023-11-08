import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, locales, cookieName } from "./i18n/settings";

export function middleware(req: NextRequest) {
  let lng;
  if (req.cookies.has(cookieName)) {
    lng = req.cookies.get(cookieName)?.value;
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if lng in path is not supported
  if (
    !locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = locales.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|static|.*\\..*|_next|_next/static|_next/image|assets|favicon.ico|sw.js|robots.txt).*)",
  ],
};
