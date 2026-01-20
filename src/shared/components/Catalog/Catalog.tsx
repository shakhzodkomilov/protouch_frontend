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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import Image from "next/image";
import { $categories, loadCategories } from "../../../entities/product/model";
import { CategoryType } from "../../../entities/product/model/types";

const Catalog = ({
  params,
}: {
  params?: { locale: string; slug?: string[] };
}) => {
  const categories = useUnit($categories) as CategoryType[];
  const loadCatalog = useUnit(loadCategories);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const locale = params?.locale || "ru";
  const slug = params?.slug || [];
  const currentCategoryName =
    slug.length > 0 ? slug[slug.length - 1].replaceAll("-", " ") : null;

  React.useEffect(() => {
    loadCatalog({ lang: locale });
  }, [loadCatalog, locale]);

  // --- MOBILE VIEW (Matches Screenshots) ---
  if (isMobile) {
    return (
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
        {/* Breadcrumbs for nested level (Image 2) */}
        {currentCategoryName && (
          <Box sx={{ px: 2, py: 1.5, bgcolor: "#fff" }}>
            <Breadcrumbs separator="/" sx={{ fontSize: "14px" }}>
              <Link
                href={`/${locale}/catalog`}
                style={{ color: "#666", textDecoration: "none" }}
              >
                Каталог товаров
              </Link>
              <Typography sx={{ fontSize: "14px", color: "#249FFC" }}>
                {currentCategoryName}
              </Typography>
            </Breadcrumbs>
          </Box>
        )}

        <Typography
          variant="h6"
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            fontWeight: 700,
            borderBottom: "2px solid #249FFC",
            display: "inline-block",
            mx: 2,
            color: "#000",
          }}
        >
          Каталог товаров
        </Typography>

        <List sx={{ width: "100%", p: 0, mt: 1 }}>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <Link
                href={`/${locale}/catalog/${category.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ py: 2, px: 2 }}>
                    {/* Icon - Blue filter applied to match Image 1 */}
                    {category.image && !currentCategoryName && (
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Image
                          src={category.image.url}
                          alt=""
                          width={24}
                          height={24}
                          style={{
                            filter:
                              "invert(53%) sepia(93%) saturate(1571%) hue-rotate(181deg) brightness(101%) contrast(98%)",
                          }}
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={category.title}
                      primaryTypographyProps={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#1a1a1a",
                      }}
                    />
                    <ChevronRightIcon sx={{ color: "#BDBDBD", fontSize: 20 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider sx={{ mx: 2, borderColor: "#f0f0f0" }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  }

  // --- DESKTOP VIEW (Your Original Grid) ---
  return (
    <Box sx={{ py: 8, bgcolor: "#f8f9fa" }}>
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
      </Box>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              locale={locale}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

// --- Sub-components ---

const CategoryCard = ({
  category,
  index,
  locale,
}: {
  category: CategoryType;
  index: number;
  locale: string;
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
        <Button
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightIcon />}
          sx={{
            mt: "auto",
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#2196f3",
          }}
          component={Link}
          href={`/${locale}/catalog/${category.slug}`}
        >
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

const getGradientColor = (index: number) => {
  const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"];
  return colors[index % colors.length];
};

export default Catalog;
