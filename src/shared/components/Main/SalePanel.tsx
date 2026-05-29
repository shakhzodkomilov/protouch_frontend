"use client";

import { useRef, useCallback } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import "swiper/css";

import { useSaleProducts } from "../../../entities/sale/api/useSaleProducts";
import { useCountdown } from "../../../entities/services/useCountdown";
import { addToBasket } from "../../../entities/basket/model/store";
import { useUnit } from "effector-react";
import {
  PRIMARY_BLUE,
  PRIMARY_BLUE_HOVER,
  DARK_TEXT,
  DISCOUNT_RED,
  AUTOPLAY_DELAY,
  SWIPER_SPEED,
  CTA_BUTTON_HEIGHT,
} from "@/shared/lib/constants";
import { ScrollArrow } from "@/shared/lib/components/ScrollArrow";

export function SalePanel() {
  const t = useTranslations("main");
  const { locale } = useParams();
  const currentLocale = String(locale || "ru");
  const swiperRef = useRef<SwiperType | null>(null);
  const handleAddToBasket = useUnit(addToBasket);
  const { items, globalMeta, loading } = useSaleProducts(currentLocale);

  const countdown = useCountdown(globalMeta.endsAt);

  const fmt = useCallback(
    (n: number) =>
      new Intl.NumberFormat(currentLocale === "uz" ? "uz-UZ" : "ru-RU").format(
        n,
      ),
    [currentLocale],
  );

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);
  const handleSwiperInit = useCallback((s: SwiperType) => {
    swiperRef.current = s;
  }, []);

  const handleAdd = useCallback(
    (product: {
      id: number | string;
      title: string;
      image: string;
      effectivePrice: number;
    }) => {
      handleAddToBasket({
        id: Number(product.id),
        productId: Number(product.id),
        title: product.title,
        price: product.effectivePrice,
        image: product.image,
        quantity: 1,
        isInStock: true,
      });
    },
    [handleAddToBasket],
  );

  // ── Loading skeleton ──────────────────────────────────────────────
  if (loading) {
    return (
      <Box
        sx={{ width: "100%", height: "100%", p: 2.5, boxSizing: "border-box" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Skeleton variant="text" width={140} height={26} />
          <Skeleton
            variant="rounded"
            width={100}
            height={26}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, height: "calc(100% - 60px)" }}>
          <Skeleton
            variant="rounded"
            sx={{
              width: 130,
              height: "100%",
              borderRadius: "16px",
              flexShrink: 0,
            }}
          />
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            <Skeleton
              variant="rounded"
              width={130}
              height={26}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton variant="text" width="75%" height={34} />
            <Skeleton variant="text" width="55%" height={20} />
            <Skeleton
              variant="rounded"
              height={44}
              sx={{ borderRadius: "10px", mt: "auto" }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, color: "#9AA3AF" }}>
          {t("noActiveSales") ?? "No active sales"}
        </Typography>
      </Box>
    );
  }

  const hasMultiple = items.length > 1;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 2.5 },
        pt: { xs: 2, md: 2 },
        pb: { xs: 2, md: 2 },
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 16, md: 18 },
            color: "#1A2B44",
          }}
        >
          {t("dealOfTheDay") ?? "Товары дня"}
        </Typography>

        {/* Only show countdown if the sale has an endsAt date */}
        {globalMeta.endsAt && (
          <Typography sx={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>
            {countdown.days} {t("days") ?? "дней"} • {countdown.hours}{" "}
            {t("hours") ?? "часов"}
          </Typography>
        )}
      </Box>

      {/* Swiper */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: { xs: 170, md: 210 },
          overflow: "visible",
        }}
      >
        <Swiper
          modules={[Autoplay]}
          onSwiper={handleSwiperInit}
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          loop={hasMultiple}
          speed={SWIPER_SPEED}
          observer
          observeParents
          style={{ height: "100%", width: "100%" }}
        >
          {items.map(({ product, discountPct }) => {
            // Use salePrice from API directly; fall back to computing from discountPct
            const effectivePrice =
              product.salePrice !== null
                ? Number(product.salePrice)
                : discountPct > 0
                  ? Math.round(product.price * (1 - discountPct / 100))
                  : product.price;

            const hasDiscount = effectivePrice < product.price;

            return (
              <SwiperSlide key={product.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: { xs: 1.5, md: 2 },
                    height: "100%",
                    pb: 0.5,
                  }}
                >
                  {/* Product image */}
                  <Link
                    href={`/${currentLocale}/product/${product.id}`}
                    style={{ textDecoration: "none", flexShrink: 0 }}
                  >
                    <Box
                      sx={{
                        width: { xs: 90, md: 120 },
                        height: { xs: 110, md: 150 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#F8FAFC",
                        borderRadius: "14px",
                        overflow: "hidden",
                        p: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Link>

                  {/* Info */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                      minWidth: 0,
                    }}
                  >
                    {/* Discount badge */}
                    {hasDiscount && discountPct > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0 }}
                      >
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            bgcolor: PRIMARY_BLUE,
                            borderRadius: "20px 0 0 20px",
                            px: 1.2,
                            py: 0.4,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {t("discount") ?? "Скидка"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: DISCOUNT_RED,
                            borderRadius: "0 20px 20px 0",
                            px: 0.8,
                            py: 0.4,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            -{discountPct}%
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Price */}
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: 16, md: 18 },
                          color: DARK_TEXT,
                        }}
                      >
                        {fmt(effectivePrice)} {t("currency") ?? "UZS"}
                      </Typography>
                      {hasDiscount && (
                        <Typography
                          sx={{
                            color: "#A0AEC0",
                            textDecoration: "line-through",
                            fontSize: 12,
                          }}
                        >
                          {fmt(product.price)} {t("currency") ?? "UZS"}
                        </Typography>
                      )}
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "36px",
                      }}
                    >
                      {product.title}
                    </Typography>

                    {/* Add to cart */}
                    <Button
                      onClick={() =>
                        handleAdd({
                          id: product.id,
                          title: product.title,
                          image: product.image,
                          effectivePrice,
                        })
                      }
                      sx={{
                        mt: "auto",
                        height: CTA_BUTTON_HEIGHT,
                        borderRadius: "10px",
                        bgcolor: PRIMARY_BLUE,
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        "&:hover": { bgcolor: PRIMARY_BLUE_HOVER },
                      }}
                    >
                      {t("addToCart") ?? "В корзину"}
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Prev arrow */}
        {hasMultiple && <ScrollArrow direction="left" onClick={handlePrev} />}

        {/* Next arrow */}
        {hasMultiple && <ScrollArrow direction="right" onClick={handleNext} />}
      </Box>
    </Box>
  );
}
