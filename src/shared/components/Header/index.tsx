"use client"
import { AppBar, Container } from "@mui/material"
import Navbar from "./Navbar"
import NavbarCotalog from "./NavbarCotalog"

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1800px",
          mx: "auto",
          px: 2,
        }}
      >
        <Navbar />
        <NavbarCotalog/>
      </Container>
    </AppBar>
  )
}
