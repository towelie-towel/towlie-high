import { cookies } from "next/headers";

import "~/styles/globals.css";
import Providers from "~/components/layout/Providers";
import { conn } from "~/lib/db";
import Layout from "~/components/layout/Layout";
import { type Theme } from "~/interfaces";

export const metadata = {
  title: "Cuba Store",
  description: "Made with nextjs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  let dataTheme = cookieStore.get("color_theme")?.value;
  let lightTheme = cookieStore.get("light_theme")?.value;
  let darkTheme = cookieStore.get("dark_theme")?.value;
  let gradientTheme = cookieStore.get("gradient_theme")?.value;
  let bgColorTheme = cookieStore.get("bg_theme")?.value;

  if (
    !dataTheme ||
    !lightTheme ||
    !darkTheme ||
    !gradientTheme ||
    !bgColorTheme
  ) {
    const theme = await conn.query("SELECT * FROM theme WHERE id = 1");
    const themeData = theme.rows[0] as Theme;
    console.log(themeData);
    dataTheme = dataTheme ?? themeData.color_theme;
    lightTheme = lightTheme ?? themeData.light_theme;
    darkTheme = darkTheme ?? themeData.dark_theme;
    gradientTheme = gradientTheme ?? themeData.gradient_theme;
    bgColorTheme = bgColorTheme ?? themeData.bg_theme;
  }

  return (
    <html
      className="h-full"
      data-theme={(dataTheme === "light" ? lightTheme : darkTheme) ?? "light"}
      data-light_theme={lightTheme}
      data-dark_theme={darkTheme}
      data-gradient_theme={gradientTheme}
      data-bg_theme={bgColorTheme}
      lang="en"
    >
      <body
        className={`h-full ${
          gradientTheme === "true"
            ? "bg-gradient-to-br from-primary to-secondary"
            : "bg-" + bgColorTheme
        }`}
      >
        <Providers
          colorThemeProp={dataTheme ?? ""}
          lightThemeProp={lightTheme ?? ""}
          darkThemeProp={darkTheme ?? ""}
          gradientThemeProp={gradientTheme ?? ""}
          bgThemeProp={bgColorTheme ?? ""}
        >
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
