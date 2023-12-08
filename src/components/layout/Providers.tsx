"use client";
import CartProvider from "~/context/ShoppingCart";
import ThemeProvider from "~/context/Theme";
import { ToastProvider } from "~/context/Toaster";
import { UserProvider } from "~/context/User";

interface IProps {
  children: React.ReactNode;
  colorThemeProp: string;
  lightThemeProp: string;
  darkThemeProp: string;
  gradientThemeProp: string;
  bgThemeProp: string;
}

const Providers: React.FC<IProps> = ({
  children,
  colorThemeProp,
  lightThemeProp,
  darkThemeProp,
  gradientThemeProp,
  bgThemeProp,
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
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
