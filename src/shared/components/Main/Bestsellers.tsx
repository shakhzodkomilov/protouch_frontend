"use client"

import { Box, IconButton, Typography } from "@mui/material"
import { useRef } from "react"

const Brends = () => {
  const brends = [
    { img: "/dahua.svg" },
    { img: "/galaxyhub.svg" },
    { img: "/huawei.svg" },
    { img: "/minrray.svg" },
    { img: "/porurobotics.svg" },
    { img: "/vlinka.svg" },
    { img: "/vlinka.svg" },
    { img: "/vlinka.svg" },
    { img: "/vlinka.svg" },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    })
  }

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color:"#000" }}>
        Бренды
      </Typography>
      <Box sx={{ position: "relative", mt: "34px", px: "34px" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 60,
            height: 60,
          }}
        >
          <img src="/arrowleft.svg" width="32" />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 60,
            height: 60,
          }}
        >
          <img src="/arrowright.svg" width="32" />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            px: "70px", 
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {brends.map((item, i) => (
            <Box
              key={i}
              sx={{
                minWidth: "280px",
                p: "24px 28px",
                borderRadius: "18px",
                border: "1px solid #DDDDDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
            <img src="" alt="" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
export default Brends