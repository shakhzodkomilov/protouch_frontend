"use client";

import { Box, Typography, Link } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { CheckCircle } from "@mui/icons-material";

export default function Discount() {
  const telegramLink = "https://t.me/ProtouchMarket";

  const features = [
    "Новинки и поступления (что приехало, что в наличии)",
    "Акции и специальные предложения",
    "Подборки товаров по задачам и бюджету",
    "Обзоры и сравнения популярных моделей",
    "Инструкции по подключению и настройке",
    "Ответы на частые вопросы и рекомендации специалистов",
    "Кейсы и примеры установок (сети, Wi-Fi, видеонаблюдение, digital signage)",
  ];

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 800, mx: "auto" }}>
      {/* Заголовок */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          gap: 1,
        }}
      >
        <TelegramIcon sx={{ color: "#0088cc", fontSize: 32 }} />
        <Link
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: 700,
            fontSize: "1.8rem",
            color: "#000",
            textDecoration: "none",
          }}
        >
          @ProtouchMarket
        </Link>
      </Box>

      {/* Вступительный текст */}
      <Typography
        variant="body1"
        sx={{ mb: 3, lineHeight: 1.7, color: "#000" }}
      >
        Новинки, акции и полезные подборки по электронике.
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, lineHeight: 1.7, color: "#000" }}
      >
        Делимся обзорами, советами по выбору и инструкциями по подключению.
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 5, lineHeight: 1.7, color: "#000" }}
      >
        Будьте в курсе поступлений и выгодных предложений.
      </Typography>

      {/* О канале */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "#000" }}>
        @ProtouchMarket — официальный Telegram-канал Protouch Market
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, lineHeight: 1.7, color: "#000" }}
      >
        Мы расширяем направления в электронике и публикуем всё самое важное и
        полезное.
      </Typography>

      {/* Список преимуществ */}
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mb: 5 }}>
        {features.map((item, index) => (
          <Box
            component="li"
            key={index}
            sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
          >
            <CheckCircle sx={{ color: "#3CB371", mr: 1 }} />{" "}
            <Typography variant="body1" sx={{ lineHeight: 1.6, color: "#000" }}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Заключение */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TelegramIcon sx={{ color: "#0088cc" }} />
        <Link
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: 600, color: "#000", textDecoration: "none" }}
        >
          Подписывайтесь: @ProtouchMarket
        </Link>
      </Box>
    </Box>
  );
}
