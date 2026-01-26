"use client";

import React from "react";
import { Box, Typography, Button, Link, Stack, Container } from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  // Phone numbers array for easy management
  const phoneNumbers = [
    "+998 97 778 23 47",
    "+998 95 170 05 71",
    "+998 95 193 77 00",
  ];

  // Social media links
  const socialLinks = {
    linkedin: "https://linkedin.com/company/your-company",
    instagram: "https://instagram.com/protouch.uz",
    telegram: "https://t.me/protouchuzb",
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
              Хотите быть в курсе акций и скидок?
            </Typography>
            <Typography variant="h6" mb={2} sx={{ fontSize: "24px" }}>
              Подпишитесь на наш:
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
              Ресурсы
            </Typography>
            <Stack spacing={1} mt={2} gap={3}>
              <Link href="#" underline="hover" color="inherit">
                Обработка персональных данных
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Конфиденциальность
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Сервисные центры
              </Link>
            </Stack>
          </Box>

          {/* Right Section - Contacts */}
          <Box sx={{ color: "#000" }}>
            <Typography variant="h6" mb={2}>
              Контакты
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
                  Tashkent City, Tong Yulduzi
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Brand Logos Section */}
          <Box sx={{ color: "#000", flexShrink: 0 }}>
            {/* Social Media Icons */}
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

            {/* Partner Logos */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Image
                src="/HayotBirja.svg"
                width={180}
                height={30}
                alt="HayotBirja"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
              <Image
                src="/TenderWeek.svg"
                width={180}
                height={30}
                alt="TenderWeek"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
              <Box
                sx={{
                  width: "180px",
                  "& img": {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  },
                }}
              >
                <Image
                  src="/uzex.svg"
                  width={180}
                  height={30}
                  alt="uzex"
                  priority
                />
              </Box>
              <Image
                src="/UzExTender.svg"
                width={180}
                height={30}
                alt="UzExTender"
                style={{ width: "100%", height: "auto", maxWidth: "180px" }}
              />
            </Box>

            {/* Payment Logos */}
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
