import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";

const News = () => {
  const news = [
    {
      title: "Доставка",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#7ED9F6",
      linearColor2: "#32C2E7",
    },
    {
      title: "Наш telegram канал",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#FB8D76",
      linearColor2: "#FC7D6A",
    },
    {
      title: "Отрасли",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#89D87D",
      linearColor2: "#57C056",
    },
    {
      title: "Наши проекты",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#EBC773",
      linearColor2: "#EDAE45",
    },
    {
      title: "PROTOUCH club",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#249FFC",
      linearColor2: "#1E77BA",
    },
    {
      title: "Вакансии",
      text: "Получайте бонусы, отслеживайте заказы и делитесь мнением",
      linearColor1: "#AB9CFF",
      linearColor2: "#826BFA",
    },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };
  return (
    <Box sx={{ mt: "50px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Статьи и новости
      </Typography>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 40,
            height: 40,
          }}
        >
          <Image src="/arrowleft.svg" width="32" height="32" alt="arrow left" />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -20,
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
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
          }}
        >
          {news.map((item, i) => (
            <Box
              key={i}
              sx={{
                maxWidth: 300,
                height: 250,
                borderRadius: "16px",
                p: 3,
                background: `linear-gradient(90deg, ${item.linearColor1} 0%, ${item.linearColor2} 100%)`,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontWeight: 300, mt: "22px" }}>
                {item.text}
              </Typography>
              <Image
                src="/newsBg.svg"
                width="150"
                height="150"
                alt="newsBg"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default News;
