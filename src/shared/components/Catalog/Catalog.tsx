/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useUnit } from "effector-react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import { $categories, loadCategories } from "../../../entities/product/model";
import { CategoryType } from "../../../entities/product/model/types";

const Catalog = () => {
  const categories = useUnit($categories) as CategoryType[];
  const loadCatalog = useUnit(loadCategories);

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
          sx={{ color: "#666", maxWidth: 600, mx: "auto" }}
        >
          Выберите категорию для просмотра ассортимента
        </Typography>
      </Box>

      {/* CSS GRID CONTAINER */}
      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gap: 3, // MUI spacing={3} bilan bir xil
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </Box>

        {/* Carousel Categories */}
        {categories.filter((c: any) => c.is_carousel).length > 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Популярные категории
            </Typography>
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((c: any) => c.is_carousel)
                .map((category) => (
                  <CarouselCategoryCard key={category.id} category={category} />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// --- Sub-components (O'zgarishsiz qoldi, faqat Grid olib tashlandi) ---

const CategoryCard = ({
  category,
  index,
}: {
  category: CategoryType;
  index: number;
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: `linear-gradient(135deg, ${getGradientColor(index)} 0%, rgba(33,150,243,0.8) 100%)`,
          zIndex: 1,
        }}
      />

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

      <CardContent
        sx={{ p: 3, pt: 0, zIndex: 2, position: "relative", flexGrow: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 1.5, fontSize: "1.1rem" }}
        >
          {category.title}
        </Typography>

        {category.children && category.children.length > 0 && (
          <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {category.children.slice(0, 2).map((child) => (
              <Chip
                key={child.id}
                label={child.title}
                size="small"
                sx={{ fontSize: "0.75rem", bgcolor: "#f0f0f0" }}
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          sx={{
            mt: "auto", // Tugmani doim pastga tushiradi
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#2196f3",
          }}
          onClick={() => (window.location.href = `/catalog/${category.slug}`)}
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
        flexShrink: 0,
        transition: "all 0.3s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
      onClick={() => (window.location.href = `/catalog/${category.slug}`)}
    >
      {category.image && (
        <Image
          src={category.image.url}
          alt={category.title}
          fill
          style={{ objectFit: "cover" }}
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
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {category.title}
        </Typography>
        <Typography variant="body2">
          {category.children?.length || 0} подкатегорий
        </Typography>
      </Box>
    </Paper>
  );
};

const getGradientColor = (index: number) => {
  const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"];
  return colors[index % colors.length];
};

export default Catalog;
