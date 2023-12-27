"use client";
import Image from "next/image";
import { setCookie } from "cookies-next";
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
  currency: string;
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
      total: cart.total - removedProduct.price * removedProduct.quantity,
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
      <dialog
        id="cart-modal"
        className="modal cursor-pointer max-[768px]:modal-bottom"
      >
        <div className="modal-box relative px-0 py-0">
          <button
            onClick={() =>
              document.querySelector<HTMLDialogElement>("#cart-modal")?.close()
            }
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
          </button>
          <div className="flex flex-col items-center justify-between">
            <div className="card-header my-3 flex gap-2">
              <div className="stack">
                {cart.items.map((item) => (
                  <Image
                    key={item.productId}
                    src={item.imageURL}
                    blurDataURL={item.blurImageUrl}
                    alt={item.name}
                    placeholder="blur"
                    sizes="(max-width: 768px) 60vw,
                      (max-width: 1200px) 40vw,
                      33vw"
                    className="h-16 w-16 rounded object-cover"
                    quality={60}
                    width={64}
                    height={64}
                  />
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
              <>
                <h1 className="card-title text-lg font-bold">
                  Tu carrito esta vacio 😥
                </h1>
                <div className="h-20"></div>
              </>
            ) : (
              <div className="max-h-[60vh] w-full overflow-scroll bg-base-100">
                <table className="table-compact table table-zebra table-pin-rows w-full">
                  <thead>
                    <tr>
                      <th className="text-lg">Producto</th>
                      <th className="text-lg">Precio</th>
                      <th className="text-lg">Cantidad</th>
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
                        <th>
                          {item.price} {item.currency}
                        </th>
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
                      </tr>
                    ))}
                    <tr>
                      <th className="h-20"></th>
                      <th className="h-20"></th>
                      <th className="h-20"></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              document
                .querySelector<HTMLDialogElement>("#buy-modal")
                ?.showModal();
            }}
            className={`btn btn-primary absolute bottom-5 right-28 z-20 ${
              cart.items?.length === 0 ? "btn-disabled" : ""
            }`}
          >
            Comprar
          </button>
          <button
            onClick={() =>
              document.querySelector<HTMLDialogElement>("#cart-modal")?.close()
            }
            className="btn btn-primary absolute bottom-5 right-4 z-20"
          >
            Cerrar
          </button>
        </div>
      </dialog>

      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
