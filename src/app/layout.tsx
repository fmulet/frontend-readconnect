'use client';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider } from "./context";
import { UiProvider } from "./context/ui";
import { lightTheme } from "./themes/light-theme";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </UiProvider>
          </AuthProvider>
        </SWRConfig>
      </body>
    </html>
  )
}
