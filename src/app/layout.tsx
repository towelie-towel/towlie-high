import { cookies } from "next/headers";

import "~/styles/globals.css";
import Providers from "~/components/layout/Providers";
import sql from "~/lib/db";
import Layout from "~/components/layout/Layout";
import type { Category, Product, Theme } from "~/interfaces";
import { type Cart } from "~/context/ShoppingCart";

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
  let dataTheme = cookieStore.get("color_theme")?.value as "light" | "dark";
  let lightTheme = cookieStore.get("light_theme")?.value;
  let darkTheme = cookieStore.get("dark_theme")?.value;
  let gradientTheme = cookieStore.get("gradient_theme")?.value;
  let bgColorTheme = cookieStore.get("bg_theme")?.value;
  const cart = cookieStore.get("cart")?.value;

  if (
    !dataTheme ||
    !lightTheme ||
    !darkTheme ||
    !gradientTheme ||
    !bgColorTheme
  ) {
    const themeData = await sql<Theme[]>`SELECT * FROM themes WHERE id = 1`;
    if (themeData[0]) {
      dataTheme = dataTheme ?? themeData[0].color_theme;
      lightTheme = lightTheme ?? themeData[0].light_theme;
      darkTheme = darkTheme ?? themeData[0].dark_theme;
      gradientTheme = gradientTheme ?? themeData[0].gradient_theme;
      bgColorTheme = bgColorTheme ?? themeData[0].bg_theme;
    }
  }

  const categories = await sql<Category[]>`
    SELECT *
    FROM categories 
    ORDER BY id ASC
  `;

  const products = await sql<Product[]>`
    SELECT
        p.*,
        JSON_AGG(JSON_BUILD_OBJECT(
            'id', si.id,
            'url', si.url,
            'blur', si.blur,
            'size_mb', si.size_mb,
            'color', si.color
        )) as secondary_images,
        JSON_BUILD_OBJECT(
            'id', c.id,
            'name', c.name,
            'priority', c.priority
        ) as category,
        JSON_BUILD_OBJECT(
            'id', pi.id,
            'url', pi.url,
            'blur', pi.blur,
            'size_mb', pi.size_mb,
            'color', pi.color
        ) as primary_image
    FROM products p
        JOIN images pi on p.image_id = pi.id
        LEFT JOIN images si on p.id = si.product_id
        JOIN categories c on p.category_id = c.id
    GROUP BY p.id, c.id, pi.id
    ORDER BY p.id ASC
  `;

  return (
    <html
      data-theme={(dataTheme === "light" ? lightTheme : darkTheme) ?? "light"}
      data-light_theme={lightTheme}
      data-dark_theme={darkTheme}
      data-gradient_theme={gradientTheme}
      data-bg_theme={bgColorTheme}
      lang="en"
    >
      <body
        className={`${
          gradientTheme === "true"
            ? "bg-gradient-to-br from-primary to-secondary"
            : "bg-" + bgColorTheme
        }`}
      >
        <Providers
          cartProp={
            (JSON.parse(cart ?? "null") as Cart) ?? { items: [], total: 0 }
          }
          colorThemeProp={dataTheme ?? "light"}
          lightThemeProp={lightTheme ?? ""}
          darkThemeProp={darkTheme ?? ""}
          gradientThemeProp={gradientTheme ?? ""}
          bgThemeProp={bgColorTheme ?? ""}
          categoriesProp={categories}
          productsProp={products}
        >
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
