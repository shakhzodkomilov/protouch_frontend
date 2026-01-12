"use client"

import { AppBar, Box, Button, InputBase, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import ScaleIcon from "@mui/icons-material/Scale"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"

const NavbarCotalog = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
          py: 1.5,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between", 
          gap: 2,
        }}
      >
        <Button
          startIcon={<MenuIcon />}
          sx={{
            bgcolor: "#2196f3",
            color: "#fff",
            px: 3,
            py: 1.2,
            height:"55px",
            borderRadius: 4,
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#1e88e5",
            },
          }}
        >
          Каталог товаров
        </Button>
        {/* Search */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            height:"55px",
            px: 2,
            py: 1,
            borderRadius: 4,
          }}
        >
          <SearchIcon sx={{ color: "#4E4E4E", mr: 1 }} />
          <InputBase
            placeholder="Поиск"
            sx={{
              width: "100%",
              color:"#4E4E4E",
              fontSize: 16,
            }}
          />
        </Box>

        {/* Right icons */}
        <Box sx={{ display: "flex", gap: 3, alignItems:"center",  }}>
          <HeaderIcon icon={<ScaleIcon  sx={{color:"#000"}}/>} label="Сравнение"  />
          <HeaderIcon icon={<ShoppingCartOutlinedIcon sx={{color:"#000"}} />} label="Корзина" />
          <HeaderIcon icon={<FavoriteBorderIcon sx={{color:"#000"}} />} label="Избранное" />
          <HeaderIcon icon={<SupportAgentIcon sx={{color:"#000"}} />} label="Связь" />
        </Box>
      </Box>
    </AppBar>
  )
}

export default NavbarCotalog

const HeaderIcon = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 12,
        color: "#555",
        cursor: "pointer",
        "&:hover": { color: "#000" },
      }}
    >
      <IconButton sx={{ color: "inherit" }}>{icon}</IconButton>
      {label}
    </Box>
  )
}
