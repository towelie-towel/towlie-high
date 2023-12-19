"use client";

import { useCart } from "~/context/ShoppingCart";
import Image from "next/image";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { products } = useCart();
  const detailProduct = products.find(
    (product) => product.slug === params.slug,
  );
  return (
    <div className="card h-full w-full rounded-none bg-base-100 shadow-xl lg:card-side">
      <figure className="relative w-full bg-base-100 pb-[50%] opacity-80">
        {detailProduct && (
          <Image
            src={detailProduct.primary_image.url}
            blurDataURL={detailProduct.primary_image.blur}
            alt={detailProduct.name}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
            quality={60}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{detailProduct?.name}</h2>
        <p>{detailProduct?.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
}
