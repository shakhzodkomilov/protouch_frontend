"use client";

import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export default function AboutUs() {
  return (
    <Box sx={{ py: 8, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 6, bgcolor: "white", color: "#000" }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            PROTOUCH UZ
          </Typography>

          <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.7 }}>
            Ведущий системный интегратор и провайдер цифровых решений в
            Узбекистане.
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 4, color: "text.secondary", lineHeight: 1.7 }}
          >
            Предоставляем полный спектр оборудования и услуг:
          </Typography>

          <List sx={{ mb: 6 }}>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="Интерактивные панели, touch киоски и терминалы" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="Видеоконференции и мультимедиа системы" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="LED экраны и digital signage" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="Серверные решения и локальные сети" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="IP телефония и диспетчерская связь" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="Ситуационные центры и мониторинг" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary="ПО и электронные очереди" />
            </ListItem>
          </List>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            Комплексные решения "под ключ" с гарантией и поддержкой.
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 4, color: "text.secondary", lineHeight: 1.7 }}
          >
            300+ проектов. Прямые поставки. Профессиональная команда.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "primary.main",
              mt: 4,
            }}
          >
            Технологии, которые работают на результат
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
