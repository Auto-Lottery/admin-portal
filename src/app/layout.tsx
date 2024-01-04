import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { getLoggedUserCookie } from "@/services/auth-service";
import { Providers } from "./providers";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auto Prime",
  description: "Монголын номер 1 сугалааны платформ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUserData = getLoggedUserCookie();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Providers loggedUserData={loggedUserData}>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
