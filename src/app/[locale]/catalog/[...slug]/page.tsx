"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import {
  Box,
  Container,
  Typography,
  Grid,
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

export default function CatalogPage() {
  const { locale, slug } = useParams();
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const joinedSlug = slugArray.join("/"); // API uchun
  const lastSlug = slugArray[slugArray.length - 1];

  const products = useUnit($products);
  const loading = useUnit($loadingProducts);
  console.log(products);
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
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: "#000" }}>
          {lastSlug.replaceAll("-", " ")}
        </Typography>

        <Grid container spacing={7} width={"100%"} sx={{}}>
          {products?.results?.map((item) => (
            <Grid
              item
              xs={12} // mobile 1
              sm={6} // tablet 2
              md={3} // desktop 4
              key={item.id}
            >
              <Link
                href={`/${locale}/product/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    width: "300px",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: 3,
                    color: "#000",
                    bgcolor: "#fff",
                    display: "flex",
                    height: "auto",
                    minHeight: "420px",
                    flexDirection: "column",
                    position: "relative",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {/* Top labels */}
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "8px",
                        fontSize: 12,
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
                      src={item.image}
                      alt={item.title || "product image"}
                      fill
                      sizes="300px"
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#4E4E4E",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4em",
                      }}
                    >
                      {item.short_description}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, mt: 3 }}>
                      {new Intl.NumberFormat("ru-RU").format(item.price)} сум
                    </Typography>
                  </Box>

                  <Button
                    sx={{
                      bgcolor: "#249FFC",
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: 6,
                      right: 16,
                      minWidth: 0,
                      padding: 0,
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
            </Grid>
          ))}
        </Grid>

        {!products?.results?.length && (
          <Typography sx={{ mt: 6, textAlign: "center", color: "#999" }}>
            Nothing found
          </Typography>
        )}
      </Container>
    </Box>
  );
}
