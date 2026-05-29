import React from "react";
import { IconButton, Typography, Box } from "@mui/material";

interface HeaderIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, label, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      minWidth: "66px",
      transition: "0.2s",
      color: "#6B7280",
      "&:hover": { color: "#111827" },
    }}
  >
    <IconButton color="inherit" sx={{ p: 0.5 }}>
      {icon}
    </IconButton>
    <Typography sx={{ fontSize: "12px", fontWeight: 400, textAlign: "center" }}>
      {label}
    </Typography>
  </Box>
);
