"use client";
import React from "react";
import {
  Box,
  Typography,
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
import { useTranslations } from "next-intl";
import { color } from "framer-motion";

const ProcurementPage = () => {
  const t = useTranslations("procurement");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PROTOUCH UZ",
    description: t("metadata.description"),
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
              {t("header.title")}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ color: "#000", fontSize: "17px", lineHeight: 1.8 }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t.raw("header.description"),
                }}
              />
              <br />
              <br />
              <span
                dangerouslySetInnerHTML={{
                  __html: t.raw("header.partnerText"),
                }}
              />
            </Typography>
          </Box>

          {/* Contacts & Legislation - Flex Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mb: 6,
            }}
          >
            {/* Contacts Section */}
            <Box component="section" sx={{ flex: 2 }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mb: 3, fontSize: 24, color: "#000" }}
              >
                {t("contacts.title")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "#333", fontSize: "15px" }}
              >
                {t("contacts.subtitle")}
              </Typography>

              <Stack spacing={3}>
                {[
                  {
                    name: t("contacts.managerName1"),
                    pos: t("contacts.managerPos1"),
                    tel: "+998 87 311 33 11",
                  },
                  {
                    name: t("contacts.managerName2"),
                    pos: t("contacts.managerPos2"),
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
                      <Person sx={{ color: "#000" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{m.name}</Typography>
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

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 3, color: "#555" }}
              >
                <AccessTime sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#000" }}>
                  {t("contacts.workingHours")}
                </Typography>
              </Stack>
            </Box>

            {/* Legislation - Sidebar style */}
            <Box component="aside" sx={{ flex: 1 }}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: "20px", bgcolor: "#fcfcfc" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#000",
                  }}
                >
                  <Gavel sx={{ fontSize: 22, color: "#000" }} />{" "}
                  {t("law.title")}
                </Typography>
                <List dense>
                  {(t.raw("law.items") as string[]).map((text, i) => (
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
            </Box>
          </Box>

          {/* Platforms Section - CSS Grid Layout */}
          <Box
            component="section"
            sx={{
              py: 4,
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
              mb: 6,
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, mb: 4, fontSize: 22, color: "#000" }}
            >
              {t("platforms.title")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {[
                {
                  id: "xarid",
                  name: "Xarid.uzex",
                  url: "https://xarid.uzex.uz/",
                },
                {
                  id: "etender",
                  name: "UzexTender",
                  url: "https://etender.uzex.uz/",
                },
                {
                  id: "hayot",
                  name: "Hayot Birja",
                  url: "https://xt-xarid.uz/",
                },
                {
                  id: "tenderweek",
                  name: "Tenderweek",
                  url: "https://www.tenderweek.com/",
                },
              ].map((p) => (
                <Box key={p.id}>
                  <Typography sx={{ fontWeight: 700 }}>{p.name}</Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mb: 1, color: "#666" }}
                  >
                    {t(`platforms.items.${p.id}`)}
                  </Typography>
                  <Link
                    href={p.url}
                    target="_blank"
                    sx={{
                      color: "#249FFC",
                      fontSize: "13px",
                      wordBreak: "break-all",
                    }}
                  >
                    {p.url}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Experience Section - Flexible List */}
          <Box component="section" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, mb: 3, fontSize: 24, color: "#000" }}
            >
              {t("experience.title")}
            </Typography>
            <Typography
              component="div"
              sx={{ mb: 4, maxWidth: 800, color: "#333", fontSize: "16px" }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t.raw("experience.description"),
                }}
              />
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {(t.raw("experience.list") as string[]).map((item, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <CheckCircle sx={{ color: "#249FFC", fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: "#000" }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>

          {/* Advantages Section - Modern Card */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#f9f9f9",
              p: { xs: 3, md: 5 },
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, mb: 4, fontSize: 24, color: "#000" }}
            >
              {t("advantages.title")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 3,
              }}
            >
              {(t.raw("advantages.list") as string[]).map((text, i) => (
                <Stack
                  key={i}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <FiberManualRecord sx={{ fontSize: 10, color: "#249FFC" }} />
                  <Typography sx={{ fontSize: "15px", color: "#333" }}>
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProcurementPage;
