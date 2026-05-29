"use client";

import { Box, Button, Link as MuiLink } from "@mui/material";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("header");

  const menuItems = [
    { title: t("actions"), href: "/sales" },
    { title: t("delivery"), href: "/delivery" },
    { title: t("about"), href: "/about-us" },
    { title: t("legaldoc"), href: "/legaldoc" },
    { title: t("Goverprocurement"), href: "/b2b" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        zIndex: "250",
        "@media (max-width:900px)": {
          width: "100%",
          position: "fixed",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          height: 70,
          display: "flex",
          alignItems: "center",
          gap: 3,
          "@media (max-width:900px)": {
            mr: 3,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "none",
            "@media (max-width:900px)": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <MuiLink
            href="tel:+998977782347"
            underline="none"
            display={"none"}
            sx={{
              ...contactStyleResponsive,
              "@media (max-width:900px)": {
                display: "flex",
              },
            }}
          >
            <Image src="/call-outline.svg" alt="call" width={30} height={30} />
          </MuiLink>
          <Image
            src="/LOGOPROTOUCH.svg"
            alt="Protouch"
            width={250}
            height={40}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/${locale}`)}
            priority
          />
          <MuiLink
            href="https://yandex.uz/maps/-/CLdXa09U"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            display={"none"}
            sx={{
              ...contactStyleResponsive,
              "@media (max-width:900px)": {
                display: "flex",
              },
            }}
          >
            <Image src="/location.svg" alt="location" width={30} height={30} />
          </MuiLink>
        </Box>

        {/* LOGO (DESKTOP) */}
        <Box
          sx={{
            flexShrink: 0,
            cursor: "pointer",
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Image
            src="/LOGOPROTOUCH.svg"
            alt="Protouch"
            width={250}
            height={40}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/${locale}`)}
            priority
          />
        </Box>

        {/* CENTER CONTACTS (DESKTOP) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <MuiLink href="tel:+998977782347" underline="none" sx={contactStyle}>
            <Image src="/call-outline.svg" alt="call" width={18} height={18} />
            +998 78 333 10 70
          </MuiLink>

          <MuiLink href="tel:+998951700571" underline="none" sx={contactStyle}>
            <Image src="/call-outline.svg" alt="call" width={18} height={18} />
            +998 95 170 05 71
          </MuiLink>

          <MuiLink
            href="https://yandex.uz/maps/-/CLdXa09U"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={contactStyle}
          >
            <Image src="/location.svg" alt="location" width={18} height={18} />
            {t("address")}
          </MuiLink>
        </Box>

        {/* RIGHT MENU (DESKTOP) */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            "@media (max-width:1360px)": {
              display: "none",
            },
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.title}
              component={Link}
              href={`/${locale}${item.href}`}
              sx={{
                fontWeight: 500,
                color: "#1D1D1F",
                textTransform: "none",
                borderRadius: 1,
                fontSize: 16,
                "&:hover": {
                  bgcolor: "rgba(36,159,252,0.08)",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const contactStyle = {
  fontWeight: 600,
  color: "#1D1D1F",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  gap: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  "&:hover": {
    color: "#249FFC",
  },
};

const contactStyleResponsive = {
  fontWeight: 600,
  color: "#1D1D1F",
  fontSize: 14,
  alignItems: "center",
  gap: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  "&:hover": {
    color: "#249FFC",
  },
};

export default Navbar;
