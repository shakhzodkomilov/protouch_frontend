"use client";
import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { Verified, CheckCircle } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const B2BPageSimple = () => {
  const t = useTranslations("b2b");
  const partners = t.raw("partners.list") as string[];
  const steps = t.raw("howToOrder.steps") as string[];
  const brands = t.raw("brands.list") as string[];

  // Brand images mapping
  const brandImages: Record<string, string> = {
    Huawei: "/huawei.svg",
    Dahua: "/dahua.svg",
    Minew: "/minew.png",
    Okview: "/okvBrend.png",
    Yarmee: "/yamahaBrend.png", // or create a specific Yarmee icon
    Eacome: "/shileBrand.png", // or create a specific Eacome icon
    Minrray: "/minrray.svg",
    "Pudu Robotics": "/porurobotics.svg",
    "Orion Star": "/galaxyhub.svg", // or create a specific Orion Star icon
  };

  return (
    <Box
      component="main"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 4, px: { xs: 2, md: 4 } }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 28, md: 36 },
              mb: 2,
              color: "#000",
            }}
          >
            {t("header.title")}
          </Typography>
          <Typography sx={{ color: "#333", fontSize: 16, lineHeight: 1.7 }}>
            {t("header.description")}
            <br />
            {t("header.subDescription")}
          </Typography>
        </Box>

        {/* Partners Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, mb: 2, color: "#000", fontSize: 22 }}
          >
            {t("partners.title")}
          </Typography>
          <Typography sx={{ color: "#555", mb: 2 }}>
            {t("partners.description")}
          </Typography>
          <Stack spacing={1}>
            {partners.map((item, i) => (
              <Stack direction="row" spacing={1} alignItems="center" key={i}>
                <CheckCircle sx={{ color: "#249FFC", fontSize: 20 }} />
                <Typography sx={{ color: "#000" }}>{item}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Brands Section */}
        <Box sx={{ mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: "24px", bgcolor: "#f5f5f5" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Verified sx={{ color: "#249FFC" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: "#000" }}>
                {t("brands.title")}
              </Typography>
            </Stack>

            {/* Brand Grid with Icons */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                },
                gap: 2,
                mb: 3,
              }}
            >
              {brands.map((brand, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    bgcolor: "#fff",
                    borderRadius: "12px",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={brandImages[brand]}
                    alt={brand}
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {brand}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              sx={{ fontWeight: 700, fontSize: 20, mt: 3, color: "#000" }}
            >
              {t("brands.description")}
            </Typography>
          </Paper>
        </Box>

        {/* How to Order */}
        <Box sx={{ mb: 6, p: 4, bgcolor: "#f9f9f9", borderRadius: "32px" }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 24,
              mb: 3,
              textAlign: "center",
              color: "#000",
            }}
          >
            {t("howToOrder.title")}
          </Typography>
          <Stack spacing={3}>
            {steps.map((step, i) => (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "#249FFC",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Box>
                <Typography sx={{ color: "#000", fontSize: 16 }}>
                  {step}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default B2BPageSimple;
