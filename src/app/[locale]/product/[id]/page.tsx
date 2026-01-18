"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useUnit } from "effector-react";
import {
  Box,
  Typography,
  Button,
  Container,
  Skeleton,
  Divider,
  Breadcrumbs,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import {
  $loadingProductDetail,
  $productDetail,
  loadProductDetail,
} from "../../../../entities/product/model";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import DoneIcon from "@mui/icons-material/Done";
import Accessories from "../../../../shared/components/Accessories/Accessories";
import { $basket, addToBasket } from "../../../../entities/basket/model/store";
import {
  $favorites,
  loadFavorites,
  toggleFavorite,
} from "../../../../entities/favourite/model/store";

export default function ProductDetailPage() {
  type ProductImage = {
    id: string | number;
    url: string;
  };

  const { id, locale } = useParams();
  const pathname = usePathname();
  const product = useUnit($productDetail);
  const loading = useUnit($loadingProductDetail);
  const loadProductDetailEv = useUnit(loadProductDetail);

  // State management
  const [openToast, setOpenToast] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Global state
  const basket = useUnit($basket);
  const basketItems = basket?.items || [];
  const favorites = useUnit($favorites);
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);

  // ✅ Normalize IDs and Images
  const productId = useMemo(
    () => (product?.id ? Number(product.id) : null),
    [product],
  );
  const images: ProductImage[] = useMemo(
    () => product?.images ?? [],
    [product],
  );

  const inBasket = useMemo(() => {
    if (!productId) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return basketItems.some((item: any) => item.productId === productId);
  }, [productId, basketItems]);

  const isFavorite = useMemo(() => {
    if (!productId) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return favorites.some((item: any) => item.productId === productId);
  }, [productId, favorites]);

  const onFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    handleToggleFavorite({
      id: Date.now(),
      productId: Number(product.id),
      title: product.title || "Product",
      image: images[0]?.url || "/placeholder.jpg",
      price: product.price,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any); // Model bilan ziddiyatni oldini olish uchun

    setFavoriteToast(true);
  };

  const onBasketClick = () => {
    if (!product) return;

    if (product.is_in_stock) {
      handleAddToBasket({
        id: Number(product.id),
        productId: Number(product.id),
        title: product.title || "Product",
        price: product.price,
        image: images[0]?.url || "/placeholder.jpg",
        quantity: 1,
        isInStock: product.is_in_stock,
      });
      setOpenToast(true);
    } else {
      window.location.href = `tel:+998000000000`;
    }
  };

  useEffect(() => {
    if (id && locale) {
      loadProductDetailEv({ product_id: id as string, lang: locale as string });
      loadFavoritesEv();
    }
  }, [id, locale, loadProductDetailEv, loadFavoritesEv]);

  if (loading || !product) {
    return (
      <Container sx={{ mt: 8 }}>
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 3 }} />
      </Container>
    );
  }

  const getBreadcrumbs = () => {
    const localePath = pathname.split("/")[1];
    const basePath = `/${localePath}`;
    return [
      { label: "Главная", href: `${basePath}` },
      { label: "Хиты продаж", href: `${basePath}/catalog/sales-hits` },
      { label: product.title, href: pathname },
    ];
  };

  return (
    <Box sx={{ width: "100%", height: "auto", bgcolor: "#FAFAFA" }}>
      <Container maxWidth={false} sx={{ py: 4, maxWidth: "1800px" }}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextOutlinedIcon fontSize="small" />}
          >
            {getBreadcrumbs().map((crumb, index) =>
              index === getBreadcrumbs().length - 1 ? (
                <Typography
                  key={crumb.label}
                  sx={{ fontWeight: 500, color: "#000", fontSize: 16 }}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={crumb.label}
                  href={crumb.href}
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    label={crumb.label}
                    clickable
                    sx={{ fontSize: 16, bgcolor: "transparent" }}
                  />
                </Link>
              ),
            )}
          </Breadcrumbs>
        </Box>

        <Box sx={{ bgcolor: "#fff", py: 4, px: 6, borderRadius: 3 }}>
          <Typography
            sx={{ fontSize: 28, fontWeight: 600, mb: 4, color: "#000" }}
          >
            {product.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 6,
              justifyContent: "space-between",
              flexWrap: { xs: "wrap", lg: "nowrap" },
            }}
          >
            {/* LEFT GALLERY */}
            <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 600 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {images.map((img, i) => (
                  <Box
                    key={img.id || i}
                    onClick={() => setActiveImage(i)}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 2,
                      cursor: "pointer",
                      p: 1,
                      border:
                        i === activeImage
                          ? "2px solid #249FFC"
                          : "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt="thumb"
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  height: 420,
                  position: "relative",
                  borderRadius: 3,
                  border: "1px solid #eee",
                }}
              >
                {/* ✅ FIXED: image o'rniga images[0].url ishlatildi */}
                <Image
                  src={
                    images[activeImage]?.url ||
                    images[0]?.url ||
                    "/placeholder.jpg"
                  }
                  fill
                  style={{ objectFit: "contain" }}
                  alt={product.title}
                />
              </Box>
            </Box>

            {/* MIDDLE DESCRIPTION */}
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                Описание
              </Typography>
              <Typography sx={{ color: "#555", fontSize: 14, lineHeight: 1.8 }}>
                {product.short_description}
              </Typography>
              <Button
                endIcon={<NavigateNextOutlinedIcon />}
                sx={{ mt: 3, color: "#000", textTransform: "none" }}
              >
                Подробнее
              </Button>
            </Box>

            {/* RIGHT BUY CARD */}
            <Box
              sx={{
                flex: 1,
                bgcolor: "#FAFAFA",
                p: 3,
                borderRadius: 3,
                maxWidth: 380,
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  color: product.is_in_stock ? "#3BB351" : "#FF5F5F",
                  fontWeight: 600,
                }}
              >
                {product.is_in_stock ? "• В наличии" : "• Нет в наличии"}
              </Typography>
              <Typography sx={{ fontSize: 32, fontWeight: 700, mb: 2 }}>
                {new Intl.NumberFormat("ru-RU").format(product.price)} сум
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <Button variant="outlined" fullWidth sx={actionBtnStyle}>
                  <Image src="/scale.svg" width={24} height={24} alt="scale" />{" "}
                  Сравнить
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={actionBtnStyle}
                  onClick={onFavoriteClick}
                >
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: "#FF5F5F" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ color: "#FF5F5F" }} />
                  )}
                  {isFavorite ? "В избранном" : "Избранное"}
                </Button>
              </Box>

              <Button
                fullWidth
                onClick={onBasketClick}
                sx={{
                  bgcolor: inBasket ? "#3BB351" : "#249FFC",
                  color: "#fff",
                  py: 1.5,
                  borderRadius: 3,
                  mb: 2,
                  textTransform: "none",
                  gap: 1,
                  "&:hover": { bgcolor: inBasket ? "#2e8b40" : "#1E8BD8" },
                }}
              >
                {inBasket ? (
                  <DoneIcon />
                ) : (
                  <Image
                    src="/basketIcon.svg"
                    width={24}
                    height={24}
                    alt="cart"
                  />
                )}
                {inBasket ? "Добавлено" : "Добавить в корзину"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Accessories />
      </Container>

      {/* TOASTS */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
      >
        <Alert severity="success" variant="filled">
          Товар успешно добавлен в корзину!
        </Alert>
      </Snackbar>
    </Box>
  );
}

const InfoItem = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => (
  <Box
    sx={{
      py: 4,
      display: "flex",
      gap: 2,
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      flex: 1,
    }}
  >
    <Image src={icon} alt={title} width={150} height={40} />
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    <Typography sx={{ color: "#555", fontSize: 14, maxWidth: 300 }}>
      {desc}
    </Typography>
  </Box>
);

const actionBtnStyle = {
  borderRadius: 3,
  bgcolor: "#fff",
  color: "#000",
  display: "flex",
  flexDirection: "column",
  fontSize: 12,
  py: 1,
  border: "1px solid #ddd",
  textTransform: "none",
};
