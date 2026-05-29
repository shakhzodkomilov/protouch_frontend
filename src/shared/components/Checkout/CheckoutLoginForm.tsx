/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useUnit } from "effector-react";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { partnerLoginFx } from "../../../entities/form/model";
import { StyledField } from "./StyledField";

interface Props {
  t: (key: string) => string;
  onLoginSuccess: (user: any, phone: string) => void;
}

export default function CheckoutLoginForm({ t, onLoginSuccess }: Props) {
  const partnerLogin = useUnit(partnerLoginFx);

  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+998")) v = "+998";
    if (v.length > 13) v = v.slice(0, 13);
    setPhone(v);
  };

  const valid = phone.length >= 13 && password.length >= 6;

  const handleLogin = async () => {
    if (!valid) return;
    setLoading(true);
    setError(null);
    try {
      const result = await partnerLogin({ login: phone, password });
      onLoginSuccess(result.user, phone);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Telefon yoki parol noto'g'ri",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 3 }}>
      <Typography sx={{ fontSize: 14, color: "#666", mb: -1 }}>
        {t("loginSubtitle")}
      </Typography>

      <StyledField
        label={t("phone")}
        required
        value={phone}
        onChange={handlePhone}
        type="tel"
        placeholder="+998 33 234 43 67"
      />

      <StyledField
        label={t("password")}
        required
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          setError(null);
        }}
        type="password"
        placeholder="••••••••"
      />

      {error && (
        <Alert severity="error" sx={{ borderRadius: "10px", fontSize: 13 }}>
          {error}
        </Alert>
      )}

      <Button
        fullWidth
        onClick={handleLogin}
        disabled={!valid || loading}
        sx={{
          bgcolor: "#2563EB",
          color: "#fff",
          py: "14px",
          borderRadius: "12px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: 15,
          "&:hover": { bgcolor: "#1d4ed8" },
          "&.Mui-disabled": { bgcolor: "#bfdbfe", color: "#fff" },
        }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : t("loginBtn")}
      </Button>
    </Box>
  );
}
