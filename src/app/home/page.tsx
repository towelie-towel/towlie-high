"use client";

import ProductCard from "~/components/ProductCard";
import { useCart } from "~/context/ShoppingCart";

export default function HomePage() {
  const { /* cart, addToCart,  */ products /* , categories */ } = useCart();
  return (
    <main className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* <Sidebar /> */}

      <div className="col-span-2">
        {/* <Banner /> */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
