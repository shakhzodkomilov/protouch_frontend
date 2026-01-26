"use client";

import { useRef } from "react";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Brends from "./Brends";
import BestSellers from "./Bestsellers";
import News from "./News";
import NewArrivals from "./NewArrivals";
import Banners from "./Banners";
import { Recommend } from "./Recommend";
const cards = [
  {
    title: "Интерактивные панели",
    bg: "linear-gradient(180deg, #64D2FF 0%, #3DA9E3 100%)",
    img: "/category_1.svg",
    url: "interactive-equipment/interactive-panels",
  },
  {
    title: "Инфокиоски",
    bg: "linear-gradient(180deg, #FF8E71 0%, #E86B4D 100%)",
    img: "/category_2.svg",
    url: "interactive-equipment/information-kiosks",
  },
  {
    title: "Мультимедийные трибуны",
    bg: "linear-gradient(180deg, #6BD47E 0%, #4FB863 100%)",
    img: "/category_3.svg",
    url: "interactive-equipment/electronic-stands",
  },
  {
    title: "Акции",
    bg: "linear-gradient(180deg, #F2C94C 0%, #D4AF37 100%)",
    img: "/category_4.svg",
    url: "/sales",
  },
  {
    title: "ВКС камеры",
    bg: "linear-gradient(180deg, #9B8AFF 0%, #7B6AD9 100%)",
    img: "/category_5.svg",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Cпикерфоны",
    bg: "linear-gradient(180deg, #FD9234 0%, #E37E22 100%)",
    img: "/Speakerphones.png",
    url: "conference-equipment/speakerphones",
  },
  {
    title: "Видеостена",
    bg: "linear-gradient(180deg, #52C993 0%, #3DA173 100%)",
    img: "/Videowall.png",
    url: "audiovisual-equipment/video-wall",
  },
  {
    title: "LED экраны",
    bg: "linear-gradient(180deg, #5EA3EE 0%, #4688D1 100%)",
    img: "/LED_screens.png",
    url: "audiovisual-equipment/led-screens",
  },
  {
    title: "Коммерческие дисплеи",
    bg: "linear-gradient(180deg, #4BBC3C 0%, #3A9D2E 100%)",
    img: "/Commercial_displays.png",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Выдвижной монитор",
    bg: "linear-gradient(180deg, #B0B0B0 0%, #8E8E8E 100%)",
    img: "/Retractable_monitors.png",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Моноблоки",
    bg: "linear-gradient(180deg, #9474C0 0%, #7A5CA1 100%)",
    img: "/Monoblock.png",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Конференц микрофоны",
    bg: "linear-gradient(180deg, #97A14F 0%, #7C863A 100%)",
    img: "/Conference_microphones.png",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Wi-fi оборудование",
    bg: "linear-gradient(180deg, #2A2C9B 0%, #17187B 100%)",
    img: "/Wi-Fi equipment.png",
    url: "conference-equipment/vks-equipment",
  },
  {
    title: "Коммутаторы",
    bg: "linear-gradient(180deg, #C67EF6 0%, #A35ED1 100%)",
    img: "/Switches.png",
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
    if (Math.abs(distance) > 5) dragInfo.current.hasMoved = true;
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
    if ((url = "sales")) return router.push(`/${locale}/${url}`);
    if (dragInfo.current.hasMoved || !url) return;
    router.push(`/${locale}/catalog/${url}`);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, maxWidth: "1800px", userSelect: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          "@media (max-width:900px)": { mt: 13 },
        }}
      >
        {/* SIDEBAR */}
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
            height: "280px",
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

        {/* SLIDER */}
        <Box sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
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
                  minWidth: {
                    xs: "240px",
                    sm: "280px",
                  },
                  width: { xs: "280px" },
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
                  "@media (max-width:900px)": { height: "250px" },
                }}
              >
                <Typography
                  fontWeight={600}
                  fontSize="18px"
                  color="#fff"
                  sx={{ position: "relative", zIndex: 3, maxWidth: "70%" }}
                >
                  {item.title}
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-10%",
                    right: "-5%",
                    width: "80%",
                    height: "80%",
                    background: "rgba(255, 255, 255, 0.12)",
                    borderRadius: "40px",
                    transform: "rotate(-15deg)",
                    zIndex: 1,
                  }}
                />

                <Box
                  component="img"
                  src={item.img}
                  sx={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    width: "65%",
                    height: "65%",
                    objectFit: "contain",
                    zIndex: 2,
                    pointerEvents: "none",
                    "@media (max-width:900px)": { height: "55%" },
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
