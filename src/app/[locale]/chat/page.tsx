"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import { ArrowBackIosNew, AttachFile, Send } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Namuna savollar (Quick replies)
const QUICK_QUESTIONS = [
  "Есть ли у вас скидки и бонусы?",
  "Как зарегистрироваться на сайт?",
];

export default function MiniChat() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "75vh",
        mt: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: 0,
          bgcolor: "#fff",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ bgcolor: "#F5F7FB", mr: 2 }}
        >
          <ArrowBackIosNew sx={{ fontSize: 18, color: "#000" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flex: 1, textAlign: "center", fontWeight: 700, mr: 5 }}
        >
          Чат с поддержкой
        </Typography>
      </Box>

      {/* Chat Messages Area */}
      <Box
        sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Quick Questions (Sugestions) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          {QUICK_QUESTIONS.map((q, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: "10px 16px",
                borderRadius: "12px",
                border: index === 0 ? "2px solid #249FFC" : "1px solid #E0E0E0",
                cursor: "pointer",
                maxWidth: "85%",
              }}
            >
              <Typography sx={{ fontSize: 14, color: "#333" }}>{q}</Typography>
            </Paper>
          ))}
        </Box>

        {/* Outgoing Message (User) */}
        <Box sx={{ alignSelf: "flex-end", maxWidth: "80%" }}>
          <Paper
            elevation={0}
            sx={{
              p: "10px 20px",
              bgcolor: "#249FFC",
              color: "#fff",
              borderRadius: "15px 15px 0 15px",
            }}
          >
            <Typography sx={{ fontSize: 15 }}>Привет</Typography>
          </Paper>
        </Box>

        {/* Incoming Message (Support) */}
        <Box sx={{ alignSelf: "flex-start", maxWidth: "80%" }}>
          <Paper
            elevation={0}
            sx={{
              p: "12px 20px",
              bgcolor: "#E9E9E9",
              color: "#000",
              borderRadius: "0 15px 15px 15px",
            }}
          >
            <Typography sx={{ fontSize: 15 }}>
              Здраствуйте чем могу вам помочь?
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Input Field Area */}
      <Box sx={{ p: 2, borderTop: "1px solid #f0f0f0", bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ bgcolor: "#F0F0F0", p: 1.5 }}>
            <AttachFile sx={{ transform: "rotate(45deg)", color: "#666" }} />
          </IconButton>

          <TextField
            fullWidth
            placeholder="Введите текст..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                bgcolor: "#F0F0F0",
                "& fieldset": { border: "none" },
                px: 2,
              },
            }}
          />

          <IconButton
            sx={{
              bgcolor: "#F0F0F0",
              p: 1.5,
              color: message.trim() ? "#249FFC" : "#666",
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
