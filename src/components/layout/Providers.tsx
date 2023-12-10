"use client";
import CartProvider, { type Cart } from "~/context/ShoppingCart";
import ThemeProvider from "~/context/Theme";
import { ToastProvider } from "~/context/Toaster";
import { UserProvider } from "~/context/User";
import type { Product, Category } from "~/interfaces";

interface IProps {
  children: React.ReactNode;
  colorThemeProp: string;
  lightThemeProp: string;
  darkThemeProp: string;
  gradientThemeProp: string;
  bgThemeProp: string;
  cartProp: Cart;
  categoriesProp: Category[];
  productsProp: Product[];
}

const Providers: React.FC<IProps> = ({
  children,
  colorThemeProp,
  lightThemeProp,
  darkThemeProp,
  gradientThemeProp,
  bgThemeProp,
  cartProp,
  categoriesProp,
  productsProp,
}) => {
  return (
    <ThemeProvider
      colorThemeProp={colorThemeProp}
      lightThemeProp={lightThemeProp}
      darkThemeProp={darkThemeProp}
      gradientThemeProp={gradientThemeProp}
      bgThemeProp={bgThemeProp}
    >
      <UserProvider>
        <CartProvider
          productsProp={productsProp}
          categoriesProp={categoriesProp}
          cartProp={cartProp}
        >
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
