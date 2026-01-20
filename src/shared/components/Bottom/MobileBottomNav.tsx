"use client";

import { Box, Typography } from "@mui/material";
import { usePathname, useRouter, useParams } from "next/navigation";
import Image from "next/image";

/** * Navigatsiya elementlari ro'yxati.
 * path: i18n dan keyingi qism (masalan: /ru/settings bo'lsa, path "/settings")
 */
const items = [
  {
    label: "Главная",
    icon: "/home.svg",
    iconActive: "/homeActive.svg",
    path: "",
  },
  {
    label: "Корзина",
    icon: "/mobileBasket.svg",
    iconActive: "/basketActive.svg",
    path: "/basket",
  },
  {
    label: "Каталог",
    icon: "/SearchCatalog.svg",
    iconActive: "/catalogActive.svg",
    path: "/catalogMobile",
  },
  {
    label: "Настройки",
    icon: "/settings.svg",
    iconActive: "/settingsActive.svg",
    path: "/settings",
  },
];

export const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        bgcolor: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: {
          xs: "flex",
          md: "none",
        },
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1300,
        pb: 1, // Mobil telefonlarning pastki qismi uchun bo'shliq
      }}
    >
      {items.map(({ label, icon, iconActive, path }) => {
        // Dinamik to'liq yo'l: /ru/settings yoki /uz/basket
        const fullPath = `/${locale}${path}`;

        // Active holatini aniqlash:
        // 1. Asosiy sahifa bo'lsa (path: ""), pathname to'liq mos kelishi kerak.
        // 2. Boshqa sahifalar bo'lsa, pathname shu yo'l bilan boshlanishi kerak (ichki sahifalar uchun).
        const isActive =
          path === ""
            ? pathname === `/${locale}`
            : pathname.startsWith(fullPath);

        return (
          <Box
            key={label}
            onClick={() => router.push(fullPath)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              flex: 1,
              transition: "all 0.2s ease",
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
              }}
            >
              <Image
                src={isActive ? iconActive : icon}
                alt={label}
                width={28}
                height={28}
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#249FFC" : "#9e9e9e",
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
