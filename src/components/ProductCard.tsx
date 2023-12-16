import Image from "next/image";
import { type Product } from "~/interfaces";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-img">
        <Image
          src={product.primary_image.url}
          blurDataURL={product.primary_image.blur}
          alt={product.name}
          placeholder="blur"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
          quality={60}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="price">${product.price}</div>

        <button>Add to Cart</button>
      </div>
    </div>
  );
}
