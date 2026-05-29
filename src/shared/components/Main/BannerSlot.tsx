"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface BannerSlotProps {
  bannerUrl: string;
  title: string;
  /** pixel height or responsive object */
  height?: number | Record<string, number | string>;
  objectFit?: "cover" | "contain" | "fill";
  showOverlay?: boolean;
  showCta?: boolean;
}

export function BannerSlot({
  bannerUrl,
  title,
  height = 300,
  objectFit = "cover",
  showOverlay = true,
  showCta = false,
}: BannerSlotProps) {
  const t = useTranslations("main");

  return (
    <Box
      sx={{ position: "relative", width: "100%", height, bgcolor: "#f0f0f0" }}
    >
      <Image
        src={bannerUrl}
        alt={title}
        fill
        style={{ objectFit }}
        priority
        unoptimized
      />
      {showOverlay && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 50%)",
          }}
        />
      )}
      {showCta && (
        <Box sx={{ position: "absolute", bottom: 20, left: 20, zIndex: 2 }}>
          <Button
            component={Link}
            href={`/catalog/${title.toLowerCase()}`}
            variant="contained"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: "100px",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "none",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.25)",
                boxShadow: "none",
              },
            }}
          >
            {t("readMore")}
          </Button>
        </Box>
      )}
    </Box>
  );
}
