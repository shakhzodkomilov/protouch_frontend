"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

const Brends = () => {
  const brends = [
    { img: "/dahua.svg" },
    { img: "/galaxyhub.svg" },
    { img: "/huawei.svg" },
    { img: "/minrray.svg" },
    { img: "/porurobotics.svg" },
    { img: "/vlinka.svg" },
    { img: "/iqonex.png" },
    { img: "/hpBrend.png" },
    { img: "/tenveoBrands.jpg" },
    { img: "/minew.png" },
    { img: "/dellBrend.png" },
    { img: "/okvBrend.png" },
    { img: "/lenovoBrend.png" },
    { img: "/hevlettBrend.png" },
    { img: "/shileBrand.png" },
    { img: "/yealinkBrend.png" },
    { img: "/unitreeBrend.png" },
    { img: "/absenBrend.png" },
    { img: "/ugreenBrend.png" },
    { img: "/averBrend.png" },
    { img: "/yamahaBrend.png" },
    { img: "/boschBrend.png" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Бренды
      </Typography>
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "60%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 40,
            height: 40,
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Image src="/arrowleft.svg" width="32" height="32" alt="arrow left" />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -20,
            top: "60%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 40,
            height: 40,
            "@media (max-width:900px)": {
              display: "none",
            },
          }}
        >
          <Image
            src="/arrowright.svg"
            width="32"
            height="32"
            alt="arrow right"
          />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pt: "20px",
          }}
        >
          {brends.map((item, i) => (
            <Box
              key={i}
              sx={{
                minWidth: "280px",
                width: "100%",
                height: "100px",
                objectFit: "contain",
                borderRadius: "18px",
                border: "1px solid #DDDDDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={item.img}
                alt="brand"
                width={190}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Brends;
