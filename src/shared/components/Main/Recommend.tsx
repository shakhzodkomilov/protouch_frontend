"use client";

import {
  Box,
  Button,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUnit } from "effector-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslations } from "next-intl";

import {
  $Recommends,
  $loadingRecommend,
  loadRecommends,
  $steamAndPodcast,
  $loadingSteamAndPodcast,
  loadSteamAndPodcast,
} from "../../../entities/product/model";
import { addToBasket, $basket } from "../../../entities/basket/model/store";
import {
  toggleFavorite,
  loadFavorites,
  $favorites,
} from "../../../entities/favourite/model/store";

interface ProductItem {
  id: number | string;
  short_description?: string;
  image: string;
  price: number;
  is_in_stock: boolean;
}

// ─── Reusable Product Scroll Section ─────────────────────────────────────────

interface ProductSectionProps {
  title: string;
  items: ProductItem[] | undefined;
  loading: boolean;
  locale: string | string[];
  isItemInBasket: (id: number | string) => boolean;
  isItemFavorite: (id: number | string) => boolean;
  onBasketClick: (e: React.MouseEvent, item: ProductItem) => void;
  onFavoriteClick: (e: React.MouseEvent, item: ProductItem) => void;
  t: ReturnType<typeof useTranslations>;
}

const ProductSection = ({
  title,
  items,
  loading,
  locale,
  isItemInBasket,
  isItemFavorite,
  onBasketClick,
  onFavoriteClick,
  t,
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
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "40px", userSelect: "none" }}>
      <Typography
        sx={{
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
            items.map((item: ProductItem) => {
              const inBasket = isItemInBasket(item.id);
              const isFavorite = isItemFavorite(item.id);

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/product/${item.id}`}
                  style={{ textDecoration: "none" }}
                  onClickCapture={preventClickIfDragged}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Box sx={cardStyle}>
                    {/* Top row */}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={statusBadgeStyle(item.is_in_stock)}>
                        {item.is_in_stock ? t("inStock") : t("outOfStock")}
                      </Typography>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Image
                          src="/scale.svg"
                          height={24}
                          width={24}
                          alt="compare"
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => onFavoriteClick(e, item)}
                          sx={{
                            p: 0.25,
                            color: isFavorite ? "#ff4444" : "#4E4E4E",
                          }}
                        >
                          {isFavorite ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderOutlinedIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Product image */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "180px",
                        my: 2,
                        pointerEvents: "none",
                        "@media (max-width:900px)": {
                          height: "140px",
                          width: "120px",
                          margin: "0 auto",
                        },
                      }}
                    >
                      <Image
                        src={item.image}
                        alt="product"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>

                    {/* Info */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={descriptionStyle}>
                        {item.short_description || "Product"}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "18px",
                          "@media (max-width:1000px)": { fontSize: "16px" },
                        }}
                      >
                        {new Intl.NumberFormat("ru-RU").format(item.price)}{" "}
                        {t("currency")}
                      </Typography>
                    </Box>

                    {/* Basket button */}
                    <Button
                      onClick={(e) => onBasketClick(e, item)}
                      sx={{
                        ...actionBtnStyle,
                        bgcolor: inBasket ? "#3BB351" : "#249FFC",
                        width: { xs: "40px", md: "50px" },
                        height: { xs: "44px", md: "50px" },
                        minWidth: { xs: "44px", md: "54px" },
                        "&:hover": {
                          bgcolor: inBasket ? "#2e8b40" : "#1a8ae5",
                        },
                      }}
                    >
                      {inBasket ? (
                        <DoneIcon
                          sx={{ color: "#fff", fontSize: { xs: 24, md: 30 } }}
                        />
                      ) : (
                        <Image
                          src={
                            item.is_in_stock
                              ? "/basketIcon.svg"
                              : "/call-outline_white.svg"
                          }
                          alt="icon"
                          width={24}
                          height={24}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </Button>
                  </Box>
                </Link>
              );
            })
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
    $Recommends,
    $loadingRecommend,
    loadRecommends,
  ]);

  const [steamItems, loadingSteam, loadSteamEv] = useUnit([
    $steamAndPodcast,
    $loadingSteamAndPodcast,
    loadSteamAndPodcast,
  ]);

  const { items: basketItems } = useUnit($basket);
  const favorites = useUnit($favorites);
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);
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

  const isItemInBasket = useCallback(
    (productId: number | string) =>
      basketItems.some((item) => String(item.productId) === String(productId)),
    [basketItems],
  );

  const isItemFavorite = useCallback(
    (productId: number | string) =>
      favorites.some((item) => String(item.productId) === String(productId)),
    [favorites],
  );

  const onFavoriteClick = useCallback(
    (e: React.MouseEvent, item: ProductItem) => {
      e.preventDefault();
      e.stopPropagation();
      const wasFavorite = isItemFavorite(item.id);
      handleToggleFavorite({
        id: Number(new Date()),
        productId: item.id,
        title: item.short_description || "Product",
        image: item.image,
        price: item.price,
      });
      setLastActionType(wasFavorite ? "remove" : "add");
      setOpenFavoriteToast(true);
    },
    [handleToggleFavorite, isItemFavorite],
  );

  const onBasketClick = useCallback(
    (e: React.MouseEvent, item: ProductItem) => {
      e.preventDefault();
      e.stopPropagation();
      if (item.is_in_stock) {
        const numericId =
          typeof item.id === "string" ? parseInt(item.id, 10) : item.id;
        handleAddToBasket({
          id: numericId,
          productId: numericId,
          title: item.short_description || "Product",
          price: item.price,
          image: item.image,
          quantity: 1,
          isInStock: true,
        });
        setOpenBasketToast(true);
      } else {
        window.location.href = `tel:+998000000000`;
      }
    },
    [handleAddToBasket],
  );

  const sharedProps = {
    locale,
    isItemInBasket,
    isItemFavorite,
    onBasketClick,
    onFavoriteClick,
    t,
  };

  return (
    <Box>
      {/* Section 1 — We Recommend */}
      <ProductSection
        title={t("weRecommend")}
        items={recommendItems?.results}
        loading={loadingRecommend}
        {...sharedProps}
      />

      {/* Section 2 — Steam and Podcast */}
      <ProductSection
        title={t("steamAndPodcast")}
        items={steamItems?.results}
        loading={loadingSteam}
        {...sharedProps}
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
  "& > a": {
    flexShrink: 0,
    scrollSnapAlign: "start",
    userSelect: "none",
    WebkitUserDrag: "none",
  },
};

const cardStyle = {
  width: 300,
  minHeight: "420px",
  borderRadius: 3,
  p: 2,
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  bgcolor: "#fff",
  flexShrink: 0,
  display: "flex",
  position: "relative",
  flexDirection: "column",
  "@media (max-width:900px)": {
    minHeight: "320px",
    width: "240px",
  },
};

const statusBadgeStyle = (isInStock: boolean) => ({
  padding: "4px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  color: isInStock ? "#3BB351" : "#FF5F5F",
  bgcolor: isInStock ? "#D6F2DB" : "#FFE4E4",
});

const descriptionStyle = {
  fontWeight: 600,
  fontSize: "16px",
  color: "#4E4E4E",
  mb: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  "@media (max-width:1000px)": { fontSize: "14px" },
};

const actionBtnStyle = {
  minWidth: "54px",
  height: "54px",
  borderRadius: "50%",
  position: "absolute",
  right: "15px",
  bottom: "15px",
  "@media (max-width:1000px)": {
    minWidth: "44px",
    height: "44px",
    right: "15px",
    bottom: "15px",
  },
};
