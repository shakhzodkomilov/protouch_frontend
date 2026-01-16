"use client";

import React from "react";
import { useUnit } from "effector-react";
import { useRouter, useParams } from "next/navigation"; // ✅ ADD THESE
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { $categories } from "../../../entities/product/model";
import { CategoryType } from "../../../entities/types/productService.types";

interface CatalogDropdownProps {
  isOpen: boolean;
  activeCategory: CategoryType | null;
  onCategoryHover: (category: CategoryType) => void;
  onClose: () => void;
}

export const CatalogDropdown: React.FC<CatalogDropdownProps> = ({
  isOpen,
  activeCategory,
  onCategoryHover,
  onClose,
}) => {
  const router = useRouter();
  const { locale } = useParams();
  const categories = useUnit($categories);

  if (!isOpen || categories.length === 0) return null;

  const handleCategoryClick = (slug: string) => {
    router.push(`/${locale}/catalog/${slug}`);
    onClose();
  };

  return (
    <>
      <Paper
        elevation={10}
        sx={{
          borderTop: "2px solid #2196f3",
          position: "absolute",
          top: "60px",
          left: 0,
          right: 0,
          display: "flex",
          minHeight: "500px",
          borderRadius: 2,
          color: "#000",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "300px",
            bgcolor: "#fff",
            borderRight: "1px solid #eee",
            py: 2,
          }}
        >
          <List disablePadding>
            {categories.map((cat) => (
              <ListItem key={cat.id} disablePadding>
                <ListItemButton
                  selected={activeCategory?.id === cat.id}
                  onMouseEnter={() => onCategoryHover(cat)}
                  sx={{
                    py: 1.5,
                    "&.Mui-selected": {
                      bgcolor: "#F0F8FF",
                      color: "#2196f3",
                      "&:hover": { bgcolor: "#E3F2FD" },
                    },
                  }}
                >
                  {cat.image && (
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <Image
                        src={cat.image.url}
                        alt={cat.title}
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={cat.title}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: activeCategory?.id === cat.id ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Side: Subcategories */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)", // ✅ Reduced from 6 for better UX
              gap: 3,
            }}
          >
            {activeCategory?.children?.map((child: any) => (
              <Box key={child.id}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mb: 1,
                    fontSize: "15px",
                    cursor: "pointer",
                    lineHeight: 1.4,
                    "&:hover": {
                      color: "#2196f3",
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => handleCategoryClick(child.slug)} // ✅ FIXED NAVIGATION
                >
                  {child.title}
                </Typography>
                {child.children?.map((subChild: any) => (
                  <Typography
                    key={subChild.id}
                    variant="body2"
                    sx={{
                      color: "#666",
                      mb: 0.5,
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": { color: "#2196f3" },
                    }}
                    onClick={() => handleCategoryClick(subChild.slug)} // ✅ Subchild navigation too
                  >
                    {subChild.title}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Overlay */}
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0,0,0,0.3)", // ✅ Better overlay
          zIndex: -1,
        }}
      />
    </>
  );
};
