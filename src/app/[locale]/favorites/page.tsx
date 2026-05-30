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
};

const cardStyle = {
  width: "100%",
  maxWidth: "280px",
  margin: "0 auto",
  minHeight: "380px",
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
      price: item.price || 0,
      image: item.image || "/placeholder.jpg",
      quantity: 1,
      isInStock: true,
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
      <Box sx={{ py: 8, bgcolor: "#FAFAFA", minHeight: "100vh" }}>
        <Container maxWidth={false} sx={{ maxWidth: "1800px" }}>
          <Typography
            variant="h4"
            sx={{ mb: 6, fontWeight: 700, color: "#000" }}
          >
            {t("title")} ({favorites.length})
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(6, 1fr)",
              },
              width: "100%",
            }}
          >
            {favorites.map((item) => {
              const inBasket = isItemInBasket(item.productId);

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/product/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={cardStyle}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={statusBadgeStyle(true)}>
                        {t("inFavorite")}
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
                            color: "#ff4444",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: "#cc0000",
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
                        height: "200px",
                        my: 2,
                      }}
                    >
                      <Image
                        src={item.image || "/placeholder-product.jpg"}
                        alt={item.title || "Product"}
                        fill
                        sizes="(max-width: 768px) 100vw, 250px"
                        style={{ objectFit: "contain" }}
                      />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      {/* <Typography sx={descriptionStyle}>
                        {item.title || t("titleUnavailable")}
                      </Typography> */}
                      <Typography
                        sx={{
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "20px",
                        }}
                      >
                        {item.price > 0
                          ? `${new Intl.NumberFormat("ru-RU").format(item.price)} ${t("currency")}`
                          : t("priceUnavailable")}
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
