"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";

import Brends from "./Brends";
import BestSellers from "./Bestsellers";
import News from "./News";
import Banners from "./Banners";
import { Recommend } from "./Recommend";
import NewArrivals from "./NewArrivals";
import CenterBanner from "./MainBanner";
import { API_URL } from "../../../entities/config/base";
import { ensureHttps } from "@/shared/lib/media-url";

type CategoryApi = {
  id: number;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  link?: string;
  status?: string;
  image?: { url?: string | null } | null;
};

const truncateText = (value: string, maxLen: number) =>
  value.length > maxLen
    ? `${value.slice(0, Math.max(0, maxLen - 1)).trimEnd()}…`
    : value;

export default function HomeCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations("main");
  const [categories, setCategories] = useState<CategoryApi[]>([]);

  useEffect(() => {
    const currentLocale = (locale as string) || "ru";
    const controller = new AbortController();

    const load = async () => {
      if (!API_URL) return;
      try {
        const { data } = await axios.get(`${API_URL}/api/categories`, {
          params: { lang: currentLocale },
          signal: controller.signal,
        });
        const list = Array.isArray(data) ? (data as CategoryApi[]) : [];
        setCategories(list);
      } catch {
        setCategories([]);
      }
    };

    load();
    return () => controller.abort();
  }, [locale]);

  const activeCategories = useMemo(
    () => categories.filter((c) => (c.status || "").toUpperCase() === "ACTIVE"),
    [categories],
  );

  // Drag-and-drop mantiqi o'zgarmasdan qoladi...
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

  const handleCategoryClick = (slug?: string) => {
    if (dragInfo.current.hasMoved || !slug) return;
    router.push(`/${locale}/catalog/${slug}`);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, px: 0, maxWidth: "1700px", userSelect: "none" }}
    >
      <CenterBanner />

      <Box sx={{ mt: { xs: 6, md: 8 } }}>
        {/* CATEGORIES */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <IconButton
            onClick={() => scrollBtn("left")}
            sx={{ ...navBtnStyle, left: 0 }}
          >
            <Image src="/arrowleft.svg" width={30} height={30} alt="left" />
          </IconButton>
          <IconButton
            onClick={() => scrollBtn("right")}
            sx={{ ...navBtnStyle, right: 0 }}
          >
            <Image src="/arrowright.svg" width={30} height={30} alt="right" />
          </IconButton>

          <Typography
            sx={{
              fontSize: { xs: 22, md: 34 },
              fontWeight: 700,
              textAlign: "center",
              mb: { xs: 2, md: 3 },
              color: "#1C1C1C",
            }}
          >
            {t("productCategoriesTitle")}
          </Typography>

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
              px: { xs: 2, md: 6 },
              cursor: "grab",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
            }}
          >
            {(activeCategories.length ? activeCategories : []).map((item) => (
              <Box
                key={item.id}
                onClick={() => handleCategoryClick(item.slug)}
                sx={{
                  width: { xs: 220, sm: 240, md: 260 },
                  minHeight: 280,
                  borderRadius: "14px",
                  bgcolor: "#fff",
                  p: 2,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: "0px 6px 18px rgba(17, 24, 39, 0.06)",
                  "&:active": { transform: "scale(0.97)" },
                  "&:hover": { transform: "translateY(-2px)" },
                  "@media (max-width:900px)": {
                    width: 210,
                  },
                }}
              >
                {ensureHttps(item.image?.url) ? (
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                    src={ensureHttps(item.image?.url) ?? ""}
                    alt={item.title || item.name || "category"}
                    loading="lazy"
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 140,
                      borderRadius: "10px",
                      bgcolor: "#F5F7FA",
                    }}
                  />
                )}

                <Typography
                  sx={{
                    mt: 3.5,
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#1C1C1C",
                    textAlign: "center",
                  }}
                >
                  {item.title || item.name || ""}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.75,
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#7A7A7A",
                    textAlign: "center",
                    lineHeight: 1.35,
                    px: 1,
                  }}
                >
                  {truncateText(item.description || "", 78)}
                </Typography>
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
  display: "flex",
  position: "absolute",
  top: { xs: "56%", md: "50%" },
  transform: "translateY(-50%)",
  zIndex: 10,
  bgcolor: "#fff",
  boxShadow: 3,
  width: { xs: 34, md: 38 },
  height: { xs: 34, md: 38 },
  "&:hover": { bgcolor: "#f5f5f5" },
};
