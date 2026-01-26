"use client";

import {
  Box,
  Button,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useUnit } from "effector-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoneIcon from "@mui/icons-material/Done";

import {
  $newArrivals,
  $loadingArrivals,
  loadArrivals,
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

export const Recommend = () => {
  const { locale } = useParams();
  const [arrivals, loading, loadArrivalsEv] = useUnit([
    $newArrivals,
    $loadingArrivals,
    loadArrivals,
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

  const getUniqueId = useMemo(() => Date.now(), []);

  // --- DRAG SCROLL LOGIC FOR TWO SLIDERS ---
  const scrollRefTop = useRef<HTMLDivElement>(null);
  const scrollRefBottom = useRef<HTMLDivElement>(null);

  const dragInfoTop = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });
  const dragInfoBottom = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  useEffect(() => {
    loadArrivalsEv({ lang: "ru" });
    loadFavoritesEv();
  }, [loadArrivalsEv, loadFavoritesEv]);

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

  // --- REUSABLE DRAG HANDLERS ---
  const handleMouseDown = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
    info: any,
  ) => {
    const slider = ref.current;
    if (!slider) return;
    info.current.isDown = true;
    info.current.hasMoved = false;
    info.current.startX = e.pageX - slider.offsetLeft;
    info.current.scrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";
    slider.style.scrollSnapType = "none";
  };

  const handleMouseMove = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
    info: any,
  ) => {
    const slider = ref.current;
    if (!slider || !info.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const distance = x - info.current.startX;
    if (Math.abs(distance) > 5) info.current.hasMoved = true;
    slider.scrollLeft = info.current.scrollLeft - distance * 1.5;
  };

  const stopDragging = (ref: React.RefObject<HTMLDivElement>, info: any) => {
    const slider = ref.current;
    if (!slider) return;
    info.current.isDown = false;
    slider.style.cursor = "grab";
    slider.style.scrollSnapType = "x mandatory";
  };

  const preventClickIfDragged = (e: React.MouseEvent, info: any) => {
    if (info.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // --- ACTION HANDLERS ---
  const onFavoriteClick = useCallback(
    (e: React.MouseEvent, item: ProductItem, info: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (info.current.hasMoved) return;

      const wasFavorite = isItemFavorite(item.id);
      handleToggleFavorite({
        id: getUniqueId,
        productId: item.id,
        title: item.short_description || "Product",
        image: item.image,
        price: item.price,
      });
      setLastActionType(wasFavorite ? "remove" : "add");
      setOpenFavoriteToast(true);
    },
    [getUniqueId, handleToggleFavorite, isItemFavorite],
  );

  const onBasketClick = useCallback(
    (e: React.MouseEvent, item: ProductItem, info: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (info.current.hasMoved) return;

      if (item.is_in_stock) {
        handleAddToBasket({
          id: Number(item.id),
          productId: Number(item.id),
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

  const scrollBtn = (
    ref: React.RefObject<HTMLDivElement>,
    dir: "left" | "right",
  ) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const formatPrice = useMemo(
    () => (price: number) => new Intl.NumberFormat("ru-RU").format(price),
    [],
  );

  return (
    <Box sx={{ mt: "84px", userSelect: "none" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Мы рекомендуем
      </Typography>

      {/* TOP SECTION */}
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollBtn(scrollRefTop, "left")}
          sx={{
            ...navBtnStyle,
            left: { xs: 8, md: -20 },
            "@media (max-width:1000px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowleft.svg" width={28} height={28} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollBtn(scrollRefTop, "right")}
          sx={{
            ...navBtnStyle,
            right: { xs: 8, md: -20 },
            "@media (max-width:1000px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowright.svg" width={28} height={28} alt="right" />
        </IconButton>

        <Box
          ref={scrollRefTop}
          onMouseDown={(e) => handleMouseDown(e, scrollRefTop, dragInfoTop)}
          onMouseMove={(e) => handleMouseMove(e, scrollRefTop, dragInfoTop)}
          onMouseUp={() => stopDragging(scrollRefTop, dragInfoTop)}
          onMouseLeave={() => stopDragging(scrollRefTop, dragInfoTop)}
          sx={scrollContainerStyle}
        >
          {loading && <Typography>Загрузка...</Typography>}
          {arrivals?.results?.map((item: ProductItem) => (
            <ProductCard
              key={item.id}
              item={item}
              locale={locale}
              info={dragInfoTop}
              inBasket={isItemInBasket(item.id)}
              isFavorite={isItemFavorite(item.id)}
              onFavoriteClick={onFavoriteClick}
              onBasketClick={onBasketClick}
              preventClick={preventClickIfDragged}
              formatPrice={formatPrice}
            />
          ))}
        </Box>
      </Box>

      {/* BOTTOM SECTION */}
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollBtn(scrollRefBottom, "left")}
          sx={{
            ...navBtnStyle,
            left: { xs: 8, md: -20 },
            "@media (max-width:1000px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowleft.svg" width={28} height={28} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollBtn(scrollRefBottom, "right")}
          sx={{
            ...navBtnStyle,
            right: { xs: 8, md: -20 },
            "@media (max-width:1000px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowright.svg" width={28} height={28} alt="right" />
        </IconButton>

        <Box
          ref={scrollRefBottom}
          onMouseDown={(e) =>
            handleMouseDown(e, scrollRefBottom, dragInfoBottom)
          }
          onMouseMove={(e) =>
            handleMouseMove(e, scrollRefBottom, dragInfoBottom)
          }
          onMouseUp={() => stopDragging(scrollRefBottom, dragInfoBottom)}
          onMouseLeave={() => stopDragging(scrollRefBottom, dragInfoBottom)}
          sx={scrollContainerStyle}
        >
          {arrivals?.results?.map((item: ProductItem) => (
            <ProductCard
              key={item.id}
              item={item}
              locale={locale}
              info={dragInfoBottom}
              inBasket={isItemInBasket(item.id)}
              isFavorite={isItemFavorite(item.id)}
              onFavoriteClick={onFavoriteClick}
              onBasketClick={onBasketClick}
              preventClick={preventClickIfDragged}
              formatPrice={formatPrice}
            />
          ))}
        </Box>
      </Box>

      {/* SNACKBARS */}
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
          Товар в корзине!
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
          {lastActionType === "add" ? "Добавлено" : "Удалено"}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// --- SUB-COMPONENT FOR CLEANER CODE ---
const ProductCard = ({
  item,
  locale,
  info,
  inBasket,
  isFavorite,
  onFavoriteClick,
  onBasketClick,
  preventClick,
  formatPrice,
}: any) => (
  <Link
    href={`/${locale}/product/${item.id}`}
    style={{ textDecoration: "none" }}
    onClickCapture={(e) => preventClick(e, info)}
    onDragStart={(e) => e.preventDefault()}
  >
    <Box sx={cardStyle}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={statusBadgeStyle(item.is_in_stock)}>
          {item.is_in_stock ? "В наличии" : "Нет в наличии"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Image src="/scale.svg" height={24} width={24} alt="compare" />
          <IconButton
            size="small"
            onClick={(e) => onFavoriteClick(e, item, info)}
            sx={{ color: isFavorite ? "#ff4444" : "#4E4E4E" }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "230px",
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
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={descriptionStyle}>
          {item.short_description || "Product"}
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontWeight: 700,
            fontSize: "20px",
            "@media (max-width:1000px)": {
              fontSize: "16px",
            },
          }}
        >
          {formatPrice(item.price)} сум
        </Typography>
      </Box>
      <Button
        onClick={(e) => onBasketClick(e, item)}
        sx={{
          ...actionBtnStyle,
          bgcolor: inBasket ? "#3BB351" : "#249FFC",
          width: { xs: "44px", md: "54px" },
          height: { xs: "44px", md: "54px" },
          minWidth: { xs: "44px", md: "54px" },
          "&:hover": {
            bgcolor: inBasket ? "#2e8b40" : "#1a8ae5",
          },
          "& img": {
            width: { xs: "22px", md: "26px" },
            height: { xs: "22px", md: "26px" },
          },
        }}
      >
        {inBasket ? (
          <DoneIcon sx={{ color: "#fff", fontSize: { xs: 24, md: 30 } }} />
        ) : (
          <Image
            src={
              item.is_in_stock ? "/basketIcon.svg" : "/call-outline_white.svg"
            }
            alt="icon"
            width={26}
            height={26}
            style={{ objectFit: "contain" }}
          />
        )}
      </Button>
    </Box>
  </Link>
);

// --- STYLES ---
const navBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 20,
  width: 50,
  height: 50,
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
  "&::-webkit-scrollbar": { display: "none" },
  cursor: "grab",
  "& > a": { flexShrink: 0, scrollSnapAlign: "start", WebkitUserDrag: "none" },
};

const cardStyle = {
  width: 300,
  minHeight: "480px",
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
  "@media (max-width:1000px)": {
    fontSize: "14px",
  },
};

const actionBtnStyle = {
  minWidth: "54px",
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  position: "absolute",
  right: "15px",
  bottom: "15px",
  "&:hover": { opacity: 0.9 },
  "@media (max-width:1000px)": {
    minWidth: "44px",
    height: "44px",
    borderRadius: "50%",
    position: "absolute",
    right: "15px",
    bottom: "15px",
  },
};
