"use client";

import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const items = [
  {
    label: "Главная",
    icon: "/homeMobile.svg", // SVG yo'li
    path: "/Home",
  },
  {
    label: "Корзина",
    icon: "/SearchCatalog.svg",
    path: "/catalog",
  },
  {
    label: "Каталог",
    icon: "/mobileBasket.svg", // MUI komponenti
    path: "/catalog",
  },
  {
    label: "Вход",
    icon: "/userMobile.svg",
    path: "/login",
  },
];

export const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

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
        pt: 2,
        pb: 2,
      }}
    >
      {items.map(({ label, icon: Icon, path }) => {
        const isActive = pathname === path;

        return (
          <Box
            key={label}
            onClick={() => router.push(path)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: isActive ? "#1e88e5" : "#9e9e9e",
              flex: 1,
            }}
          >
            {/* SVG yoki MUI Icon ekanligini tekshirish */}

            <Box
              sx={{
                width: 26,
                height: 26,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={Icon as string}
                alt={label}
                width={30}
                height={30}
                style={{
                  filter: isActive
                    ? "invert(42%) sepia(93%) saturate(1352%) hue-rotate(185deg) brightness(95%) contrast(92%)"
                    : "none",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                mt: 0.5,
                fontWeight: isActive ? 500 : 400,
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
