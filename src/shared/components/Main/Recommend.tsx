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

const Recommend = () => {
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

  // Toast states
  const [openToast, setOpenToast] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(false);
  const [lastToggledId, setLastToggledId] = useState<string>("");

  const scrollRefTop = useRef<HTMLDivElement>(null);
  const scrollRefBottom = useRef<HTMLDivElement>(null);

  // Load data on mount
  useEffect(() => {
    loadArrivalsEv({ lang: (locale as string) || "ru" });
    loadFavoritesEv();
  }, [loadArrivalsEv, loadFavoritesEv, locale]);

  // Memoized helpers - FIXED: Handle string|number IDs
  const isItemInBasket = useCallback(
    (productId: string | number) =>
      basketItems.some((item) => String(item.productId) === String(productId)),
    [basketItems],
  );

  const isItemFavorite = useCallback(
    (productId: string | number) =>
      favorites.some((item) => String(item.productId) === String(productId)),
    [favorites],
  );

  // Event handlers - FIXED: Number conversion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFavoriteClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();

    const productId = Number(item.id);

    handleToggleFavorite({
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      productId: productId, // ✅ FIXED: Number(item.id)
      title: item.short_description || "Product",
      image: item.image,
      price: item.price,
    });
    setLastToggledId(String(item.id));
    setFavoriteToast(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onBasketClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();

    const productId = Number(item.id);

    if (item.is_in_stock) {
      handleAddToBasket({
        id: productId, // ✅ FIXED: Number(item.id)
        productId: productId, // ✅ FIXED: Number(item.id)
        title: item.short_description || "Product",
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

  const scrollTop = (dir: "left" | "right") => {
    if (!scrollRefTop.current) return;
    scrollRefTop.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const scrollBottom = (dir: "left" | "right") => {
    if (!scrollRefBottom.current) return;
    scrollRefBottom.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  // Memoized price formatter
  const formatPrice = useMemo(
    () => (price: number) => new Intl.NumberFormat("ru-RU").format(price),
    [],
  );

  // Reusable styles
  const navBtnStyle = (pos: { left?: number; right?: number }) => ({
    position: "absolute" as const,
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
  } as const;

  const clickableCardStyle = {
    ...cardStyle,
    cursor: "pointer",
  } as const;

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
  } as const;

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
  } as const;

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Мы рекомендуем
      </Typography>

      {/* TOP SECTION - Clickable cards */}
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollTop("left")}
          sx={navBtnStyle({ left: 0 })}
        >
          <Image src="/arrowleft.svg" width={40} height={40} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollTop("right")}
          sx={navBtnStyle({ right: 0 })}
        >
          <Image src="/arrowright.svg" width={40} height={40} alt="right" />
        </IconButton>

        <Box
          ref={scrollRefTop}
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
                <Box sx={clickableCardStyle}>
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
                      {formatPrice(item.price)} сум
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

      {/* BOTTOM SECTION - Non-clickable cards */}
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollBottom("left")}
          sx={navBtnStyle({ left: 0 })}
        >
          <Image src="/arrowleft.svg" width={40} height={40} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollBottom("right")}
          sx={navBtnStyle({ right: 0 })}
        >
          <Image src="/arrowright.svg" width={40} height={40} alt="right" />
        </IconButton>

        <Box
          ref={scrollRefBottom}
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
              <Box key={item.id} sx={cardStyle}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                    {formatPrice(item.price)} сум
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
            );
          })}
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
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          Товар успешно добавлен в корзину!
        </Alert>
      </Snackbar>

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

export default Recommend;
