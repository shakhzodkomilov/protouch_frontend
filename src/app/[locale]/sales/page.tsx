"use client";

import { Box, Typography, Link } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { CheckCircle } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function Discount() {
  const t = useTranslations("Discount");
  const telegramLink = "https://t.me/ProtouchMarket";

  const features = t.raw("features") as string[];

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 800, mx: "auto", color: "#000" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          gap: 1,
        }}
      >
        <TelegramIcon sx={{ color: "#0088cc", fontSize: 32 }} />
        <Link
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: 700,
            fontSize: "1.8rem",
            color: "#000",
            textDecoration: "none",
          }}
        >
          {t("title")}
        </Link>
      </Box>

      {/* Intro */}
      <Typography sx={{ mb: 3, lineHeight: 1.7 }}>
        {t("intro.line1")}
      </Typography>
      <Typography sx={{ mb: 3, lineHeight: 1.7 }}>
        {t("intro.line2")}
      </Typography>
      <Typography sx={{ mb: 5, lineHeight: 1.7 }}>
        {t("intro.line3")}
      </Typography>

      {/* About */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        {t("about.title")}
      </Typography>
      <Typography sx={{ mb: 4, lineHeight: 1.7 }}>
        {t("about.description")}
      </Typography>

      {/* Features */}
      <Box component="ul" sx={{ listStyle: "none", p: 0, mb: 5 }}>
        {features.map((item, index) => (
          <Box
            component="li"
            key={index}
            sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
          >
            <CheckCircle sx={{ color: "#3CB371", mr: 1 }} />
            <Typography sx={{ lineHeight: 1.6 }}>{item}</Typography>
          </Box>
        ))}
      </Box>

      {/* Subscribe */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <TelegramIcon sx={{ color: "#0088cc" }} />
        <Link
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: 600, color: "#000", textDecoration: "none" }}
        >
          {t("subscribe")} @ProtouchMarket
        </Link>
      </Box>
    </Box>
  );
}
