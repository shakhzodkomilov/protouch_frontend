"use client";

import { Box, Button, Link as MuiLink } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff" }}>
      <Box
        sx={{
          maxWidth: "1800px",
          mx: "auto",
          px: 3,
          height: 70,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* LOGO */}
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src="/LOGOPROTOUCH.svg"
            alt="Protouch"
            width={250}
            height={40}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            priority
          />
        </Box>

        {/* CENTER CONTACTS */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {/* Phone 1 */}
          <MuiLink href="tel:+998977782347" underline="none" sx={contactStyle}>
            <Image src="/call-outline.svg" alt="call" width={18} height={18} />
            +998 97 778 23 47
          </MuiLink>

          {/* Phone 2 */}
          <MuiLink href="tel:+998951700571" underline="none" sx={contactStyle}>
            <Image src="/call-outline.svg" alt="call" width={18} height={18} />
            +998 95 170 05 71
          </MuiLink>

          {/* Location */}
          <MuiLink
            href="https://yandex.uz/maps/-/CLdXa09U"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={contactStyle}
          >
            <Image src="/location.svg" alt="location" width={18} height={18} />
            Tashkent City, Tong Yulduzi
          </MuiLink>
        </Box>

        {/* RIGHT MENU */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { title: "Акции", href: "/sales" },
            { title: "Доставка", href: "/delivery" },
            { title: "О нас", href: "/about-us" },
            { title: "Гос. закупки", href: "/tenders" },
            { title: "Юр. лицам", href: "/business" },
          ].map((item) => (
            <Button
              key={item.title}
              component={Link}
              href={item.href}
              sx={{
                fontWeight: 500,
                color: "#4E4E4E",
                textTransform: "none",
                borderRadius: 1,
                px: 2,
                fontSize: 16,
                "&:hover": {
                  bgcolor: "rgba(36,159,252,0.08)",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const contactStyle = {
  fontWeight: 600,
  color: "#4E4E4E",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  gap: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  "&:hover": {
    color: "#249FFC",
  },
};

export default Navbar;
