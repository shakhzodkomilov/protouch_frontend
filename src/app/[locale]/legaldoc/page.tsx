import React from "react";
import { Metadata } from "next";
import {
  Box,
  Typography,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import {
  Gavel,
  Person,
  AccessTime,
  FiberManualRecord,
  CheckCircle,
} from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Госзакупки в Узбекистане | PROTOUCH UZ — Надежный Поставщик",
  description:
    "Поставка оборудования и решений для госучреждений Узбекистана. Работаем через Xarid.uzex, UzexTender. 7 лет опыта работы с министерствами и ведомствами.",
  keywords:
    "госзакупки Узбекистан, xarid uzex, тендеры Узбекистан, PROTOUCH UZ, поставка оборудования",
  openGraph: {
    title: "Госзакупки в Узбекистане — PROTOUCH UZ",
    description: "Надежный поставщик для государственных организаций.",
    type: "website",
  },
};

const ProcurementPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PROTOUCH UZ",
    description: "Поставщик для государственных закупок в Узбекистане",
    areaServed: "Uzbekistan",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998-87-311-33-11",
      contactType: "sales",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Box
        component="main"
        sx={{
          bgcolor: "#fff",
          minHeight: "100vh",
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          {/* Header Section */}
          <Box component="section" sx={{ mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 28, md: 32 },
                color: "#000",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Госзакупки в Узбекистане — надежный поставщик для государственных
              организаций
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#000", fontSize: "17px", lineHeight: 1.8 }}
            >
              Данная страница предназначена для государственных и корпоративных
              заказчиков, осуществляющих
              <strong> государственные закупки в Узбекистане</strong> в
              соответствии с действующим законодательством.
              <br />
              <br />
              Компания <strong>PROTOUCH UZ</strong> выступает проверенным
              партнером в сфере <strong>электронных тендеров</strong>, аукционов
              и прямых договоров через официальные платформы Республики
              Узбекистан.
            </Typography>
          </Box>

          <Grid container spacing={4} component="article">
            {/* Kontaktlar Section */}
            <Grid item xs={12} md={7} component="section">
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mb: 3, color: "#000", fontSize: 24 }}
              >
                Отдел по работе с тендерами
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "#333", fontSize: "15px" }}
              >
                Наш специализированный отдел сопровождает заказчиков на всех
                этапах закупочного процесса — от консультации и подбора товаров
                до исполнения договора.
              </Typography>

              <Stack spacing={3}>
                {[
                  {
                    name: "Хайдаров Асадбек",
                    pos: "Менеджер по государственным закупкам",
                    tel: "+998 87 311 33 11",
                  },
                  {
                    name: "Нуруллаев Феруз Комилович",
                    pos: "Старший специалист по тендерам",
                    tel: "+998 97 778 23 47",
                  },
                ].map((m, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "#f0f0f0",
                        p: 1.5,
                        borderRadius: "12px",
                        height: "fit-content",
                      }}
                    >
                      <Person aria-hidden="true" sx={{ color: "#000" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#000" }}>
                        {m.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        {m.pos}
                      </Typography>
                      <MuiLink
                        href={`tel:${m.tel.replace(/\s/g, "")}`}
                        sx={{
                          fontWeight: 700,
                          mt: 0.5,
                          color: "#249FFC",
                          display: "block",
                        }}
                      >
                        {m.tel}
                      </MuiLink>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#555",
                }}
              >
                <AccessTime aria-hidden="true" sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  ⏱ Режим работы: Пн–Сб, 09:00 – 18:00
                </Typography>
              </Box>
            </Grid>

            {/* Qonunchilik Section */}
            <Grid item xs={12} md={5} component="aside">
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: "20px", border: "1px solid #e0e0e0" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "#000",
                    fontWeight: 700,
                    mb: 2,
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Gavel aria-hidden="true" sx={{ fontSize: 22 }} />{" "}
                  Законодательство
                </Typography>
                <List dense>
                  {[
                    "Закон РУз «О государственных закупках»",
                    "Порядок проведения электронных торгов (ПКМ РУз)",
                    "Нормативные акты Министерства финансов РУз",
                    "Регламенты площадок (Xarid.uzex, Etender)",
                  ].map((text, i) => (
                    <ListItem key={i} sx={{ alignItems: "flex-start", px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}>
                        <FiberManualRecord
                          sx={{ fontSize: 8, color: "#249FFC" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          color: "#000",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Platformalar Section */}
            <Grid item xs={12} component="section">
              <Box
                sx={{
                  py: 4,
                  borderTop: "1px solid #eee",
                  borderBottom: "1px solid #eee",
                  my: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 700, mb: 3, color: "#000", fontSize: 22 }}
                >
                  Электронные платформы и порталы госзакупок
                </Typography>
                <Grid container spacing={3}>
                  {[
                    {
                      name: "Xarid.uzex",
                      desc: "Портал госзакупок РУз",
                      url: "https://xarid.uzex.uz/",
                    },
                    {
                      name: "UzexTender",
                      desc: "Система электронных тендеров",
                      url: "https://etender.uzex.uz/",
                    },
                    {
                      name: "Hayot Birja",
                      desc: "Государственные торги",
                      url: "https://xt-xarid.uz/",
                    },
                    {
                      name: "Tenderweek",
                      desc: "Платформа тендеров",
                      url: "https://www.tenderweek.com/",
                    },
                  ].map((p, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Typography sx={{ fontWeight: 700, color: "#000" }}>
                        {p.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mb: 1, color: "#666" }}
                      >
                        {p.desc}
                      </Typography>
                      <Link
                        href={p.url}
                        target="_blank"
                        rel="noopener" // Xavfsizlik va SEO uchun
                        sx={{
                          color: "#249FFC",
                          fontSize: "13px",
                          wordBreak: "break-all",
                        }}
                      >
                        {p.url}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Tajriba Section */}
            <Grid item xs={12} component="section">
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mb: 3, color: "#000", fontSize: 24 }}
              >
                Опыт сотрудничества с бюджетными организациями
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, maxWidth: 800, color: "#333", fontSize: "16px" }}
              >
                За 7 лет работы компания <strong>PROTOUCH UZ</strong>{" "}
                зарекомендовала себя как надежный поставщик для:
              </Typography>

              <Grid container spacing={2}>
                {[
                  "Министерства и ведомства РУз",
                  "Хокимияты областей и городов",
                  "Государственные агентства и службы",
                  "Университеты и академии (ВУЗы)",
                  "Школы и учебные центры",
                  "Государственные клиники и медцентры",
                  "Банки с государственным участием",
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircle
                        aria-hidden="true"
                        sx={{ color: "#249FFC", fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#000" }}>
                        {item}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Nega biz Section */}
            <Grid item xs={12} component="section">
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#f9f9f9",
                  p: 4,
                  borderRadius: "24px",
                  mt: 4,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 700, mb: 3, fontSize: 24, color: "#000" }}
                >
                  Преимущества работы с нами
                </Typography>
                <Grid container spacing={3}>
                  {[
                    "Опыт 7+ лет в секторе B2G",
                    "Полное соответствие законодательству РУз",
                    "Предоставление всех закрывающих документов в ЭСФ",
                    "Гарантийная поддержка и сервис",
                    "Доставка по всему Узбекистану",
                  ].map((text, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "15px",
                          color: "#333",
                        }}
                      >
                        <FiberManualRecord
                          aria-hidden="true"
                          sx={{ fontSize: 10, color: "#249FFC" }}
                        />
                        {text}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProcurementPage;
