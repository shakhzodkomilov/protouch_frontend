"use client";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  onBackToShop: () => void;
  t: (key: string) => string;
}

export default function SuccessScreen({ onBackToShop, t }: Props) {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Box sx={{ width: 80, height: 80, borderRadius: "50%", bgcolor: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </Box>
      <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#111", mb: 1 }}>{t("successTitle")}</Typography>
      <Typography sx={{ fontSize: 15, color: "#666", mb: 4, lineHeight: 1.6 }}>{t("successMessage")}</Typography>
      <Button
        onClick={onBackToShop}
        sx={{ bgcolor: "#2563EB", color: "#fff", py: "12px", px: "32px", borderRadius: "12px", fontWeight: 600, textTransform: "none", fontSize: 15, "&:hover": { bgcolor: "#1d4ed8" } }}
      >
        Вернуться в каталог
      </Button>
    </Box>
  );
}
