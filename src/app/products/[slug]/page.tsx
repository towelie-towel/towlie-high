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
  // console.log(JSON.stringify({ slug: params.slug, products, detailProduct }, null, 2));
  console.log(products);
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        {detailProduct && (
          <Image
            src={detailProduct.primary_image.url}
            blurDataURL={detailProduct.primary_image.blur}
            alt={detailProduct.name}
            placeholder="blur"
            className=""
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
            quality={60}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
}
