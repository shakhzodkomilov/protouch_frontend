"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const Brends = () => {
  const brends = [
    { img: "/dahua.svg" },
    { img: "/galaxyhub.svg" },
    { img: "/huawei.svg" },
    { img: "/minrray.svg" },
    { img: "/porurobotics.svg" },
    { img: "/vlinka.svg" },
    { img: "/iqonex.png" },
    { img: "/hpBrend.png" },
    { img: "/tenveoBrands.jpg" },
    { img: "/minew.png" },
    { img: "/dellBrend.png" },
    { img: "/okvBrend.png" },
    { img: "/lenovoBrend.png" },
    { img: "/hevlettBrend.png" },
    { img: "/shileBrand.png" },
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
        // Agar sichqoncha ustida bo'lmasa va drag qilinmayotgan bo'lsa
        if (slider && !slider.isDown) {
          slider.scrollLeft += 1;

          // Oxiriga yetsa boshiga qaytadi
          if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
            slider.scrollLeft = 0;
          }
        }
      }, 30); // Tezlik (30ms)
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
    const walk = (x - slider.startX) * 1.5; // Sezgirlik
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  // --- 3. TUGMALAR ORQALI SCROLL ---
  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Бренды
      </Typography>
      
      <Box sx={{ position: "relative", mt: "34px" }}>
        {/* CHAP TUGMA */}
        <IconButton
          onClick={() => scrollBtn("left")}
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
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "#f5f5f5" }
          }}
        >
          <Image src="/arrowleft.svg" width="32" height="32" alt="arrow left" />
        </IconButton>

        {/* O'NG TUGMA */}
        <IconButton
          onClick={() => scrollBtn("right")}
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
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "#f5f5f5" }
          }}
        >
          <Image src="/arrowright.svg" width="32" height="32" alt="arrow right" />
        </IconButton>

        {/* SCROLL KONTEYNERI */}
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
            scrollBehavior: "auto", // Drag silliq bo'lishi uchun
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
                minWidth: "280px",
                width: "280px",
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
                width={190}
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