import Image from "next/image";
import { type Product } from "~/interfaces";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card image-full z-10 min-h-fit min-w-fit overflow-hidden bg-base-100 shadow-xl">
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

      <div className="card-body max-[768px]:p-5 max-[375px]:p-3">
        <h2 className="card-title min-w-0 max-[768px]:text-sm max-[375px]:text-base">
          {product.name}
        </h2>
        <p className="singleLine min-w-0 max-w-[80vw] text-sm max-[768px]:text-xs max-[375px]:text-[0.6rem]">
          {product.description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary max-[768px]:btn-sm max-[375px]:btn-xs">
            Compra Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
