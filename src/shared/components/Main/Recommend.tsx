"use client";

import { Box, IconButton, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUnit } from "effector-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

import {
    $recommends,
  $loadingRecommend,
  loadRecommends,
  $steamAndPodcast,
  $loadingSteamAndPodcast,
  loadSteamAndPodcast,
} from "../../../entities/product/model";
import { loadFavorites } from "../../../entities/favourite/model/store";
import ProductCard from "../../Product/ProductCard";
import { Product } from "../../../entities/product/model/types";

// ─── Reusable Product Scroll Section ─────────────────────────────────────────

interface ProductSectionProps {
  title: string;
  items: Product[] | undefined;
  loading: boolean;
  t: ReturnType<typeof useTranslations>;
  onAddedToBasket: () => void;
  onToggledFavorite: (added: boolean) => void;
}

const ProductSection = ({
  title,
  items,
  loading,
  t,
  onAddedToBasket,
  onToggledFavorite,
}: ProductSectionProps) => {
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
    dragInfo.current = {
      isDown: true,
      hasMoved: false,
      startX: e.pageX - slider.offsetLeft,
      scrollLeft: slider.scrollLeft,
    };
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

  const preventClickIfDragged = (e: React.MouseEvent) => {
    if (dragInfo.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -316 : 316,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "40px", userSelect: "none" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 600,
          color: "#000",
          "@media (max-width:900px)": { fontSize: "26px" },
        }}
      >
        {title}
      </Typography>

      <Box sx={{ position: "relative", mt: "14px" }}>
        {/* Left nav button */}
        <IconButton
          onClick={() => scrollBtn("left")}
          sx={{
            ...navBtnStyle,
            left: { xs: 8, md: -20 },
            "@media (max-width:1000px)": { display: "none" },
          }}
        >
          <Image src="/arrowleft.svg" width={28} height={28} alt="left" />
        </IconButton>

        {/* Right nav button */}
        <IconButton
          onClick={() => scrollBtn("right")}
          sx={{
            ...navBtnStyle,
            right: { xs: 8, md: -20 },
            "@media (max-width:1000px)": { display: "none" },
          }}
        >
          <Image src="/arrowright.svg" width={28} height={28} alt="right" />
        </IconButton>

        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          sx={scrollContainerStyle}
        >
          {loading ? (
            <Typography sx={{ p: 4 }}>{t("loading")}</Typography>
          ) : !items || items.length === 0 ? (
            <Typography sx={{ p: 4, color: "#999" }}>
              {t("noProducts")}
            </Typography>
          ) : (
            items.map((item: Product) => (
              <Box
                key={item.id}
                onClickCapture={preventClickIfDragged}
                onDragStart={(e) => e.preventDefault()}
                sx={{ flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <ProductCard
                  product={item}
                  onAddedToBasket={onAddedToBasket}
                  onToggledFavorite={onToggledFavorite}
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────

export const Recommend = () => {
  const { locale } = useParams();
  const t = useTranslations("Recommend");

  const [recommendItems, loadingRecommend, loadRecommendEv] = useUnit([
  $recommends,
    $loadingRecommend,
    loadRecommends,
  ]);

  const [steamItems, loadingSteam, loadSteamEv] = useUnit([
    $steamAndPodcast,
    $loadingSteamAndPodcast,
    loadSteamAndPodcast,
  ]);

  const loadFavoritesEv = useUnit(loadFavorites);

  const [openBasketToast, setOpenBasketToast] = useState(false);
  const [openFavoriteToast, setOpenFavoriteToast] = useState(false);
  const [lastActionType, setLastActionType] = useState<"add" | "remove" | null>(
    null,
  );

  useEffect(() => {
    const lang = (locale as string) || "ru";
    loadRecommendEv({ lang });
    loadSteamEv({ lang });
    loadFavoritesEv();
  }, [loadRecommendEv, loadSteamEv, loadFavoritesEv, locale]);

  const onAddedToBasket = useCallback(() => {
    setOpenBasketToast(true);
  }, []);

  const onToggledFavorite = useCallback((added: boolean) => {
    setLastActionType(added ? "add" : "remove");
    setOpenFavoriteToast(true);
  }, []);

  return (
    <Box>
      {/* Section 1 — We Recommend */}
      <ProductSection
        title={t("weRecommend")}
        items={recommendItems?.results}
        loading={loadingRecommend}
        t={t}
        onAddedToBasket={onAddedToBasket}
        onToggledFavorite={onToggledFavorite}
      />

      {/* Section 2 — Steam and Podcast */}
      <ProductSection
        title={t("steamAndPodcast")}
        items={steamItems?.results}
        loading={loadingSteam}
        t={t}
        onAddedToBasket={onAddedToBasket}
        onToggledFavorite={onToggledFavorite}
      />

      {/* Snackbars */}
      <Snackbar
        open={openBasketToast}
        autoHideDuration={3000}
        onClose={() => setOpenBasketToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: "10px" }}
        >
          {t("addedToBasket")}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openFavoriteToast}
        autoHideDuration={2000}
        onClose={() => setOpenFavoriteToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          severity={lastActionType === "add" ? "success" : "info"}
          variant="filled"
          sx={{ borderRadius: "10px" }}
        >
          {lastActionType === "add" ? t("favoriteAdded") : t("favoriteRemoved")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const navBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 20,
  width: 40,
  height: 40,
  bgcolor: "#fff",
  boxShadow: 3,
  borderRadius: "50%",
  "&:hover": { bgcolor: "#f0f0f0" },
};

const scrollContainerStyle = {
  display: "flex",
  gap: 2,
  overflowX: "auto",
  py: 3,
  px: { xs: 2, md: 6 },
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  cursor: "grab",
  "&::-webkit-scrollbar": { display: "none" },
  "& > *": { userSelect: "none", WebkitUserDrag: "none" },
};
