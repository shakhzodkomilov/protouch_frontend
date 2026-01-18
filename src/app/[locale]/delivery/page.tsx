"use client";

import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const deliveryItems = [
  "По Ташкенту — бесплатно.",
  "В регионы — платная доставка (стоимость зависит от направления, веса/габаритов и службы доставки).",
  "Отправка выполняется после подтверждения заказа и оплаты (если не согласовано иначе).",
  "Перед отправкой проверяем комплектацию и надёжно упаковываем товар.",
  "При отправке через службу доставки предоставляем трек-номер.",
];

const pickupItems = [
  "Самовывоз доступен из офиса/склада.",
  "Просим заранее согласовать наличие и время выдачи — подготовим заказ к вашему приезду.",
  "При получении можно проверить товар и комплектацию на месте.",
];

const paymentItems = [
  "Картой",
  "Наличными",
  "Безналичный расчёт (для организаций).",
];

const documentItems = [
  "Предоставляем счёт, накладную, акт (при необходимости) и другие закрывающие документы.",
];

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
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 6, textAlign: "center", fontWeight: 700, color: "#000" }}
      >
        PROTOUCH UZ
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 6, textAlign: "center", lineHeight: 1.7, color: "#000" }}
      >
        Ташкент — доставка бесплатно, в регионы отправляем платно. Есть
        самовывоз из офиса/склада по предварительному согласованию. Оплата:
        карта, наличные или безналичный расчёт.
      </Typography>

      <Section title="Доставка" items={deliveryItems} />
      <Section title="Самовывоз" items={pickupItems} />
      <Section title="Оплата" items={paymentItems} />
      <Section title="Документы" items={documentItems} />
    </Box>
  );
}
