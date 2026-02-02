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

interface ProductItem {
  id: number | string;
  description?: string;
  short_description?: string;
  image: string;
  price: number;
  is_in_stock: boolean;
}

import {
  $bestSellers,
  $loadingSellers,
  loadSellers,
} from "../../../entities/product/model";
import { addToBasket, $basket } from "../../../entities/basket/model/store";
import {
  toggleFavorite,
  loadFavorites,
  $favorites,
} from "../../../entities/favourite/model/store";
import { useTranslations } from "next-intl";

const BestSellers = () => {
  const { locale } = useParams();
  const t = useTranslations("main");
  const [items, loading, loadSellersEv] = useUnit([
    $bestSellers,
    $loadingSellers,
    loadSellers,
  ]);
  const { items: basketItems } = useUnit($basket);
  const favorites = useUnit($favorites);
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);

  const [openToast, setOpenToast] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(false);
  const [lastToggledId, setLastToggledId] = useState<number | string>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  useEffect(() => {
    loadSellersEv({ lang: (locale as string) || "ru" });
  }, [loadSellersEv, locale]);

  const isItemInBasket = useCallback(
    (productId: number | string) => {
      return basketItems.some(
        (item) => String(item.productId) === String(productId),
      );
    },
    [basketItems],
  );

  const isItemFavorite = useCallback(
    (productId: number | string) => {
      return favorites.some(
        (item) => String(item.productId) === String(productId),
      );
    },
    [favorites],
  );

  // --- DRAG HANDLERS ---
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

    if (Math.abs(distance) > 5) {
      dragInfo.current.hasMoved = true;
    }

    const walk = distance * 1.5;
    slider.scrollLeft = dragInfo.current.scrollLeft - walk;
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

  const onFavoriteClick = (e: React.MouseEvent, item: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragInfo.current.hasMoved) return;

    setLastToggledId(item.id);
    handleToggleFavorite({
      id: Number(new Date()),
      productId: item.id,
      title: item.description || "Product",
      image: item.image,
      price: item.price,
    });
    setFavoriteToast(true);
  };

  const onBasketClick = (e: React.MouseEvent, item: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragInfo.current.hasMoved) return;

    if (item.is_in_stock) {
      const numericId =
        typeof item.id === "string" ? parseInt(item.id, 10) : item.id;
      handleAddToBasket({
        id: numericId,
        productId: numericId,
        title: item.description || "Product",
        price: item.price,
        image: item.image,
        quantity: 1,
        isInStock: item.is_in_stock,
      });
      setOpenToast(true);
    } else {
      window.location.href = `tel:+998000000000`;
    }
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "84px", userSelect: "none" }}>
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: 600,
          color: "#000",
          "@media (max-width:900px)": {
            fontSize: "26px",
          },
        }}
      >
        {t("bestSellers")}
      </Typography>
      <Box sx={{ position: "relative", mt: "14px" }}>
        {/* Nav Arrows */}
        <IconButton
          onClick={() => scrollBtn("left")}
          sx={{
            ...navBtnStyle,
            left: { xs: 8, md: -20 },
            width: 40,
            height: 40,
            "@media (max-width:1000px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowleft.svg" width={28} height={28} alt="left" />
        </IconButton>

        <IconButton
          onClick={() => scrollBtn("right")}
          sx={{
            ...navBtnStyle,
            right: { xs: 8, md: -20 },
            width: 40,
            height: 40,
            "@media (max-width:1000px)": {
              display: "none",
            },
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
          sx={{
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
          }}
        >
          {loading ? (
            <Typography>Загрузка...</Typography>
          ) : (
            items?.results?.map((item) => {
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={statusBadgeStyle(item.is_in_stock)}>
                        {item.is_in_stock ? "В наличии" : "Нет в наличии"}
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
                        {item.short_description}
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
                        {new Intl.NumberFormat("ru-RU").format(item.price)}{" "}
                        {t("summary")}
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
                          width={26}
                          height={26}
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

      {/* Toasts */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
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
        open={favoriteToast}
        autoHideDuration={2000}
        onClose={() => setFavoriteToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert severity="info" variant="filled" sx={{ borderRadius: "10px" }}>
          Избранное обновлено!
        </Alert>
      </Snackbar>
    </Box>
  );
};

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
  mb: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  color: "rgb(78, 78, 78)",
  overflow: "hidden",
  "@media (max-width:1000px)": {
    fontSize: "14px",
  },
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
    borderRadius: "50%",
    position: "absolute",
    right: "15px",
    bottom: "15px",
  },
};

export default BestSellers;
