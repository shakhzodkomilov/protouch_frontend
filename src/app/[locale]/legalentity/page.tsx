"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { sendToTelegramGroup } from "../../../entities/services/sendAgreementToTelegram";
import { useUnit } from "effector-react";
import { $basket, loadBasket } from "../../../entities/basket/model/store";
import Image from "next/image";
import { useTranslations } from "next-intl";

const CustomerDataForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    inn: "",
    telegramUser: "",
  });
  const t = useTranslations("basket");
  const p = useTranslations("legalEntity");

  const { items, totalCount, totalPrice } = useUnit($basket);
  const loadBasketEv = useUnit(loadBasket);
  useEffect(() => {
    loadBasketEv();
  }, [loadBasketEv]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendToTelegram = async () => {
    try {
      const { docx, pdf, filesName } = await sendToTelegramGroup(formData, {
        items,
        totalCount,
        totalPrice,
      });

      const docxBlob = new Blob(
        [Uint8Array.from(atob(docx), (c) => c.charCodeAt(0))],
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      );

      const pdfBlob = new Blob(
        [Uint8Array.from(atob(pdf), (c) => c.charCodeAt(0))],
        { type: "application/pdf" },
      );

      downloadFile(docxBlob, filesName);
      downloadFile(pdfBlob, filesName.replace(".docx", ".pdf"));
    } catch (e) {
      alert("Xatolik");
      console.error("Failed to send to Group and Download", e);
    }
  };

  function downloadFile(blob: Blob, filesName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filesName;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Box
      sx={{
        p: 4,
        "@media (max-width:900px)": { pt: 15 },
        width: "100%",
        bgcolor: "#f8f9fa",
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
          gap: { xs: 4, lg: 6 },
        }}
      >
        {/* LEFT — CART BLOCK (объединенный блок с карточками и итогами) */}
        <Box
          sx={{
            flex: 1.2,
            minWidth: 0,
            width: { xs: "100%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* ОБЪЕДИНЕННЫЙ БЛОК КАРТОЧЕК И ЗАКАЗА */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #E5EAF2",
              bgcolor: "#fff",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
            }}
          >
            {/* БЛОК КАРТОЧЕК ТОВАРОВ С ПРОКРУТКОЙ */}
            <Box
              sx={{
                // flex: 1,
                p: { xs: 2, md: 2.5 },
                maxHeight: { xs: "500px", md: "300px" },
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#c1c1c1",
                  borderRadius: "10px",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={{ xs: 2, md: 2.5 }}
              >
                {items.map((item) => (
                  <Paper
                    key={item.productId}
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 2 },
                      borderRadius: "12px",
                      border: "1px solid #E5EAF2",
                      bgcolor: "#fff",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "auto 1fr auto",
                        },
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {/* LEFT BLOCK */}
                      <Box display="flex" alignItems="center" gap={2}>
                        {/* Image */}
                        <Box
                          sx={{
                            width: { xs: 72, md: 80 },
                            height: { xs: 72, md: 80 },
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </Box>
                      </Box>

                      {/* INFO */}
                      <Box>
                        <Typography fontSize="14px" color="#6b7280">
                          {new Intl.NumberFormat("ru-RU").format(item.price)}{" "}
                          {t("orderSummary.currency")}
                        </Typography>
                      </Box>

                      {/* RIGHT BLOCK */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "row",
                            sm: "column",
                          },
                          alignItems: {
                            xs: "center",
                            sm: "flex-end",
                          },
                          justifyContent: "space-between",
                          gap: { xs: 2, sm: 1 },
                        }}
                      >
                        {/* QTY */}
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography color="#000" fontWeight={600}>
                            {p("quantity")}: {item.quantity} {p("count")}
                          </Typography>
                        </Box>

                        {/* PRICE */}
                        <Typography
                          color="#000"
                          fontWeight={700}
                          textAlign="right"
                        >
                          {new Intl.NumberFormat("ru-RU").format(
                            item.price * item.quantity,
                          )}{" "}
                          {t("orderSummary.currency")}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* БЛОК С ИТОГАМИ ЗАКАЗА */}
            <Box
              sx={{
                width: { xs: "100%", md: "300px" },
                p: { xs: 2.5, md: 3 },
                borderLeft: { md: "1px solid #E5EAF2" },
                borderTop: { xs: "1px solid #E5EAF2", md: "none" },
                bgcolor: "#fff",
              }}
            >
              <Typography color="#000" fontWeight={700} fontSize="18px" mb={2}>
                {p("summary")}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="#6b7280">
                  {p("quantity")} ({totalCount} {p("count")})
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography color="#6b7280">{p("tax")}</Typography>
                <Typography color="#000">
                  {((totalPrice * 12) / 112).toFixed(2)}
                </Typography>
              </Box>

              {/* Итоговая сумма */}
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                sx={{
                  pt: 2,
                  borderTop: "1px solid #E5EAF2",
                }}
              >
                <Typography color="#000" fontWeight={700} fontSize="16px">
                  Order Total
                </Typography>
                <Typography color="#000" fontWeight={700} fontSize="16px">
                  {new Intl.NumberFormat("ru-RU").format(totalPrice)}{" "}
                  {t("orderSummary.currency")}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* RIGHT — CUSTOMER FORM */}
        <Box
          sx={{
            flex: 1,
            maxWidth: { lg: 520 },
            width: "100%",
            position: { lg: "sticky" },
            top: { lg: 32 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: 4,
              color: "#000",
              fontSize: "32px",
            }}
          >
            {p("client_info")}
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
            gap={3}
          >
            <CustomTextField
              label={p("company_name")}
              name="companyName"
              onChange={handleChange}
            />
            <CustomTextField
              label={p("phone_number") + ":"}
              name="phone"
              onChange={handleChange}
            />
            <CustomTextField
              label={p("inn")}
              name="inn"
              onChange={handleChange}
            />
            <CustomTextField
              label={p("telegram")}
              name="telegramUser"
              onChange={handleChange}
            />
          </Box>

          <Button
            onClick={handleSendToTelegram}
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#249FFC",
              color: "#fff",
              py: "12px",
              px: "24px",
              borderRadius: "18px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "#0084ff" },
            }}
          >
            Подтвердить заказ
          </Button>
        </Box>
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
