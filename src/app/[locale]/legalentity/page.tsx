"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const CustomerDataForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    inn: "",
    telegramUser: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async () => {
    const token = "YOUR_BOT_TOKEN";
    const chatId = "YOUR_CHAT_ID";

    const message = `
<b>Yangi buyurtma!</b>
🏢 Firma: ${formData.companyName}
📞 Telefon: ${formData.phone}
🔢 INN: ${formData.inn}
✈️ Telegram: ${formData.telegramUser}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
      alert("Ma'lumot yuborildi!");
    } catch (error) {
      alert("Xatolik!");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Typography
          variant="h1"
          sx={{ fontWeight: 800, mb: 4, color: "#000", fontSize: "38px" }}
        >
          Данные покупателя
        </Typography>

        {/* Grid o'rniga CSS Grid ishlatamiz. 
            repeat(1, 1fr) - mobil uchun (1 ustun)
            sm: 'repeat(2, 1fr)' - planshet/kompyuter uchun (2 ustun)
        */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
          gap={3}
        >
          <CustomTextField
            label="Имя фирмы"
            name="companyName"
            onChange={handleChange}
          />
          <CustomTextField
            label="Телефон номер:"
            name="phone"
            onChange={handleChange}
          />
          <CustomTextField label="ИНН" name="inn" onChange={handleChange} />
          <CustomTextField
            label="Телеграм юзер @"
            name="telegramUser"
            onChange={handleChange}
          />
        </Box>

        <Button
          fullWidth={false}
          onClick={sendToTelegram}
          variant="contained"
          sx={{
            mt: "34px",
            bgcolor: "#249FFC",
            color: "#fff",
            py: "16px",
            px: "40px",
            borderRadius: "18px",
            fontWeight: "600",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { bgcolor: "#0084ff" },
          }}
        >
          Подтвердить заказ
        </Button>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        boxShadow: "0px 2px 8px rgba(0,0,0,0.02)",
        height: "60px",
      },
    }}
    InputLabelProps={{
      sx: { color: "#000", fontSize: "15px" },
    }}
  />
);

export default CustomerDataForm;
