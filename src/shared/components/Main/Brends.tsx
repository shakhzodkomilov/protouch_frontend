"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl"; // Tarjima uchun hook

const Brends = () => {
  const t = useTranslations("main"); // "main" bo'limidan foydalanamiz

  const brends = [
    { img: "/dahua.svg" },
    { img: "/galaxyhub.svg" },
    { img: "/huawei.svg" },
    { img: "/minrray.svg" },
    { img: "/porurobotics.svg" },
    { img: "/vlinka.svg" },
    { img: "/iqonex.png" },
    { img: "/HPBrand.svg" },
    { img: "/Tenveo.jpg" },
    { img: "/minew.png" },
    { img: "/DellBrand.jpg" },
    { img: "/OKVBrand.jpg" },
    { img: "/LenovoBrand.jpg" },
    { img: "/HewlettBrand.jpg" },
    { img: "/ShileBrand.jpg" },
    { img: "/yealinkBrend.png" },
    { img: "/unitreeBrend.png" },
    { img: "/absenBrend.png" },
    { img: "/ugreenBrend.png" },
    { img: "/averBrend.png" },
    { img: "/yamahaBrend.png" },
    { img: "/boschBrend.png" },
  ];

  const scrollRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  // --- 1. AVTOMATIK SCROLL MANTIQI ---
  useEffect(() => {
    const slider = scrollRef.current;
    let scrollInterval: any;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (slider && !slider.isDown) {
          slider.scrollLeft += 1;
          if (
            slider.scrollLeft >=
            slider.scrollWidth - slider.clientWidth - 1
          ) {
            slider.scrollLeft = 0;
          }
        }
      }, 30);
    };

    if (!isHovered) {
      startAutoScroll();
    }

    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  // --- 2. SICHQONCHA BILAN SURISH (DRAG) MANTIQI ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
    slider.style.cursor = "grabbing";
  };

  const handleMouseLeaveOrUp = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    slider.isDown = false;
    slider.style.cursor = "grab";
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider || !slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5;
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "44px" }}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 600,
          color: "#000",
          "@media (max-width:900px)": {
            fontSize: "26px",
          },
        }}
      >
        {t("brands")}
      </Typography>

      <Box sx={{ position: "relative", mt: "14px" }}>
        <IconButton
          onClick={() => scrollBtn("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 38,
            height: 38,
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <Image src="/arrowleft.svg" width={30} height={30} alt="arrow left" />
        </IconButton>

        <IconButton
          onClick={() => scrollBtn("right")}
          sx={{
            position: "absolute",
            right: -20,
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 38,
            height: 38,
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <Image
            src="/arrowright.svg"
            width={30}
            height={30}
            alt="arrow right"
          />
        </IconButton>

        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
            cursor: "grab",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {brends.map((item, i) => (
            <Box
              key={i}
              sx={{
                minWidth: "240px",
                width: "240px",
                height: "100px",
                borderRadius: "18px",
                border: "1px solid #DDDDDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                transition: "transform 0.15s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Image
                src={item.img}
                alt="brand"
                width={150}
                height={60}
                style={{ objectFit: "contain", pointerEvents: "none" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Brends;
