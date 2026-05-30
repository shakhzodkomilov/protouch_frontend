"use client";

import { use, useEffect, useState, useMemo } from "react";
import { useUnit } from "effector-react";
import { useInView } from "react-intersection-observer";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTranslations } from "next-intl";

import {
  $loadingProducts,
  $products,
  loadProductsByCategory,
  clearProducts,
  $categories,
} from "../../../../entities/product/model";
import { PaginationType, Product } from "../../../../entities/product/model/types";
import ProductCard from "../../../../shared/Product/ProductCard";

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
  params: Promise<{ locale: string; slug?: string | string[] }>;
}) {
  const resolvedParams = use(props.params);
  const { locale, slug } = resolvedParams;
  const t = useTranslations("catalog");

  const slugArray = slug ? (Array.isArray(slug) ? slug : [slug]) : [];
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
  const displayTitle = categoryData?.title || lastSlug?.replaceAll("-", " ") || t("allProducts");

  const [currentPage, setCurrentPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Ma'lumotlarni yuklash
  useEffect(() => {
    if (locale) {
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

  const hasProducts = products?.results && products.results.length > 0;

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
          }}
        >
          {displayTitle}
        </Typography>
        <Box sx={{ display: "flex" }}>
          {/* Sidebar Filter Box */}

          <Box
            sx={{
              display: "grid",
              "@media (max-width:890px)": {
                mt: 10,
              },
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              width: "100%",
            }}
          >
            {hasProducts ? (
              products.results.map((item: Product) => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : !loading ? (
              <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 8 }}>
                <Typography sx={{ fontSize: 18, color: "#666" }}>
                  {t("noProducts")}
                </Typography>
              </Box>
            ) : null}
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
