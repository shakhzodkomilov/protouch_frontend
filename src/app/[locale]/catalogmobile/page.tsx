"use client";

import React, { use, useEffect } from "react";
import { useUnit } from "effector-react";
import {
  Box,
  Typography,
  Breadcrumbs,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";

import { $categories, loadCategories } from "../../../entities/product/model";

export default function MobileCatalogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(props.params);

  const categories = useUnit($categories);
  const fetchCategories = useUnit(loadCategories);

  useEffect(() => {
    fetchCategories({ lang: locale });
  }, [fetchCategories, locale]);

  if (!categories || categories.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10, mt: 14 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", mt: 10, pb: 4 }}>
      {/* Breadcrumbs */}
      <Box
        sx={{ px: 2, py: 1.5, bgcolor: "#fff", borderBottom: "1px solid #eee" }}
      >
        <Breadcrumbs separator="/" sx={{ fontSize: "14px" }}>
          <Link
            href={`/${locale}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Главная
          </Link>
          <Typography
            color="text.primary"
            sx={{ fontSize: "14px", fontWeight: 500 }}
          >
            Каталог
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography
        variant="h5"
        sx={{
          px: 2,
          py: 2,
          fontWeight: 700,
          color: "#000",
        }}
      >
        Каталог товаров
      </Typography>

      <Box sx={{ px: 1 }}>
        {categories.map((category: any) => (
          <Accordion
            key={category.id}
            disableGutters
            elevation={0}
            sx={{
              mb: 1,
              borderRadius: "12px !important",
              overflow: "hidden",
              border: "1px solid #E0E0E0",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#249FFC" }} />}
              sx={{ py: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {category.image && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#F0F8FF",
                      borderRadius: "8px",
                    }}
                  >
                    <Image
                      src={category.image.url || category.image}
                      alt=""
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                )}
                <Typography
                  sx={{ fontWeight: 600, fontSize: "16px", color: "#000" }}
                >
                  {category.title}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0, bgcolor: "#fff" }}>
              <Divider />
              <List disablePadding>
                <Link
                  href={`/${locale}/catalog/${category.slug}`}
                  style={{ textDecoration: "none", color: "#249FFC" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={`Все в разделе ${category.title}`}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      />
                      <ChevronRightIcon fontSize="small" />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Divider variant="middle" />

                {/* Subcategories (Children) */}
                {category.children && category.children.length > 0 ? (
                  category.children.map((child: any) => (
                    <React.Fragment key={child.id}>
                      <Link
                        href={`/${locale}/catalog/${child.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItem disablePadding>
                          <ListItemButton sx={{ py: 1.5, pl: 4 }}>
                            <ListItemText
                              primary={child.title}
                              primaryTypographyProps={{
                                fontSize: "15px",
                                color: "#444",
                              }}
                            />
                            <ChevronRightIcon
                              sx={{ color: "#BDBDBD", fontSize: "20px" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Divider variant="inset" component="li" sx={{ ml: 4 }} />
                    </React.Fragment>
                  ))
                ) : (
                  <Typography sx={{ p: 2, fontSize: "14px", color: "#999" }}>
                    Подкатегории отсутствуют
                  </Typography>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
