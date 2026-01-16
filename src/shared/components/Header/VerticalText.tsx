"use client";
import { Box, Typography } from "@mui/material";

const texts = ["ИНТЕРАКТИВНОЕ ОБОРУДОВАНИЕ", "AV СИСТЕМЫ", "ВИДЕОСТЕНЫ"];

const DURATION = 6.9;

export default function VerticalText() {
  return (
    <Box
      sx={{
        height: 28,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "@keyframes scroll": {
            // item 1 visible
            "0%": { transform: "translateY(0%)" },
            "28.985%": { transform: "translateY(0%)" }, // ≈ 2s

            // move to item 2
            "32.608%": { transform: "translateY(-100%)" }, // ≈ 0.3s

            // item 2 visible
            "61.594%": { transform: "translateY(-100%)" }, // +2s

            // move to item 3
            "65.217%": { transform: "translateY(-200%)" }, // +0.3s

            // item 3 visible
            "94.203%": { transform: "translateY(-200%)" }, // +2s

            // move back to item 1
            "100%": { transform: "translateY(0%)" }, // +0.3s
          },
          animation: `scroll ${DURATION}s linear infinite`,
        }}
      >
        {texts.map((text, i) => (
          <Typography
            key={i}
            sx={{
              height: 28,
              lineHeight: "28px",
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
