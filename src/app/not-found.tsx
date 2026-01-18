"use client";

import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Alert,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowBack, Refresh } from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion"; // npm i framer-motion for animations

export default function NotFound() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main} 0%, transparent 50%), 
                     radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main} 0%, transparent 50%), 
                     ${theme.palette.background.default}`,
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Animated error icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Alert
                severity="error"
                variant="outlined"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  p: 2,
                  fontSize: "3rem",
                  fontWeight: 800,
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                  border: `3px dashed ${theme.palette.error.main}`,
                }}
              >
                !
              </Alert>
            </motion.div>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "5rem", sm: "7rem" },
                fontWeight: 900,
                background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 0.9,
                mb: 1,
              }}
            >
              404
            </Typography>

            <Box sx={{ textAlign: "center", maxWidth: 400 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{ color: "text.primary" }}
              >
                Страница не найдена
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                К сожалению, запрашиваемая страница не существует. Проверьте URL
                или вернитесь на главную.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/"
                startIcon={<ArrowBack />}
                sx={{ flex: 1, py: 1.5, fontSize: "1.1rem" }}
              >
                На главную
              </Button>
              <IconButton
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                }}
              >
                <Refresh />
              </IconButton>
            </Stack>

            <Alert
              severity="info"
              variant="outlined"
              sx={{ mt: 2, width: "100%" }}
            >
              Совет: Попробуйте поискать нужную информацию в меню навигации.
            </Alert>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
