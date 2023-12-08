import Image from "next/image";
import { useCart } from "~/context/ShoppingCart";
import { useToast } from "~/context/Toaster";

const ProductsCardScroll: React.FC = () => {
  const { cart, addToCart, products } = useCart();
  const { addToast } = useToast();

  return (
    <div className="flex max-w-lg flex-wrap items-center justify-around">
      {/* Products Placeholders */}
      {products.length === 0 &&
        Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="card glass card-compact mt-12 w-[45%] overflow-hidden rounded-xl"
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
        products?.map((product) => (
          <div
            key={product.id}
            className="card glass card-compact mt-12 w-[45%]"
          >
            <figure className="relative w-full overflow-hidden pb-[100%]">
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
                        description: "Sorry, we don't have that many in stock",
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
  );
};

export default ProductsCardScroll;
