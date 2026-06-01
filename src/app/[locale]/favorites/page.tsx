"use client";

import { useParams } from "next/navigation";
import { useUnit } from "effector-react";
import { Box, Container, Typography, IconButton, Button, CircularProgress } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslations } from "next-intl";
import {
  $favorites,
  toggleFavorite,
  loadFavorites,
  $favoritesLoading,
} from "../../../entities/favourite/model/store";
import { $basket, addToBasket } from "../../../entities/basket/model/store";

// ✅ Proper FavoriteItem type
type FavoriteItem = {
  id: number;
  productId: string | number;
  title: string;
  image: string;
  price: number;
  currency?: string;
};

const FavoriteImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f9f9f9",
        }}
      >
        <Typography sx={{ color: "#999", fontSize: 13 }}>Rasm yo'q</Typography>
      </Box>
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src || "/placeholder.jpg"}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      onError={() => setError(true)}
    />
  );
};

const formatPrice = (price: number) => {
  if (!Number.isFinite(price) || price < 0) return null;
  return new Intl.NumberFormat("ru-RU").format(price);
};

export default function FavoritesPage() {
  const params = useParams();
  const locale = params?.locale;
  const t = useTranslations("favorites");

  const favorites = useUnit($favorites) as FavoriteItem[];
  const loading = useUnit($favoritesLoading);
  const basket = useUnit($basket);
  const basketItems = basket?.items || [];

  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);
  const handleAddToBasket = useUnit(addToBasket);

  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    loadFavoritesEv();
  }, [loadFavoritesEv]);

  const isItemInBasket = useCallback(
    (productId: string | number) => {
      return basketItems.some((item: any) => item.productId === productId);
    },
    [basketItems],
  );

  const onFavoriteClick = (e: React.MouseEvent, item: FavoriteItem) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleFavorite(item as any);
    setOpenToast(true);
    setTimeout(() => setOpenToast(false), 3000);
  };

  const onBasketClick = (e: React.MouseEvent, item: FavoriteItem) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToBasket({
      id: Number(item.productId),
      productId: Number(item.productId),
      title: item.title || "Product",
      price: Number.isFinite(item.price) ? item.price : 0,
      image: item.image || "/placeholder.jpg",
      quantity: 1,
      isInStock: true,
      currency: item.currency || "UZS",
    });
  };

  if (loading) {
    return (
      <Box sx={{ py: 12, textAlign: "center", bgcolor: "#FAFAFA", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          bgcolor: "#FAFAFA",
          minHeight: "100vh",
          "@media (max-width:1000px)": {
            mt: 5,
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
            {t("empty.title")}
          </Typography>
          <Typography sx={{ color: "#999", mb: 4 }}>
            {t("empty.description")}
          </Typography>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{ color: "#2196f3", fontWeight: 600, cursor: "pointer" }}
            >
              {t("empty.goToCatalog")}
            </Typography>
          </Link>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "#FAFAFA", minHeight: "100vh" }}>
        <Container maxWidth={false} sx={{ maxWidth: "1800px" }}>
          <Typography
            variant="h4"
            sx={{ mb: { xs: 4, md: 6 }, fontWeight: 700, color: "#000", fontSize: { xs: "24px", md: "34px" } }}
          >
            {t("title")} ({favorites.length})
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              width: "100%",
            }}
          >
            {favorites.map((item) => {
              const inBasket = isItemInBasket(item.productId);
              const priceFormatted = formatPrice(item.price);
              const currency = item.currency || "UZS";

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/product/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                      p: { xs: 2, md: 2.5 },
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                      bgcolor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* Top row: status + actions */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Typography
                        sx={{
                          padding: "4px 12px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#3BB351",
                          bgcolor: "#e8f8ed",
                        }}
                      >
                        {t("inFavorite")}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Image
                          src="/scale.svg"
                          height={22}
                          width={22}
                          alt="compare"
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => onFavoriteClick(e, item)}
                          sx={{
                            p: 0.5,
                            color: "#FF5F5F",
                            "&:hover": {
                              backgroundColor: "rgba(255,95,95,0.08)",
                            },
                          }}
                        >
                          <FavoriteIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Product Image */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 180, md: 200 },
                        bgcolor: "#f9f9f9",
                        borderRadius: "12px",
                        overflow: "hidden",
                        mb: 2,
                      }}
                    >
                      <FavoriteImage src={item.image} alt={item.title || "Product"} />
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#1a1a1a",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          lineHeight: 1.4,
                          minHeight: "42px",
                        }}
                      >
                        {item.title || t("titleUnavailable")}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "18px",
                        }}
                      >
                        {priceFormatted
                          ? `${priceFormatted} ${currency}`
                          : t("priceUnavailable")}
                      </Typography>
                    </Box>

                    {/* Add to basket button */}
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        fullWidth
                        onClick={(e) => onBasketClick(e, item)}
                        sx={{
                          bgcolor: inBasket ? "#3BB351" : "#249FFC",
                          color: "#fff",
                          py: 1.2,
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: 600,
                          textTransform: "none",
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            bgcolor: inBasket ? "#2e8b40" : "#1a8ae5",
                          },
                        }}
                      >
                        {inBasket ? (
                          <DoneIcon sx={{ color: "#fff", fontSize: 20 }} />
                        ) : (
                          <Image
                            src="/basketIcon.svg"
                            alt="basket"
                            width={20}
                            height={20}
                          />
                        )}
                        {inBasket ? "Qo‘shildi" : "Savatchaga"}
                      </Button>
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Toast notification */}
      {openToast && (
        <Box
          sx={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              bgcolor: "#333",
              color: "white",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
              fontWeight: 500,
            }}
          >
            {t("toast.updated")}
          </Box>
        </Box>
      )}
    </>
  );
}
