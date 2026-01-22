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
  image: string;
  price: number;
  is_in_stock: boolean;
}
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
const BestSellers = () => {
  const { locale } = useParams();
  const [arrivals, loading, loadArrivalsEv] = useUnit([
    $newArrivals,
    $loadingArrivals,
    loadArrivals,
  ]);
  const { items: basketItems } = useUnit($basket);
  const favorites = useUnit($favorites); // ✅ Full list
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);

  const [openToast, setOpenToast] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(false);
  const [lastToggledId, setLastToggledId] = useState<number>(0); // ✅ Track last toggle
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadArrivalsEv({ lang: "ru" });
    loadFavoritesEv();
  }, [loadArrivalsEv, loadFavoritesEv]);

  const isItemInBasket = useCallback(
    (productId: number | string) => {
      // number | string qo'shildi
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

  const onFavoriteClick = (e: React.MouseEvent, item: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();

    // Renderni buzmaslik uchun vaqtni aynan shu yerda oling
    const timestampId = Number(new Date());

    handleToggleFavorite({
      id: timestampId, // Date.now() o'rniga
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

    if (item.is_in_stock) {
      // String bo'lsa raqamga o'tkazamiz, number bo'lsa o'zi qoladi
      const numericId =
        typeof item.id === "string" ? parseInt(item.id, 10) : item.id;

      handleAddToBasket({
        id: numericId, // Endi bu aniq number
        productId: numericId, // Endi bu aniq number
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

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Хиты продаж
      </Typography>

      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={navBtnStyle({
            left: -20,
            "@media (max-width:900px)": {
              display: "none",
            },
          })}
        >
          <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={navBtnStyle({
            right: -20,
            "@media (max-width:900px)": {
              display: "none",
            },
          })}
        >
          <Image src="/arrowright.svg" width={32} height={32} alt="right" />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            py: 2,
            px: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {loading && <Typography>Загрузка...</Typography>}

          {arrivals?.results?.map((item) => {
            const inBasket = isItemInBasket(item.id);
            const isFavorite = isItemFavorite(item.id);
            return (
              <Link
                key={item.id}
                href={`/${locale}/product/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box sx={cardStyle}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={statusBadgeStyle(item.is_in_stock)}>
                      {item.is_in_stock ? "В наличии" : "Нет в наличии"}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
                          "&:hover": {
                            color: isFavorite ? "#cc0000" : "#ff4444",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {isFavorite ? (
                          <FavoriteIcon sx={{ fontSize: 26 }} />
                        ) : (
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 26 }} />
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
                      sx={{ color: "#000", fontWeight: 700, fontSize: "20px" }}
                    >
                      {new Intl.NumberFormat("ru-RU").format(item.price)} сум
                    </Typography>
                  </Box>

                  <Button
                    onClick={(e) => onBasketClick(e, item)}
                    sx={{
                      ...actionBtnStyle,
                      bgcolor: inBasket ? "#3BB351" : "#249FFC",
                      "&:hover": { bgcolor: inBasket ? "#2e8b40" : "#1a8ae5" },
                    }}
                  >
                    {inBasket ? (
                      <DoneIcon sx={{ color: "#fff", fontSize: 30 }} />
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
                      />
                    )}
                  </Button>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>

      {/* Basket Toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          Товар успешно добавлен в корзину!
        </Alert>
      </Snackbar>

      {/* Favorite Toast - FIXED */}
      <Snackbar
        open={favoriteToast}
        autoHideDuration={2000}
        onClose={() => setFavoriteToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          severity={isItemFavorite(lastToggledId) ? "info" : "success"}
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {isItemFavorite(lastToggledId)
            ? "Удалено из избранного"
            : "Добавлено в избранное"}
          !
        </Alert>
      </Snackbar>
    </Box>
  );
};

// All your existing styles...
const navBtnStyle = (pos: object) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  bgcolor: "#fff",
  boxShadow: 2,
  width: 50,
  height: 50,
  ...pos,
  "&:hover": { bgcolor: "#f5f5f5" },
});

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
  transition: "transform 0.2s",
  "&:hover": { transform: "translateY(-5px)" },
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
  lineHeight: "1.4em",
};

const actionBtnStyle = {
  minWidth: "54px",
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  position: "absolute",
  right: "15px",
  bottom: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};

export default BestSellers;
