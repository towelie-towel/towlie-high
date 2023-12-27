"use client";
import React from "react";
import ProductCard from "~/components/ProductCard";
import { useCart } from "~/context/ShoppingCart";

export default function HomePage() {
  const { products, categories } = useCart();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-screen"></div>
      {categories.length > 0 &&
        categories.map((category) => (
          <React.Fragment key={category.id}>
            <div className="divider card-title w-3/4 cursor-all-scroll self-center">
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
              <div className="carousel-item px-5">
                <div className="flex flex-col items-center justify-center">
                  <div className="btn btn-outline items-center justify-center rounded-full text-center">
                    <h2 className="card-title text-center">Ver mas</h2>
                    <svg
                      width="42px"
                      height="42px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18M18 12L13 7M18 12L13 17"
                        className="stroke-current"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </main>
  );
}
