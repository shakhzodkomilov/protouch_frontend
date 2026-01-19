"use client";

import { useRef } from "react";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import Brends from "./Brends";
import BestSellers from "./Bestsellers";
import News from "./News";
import NewArrivals from "./NewArrivals";
import Image from "next/image";
import Banners from "./Banners";
import Recommend from "./Recommend";
import { useParams } from "next/navigation";

const cards = [
  {
    title: "Интерактивные панели",
    bg: "#64D2FF",
    img: "/category_1.svg",
    url: "interactive-equipment/interactive-panels",
  },
  {
    title: "Инфокиоски",
    bg: "#FF8E71",
    img: "/category_2.svg",
    url: "interactive-equipment/information-kiosks",
  },
  {
    title: "Мультимедийные трибуны",
    bg: "#6BD47E",
    img: "/category_3.svg",
    url: "interactive-equipment/electronic-stands",
  },
  { title: "Акции", bg: "#F2C94C", img: "/category_4.svg" },
  {
    title: "ВКС камеры",
    bg: "#9B8AFF",
    img: "/category_5.svg",
    url: "conference-equipment/vks-equipment",
  },
];

export default function HomeCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };
  const { locale } = useParams();
  const navigateCategory = (category: string) => {
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = `/${locale}/catalog/${category}`;
  };
  return (
    <Container maxWidth={false} sx={{ py: 4, maxWidth: "1800px" }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box
          sx={{
            bgcolor: "#FFF7DA",
            width: 400,
            p: "24px 44px",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#000",
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography fontWeight={600}>Личный кабинет</Typography>
            <Typography width={"100%"}>
              Получайте бонусы, отслеживайте заказы и делитесь мнением
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: "#4E4E4E",
                border: "1px solid #4E4E4E",
                borderRadius: "8px",
              }}
            >
              Войти
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#4E4E4E",
                border: "1px solid #4E4E4E",
                borderRadius: "8px",
              }}
            >
              Мои заказы
            </Button>
          </Box>
        </Box>

        {/* SLIDER AREA */}
        <Box
          sx={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            px: "24px",
            "@media (max-width:900px)": {
              px: "0",
              mt: 12,
            },
          }}
        >
          {/* LEFT BTN */}
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              "@media (max-width:900px)": {
                display: "none",
              },
              position: "absolute",
              left: 5,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              boxShadow: 2,
              width: 40,
              height: 40,
            }}
          >
            <Image
              src="/arrowleft.svg"
              width="32"
              height="32"
              alt="arrow left"
            />
          </IconButton>

          {/* RIGHT BTN */}
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              "@media (max-width:900px)": {
                display: "none",
              },
              position: "absolute",
              right: 5,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              boxShadow: 2,
              width: 40,
              height: 40,
            }}
          >
            <Image
              src="/arrowright.svg"
              width="32"
              height="32"
              alt="arrow right"
            />
          </IconButton>

          {/* SCROLL CONTAINER */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              pr: 4,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {cards.map((item, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 320,
                  height: 280,
                  borderRadius: "24px",
                  background: item.bg,
                  p: 3,
                  position: "relative",
                  cursor: item.url ? "pointer" : "default",
                  flexShrink: 0,
                }}
                onClick={() => navigateCategory(item.url)}
              >
                <Image
                  src={"/mainBgIcon.svg"}
                  alt={item.title}
                  width={150}
                  height={150}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "-5%",
                    width: "75%",
                    height: "75%",
                    objectFit: "contain",
                  }}
                />
                <Typography fontWeight={600} color="#fff">
                  {item.title}
                </Typography>

                <Box
                  component="img"
                  src={item.img}
                  sx={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    width: "55%",
                    height: "55%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Brends />
      <BestSellers />
      <News />
      <NewArrivals />
      <Banners />
      <Recommend />
    </Container>
  );
}
