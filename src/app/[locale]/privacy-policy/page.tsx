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
  VerifiedUser,
  Description,
  ContactMail,
  Shield,
  Lock,
  Info,
} from "@mui/icons-material";

const PrivacyPolicyPage = () => {
  const t = useTranslations("privacy_policy");

  // Helper to safely get arrays from i18n JSON
  const getList = (key: string): string[] => {
    const list = t.raw(key);
    return Array.isArray(list) ? list : [];
  };

  const sections = [
    {
      id: 1,
      icon: <Info />,
      title: t("sections.definitions.title"),
      content: [
        {
          term: t("sections.definitions.personal_data_term"),
          definition: t("sections.definitions.personal_data_def"),
        },
        {
          term: t("sections.definitions.processing_term"),
          definition: t("sections.definitions.processing_def"),
        },
        {
          term: t("sections.definitions.operator_term"),
          definition: t("sections.definitions.operator_def"),
        },
      ],
    },
    {
      id: 2,
      icon: <Description />,
      title: t("sections.data_types.title"),
      items: getList("sections.data_types.items"),
    },
    {
      id: 3,
      icon: <VerifiedUser />,
      title: t("sections.purposes.title"),
      text: t("sections.purposes.text"),
      items: getList("sections.purposes.items"),
    },
    {
      id: 4,
      icon: <Shield />,
      title: t("sections.legal_basis.title"),
      text: t("sections.legal_basis.text"),
      items: getList("sections.legal_basis.items"),
    },
    {
      id: 5,
      icon: <Lock />,
      title: t("sections.collection_process.title"),
      text: t("sections.collection_process.text"),
      items: getList("sections.collection_process.items"),
    },
    {
      id: 6,
      icon: <Security />,
      title: t("sections.cookies.title"),
      paragraphs: [
        t("sections.cookies.p1"),
        t("sections.cookies.list"),
        t("sections.cookies.p2"),
      ],
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
              defaultExpanded={section.id <= 3}
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
                {section.content && (
                  <Stack spacing={2}>
                    {section.content.map((item, idx) => (
                      <Box key={idx}>
                        <Typography
                          sx={{ fontWeight: 700, mb: 0.5, color: "#000" }}
                        >
                          {item.term}
                        </Typography>
                        <Typography sx={{ color: "#555", fontSize: 15 }}>
                          {item.definition}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
                {section.text && (
                  <Typography sx={{ mb: 2, color: "#333" }}>
                    {section.text}
                  </Typography>
                )}
                {section.items && (
                  <Stack spacing={1}>
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
                        <Typography sx={{ color: "#333", fontSize: 15 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
                {section.paragraphs && (
                  <Stack spacing={2}>
                    {section.paragraphs.map((para, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          color: "#333",
                          fontSize: 15,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {para}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Footer Cards */}
        <Stack spacing={3} sx={{ mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: "20px", bgcolor: "#fafafa" }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: 20, mb: 2, color: "#000" }}
            >
              7. {t("sections.third_party.title")}
            </Typography>
            <Typography sx={{ color: "#333", mb: 2 }}>
              {t("sections.third_party.intro")}
            </Typography>
            <Stack spacing={1}>
              {getList("sections.third_party.items").map((item, idx) => (
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
                  <Typography sx={{ color: "#333", fontSize: 15 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Security & Rights follow same pattern with getList(...) */}
          <Paper sx={{ p: 4, borderRadius: "20px", bgcolor: "#f0f8ff" }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: 20, mb: 2, color: "#000" }}
            >
              10. {t("sections.security.title")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {getList("sections.security.items").map((measure, idx) => (
                <Box key={idx} sx={{ display: "flex", gap: 1.5 }}>
                  <Lock sx={{ fontSize: 18, color: "#249FFC" }} />
                  <Typography sx={{ fontSize: 15, color: "#000" }}>
                    {measure}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 4, borderRadius: "20px", bgcolor: "#fff8f0" }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: 20, mb: 2, color: "#000" }}
            >
              11. {t("sections.user_rights.title")}
            </Typography>
            <Stack spacing={1.5}>
              {getList("sections.user_rights.items").map((right, idx) => (
                <Box key={idx} sx={{ display: "flex", gap: 1.5 }}>
                  <VerifiedUser sx={{ fontSize: 20, color: "#249FFC" }} />
                  <Typography sx={{ fontSize: 15, color: "#000" }}>
                    {right}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>

        {/* Contact Information */}
        <Paper
          sx={{ p: 4, borderRadius: "24px", bgcolor: "#249FFC", color: "#fff" }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <ContactMail sx={{ fontSize: 28 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {t("contacts.title")}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {t("contacts.address_label")}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                {t("contacts.address_val")}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {t("contacts.email_label")}
              </Typography>
              <MuiLink
                href="mailto:protouch.uz@gmail.com"
                sx={{ color: "#fff" }}
              >
                protouch.uz@gmail.com
              </MuiLink>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {t("contacts.phone_label")}
              </Typography>
              <MuiLink href="tel:+998951700571" sx={{ color: "#fff" }}>
                +998 95 170 05 71
              </MuiLink>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyPage;
