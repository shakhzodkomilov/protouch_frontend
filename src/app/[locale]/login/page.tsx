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
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import {
  clientLoginFx,
  partnerLoginFx,
  distributorLoginFx,
  $loginSuccess,
  resetAuthStatus,
} from "../../../entities/form/model";

export default function LoginPage() {
  const { locale } = useParams();
  const router = useRouter();

  const [logSuccess, reset] = useUnit([$loginSuccess, resetAuthStatus]);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (logSuccess) {
      router.push(`/${locale}/`);
      reset();
    }
  }, [logSuccess, locale, router, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setPending(true);
    setError(null);

    const attempts = [clientLoginFx, partnerLoginFx, distributorLoginFx];
    let lastError: string | null = null;

    for (const attempt of attempts) {
      try {
        await attempt({ login, password });
        return;
      } catch (err: any) {
        lastError =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          null;
      }
    }

    setError(lastError || "Login yoki parol xato");
    setPending(false);
  };

  const isValid = login.length >= 4 && password.length >= 6;

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      color: "#000",
      "&.Mui-focused fieldset": { borderColor: "#249FFC" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#249FFC" },
    "& .MuiInputBase-input": { color: "#000" },
  };

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
          {locale === "ru" ? "Вход" : "Kirish"}
        </Typography>
        <Typography
          sx={{ mb: 4, textAlign: "center", color: "#666", fontSize: "14px" }}
        >
          {locale === "ru"
            ? "Введите телефон или email и пароль"
            : "Telefon yoki email va parolni kiriting"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            label={locale === "ru" ? "Телефон или Email" : "Telefon yoki Email"}
            variant="outlined"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={pending}
            type="text"
            placeholder="+998331234567 yoki email@example.com"
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            label={locale === "ru" ? "Пароль" : "Parol"}
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            placeholder="••••••"
            sx={textFieldStyle}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid || pending}
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
            {pending ? (
              <CircularProgress size={24} color="inherit" />
            ) : locale === "ru" ? (
              "Войти"
            ) : (
              "Kirish"
            )}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: "center", color: "#666", fontSize: 14 }}>
          {locale === "ru"
            ? "Нет аккаунта?"
            : "Akkauntingiz yo'qmi?"}{" "}
          <Link
            href={`/${locale}/register`}
            style={{ color: "#249FFC", fontWeight: 600, textDecoration: "none" }}
          >
            {locale === "ru" ? "Зарегистрироваться" : "Ro'yxatdan o'tish"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
