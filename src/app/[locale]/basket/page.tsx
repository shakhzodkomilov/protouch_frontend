"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Paper,
  Breadcrumbs,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useTranslations } from "next-intl";

import {
  $basket,
  $basketLoading,
  loadBasket,
  removeFromBasket,
  updateQuantity,
} from "../../../entities/basket/model/store";

export default function BasketPage() {
  const { locale } = useParams();
  const t = useTranslations("basket");
  const router = useRouter();
  const { items, totalCount, totalPrice } = useUnit($basket);
  const loading = useUnit($basketLoading);
  const loadBasketEv = useUnit(loadBasket);
  const updateBasketQty = useUnit(updateQuantity);
  const removeBasketItem = useUnit(removeFromBasket);
  const [mounted, setMounted] = useState(false);
  console.log(`"Basket products" ${items}`);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    loadBasketEv();
  }, [loadBasketEv]);

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      removeBasketItem(productId);
    } else {
      updateBasketQty({ productId, quantity: newQty });
    }
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        py: 4,
        bgcolor: "#fff",
        minHeight: "100vh",
        "@media (max-width:800px)": {
          mt: 15,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
          <Link
            href={`/${locale}`}
            style={{ color: "#000", textDecoration: "none" }}
          >
            {t("breadcrumbs.home")}
          </Link>
          <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
            {t("breadcrumbs.basket")}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: "#000" }}>
          {t("title")}
        </Typography>

        {items.length === 0 && !loading ? (
          <Paper
            sx={{
              p: 10,
              textAlign: "center",
              borderRadius: 4,
              border: "1px dashed #ccc",
              elevation: 0,
              color: "#000",
            }}
          >
            <Typography variant="h6">{t("empty.title")}</Typography>
            <Button component={Link} href={`/${locale}`} sx={{ mt: 2 }}>
              {t("empty.button")}
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            {/* Left Side: Product Cards */}
            <Box
              sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              {items.map((item) => (
                <Paper
                  key={item.productId}
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid #E5EAF2",
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: 180,
                        height: 140,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            bgcolor: "#D6F2DB",
                            color: "#3BB351",
                            fontSize: "12px",
                            px: 1,
                            borderRadius: "4px",
                            display: "inline-block",
                            mb: 1,
                          }}
                        >
                          {t("inStock")}
                        </Typography>
                        <Box>
                          <IconButton size="small">
                            <BalanceIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <FavoriteBorderIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          mt: 2,
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        {/* <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#666",
                            mb: 2,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </Typography> */}
                        <Box
                          sx={{
                            textAlign: "right",
                            minWidth: "120px",
                            color: "#000",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#000" }}
                          >
                            {new Intl.NumberFormat("ru-RU").format(
                              item.price,
                            )}{" "}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {t("orderSummary.currency")}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          mb: 1,
                          color: "#000",
                        }}
                      >
                        {t("quantity")}
                      </Typography>

                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "8px",
                          p: "4px",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ bgcolor: "#F4F4F4", borderRadius: "8px" }}
                          onClick={() =>
                            handleQuantityChange(item.productId, -1)
                          }
                        >
                          <RemoveIcon fontSize="small" sx={{ color: "#000" }} />
                        </IconButton>
                        <Typography
                          sx={{ mx: 2, fontWeight: 600, color: "#000" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          sx={{ bgcolor: "#F4F4F4", borderRadius: "8px" }}
                          onClick={() =>
                            handleQuantityChange(item.productId, 1)
                          }
                        >
                          <AddIcon fontSize="small" sx={{ color: "#000" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* Right Side: Order Summary */}
            <Box sx={{ flex: 0.9 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, border: "1px solid #E5EAF2", borderRadius: "12px" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 3, color: "#000" }}
                >
                  {t("orderSummary.title")}
                </Typography>

                {/* Delivery Info Boxes */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#F8F9FA",
                      p: 2,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Image
                      src={"/Delivery.svg"}
                      width={24}
                      height={24}
                      alt="Delivery"
                    />
                    <Typography sx={{ fontSize: "13px", color: "#444" }}>
                      {t("orderSummary.delivery")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#F8F9FA",
                      p: 2,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Image
                      src={"/Pickup.svg"}
                      width={24}
                      height={24}
                      alt="Pickup"
                    />
                    <Typography sx={{ fontSize: "13px", color: "#444" }}>
                      {t("orderSummary.pickup")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#F8F9FA",
                      p: 2,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Image
                      src={"/Delivery.svg"}
                      width={24}
                      height={24}
                      alt="Regional Delivery"
                    />
                    <Typography sx={{ fontSize: "13px", color: "#444" }}>
                      {t("orderSummary.regionalDelivery")}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    color: "#000",
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "#999", fontSize: "14px" }}>
                      {t("orderSummary.total")}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {totalCount} {t("orderSummary.items")}
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {totalPrice.toLocaleString("ru-RU")}{" "}
                    {t("orderSummary.currency")}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/checkout")}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    bgcolor: "#249FFC",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                    "&:hover": { bgcolor: "#1a8ae5" },
                  }}
                >
                  {t("orderSummary.checkout")}
                </Button>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
