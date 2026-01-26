"use client";
import { AppBar, Container } from "@mui/material";
import Navbar from "./Navbar";
import NavbarCotalog from "./NavbarCotalog";
import HeaderBanner from "./HeaderBanner";

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
      <HeaderBanner />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1800px",
          mx: "auto",
        }}
      >
        <Navbar />
        <NavbarCotalog />
      </Container>
    </AppBar>
  );
}
