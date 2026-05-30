"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL } from "../../../entities/config/base";

type CheckoutType = "individual" | "legal";

const REGIONS = [
  "г. Ташкент", "Ташкентская область", "Республика Каракалпакстан",
  "Андижанская область", "Бухарская область", "Джизакская область",
  "Кашкадарьинская область", "Навоийская область", "Наманганская область",
  "Самаркандская область", "Сурхандарьинская область", "Сырдарьинская область",
  "Ферганская область", "Хорезмская область",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 14,
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#f5f6f8",
};

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  totalPrice: number;
  productIds: number[];
}

export default function CheckoutModal({ open, onClose, onSuccess, totalPrice, productIds }: CheckoutModalProps) {
  const { locale } = useParams();
  const [checkoutType, setCheckoutType] = useState<CheckoutType>("individual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("+998");
    setInn("");
    setCompanyName("");
    setRegion("");
    setFormError(null);
    setCheckoutType("individual");
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+998")) v = "+998";
    if (v.length > 13) v = v.slice(0, 13);
    setPhone(v);
  };

  const handleInn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInn(e.target.value.replace(/\D/g, "").slice(0, 9));
  };

  const handleSubmitOrder = async () => {
    setFormError(null);
    if (firstName.trim().length < 1 || lastName.trim().length < 1) {
      setFormError(locale === "ru" ? "Заполните имя и фамилию" : "Ism va familiyani to'ldiring");
      return;
    }
    if (phone.length < 13) {
      setFormError(locale === "ru" ? "Введите номер телефона" : "Telefon raqamni to'liq kiriting");
      return;
    }
    if (checkoutType === "legal") {
      if (companyName.trim().length < 1) {
        setFormError(locale === "ru" ? "Введите название компании" : "Tashkilot nomini kiriting");
        return;
      }
      if (inn.length < 9) {
        setFormError(locale === "ru" ? "Введите ИНН (9 цифр)" : "INN (9 ta raqam) kiriting");
        return;
      }
      if (!region) {
        setFormError(locale === "ru" ? "Выберите регион" : "Hududni tanlang");
        return;
      }
    }

    setSubmitting(true);
    try {
      const isLegal = checkoutType === "legal";
      const body: Record<string, unknown> = {
        type: isLegal ? "LEGAL" : "INDIVIDUAL",
        phone,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        productIds,
        totalPrice,
      };
      if (isLegal) {
        body.inn = inn;
        body.companyName = companyName.trim();
        body.region = region;
      }
      const res = await fetch(`${API_URL}/api/b2b-applications/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Ошибка при отправке данных");
      onSuccess();
      onClose();
    } catch {
      setFormError(locale === "ru" ? "Ошибка при отправке" : "Yuborishda xatolik");
    } finally {
      setSubmitting(false);
    }
  };

  const isLegalType = checkoutType === "legal";
  const legalValid =
    phone.length >= 13 && inn.length >= 9 && companyName.trim() !== "" && region !== "" && firstName.trim() !== "" && lastName.trim() !== "";
  const individualValid = phone.length >= 13 && firstName.trim() !== "" && lastName.trim() !== "";
  const formValid = isLegalType ? legalValid : individualValid;

  const localeT = locale as string;
  const backLabel = localeT === "ru" ? "Назад" : "Orqaga";
  const submitLabel = localeT === "ru" ? "Отправить заявку" : "So'rov yuborish";
  const titleLabel = localeT === "ru" ? "Оформление заказа" : "Buyurtmani rasmiylashtirish";
  const typeLabel = localeT === "ru" ? "Тип заказа" : "Buyurtma turi";
  const individualLabel = localeT === "ru" ? "Физическое лицо" : "Jismoniy shaxs";
  const legalLabel = localeT === "ru" ? "Юридическое лицо" : "Yuridik shaxs";
  const nameLabel = localeT === "ru" ? "Имя" : "Ism";
  const surnameLabel = localeT === "ru" ? "Фамилия" : "Familiya";
  const phoneLabel = localeT === "ru" ? "Телефон" : "Telefon";
  const companyLabel = localeT === "ru" ? "Название компании" : "Tashkilot nomi";
  const innLabel = "ИНН";
  const regionLabel = localeT === "ru" ? "Регион" : "Hudud";
  const selectRegionLabel = localeT === "ru" ? "Выберите регион" : "Hududni tanlang";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", p: 2 } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6" component="span" fontWeight={700}>{titleLabel}</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {formError && <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>{formError}</Alert>}
        <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1.5, color: "#000" }}>{typeLabel}</Typography>
        <Box sx={{ display: "flex", bgcolor: "#F1F5F9", borderRadius: "12px", p: 0.5, mb: 3 }}>
          {(["individual", "legal"] as CheckoutType[]).map((t) => {
            const label = t === "individual" ? individualLabel : legalLabel;
            const active = checkoutType === t;
            return (
              <Box
                key={t}
                component="button"
                type="button"
                onClick={() => setCheckoutType(t)}
                sx={{
                  flex: 1, py: 1.2, borderRadius: "10px", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : "#64748B",
                  bgcolor: active ? "#249FFC" : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": active ? {} : { bgcolor: "rgba(36,159,252,0.1)", color: "#249FFC" },
                }}
              >
                {label}
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {nameLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Diyorbek" style={inputStyle} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {surnameLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Mansurov" style={inputStyle} />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
              {phoneLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
            </Typography>
            <input value={phone} onChange={handlePhone} type="tel" placeholder="+998 33 234 43 67" style={inputStyle} />
          </Box>
          {isLegalType && (
            <>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                  {companyLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
                </Typography>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='ООО "PROTOUCH SOLUTIONS"' style={inputStyle} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                  {innLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
                </Typography>
                <input value={inn} onChange={handleInn} placeholder="309876543" maxLength={9} inputMode="numeric" style={inputStyle} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                  {regionLabel}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={region}
                    displayEmpty
                    onChange={(e) => setRegion(e.target.value as string)}
                    sx={{ borderRadius: "10px", color: region ? "#111" : "#999", bgcolor: "#f5f6f8", fontSize: 14, "& fieldset": { border: "none" }, height: "48px", "& .MuiSelect-select": { py: 1.5 } }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300, borderRadius: "12px", mt: 0.5 } } }}
                  >
                    <MenuItem value="" disabled>{selectRegionLabel}</MenuItem>
                    {REGIONS.map((r) => <MenuItem key={r} value={r} sx={{ fontSize: 14, color: "#111" }}>{r}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button fullWidth variant="outlined" onClick={onClose}
              sx={{ py: "14px", borderRadius: "12px", textTransform: "none", fontSize: 15, fontWeight: 600, color: "#888", borderColor: "#e0e0e0", "&:hover": { borderColor: "#999", bgcolor: "#fafafa" } }}>
              {backLabel}
            </Button>
            <Button fullWidth onClick={handleSubmitOrder} disabled={!formValid || submitting}
              sx={{ bgcolor: "#2563EB", color: "#fff", py: "14px", borderRadius: "12px", fontWeight: 600, textTransform: "none", fontSize: 15, "&:hover": { bgcolor: "#1d4ed8" }, "&.Mui-disabled": { bgcolor: "#bfdbfe", color: "#fff" } }}>
              {submitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : submitLabel}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
