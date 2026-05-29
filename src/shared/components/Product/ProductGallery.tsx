"use client";

import { Box } from "@mui/material";
import Image from "next/image";

interface ProductImage {
  id: string;
  url: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  activeImage: number;
  title: string;
  onImageSelect: (index: number) => void;
}

export default function ProductGallery({ images, activeImage, title, onImageSelect }: ProductGalleryProps) {
  return (
    <>
      {/* Desktop Gallery */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {images.map((img, i) => (
            <Box
              key={img.id}
              onClick={() => onImageSelect(i)}
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                p: 1,
                border: i === activeImage ? "2px solid #249FFC" : "1px solid #ddd",
              }}
            >
              <Image src={img.url} alt="thumb" width={60} height={60} style={{ objectFit: "contain" }} />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            flex: 1,
            height: 420,
            position: "relative",
            display: "flex",
            borderRadius: 3,
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #eee",
          }}
        >
          {images[activeImage] && (
            <Image src={images[activeImage].url} width={290} height={290} style={{ objectFit: "contain", position: "unset" }} alt={title} />
          )}
        </Box>
      </Box>

      {/* Mobile Gallery */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 260,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: 3,
            mb: 1.5,
            border: "1px solid #eee",
          }}
        >
          {images[activeImage] && (
            <Image src={images[activeImage].url} width={220} height={220} style={{ objectFit: "contain" }} alt={title} />
          )}
        </Box>
        {images.length > 1 && (
          <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 2, px: 1, pb: 1 }}>
            {images.map((img, i) => (
              <Box
                key={img.id}
                onClick={() => onImageSelect(i)}
                sx={{
                  minWidth: 60,
                  height: 60,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  p: 0.5,
                  flexShrink: 0,
                  bgcolor: "#fff",
                  border: i === activeImage ? "2px solid #249FFC" : "1px solid #ddd",
                }}
              >
                <Image src={img.url} alt="thumb" width={48} height={48} style={{ objectFit: "contain" }} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
