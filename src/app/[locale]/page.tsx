import { Container, Box } from "@mui/material";
import Header from "../../shared/components/Header";
import HeaderBanner from "../../shared/components/Header/HeaderBanner";
import HomeCategories from "../../shared/components/Main";

export default function HomePage() {
  return (
    <>
     <HeaderBanner />
      <Header />
      <HomeCategories />
    </>
  )
}