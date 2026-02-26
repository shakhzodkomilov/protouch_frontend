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
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface NewsItem {
  title: string;
  text: string;
  linearColor1: string;
  linearColor2: string;
  modalContent?: string;
}

const News = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const { locale } = useParams();
  const t = useTranslations("main");
  const content: Record<string, NewsItem[]> = {
    ru: [
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
    ],
    uz: [
      {
        title: "Yetkazib berish",
        text: "Toshkent — yetkazib berish bepul, viloyatlarga pullik asosda yuboramiz",
        linearColor1: "#7ED9F6",
        linearColor2: "#32C2E7",
        modalContent: `Toshkent — yetkazib berish bepul, viloyatlarga pullik asosda yuboramiz.
Oldindan kelishuvga ko'ra ofis yoki ombordan olib ketish (samovivoz) imkoniyati mavjud.
To'lov: karta, naqd pul yoki pul o'tkazmasi (perechisleniye) orqali.

**Yetkazib berish**
• Toshkent bo'ylab — bepul.
• Viloyatlarga — pullik (narxi yo'nalishga, vazn/o'lchamlarga va yetkazib berish xizmatiga bog'liq).
• Yuborish buyurtma tasdiqlangach va to'lov amalga oshirilgach bajariladi (agar boshqacha kelishilmagan bo'lsa).
• Yuborishdan oldin butunligini tekshiramiz va mahsulotni mustahkam qadoqlaymiz.
• Yetkazib berish xizmati orqali yuborilganda trek-raqam taqdim etiladi.

**Olib ketish (Samovivoz)**
• Ofis yoki ombordan olib ketish imkoniyati mavjud.
• Iltimos, mahsulot borligini va berish vaqtini oldindan kelishib oling — kelishingizga buyurtmani tayyorlab qo'yamiz.
• Qabul qilish vaqtida mahsulotni va butunligini joyida tekshirib olish mumkin.

**To'lov**
• Karta orqali
• Naqd pulda
• Pul o'tkazmasi (perechisleniye) — tashkilotlar uchun (hisob-faktura va yopuvchi hujjatlar bilan).

**Hujjatlar**
• Hisob-faktura, yuk xati, dalolatnoma (zarur bo'lganda) va boshqa yopuvchi hujjatlarni taqdim etamiz.`,
      },
      {
        title: "Telegram kanalimiz",
        text: "Telegram kanalimizga obuna bo'ling",
        linearColor1: "#FB8D76",
        linearColor2: "#FC7D6A",
        modalContent: `@ProtouchMarket kanaliga obuna bo'ling — elektronika bo'yicha yangiliklar, aksiyalar va foydali to'plamlar.
Sharhlar, tanlash bo'yicha maslahatlar va ulanish yo'riqnomalari bilan bo'lishamiz.
Yangi kelgan mahsulotlar va foydali takliflardan xabardor bo'ling.

**@ProtouchMarket** — Protouch Market rasmiy Telegram kanali. Biz elektronika yo'nalishlarini kengaytirmoqdamiz va eng muhim hamda foydali ma'lumotlarni e'lon qilamiz.

**Kanalda quyidagilarni topasiz:**
• Yangiliklar va yangi kelgan mahsulotlar (nima keldi, nima mavjud)
• Aksiyalar va maxsus takliflar
• Vazifa va byudjetga qarab mahsulotlar to'plami
• Ommabop modellarning sharhi va taqqoslovi
• Ulanish va sozlash bo'yicha yo'riqnomalar
• Mutaxassislardan tez-tez beriladigan savollarga javoblar va tavsiyalar
• Amalga oshirilgan loyihalar va o'rnatish misollari (tarmoqlar, Wi-Fi, videokuzatuv, digital signage)

**Obuna bo'ling:** @ProtouchMarket`,
      },
      {
        title: "Sohalar",
        text: "Biz uskunalar yetkazib beramiz va yechimlarni joriy qilamiz",
        linearColor1: "#89D87D",
        linearColor2: "#57C056",
        modalContent: `Biz kichik, o'rta va yirik biznes, shuningdek, davlat va tijorat tashkilotlari uchun uskunalar yetkazib beramiz hamda yechimlarni joriy qilamiz. Loyihalarni tanlash va loyihalashdan tortib, montaj, sozlash va texnik kuzatuvgacha "tayyor holda" (pod klyuch) yopamiz.

**Bizning yo'nalishlar**
• Elektronika va IT-uskunalar: kompyuterlar, noutbuklar, monobloklar, periferiya, butlovchi qismlar.
• Serverlar va infratuzilma: serverlar, ShX/saqlash tizimlari, tarmoq shkaflari/stoykalari, UBP/quvvat manbalari va butlovchi qismlar.
• Tarmoq uskunalari: kommutatorlar, marshrutizatorlar/shlyuzlar, Wi-Fi ulanish nuqtalari, optika, kabel mahsulotlari va aksessuarlar.
• IP-telefoniya va aloqa: IP-telefonlar, SIP-yechimlar, korporativ telefoniya, garnituralar.
• Konferents-aloqa uskunalari va VKS: videokonferentsiya tizimlari, kameralar, mikrofonlar, spikerfonlar, kalonkalar, muzokaralar xonalari uchun to'plamlar.
• Telemeditsina: masofaviy maslahatlar uchun to'plamlar va uskunalar, tibbiyot muassasalari uchun xonalarni jihozlash.
• Digital Signage va ekranlar: professional displeylar, axborot panellari, LED-ekranlar, reklama va navigatsiya yechimlari.
• Infokioskalar va kiosk-tizimlar: ko'cha va bino ichidagi infokioskalar, bulutli boshqariladigan kioskalar, kontentni boshqarish, namoyish jadvallari.
• Robotlar va avtomatlashtirish: xizmat ko'rsatish/namoyish/navigatsiya uchun robotlashtirilgan yechimlar (loyiha bo'yicha).
• Dasturiy ta'minot: litsenziyalar, joriy etish, sozlash va qo'llab-quvvatlash.
• Interaktiv panellar va tribunalar, xonalarni jihozlash: interaktiv tribunalar, interaktiv panellar, elektron navbat tizimlari, stoykalar/mahkamlagichlar va xonalar uchun yechimlar — g'oyadan amalga oshirishgacha.

**Qanday ishlaymiz**
1. Vazifa va talablarni tushunib olamiz
2. Uskunalarni tanlaymiz va yechim tayyorlaymiz
3. Yetkazib berish, montaj va sozlash
4. Sinovdan o'tkazish, o'qitish va qo'llab-quvvatlash`,
      },
      {
        title: "Loyihalarimiz",
        text: "Biz biznes va tashkilotlar uchun tayyor loyihalarni amalga oshiramiz",
        linearColor1: "#EBC773",
        linearColor2: "#EDAE45",
        modalContent: `Biz butun O'zbekiston bo'ylab biznes va tashkilotlar uchun loyihalarni "tayyor holda" (pod klyuch) amalga oshiramiz — uskuna yetkazib berishdan tortib, joriy etish va qo'llab-quvvatlashgacha.
IT, tarmoqlar, VKS, serverlar, digital signage va infokioskalar sohasida 300 dan ortiq muvaffaqiyatli amalga oshirilgan loyihalar.

**Bizning loyihalar / Kimlar bilan ishlaymiz (ro'yxat)**
• Wyndham Chorvoq
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

**Butun O'zbekiston bo'ylab 300 dan ortiq muvaffaqiyatli amalga oshirilgan loyihalar.**`,
      },
      {
        title: "PROTOUCH club",
        text: "Protouch Market mijozlari va hamkorlari hamjamiyati",
        linearColor1: "#249FFC",
        linearColor2: "#1E77BA",
        modalContent: `**PROTOUCH CLUB** — Protouch Market mijozlari va hamkorlari hamjamiyati.
Chegirmalar, maxsus narxlar, yangiliklarga erta kirish va yechimlarni tanlashda yordam.
Qo'shiling va ko'proq imtiyozlarga ega bo'ling.

**PROTOUCH CLUB** — bu uy, ofis va biznes uchun elektronika hamda IT-yechimlar sotib oluvchi mijozlar, integratorlar va kompaniyalar klubi. Ishtirokchilar imtiyozlar, tezkor xizmat va foydali materiallarga ega bo'ladilar.

**Klubda ishtirok etish nima beradi:**
• Ommabop mahsulot toifalariga chegirmalar va maxsus narxlar
• Yangi mahsulotlar va cheklangan partiyalarga erta kirish imkoniyati
• Vazifa va byudjetga qarab shaxsiy to'plamlar (ofis, muzokaralar xonasi, tarmoq, digital signage va boshqalar)
• Moslik, butlovchi qismlar va sozlash bo'yicha ustuvor qo'llab-quvvatlash
• Faqat ishtirokchilar uchun aksiyalar va promo-kodlar
• Bonuslar/sovg'alar (aksiya shartlariga ko'ra)
• Loyihalar va keyslar haqida ma'lumot, foydali qo'llanmalar va ko'rsatmalar

**Biznes uchun (B2B):**
• Loyihalarni "pod klyuch" tanlash (TIdan amalga oshirishgacha)
• Tijorat taklifi, spetsifikatsiya, hujjatlar
• Loyiha narxlari va hamrohlik qilish (kelishuvga ko'ra)

**Qanday a'zo bo'lish mumkin:**
1. Bizning Telegramimizga obuna bo'ling: @ProtouchMarket
2. Chatga/menejerga yozing: "PROTOUCH CLUBga a'zo bo'lishni xohlayman"
3. Ishtirokchi maqomi va imtiyozlar shartlarini oling`,
      },
      {
        title: "Bo'sh ish o'rinlari",
        text: "Biz o'syapmiz va jamoamizni muntazam kengaytirmoqdamiz",
        linearColor1: "#AB9CFF",
        linearColor2: "#826BFA",
        modalContent: `Biz o'syapmiz va jamoamizni muntazam kengaytirmoqdamiz.
Elektronika, IT va digital signage loyihalari uchun muhandislar va dizaynerlarni qidirmoqdamiz.
Ariza qoldiring — siz bilan bog'lanamiz.

**Biz PROTOUCHda** elektronika va IT-yechimlar yo'nalishlarini faol rivojlantirmoqdamiz, shuning uchun muntazam ravishda xodimlarga ehtiyoj sezamiz. Agar sizga real loyihalar, zamonaviy uskunalar va o'sish qiziq bo'lsa — tanishishdan xursand bo'lamiz.

**Kimlarni qidirmoqdamiz:**
• Muhandislar (tarmoqlar/Wi-Fi, serverlar, VKS, montaj va sozlash, diagnostika)
• Dizaynerlar (ekranlar uchun kontent/digital signage, bannerlar, bezatish, taqdimotlar)

**Siz nima qilasiz (rolingizga qarab):**
• Yechimlarni "noldan amalga oshirishgacha" tanlash va joriy etish
• Mijozlarda uskunalarni sozlash va xizmat ko'rsatish
• Loyihalar uchun vizual materiallar va kontent yaratish
• Texnik topshiriq bilan ishlash, sifat va servisni yaxshilash

**Biz nima taklif qilamiz:**
• Barqaror ish va doimiy loyihalar
• Jamoa ichida o'sish va rivojlanish
• Do'stona muhit va qo'llab-quvvatlash
• Kelishilgan to'lov (daraja va tajribaga qarab)

**Qanday javob berish kerak:**
Telegramga yozing: @ProTouchUz
Xabar mavzusi: «Vakansiya — muhandis» yoki «Vakansiya — dizayner»
Qisqacha biriktiring: tajriba, shahar, kontaktlar (va dizaynerlar uchun — portfoliyo).`,
      },
    ],
  };

  const news = content[locale as string] || content.ru;

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    dragInfo.current.isDown = true;
    dragInfo.current.hasMoved = false;
    dragInfo.current.startX = e.pageX - slider.offsetLeft;
    dragInfo.current.scrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";
    slider.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider || !dragInfo.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const distance = x - dragInfo.current.startX;
    if (Math.abs(distance) > 5) dragInfo.current.hasMoved = true;
    slider.scrollLeft = dragInfo.current.scrollLeft - distance * 1.5;
  };

  const stopDragging = () => {
    if (scrollRef.current) {
      dragInfo.current.isDown = false;
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const scrollBtn = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "50px" }}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 600,
          color: "#000",
          "@media (max-width: 900px)": { fontSize: "26px" },
        }}
      >
        {t("newsTitle")}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scrollBtn("left")}
          sx={{ ...navBtnStyle, left: -20 }}
        >
          <Image src="/arrowleft.svg" width={32} height={32} alt="left" />
        </IconButton>
        <IconButton
          onClick={() => scrollBtn("right")}
          sx={{ ...navBtnStyle, right: -20 }}
        >
          <Image src="/arrowright.svg" width={32} height={32} alt="right" />
        </IconButton>

        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onClickCapture={(e) =>
            dragInfo.current.hasMoved && e.stopPropagation()
          }
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
            cursor: "grab",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            userSelect: "none",
          }}
        >
          {news.map((item, i) => (
            <Box
              key={i}
              onClick={() => item.modalContent && setOpenModal(i)}
              sx={{
                width: 280,
                height: 230,
                borderRadius: "16px",
                p: 2,
                background: `linear-gradient(90deg, ${item.linearColor1} 0%, ${item.linearColor2} 100%)`,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: "relative",
                transition: "transform 0.2s",
                scrollSnapAlign: "start",
                "&:hover": { transform: "translateY(-5px)" },
                "@media (max-width: 900px)": { width: 220, height: 200 },
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontWeight: 400, mt: "22px" }}>
                {item.text}
              </Typography>
              <Image
                src="/newsBg.svg"
                width={150}
                height={150}
                alt="bg"
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

      {news.map((item, i) => (
        <Modal
          open={openModal === i}
          onClose={() => setOpenModal(null)}
          key={`modal-${i}`}
        >
          <Fade in={openModal === i}>
            <Box sx={modalStyle}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 700, color: "#000" }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  color: "#333",
                  fontSize: { xs: "14px", md: "16px" },
                }}
                dangerouslySetInnerHTML={{
                  __html: item.modalContent?.replace(/\n/g, "<br>") || "",
                }}
              />
              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenModal(null)}
                  sx={{
                    bgcolor: "#249FFC",
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  {t("close")}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      ))}
    </Box>
  );
};

const navBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  bgcolor: "#fff",
  boxShadow: 2,
  width: 40,
  height: 40,
  "@media (max-width:900px)": { display: "none" },
  "&:hover": { bgcolor: "#f5f5f5" },
};

const modalStyle = {
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
};

export default News;
