"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Product, PaginationType } from "../../../entities/product/model/types";

interface SearchResultsProps {
  products: PaginationType | null;
  searchQuery: string;
  noResults: string;
  onItemClick: () => void;
}

export default function SearchResults({ products, searchQuery, noResults, onItemClick }: SearchResultsProps) {
  const { locale } = useParams();

  const hasResults = products?.results && products.results.length > 0;

  return (
    <List sx={{ p: 0 }}>
      {hasResults ? (
        products.results.slice(0, 10).map((product: Product) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={onItemClick}
          >
            <ListItem disablePadding divider>
              <ListItemButton sx={{ py: 1.5, gap: 2 }}>
                <Avatar
                  src={product.image}
                  variant="rounded"
                  sx={{ width: 45, height: 45, bgcolor: "#f5f5f5", p: 0.5 }}
                />
                <ListItemText
                  primary={product.title}
                  secondary={`${new Intl.NumberFormat("ru-RU").format(Number(product.price))} сум`}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "14px", noWrap: true }}
                  secondaryTypographyProps={{ color: "#2196f3", fontWeight: 700 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))
      ) : (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography sx={{ color: "#999", fontSize: "14px" }}>
            {noResults} &lsquo;{searchQuery}&rsquo;
          </Typography>
        </Box>
      )}
    </List>
  );
}
