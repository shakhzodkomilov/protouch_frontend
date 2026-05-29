"use client";

import { Box, Typography, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Product } from "../../entities/product/model/types";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useUnit } from "effector-react";
import { $basket, addToBasket } from "../../entities/basket/model/store";
import {
  $favorites,
  toggleFavorite,
} from "../../entities/favourite/model/store";
import { $isDistributor } from "../../entities/form/model";

interface ProductCardProps {
  product: Product;
  onAddedToBasket?: () => void;
  onToggledFavorite?: (added: boolean) => void;
}

const isProductInStock = (product: Product) => {
  if (typeof product.is_in_stock === "boolean") return product.is_in_stock;
  const status = String(product.inventoryStatus ?? product.availability ?? "");
  if (status === "IN_STOCK") return true;
  if (status === "OUT_OF_STOCK") return false;
  if (typeof product.quantityInStock === "number")
    return product.quantityInStock > 0;
  return Boolean(product.underOrder);
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddedToBasket,
  onToggledFavorite,
}) => {
  const { locale } = useParams();
  const [active, setActive] = useState(0);
  // console.log("Rendering ProductCard for product:", product);
  const images = useMemo(() => {
    const media =
      product.media
        ?.slice()
        .sort(
          (a, b) =>
            (a.position ?? Number.MAX_SAFE_INTEGER) -
            (b.position ?? Number.MAX_SAFE_INTEGER),
        )
        .map((m) => m.url) ?? [];
    const uniq = Array.from(new Set(media));
    if (uniq.length) return uniq;
    if (product.image) return [product.image];
    return ["/placeholder.png"];
  }, [product.media, product.image]);

  const title = product.name || product.title || product.shortText || "";
  const isInStock = isProductInStock(product);

  const isDistributor = useUnit($isDistributor);

  const displayPrice = (() => {
    if (isDistributor && product.dealerPrice != null) {
      return product.dealerPrice;
    }
    if (isDistributor && product.partnerPrice != null) {
      return product.partnerPrice;
    }
    return product.displayPrice ?? product.price ?? 0;
  })();
  const oldPrice = product.oldPrice ?? null;

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(
    Number(displayPrice),
  );
  const formattedOldPrice = oldPrice
    ? new Intl.NumberFormat("ru-RU").format(Number(oldPrice))
    : null;
  const currency = product.currency || "UZS";

  const characteristics = (product.characteristics ?? []).slice(0, 4);
  const features = (product.features ?? []).slice(0, 4);
  const onPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive((v) => (v - 1 + images.length) % images.length);
  };

  const onNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive((v) => (v + 1) % images.length);
  };

  const onDot = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(index);
  };

  const { items: basketItems } = useUnit($basket);
  const favorites = useUnit($favorites);
  const handleAddToBasket = useUnit(addToBasket);
  const handleToggleFavorite = useUnit(toggleFavorite);

  const productId = Number(product.id);
  const inBasket = basketItems.some((i) => i.productId === productId);
  const isFavorite = favorites.some((i) => Number(i.productId) === productId);

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          width: 340,
          height: 540,
          borderRadius: 3,
          p: 2,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          color: "#000",
          bgcolor: "#fff",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": { transform: "translateY(-5px)" },
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", width: "100%", height: 210, mt: 1 }}>
          <Image
            src={images[active] || "/placeholder.png"}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                onClick={onPrev}
                aria-label="prev"
                size="small"
                sx={{
                  position: "absolute",
                  left: -10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "#fff",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(36,159,252,0.35)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <ChevronLeftRoundedIcon sx={{ color: "#249FFC" }} />
              </IconButton>
              <IconButton
                onClick={onNext}
                aria-label="next"
                size="small"
                sx={{
                  position: "absolute",
                  right: -10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "#fff",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(36,159,252,0.35)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <ChevronRightRoundedIcon sx={{ color: "#249FFC" }} />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -12,
                  display: "flex",
                  gap: 0.75,
                  justifyContent: "center",
                }}
              >
                {images.slice(0, 5).map((_, i) => (
                  <Box
                    key={`dot-${i}`}
                    onClick={(e) => onDot(e, i)}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "999px",
                      bgcolor: i === active ? "#249FFC" : "#D9D9D9",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: "#4E4E4E",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mt: 3,
              mb: 1.25,
            }}
          >
            {title}
          </Typography>

          {/* Characteristics */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            {(characteristics.length ? characteristics : features).map((c) => (
              <Box
                key={c.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "baseline",
                  columnGap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "baseline",
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#8A8A8A",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {(() => {
                      const label = ("key" in c ? c.key : c.name) ?? "";
                      return label.trim().endsWith(":") ? label : `${label}:`;
                    })()}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      borderBottom: "1px solid #E6E6E6",
                      transform: "translateY(-2px)",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#4E4E4E",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.value}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 20, mt: 2 }}>
            {formattedPrice} {currency}
          </Typography>
        </Box>
        {/* Button */}
        <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 2 }}>
          <Button
            fullWidth
            sx={{
              bgcolor: "#0C4DFD",
              color: "#fff",
              py: 1.25,
              borderRadius: 2.5,
              fontSize: 14,
              textTransform: "none",
              display: "flex",
              gap: 0.5,
              textAlign: "center",
              alignItems: "center",
              "&:hover": { bgcolor: "#1a8ae5" },
              opacity: !isInStock || inBasket ? 0.85 : 1,
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!Number.isFinite(productId)) return;
              if (!isInStock) return;
              if (inBasket) return;
              handleAddToBasket({
                id: productId,
                productId,
                title: title || "Product",
                price: Number(displayPrice),
                image: images[0] || "/placeholder.png",
                quantity: 1,
                isInStock,
              });
              onAddedToBasket?.();
            }}
          >
            {inBasket ? "Добавлено" : "В корзину"}
            <Image
              src="/shopping-cart.svg"
              alt="basket"
              width={18}
              height={18}
            />
          </Button>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!Number.isFinite(productId)) return;
              const wasFavorite = isFavorite;
              handleToggleFavorite({
                id: Date.now(),
                productId,
                title: title || "Product",
                image: images[0] || "/placeholder.png",
                price: Number(displayPrice),
              });
              onToggledFavorite?.(!wasFavorite);
            }}
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2.5,
              border: "1px solid #D9D9D9",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#FF5F5F" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#249FFC" }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
