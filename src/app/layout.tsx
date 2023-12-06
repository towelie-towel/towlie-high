import { cookies } from "next/headers";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import Providers from "~/components/layout/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cuba Store",
  description: "Made with nextjs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const dataTheme = cookieStore.get("color_theme");
  const lightTheme = cookieStore.get("light_theme");
  const darkTheme = cookieStore.get("dark_theme");
  const gradientTheme = cookieStore.get("gradient_theme");
  const bgColorTheme = cookieStore.get("bg_theme");
  return (
    <html
      data-theme={
        (dataTheme?.value === "light" ? lightTheme?.value : darkTheme?.value) ??
        "light"
      }
      data-light_theme={lightTheme?.value}
      data-dark_theme={darkTheme?.value}
      data-gradient_theme={gradientTheme?.value}
      data-bg_theme={bgColorTheme?.value}
      lang="en"
    >
      <body
        className={`${
          gradientTheme?.value === "true"
            ? "bg-gradient-to-br from-primary to-secondary"
            : "bg-" + bgColorTheme?.value
        }`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
