"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCart } from "~/context/ShoppingCart";
import { useTheme } from "~/context/Theme";
import { useToast } from "~/context/Toaster";
import useFilter from "~/hooks/useFilter";

const ProductsCardScroll: React.FC = () => {
  const { cart, addToCart, products, categories } = useCart();
  const { filteredProducts, handleFilterChange, filters } = useFilter(products);
  const { addToast } = useToast();
  const { colorTheme } = useTheme();

  const selectRef = useRef<HTMLSelectElement>(null);

  const keyFilter = useRef(filters.keys);
  const minFilter = useRef(filters.price.min);
  const maxFilter = useRef(filters.price.max);
  const [debouncedFilter, setDebouncedFilter] = useState(keyFilter.current);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleFilterChange("keys", keyFilter.current);
      handleFilterChange("price", {
        min: minFilter.current,
        max: maxFilter.current,
      });
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedFilter]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex min-h-fit flex-wrap items-center justify-around overflow-x-scroll scroll-smooth">
        <div className="my-4 flex w-full flex-col items-center justify-center gap-2">
          <div className="relative h-12 w-52">
            <input
              onChange={(e) => {
                keyFilter.current = e.target.value;
                setDebouncedFilter(e.target.value);
              }}
              defaultValue={filters.keys}
              type="text"
              placeholder="Busca un Producto"
              className="input input-bordered w-full max-w-xs pr-12"
            />
            <div className="absolute right-2 top-[0.875rem] flex">
              <div className="mr-2 w-[1px] bg-[var(--fallback-bc,oklch(var(--bc)/0.1))]" />
              <svg
                onClick={() => {
                  console.log("aa");
                }}
                style={{
                  fill: colorTheme === "light" ? "black" : "white",
                }}
                height="20px"
                width="20px"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    className="st0"
                    d="M312.069,53.445c-71.26-71.26-187.194-71.26-258.454,0c-71.261,71.26-71.261,187.206,0,258.466
      c71.26,71.26,187.194,71.26,258.454,0S383.329,124.705,312.069,53.445z M286.694,286.536
      c-57.351,57.34-150.353,57.34-207.704-0.011s-57.351-150.353,0-207.693c57.351-57.351,150.342-57.351,207.693,0
      S344.045,229.174,286.694,286.536z"
                  />
                  <path
                    className="st0"
                    d="M101.911,112.531c-29.357,37.725-31.801,89.631-7.321,129.702c1.877,3.087,5.902,4.048,8.978,2.182
      c3.065-1.888,4.037-5.903,2.16-8.978c-21.666-35.456-19.506-81.538,6.469-114.876c2.226-2.837,1.713-6.938-1.135-9.154
      C108.227,109.193,104.125,109.695,101.911,112.531z"
                  />
                  <path
                    className="st0"
                    d="M498.544,447.722l-132.637-129.2c-7.255-7.07-18.84-6.982-26.008,0.174l-21.033,21.033
      c-7.156,7.156-7.234,18.742-0.153,25.986l129.19,132.636c14.346,17.324,35.542,18.35,51.917,1.964
      C516.216,483.951,515.857,462.068,498.544,447.722z"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="w-52">
            <select
              ref={selectRef}
              defaultValue={"category"}
              onChange={(e) => {
                handleFilterChange("categories", [
                  ...filters.categories,
                  parseInt(e.target.value),
                ]);
                if (selectRef.current) selectRef.current.value = "category";
              }}
              className="select select-bordered w-full max-w-xs"
            >
              <option value={"category"} disabled>
                Categoría
              </option>
              {categories.length > 0 &&
                categories?.map((category) => (
                  <option
                    disabled={filters.categories.includes(category.id)}
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex w-52 justify-between gap-2">
            <input
              onChange={(e) => {
                minFilter.current = parseInt(e.target.value);
                setDebouncedFilter(e.target.value);
              }}
              defaultValue={filters.price.min ?? undefined}
              type="number"
              placeholder="Mín"
              className="input input-bordered w-24"
            />
            <input
              onChange={(e) => {
                maxFilter.current = parseInt(e.target.value);
                setDebouncedFilter(e.target.value);
              }}
              defaultValue={filters.price.max ?? undefined}
              type="number"
              placeholder="Máx"
              className="input input-bordered w-24"
            />
          </div>
        </div>

        <div className="flex h-[1.25rem] w-[96%] max-w-[95vw] overflow-x-scroll max-sm:w-[96vw]">
          <div className="flex min-w-fit flex-1 justify-center gap-2 overflow-x-scroll">
            {(filters.categories.length > 0
              ? categories.filter((c) => filters.categories.includes(c.id))
              : categories
            ).map((category) => (
              <div
                className="badge badge-neutral gap-2"
                key={category.id}
                onClick={() => {
                  handleFilterChange(
                    "categories",
                    filters.categories.length > 0
                      ? filters.categories.filter((c) => c !== category.id)
                      : categories
                          .map((c) => c.id)
                          .filter((c) => c !== category.id),
                  );
                  if (selectRef.current) selectRef.current.value = "category";
                }}
              >
                <h4 className="singleLine">{category.name}</h4>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="divider divider-neutral w-3/4">
          <div className="badge badge-accent">
            <h2 className="singleLine">{"Todos"}</h2>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-around overflow-scroll">
          {filteredProducts.length > 0 ? (
            filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="card glass card-compact mb-8 w-[48%] max-w-xs bg-opacity-20 max-lg:min-w-[35vw]"
              >
                <figure className="relative w-full overflow-hidden bg-base-100 pb-[100%] opacity-80 shadow-xl">
                  <Link href={`products/${product.slug}`}>
                    <Image
                      src={product.primary_image.url}
                      blurDataURL={product.primary_image.blur}
                      alt={product.name}
                      placeholder="blur"
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 60vw,
                        (max-width: 1200px) 40vw,
                        33vw"
                      quality={60}
                    />
                  </Link>
                </figure>
                <div className="card-body">
                  <h2 className="singleLine text-xl text-neutral">
                    {product.name}
                  </h2>
                  <div className="card-actions items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral">
                      {product.price} {product.currency}
                    </h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const existItem = cart.items.find(
                          (item) => item.productId === product.id,
                        );

                        if (existItem && product.stock <= existItem.quantity) {
                          addToast({
                            title: "No stock",
                            description:
                              "Sorry, we don't have that many in stock",
                            type: "error",
                          });
                          return;
                        }

                        addToCart({
                          productId: product.id,
                          imageURL: product.primary_image.url,
                          blurImageUrl: product.primary_image.blur,
                          productStock: product.stock,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height={24}
                        width={24}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No se encontraron productos con ese criterio</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCardScroll;
