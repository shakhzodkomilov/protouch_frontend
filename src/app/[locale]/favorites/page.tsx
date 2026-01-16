"use client";

import { useParams } from "next/navigation";
import { useUnit } from "effector-react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DoneIcon from "@mui/icons-material/Done";
import {
  $favorites,
  toggleFavorite,
  loadFavorites,
} from "../../../entities/favourite/model/store";
import { $basket, addToBasket } from "../../../entities/basket/model/store";

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

export default function FavoritesPage() {
  const { locale } = useParams();
  const favorites = useUnit($favorites);
  const basketItems = useUnit($basket);
  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);
  const handleAddToBasket = useUnit(addToBasket);

  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    loadFavoritesEv();
  }, [loadFavoritesEv]);

  const isItemInBasket = useCallback(
    (productId: string | number) => {
      return basketItems.items.some((item) => item.productId === productId);
    },
    [basketItems.items]
  );

  const onFavoriteClick = (e: React.MouseEvent, productId: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleFavorite({
      id: Date.now(),
      productId,
      title: "Product", // Fallback
      image: "/placeholder.jpg", // Fallback
      price: 0,
    });
    setOpenToast(true);
  };

  const onBasketClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToBasket({
      id: item.productId,
      productId: item.productId,
      title: item.title || "Product",
      price: item.price || 0,
      image: item.image || "/placeholder.jpg",
      quantity: 1,
      isInStock: true,
    });
  };

  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          bgcolor: "#FAFAFA",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
            Избранное пусто
          </Typography>
          <Typography sx={{ color: "#999", mb: 4 }}>
            Добавьте товары в избранное, нажав на сердечко
          </Typography>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{ color: "#2196f3", fontWeight: 600, cursor: "pointer" }}
            >
              Перейти в каталог
            </Typography>
          </Link>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ py: 8, bgcolor: "#FAFAFA", minHeight: "100vh" }}>
        <Container maxWidth={false} sx={{ maxWidth: "1800px" }}>
          <Typography
            variant="h4"
            sx={{ mb: 6, fontWeight: 700, color: "#000" }}
          >
            Избранные товары ({favorites.length})
          </Typography>

          <Grid container spacing={7}>
            {favorites.map((item) => {
              const inBasket = isItemInBasket(item.productId);
              const isFavorite = true; // Always true on favorites page

              return (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Link
                    href={`/${locale}/product/${item.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box sx={cardStyle}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={statusBadgeStyle(true)}>
                          В избранном
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
                            onClick={(e) => onFavoriteClick(e, item.productId)}
                            sx={{
                              p: 0.25,
                              color: "#ff4444",
                              "&:hover": {
                                color: "#cc0000",
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <FavoriteIcon sx={{ fontSize: 26 }} />
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
                          src={item.image || "/placeholder-product.jpg"}
                          alt={item.title || "Product"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={descriptionStyle}>
                          {item.title || "Название недоступно"}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#000",
                            fontWeight: 700,
                            fontSize: "20px",
                          }}
                        >
                          {item.price > 0
                            ? new Intl.NumberFormat("ru-RU").format(
                                item.price
                              ) + " сум"
                            : "Цена недоступна"}
                        </Typography>
                      </Box>

                      <Button
                        onClick={(e) => onBasketClick(e, item)}
                        sx={{
                          ...actionBtnStyle,
                          bgcolor: inBasket ? "#3BB351" : "#249FFC",
                          "&:hover": {
                            bgcolor: inBasket ? "#2e8b40" : "#1a8ae5",
                          },
                        }}
                      >
                        {inBasket ? (
                          <DoneIcon sx={{ color: "#fff", fontSize: 30 }} />
                        ) : (
                          <Image
                            src="/basketIcon.svg"
                            alt="basket"
                            width={26}
                            height={26}
                          />
                        )}
                      </Button>
                    </Box>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Toast */}
      {openToast && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#3BB351",
              color: "white",
              borderRadius: 2,
              px: 4,
              py: 1,
            }}
          >
            Удалено из избранного
          </Button>
        </Box>
      )}
    </>
  );
}
