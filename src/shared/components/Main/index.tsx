"use client"

import { useRef } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Brends from "./Brends"

const cards = [
  { title: "Интерактивные панели", bg: "#64D2FF", img: "/category_1.svg" },
  { title: "Инфокиоски", bg: "#FF8E71", img: "/category_2.svg" },
  { title: "Мультимедийные трибуны", bg: "#6BD47E", img: "/category_3.svg" },
  { title: "Акции", bg: "#F2C94C", img: "/category_4.svg" },
  { title: "ВКС камеры", bg: "#9B8AFF", img: "/category_5.svg" },
]

export default function HomeCategories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    })
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, maxWidth: "1800px" }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* LEFT CARD */}
        <Box
          sx={{
            bgcolor: "#FFF7DA",
            minWidth: 250,
            p: "24px 44px",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color:"#000"
          }}
        >
          <Box>
            <Typography fontWeight={600}>Личный кабинет</Typography>
            <Typography width={"80%"}>
              Получайте бонусы, отслеживайте заказы и делитесь мнением
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2}}>
            <Button variant="outlined" sx={{color:"#4E4E4E", border:"1px solid #4E4E4E", borderRadius:"8px"}}>Войти</Button>
            <Button variant="outlined" sx={{color:"#4E4E4E", border:"1px solid #4E4E4E", borderRadius:"8px"}}>Мои заказы</Button>
          </Box>
        </Box>

        {/* SLIDER AREA */}
        <Box sx={{ position: "relative", flex: 1, overflow:"hidden", px:"24px"}}>
          {/* LEFT BTN */}
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: 5,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              boxShadow: 2,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* RIGHT BTN */}
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: 5,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              boxShadow: 2,
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* SCROLL CONTAINER */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              pr: 4,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {cards.map((item, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 320,
                  height: 280,
                  borderRadius: "24px",
                  background: item.bg,
                  p: 3,
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Typography fontWeight={600} color="#fff">
                  {item.title}
                </Typography>

                <Box
                  component="img"
                  src={item.img}
                  sx={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    width: "55%",
                    height: "55%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Brends/>
    </Container>
  )
}
