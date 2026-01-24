"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import Brends from "./Brends";
import BestSellers from "./Bestsellers";
import News from "./News";
import NewArrivals from "./NewArrivals";
import Image from "next/image";
import Banners from "./Banners";
import Recommend from "./Recommend";
import { useParams, useRouter } from "next/navigation";

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
  { title: "Акции", bg: "#F2C94C", img: "/category_4.svg", url: "" },
  {
    title: "ВКС камеры",
    bg: "#9B8AFF",
    img: "/category_5.svg",
    url: "conference-equipment/vks-equipment",
  },
];

export default function HomeCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { locale } = useParams();
  const router = useRouter();

  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;

    dragInfo.current.isDown = true;
    dragInfo.current.hasMoved = false;
    dragInfo.current.startX = e.pageX - slider.offsetLeft;
    dragInfo.current.scrollLeft = slider.scrollLeft;

    slider.style.cursor = "grabbing";
    slider.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider || !dragInfo.current.isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const distance = x - dragInfo.current.startX;

    if (Math.abs(distance) > 5) {
      dragInfo.current.hasMoved = true;
    }

    slider.scrollLeft = dragInfo.current.scrollLeft - distance * 1.5;
  };

  const stopDragging = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    dragInfo.current.isDown = false;
    slider.style.cursor = "grab";
    slider.style.scrollSnapType = "x mandatory";
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (url: string) => {
    if (dragInfo.current.hasMoved || !url) return;

    const path = `/${locale}/catalog/${url}`;
    router.push(path);
  };
  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, maxWidth: "1800px", userSelect: "none" }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* SIDEBAR BOX */}
        <Box
          sx={{
            bgcolor: "#FFF7DA",
            width: 400,
            p: "24px 44px",
            borderRadius: "24px",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#000",
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize="18px">
              Личный кабинет
            </Typography>
            <Typography sx={{ mt: 1, color: "#4E4E4E" }}>
              Получайте бонусы, отслеживайте заказы и делитесь мнением
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => router.push(`/${locale}/login`)}
              sx={{
                color: "#4E4E4E",
                borderColor: "#4E4E4E",
                borderRadius: "8px",
                flex: 1,
              }}
            >
              Войти
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#4E4E4E",
                borderColor: "#4E4E4E",
                borderRadius: "8px",
                flex: 1,
              }}
            >
              Заказы
            </Button>
          </Box>
        </Box>

        {/* SLIDER AREA */}
        <Box sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* NAVIGATION BUTTONS */}
          <IconButton
            onClick={() => scrollBtn("left")}
            sx={{ ...navBtnStyle, left: 10 }}
          >
            <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
          </IconButton>

          <IconButton
            onClick={() => scrollBtn("right")}
            sx={{ ...navBtnStyle, right: 10 }}
          >
            <Image src="/arrowright.svg" width={32} height={32} alt="right" />
          </IconButton>

          {/* SCROLLABLE CONTAINER */}
          <Box
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            sx={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              py: 1,
              px: { xs: 2, md: 1 },
              cursor: "grab",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
            }}
          >
            {cards.map((item, i) => (
              <Box
                key={i}
                onClick={() => handleCategoryClick(item.url)}
                sx={{
                  minWidth: { xs: 280, md: 320 },
                  height: 280,
                  borderRadius: "24px",
                  background: item.bg,
                  p: 3,
                  position: "relative",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                  "&:active": { transform: "scale(0.97)" },
                }}
              >
                <Typography
                  fontWeight={600}
                  fontSize="18px"
                  color="#fff"
                  sx={{ position: "relative", zIndex: 2, maxWidth: "70%" }}
                >
                  {item.title}
                </Typography>

                <Image
                  src="/mainBgIcon.svg"
                  alt="bg"
                  width={200}
                  height={200}
                  style={{
                    position: "absolute",
                    bottom: "-10%",
                    right: "-10%",
                    pointerEvents: "none",
                  }}
                />
                <Box
                  component="img"
                  src={item.img}
                  sx={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* OTHER COMPONENTS */}
      <Brends />
      <BestSellers />
      <News />
      <NewArrivals />
      <Banners />
      <Recommend />
    </Container>
  );
}

const navBtnStyle = {
  display: { xs: "none", md: "flex" },
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  bgcolor: "#fff",
  boxShadow: 3,
  width: 44,
  height: 44,
  "&:hover": { bgcolor: "#f5f5f5" },
};
