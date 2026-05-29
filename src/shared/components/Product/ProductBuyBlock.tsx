"use client";

import { Box, Typography, Button, Chip } from "@mui/material";
import Image from "next/image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DoneIcon from "@mui/icons-material/Done";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";

interface ProductBuyBlockProps {
  finalPrice: number;
  currency: string;
  hasDiscount: boolean;
  oldPrice: number | null;
  discountPercentage?: number;
  inStock: boolean;
  inBasket: boolean;
  isFavorite: boolean;
  isDistributor: boolean;
  dealerPriceLabel: string;
  inStockLabel: string;
  notAvailableLabel: string;
  currencyLabel: string;
  addToCartLabel: string;
  addedLabel: string;
  buyAsLegalLabel: string;
  deliveryTitle: string;
  deliveryDesc: string;
  pickupTitle: string;
  pickupAddress: string;
  questionsTitle: string;
  onBasketClick: () => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
  onCheckoutClick: () => void;
}

const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price);

export default function ProductBuyBlock({
  finalPrice,
  currency,
  hasDiscount,
  oldPrice,
  discountPercentage,
  inStock,
  inBasket,
  isFavorite,
  isDistributor,
  dealerPriceLabel,
  inStockLabel,
  notAvailableLabel,
  currencyLabel,
  addToCartLabel,
  addedLabel,
  buyAsLegalLabel,
  deliveryTitle,
  deliveryDesc,
  pickupTitle,
  pickupAddress,
  questionsTitle,
  onBasketClick,
  onFavoriteClick,
  onCheckoutClick,
}: ProductBuyBlockProps) {
  return (
    <>
      {/* Desktop Buy Card */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: "#FAFAFA",
          p: 2,
          borderRadius: 3,
          maxWidth: 380,
          width: "100%",
        }}
      >
        <Chip
          label={inStock ? inStockLabel : notAvailableLabel}
          sx={{
            mb: 2,
            bgcolor: inStock ? "#e8f8ed" : "#fff0f0",
            color: inStock ? "#3BB351" : "#FF5F5F",
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        {isDistributor && (
          <Chip
            label={dealerPriceLabel}
            sx={{
              mb: 1,
              bgcolor: "#FFF3E0",
              color: "#E65100",
              fontWeight: 600,
              borderRadius: 2,
            }}
          />
        )}
        <Typography sx={{ fontSize: 12, color: "#7a7a7a", mb: 0.5 }}>
          {isDistributor ? dealerPriceLabel : "Финальная цена"}
        </Typography>
        <Typography sx={{ fontSize: 32, fontWeight: 700, mb: 2, color: "#000" }}>
          {formatPrice(finalPrice)} {currency || currencyLabel}
        </Typography>
        {hasDiscount && (
          <Typography sx={{ fontSize: 13, color: "#7a7a7a", mb: 2 }}>
            {!oldPrice && discountPercentage ? (
              <Box component="span" sx={{ ml: 1, color: "#249FFC" }}>
                -{discountPercentage}%
              </Box>
            ) : null}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            fullWidth
            onClick={onBasketClick}
            sx={{
              bgcolor: inBasket ? "#3BB351" : "#249FFC",
              color: "#fff",
              py: 1.5,
              borderRadius: 3,
              fontSize: 15,
              display: "flex",
              textTransform: "none",
              "&:hover": { bgcolor: inBasket ? "#2e8b40" : "#1E8BD8" },
            }}
          >
            {inBasket ? <DoneIcon /> : <span />}
            {inBasket ? addedLabel : addToCartLabel}
            <Image src="/shopping-cart.svg" width={22} height={22} alt="cart" />
          </Button>
          <Button
            variant="outlined"
            onClick={onFavoriteClick}
            sx={{
              minWidth: 52,
              borderRadius: 3,
              borderColor: "#ddd",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#fff", borderColor: "#ccc" },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#FF5F5F" }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ color: "#249FFC" }} />
            )}
          </Button>
        </Box>
        <Button
          fullWidth
          onClick={onCheckoutClick}
          sx={{
            bgcolor: "#25C261",
            color: "#fff",
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            mb: 2,
            "&:hover": { bgcolor: "#1FA754" },
          }}
        >
          <DescriptionOutlinedIcon sx={{ mr: 1 }} />
          {buyAsLegalLabel}
        </Button>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#f4f4f4",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            mt: 4,
            p: 3,
            gap: 3,
            color: "#000",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Image src="/Delivery.svg" alt="delivery" width={28} height={28} />
              <Typography fontWeight={700} fontSize={15}>
                {deliveryTitle}
              </Typography>
            </Box>
            <Typography fontSize={13} color="#555" sx={{ lineHeight: 1.6 }}>
              {deliveryDesc}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Image src="/Pickup.svg" alt="pickup" width={28} height={28} />
              <Typography fontWeight={700} fontSize={15}>
                {pickupTitle}
              </Typography>
            </Box>
            <Typography fontSize={13} color="#555" sx={{ lineHeight: 1.6 }}>
              {pickupAddress}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              component="a"
              href="https://t.me/ProtouchMarket"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<TelegramIcon />}
              sx={{
                bgcolor: "#249FFC",
                borderRadius: 4,
                px: 3,
                color: "#fff",
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: "#1E8BD8" },
              }}
            >
              Telegram
            </Button>
            <Typography fontSize={14} color="#000">
              {questionsTitle}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Mobile Price + Actions */}
      <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.5 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 3,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 11, color: "#7a7a7a" }}>
              {isDistributor ? dealerPriceLabel : "Финальная цена"}
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#000" }}>
              {formatPrice(finalPrice)} {currency || currencyLabel}
            </Typography>
            {hasDiscount && (
              <Typography sx={{ fontSize: 12, color: "#7a7a7a" }}>
                <Box component="span" sx={{ textDecoration: "line-through" }}>
                  {formatPrice(Number(oldPrice ?? 0))}
                </Box>
                {!oldPrice && discountPercentage ? (
                  <Box component="span" sx={{ ml: 0.5, color: "#249FFC" }}>
                    -{discountPercentage}%
                  </Box>
                ) : null}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: "#249FFC" }} />
              <Typography sx={{ fontSize: 12, color: "#249FFC", fontWeight: 500 }}>{deliveryTitle}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StoreOutlinedIcon sx={{ fontSize: 18, color: "#249FFC" }} />
              <Typography sx={{ fontSize: 12, color: "#249FFC", fontWeight: 500 }}>{pickupTitle}</Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              component="a"
              href="https://t.me/ProtouchMarket"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<TelegramIcon />}
              sx={{ borderRadius: 3, textTransform: "none", fontSize: 12, borderColor: "#249FFC", color: "#249FFC" }}
            >
              Telegram
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            fullWidth
            onClick={onBasketClick}
            sx={{
              bgcolor: inBasket ? "#3BB351" : "#249FFC",
              color: "#fff",
              py: 1.5,
              borderRadius: 3,
              fontSize: 15,
              display: "flex",
              gap: 1,
              textTransform: "none",
              "&:hover": { bgcolor: inBasket ? "#2e8b40" : "#1E8BD8" },
            }}
          >
            {inBasket ? <DoneIcon /> : <Image src="/basketIcon.svg" width={22} height={22} alt="cart" />}
            {inBasket ? addedLabel : addToCartLabel}
          </Button>
          <Button
            variant="outlined"
            onClick={onFavoriteClick}
            sx={{
              minWidth: 52,
              borderRadius: 3,
              borderColor: "#ddd",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#fff", borderColor: "#ccc" },
            }}
          >
            {isFavorite ? <FavoriteIcon sx={{ color: "#FF5F5F" }} /> : <FavoriteBorderOutlinedIcon sx={{ color: "#249FFC" }} />}
          </Button>
        </Box>
        <Button
          fullWidth
          onClick={onCheckoutClick}
          sx={{
            bgcolor: "#25C261",
            color: "#fff",
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: 15,
            "&:hover": { bgcolor: "#1FA754" },
          }}
        >
          <DescriptionOutlinedIcon sx={{ mr: 1 }} />
          {buyAsLegalLabel}
        </Button>
      </Box>
    </>
  );
}
