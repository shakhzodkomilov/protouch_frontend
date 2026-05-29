"use client";

import { Box, Typography, Paper, Divider, Button, CircularProgress } from "@mui/material";
import Image from "next/image";

interface OrderSummaryProps {
  totalCount: number;
  totalPrice: number;
  submitting: boolean;
  deliveryLabel: string;
  pickupLabel: string;
  regionalDeliveryLabel: string;
  totalLabel: string;
  itemsLabel: string;
  currencyLabel: string;
  checkoutLabel: string;
  onCheckout: () => void;
}

export default function OrderSummary({
  totalCount,
  totalPrice,
  submitting,
  deliveryLabel,
  pickupLabel,
  regionalDeliveryLabel,
  totalLabel,
  itemsLabel,
  currencyLabel,
  checkoutLabel,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid #E5EAF2", borderRadius: "12px" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#000" }}>
        {totalLabel}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <Box sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: "8px", display: "flex", alignItems: "center", gap: 1.5 }}>
          <Image src={"/Delivery.svg"} width={24} height={24} alt="Delivery" />
          <Typography sx={{ fontSize: "13px", color: "#444" }}>{deliveryLabel}</Typography>
        </Box>
        <Box sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: "8px", display: "flex", alignItems: "center", gap: 1.5 }}>
          <Image src={"/Pickup.svg"} width={24} height={24} alt="Pickup" />
          <Typography sx={{ fontSize: "13px", color: "#444" }}>{pickupLabel}</Typography>
        </Box>
        <Box sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: "8px", display: "flex", alignItems: "center", gap: 1.5 }}>
          <Image src={"/Delivery.svg"} width={24} height={24} alt="Regional Delivery" />
          <Typography sx={{ fontSize: "13px", color: "#444" }}>{regionalDeliveryLabel}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, color: "#000" }}>
        <Box>
          <Typography sx={{ color: "#999", fontSize: "14px" }}>{totalLabel}</Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {totalCount} {itemsLabel}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {totalPrice.toLocaleString("ru-RU")} {currencyLabel}
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={onCheckout}
        sx={{
          py: 1.5,
          borderRadius: "10px",
          bgcolor: "#249FFC",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          "&:hover": { bgcolor: "#1a8ae5" },
        }}
      >
        {submitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : checkoutLabel}
      </Button>
    </Paper>
  );
}
