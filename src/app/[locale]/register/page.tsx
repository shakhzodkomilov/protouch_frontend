"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import { clientRegisterFx, partnerRegisterFx, $loginSuccess, resetAuthStatus } from "../../../entities/form/model";

type Tab = "individual" | "legal";

const REGIONS = [
  "г. Ташкент", "Ташкентская область", "Республика Каракалпакстан",
  "Андижанская область", "Бухарская область", "Джизакская область",
  "Кашкадарьинская область", "Навоийская область", "Наманганская область",
  "Самаркандская область", "Сурхандарьинская область", "Сырдарьинская область",
  "Ферганская область", "Хорезмская область",
];

export default function RegisterPage() {
  const { locale } = useParams();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("individual");
  const [phone, setPhone] = useState("+998");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [logSuccess, reset] = useUnit([$loginSuccess, resetAuthStatus]);

  useEffect(() => {
    if (logSuccess) {
      router.push(`/${locale}/`);
      reset();
    }
  }, [logSuccess, locale, router, reset]);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+998")) v = "+998";
    if (v.length > 13) v = v.slice(0, 13);
    setPhone(v);
  };

  const handleInn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInn(e.target.value.replace(/\D/g, "").slice(0, 9));
  };

  const individualValid =
    phone.length >= 13 &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    password.length >= 6 &&
    password === confirmPassword;

  const legalValid =
    individualValid &&
    inn.length >= 9 &&
    companyName.trim() !== "" &&
    region !== "";

  const isValid = tab === "legal" ? legalValid : individualValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      if (tab === "individual") {
        await clientRegisterFx({
          phone,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          password,
        });
      } else {
        await partnerRegisterFx({
          phone,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          password,
          companyName: companyName.trim(),
          inn,
          region,
        });
      }
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Ro'yxatdan o'tishda xatolik",
      );
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      color: "#000",
      "&:hover fieldset": { borderColor: "#0C4DFD" },
      "&.Mui-focused fieldset": { borderColor: "#249FFC" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#249FFC" },
    "& .MuiInputBase-input": { color: "#000" },
  };

  const tabStyle = (active: boolean) => ({
    py: 1.2,
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    color: active ? "#fff" : "#64748B",
    bgcolor: active ? "#249FFC" : "transparent",
    transition: "all 0.2s ease",
    "&:hover": active ? {} : { bgcolor: "rgba(36,159,252,0.1)", color: "#249FFC" },
  });

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "#D6F2DB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3BB351" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Box>
          <Typography variant="h6" fontWeight={700} color="#111" mb={1}>
            {locale === "ru" ? "Регистрация завершена!" : "Ro'yxatdan o'tish yakunlandi!"}
          </Typography>
          <Typography color="#666" mb={3}>
            {locale === "ru"
              ? "Вы будете перенаправлены на главную"
              : "Bosh sahifaga yo'naltirilasiz"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push(`/${locale}/`)}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "10px",
              bgcolor: "#249FFC",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#1a8ae5" },
            }}
          >
            {locale === "ru" ? "На главную" : "Bosh sahifaga"}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Link href={`/${locale}`}>
            <Image
              src="/LOGOPROTOUCH.svg"
              width={160}
              height={60}
              alt="Logo"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Box>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 1, textAlign: "center", color: "#000" }}
        >
          {locale === "ru" ? "Регистрация" : "Ro'yxatdan o'tish"}
        </Typography>
        <Typography
          sx={{ mb: 4, textAlign: "center", color: "#666", fontSize: "14px" }}
        >
          {locale === "ru"
            ? "Выберите тип и заполните данные"
            : "Turini tanlang va ma'lumotlarni to'ldiring"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            bgcolor: "#F1F5F9",
            borderRadius: "12px",
            p: 0.5,
            mb: 3,
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => setTab("individual")}
            sx={{ flex: 1, ...tabStyle(tab === "individual") }}
          >
            {locale === "ru" ? "Физическое лицо" : "Jismoniy shaxs"}
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => setTab("legal")}
            sx={{ flex: 1, ...tabStyle(tab === "legal") }}
          >
            {locale === "ru" ? "Юридическое лицо" : "Yuridik shaxs"}
          </Box>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={locale === "ru" ? "Имя" : "Ism"}
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              placeholder="Diyorbek"
              sx={{ flex: 1, ...textFieldStyle }}
            />
            <TextField
              label={locale === "ru" ? "Фамилия" : "Familiya"}
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
              placeholder="Mansurov"
              sx={{ flex: 1, ...textFieldStyle }}
            />
          </Box>

          <TextField
            label={locale === "ru" ? "Телефон" : "Telefon"}
            required
            value={phone}
            onChange={handlePhone}
            disabled={loading}
            type="tel"
            placeholder="+998 33 234 43 67"
            sx={textFieldStyle}
          />

          {tab === "legal" && (
            <>
              <TextField
                label={locale === "ru" ? "Название компании" : "Tashkilot nomi"}
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={loading}
                placeholder='ООО "PROTOUCH SOLUTIONS"'
                sx={textFieldStyle}
              />
              <TextField
                label="ИНН"
                required
                value={inn}
                onChange={handleInn}
                disabled={loading}
                placeholder="309876543"
                inputProps={{ maxLength: 9, inputMode: "numeric" }}
                sx={textFieldStyle}
              />
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    fontSize: 14,
                    color: region ? "#2563EB" : "#999",
                    "&.Mui-focused": { color: "#2563EB" },
                    "&.MuiInputLabel-shrink": { color: "#2563EB" },
                  }}
                  id="region-label"
                >
                  {locale === "ru" ? "Выберите регион" : "Hududni tanlang"}
                </InputLabel>
                <Select
                  labelId="region-label"
                  value={region}
                  label={locale === "ru" ? "Выберите регион" : "Hududni tanlang"}
                  onChange={(e) => setRegion(e.target.value as string)}
                  sx={{
                    borderRadius: "12px",
                    color: region ? "#111" : "#999",
                    bgcolor: "#f5f6f8",
                    fontSize: 14,
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&.Mui-focused fieldset": { borderColor: "#249FFC" },
                    "& .MuiSelect-select": { py: 1.5 },
                  }}
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: 300, borderRadius: "12px", mt: 0.5 } },
                  }}
                >
                  {REGIONS.map((r) => (
                    <MenuItem key={r} value={r} sx={{ fontSize: 14, color: "#111" }}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <TextField
            label={locale === "ru" ? "Пароль" : "Parol"}
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••"
            sx={textFieldStyle}
          />

          <TextField
            label={locale === "ru" ? "Подтвердите пароль" : "Parolni tasdiqlang"}
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••"
            error={confirmPassword !== "" && password !== confirmPassword}
            helperText={
              confirmPassword !== "" && password !== confirmPassword
                ? locale === "ru"
                  ? "Пароли не совпадают"
                  : "Parollar mos emas"
                : ""
            }
            sx={textFieldStyle}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid || loading}
            sx={{
              py: 1.6,
              bgcolor: "#249FFC",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              "&:hover": { bgcolor: "#1E8BD8" },
              "&.Mui-disabled": {
                bgcolor: "rgba(36, 159, 252, 0.5)",
                color: "#fff",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : locale === "ru" ? (
              "Зарегистрироваться"
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: "center", color: "#666", fontSize: 14 }}>
          {locale === "ru"
            ? "Уже есть аккаунт?"
            : "Akkauntingiz bormi?"}{" "}
          <Link
            href={`/${locale}/login`}
            style={{ color: "#249FFC", fontWeight: 600, textDecoration: "none" }}
          >
            {locale === "ru" ? "Войти" : "Kirish"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
