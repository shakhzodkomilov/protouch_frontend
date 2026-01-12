"use client"
import { Box, Typography, Button, Container } from "@mui/material"
const Navbar = () => {
  return (
    <Box>
    <Box
      sx={{
        width:"100%",
        bgcolor: "#fff",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between"
      }}
    >
        <img src="/LOGOPROTOUCH.svg" alt="Logo" height={40} />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", width: "100%"}}>
        {/* Logo */}

        {/* Center phone */}
        <Box sx={{ flex: 1, display: "flex", gap:3, justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#4E4E4E",
              fontSize: "14px",
              whiteSpace: "nowrap",
              display:"flex",
              alignItems:"center",
              gap:1,    
            }}
          >
            <img src={"/call-outline.svg"}/>
             +998 97 778 23 47
          </Typography>
                    <Typography
            sx={{
              fontWeight: 600,
              color: "#4E4E4E",
              fontSize: "14px",
              whiteSpace: "nowrap",
              display:"flex",
              alignItems:"center",
              gap:1,    
            }}
          >
            <img src={"/call-outline.svg"}/>
             +998 95 170 05 71
          </Typography>
            <Typography
            sx={{
              fontWeight: 600,
              color: "#4E4E4E",
              fontSize: "14px",
              whiteSpace: "nowrap",
              display:"flex",
              alignItems:"center",
              gap:1,    
            }}
          >
            <img src="/location.svg" alt="" />
              Tashkent City, Tong Yulduzi 
          </Typography>
        </Box>

        {/* Right menu */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {["Акции", "Доставка", "О нас", "Государственные закупки", "Юр. лицам"].map((item) => (
            <Button
              key={item}
              sx={{
                fontWeight: 500,
                color: "#4E4E4E",
                textTransform: "none",
                borderRadius: 1,
                px: 2,
                boxShadow: "none",
                fontSize:16,
                "&:hover": {
                  boxShadow: "none",
                  bgcolor: "rgba(25,118,210,0.05)",

                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
    </Box>
  )
}

export default Navbar
