"use client";

import { use, useEffect, useRef, useState } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { $api, getLangHeader } from "../../../../entities/config/base";
import ProductCard from "../../../../shared/Product/ProductCard";
import { PaginationType, Product } from "../../../../entities/product/model/types";

export default function BrandPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = use(props.params);
  const { locale, slug } = resolvedParams;

  const [products, setProducts] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState<string>("");
  const pageRef = useRef(1);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await $api.get(`/api/products/`, {
        params: { brand: slug, page },
        headers: getLangHeader(locale),
      });
      const next = data?.next ?? null;
      const previous = data?.previous ?? null;
      const count = data?.count ?? 0;
      const results: Product[] = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : [];

      return {
        count,
        next,
        previous,
        results,
      } as PaginationType;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadBrandName = async () => {
      try {
        const { data } = await $api.get(`/api/brands`, {
          headers: getLangHeader(locale),
        });
        const list = Array.isArray(data) ? data : [];
        const found = list.find((b: any) => b.slug === slug);
        setBrandName(found?.name || slug.replaceAll("-", " "));
      } catch {
        setBrandName(slug.replaceAll("-", " "));
      }
    };
    loadBrandName();
  }, [slug, locale]);

  useEffect(() => {
    pageRef.current = 1;
    setProducts(null);
    fetchProducts(1).then((data) => {
      if (data) setProducts(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, locale]);

  useEffect(() => {
    if (inView && products?.next && !loading) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      fetchProducts(nextPage).then((data) => {
        if (data) {
          setProducts((prev) => {
            if (!prev) return data;
            return {
              ...data,
              results: [...prev.results, ...data.results],
            };
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, products?.next, loading, slug, locale]);

  if (loading && !products) {
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
          }}
        >
          {brandName || slug.replaceAll("-", " ")}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "grid",
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
            {products?.results?.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
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
          {loading && pageRef.current > 1 && (
            <CircularProgress size={30} sx={{ color: "#249FFC" }} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
