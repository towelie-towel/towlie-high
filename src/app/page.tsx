"use client";
import React from "react";
import ProductCard from "~/components/ProductCard";
import { useCart } from "~/context/ShoppingCart";
// import { useWindowSize } from "~/hooks/useWindow";

export default function HomePage() {
  const { products, categories } = useCart();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      {/* <div className="flex h-full flex-wrap gap-2 overflow-scroll scroll-smooth whitespace-nowrap px-2 py-5">
        {products.length > 0 ? (
          products
            // .sort((a, b) => a.description.length - b.description.length)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <></>
        )}
      </div> */}
      {categories.length > 0 &&
        categories.map((category) => (
          <React.Fragment key={category.id}>
            <div className="divider w-3/4 cursor-all-scroll self-center">
              {category.name}
            </div>
            <div className="carousel carousel-center w-full gap-3 px-3">
              {products.filter((p) => p.category.id === category.id).length >
                0 &&
                products
                  .filter((p) => p.category.id === category.id)
                  .map((product) => (
                    <div key={product.id} className="carousel-item">
                      <ProductCard key={product.id} product={product} />
                    </div>
                  ))}
            </div>
          </React.Fragment>
        ))}
    </main>
  );
}
