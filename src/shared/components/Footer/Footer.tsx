"use client";

import React from "react";
import { Box, Typography, Button, Link, Stack, Container } from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Footer = () => {
  const { locale } = useParams();

  const t = useTranslations("Footer");
  // Phone numbers array for easy management
  const phoneNumbers = [
    "+998 97 778 23 47",
    "+998 95 170 05 71",
    "+998 95 193 77 00",
  ];

  // Social media links
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/protouch-uz",
    instagram:
      "https://www.instagram.com/protouchuz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    telegram: "https://t.me/ProTouchUz",
    facebook: "https://facebook.com/your-company",
  };

  const handlePhoneClick = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, "")}`, "_self");
  };

  const handleLocationClick = () => {
    const locationUrl = "https://yandex.uz/maps/-/CLdW5BYS";
    window.open(locationUrl, "_blank");
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#fafafa" }}>
      <Container maxWidth={false} sx={{ py: 4, maxWidth: "1800px" }}>
        <Box
          component="footer"
          sx={{
            py: 6,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Left Section - Subscription */}
          <Box sx={{ color: "#000" }}>
            <Typography variant="h6" mb={2} sx={{ fontSize: "24px" }}>
              {t("subscription.title")}{" "}
            </Typography>
            <Typography variant="h6" mb={2} sx={{ fontSize: "24px" }}>
              {t("subscription.subtitle")}{" "}
            </Typography>
            <Button
              variant="contained"
              startIcon={<TelegramIcon />}
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                width: "auto",
                padding: "12px 16px",
                borderRadius: "22px",
                bgcolor: "#249FFC",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#1e88e5",
                },
              }}
            >
              Telegram
            </Button>
          </Box>

          {/* Middle Section - Resources */}
          <Box sx={{ color: "#000" }}>
            <Typography variant="h6" mb={2}>
              {t("resources.title")}{" "}
            </Typography>
            <Stack spacing={1} mt={2} gap={3}>
              <Link
                href={`/${locale}/personal-data`}
                underline="hover"
                color="inherit"
              >
                {t("resources.personalData")}{" "}
              </Link>
              <Link
                href={`/${locale}/privacy-policy`}
                underline="hover"
                color="inherit"
              >
                {t("resources.privacy")}{" "}
              </Link>
              <Link
                href={`/${locale}/service`}
                underline="hover"
                color="inherit"
              >
                {t("resources.serviceCenters")}{" "}
              </Link>
            </Stack>
          </Box>

          {/* Right Section - Contacts */}
          <Box sx={{ color: "#000" }}>
            <Typography variant="h6" mb={2}>
              {t("contacts.title")}
            </Typography>
            <Stack spacing={1} gap={2}>
              {phoneNumbers.map((number, index) => (
                <Box
                  key={number}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.7,
                      transform: "translateY(-1px)",
                      transition: "all 0.2s ease",
                    },
                  }}
                  onClick={() => handlePhoneClick(number)}
                >
                  <Image
                    src="/call-outline.svg"
                    width={26}
                    height={30}
                    alt="Call"
                    style={{ height: "auto", width: "26px" }}
                  />
                  <Typography sx={{ userSelect: "none" }}>{number}</Typography>
                </Box>
              ))}
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.7,
                    transform: "translateY(-1px)",
                    transition: "all 0.2s ease",
                  },
                }}
                onClick={handleLocationClick}
              >
                <Image
                  src="/location.svg"
                  width={26}
                  height={30}
                  alt="Location"
                  style={{ height: "auto", width: "26px" }}
                />
                <Typography sx={{ userSelect: "none" }}>
                  {t("contacts.address")}{" "}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ color: "#000", flexShrink: 0 }}>
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              mt="24px"
              justifyContent="space-between"
              gap={2}
              sx={{ flexWrap: "wrap" }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component="a"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              >
                <LinkedInIcon
                  sx={{
                    color: "#000",
                    opacity: "0.2",
                    width: "34px",
                    height: "34px",
                    transition: "opacity 0.2s ease",
                  }}
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component="a"
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              >
                <InstagramIcon
                  sx={{
                    color: "#000",
                    opacity: "0.2", // 20% base opacity
                    width: "34px",
                    height: "34px",
                    transition: "opacity 0.2s ease", // Smooth hover transition
                  }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component="a"
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              >
                <TelegramIcon
                  sx={{
                    color: "#000",
                    opacity: "0.2", // 20% base opacity
                    width: "34px",
                    height: "34px",
                    transition: "opacity 0.2s ease", // Smooth hover transition
                  }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component="a"
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              >
                <FacebookIcon
                  sx={{
                    color: "#000",
                    opacity: "0.2", // 20% base opacity
                    width: "34px",
                    height: "34px",
                    transition: "opacity 0.2s ease", // Smooth hover transition
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Image
                src="/Payme.svg"
                width={180}
                height={30}
                alt="Payme"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
              <Image
                src="/Click.svg"
                width={180}
                height={30}
                alt="Click"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
              <Image
                src="/UzumBank.svg"
                width={180}
                height={30}
                alt="UzumBank"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
              <Image
                src="/YandexMarket.svg"
                width={180}
                height={30}
                alt="YandexMarket"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
