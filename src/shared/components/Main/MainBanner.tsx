"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useUnit } from "effector-react";
import { Box, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  $banners,
  $loadingBanners,
  loadBanners,
} from "../../../entities/content/model";

import { SalePanel } from "./SalePanel";
import { BannerSlot } from "./BannerSlot";
import { ScrollArrow } from "@/shared/lib/components/ScrollArrow";
import { useParams } from "next/navigation";
import {
  BANNER_BG,
  BANNER_BORDER_RADIUS,
  BANNER_AUTOPLAY_DELAY,
  BANNER_SWIPER_SPEED,
  BANNER_MOBILE_HEIGHT,
  BANNER_DESKTOP_HEIGHT,
} from "@/shared/lib/constants";

import "swiper/css";
import "swiper/css/pagination";

const PAGINATION_CSS = `
  .center-pagination { display: flex !important; justify-content: center; align-items: center; gap: 6px; }
  .center-pagination .swiper-pagination-bullet {
    width: 26px;
    height: 3px;
    border-radius: 999px;
    background: #E5E7EB;
    opacity: 1;
    margin: 0 !important;
    transition: all 0.25s ease;
  }
  .center-pagination .swiper-pagination-bullet-active { background: #1F446F; width: 34px; }
`;

function CenterBannerCarousel({
  banners,
  height,
  borderRadius,
}: {
  banners: Array<{ id: number | string; bannerUrl: string; title: string }>;
  height: number;
  borderRadius: number;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasMultiple = banners.length > 1;

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);
  const handleSwiperInit = useCallback((s: SwiperType) => {
    swiperRef.current = s;
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", height }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={handleSwiperInit}
        autoplay={{ delay: BANNER_AUTOPLAY_DELAY, disableOnInteraction: false }}
        loop={hasMultiple}
        speed={BANNER_SWIPER_SPEED}
        pagination={{ clickable: true, el: ".center-pagination" }}
        style={{ height: "100%", width: "100%" }}
      >
        {banners.map((b) => (
          <SwiperSlide key={b.id}>
            <Box sx={{ width: "100%", height: "100%", borderRadius }}>
              <BannerSlot
                bannerUrl={b.bannerUrl}
                title={b.title}
                height={height}
                objectFit="cover"
                showCta={false}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <>
          <ScrollArrow direction="left" onClick={handlePrev} />
          <ScrollArrow direction="right" onClick={handleNext} />
        </>
      )}
    </Box>
  );
}

export default function CenterBanner() {
  const allBanners = useUnit($banners);
  const loading = useUnit($loadingBanners);
  const dispatchLoad = useUnit(loadBanners);
  const { locale } = useParams();
  const currentLocale = String(locale || "ru");

  useEffect(() => {
    dispatchLoad({ lang: currentLocale });
  }, [dispatchLoad, currentLocale]);

  if (loading && allBanners.length === 0) {
    return (
      <Skeleton
        variant="rounded"
        width="100%"
        height={300}
        sx={{ borderRadius: 3 }}
      />
    );
  }

  const hasBanners = allBanners.length > 0;

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, md: 1.5 },
          alignItems: "stretch",
        }}
      >
        {/* Left: banner carousel */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", sm: "0 0 60%", lg: "0 0 65%" },
            borderRadius: `${BANNER_BORDER_RADIUS}px`,
            overflow: "hidden",
            bgcolor: BANNER_BG,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            {hasBanners ? (
              <CenterBannerCarousel
                banners={allBanners}
                height={BANNER_MOBILE_HEIGHT}
                borderRadius={BANNER_BORDER_RADIUS}
              />
            ) : (
              <Box sx={{ height: BANNER_MOBILE_HEIGHT, bgcolor: "#f0f0f0" }} />
            )}
          </Box>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            {hasBanners ? (
              <CenterBannerCarousel
                banners={allBanners}
                height={BANNER_DESKTOP_HEIGHT}
                borderRadius={BANNER_BORDER_RADIUS}
              />
            ) : (
              <Box sx={{ height: BANNER_DESKTOP_HEIGHT, bgcolor: "#f0f0f0" }} />
            )}
          </Box>
        </Box>

        {/* Right: sale panel */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", sm: "1 1 auto", lg: "0 0 35%" },
            borderRadius: `${BANNER_BORDER_RADIUS}px`,
            overflow: "hidden",
            bgcolor: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <SalePanel />
        </Box>
      </Box>

      {/* Shared pagination dots for banner carousel */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Box className="center-pagination" />
      </Box>

      <style jsx global>
        {PAGINATION_CSS}
      </style>
    </Box>
  );
}
