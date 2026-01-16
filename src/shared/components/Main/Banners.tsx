"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";

const Banners = () => {
  const banners = [
    { img: "/Banner2.svg" },
    { img: "/Banner1.svg" },
    { img: "/Banner3.svg" },
    { img: "/Banner3.svg" },
    { img: "/Banner3.svg" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "50px" }}>
      <Typography sx={{ fontSize: 34, fontWeight: 600, color: "#000" }}>
        Статьи и новости
      </Typography>

      <Box sx={{ position: "relative", mt: 3 }}>
        {/* LEFT ARROW */}
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
          <Image src="/arrowleft.svg" width={32} height={32} alt="arrow left" />
        </IconButton>

        {/* RIGHT ARROW */}
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
            width={32}
            height={32}
            alt="arrow right"
          />
        </IconButton>

        {/* SCROLL CONTAINER */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: 2,
          }}
        >
          {banners.map((item, i) => (
            <Box
              key={i}
              sx={{
                minWidth: 300,
                height: 250,
                borderRadius: "16px",
                p: 2,
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Image
                src={item.img}
                width={480}
                height={218}
                alt={`Banner ${i + 1}`}
                style={{ objectFit: "cover", borderRadius: "16px" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Banners;
