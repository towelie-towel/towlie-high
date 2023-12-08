"use client";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import SettingsOptions from "~/components/settings/Settings";
import BuyingProcess from "~/components/cart/BuyingProcess";
import { Category, Product } from "~/interfaces/products";

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
  getProducts: () => void;
  getCategories: () => void;
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
}

export const CartProvider: React.FC<IProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
    void getProducts();
    void getCategories();
    setCookie("cart", JSON.stringify(cart));
  }, [cart]);

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
                      <tr key={item.productId}>
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
      <BuyingProcess />
      <SettingsOptions />

      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
