"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
} from "@mui/material";
// ... (existing icons)
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import {
  $products,
  loadProducts,
  $loadingProducts,
} from "../../../entities/product/model";
import { $basket } from "../../../entities/basket/model/store";

const NavbarCatalog = () => {
  const { locale } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { totalCount } = useUnit($basket);
  const [products, loading, fetchProducts] = useUnit([
    $products,
    $loadingProducts,
    loadProducts,
  ]);

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

  // LIVE SEARCH LOGIC (Debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchProducts({ lang: locale as string, search: searchQuery });
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, locale, fetchProducts]);

  return (
    <Box sx={{ position: "relative", zIndex: 100, width: "100%" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#fff", color: "#000" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}>
          <Button /* ... Catalog Button Props ... */>
            <MenuIcon /> Каталог
          </Button>

          {/* SEARCH BAR CONTAINER */}
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
                placeholder="Поиск товаров..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              />
              {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
            </Box>

            {/* LIVE RESULTS DROPDOWN */}
            {showResults && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  maxHeight: "400px",
                  overflowY: "auto",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <List>
                  {products.length > 0 ? (
                    products.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/product/${product.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={() => setShowResults(false)}
                      >
                        <ListItem disablePadding>
                          <ListItemButton sx={{ gap: 2 }}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                position: "relative",
                              }}
                            >
                              <img
                                src={product.image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </Box>
                            <ListItemText
                              primary={product.title}
                              secondary={`${new Intl.NumberFormat(
                                "ru-RU"
                              ).format(product.price)} сум`}
                              primaryTypographyProps={{
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))
                  ) : (
                    <Typography
                      sx={{ p: 2, textAlign: "center", color: "#999" }}
                    >
                      Ничего не найдено
                    </Typography>
                  )}
                </List>
              </Paper>
            )}
          </Box>

          {/* ... Right Icons ... */}
        </Box>
      </AppBar>
    </Box>
  );
};

export default NavbarCatalog;
