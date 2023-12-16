import Image from "next/image";
import { type Product } from "~/interfaces";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card image-full z-10 w-1/4 min-w-fit overflow-hidden bg-base-100 shadow-xl">
      <figure className="">
        <Image
          src={product.primary_image.url}
          blurDataURL={product.primary_image.blur}
          alt={product.name}
          placeholder="blur"
          className="object-fill"
          fill
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
          quality={60}
        />
      </figure>

      <div className="card-body max-sm:p-5">
        <h2 className="card-title max-sm:text-base">{product.name}</h2>
        <p className="max-sm:text-xs text-sm">{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary max-sm:btn-sm max-sm:text-xs">
            Compra Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
