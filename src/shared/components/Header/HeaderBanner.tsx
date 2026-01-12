import { Box, Container, Button } from "@mui/material"
import VerticalText from "./VerticalText"

const HeaderBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        backgroundImage: "url('/HeaderBanner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
         <Box
          width="100%"
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Button sx={{ borderRadius: "14px", padding: "6px 12px", fontWeight: 600, bgcolor: "#FDEC1A", color: "#E8240F" }}>
            АРЕНДА
          </Button>

          <Button
            sx={{
              borderRadius: "14px",
              padding: "12px 18px",
              fontWeight: 600,
              bgcolor: "#E8240F",
              color: "#fff",
              minWidth: 700,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <VerticalText />
          </Button>

          <Button sx={{ borderRadius: "14px", padding: "6px 12px", fontWeight: 600, bgcolor: "#FDEC1A", color: "#E8240F" }}>
            ПРОКАТ
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default HeaderBanner
