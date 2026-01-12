"use client"

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; // Ensure you have @mui/material-nextjs installed
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Inter } from "next/font/google"
import { ReactNode, useMemo } from "react"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export default function ThemeProviderClient({ children }: { children: ReactNode }) {
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "light",
        primary: { main: "#fff" },
        text: {
          primary: "#fff", 
        },
      },
      typography: {
        fontFamily: inter.style.fontFamily,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: inter.style.fontFamily,
              height: "100%", // Apply height here instead of a wrapper div
            },
            html: {
              height: "100%",
            }
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              color: "#fff",
              background: "transparent",
            },
          },
        },
      },
    }),
    []
  )

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
     {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}