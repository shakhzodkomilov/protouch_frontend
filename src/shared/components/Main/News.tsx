"use client";

import {
  Box,
  IconButton,
  Typography,
  Modal,
  Fade,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface NewsItem {
  title: string;
  text: string;
  linearColor1: string;
  linearColor2: string;
  modalContent?: string;
}

const News = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const news: NewsItem[] = [
    {
      title: "Доставка",
      text: "Ташкент — доставка бесплатно, в регионы отправляем платно",
      linearColor1: "#7ED9F6",
      linearColor2: "#32C2E7",
      modalContent: `Ташкент — доставка бесплатно, в регионы отправляем платно.
Есть самовывоз из офиса/склада по предварительному согласованию.
Оплата: карта, наличные или безналичный расчёт.

**Доставка**
• По Ташкенту — бесплатно.
• В регионы — платная доставка (стоимость зависит от направления, веса/габаритов и службы доставки).
• Отправка выполняется после подтверждения заказа и оплаты (если не согласовано иначе).
• Перед отправкой проверяем комплектацию и надёжно упаковываем товар.
• При отправке через службу доставки предоставляем трек-номер.

**Самовывоз**
• Самовывоз доступен из офиса/склада.
• Просим заранее согласовать наличие и время выдачи — подготовим заказ к вашему приезду.
• При получении можно проверить товар и комплектацию на месте.

**Оплата**
• Картой
• Наличными
• Безналичный расчёт (перечислением) — для организаций (счёт и закрывающие документы).

**Документы**
• Предоставляем счёт, накладную, акт (при необходимости) и другие закрывающие документы.`,
    },
    {
      title: "Наш telegram канал",
      text: "Подписывайтесь на телеграм канал",
      linearColor1: "#FB8D76",
      linearColor2: "#FC7D6A",
      modalContent: `Подписывайтесь на @ProtouchMarket — новинки, акции и полезные подборки по электронике.
Делимся обзорами, советами по выбору и инструкциями по подключению.
Будьте в курсе поступлений и выгодных предложений.

**@ProtouchMarket** — официальный Telegram-канал Protouch Market. Мы расширяем направления в электронике и публикуем всё самое важное и полезное.

**В канале вы найдёте:**
• Новинки и поступления (что приехало, что в наличии)
• Акции и специальные предложения
• Подборки товаров по задачам и бюджету
• Обзоры и сравнения популярных моделей
• Инструкции по подключению и настройке
• Ответы на частые вопросы и рекомендации специалистов
• Кейсы и примеры установок (сети, Wi-Fi, видеонаблюдение, digital signage)

**Подписывайтесь:** @ProtouchMarket`,
    },
    {
      title: "Отрасли",
      text: "Мы поставляем оборудование и внедряем решения",
      linearColor1: "#89D87D",
      linearColor2: "#57C056",
      modalContent: `Мы поставляем оборудование и внедряем решения для малого, среднего и крупного бизнеса, а также для государственных и коммерческих организаций. Закрываем проекты "под ключ" — от подбора и проектирования до монтажа, настройки и сопровождения.

**Наши направления**
• Электроника и IT-оборудование: компьютеры, ноутбуки, моноблоки, периферия, комплектующие.
• Серверы и инфраструктура: серверы, СХД/накопители, сетевые шкафы/стойки, ИБП/питание и комплектующие.
• Сетевые товары: коммутаторы, маршрутизаторы/шлюзы, точки доступа Wi-Fi, оптика, кабельная продукция и аксессуары.
• IP-телефония и связь: IP-телефоны, SIP-решения, корпоративная телефония, гарнитуры.
• Конференц-оборудование и ВКС: системы видеоконференций, камеры, микрофоны, спикерфоны, колонки, комплекты для переговорных комнат.
• Телемедицина: комплекты и оборудование для удалённых консультаций, оснащение кабинетов и переговорных для медицинских учреждений.
• Digital Signage и экраны: профессиональные дисплеи, информационные панели, LED-экраны, решения для рекламы и навигации.
• Инфокиоски и киоск-системы: уличные и внутренние инфокиоски, облачно управляемые киоски, контент-управление, расписания показов.
• Роботы и автоматизация: роботизированные решения для сервиса/демонстраций/навигации (по проекту).
• Программное обеспечение: лицензии, внедрение, настройка и сопровождение.
• Интерактивные трибуны и панели, оснащение помещений: интерактивные трибуны, интерактивные панели, системы электронной очереди, стойки/крепления и решения для помещений — от идеи до реализации.

**Как мы работаем**
1. Понимаем задачу и требования
2. Подбираем оборудование и готовим решение
3. Поставка, монтаж и настройка
4. Тестирование, обучение и поддержка`,
    },
    {
      title: "Наши проекты",
      text: "Мы реализуем проекты под ключ для бизнеса и организаций",
      linearColor1: "#EBC773",
      linearColor2: "#EDAE45",
      modalContent: `Мы реализуем проекты "под ключ" для бизнеса и организаций по всему Узбекистану — от поставки оборудования до внедрения и поддержки.
Более 300 успешно реализованных проектов в сфере IT, сетей, ВКС, серверов, digital signage и инфокиосков.

**Наши проекты / С кем мы работаем (список)**
• Wyndham Чарвак
• Hilton
• CAEx Uzbekistan
• UzExpo Center
• NBU Bank
• Kapital Bank
• Orient Finans Bank
• International School
• Ucell
• Beeline Uzbekistan
• IT Park
• Turonbank
• SQB
• Xalq Bank

**Более 300 успешно реализованных проектов по всему Узбекистану.**`,
    },
    {
      title: "PROTOUCH club",
      text: "Сообщество клиентов и партнёров Protouch Market",
      linearColor1: "#249FFC",
      linearColor2: "#1E77BA",
      modalContent: `**PROTOUCH CLUB** — сообщество клиентов и партнёров Protouch Market.
Скидки, спеццены, ранний доступ к новинкам и поддержка по подбору решений.
Присоединяйтесь и получайте больше выгод.

**PROTOUCH CLUB** — это клуб клиентов, интеграторов и компаний, которые покупают электронику и IT-решения для дома, офиса и бизнеса. Участники получают привилегии, быстрый сервис и доступ к полезным материалам.

**Что даёт участие в клубе:**
• Скидки и спеццены на популярные категории товаров
• Ранний доступ к новинкам и ограниченным поставкам
• Персональные подборки под задачу и бюджет (офис, переговорная, сеть, digital signage и др.)
• Приоритетная поддержка по совместимости, комплектации и настройке
• Акции только для участников и промокоды
• Бонусы/подарки (по условиям акций)
• Информация о проектах и кейсах, полезные гайды и инструкции

**Для бизнеса (B2B):**
• Подбор решений "под ключ" (от ТЗ до реализации)
• Коммерческое предложение, спецификация, документы
• Проектные цены и сопровождение (по договорённости)

**Как вступить:**
1. Подпишитесь на наш Telegram: @ProtouchMarket
2. Напишите в чат/менеджеру: "Хочу в PROTOUCH CLUB"
3. Получите статус участника и условия привилегий`,
    },
    {
      title: "Вакансии",
      text: "Мы растём и постоянно расширяем команду",
      linearColor1: "#AB9CFF",
      linearColor2: "#826BFA",
      modalContent: `Мы растём и постоянно расширяем команду.
Ищем инженеров и дизайнеров на проекты по электронике, IT и digital signage.
Оставьте заявку — свяжемся с вами.

**Мы в PROTOUCH** активно развиваем направления электроники и IT-решений, поэтому постоянно нуждаемся в сотрудниках. Если вам интересны реальные проекты, современное оборудование и рост — будем рады познакомиться.

**Кого мы ищем:**
• Инженеры (сети/Wi-Fi, серверы, ВКС, монтаж и настройка, диагностика)
• Дизайнеры (контент для экранов/digital signage, баннеры, оформление, презентации)

**Что вы будете делать (в зависимости от роли):**
• Подбор и внедрение решений "с нуля до реализации"
• Настройка и обслуживание оборудования у клиентов
• Создание визуальных материалов и контента для проектов
• Работа с техзаданием, улучшение качества и сервиса

**Что мы предлагаем:**
• Стабильную работу и постоянные проекты
• Рост и развитие внутри команды
• Дружную атмосферу и поддержку
• Оплата по договорённости (по уровню и опыту)

**Как откликнуться:**
Напишите в Telegram: @ProTouchUz
Тема сообщения: «Вакансия — инженер» или «Вакансия — дизайнер»
Прикрепите кратко: опыт, город, контакты (и портфолио — для дизайнеров).`,
    },
  ];

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleOpenModal = (index: number) => {
    setOpenModal(index);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <Box sx={{ mt: "50px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Статьи и новости
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 40,
            height: 40,
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowleft.svg" width="32" height="32" alt="arrow left" />
        </IconButton>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 40,
            height: 40,
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Image
            src="/arrowright.svg"
            width="32"
            height="32"
            alt="arrow right"
          />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
            cursor: "pointer",
          }}
        >
          {news.map((item, i) => (
            <Box
              key={i}
              onClick={() => item.modalContent && handleOpenModal(i)}
              sx={{
                maxWidth: 300,
                height: 250,
                borderRadius: "16px",
                p: 3,
                background: `linear-gradient(90deg, ${item.linearColor1} 0%, ${item.linearColor2} 100%)`,
                color: "#fff",
                display: "flex",
                flexDirection: "column",

                flexShrink: 0,
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  // boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontWeight: 300, mt: "22px" }}>
                {item.text}
              </Typography>
              <Image
                src="/newsBg.svg"
                width="150"
                height="150"
                alt="newsBg"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Modals */}
      {news.map((item, i) => (
        <Modal
          open={openModal === i}
          onClose={handleCloseModal}
          key={`modal-${i}`}
        >
          <Fade in={openModal === i}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: 600,
                width: "90vw",
                maxHeight: "80vh",
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  color: "#333",
                }}
                dangerouslySetInnerHTML={{
                  __html: item.modalContent?.replace(/\n/g, "<br>") || "",
                }}
              />
              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  sx={{
                    bgcolor: "#249FFC",
                    color: "#fff",
                    "&:hover": { bgcolor: "#1a8ae5" },
                  }}
                >
                  Закрыть
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      ))}
    </Box>
  );
};

export default News;
