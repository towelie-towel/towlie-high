"use client";

import { useEffect } from "react";
import ProductCard from "~/components/ProductCard";
import { useCart } from "~/context/ShoppingCart";
// import { useWindowSize } from "~/hooks/useWindow";

export default function HomePage() {
  const { products, categories } = useCart();

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const scrollers = document.querySelectorAll(".scroller");

      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        addAnimation(scroller);
      });
    }
    function addAnimation(scroller: Element) {
      const scrollerInner = scroller.firstElementChild;
      const scrollerContent = Array.from(
        scrollerInner?.childNodes ?? [],
      ).splice(scrollerInner?.childElementCount ?? 0 / 2);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerInner?.appendChild(duplicatedItem);
      });
      console.log(scroller.firstElementChild?.childElementCount);
    }
  }, []);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full flex-wrap gap-2 overflow-scroll scroll-smooth whitespace-nowrap px-2 py-5">
        {products.length > 0 ? (
          products
            // .sort((a, b) => a.description.length - b.description.length)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <></>
        )}
      </div>
      {categories.length > 0 &&
        categories.map((category) => (
          <>
            <div className="divider w-3/4 self-center">{category.name}</div>
            <div className="carousel carousel-center h-44 w-screen gap-3 px-3">
              {products.filter((p) => p.category.id === category.id).length >
                0 &&
                products
                  .filter((p) => p.category.id === category.id)
                  .map((product) => (
                    <div className="carousel-item">
                      <ProductCard key={product.id} product={product} />
                    </div>
                  ))}
            </div>
          </>
        ))}
      <div className="divider w-3/4 self-center">Footer</div>
    </main>
  );
}
