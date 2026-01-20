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

import { useParams } from "next/navigation";

const MENU_ITEMS = [
  { text: "Избранное", icon: <FavoriteBorder />, path: "/favorites" },
  { text: "Сравнение", icon: <ScaleOutlined />, path: "/compare" },
  { text: "Акции", icon: <StarBorder />, path: "/sales" },
  { text: "Доставка", icon: <LocalShippingOutlined />, path: "/delivery" },
  { text: "О нас", icon: <InfoOutlined />, path: "/about-us" },
  {
    text: "Государственные закупки",
    icon: <AccountBalanceOutlined />,
    path: "/gov-purchases",
  },
  { text: "Юр. лицам", icon: <ShieldOutlined />, path: "/b2b" },
  { text: "Язык", icon: <Translate />, path: "#" },
  { text: "Связь", icon: <ChatBubbleOutline />, path: "/chat" },
];

export default function MobileSettings() {
  const { locale } = useParams();

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
          Получайте бонусы, сохраняйте и отслеживайте заказы
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
          Зарегистрироваться
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
          Войти
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
            primary="Контакты"
            primaryTypographyProps={{ fontWeight: 500, color: "#000" }}
          />
          <ChevronRight sx={{ color: "#BDC1C8" }} />
        </ListItemButton>
      </Paper>

      {/* Main Menu List */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <List disablePadding>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={`/${locale}${item.path}`}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#249FFC" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#000",
                    }}
                  />
                  <ChevronRight sx={{ color: "#BDC1C8" }} />
                </ListItemButton>
              </ListItem>
              {index !== MENU_ITEMS.length - 1 && (
                <Divider variant="inset" sx={{ ml: 6, opacity: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
