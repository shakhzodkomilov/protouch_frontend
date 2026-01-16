import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./shared/i18n/config";

export const middleware = createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
