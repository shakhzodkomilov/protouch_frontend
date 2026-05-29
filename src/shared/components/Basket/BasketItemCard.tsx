"use client";

import { Box, Typography, IconButton, Paper } from "@mui/material";
import Image from "next/image";
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

export default function BasketItemCard({ item, quantityLabel, inStockLabel, onQuantityChange }: BasketItemCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid #E5EAF2",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            width: 180,
            height: 140,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image src={item.image} alt={item.title} fill style={{ objectFit: "contain" }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                bgcolor: "#D6F2DB",
                color: "#3BB351",
                fontSize: "12px",
                px: 1,
                borderRadius: "4px",
                display: "inline-block",
                mb: 1,
              }}
            >
              {inStockLabel}
            </Typography>
            <Box>
              <IconButton size="small">
                <BalanceIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: "right", minWidth: "120px", color: "#000" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#000" }}>
                {new Intl.NumberFormat("ru-RU").format(item.price)}{" "}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                сум
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1, color: "#000" }}>
            {quantityLabel}
          </Typography>
          <Box sx={{ display: "inline-flex", alignItems: "center", borderRadius: "8px", p: "4px" }}>
            <IconButton
              size="small"
              sx={{ bgcolor: "#F4F4F4", borderRadius: "8px" }}
              onClick={() => onQuantityChange(item.productId, -1)}
            >
              <RemoveIcon fontSize="small" sx={{ color: "#000" }} />
            </IconButton>
            <Typography sx={{ mx: 2, fontWeight: 600, color: "#000" }}>
              {item.quantity}
            </Typography>
            <IconButton
              size="small"
              sx={{ bgcolor: "#F4F4F4", borderRadius: "8px" }}
              onClick={() => onQuantityChange(item.productId, 1)}
            >
              <AddIcon fontSize="small" sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
