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
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  $products,
  loadProducts,
  $loadingProducts,
} from "../../../entities/product/model";
import Image from "next/image";

const NavbarCatalog = () => {
  const params = useParams();
  const locale = params?.locale as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Global state
  const productsResponse = useUnit($products);
  const loading = useUnit($loadingProducts);
  const fetchProducts = useUnit(loadProducts);

  // Xatolikni to'g'irlash: productsResponse ichidan results massivini olamiz
  // Odatda PaginationType { results: [...], count: number, ... } ko'rinishida bo'ladi
  const productsList = Array.isArray(productsResponse)
    ? productsResponse
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (productsResponse as any)?.results || [];

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        // Xatolikni to'g'irlash: 'search' o'rniga model qabul qiladigan 'title' ishlatamiz
        fetchProducts({
          lang: locale,
          title: searchQuery, // Agar modelda 'search' bo'lmasa, 'title' dan foydalanamiz
          page: 1,
        });
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 500);

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
          <Button variant="contained" startIcon={<MenuIcon />}>
            Каталог
          </Button>

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
                  {/* productsList.length endi ishlaydi, chunki u massiv ekanligi aniqlandi */}
                  {productsList.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    productsList.slice(0, 8).map((product: any) => (
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
                              <Image
                                src={
                                  product.image ||
                                  product.images?.[0]?.url ||
                                  "/placeholder.jpg"
                                }
                                alt=""
                                fill
                                sizes="40px"
                                style={{ objectFit: "contain" }}
                              />
                            </Box>
                            <ListItemText
                              primary={product.title}
                              secondary={`${new Intl.NumberFormat("ru-RU").format(product.price)} сум`}
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
        </Box>
      </AppBar>
    </Box>
  );
};

export default NavbarCatalog;
