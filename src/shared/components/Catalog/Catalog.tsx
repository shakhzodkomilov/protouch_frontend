"use client";

import { useStore, useEvent, useUnit } from "effector-react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CategoryType } from "../../../entities/types/productService.types";

import Image from "next/image";
import { $categories, loadCategories } from "../../../entities/product/model";
import React from "react";

const Catalog = () => {
  const theme = useTheme();
  const categories = useUnit($categories);
  const loadCatalog = useEvent(loadCategories);

  // Load categories on mount
  React.useEffect(() => {
    loadCatalog({ lang: "ru" });
  }, [loadCatalog]);

  return (
    <Box sx={{ py: 8, bgcolor: "#f8f9fa" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            lineHeight: 1.2,
            mb: 2,
            background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Каталог товаров
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#666",
            maxWidth: 600,
            mx: "auto",
            fontSize: { xs: "1.1rem", md: "1.3rem" },
          }}
        >
          Выберите категорию для просмотра ассортимента
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <CategoryCard category={category} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Carousel Categories (is_carousel=true) */}
        {categories.filter((c) => c.is_carousel).length > 0 && (
          <>
            <Box sx={{ mt: 12, mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Популярные категории
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                overflowX: "auto",
                pb: 2,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {categories
                .filter((c) => c.is_carousel)
                .map((category) => (
                  <CarouselCategoryCard key={category.id} category={category} />
                ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

interface CategoryCardProps {
  category: CategoryType;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          "& .category-bg": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* Background Gradient */}
      <Box
        className="category-bg"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: `linear-gradient(135deg, ${getGradientColor(
            index
          )} 0%, rgba(33,150,243,0.8) 100%)`,
          transition: "transform 0.3s ease",
          zIndex: 1,
        }}
      />

      {/* Category Image */}
      {category.image && (
        <Box sx={{ position: "relative", height: 180, zIndex: 2, p: 2 }}>
          <CardMedia
            component="img"
            image={category.image.url}
            alt={category.title}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          />
        </Box>
      )}

      {/* Content */}
      <CardContent sx={{ p: 3, pt: 0, zIndex: 2, position: "relative" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            lineHeight: 1.3,
            fontSize: "1.1rem",
          }}
        >
          {category.title}
        </Typography>

        {category.children && category.children.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {category.children.slice(0, 2).map((child) => (
              <Chip
                key={child.id}
                label={child.title}
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#333",
                  mb: 0.5,
                }}
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          sx={{
            mt: 1,
            px: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#2196f3",
            "&:hover": { bgcolor: "#1e88e5" },
          }}
          onClick={() => navigateToCategory(category.slug)}
        >
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

const CarouselCategoryCard = ({ category }: { category: CategoryType }) => {
  return (
    <Paper
      sx={{
        minWidth: 280,
        height: 200,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
        },
      }}
      onClick={() => navigateToCategory(category.slug)}
    >
      {category.image && (
        <Image
          src={category.image.url}
          alt={category.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="280px"
        />
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(0,0,0,0.7)",
          color: "white",
          p: 3,
          pb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {category.title}
        </Typography>
        <Typography variant="body2">
          {category.children?.length || 0} подкатегорий
        </Typography>
      </Box>
    </Paper>
  );
};

// Utils
const getGradientColor = (index: number) => {
  const colors = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#f5576c",
    "#4facfe",
    "#00f2fe",
  ];
  return colors[index % colors.length];
};

const navigateToCategory = (slug: string) => {
  // Replace with your router logic
  window.location.href = `/catalog/${slug}`;
};

export default Catalog;
