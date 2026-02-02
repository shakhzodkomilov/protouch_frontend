"use client";

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("About");
  const timeline = t.raw("timeline") as { year: string; text: string }[];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const navBtnStyle = (pos: { left?: number; right?: number }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bgcolor: "#fff",
    boxShadow: 2,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: { xs: "none", md: "flex" },
    ...pos,
    "&:hover": { bgcolor: "#f5f5f5" },
  });

  return (
    <Box sx={{ py: 8, bgcolor: "#fff", color: "#333" }}>
      <Container maxWidth="lg">
        {/* Sarlavha - H1 (oldingi h4 style) */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 800, mb: 2, color: "#1a1a1a" }}
        >
          {t("heroTitle")}
        </Typography>

        {/* Matn - P */}
        <Typography
          component="p"
          sx={{
            mb: 3,
            color: "#666",
            maxWidth: "800px",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {t("heroText")}
        </Typography>

        {/* Yo'nalishlar - H1 (oldingi h5 style) */}
        <Typography
          component="h1"
          sx={{
            mb: 2,
            mt: 2,
            color: "#000",
            fontWeight: "700",
            fontSize: "20px", // oldingi holatdagi "20"
          }}
        >
          {t("directionsTitle")}{" "}
        </Typography>

        {/* Matn - P */}
        <Typography
          component="p"
          sx={{
            mb: 3,
            color: "#666",
            maxWidth: "800px",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {t("directionsText")}
        </Typography>

        {/* Ishonch - H1 (oldingi h5 style) */}
        <Typography
          component="h1"
          sx={{
            mb: 2,
            mt: 2,
            color: "#000",
            fontWeight: "700",
            fontSize: "20px", // oldingi holatdagi "20"
          }}
        >
          {t("trustTitle")}{" "}
        </Typography>

        {/* Matn - P */}
        <Typography
          component="p"
          sx={{
            mb: 4,
            color: "#666",
            maxWidth: "800px",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {t("trustText")}
        </Typography>

        {/* Timeline Scroll */}
        <Box sx={{ position: "relative" }}>
          {/* Scroll Buttons */}
          <IconButton
            onClick={() => scroll("left")}
            sx={navBtnStyle({ left: -20 })}
          >
            <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
          </IconButton>
          <IconButton
            onClick={() => scroll("right")}
            sx={navBtnStyle({ right: -20 })}
          >
            <Image src="/arrowright.svg" width={32} height={32} alt="right" />
          </IconButton>

          {/* Scrollable Cards */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              py: 2,
              px: 1,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 4,
              },
            }}
          >
            {timeline.map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  maxWidth: 280,
                  border: "1px solid #eee",
                  borderRadius: 6,
                  flexShrink: 0,
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  {/* Timeline yili - H1 (oldingi h5 style) */}
                  <Typography
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: "24px",
                      mb: 1,
                      color: "#1a1a1a",
                    }}
                  >
                    {item.year}
                  </Typography>
                  {/* Timeline matni - P */}
                  <Typography
                    component="p"
                    sx={{ color: "#666", lineHeight: 1.5 }}
                  >
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Yordamchi komponent
function AdvantageItem({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <CheckCircleOutline
        sx={{ color: "#1a1a1a", fontSize: "1.2rem", mt: 0.3 }}
      />
      <Typography component="p" sx={{ color: "#333", lineHeight: 1.5 }}>
        {text}
      </Typography>
    </Stack>
  );
}
