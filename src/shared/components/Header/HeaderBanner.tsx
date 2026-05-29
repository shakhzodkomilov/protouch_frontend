import { Box, Container, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HeaderBanner = () => {
  const router = useRouter();

  const marqueeContent = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
        whiteSpace: "nowrap",
        pr: "32px",
      }}
    >
      {/* Left text */}
      <Box
        component="span"
        sx={{ fontSize: "15px", fontWeight: 500, color: "white" }}
      >
        • Интерактивное и AV-оборудование в аренду посуточно
      </Box>

      {/* АРЕНДА button */}
      <Button
        onClick={() => router.push(`/`)}
        sx={{
          borderRadius: "20px",
          padding: "4px 16px",
          fontWeight: 600,
          bgcolor: "transparent",
          fontSize: "13px",
          color: "white",
          border: "1.5px solid white",
          minWidth: "unset",
          flexShrink: 0,
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
        }}
      >
        АРЕНДА
      </Button>

        {/* Right text */}
        <Box
          component="span"
          sx={{ fontSize: "15px", fontWeight: 500, color: "white" }}
        >
          • Выберите товар — наш специалист свяжется с вами, чтобы обсудить
          условия
        </Box>
        <Button
          onClick={() => router.push(`/`)}
        sx={{
          borderRadius: "20px",
          padding: "4px 16px",
          fontWeight: 600,
          bgcolor: "transparent",
          fontSize: "13px",
          color: "white",
          border: "1.5px solid white",
          minWidth: "unset",
          flexShrink: 0,
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
        }}
      >
        АРЕНДА
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        bgcolor: "#0C4DFD",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        "@media (max-width:1100px)": {
          display: "none",
        },
        // Marquee keyframes
        "@keyframes marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      }}
    >
      {/* Scrolling track — duplicate content for seamless loop */}
      <Box
        sx={{
          display: "flex",
          animation: "marquee 20s linear infinite",
          width: "max-content",
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {marqueeContent}
        {marqueeContent}
      </Box>
    </Box>
  );
};

export default HeaderBanner;
