"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  ArrowBackIosNew,
  PhoneEnabledOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const CONTACT_PHONES = [
  "+998 97 778 23 47",
  "+998 95 170 05 71",
  "+998 95 193 77 00",
];

export default function ContactsPage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: "#F5F7FB", minHeight: "100vh", p: 2, mt: 14 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 1 }}>
        <IconButton
          onClick={() => router.back()}
          sx={{
            bgcolor: "#fff",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: 18, color: "#000" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 700,
            mr: 5,
            color: "#000",
          }}
        >
          Контакты
        </Typography>
      </Box>

      {/* Phones List */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", mb: 2 }}>
        <List disablePadding>
          {CONTACT_PHONES.map((phone, index) => (
            <React.Fragment key={phone}>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  sx={{ py: 2 }}
                >
                  <ListItemIcon sx={{ minWidth: 46, color: "#249FFC" }}>
                    <PhoneEnabledOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={phone}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#000",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {index !== CONTACT_PHONES.length - 1 && (
                <Divider variant="inset" sx={{ ml: 6, opacity: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Address */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <ListItemButton
          sx={{ py: 2.5 }}
          component="a"
          href="https://yandex.uz/maps/-/CLtEBDoF"
          target="_blank"
        >
          <ListItemIcon sx={{ minWidth: 46, color: "#249FFC" }}>
            <LocationOnOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Мирабадский район, махаллинский сход граждан Тонг Юлдузи"
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: 500,
              color: "#000",
            }}
          />
        </ListItemButton>
      </Paper>
    </Box>
  );
}
