"use client";

import { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { BasketItem } from "../../../entities/basket/model/types";

interface BasketItemCardProps {
  item: BasketItem;
  quantityLabel: string;
  inStockLabel: string;
  onQuantityChange: (productId: number, delta: number) => void;
}

const formatPrice = (price: number) => {
  if (!Number.isFinite(price) || price < 0) return null;
  return new Intl.NumberFormat("ru-RU").format(price);
};

export default function BasketItemCard({ item, quantityLabel, inStockLabel, onQuantityChange }: BasketItemCardProps) {
  const priceFormatted = formatPrice(item.price);
  const currency = item.currency || "UZS";
  const [imgError, setImgError] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: "1px solid #E5EAF2",
        borderRadius: "16px",
        position: "relative",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: 180 },
            height: { xs: 200, sm: 140 },
            position: "relative",
            flexShrink: 0,
            bgcolor: "#f9f9f9",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imgError ? (
            <Typography sx={{ color: "#999", fontSize: 13, textAlign: "center" }}>
              Rasm yo'q
            </Typography>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.title || "Product"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              onError={() => setImgError(true)}
            />
          )}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Top row: title + actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#000",
                  lineHeight: 1.4,
                  mb: 1,
                }}
              >
                {item.title || "Mahsulot"}
              </Typography>
              <Typography
                sx={{
                  bgcolor: item.isInStock ? "#e8f8ed" : "#fff0f0",
                  color: item.isInStock ? "#3BB351" : "#FF5F5F",
                  fontSize: "12px",
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "6px",
                  display: "inline-block",
                  fontWeight: 600,
                }}
              >
                {inStockLabel}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton size="small" sx={{ color: "#8A8A8A" }}>
                <BalanceIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#8A8A8A" }}>
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Middle: price */}
          <Box sx={{ mt: 2 }}>
            {priceFormatted ? (
              <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#000" }}>
                {priceFormatted} {currency}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#999" }}>
                Narx mavjud emas
              </Typography>
            )}
          </Box>

          {/* Bottom: quantity controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#555" }}>
              {quantityLabel}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                bgcolor: "#F4F4F4",
                p: "4px",
              }}
            >
              <IconButton
                size="small"
                sx={{ borderRadius: "8px", bgcolor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                onClick={() => onQuantityChange(item.productId, -1)}
              >
                <RemoveIcon fontSize="small" sx={{ color: "#000" }} />
              </IconButton>
              <Typography sx={{ mx: 2, fontWeight: 700, color: "#000", minWidth: 24, textAlign: "center" }}>
                {item.quantity}
              </Typography>
              <IconButton
                size="small"
                sx={{ borderRadius: "8px", bgcolor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                onClick={() => onQuantityChange(item.productId, 1)}
              >
                <AddIcon fontSize="small" sx={{ color: "#000" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
