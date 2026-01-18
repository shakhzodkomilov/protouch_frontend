"use client";

import { use, useEffect } from "react";
import { useUnit } from "effector-react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

import {
  $loadingProducts,
  $products,
  loadProductsByCategory,
} from "../../../../entities/product/model";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  ProductType,
  PaginationType,
} from "../../../../entities/types/productService.types";

export default function CatalogPage(props: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const resolvedParams = use(props.params);
  const { locale, slug } = resolvedParams;

  const slugArray = Array.isArray(slug) ? slug : [slug];
  const joinedSlug = slugArray.join("/");
  const lastSlug = slugArray[slugArray.length - 1] || "";

  const products = useUnit($products) as unknown as PaginationType | null;
  const loading = useUnit($loadingProducts);

  useEffect(() => {
    if (joinedSlug && locale) {
      loadProductsByCategory({
        slugs: joinedSlug,
        page: 1,
        lang: locale as string,
      });
    }
  }, [joinedSlug, locale]);

  if (loading) {
    return (
      <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", width: "100%", py: 4 }}>
      <Container maxWidth={false} sx={{ py: 4, maxWidth: "1800px" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          {lastSlug.replaceAll("-", " ")}
        </Typography>

        {/* GRID O'RNIGA BOX + CSS GRID:
          Bu usul import xatolarini butunlay yo'qotadi 
        */}
        <Box
          sx={{
            display: "grid",
            gap: 4, // spacing o'rniga gap
            gridTemplateColumns: {
              xs: "1fr", // mobil: 1 ta ustun
              sm: "repeat(2, 1fr)", // planshet: 2 ta ustun
              md: "repeat(3, 1fr)", // kompyuter: 3 ta ustun
              lg: "repeat(4, 1fr)", // katta monitor: 4 ta ustun
            },
            width: "100%",
          }}
        >
          {products?.results?.map((item: ProductType) => (
            <Link
              key={item.id}
              href={`/${locale}/product/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "320px",
                  margin: "0 auto",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                  color: "#000",
                  bgcolor: "#fff",
                  display: "flex",
                  minHeight: "420px",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "8px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: item.is_in_stock ? "#3BB351" : "#FF5F5F",
                      bgcolor: item.is_in_stock ? "#D6F2DB" : "#FFE4E4",
                    }}
                  >
                    {item.is_in_stock ? "В наличии" : "По запросу"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Image
                      src="/scale.svg"
                      width={20}
                      height={20}
                      alt="scale"
                    />
                    <FavoriteBorderIcon
                      sx={{ fontSize: 20, color: "#4E4E4E" }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    mt: 2,
                  }}
                >
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.title || "product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>

                <Box sx={{ mt: 2, flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#4E4E4E",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      lineHeight: "1.4em",
                    }}
                  >
                    {item.short_description}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      mt: 2,
                      color: "#000",
                    }}
                  >
                    {new Intl.NumberFormat("ru-RU").format(Number(item.price))}{" "}
                    сум
                  </Typography>
                </Box>

                <Button
                  sx={{
                    bgcolor: "#249FFC",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    minWidth: 0,
                    padding: 0,
                    "&:hover": { bgcolor: "#1a8ae5" },
                  }}
                >
                  <Image
                    src={
                      item.is_in_stock
                        ? "/basketIcon.svg"
                        : "/call-outline_white.svg"
                    }
                    width={24}
                    height={24}
                    alt="basket"
                  />
                </Button>
              </Box>
            </Link>
          ))}
        </Box>

        {products?.results && products.results.length === 0 && (
          <Box sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#999" }}>
              Ничего не найдено
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
