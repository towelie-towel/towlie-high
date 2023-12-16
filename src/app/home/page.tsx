"use client";

import ProductCard from "~/components/ProductCard";
import { useCart } from "~/context/ShoppingCart";

export default function HomePage() {
  const { /* cart, addToCart,  */ products /* , categories */ } = useCart();
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      {/* <Sidebar /> */}

      <div className="flex h-full flex-wrap gap-2 overflow-scroll scroll-smooth whitespace-nowrap px-2 py-5">
        {/* <Banner /> */}
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
