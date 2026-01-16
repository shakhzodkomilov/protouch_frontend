"use client";

import { useEffect, useState } from "react";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import DoneIcon from "@mui/icons-material/Done"; // Added
import Accessories from "../../../../shared/components/Accessories/Accessories";
import { $basket, addToBasket } from "../../../../entities/basket/model/store";

export default function ProductDetailPage() {
  type ProductImage = {
    id: string;
    url: string;
  };

  const { items: basketItems } = useUnit($basket);
  const handleAddToBasket = useUnit(addToBasket);
  const { id, locale } = useParams();
  const pathname = usePathname();

  const [activeImage, setActiveImage] = useState(0);
  const [openToast, setOpenToast] = useState(false); // Added for Toast

  const [product, loading, load] = useUnit([
    $productDetail,
    $loadingProductDetail,
    loadProductDetail,
  ]);

  // Check if current product is already in basket
  const inBasket = product
    ? basketItems.some((item) => item.productId === product.id)
    : false;

  useEffect(() => {
    if (id && locale) {
      load({ product_id: id as string, lang: locale as string });
    }
  }, [id, locale, load]);

  const onBasketClick = () => {
    if (!product) return;

    if (product.is_in_stock) {
      handleAddToBasket({
        id: product.id,
        productId: product.id,
        title: product.title || "Product",
        price: product.price,
        image: product.image || product.images?.[0]?.url, // Fallback to gallery
        quantity: 1,
        isInStock: product.is_in_stock,
      });
      setOpenToast(true);
    } else {
      window.location.href = `tel:+998000000000`;
    }
  };

  if (loading || !product) {
    return (
      <Container sx={{ mt: 8 }}>
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 3 }} />
      </Container>
    );
  }

  const images: ProductImage[] = product.images ?? [];

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
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextOutlinedIcon fontSize="small" />}
            aria-label="breadcrumb"
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
                    sx={{
                      fontSize: 16,
                      color: "#000",
                      fontWeight: 500,
                      bgcolor: "transparent",
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  />
                </Link>
              )
            )}
          </Breadcrumbs>
        </Box>

        <Typography
          sx={{ fontSize: 28, fontWeight: 600, mb: 4, color: "#000" }}
        >
          {product.title}
        </Typography>

        <Box
          sx={{
            bgcolor: "#fff",
            py: 4,
            px: 6,
            borderRadius: 3,
            display: "flex",
            gap: 6,
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {/* LEFT GALLERY */}
          <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 600 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {images.map((img: ProductImage, i: number) => (
                <Box
                  key={img.id || i}
                  onClick={() => setActiveImage(i)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    p: 1,
                    border:
                      i === activeImage
                        ? "2px solid #249FFC"
                        : "1px solid #ddd",
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
              <Image
                src={images[activeImage]?.url || ""}
                fill
                style={{ objectFit: "contain" }}
                alt={product.title}
              />
            </Box>
          </Box>

          {/* MIDDLE DESCRIPTION */}
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <Typography
              sx={{ fontSize: 18, fontWeight: 600, mb: 2, color: "#000" }}
            >
              Описание
            </Typography>
            <Typography sx={{ color: "#555", fontSize: 14, lineHeight: 1.8 }}>
              {product.short_description}
            </Typography>
            <Button
              endIcon={<NavigateNextOutlinedIcon />}
              sx={{
                mt: 3,
                color: "#000",
                fontWeight: 600,
                textTransform: "none",
              }}
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
              display: "flex",
              flexDirection: "column",
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

            <Typography
              sx={{ fontSize: 32, fontWeight: 700, mb: 2, color: "#000" }}
            >
              {new Intl.NumberFormat("ru-RU").format(product.price)} сум
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Button variant="outlined" fullWidth sx={actionBtnStyle}>
                <Image src="/scale.svg" width={24} height={24} alt="scale" />{" "}
                Сравнить
              </Button>
              <Button variant="outlined" fullWidth sx={actionBtnStyle}>
                <FavoriteBorderIcon sx={{ color: "#FF5F5F" }} /> Избранное
              </Button>
            </Box>

            {/* DYNAMIC BASKET BUTTON */}
            <Button
              fullWidth
              onClick={onBasketClick}
              sx={{
                bgcolor: inBasket ? "#3BB351" : "#249FFC",
                color: "#fff",
                py: 1.5,
                borderRadius: 3,
                fontSize: 16,
                mb: 2,
                display: "flex",
                gap: 1,
                textTransform: "none",
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

            <Button
              fullWidth
              sx={{
                bgcolor: "#25C261",
                color: "#fff",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": { bgcolor: "#1FA754" },
              }}
            >
              <DescriptionOutlinedIcon sx={{ mr: 1 }} /> Купить как юр. лицо
            </Button>
          </Box>
        </Box>

        {/* Info Blocks */}
        <Box
          sx={{
            width: "100%",
            // px: 6,
            bgcolor: "#f4f4f4",
            borderRadius: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#000",
          }}
        >
          <InfoItem
            icon="/Pickup.svg"
            title="Самовывоз"
            desc="г. Ташкент, Сергелийский р-н., 4-й пр-д. Дарё Буйи"
          />
          <Divider orientation="vertical" flexItem sx={{ my: 4 }} />
          <InfoItem
            icon="/Delivery.svg"
            title="Доставка"
            desc="по г. Ташкент бесплатно в течении 3-х дней"
          />
          <Divider orientation="vertical" flexItem sx={{ my: 4 }} />
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "33%", 
            }}
          >
            <Typography>Появились вопросы о товаре?</Typography>
            <Button
              variant="contained"
              startIcon={<TelegramIcon />}
              sx={{ bgcolor: "#249FFC", color: "#fff", borderRadius: 4, px: 4 }}
            >
              Telegram
            </Button>
          </Box>
        </Box>

        <Accessories />
      </Container>

      {/* TOAST NOTIFICATION */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          Товар успешно добавлен в корзину!
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Sub-components & Styles
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
  alignItems: "center",
  fontSize: 12,
  py: 1,
  border: "1px solid #ddd",
  textTransform: "none",
};
