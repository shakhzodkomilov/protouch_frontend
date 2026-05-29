"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SmsIcon from "@mui/icons-material/Sms";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslations } from "next-intl";

import { $isAuth, $user, $isDistributor, logout, $applications, $applicationsLoading, loadApplications } from "../../../entities/form/model";
import { $basket, loadBasket } from "../../../entities/basket/model/store";
import { $favoritesCount, loadFavorites } from "../../../entities/favourite/model/store";
import { API_URL } from "../../../entities/config/base";

export default function ProfilePage() {
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations("profile");

  const isAuth = useUnit($isAuth);
  const user = useUnit($user);
  const isDistributor = useUnit($isDistributor);
  const logoutEv = useUnit(logout);
  const basket = useUnit($basket);
  const favoritesCount = useUnit($favoritesCount);
  const loadBasketEv = useUnit(loadBasket);
  const loadFavoritesEv = useUnit(loadFavorites);
  const applications = useUnit($applications);
  const appsLoading = useUnit($applicationsLoading);
  const loadApplicationsEv = useUnit(loadApplications);

  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (isAuth) {
      loadBasketEv();
      loadFavoritesEv();
      loadApplicationsEv();
    }
  }, [isAuth, loadBasketEv, loadFavoritesEv, loadApplicationsEv]);

  if (!isAuth) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: "#000" }}>
            {locale === "ru" ? "Вы не авторизованы" : "Siz avtorizatsiyadan o'tmagansiz"}
          </Typography>
          <Typography sx={{ color: "#666", mb: 4 }}>
            {locale === "ru"
              ? "Войдите в аккаунт, чтобы просматривать профиль"
              : "Profilingizni ko'rish uchun tizimga kiring"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              component={Link}
              href={`/${locale}/login`}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: "12px",
                bgcolor: "#249FFC",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#1E8BD8" },
              }}
            >
              {locale === "ru" ? "Войти" : "Kirish"}
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href={`/${locale}/register`}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#249FFC",
                color: "#249FFC",
                "&:hover": { borderColor: "#1E8BD8", bgcolor: "rgba(36,159,252,0.04)" },
              }}
            >
              {locale === "ru" ? "Зарегистрироваться" : "Ro'yxatdan o'tish"}
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  const u = user as Record<string, unknown> | null;
  const userName: string = ([u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.email || u?.phone || "") as string;
  const role = u?.role as string || "";
  const roleLabel =
    role === "DISTRIBUTOR"
      ? locale === "ru" ? "Дилер" : "Diller"
      : role === "PARTNER"
        ? locale === "ru" ? "Партнёр" : "Hamkor"
        : locale === "ru" ? "Клиент" : "Mijoz";

  const hasBasketItems = basket.items.length > 0;

  const handleSubmitApplication = async () => {
    setSubmitting(true);
    try {
      const productIds = basket.items.map((item) => item.productId);
      const body: Record<string, unknown> = {
        type: role === "PARTNER" || role === "DISTRIBUTOR" ? "LEGAL" : "INDIVIDUAL",
        phone: u?.phone || u?.email || "",
        firstName: u?.firstName || "",
        lastName: u?.lastName || "",
        productIds,
        totalPrice: basket.totalPrice,
      };
      if (role === "PARTNER" || role === "DISTRIBUTOR") {
        body.companyName = u?.companyName || "";
        body.inn = (u?.partnerProfile as Record<string, unknown>)?.inn || "";
        body.region = (u?.partnerProfile as Record<string, unknown>)?.region || "";
      }
      const res = await fetch(`${API_URL}/api/b2b-applications/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Submit failed");
      setOrderSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        {/* ─── Profile Header ─── */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            boxShadow: "0px 4px 24px rgba(0,0,0,0.06)",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3, flexWrap: "wrap" }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "#E3F2FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 36, color: "#249FFC" }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#000" }}>
                {userName || (locale === "ru" ? "Пользователь" : "Foydalanuvchi")}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                <Chip
                  label={roleLabel}
                  size="small"
                  sx={{
                    bgcolor: isDistributor ? "#FFF3E0" : "#E8F5E9",
                    color: isDistributor ? "#E65100" : "#2E7D32",
                    fontWeight: 600,
                  }}
                />
                {isDistributor && (
                  <Chip
                    icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
                    label={locale === "ru" ? "Дилерские цены" : "Diler narxlari"}
                    size="small"
                    sx={{ bgcolor: "#E3F2FD", color: "#1565C0", fontWeight: 600 }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {u?.phone && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: 20, color: "#999" }} />
                <Typography sx={{ fontSize: 15, color: "#333" }}>
                  {u.phone as string}
                </Typography>
              </Box>
            )}
            {u?.email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon sx={{ fontSize: 20, color: "#999" }} />
                <Typography sx={{ fontSize: 15, color: "#333" }}>
                  {u.email as string}
                </Typography>
              </Box>
            )}
            {(u?.companyName || (u?.partnerProfile as Record<string, unknown>)?.inn) && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <BusinessIcon sx={{ fontSize: 20, color: "#999" }} />
                <Typography sx={{ fontSize: 15, color: "#333" }}>
                  {[u?.companyName, (u?.partnerProfile as Record<string, unknown>)?.inn ? `INN: ${(u?.partnerProfile as Record<string, unknown>)?.inn}` : ""]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

        {/* ─── Quick Links ─── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <Paper
            component={Link}
            href={`/${locale}/basket`}
            sx={{
              p: 3,
              borderRadius: 3,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: "0px 2px 12px rgba(0,0,0,0.04)",
              "&:hover": { boxShadow: "0px 4px 20px rgba(0,0,0,0.08)" },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                bgcolor: "#E3F2FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ color: "#249FFC" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                {t("basket")}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#888" }}>
                {basket.totalCount > 0
                  ? `${basket.totalCount} ${locale === "ru" ? "товаров" : "ta mahsulot"} · ${basket.totalPrice.toLocaleString()} ${locale === "ru" ? "сум" : "so'm"}`
                  : locale === "ru"
                    ? "Корзина пуста"
                    : "Savatcha bo'sh"}
              </Typography>
            </Box>
          </Paper>

          <Paper
            component={Link}
            href={`/${locale}/favorites`}
            sx={{
              p: 3,
              borderRadius: 3,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: "0px 2px 12px rgba(0,0,0,0.04)",
              "&:hover": { boxShadow: "0px 4px 20px rgba(0,0,0,0.08)" },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                bgcolor: "#FCE4EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FavoriteBorderIcon sx={{ color: "#E91E63" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                {t("favorites")}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#888" }}>
                {favoritesCount > 0
                  ? `${favoritesCount} ${locale === "ru" ? "товаров" : "ta mahsulot"}`
                  : locale === "ru"
                    ? "Нет избранных"
                    : "Sevimlilar yo'q"}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* ─── Applications History ─── */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            boxShadow: "0px 4px 24px rgba(0,0,0,0.06)",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ color: "#000", mb: 2 }}>
            {locale === "ru" ? "История заявок" : "So'rovlar tarixi"}
          </Typography>

          {appsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={32} sx={{ color: "#249FFC" }} />
            </Box>
          ) : applications.length === 0 ? (
            <Typography sx={{ color: "#999", fontSize: 14, textAlign: "center", py: 4 }}>
              {locale === "ru"
                ? "У вас пока нет заявок"
                : "Sizda hozircha so'rovlar yo'q"}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {applications.map((app) => {
                const statusLabel =
                  app.status === "APPROVED"
                    ? locale === "ru" ? "Одобрено" : "Tasdiqlangan"
                    : app.status === "PENDING"
                      ? locale === "ru" ? "В обработке" : "Ko'rib chiqilmoqda"
                      : app.status === "REJECTED"
                        ? locale === "ru" ? "Отклонено" : "Rad etilgan"
                        : app.status;
                const statusColor =
                  app.status === "APPROVED"
                    ? "#E8F5E9"
                    : app.status === "PENDING"
                      ? "#FFF3E0"
                      : app.status === "REJECTED"
                        ? "#FFEBEE"
                        : "#F5F5F5";
                const statusTextColor =
                  app.status === "APPROVED"
                    ? "#2E7D32"
                    : app.status === "PENDING"
                      ? "#E65100"
                      : app.status === "REJECTED"
                        ? "#C62828"
                        : "#666";

                const dateStr = new Date(app.createdAt).toLocaleDateString(
                  locale === "ru" ? "ru-RU" : "uz-UZ",
                  { day: "numeric", month: "long", year: "numeric" },
                );

                return (
                  <Paper
                    key={app.id}
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      borderColor: "#E5EAF2",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                          {locale === "ru" ? "Заявка" : "So'rov"} №{app.id}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.3 }}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: "#999" }} />
                          <Typography sx={{ fontSize: 12, color: "#999" }}>
                            {dateStr}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={statusLabel}
                        size="small"
                        sx={{
                          bgcolor: statusColor,
                          color: statusTextColor,
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
                      <Inventory2Icon sx={{ fontSize: 15, color: "#666" }} />
                      <Typography sx={{ fontSize: 13, color: "#555" }}>
                        {app.products && app.products.length > 0
                          ? app.products.map((p) => p.name).join(", ")
                          : `${app.productIds?.length || 0} ${locale === "ru" ? "товаров" : "ta mahsulot"}`}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <CreditCardIcon sx={{ fontSize: 15, color: "#999" }} />
                          <Typography sx={{ fontSize: 13, color: "#555" }}>
                            {app.type === "LEGAL"
                              ? locale === "ru" ? "Юр. лицо" : "Yuridik shaxs"
                              : locale === "ru" ? "Физ. лицо" : "Jismoniy shaxs"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <SmsIcon sx={{ fontSize: 15, color: "#999" }} />
                          <Typography sx={{ fontSize: 13, color: "#555" }}>
                            {app.phone}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#249FFC" }}>
                        {app.totalPrice?.toLocaleString()} {locale === "ru" ? "сум" : "so'm"}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          )}
        </Paper>

        {/* ─── B2B Application ─── */}
        {hasBasketItems && !orderSuccess && (
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              boxShadow: "0px 4px 24px rgba(0,0,0,0.06)",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ color: "#000", mb: 1 }}>
              {locale === "ru" ? "У вас есть товары в корзине" : "Savatchangizda mahsulotlar bor"}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666", mb: 3 }}>
              {locale === "ru"
                ? `Всего ${basket.totalCount} товаров на сумму ${basket.totalPrice.toLocaleString()} сум`
                : `Jami ${basket.totalCount} ta mahsulot, ${basket.totalPrice.toLocaleString()} so'm`}
            </Typography>
            <Button
              fullWidth
              onClick={handleSubmitApplication}
              disabled={submitting}
              sx={{
                bgcolor: "#25C261",
                color: "#fff",
                py: 1.6,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
                "&:hover": { bgcolor: "#1FA754" },
                "&.Mui-disabled": { bgcolor: "#bfdbfe", color: "#fff" },
              }}
            >
              {submitting ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                <>
                  <DescriptionOutlinedIcon sx={{ mr: 1 }} />
                  {locale === "ru" ? "Отправить заявку" : "So'rov yuborish"}
                </>
              )}
            </Button>
          </Paper>
        )}

        {orderSuccess && (
          <Alert severity="success" sx={{ borderRadius: "12px", mb: 3, fontWeight: 600 }}>
            {locale === "ru"
              ? "Заявка принята! Мы свяжемся с вами в ближайшее время."
              : "So'rov qabul qilindi! Tez orada siz bilan bog'lanamiz."}
          </Alert>
        )}

        {/* ─── Logout ─── */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            logoutEv();
            router.push(`/${locale}/`);
          }}
          sx={{
            py: 1.6,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            borderColor: "#FF5252",
            color: "#FF5252",
            "&:hover": {
              borderColor: "#D32F2F",
              bgcolor: "rgba(255,82,82,0.04)",
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          {locale === "ru" ? "Выйти из аккаунта" : "Hisobdan chiqish"}
        </Button>
      </Container>
    </Box>
  );
}
