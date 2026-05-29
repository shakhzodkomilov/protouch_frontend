"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export interface NewsItem {
  title: string;
  text: string;
  linearColor1: string;
  linearColor2: string;
  modalContent?: string;
}

interface NewsCardProps {
  item: NewsItem;
  onClick: () => void;
}

const NewsCard = ({ item, onClick }: NewsCardProps) => (
  <Box
    onClick={onClick}
    sx={{
      width: 280,
      height: 230,
      borderRadius: "16px",
      p: 2,
      background: `linear-gradient(90deg, ${item.linearColor1} 0%, ${item.linearColor2} 100%)`,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      position: "relative",
      transition: "transform 0.2s",
      scrollSnapAlign: "start",
      cursor: item.modalContent ? "pointer" : "default",
      "&:hover": { transform: "translateY(-5px)" },
      "@media (max-width: 900px)": { width: 220, height: 200 },
    }}
  >
    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{item.title}</Typography>
    <Typography sx={{ fontWeight: 400, mt: "22px" }}>{item.text}</Typography>
    <Image
      src="/newsBg.svg"
      width={150}
      height={150}
      alt=""
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      }}
    />
  </Box>
);

export default NewsCard;
