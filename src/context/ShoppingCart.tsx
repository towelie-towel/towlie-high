"use client";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { createContext, useContext, useState, useEffect } from "react";

import { type Category, type Product } from "~/interfaces";

// TODO: review CartItem attributes
export interface CartItem {
  productId: number;
  imageURL: string;
  blurImageUrl: string;
  productStock: number;
  name: string;
  price: number;
  quantity: number;
}
export interface Cart {
  items: CartItem[];
  total: number;
}
export interface CartContext {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  products: Product[];
  categories: Category[];
  getProducts: () => Promise<void>;
  getCategories: () => Promise<void>;
}

const CartContext = createContext<CartContext | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
  cartProp: Cart;
  productsProp: Product[];
  categoriesProp: Category[];
}

export const CartProvider: React.FC<IProps> = ({
  children,
  cartProp,
  productsProp,
  categoriesProp,
}) => {
  const [cart, setCart] = useState<Cart>(cartProp);
  const [products, setProducts] = useState<Product[]>(productsProp);
  const [categories, setCategories] = useState<Category[]>(categoriesProp);

  const getProducts = async () => {
    const res = await fetch("/api/products");
    const data = (await res.json()) as Product[];
    setProducts(data);
  };
  const getCategories = async () => {
    const res = await fetch("/api/categories");
    const data = (await res.json()) as Category[];
    setCategories(data);
  };

  useEffect(() => {
    setCookie("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    function toggleCartQuery() {
      if (modalToggle) {
        console.log("toggleCartQuery");
        const url = new URL(window.location.href);
        if (modalToggle.checked) {
          url.searchParams.set("cart", "open");
        } else {
          url.searchParams.delete("cart");
        }
        window.history.pushState({}, "", url.toString());
      }
    }

    const modalToggle = document.getElementById(
      "cart-modal",
    ) as HTMLInputElement | null;

    const url = new URL(window.location.href);
    const cartParam = url.searchParams.get("cart");
    if (cartParam === "open" && modalToggle) {
      modalToggle.checked = true;
    }

    if (modalToggle) {
      modalToggle.addEventListener("change", toggleCartQuery);
    }

    return () => {
      if (modalToggle) {
        modalToggle.removeEventListener("change", toggleCartQuery);
      }
    };
  }, []);

  const addToCart = (newItem: CartItem) => {
    const existItem = cart.items.find(
      (item) => item.productId === newItem.productId,
    );

    if (existItem) {
      setCart({
        items: cart.items.map((item) =>
          item.productId === existItem.productId
            ? { ...existItem, quantity: existItem.quantity + newItem.quantity }
            : item,
        ),
        total: cart.total + newItem.price,
      });
    } else {
      setCart({
        items: [...cart.items, newItem],
        total: cart.total + newItem.price,
      });
    }
  };

  const removeFromCart = (productId: number) => {
    const removedProduct = cart.items.find(
      (item) => item.productId === productId,
    );

    if (!removedProduct) {
      throw new Error("Product not found");
    }

    setCart({
      items: cart.items.filter(
        (item) => item.productId !== removedProduct.productId,
      ),
      total: cart.total - removedProduct.price,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        products,
        categories,
        getProducts,
        getCategories,
      }}
    >
      <input type="checkbox" id="cart-modal" className="modal-toggle" />
      <label
        htmlFor="cart-modal"
        className="modal cursor-pointer max-[768px]:modal-bottom"
      >
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="cart-modal"
            className="btn btn-ghost absolute right-4 top-4 z-20 cursor-pointer rounded-full"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </label>
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="card-header flex gap-2">
              <div className="stack">
                {cart.items.map((item) => (
                  <figure
                    key={item.productId}
                    className="relative w-16 overflow-hidden rounded-xl pb-[100%]"
                  >
                    <Image
                      src={item.imageURL}
                      blurDataURL={item.blurImageUrl}
                      alt={item.name}
                      placeholder="blur"
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 60vw,
                      (max-width: 1200px) 40vw,
                      33vw"
                      quality={60}
                    />
                  </figure>
                ))}
              </div>
              <div className="flex flex-col">
                <h1 className="card-title text-lg font-bold">
                  {cart.items?.reduce((a, b) => a + b.quantity, 0)} Productos
                </h1>
                <h2 className="card-title text-info">Total: ${cart.total}</h2>
              </div>
            </div>
            {cart.items?.length === 0 ? (
              <h1 className="card-title text-lg font-bold">
                Tu carrito esta vacio 😥
              </h1>
            ) : (
              <div className="max-h-[40vh] w-full overflow-scroll bg-base-100">
                <table className="table-compact table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items?.map((item) => (
                      <tr className="relative" key={item.productId}>
                        <th>
                          <Image
                            src={item.imageURL}
                            alt={item.name}
                            placeholder="blur"
                            blurDataURL={item.blurImageUrl}
                            width={64}
                            height={64}
                          />
                        </th>
                        <th>{item.price}</th>
                        <th>
                          <select
                            onChange={(e) => {
                              const newQuantity = Number(e.target.value);

                              setCart({
                                total:
                                  cart.total +
                                  (newQuantity - item.quantity) * item.price,
                                items: cart.items.map((product) =>
                                  product.productId === item.productId
                                    ? { ...product, quantity: newQuantity }
                                    : product,
                                ),
                              });
                            }}
                            value={item.quantity}
                            className="select"
                          >
                            {Array(item.productStock)
                              .fill(0)
                              .map((_, index) => (
                                <option value={index + 1} key={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                          </select>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="btn btn-error btn-xs absolute right-0 top-0"
                          >
                            <svg
                              width="16px"
                              height="16px"
                              viewBox="-3 0 32 32"
                              version="1.1"
                            >
                              <defs></defs>
                              <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  id="Icon-Set-Filled"
                                  transform="translate(-261.000000, -205.000000)"
                                  fill="#000000"
                                >
                                  <path
                                    d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                                    id="trash"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </button>
                        </th>
                        <th>{item.quantity * item.price}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="modal-action">
            <label
              onClick={() => {
                console.log("cookies", getCookie("cart"));
                console.log("cart", cart);
              }}
              className="btn btn-primary"
            >
              Cookies/Cart
            </label>
            <label
              id="open-buy-modal"
              htmlFor="buy-modal"
              className={`btn btn-primary ${
                cart.items?.length === 0 ? "btn-disabled" : ""
              }`}
            >
              Comprar
            </label>
            <label htmlFor="cart-modal" className="btn btn-primary">
              Close
            </label>
          </div>
        </label>
      </label>

      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
