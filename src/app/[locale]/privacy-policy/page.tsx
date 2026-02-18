"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link as MuiLink,
} from "@mui/material";
import {
  ExpandMore,
  Security,
  Description,
  ContactMail,
  Assignment,
  Storage,
  Share,
  Cookie,
} from "@mui/icons-material";

const PrivacyPolicy = () => {
  const t = useTranslations("privacy");

  // Helper to safely get arrays from your JSON structure
  const getList = (key: string): string[] => {
    const list = t.raw(`sections.${key}.items`);
    return Array.isArray(list) ? list : [];
  };

  const sections = [
    {
      id: 1,
      icon: <Assignment />,
      title: t("sections.documents.title"),
      items: getList("documents"),
    },
    {
      id: 2,
      icon: <Description />,
      title: t("sections.data_collection.title"),
      items: getList("data_collection"),
    },
    {
      id: 3,
      icon: <Storage />,
      title: t("sections.data_usage.title"),
      items: getList("data_usage"),
    },
    {
      id: 4,
      icon: <Share />,
      title: t("sections.data_sharing.title"),
      items: getList("data_sharing"),
    },
    {
      id: 5,
      icon: <Security />,
      title: t("sections.security.title"),
      items: getList("security"),
    },
    {
      id: 6,
      icon: <Cookie />,
      title: t("sections.cookies.title"),
      items: getList("cookies"),
    },
  ];

  return (
    <Box
      component="main"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: 4, px: { xs: 2, md: 4 } }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 28, md: 36 },
              color: "#000",
              mb: 2,
            }}
          >
            {t("title")}
          </Typography>
          <Typography sx={{ color: "#666", fontSize: 16, mb: 1 }}>
            {t("company_name")}
          </Typography>
          <Typography sx={{ color: "#999", fontSize: 14 }}>
            {t("publish_date")}
          </Typography>
        </Box>

        {/* Introduction */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "24px",
            bgcolor: "#f9f9f9",
            border: "1px solid #eee",
          }}
        >
          <Typography sx={{ color: "#333", fontSize: 16, lineHeight: 1.8 }}>
            {t("intro")}
          </Typography>
        </Paper>

        {/* Main Accordion Sections */}
        <Box sx={{ mb: 6 }}>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              defaultExpanded={section.id <= 2}
              sx={{
                mb: 2,
                borderRadius: "16px !important",
                "&:before": { display: "none" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    gap: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#249FFC",
                    color: "#fff",
                    borderRadius: "12px",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {section.icon}
                </Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: 18, color: "#000" }}
                >
                  {section.id}. {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1.5}>
                  {section.items.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", gap: 1.5, alignItems: "start" }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "#249FFC",
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{ color: "#333", fontSize: 15, lineHeight: 1.6 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Information Card */}
        <Paper
          sx={{
            p: 4,
            borderRadius: "24px",
            bgcolor: "#249FFC",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(36, 159, 252, 0.3)",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <ContactMail sx={{ fontSize: 32 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
              {t("contacts.title")}
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  opacity: 0.8,
                  fontSize: 13,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                {t("contacts.address_label")}
              </Typography>
              <Typography sx={{ fontSize: 16 }}>
                {t("contacts.address_val")}
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 3, sm: 6 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    opacity: 0.8,
                    fontSize: 13,
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Email
                </Typography>
                <MuiLink
                  href={`mailto:${t("contacts.email")}`}
                  sx={{
                    color: "#fff",
                    textDecoration: "underline",
                    fontSize: 16,
                  }}
                >
                  {t("contacts.email")}
                </MuiLink>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    opacity: 0.8,
                    fontSize: 13,
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Phone
                </Typography>
                <MuiLink
                  href={`tel:${t("contacts.phone")}`}
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {t("contacts.phone")}
                </MuiLink>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <Typography
          sx={{ mt: 4, textAlign: "center", color: "#bbb", fontSize: 14 }}
        >
          {t("footer_note")}
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
