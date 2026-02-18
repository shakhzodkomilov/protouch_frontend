"use client";

import { use, useEffect, useState, useMemo } from "react";
import { useUnit } from "effector-react";
import { useInView } from "react-intersection-observer";
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
  clearProducts,
  $categories,
} from "../../../../entities/product/model";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  ProductType,
  PaginationType,
} from "../../../../entities/types/productService.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findCategoryRecursive = (categories: any[], targetSlug: string): any => {
  if (!categories) return null;
  for (const cat of categories) {
    if (cat.slug === targetSlug) return cat;
    if (cat.children && cat.children.length > 0) {
      const found = findCategoryRecursive(cat.children, targetSlug);
      if (found) return found;
    }
  }
  return null;
};

export default function CatalogPage(props: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const resolvedParams = use(props.params);
  const { locale, slug } = resolvedParams;

  const slugArray = Array.isArray(slug) ? slug : [slug];
  const joinedSlug = slugArray.join("/");
  const lastSlug = slugArray[slugArray.length - 1] || "";

  const allCategories = useUnit($categories);
  const products = useUnit($products) as unknown as PaginationType | null;
  const loading = useUnit($loadingProducts);
  // 1. Memo orqali sarlavhani hisoblaymiz (bu Store o'zgarishi bilan avtomatik hisoblanadi)
  const categoryData = useMemo(() => {
    return findCategoryRecursive(allCategories || [], joinedSlug);
  }, [allCategories, joinedSlug]);

  // Agar kategoriya topilsa uni title'ini, topilmasa slug'ni ishlatamiz
  const displayTitle = categoryData?.title || lastSlug.replaceAll("-", " ");

  const [currentPage, setCurrentPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Ma'lumotlarni yuklash
  useEffect(() => {
    if (joinedSlug && locale) {
      clearProducts();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1);
      loadProductsByCategory({
        slugs: joinedSlug,
        page: 1,
        lang: locale,
      });
    }
  }, [joinedSlug, locale]);

  // Infinite Scroll
  useEffect(() => {
    if (inView && products?.next && !loading) {
      const nextPage = currentPage + 1;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(nextPage);
      loadProductsByCategory({
        slugs: joinedSlug,
        page: nextPage,
        lang: locale,
      });
    }
  }, [inView, products?.next, loading, joinedSlug, locale, currentPage]);

  if (loading && currentPage === 1) {
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
          variant="h1"
          sx={{
            mb: 4,
            ml: { xs: 0, md: 6 },
            fontWeight: 700,
            color: "#000",
            textTransform: "capitalize",
            fontSize: "34px",
            display: allCategories?.length ? "flex" : "none",
          }}
        >
          {displayTitle}
        </Typography>
        <Box sx={{ display: "flex" }}>
          {/* Sidebar Filter Box */}
          <Box
            sx={{
              width: { xs: "100%", md: "300px" },
              flexShrink: 0,
              mr: { md: 4 },
              display: { xs: "none", md: "flex" }, // Hide on mobile or make responsive
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Availability Section */}
            <Box sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000",
                }}
              >
                Наличие в магазинах
                <Box
                  component="span"
                  sx={{ fontSize: "12px", transform: "rotate(0deg)" }}
                >
                  ▼
                </Box>
              </Typography>
            </Box>
            <Box sx={{ borderBottom: "1px solid #eee", pb: 2 }}></Box>

            {/* Ratings and Badges */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                py: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <input
                  type="checkbox"
                  style={{ width: "18px", height: "18px" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#000",
                    }}
                  >
                    Надёжные модели <span style={{ color: "#999" }}>(436)</span>
                    <span style={{ color: "#3BB351", fontSize: "14px" }}>
                      ✔
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#999" }}>
                    минимум обращений в сервис
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <input
                  type="checkbox"
                  style={{ width: "18px", height: "18px" }}
                />
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  Есть обзор <span style={{ color: "#999" }}>(125)</span>
                </Typography>
              </Box>
            </Box>

            {/* Price Section */}
            <Box sx={{ py: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 2, color: "#000" }}
              >
                Цена
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    p: 1,
                    flex: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#999" }}>
                    от
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#000" }}>
                    499
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    p: 1,
                    flex: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#999" }}>
                    до
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#000" }}>
                    42{" "}
                  </Typography>
                </Box>
                <Button>Click</Button>
              </Box>
            </Box>
          </Box>{" "}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
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
                    bgcolor: "#fff",
                    display: "flex",
                    minHeight: "420px",
                    flexDirection: "column",
                    position: "relative",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                      {item.is_in_stock
                        ? locale === "ru"
                          ? "В наличии"
                          : "Mavjud"
                        : locale === "ru"
                          ? "По запросу"
                          : "So'rov bo'yicha"}
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
                      alt={item.title}
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
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        mt: 2,
                        color: "#000",
                      }}
                    >
                      {new Intl.NumberFormat(
                        locale === "ru" ? "ru-RU" : "uz-UZ",
                      ).format(Number(item.price))}{" "}
                      {locale === "ru" ? "сум" : "so'm"}
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
                      alt="action"
                    />
                  </Button>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          ref={ref}
          sx={{
            py: 6,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {loading && currentPage > 1 && (
            <CircularProgress size={30} sx={{ color: "#249FFC" }} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
