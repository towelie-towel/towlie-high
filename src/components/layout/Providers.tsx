"use client";
import CartProvider from "~/context/ShoppingCart";
import { ToastProvider } from "~/context/Toaster";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  );
};

export default Providers;
