"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Typography,
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

const REGIONS = [
  "г. Ташкент", "Ташкентская область", "Республика Каракалпакстан",
  "Андижанская область", "Бухарская область", "Джизакская область",
  "Кашкадарьинская область", "Навоийская область", "Наманганская область",
  "Самаркандская область", "Сурхандарьинская область", "Сырдарьинская область",
  "Ферганская область", "Хорезмская область",
];

const dillerInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 14,
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#f5f6f8",
};

interface DillerDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DillerDialog({ open, onClose }: DillerDialogProps) {
  const { locale } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [company, setCompany] = useState("");
  const [inn, setInn] = useState("");
  const [region, setRegion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("+998");
    setCompany("");
    setInn("");
    setRegion("");
    setError(null);
    setSuccess(false);
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

  const handleSubmit = async () => {
    setError(null);
    if (!firstName.trim() || !lastName.trim()) {
      setError(locale === "ru" ? "Заполните имя и фамилию" : "Ism va familiyani to'ldiring");
      return;
    }
    if (phone.length < 13) {
      setError(locale === "ru" ? "Введите номер телефона" : "Telefon raqamni to'liq kiriting");
      return;
    }
    if (!company.trim()) {
      setError(locale === "ru" ? "Введите название компании" : "Tashkilot nomini kiriting");
      return;
    }
    if (inn.length < 9) {
      setError(locale === "ru" ? "Введите ИНН (9 цифр)" : "INN (9 ta raqam) kiriting");
      return;
    }
    if (!region) {
      setError(locale === "ru" ? "Выберите регион" : "Hududni tanlang");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/b2b-applications/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "LEGAL",
          role: "DISTRIBUTOR",
          phone,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          companyName: company.trim(),
          inn,
          region,
          productIds: [],
          totalPrice: 0,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSuccess(true);
    } catch {
      setError(locale === "ru" ? "Ошибка при отправке" : "Yuborishda xatolik");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", p: 2 } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6" component="span" fontWeight={700}>
          {locale === "ru" ? "Заявка на дилерство" : "Diller bo'lish uchun so'rov"}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {success ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Box sx={{ width: 72, height: 72, borderRadius: "50%", bgcolor: "#D6F2DB", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3BB351" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Box>
            <Typography variant="h6" fontWeight={700} color="#111" mb={1}>
              {locale === "ru" ? "Заявка принята!" : "So'rov qabul qilindi!"}
            </Typography>
            <Typography color="#666" mb={3}>
              {locale === "ru" ? "Спасибо! Мы свяжемся с вами." : "Rahmat! Tez orada siz bilan bog'lanamiz."}
            </Typography>
            <Button variant="contained" onClick={() => { handleClose(); resetForm(); }}
              sx={{ py: 1.5, px: 4, borderRadius: "10px", bgcolor: "#249FFC", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#1a8ae5" } }}>
              Ok
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && <Alert severity="error" sx={{ borderRadius: "10px" }}>{error}</Alert>}
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                  {locale === "ru" ? "Имя" : "Ism"}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
                </Typography>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Diyorbek" style={dillerInputStyle} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                  {locale === "ru" ? "Фамилия" : "Familiya"}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
                </Typography>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Mansurov" style={dillerInputStyle} />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {locale === "ru" ? "Телефон" : "Telefon"}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <input value={phone} onChange={handlePhone} type="tel" placeholder="+998 33 234 43 67" style={dillerInputStyle} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {locale === "ru" ? "Название компании" : "Tashkilot nomi"}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder='ООО "PROTOUCH SOLUTIONS"' style={dillerInputStyle} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                ИНН<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <input value={inn} onChange={handleInn} placeholder="309876543" maxLength={9} inputMode="numeric" style={dillerInputStyle} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {locale === "ru" ? "Регион" : "Hudud"}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <FormControl fullWidth>
                <Select value={region} displayEmpty onChange={(e) => setRegion(e.target.value as string)}
                  sx={{ borderRadius: "10px", color: region ? "#111" : "#999", bgcolor: "#f5f6f8", fontSize: 14, "& fieldset": { border: "none" }, height: "48px", "& .MuiSelect-select": { py: 1.5 } }}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300, borderRadius: "12px", mt: 0.5 } } }}>
                  <MenuItem value="" disabled>{locale === "ru" ? "Выберите регион" : "Hududni tanlang"}</MenuItem>
                  {REGIONS.map((r) => <MenuItem key={r} value={r} sx={{ fontSize: 14, color: "#111" }}>{r}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button fullWidth variant="outlined" onClick={() => { handleClose(); resetForm(); }}
                sx={{ py: "14px", borderRadius: "12px", textTransform: "none", fontSize: 15, fontWeight: 600, color: "#888", borderColor: "#e0e0e0", "&:hover": { borderColor: "#999", bgcolor: "#fafafa" } }}>
                {locale === "ru" ? "Отмена" : "Bekor qilish"}
              </Button>
              <Button fullWidth onClick={handleSubmit} disabled={submitting}
                sx={{ bgcolor: "#0C4DFD", color: "#fff", py: "14px", borderRadius: "12px", fontWeight: 600, textTransform: "none", fontSize: 15, "&:hover": { bgcolor: "#0b3fd4" }, "&.Mui-disabled": { bgcolor: "#bfdbfe", color: "#fff" } }}>
                {submitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : locale === "ru" ? "Отправить заявку" : "So'rov yuborish"}
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
