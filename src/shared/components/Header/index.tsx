"use client";
import { AppBar, Container } from "@mui/material";
import Navbar from "./Navbar";
import NavbarCotalog from "./NavbarCotalog";
import HeaderBanner from "./HeaderBanner";

export default function Header() {
  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        padding: "0 0",
      }}
    >
      <HeaderBanner />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1720px",
          margin: "0 auto",
          padding: "0 0",
        }}
      >
        <Navbar />
        <NavbarCotalog />
      </Container>
    </AppBar>
  );
}
