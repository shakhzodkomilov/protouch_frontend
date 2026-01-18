"use client";

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useRef } from "react";
import Image from "next/image";

export default function AboutUs() {
  const timeline = [
    {
      year: "2019 г.",
      text: "Основание компании PROTOUCH и старт первых проектов.",
    },
    {
      year: "2020 г.",
      text: "Поставки оборудования через биржи и участие в тендерах — выстроили процессы и логистику.",
    },
    {
      year: "2021 г.",
      text: "Расширение компании и новые партнёры — усилили направления и компетенции.",
    },
    {
      year: "2022 г.",
      text: "Рост команды единомышленников — сформировали инженерное и проектное ядро.",
    },
    {
      year: "2023 г.",
      text: "Запуск второго направления: офисные кресла и оснащение рабочих мест.",
    },
    {
      year: "2024 г.",
      text: "Расширение ассортимента — больше категорий электроники и IT-решений для бизнеса.",
    },
    {
      year: "2025 г.",
      text: "Новые партнёры и получение эксклюзивной дистрибуции по отдельным брендам/позициям.",
    },
    {
      year: "2026 г.",
      text: "Новая идея и запуск B2B интернет-магазина PMarket  — удобные закупки для компаний, прозрачные цены и быстрый сервис.",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const navBtnStyle = (pos: { left?: number; right?: number }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bgcolor: "#fff",
    boxShadow: 2,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: { xs: "none", md: "flex" }, // mobilda tugmalar yashirin
    ...pos,
    "&:hover": { bgcolor: "#f5f5f5" },
  });

  return (
    <Box sx={{ py: 8, bgcolor: "#fff", color: "#333" }}>
      <Container maxWidth="lg">
        {/* Sarlavha */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 2, color: "#1a1a1a" }}
        >
          PROTOUCH — компания с опытом реализации проектов для государственного
          и корпоративного сектора.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#666", maxWidth: "800px", fontSize: "1.1rem" }}
        >
          PROTOUCH — компания с опытом реализации проектов для государственного
          и корпоративного сектора. Много лет мы работали с госорганизациями и
          крупными заказчиками, поэтому хорошо понимаем требования к качеству,
          срокам, документам и ответственности. В 2026 году мы расширили проект
          и запустили B2B интернет-магазин PMarket, чтобы сделать закупки
          электроники и IT-решений для бизнеса проще, быстрее и доступнее. Наша
          цель — изменить жизнь людей, сделав простым доступ к огромному
          количеству качественных и недорогих товаров, предоставляя лучший
          сервис.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            mt: 2,
            color: "#000",
            fontWeight: "700",
            fontSize: "20",
          }}
        >
          Наши направления{" "}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#666", maxWidth: "800px", fontSize: "1.1rem" }}
        >
          За годы работы мы расширили направления и собрали сильную команду
          инженеров и специалистов. Сегодня мы закрываем задачи комплексно — от
          подбора оборудования и проектирования до поставки, монтажа, настройки
          и поддержки. Наши ключевые направления: • электроника и
          IT-оборудование (компьютеры, ноутбуки, моноблоки, периферия) • серверы
          и инфраструктура (серверы, СХД, стойки/шкафы, ИБП) • сетевые решения
          (коммутаторы, маршрутизаторы, Wi-Fi, кабельная инфраструктура) •
          IP-телефония и связь • конференц-оборудование и ВКС (переговорные
          комнаты “под ключ”) • digital signage, экраны и инфокиоски (в том
          числе облачно управляемые) • программное обеспечение и лицензии •
          интерактивные панели/трибуны и оснащение помещений • решения “с нуля
          до реализации” под конкретные задачи Б
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            mt: 2,
            color: "#000",
            fontWeight: "700",
            fontSize: "20",
          }}
        >
          Нам доверяют
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#666", maxWidth: "800px", fontSize: "1.1rem" }}
        >
          Крупные организации и бренды, среди которых: Wyndham Charvak, Hilton,
          CAEx Uzbekistan, UzExpo Center, NBU Bank, Kapital Bank, Orient Finans
          Bank, Ucell, Beeline Uzbekistan, IT Park, Turonbank, SQB, Xalq Bank и
          другие. Более 300 успешно реализованных проектов по всему Узбекистану.
        </Typography>

        {/* Timeline Scroll */}
        <Box sx={{ position: "relative" }}>
          {/* Scroll Buttons */}
          <IconButton
            onClick={() => scroll("left")}
            sx={navBtnStyle({ left: -20 })}
          >
            <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
          </IconButton>
          <IconButton
            onClick={() => scroll("right")}
            sx={navBtnStyle({ right: -20 })}
          >
            <Image src="/arrowright.svg" width={32} height={32} alt="right" />
          </IconButton>

          {/* Scrollable Cards */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              py: 2,
              px: 1,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 4,
              },
            }}
          >
            {timeline.map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  maxWidth: 280,
                  border: "1px solid #eee",
                  borderRadius: 6,
                  flexShrink: 0,
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, mb: 1, color: "#1a1a1a" }}
                  >
                    {item.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Yordamchi komponent (afzalliklar uchun)
function AdvantageItem({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <CheckCircleOutline
        sx={{ color: "#1a1a1a", fontSize: "1.2rem", mt: 0.3 }}
      />
      <Typography variant="body1" sx={{ color: "#333" }}>
        {text}
      </Typography>
    </Stack>
  );
}
