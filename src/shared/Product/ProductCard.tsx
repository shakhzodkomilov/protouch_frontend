"use client";

import { Box, Typography, Card, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../entities/product/model/types"; // Bitta mahsulot tipi
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: Product; // Bu yerda bitta mahsulot keladi
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locale } = useParams();

  // product.results.map kerak emas, chunki product o'zi bitta obyekt
  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          width: 300,
          minHeight: "480px",
          borderRadius: 3,
          p: 2,
          boxShadow: 3,
          color: "#000",
          bgcolor: "#fff",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": { transform: "translateY(-5px)" },
        }}
      >
        {/* Stock */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 2,
              bgcolor: product.is_in_stock ? "#D6F2DB" : "#FFE4E4",
              color: product.is_in_stock ? "#3BB351" : "#FF5F5F",
            }}
          >
            {product.is_in_stock ? "В наличии" : "Нет в наличии"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Image src="/scale.svg" width={24} height={24} alt="scale" />
            <FavoriteBorderIcon sx={{ color: "#4E4E4E" }} />
          </Box>
        </Box>

        {/* Image */}
        <Box sx={{ position: "relative", width: "100%", height: 230, my: 2 }}>
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            color: "#4E4E4E",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
        >
          {product.title}
        </Typography>

        <Typography sx={{ fontWeight: 700, fontSize: 18, mt: "auto" }}>
          {new Intl.NumberFormat("ru-RU").format(product.price)} сум
        </Typography>

        {/* Button */}
        <Button
          sx={{
            bgcolor: "#249FFC",
            width: 56,
            height: 56,
            borderRadius: "50%",
            position: "absolute",
            right: 12,
            bottom: 12,
            minWidth: 0,
            p: 0,
            "&:hover": { bgcolor: "#1a8ae5" },
          }}
        >
          <Image
            src={
              product.is_in_stock
                ? "/basketIcon.svg"
                : "/call-outline_white.svg"
            }
            alt="action"
            width={28}
            height={28}
          />
        </Button>
      </Box>
    </Link>
  );
};

export default ProductCard;
