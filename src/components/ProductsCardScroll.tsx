"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useCart } from "~/context/ShoppingCart";
import { useTheme } from "~/context/Theme";
import { useToast } from "~/context/Toaster";

const ProductsCardScroll: React.FC = () => {
  const { cart, addToCart, products } = useCart();
  const { addToast } = useToast();
  const { colorTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const s = searchParams.get("s");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative my-4 h-12">
        <input
          onChange={(e) => {
            void router.push(`/products?s=${e.target.value}`);
          }}
          defaultValue={s ?? ""}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs pr-12"
        />
        <div className="absolute right-2 top-[14px] flex">
          <div className="divider divider-horizontal mx-0" />
          <svg
            onClick={() => {
              console.log("nothing");
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
      <div className="flex h-[calc(100vh-9rem-2px)] max-w-lg flex-wrap items-center justify-around overflow-scroll">
        {/* Products Placeholders */}
        {products.length === 0 &&
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="card glass card-compact mb-8 w-[45%] overflow-hidden rounded-xl"
              >
                <div className="w-full animate-pulse  bg-current pb-[100%] opacity-25"></div>
                <div className="card-body">
                  <h2 className="h-4 w-2/3 animate-pulse rounded-lg bg-current opacity-25"></h2>
                  <h2 className="h-4 w-1/2 animate-pulse rounded-lg bg-current opacity-25"></h2>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">
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
            ))}
        {/* Actual products cards */}
        {products.length > 0 &&
          (s
            ? products.filter(
                (product) => product.search_keys?.includes(s.toLowerCase()),
              )
            : products
          )?.map((product) => (
            <div
              key={product.id}
              className="card glass card-compact mb-8 w-[45%]"
            >
              <figure className="relative w-full overflow-hidden pb-[100%]">
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
                <h2 className="card-title">{product.name}</h2>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    // TODO mostrar no disponemos más de ese producto cuando no haya stock
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
          ))}
      </div>
    </div>
  );
};

export default ProductsCardScroll;
