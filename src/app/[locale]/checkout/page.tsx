/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

const Checkout = () => {
  const t = useTranslations("checkout");

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "+998",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Eskirgan skriptlarni tozalash (xatolik bermasligi uchun)
    const oldScript = document.getElementById("amoforms_script_1691062");
    if (oldScript) oldScript.remove();

    // 2. Yangi AmoCRM skriptini yaratish
    const script = document.createElement("script");
    script.id = "amoforms_script_1691062";
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1774943539";

    script.onload = () => {
      // 3. Yangi ID va HASH bilan parametrlarni o'rnatish
      (window as any).amo_forms_params = {
        id: "1691062",
        hash: "17626ac4310a113fb4c54bbac3379070",
        locale: "ru",
      };
    };

    document.body.appendChild(script);

    return () => {
      const currentScript = document.getElementById("amoforms_script_1691062");
      if (currentScript) currentScript.remove();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!value.startsWith("+998")) {
        setFormData({ ...formData, phone: "+998" });
        return;
      }
      const formattedValue = value.replace(/[^\d+]/g, "").slice(0, 13);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        // API manzili /app/api/checkout/route.ts ga mos
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(t("success") || "Muvaffaqiyatli!");
        setFormData({ name: "", phone: "+998", address: "" });
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        p: 4,
        "@media (max-width:900px)": { pt: 15 },
        width: "100%",
        bgcolor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "520px" }}>
        <Typography
          variant="h1"
          sx={{ fontWeight: 800, mb: 4, color: "#000", fontSize: "32px" }}
        >
          {t("title")}
        </Typography>

        {/* --- CUSTOM INPUTS (Sizning dizayningiz) --- */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
          gap={3}
          sx={{ mb: 4 }}
        >
          <CustomTextField
            label={t("name")}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <CustomTextField
            label={t("phone")}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
          />
          <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
            <CustomTextField
              label={t("address")}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Box>
        </Box>

        {/* --- AMOCRM FORM SECTION --- */}
        {/* <Box
          sx={{
            mt: 2,
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "16px",
            p: 2,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div id="amoforms_1691062"></div>
        </Box> */}

        {/* Eslatma: AmoCRM skripti o'zining "Yuborish" tugmasini chiqaradi. 
            Agar o'z tugmangizni ishlatmoqchi bo'lsangiz, uni quyida qoldirishingiz mumkin. */}
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: "#249FFC",
            color: "#fff",
            py: "14px",
            borderRadius: "18px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { bgcolor: "#0084ff" },
            minWidth: "100%",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            t("confirm")
          )}
        </Button>
      </Box>
    </Box>
  );
};

const CustomTextField = (props: any) => (
  <TextField
    {...props}
    fullWidth
    variant="outlined"
    InputProps={{
      sx: {
        borderRadius: "16px",
        bgcolor: "#fff",
        color: "#000",
        "& fieldset": { border: "none" },
        boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
        height: "60px",
      },
    }}
    InputLabelProps={{
      sx: { color: "#666", fontSize: "16px" },
      shrink: true,
    }}
  />
);

export default Checkout;
