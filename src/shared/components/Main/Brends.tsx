"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";

import { API_URL } from "../../../entities/config/base";
import { ensureHttps } from "@/shared/lib/media-url";

type BrandApi = {
  id: number;
  name: string;
  slug: string;
  imageId?: number | null;
  image?: { url?: string | null; secureUrl?: string | null } | null;
};

const Brends = () => {
  const t = useTranslations("main");
  const [brands, setBrands] = useState<BrandApi[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      if (!API_URL) return;
      try {
        const { data } = await axios.get(`${API_URL}/api/brands`, {
          signal: controller.signal,
        });
        const list = Array.isArray(data) ? (data as BrandApi[]) : [];
        setBrands(list);
      } catch {
        setBrands([]);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const slider = scrollRef.current;
    let scrollInterval: ReturnType<typeof setInterval>;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (slider && !dragInfo.current.isDown) {
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

  const dragInfo = useRef({ isDown: false, startX: 0, scrollLeftStart: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    // eslint-disable-next-line react-hooks/immutability
    dragInfo.current = {
      isDown: true,
      startX: e.pageX - slider.offsetLeft,
      scrollLeftStart: slider.scrollLeft,
    };
    slider.style.cursor = "grabbing";
  };

  const handleMouseLeaveOrUp = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    // eslint-disable-next-line react-hooks/immutability
    dragInfo.current.isDown = false;
    slider.style.cursor = "grab";
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider || !dragInfo.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    slider.scrollLeft = dragInfo.current.scrollLeftStart - walk;
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  if (!brands.length) return null;

  return (
    <Box sx={{ mt: "64px" }}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 600,
          color: "#000",
          textAlign: "center",
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
          {brands.map((brand) => {
            const imageUrl = ensureHttps(brand.image?.url);
            return (
              <Box
                key={brand.id}
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
                {imageUrl ? (
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={brand.name}
                    loading="lazy"
                    sx={{
                      maxWidth: "150px",
                      maxHeight: "60px",
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1C1C1C",
                      textAlign: "center",
                      px: 2,
                    }}
                  >
                    {brand.name}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Brends;
