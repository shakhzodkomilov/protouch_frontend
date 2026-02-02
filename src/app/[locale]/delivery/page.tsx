"use client";

import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useTranslations } from "next-intl";

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "#000" }}>
        {title}
      </Typography>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
        >
          <CheckCircle sx={{ color: "#3CB371", mr: 1 }} />{" "}
          {/* Icon rangini blue qilamiz */}
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: "#000" }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function Delivery() {
  const t = useTranslations("Delivery");

  const deliveryItems = t.raw("sections.delivery.items") as string[];
  const pickupItems = t.raw("sections.pickup.items") as string[];
  const paymentItems = t.raw("sections.payment.items") as string[];
  const documentItems = t.raw("sections.documents.items") as string[];

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 6, textAlign: "center", fontWeight: 700, color: "#000" }}
      >
        {t("pageTitle")}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 6, textAlign: "center", lineHeight: 1.7, color: "#000" }}
      >
        {t("intro")}
      </Typography>

      <Section title={t("sections.delivery.title")} items={deliveryItems} />
      <Section title={t("sections.pickup.title")} items={pickupItems} />
      <Section title={t("sections.payment.title")} items={paymentItems} />
      <Section title={t("sections.documents.title")} items={documentItems} />
    </Box>
  );
}
