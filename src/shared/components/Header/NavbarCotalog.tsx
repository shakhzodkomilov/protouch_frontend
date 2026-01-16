"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  IconButton,
  Typography,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ScaleIcon from "@mui/icons-material/Scale";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import {
  $categories,
  loadCategories,
  $searchProducts, // ✅ FIXED: Use search store
  $searchLoading, // ✅ FIXED: Use search loading
  searchProducts, // ✅ FIXED: Use search event
} from "../../../entities/product/model";
import { $basket } from "../../../entities/basket/model/store";
import { $favoritesCount } from "../../../entities/favourite/model/store";
import { CategoryType } from "../../../entities/types/productService.types";
import { CatalogDropdown } from "./CatalogDropdown";

const NavbarCatalog = () => {
  const { locale } = useParams();
  const router = useRouter();

  // Effector Units ✅ FIXED
  const categories = useUnit($categories);
  const { totalCount } = useUnit($basket);
  const favoritesCount = useUnit($favoritesCount); // ✅ Added
  const [searchProductsData, searchLoading, searchProductsEv] = useUnit([
    // ✅ Renamed
    $searchProducts,
    $searchLoading,
    searchProducts,
  ]);

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Search Effect (Debounced) ✅ FIXED
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchProductsEv({ lang: locale as string, search: searchQuery }); // ✅ Fixed event
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, locale, searchProductsEv]);

  const handleCatalogClick = () => {
    if (!isOpen) {
      loadCategories({ lang: "ru" });
      setIsOpen(true);
      if (categories.length > 0) setActiveCategory(categories[0]);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  const handleCategoryHover = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBasketClick = () => {
    router.push(`/${locale}/basket`);
  };

  const handleFavoritesClick = () => {
    router.push(`/${locale}/favorites`);
  };

  return (
    <Box sx={{ position: "relative", zIndex: 100, width: "100%" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#fff", color: "#000", width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            py: 1,
          }}
        >
          {/* Catalog Button */}
          <Button
            onClick={handleCatalogClick}
            sx={{
              bgcolor: isOpen ? "#1e88e5" : "#2196f3",
              color: "#fff",
              px: 3,
              height: "55px",
              borderRadius: 2,
              display: "flex",
              gap: 1,
              textTransform: "none",
              fontWeight: 600,
              minWidth: "200px",
              "&:hover": { bgcolor: "#1e88e5" },
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
            Каталог товаров
          </Button>

          {/* Search Bar Container */}
          <Box ref={searchRef} sx={{ flex: 1, position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                height: "55px",
                px: 2,
                borderRadius: 2,
              }}
            >
              <SearchIcon sx={{ color: "#999", mr: 1 }} />
              <InputBase
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                sx={{ width: "100%", fontSize: 16, color: "#000" }}
              />
              {searchLoading && (
                <CircularProgress size={20} sx={{ ml: 1, color: "#2196f3" }} />
              )}
            </Box>

            {/* Live Search Results Dropdown ✅ FIXED */}
            {showResults && (
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  maxHeight: "450px",
                  overflowY: "auto",
                  borderRadius: 2,
                  border: "1px solid #eee",
                  bgcolor: "#fff",
                }}
              >
                <List sx={{ p: 0 }}>
                  {searchProductsData?.results?.length > 0 ? ( // ✅ FIXED: PaginationType
                    searchProductsData.results
                      .slice(0, 10)
                      .map((product: any) => (
                        <Link
                          key={product.id}
                          href={`/${locale}/product/${product.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={() => setShowResults(false)}
                        >
                          <ListItem disablePadding divider>
                            <ListItemButton sx={{ py: 1.5, gap: 2 }}>
                              <Avatar
                                src={product.image}
                                variant="rounded"
                                sx={{
                                  width: 45,
                                  height: 45,
                                  bgcolor: "#f5f5f5",
                                  p: 0.5,
                                  border: "1px solid #eee",
                                }}
                              />
                              <ListItemText
                                primary={
                                  product.title || product.short_description
                                }
                                secondary={`${new Intl.NumberFormat(
                                  "ru-RU"
                                ).format(product.price)} сум`}
                                primaryTypographyProps={{
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  noWrap: true,
                                  color: "#000",
                                }}
                                secondaryTypographyProps={{
                                  color: "#2196f3",
                                  fontWeight: 700,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))
                  ) : !searchLoading ? (
                    <Box sx={{ p: 3, textAlign: "center" }}>
                      <Typography sx={{ color: "#999", fontSize: "14px" }}>
                        Ничего не найдено по запросу "{searchQuery}"
                      </Typography>
                    </Box>
                  ) : null}
                </List>
              </Paper>
            )}
          </Box>

          {/* Right Icons ✅ FIXED */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <HeaderIcon icon={<ScaleIcon />} label="Сравнение" />

            <HeaderIcon
              icon={
                <Badge badgeContent={totalCount} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
              label="Корзина"
              onClick={handleBasketClick}
            />

            <HeaderIcon
              icon={
                <Badge badgeContent={favoritesCount} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              }
              label="Избранное"
              onClick={handleFavoritesClick}
            />

            <HeaderIcon icon={<SupportAgentIcon />} label="Связь" />
          </Box>
        </Box>
      </AppBar>

      <CatalogDropdown
        isOpen={isOpen}
        activeCategory={activeCategory}
        onCategoryHover={handleCategoryHover}
        onClose={handleClose}
      />
    </Box>
  );
};

const HeaderIcon = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      minWidth: "65px",
      transition: "0.2s",
      "&:hover": { color: "#2196f3" },
    }}
  >
    <IconButton color="inherit" sx={{ p: 1 }}>
      {icon}
    </IconButton>
    <Typography sx={{ fontSize: "11px", fontWeight: 500 }}>{label}</Typography>
  </Box>
);

export default NavbarCatalog;
