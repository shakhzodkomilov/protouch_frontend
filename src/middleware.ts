import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./shared/i18n/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

// Faqat mobilda ko'rinishi kerak bo'lgan sahifalar ro'yxati
const protectedMobileRoutes = ["settings", "catalogMobile"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Qurilmani aniqlash
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  // 2. Pathname ichidan til prefiksini olib tashlab, toza yo'lni tekshirish
  // Masalan: '/uz/catalogMobile' -> 'catalogMobile'
  const pathWithoutLocale = pathname
    .split("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((part) => !locales.includes(part as any) && part !== "")
    .join("/");

  // 3. Agar hozirgi sahifa himoyalangan ro'yxatda bo'lsa va qurilma mobil bo'lmasa
  const isProtectedRoute = protectedMobileRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isMobile) {
    // Desktop foydalanuvchini asosiy sahifaga yuborish
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // 4. Qolgan holatlarda next-intl ishlaydi
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
