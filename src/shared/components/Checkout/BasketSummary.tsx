"use client";
import { useUnit } from "effector-react";
import { Box, Typography } from "@mui/material";
import { $basket } from "../../../entities/basket/model/store";

export default function BasketSummary({ t }: { t: (key: string) => string }) {
  const basket = useUnit($basket);

  if (!basket.items.length) return null;

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111", mb: 1 }}>
        {t("orderComposition")}
      </Typography>
      {basket.items.map((item) => (
        <Box
          key={item.productId}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            py: 0.75,
            borderBottom: "1px solid #edf2f7",
            "&:last-child": { borderBottom: "none" },
          }}
        >
          {item.image && (
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                objectFit: "cover",
                bgcolor: "#e2e8f0",
              }}
            />
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#888" }}>
              {item.quantity} шт. × {item.price.toLocaleString()} сум
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#2563EB", whiteSpace: "nowrap" }}>
            {(item.price * item.quantity).toLocaleString()} сум
          </Typography>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5, mt: 0.5, borderTop: "1px solid #e2e8f0" }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{t("total")}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#2563EB" }}>{basket.totalPrice.toLocaleString()} сум</Typography>
      </Box>
    </Box>
  );
}
