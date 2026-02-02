"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  ChevronRight,
  FavoriteBorder,
  ScaleOutlined,
  StarBorder,
  LocalShippingOutlined,
  InfoOutlined,
  AccountBalanceOutlined,
  ShieldOutlined,
  Translate,
  ChatBubbleOutline,
  PhoneEnabledOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function MobileSettings() {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("MobileSettings");

  // --- LOGIKA: Tilni almashtirish ---
  const handleLanguageToggle = () => {
    const nextLocale = locale === "ru" ? "uz" : "ru";
    // Joriy yo'ldagi til kodini almashtirish (/ru/about -> /uz/about)
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const MENU_ITEMS = [
    { text: t("menu.favorites"), icon: <FavoriteBorder />, path: "/favorites" },
    { text: t("menu.comparison"), icon: <ScaleOutlined />, path: "/compare" },
    { text: t("menu.actions"), icon: <StarBorder />, path: "/sales" },
    {
      text: t("menu.delivery"),
      icon: <LocalShippingOutlined />,
      path: "/delivery",
    },
    { text: t("menu.about"), icon: <InfoOutlined />, path: "/about" },
    {
      text: t("menu.procurement"),
      icon: <AccountBalanceOutlined />,
      path: "/legaldoc",
    },
    { text: t("menu.b2b"), icon: <ShieldOutlined />, path: "/b2b" },
    // Til almashtirish uchun maxsus item
    {
      text: t("menu.language"),
      icon: <Translate />,
      action: handleLanguageToggle,
      label: locale === "ru" ? "O'zbekcha" : "Русский",
    },
    { text: t("menu.chat"), icon: <ChatBubbleOutline />, path: "/chat" },
  ];

  return (
    <Box sx={{ bgcolor: "#F5F7FB", minHeight: "100vh", p: 2, pt: 8 }}>
      {/* Auth Section */}
      <Paper
        elevation={0}
        sx={{ mt: 7, p: 2, borderRadius: 4, mb: 2, textAlign: "center" }}
      >
        <Typography
          sx={{ fontSize: 14, fontWeight: 500, mb: 2, color: "#000" }}
        >
          {t("auth.title")}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#249FFC",
            color: "#fff",
            borderRadius: 2,
            mb: 1,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#1e8ce0" },
          }}
        >
          {t("auth.register")}
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{
            bgcolor: "#F8F9FA",
            color: "#000",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {t("auth.login")}
        </Button>
      </Paper>

      {/* Contacts Row */}
      <Paper elevation={0} sx={{ borderRadius: 4, mb: 2, overflow: "hidden" }}>
        <ListItemButton
          component={Link}
          href={`/${locale}/settings/contacts`}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "#249FFC" }}>
            <PhoneEnabledOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("menu.contacts")}
            primaryTypographyProps={{ fontWeight: 500, color: "#000" }}
          />
          <ChevronRight sx={{ color: "#BDC1C8" }} />
        </ListItemButton>
      </Paper>

      {/* Main Menu List */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <List disablePadding>
          {MENU_ITEMS.map((item, index) => {
            // Agar elementda path bo'lsa Link, bo'lmasa div (onClick uchun) ishlatamiz
            const isButton = !!item.action;

            return (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={item.action}
                    component={isButton ? "div" : Link}
                    href={isButton ? undefined : `/${locale}${item.path}`}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "#249FFC" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      secondary={item.label} // Til nomi (masalan: Русский)
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#000",
                      }}
                      secondaryTypographyProps={{
                        fontSize: 13,
                        color: "#249FFC",
                        fontWeight: 600,
                      }}
                    />
                    <ChevronRight sx={{ color: "#BDC1C8" }} />
                  </ListItemButton>
                </ListItem>
                {index !== MENU_ITEMS.length - 1 && (
                  <Divider variant="inset" sx={{ ml: 6, opacity: 0.5 }} />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
