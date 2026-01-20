/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { use, useEffect } from "react";
import { useUnit } from "effector-react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";

// Replace these imports with your actual path to effector models
import { $categories, loadCategories } from "../../../entities/product/model";

export default function MobileCatalogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  // Unwrap params using React.use()
  const { locale } = use(props.params);

  const categories = useUnit($categories);
  const fetchCategories = useUnit(loadCategories);

  useEffect(() => {
    fetchCategories({ lang: locale });
  }, [fetchCategories, locale]);

  if (!categories || categories.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* breadcrumbs */}
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #eee" }}>
        <Breadcrumbs separator="/" sx={{ fontSize: "14px" }}>
          <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
            Каталог товаров
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography
        variant="h6"
        sx={{
          px: 2,
          py: 2,
          fontWeight: 700,
          borderBottom: "2px solid #249FFC",
          display: "inline-block",
          mx: 2,
          mt: 1,
          color: "#000",
        }}
      >
        Каталог товаров
      </Typography>

      <List sx={{ width: "100%", p: 0, mt: 1 }}>
        {categories.map((category: any) => (
          <React.Fragment key={category.id}>
            <Link
              href={`/${locale}/catalog/${category.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ py: 2 }}>
                  {category.image && (
                    <ListItemIcon sx={{ minWidth: 45 }}>
                      <Image
                        src={category.image.url || category.image}
                        alt=""
                        width={24}
                        height={24}
                        style={{
                          filter:
                            "invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(101%) contrast(99%)",
                        }}
                      />
                    </ListItemIcon>
                  )}

                  <ListItemText
                    primary={category.title}
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#1a1a1a",
                    }}
                  />

                  <ChevronRightIcon sx={{ color: "#BDBDBD" }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider variant="middle" sx={{ mx: 2, opacity: 0.6 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
