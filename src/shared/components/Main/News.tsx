"use client";

import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import newsData from "./newsData";
import NewsModal from "./NewsModal";

const News = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const { locale } = useParams();
  const t = useTranslations("main");

  const news = newsData[locale as string] || newsData.ru;

  const scrollRef = useRef<HTMLDivElement>(null);
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
    if (scrollRef.current) {
      dragInfo.current.isDown = false;
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "50px" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 600,
          color: "#000",
          "@media (max-width: 900px)": { fontSize: "26px" },
        }}
      >
        {t("newsTitle")}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scrollBtn("left")}
          sx={{ ...navBtnStyle, left: -20 }}
        >
          <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollBtn("right")}
          sx={{ ...navBtnStyle, right: -20 }}
        >
          <Image src="/arrowright.svg" width={32} height={32} alt="right" />
        </IconButton>

        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onClickCapture={(e) =>
            dragInfo.current.hasMoved && e.stopPropagation()
          }
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
            cursor: "grab",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            userSelect: "none",
          }}
        >
          {news.map((item, i) => (
            <Box
              key={i}
              onClick={() => item.modalContent && setOpenModal(i)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                justifyContent: "space-around",
                width: 320,
                height: 300,
                borderRadius: "16px",
                p: 3,
                bgcolor: "#fff",
                border: "1px solid #EBEBEB",
                textAlign: "center",
                flexShrink: 0,
                scrollSnapAlign: "start",
                cursor: item.modalContent ? "pointer" : "default",
                transition: "box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transform: "translateY(-4px)",
                },
                "@media (max-width: 900px)": { width: 170, p: 2.5 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  src={item.icon}
                  width={48}
                  height={48}
                  alt={item.title}
                  style={{ objectFit: "contain" }}
                />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#000",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <NewsModal
        item={openModal !== null ? news[openModal] || null : null}
        open={openModal !== null}
        closeLabel={t("close")}
        onClose={() => setOpenModal(null)}
      />
    </Box>
  );
};

const navBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  bgcolor: "#fff",
  boxShadow: 2,
  width: 40,
  height: 40,
  "@media (max-width:900px)": { display: "none" },
  "&:hover": { bgcolor: "#f5f5f5" },
};

export default News;
