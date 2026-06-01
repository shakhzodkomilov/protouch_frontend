"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUnit } from "effector-react";
import {
  Box,
  Typography,
  Button,
  Container,
  Skeleton,
  Breadcrumbs,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Accessories from "../../../../shared/components/Accessories/Accessories";
import ProductGallery from "../../../../shared/components/Product/ProductGallery";
import ProductBuyBlock from "../../../../shared/components/Product/ProductBuyBlock";
import SpecRow from "../../../../shared/components/Product/SpecRow";
import {
  $loadingProductDetail,
  $productDetail,
  loadProductDetail,
} from "../../../../entities/product/model";
import { $basket, addToBasket } from "../../../../entities/basket/model/store";
import {
  $favorites,
  loadFavorites,
  toggleFavorite,
} from "../../../../entities/favourite/model/store";
import { $isDistributor } from "../../../../entities/form/model";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProductDetailPage() {
  type ProductImage = {
    id: string;
    url: string;
  };

  const { id, locale } = useParams();
  const t = useTranslations("ObjectDetail");

  const product = useUnit($productDetail);
  const loading = useUnit($loadingProductDetail);
  const loadProductDetailEv = useUnit(loadProductDetail);
  console.log(
    "ProductDetailPage rendered with product:",
    product,
    "and loading:",
    loading,
  );
  const [openToast, setOpenToast] = useState(false);
  const [favoriteToast, setFavoriteToast] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const { items: basketItems } = useUnit($basket);
  const favorites = useUnit($favorites);
  const isDistributor = useUnit($isDistributor);
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);
  const loadFavoritesEv = useUnit(loadFavorites);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isProductInStock = (p: any) => {
    if (!p) return false;
    if (typeof p.is_in_stock === "boolean") return p.is_in_stock;
    const status = String(p.inventoryStatus ?? p.availability ?? "");
    if (status === "IN_STOCK") return true;
    if (status === "OUT_OF_STOCK") return false;
    if (typeof p.quantityInStock === "number") return p.quantityInStock > 0;
    return Boolean(p.underOrder);
  };

  const productId = useMemo(() => {
    return product?.id ? Number(product.id) : null;
  }, [product]);

  const inBasket = useMemo(() => {
    if (!productId) return false;
    return basketItems.some((item) => item.productId === productId);
  }, [productId, basketItems]);

  const isFavorite = useMemo(() => {
    if (!productId) return false;
    return favorites.some((item) => item.productId === productId);
  }, [productId, favorites]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFavoriteClick = (e: React.MouseEvent, productData: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleFavorite({
      id: Date.now(),
      productId: Number(productData.id),
      title: productData.title || t("fallback.product"),
      image: productData.image || productData.images?.[0]?.url,
      price: productData.price,
    });
    setFavoriteToast(true);
  };

  const safePrice = (p: unknown) => {
    const n = Number(p);
    return Number.isFinite(n) ? n : 0;
  };

  const onBasketClick = () => {
    if (!product) return;
    handleAddToBasket({
      id: Number(product.id),
      productId: Number(product.id),
      title: product.name || product.title || t("fallback.product"),
      price: safePrice(product.displayPrice ?? product.price ?? 0),
      image:
        product.images?.[0]?.url ??
        product.media?.[0]?.url ??
        product.image ??
        "/placeholder.jpg",
      quantity: 1,
      isInStock: isProductInStock(product),
      currency: product.currency || "UZS",
    });
    setOpenToast(true);
  };

  const onCheckoutClick = () => {
    if (!product) return;
    handleAddToBasket({
      id: Number(product.id),
      productId: Number(product.id),
      title: product.name || product.title || t("fallback.product"),
      price: safePrice(product.displayPrice ?? product.price ?? 0),
      image:
        product.images?.[0]?.url ??
        product.media?.[0]?.url ??
        product.image ??
        "/placeholder.jpg",
      quantity: 1,
      isInStock: isProductInStock(product),
      currency: product.currency || "UZS",
    });
    router.push(`/${locale}/checkout/`);
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

  const imagesFromApi: ProductImage[] = (product.images?.map((img) => ({
    id: String(img.id),
    url: img.url,
  })) ??
    product.media?.map((m) => ({ id: String(m.id), url: m.url })) ??
    []) as ProductImage[];
  const images: ProductImage[] = imagesFromApi.length
    ? imagesFromApi
    : [{ id: "0", url: "/placeholder.jpg" }];
  const title =
    product.name || product.title || product.shortText || t("fallback.product");
  const finalPrice = (() => {
    if (isDistributor && product.dealerPrice != null) {
      return Number(product.dealerPrice);
    }
    if (isDistributor && product.partnerPrice != null) {
      return Number(product.partnerPrice);
    }
    return Number(product.displayPrice ?? product.price ?? 0);
  })();
  const oldPrice = product.oldPrice ?? null;
  const hasDiscount =
    oldPrice != null ||
    (typeof product.salePrice === "number" &&
      product.salePrice !== null &&
      Number(product.salePrice) < Number(product.price));

  // Use features array for characteristics (with fallback to characteristics/details)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const characteristics = (product.characteristics?.map((f: any) => ({
    id: String(f.id),
    key: f.key,
    value: f.value,
  })) ??
    product.characteristics?.map((c) => ({
      id: String(c.id),
      key: c.key,
      value: c.value,
    })) ??
    product.details?.map((d, idx) => ({
      id: String(idx),
      key: d.key,
      value: d.value,
    })) ??
    []) as Array<{ id: string; key: string; value: string }>;

  return (
    <Box sx={{ width: "100%", bgcolor: "#FAFAFA" }}>
      <Container
        maxWidth={false}
        sx={{ py: { xs: 2, md: 4 }, maxWidth: "1800px" }}
      >
        {/* Breadcrumbs — desktop only */}
        <Box sx={{ mb: 3, display: { xs: "none", md: "block" } }}>
          <Breadcrumbs
            separator={<NavigateNextOutlinedIcon fontSize="small" />}
          >
            <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
              <Chip
                label={t("breadcrumbs.home")}
                clickable
                sx={{ bgcolor: "transparent", color: "#000" }}
              />
            </Link>
            <Typography
              sx={{ color: "#000", fontWeight: 500, textAlign: "center" }}
            >
              {title}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* ─── DESKTOP LAYOUT ─────────────────────────────────────────── */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            bgcolor: "#fff",
            py: 4,
            px: 6,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 6,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Gallery */}
            <ProductGallery
              images={images}
              activeImage={activeImage}
              title={title}
              onImageSelect={setActiveImage}
            />

            {/* Features + Description */}
            <Box sx={{ flex: 1, maxWidth: 520 }}>
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 600,
                  mb: 4,
                  color: "#000",
                }}
              >
                {title}
              </Typography>
              {characteristics.length > 0 && (
                <>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 700, mb: 2, color: "#000" }}
                  >
                    {t("characteristics") ?? "Характеристики"}:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {characteristics.map((f) => (
                      <SpecRow key={f.id} label={f.key} value={f.value} />
                    ))}
                  </Box>
                  <Box sx={{ height: 18 }} />
                </>
              )}
              <Typography
                sx={{ fontSize: 18, fontWeight: 600, mb: 2, color: "#000" }}
              >
                {t("description")}
              </Typography>
              <Typography
                sx={{
                  color: "#555",
                  fontSize: 14,
                  lineHeight: 1.8,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: isExpanded ? "unset" : 5,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {product.shortText}
              </Typography>
              {product.shortText && product.shortText.length > 150 && (
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  endIcon={
                    isExpanded ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  sx={{
                    mt: 1,
                    color: "#249FFC",
                    fontWeight: 600,
                    textTransform: "none",
                    p: 0,
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {isExpanded ? t("collapse") : t("readMore")}
                </Button>
              )}
            </Box>

            {/* Buy Card */}
            <ProductBuyBlock
              finalPrice={finalPrice}
              currency={product.currency}
              hasDiscount={hasDiscount}
              oldPrice={oldPrice}
              discountPercentage={product.discountPercentage}
              inStock={isProductInStock(product)}
              inBasket={inBasket}
              isFavorite={isFavorite}
              isDistributor={isDistributor}
              dealerPriceLabel={t("dealerPrice") ?? "Дилерская цена"}
              inStockLabel={t("inStock")}
              notAvailableLabel={t("notAvailable")}
              currencyLabel={t("currency")}
              addToCartLabel={t("actions.addToCart")}
              addedLabel={t("actions.added")}
              buyAsLegalLabel={t("actions.buyAsLegal")}
              deliveryTitle={t("pickup.delivery.title")}
              deliveryDesc={t("pickup.delivery.description")}
              pickupTitle={t("pickup.pickup.title")}
              pickupAddress={t("pickup.pickup.address")}
              questionsTitle={t("pickup.questions.title")}
              onBasketClick={onBasketClick}
              onFavoriteClick={(e) => onFavoriteClick(e, product)}
              onCheckoutClick={onCheckoutClick}
            />
          </Box>

          {/* Info blocks — desktop */}
        </Box>

        {/* About product — desktop */}
        <Box
          sx={{
            mt: { xs: 2, md: 4 },
            bgcolor: "#fff",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            sx={{ fontSize: 18, fontWeight: 700, color: "#000", mb: 1 }}
          >
            {"О товаре"}
          </Typography>
          <Typography sx={{ color: "#555", fontSize: 14, lineHeight: 1.9 }}>
            {product.description || product.shortText || ""}
          </Typography>
        </Box>

        {/* ─── MOBILE LAYOUT ──────────────────────────────────────────── */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {/* Product title */}
          <Typography
            sx={{ fontSize: 18, fontWeight: 700, color: "#000", mb: 2, px: 1 }}
          >
            {title}
          </Typography>

          {/* Product gallery */}
          <ProductGallery
            images={images}
            activeImage={activeImage}
            title={title}
            onImageSelect={setActiveImage}
          />

          {/* Description */}
          <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: 2, mb: 2 }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: 700, mb: 1.5, color: "#000" }}
            >
              {t("description")}
            </Typography>
            <Typography
              sx={{
                color: "#555",
                fontSize: 13,
                lineHeight: 1.75,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isExpanded ? "unset" : 6,
                overflow: "hidden",
              }}
            >
              {product.shortText}
            </Typography>
            {product.shortText && product.shortText.length > 200 && (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                endIcon={
                  isExpanded ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
                sx={{
                  mt: 1,
                  color: "#249FFC",
                  fontWeight: 600,
                  textTransform: "none",
                  p: 0,
                  fontSize: 13,
                }}
              >
                {isExpanded ? t("collapse") : t("readMore")}
              </Button>
            )}
          </Box>

          {/* Features / Characteristics */}
          {characteristics.length > 0 && (
            <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: 2, mb: 2 }}>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, mb: 1.5, color: "#000" }}
              >
                {t("characteristics") ?? "Характеристики"}:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {characteristics.map((f) => (
                  <SpecRow key={f.id} label={f.key} value={f.value} />
                ))}
              </Box>
            </Box>
          )}

          {/* Buy block */}
          <ProductBuyBlock
            finalPrice={finalPrice}
            currency={product.currency}
            hasDiscount={hasDiscount}
            oldPrice={oldPrice}
            discountPercentage={product.discountPercentage}
            inStock={isProductInStock(product)}
            inBasket={inBasket}
            isFavorite={isFavorite}
            isDistributor={isDistributor}
            dealerPriceLabel={t("dealerPrice") ?? "Дилерская цена"}
            inStockLabel={t("inStock")}
            notAvailableLabel={t("notAvailable")}
            currencyLabel={t("currency")}
            addToCartLabel={t("actions.addToCart")}
            addedLabel={t("actions.added")}
            buyAsLegalLabel={t("actions.buyAsLegal")}
            deliveryTitle={t("pickup.delivery.title")}
            deliveryDesc={t("pickup.delivery.description")}
            pickupTitle={t("pickup.pickup.title")}
            pickupAddress={t("pickup.pickup.address")}
            questionsTitle={t("pickup.questions.title")}
            onBasketClick={onBasketClick}
            onFavoriteClick={(e) => onFavoriteClick(e, product)}
            onCheckoutClick={onCheckoutClick}
          />

          <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: 2 }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#000", mb: 1 }}
            >
              {"О товаре"}
            </Typography>
            <Typography sx={{ color: "#555", fontSize: 14, lineHeight: 1.8 }}>
              {product.description || product.shortText || ""}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 2, md: 4 } }}>
          <Accessories />
        </Box>
      </Container>

      {/* TOASTS */}
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
          {t("toasts.addedToCart")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={favoriteToast}
        autoHideDuration={2000}
        onClose={() => setFavoriteToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={isFavorite ? "info" : "success"}
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {isFavorite
            ? t("toasts.addedToFavorites")
            : t("toasts.removedFromFavorites")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
