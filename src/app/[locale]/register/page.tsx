"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import { useGoogleLogin } from "@react-oauth/google"; // Google hook
import {
  registerFx,
  authGoogleFx,
  $authError,
  $isAuthPending,
  $registerSuccess,
  $loginSuccess,
  resetAuthStatus,
} from "../../../entities/form/model";

export default function RegisterPage() {
  const { locale } = useParams();
  const router = useRouter();

  // Effector units
  const [
    handleRegister,
    handleGoogleAuth,
    pending,
    error,
    regSuccess,
    logSuccess,
    reset,
  ] = useUnit([
    registerFx,
    authGoogleFx,
    $isAuthPending,
    $authError,
    $registerSuccess,
    $loginSuccess,
    resetAuthStatus,
  ]);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Yo'naltirish mantiqi
  useEffect(() => {
    if (regSuccess) {
      router.push(`/${locale}/login`);
      reset();
    }
    if (logSuccess) {
      router.push(`/${locale}/`);
      reset();
    }
    return () => reset();
  }, [regSuccess, logSuccess, locale, router, reset]);

  // Google login funksiyasi
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleAuth(tokenResponse.access_token);
    },
    onError: () => console.log("Google Auth Failed"),
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (/\d/.test(input)) {
      if (!input.startsWith("+998 ")) input = "+998 " + input;
    }
    if (input.trim() === "" || input === "+998 ") {
      setFormData({ ...formData, emailOrPhone: "" });
      return;
    }
    setFormData({ ...formData, emailOrPhone: input });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      email_or_phone: formData.emailOrPhone.replace("+", "").replace(/\s/g, ""),
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };
    handleRegister(submitData);
  };

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
        component="form"
        onSubmit={onSubmit}
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
          Создать аккаунт
        </Typography>
        <Typography
          sx={{ mb: 4, textAlign: "center", color: "#666", fontSize: "14px" }}
        >
          Присоединяйтесь к нам и получайте бонусы
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="Email yoki Telefon"
            variant="outlined"
            value={formData.emailOrPhone}
            onChange={handlePhoneNumberChange}
            disabled={pending}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={pending}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Подтвердите пароль"
            type="password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={pending}
            sx={textFieldStyle}
            error={
              formData.confirmPassword !== "" &&
              formData.password !== formData.confirmPassword
            }
            helperText={
              formData.confirmPassword !== "" &&
              formData.password !== formData.confirmPassword
                ? "Пароли не совпадают"
                : ""
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                sx={{ color: "#249FFC", "&.Mui-checked": { color: "#249FFC" } }}
              />
            }
            label={
              <Typography variant="body2" color="#000">
                Я согласен с{" "}
                <Link
                  href="#"
                  style={{ color: "#249FFC", textDecoration: "none" }}
                >
                  условиями
                </Link>
              </Typography>
            }
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={
              !formData.emailOrPhone ||
              !formData.password ||
              !isChecked ||
              pending
            }
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
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 4, fontSize: "13px", color: "#999" }}>Или</Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => loginWithGoogle()}
          disabled={pending}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            borderColor: "#ddd",
            color: "#000",
            textTransform: "none",
            "&:hover": { borderColor: "#249FFC", bgcolor: "#f9f9f9" },
          }}
        >
          {pending ? <CircularProgress size={20} /> : "Войти через Google"}
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 4, textAlign: "center", color: "#666" }}
        >
          Уже есть аккаунт?{" "}
          <Link
            href={`/${locale}/login`}
            style={{
              color: "#249FFC",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Войти
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
