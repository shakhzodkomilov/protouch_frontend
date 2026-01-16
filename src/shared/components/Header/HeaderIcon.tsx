import React from "react";
import { IconButton, Typography, Box } from "@mui/material";

interface HeaderIconProps {
  icon: React.ReactNode;
  label: string;
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": { color: "#2196f3" },
    }}
  >
    <IconButton color="inherit" sx={{ p: 1 }}>
      {icon}
    </IconButton>
    <Typography sx={{ fontSize: "11px" }}>{label}</Typography>
  </Box>
);
