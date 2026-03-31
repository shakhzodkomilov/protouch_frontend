"use client";

import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";

const Banners = () => {
  const banners = [
    { img: "/Banner2.svg" },
    { img: "/Banner1.svg" },
    { img: "/Banner3.svg" },
    { img: "/Banner4.svg" },
  ];

  // --- DRAG SCROLL LOGIC ---
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
    slider.style.scrollSnapType = "none"; // Surayotganda silliq harakatlanishi uchun
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

    const walk = distance * 1.5; // Surish tezligi
    slider.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const stopDragging = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    dragInfo.current.isDown = false;
    slider.style.cursor = "grab";
    slider.style.scrollSnapType = "x mandatory"; // To'xtaganda joyiga tushishi uchun
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "50px", mb: "90px", userSelect: "none" }}>
      <Box sx={{ position: "relative", mt: 3 }}>
        {/* LEFT ARROW */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            ...navBtnStyle,
            left: { xs: 8, md: -20 },
            "@media (max-width:900px)": { display: "none" },
          }}
        >
          <Image src="/arrowleft.svg" width={32} height={32} alt="arrow left" />
        </IconButton>

        {/* RIGHT ARROW */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            ...navBtnStyle,
            right: { xs: 8, md: -20 },
            "@media (max-width:900px)": { display: "none" },
          }}
        >
          <Image
            src="/arrowright.svg"
            width={32}
            height={32}
            alt="arrow right"
          />
        </IconButton>

        {/* SCROLL CONTAINER */}
        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            py: 2,
            px: { xs: 2, md: 0 },
            cursor: "grab",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            userSelect: "none",
          }}
        >
          {banners.map((item, i) => (
            <Box
              key={i}
              sx={{
                minWidth: { xs: "280px", sm: "350px", md: "480px" },
                height: { xs: "180px", sm: "220px", md: "250px" },
                borderRadius: "16px",
                flexShrink: 0,
                position: "relative",
                scrollSnapAlign: "start",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.img}
                fill
                alt={`Banner ${i + 1}`}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  objectFit: "cover",
                  borderRadius: "16px",
                  pointerEvents: "none", // Drag paytida rasm ajralib chiqmasligi uchun
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// --- STYLES ---
const navBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 20,
  bgcolor: "#fff",
  boxShadow: 3,
  width: 45,
  height: 45,
  borderRadius: "50%",
  "&:hover": { bgcolor: "#f5f5f5" },
};

export default Banners;
