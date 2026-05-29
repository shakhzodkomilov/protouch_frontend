"use client";

import { Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PRIMARY_BLUE } from "../constants";

const arrowStyle = {
  border: "1.5px solid",
  borderColor: PRIMARY_BLUE,
  bgcolor: "white",
  borderRadius: "8%",
  width: 44,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  "&:hover": {
    bgcolor: PRIMARY_BLUE,
    "& .MuiSvgIcon-root": { color: "#fff" },
  },
};

const iconStyle = {
  fontSize: 36,
  color: PRIMARY_BLUE,
};

type ScrollArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  sx?: object;
};

export function ScrollArrow({ direction, onClick, sx }: ScrollArrowProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        ...(direction === "left" ? { left: -16 } : { right: -16 }),
        ...arrowStyle,
        ...sx,
      }}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      role="button"
    >
      {direction === "left" ? (
        <ChevronLeftIcon sx={iconStyle} />
      ) : (
        <ChevronRightIcon sx={iconStyle} />
      )}
    </Box>
  );
}

export const ARROW_BTN_SX = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  ...arrowStyle,
} as const;
