"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import {
  loginFx,
  $authError,
  $isAuthPending,
  $loginSuccess,
  resetAuthStatus,
} from "../../../entities/form/model";

export default function LoginPage() {
  const { locale } = useParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [handleLogin, pending, error, isSuccess, reset] = useUnit([
    loginFx,
    $isAuthPending,
    $authError,
    $loginSuccess,
    resetAuthStatus,
  ]);

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/${locale}/`);
      reset();
    }
    return () => reset();
  }, [isSuccess, locale, router, reset]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (/\d/.test(input)) {
      if (!input.startsWith("+998 ")) {
        input = "+998 " + input;
      }
    }
    if (input.trim() === "" || input === "+998 ") {
      setLoginData({ ...loginData, emailOrPhone: "" });
      return;
    }
    if (/\d/.test(input) && /[a-zA-Zа-яА-Я]/.test(input)) {
      input = input.replace("+998 ", "");
    }
    setLoginData({ ...loginData, emailOrPhone: input });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      email_or_phone: loginData.emailOrPhone
        .replace("+", "")
        .replace(/\s/g, ""),
      password: loginData.password,
    };
    handleLogin(submitData);
  };

  // Yozuvlar rangi #000 bo'lishi uchun stil
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      color: "#000", // Asosiy matn rangi
      "&.Mui-focused fieldset": { borderColor: "#249FFC" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#249FFC" },
    "& .MuiInputBase-input": {
      color: "#000", // Input ichiga yozilayotgan qiymat rangi
      "&::placeholder": { opacity: 0.7 },
    },
  };

  const handleGoogleClick = () => {
    console.log("Google Login clicked");
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 10 } }}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
          bgcolor: "#fff",
          textAlign: "center",
        }}
      >
        <Link href={`/${locale}`}>
          <Image
            src="/LOGOPROTOUCH.svg"
            width={160}
            height={60}
            alt="Logo"
            style={{ marginBottom: "24px", objectFit: "contain" }}
          />
        </Link>

        <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: "#000" }}>
          Вход в систему
        </Typography>
        <Typography sx={{ mb: 4, color: "#666", fontSize: "14px" }}>
          Введите свои данные, чтобы продолжить покупки
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="Email yoki Телефон"
            variant="outlined"
            value={loginData.emailOrPhone}
            onChange={handlePhoneNumberChange}
            disabled={pending}
            sx={textFieldStyle}
            placeholder="+998"
          />

          <TextField
            fullWidth
            label="Пароль"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            disabled={pending}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right" }}>
            <Link
              href="#"
              style={{
                color: "#249FFC",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Забыли пароль?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={!loginData.emailOrPhone || !loginData.password || pending}
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
            {pending ? <CircularProgress size={24} color="inherit" /> : "Войти"}
          </Button>
        </Box>

        <Divider sx={{ my: 4, color: "#999", fontSize: "13px" }}>
          Или войти через
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleClick}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            borderColor: "#ddd",
            color: "#000",
            textTransform: "none",
            "&:hover": { borderColor: "#249FFC", bgcolor: "#f9f9f9" },
          }}
        >
          Войти через Google
        </Button>

        <Typography variant="body2" color="#666" sx={{ mt: 4 }}>
          Нет аккаунта?{" "}
          <Link
            href={`/${locale}/register`}
            style={{
              color: "#249FFC",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
