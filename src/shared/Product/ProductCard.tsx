"use client";

import { Box, Typography, Card, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../entities/product/model/types";
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locale } = useParams();
  console.log("Product in ProductCard:", product);
  return (
    <Card sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
      {product?.results.map((item) => (
        <Link
          key={item.id}
          href={`/${locale}/product/${item.id}`}
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
            }}
          >
            {/* Stock */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {item.is_in_stock ? (
                <Typography
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: "#D6F2DB",
                    color: "#3BB351",
                  }}
                >
                  В наличии
                </Typography>
              ) : (
                <Typography
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: "#FFE4E4",
                    color: "#FF5F5F",
                  }}
                >
                  Нет в наличии
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 1 }}>
                <Image src="/scale.svg" width={24} height={24} alt="scale" />
                <FavoriteBorderIcon sx={{ color: "#4E4E4E" }} />
              </Box>
            </Box>

            {/* Image */}
            <Box
              sx={{ position: "relative", width: "100%", height: 230, my: 2 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>

            {/* Title + Price */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 16,
                color: "#4E4E4E",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.title}
            </Typography>

            <Typography sx={{ fontWeight: 700, fontSize: 18, mt: "auto" }}>
              {new Intl.NumberFormat("ru-RU").format(item.price)} сум
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
              }}
            >
              <Image
                src={
                  item.is_in_stock
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
      ))}
    </Card>
  );
};

export default ProductCard;
