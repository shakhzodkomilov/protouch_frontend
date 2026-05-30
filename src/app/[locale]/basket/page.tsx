"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUnit } from "effector-react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import { useTranslations } from "next-intl";

import {
  $basket,
  $basketLoading,
  loadBasket,
  removeFromBasket,
  updateQuantity,
} from "../../../entities/basket/model/store";
import BasketItemCard from "../../../shared/components/Basket/BasketItemCard";
import OrderSummary from "../../../shared/components/Basket/OrderSummary";
import CheckoutModal from "../../../shared/components/Checkout/CheckoutModal";
import { $isAuth, $user } from "../../../entities/form/model";
import { API_URL } from "../../../entities/config/base";

export default function BasketPage() {
  const { locale } = useParams();
  const t = useTranslations("basket");
  const checkoutT = useTranslations("checkout");
  const { items, totalCount, totalPrice } = useUnit($basket);
  const loading = useUnit($basketLoading);
  const isAuth = useUnit($isAuth);
  const user = useUnit($user);
  const loadBasketEv = useUnit(loadBasket);
  const updateBasketQty = useUnit(updateQuantity);
  const removeBasketItem = useUnit(removeFromBasket);
  const [mounted, setMounted] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
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

  const handleCheckoutClick = () => {
    const u = user as Record<string, unknown> | null;
    if (isAuth && u?.firstName && (u?.phone || u?.email)) {
      handleAutoSubmit();
    } else {
      setModalOpen(true);
    }
  };

  const handleAutoSubmit = async () => {
    setSubmitting(true);
    try {
      const productIds = items.map((item) => item.productId);
      const u = user as Record<string, unknown>;
      const isPartner = !!(u.companyName || u.partnerProfile);
      const body: Record<string, unknown> = {
        type: isPartner ? "LEGAL" : "INDIVIDUAL",
        phone: u.phone || u.email || "",
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        productIds,
        totalPrice,
      };
      if (isPartner) {
        body.companyName = u.companyName || "";
        body.inn = (u.partnerProfile as Record<string, unknown>)?.inn || "";
        body.region = (u.partnerProfile as Record<string, unknown>)?.region || "";
      }
      const res = await fetch(`${API_URL}/api/b2b-applications/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Ошибка при отправке данных");
      setOrderSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <Box sx={{ py: 12, textAlign: "center", bgcolor: "#fff", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 4,
        bgcolor: "#fff",
        minHeight: "100vh",
        "@media (max-width:800px)": { mt: 15 },
      }}
    >
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
          <Link href={`/${locale}`} style={{ color: "#000", textDecoration: "none" }}>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item) => (
                  <BasketItemCard
                    key={item.productId}
                    item={item}
                    quantityLabel={t("quantity")}
                    inStockLabel={t("inStock")}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </Box>

              <Box sx={{ flex: 0.9 }}>
                <OrderSummary
                  totalCount={totalCount}
                  totalPrice={totalPrice}
                  submitting={submitting}
                  deliveryLabel={t("orderSummary.delivery")}
                  pickupLabel={t("orderSummary.pickup")}
                  regionalDeliveryLabel={t("orderSummary.regionalDelivery")}
                  totalLabel={t("orderSummary.total")}
                  itemsLabel={t("orderSummary.items")}
                  currencyLabel={t("orderSummary.currency")}
                  checkoutLabel={t("orderSummary.checkout")}
                  onCheckout={handleCheckoutClick}
                />
              </Box>
            </Box>

            {orderSuccess && (
              <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: "12px", border: "1px solid #E5EAF2" }}>
                <Box sx={{ width: 72, height: 72, borderRadius: "50%", bgcolor: "#D6F2DB", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3BB351" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#111", mb: 1 }}>
                  {checkoutT("successTitle")}
                </Typography>
                <Typography sx={{ color: "#666", mb: 3 }}>
                  {checkoutT("successMessage")}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href={`/${locale}`}
                  sx={{
                    py: 1.5, px: 4, borderRadius: "10px", bgcolor: "#249FFC",
                    textTransform: "none", fontSize: "15px", fontWeight: 600,
                    color: "#fff", "&:hover": { bgcolor: "#1a8ae5" },
                  }}
                >
                  {t("orderForm.toCatalog")}
                </Button>
              </Paper>
            )}
          </Box>
        )}
      </Container>

      {/* ─── Checkout Modal ─── */}
      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setOrderSuccess(true)}
        totalPrice={totalPrice}
        productIds={items.map((item) => item.productId)}
      />
    </Box>
  );
}
