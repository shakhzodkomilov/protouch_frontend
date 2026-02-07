"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { color } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";
import {
  ExpandMore,
  Handyman,
  LocationOn,
  Info,
  PhotoCamera,
  Videocam,
  Description,
  LocalShipping,
  Verified,
  AccessTime,
  Phone,
  Email,
  Map,
} from "@mui/icons-material";

const ServicePage = () => {
  const t = useTranslations("service");

  const getList = (path: string): string[] => {
    const list = t.raw(path);
    return Array.isArray(list) ? list : [];
  };

  return (
    <Box
      component="main"
      sx={{ bgcolor: "#fff", minHeight: "100vh", py: { xs: 4, md: 8 } }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: "#1a1a1a",
              fontSize: { xs: 28, md: 44 },
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#249FFC", fontWeight: 600, mb: 3 }}
          >
            {t("subtitle")}
          </Typography>
          <Typography
            sx={{
              color: "#666",
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: 16,
            }}
          >
            {t("intro")}
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          {/* Left Column: Instructions & Requirements */}
          <Box sx={{ flex: { md: 2 }, width: "100%" }}>
            {/* Steps */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#000",
              }}
            >
              <Handyman sx={{ color: "#249FFC" }} /> {t("how_to_apply.title")}
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "24px",
                bgcolor: "#f9f9f9",
                mb: 5,
                border: "1px solid #eee",
                color: "#000",
              }}
            >
              <Stack spacing={3}>
                {getList("how_to_apply.steps").map((text, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#249FFC",
                        color: "#fff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography
                      sx={{ fontWeight: 500, lineHeight: 1.6, color: "#000" }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, color: "#000" }}
            >
              {t("requirements.title")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 5,
                color: "#000",
              }}
            >
              {[
                { icon: <PhotoCamera />, key: "photos" },
                { icon: <Description />, key: "serial" },
                { icon: <Videocam />, key: "video" },
                { icon: <Info />, key: "description" },
              ].map((item, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    width: { xs: "100%", sm: "calc(50% - 8px)" }, // 2 columns on small screens+
                    boxSizing: "border-box",
                    color: "#000",
                  }}
                >
                  <Box sx={{ color: "#249FFC", mb: 1.5 }}>{item.icon}</Box>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    {t(`requirements.items.${item.key}.title`)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", lineHeight: 1.5 }}
                  >
                    {t(`requirements.items.${item.key}.desc`)}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                bgcolor: "#e3f2fd",
                border: "1px dashed #249FFC",
                mb: 5,
                color: "#000",
              }}
            >
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <LocalShipping sx={{ color: "#249FFC" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {t("logistics.title")}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{ mb: 2, lineHeight: 1.7, color: "#333" }}
              >
                {t("logistics.text")}
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.5)",
                  borderRadius: "12px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#1a1a1a" }}
                >
                  {t("logistics.important_note")}
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Right Column: Address & Regions */}
          <Box sx={{ flex: { md: 1 }, width: "100%", color: "#000" }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                bgcolor: "#1a1a1a",
                color: "#000",
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#fff",
                }}
              >
                <LocationOn sx={{ color: "#249FFC" }} />{" "}
                {t("contacts.office_title")}
              </Typography>
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#fff",
                    }}
                  >
                    {t("contacts.name")}
                  </Typography>
                  <Typography sx={{ mt: 0.5, color: "#fff" }}>
                    {t("contacts.address")}
                  </Typography>
                </Box>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: "rgba(36, 159, 252, 0.1)",
                      p: 1,
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    <Phone sx={{ fontSize: 20, color: "#249FFC" }} />
                  </Box>
                  <MuiLink
                    href="tel:+998951700571"
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    +998 95 170 05 71
                  </MuiLink>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: "rgba(36, 159, 252, 0.1)",
                      p: 1,
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    <Email sx={{ fontSize: 20, color: "#249FFC" }} />
                  </Box>
                  <MuiLink
                    href="mailto:protouch.uz@gmail.com"
                    sx={{ color: "#249FFC", textDecoration: "none" }}
                  >
                    protouch.uz@gmail.com
                  </MuiLink>
                </Stack>
              </Stack>
            </Paper>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
              }}
            >
              <Map sx={{ color: "#249FFC" }} /> {t("regions.title")}
            </Typography>
            <Accordion
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                border: "1px solid #eee",
                overflow: "hidden",
                mb: 3,
                color: "#000",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: 600 }}>
                  {t("regions.list_label")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <List dense>
                  {getList("regions.items").map((region, i) => (
                    <ListItem
                      key={i}
                      divider={i !== getList("regions.items").length - 1}
                    >
                      <ListItemText primary={region} sx={{ pl: 1 }} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Box
              sx={{
                p: 3,
                bgcolor: "#fff8e1",
                borderRadius: "16px",
                border: "1px solid #ffe082",
                color: "#000",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#795548", lineHeight: 1.6, fontWeight: 500 }}
              >
                {t("regions.warning")}
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Bottom Stats Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{ mt: 6, color: "#000" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              bgcolor: "#f1f8e9",
              display: "flex",
              gap: 3,
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <Verified sx={{ color: "#4caf50", fontSize: 40 }} />
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: 18, mb: 1, color: "#000" }}
              >
                {t("warranty.title")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", lineHeight: 1.6 }}
              >
                {t("warranty.desc")}
              </Typography>
            </Box>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              bgcolor: "#fff3e0",
              display: "flex",
              gap: 3,
              alignItems: "flex-start",
              flex: 1,
              color: "#000",
            }}
          >
            <AccessTime sx={{ color: "#ff9800", fontSize: 40 }} />
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: 18, mb: 1, color: "#000" }}
              >
                {t("timing.title")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", lineHeight: 1.6 }}
              >
                {t("timing.desc")}
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default ServicePage;
