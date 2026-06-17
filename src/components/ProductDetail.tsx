"use client";

import { useState } from "react";
import { Product, formatPrice } from "@/lib/products";
import ProductImage from "./ProductImage";
import { useCart } from "./cart/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [err, setErr] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("desc");
  const [activeImg, setActiveImg] = useState(0);

  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAdd = () => {
    if (!size) {
      setErr(true);
      return;
    }
    add({ id: product.id, slug: product.slug, name: product.name, price: product.price, size, image: product.images[0] });
  };

  const ACCORDIONS = [
    { t: "Description", key: "desc" },
    { t: "Materials & care", key: "comp" },
    { t: "Shipping & returns", key: "ship" },
  ];

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-12">
      {/* gallery */}
      <div className="lg:flex lg:gap-4">
        {product.images.length > 1 && (
          <div className="order-2 mt-3 flex gap-3 lg:order-1 lg:mt-0 lg:flex-col">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`View photo ${i + 1}`}
                className={`relative h-24 w-20 shrink-0 border transition-colors ${activeImg === i ? "border-ink" : "border-line hover:border-muted"}`}
              >
                <ProductImage src={src} alt={`${product.name} ${i + 1}`} fit="contain" className="h-full w-full" sizes="80px" />
              </button>
            ))}
          </div>
        )}
        <div className="order-1 aspect-[3/4] flex-1 lg:order-2">
          <ProductImage
            src={product.images[activeImg]}
            alt={product.name}
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* info */}
      <div className="mt-8 lg:mt-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{product.print}</p>
        <h1 className="font-display mt-1 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
          {onSale && <span className="text-base text-muted line-through">{formatPrice(product.compareAtPrice!)}</span>}
        </div>
        <p className="mt-1 text-sm text-muted">Free shipping across the US</p>

        {/* size */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-widest">Size</span>
            <button className="text-xs text-muted underline hover:text-ink">Size guide</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => { setSize(s); setErr(false); }}
                className={`min-w-12 border px-3 py-3 text-sm font-medium transition-colors ${
                  size === s ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {err && <p className="mt-2 text-xs text-sale">Please pick a size.</p>}
        </div>

        {/* add */}
        <button
          onClick={handleAdd}
          className="mt-6 w-full bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-accent"
        >
          Add to bag
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3 text-center text-[11px] uppercase tracking-widest text-muted">
          <div className="border border-line py-2">Free US shipping</div>
          <div className="border border-line py-2">30-day returns</div>
        </div>

        {/* accordions */}
        <div className="mt-8 border-t border-line">
          {ACCORDIONS.map((a) => (
            <div key={a.key} className="border-b border-line">
              <button
                onClick={() => setOpenAcc(openAcc === a.key ? null : a.key)}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-widest"
              >
                {a.t}
                <span className="text-lg">{openAcc === a.key ? "−" : "+"}</span>
              </button>
              {openAcc === a.key && (
                <div className="pb-5 text-sm leading-relaxed text-muted">
                  {a.key === "desc" && product.description}
                  {a.key === "comp" && (
                    <ul className="list-disc space-y-1 pl-4">
                      {product.details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  )}
                  {a.key === "ship" && "You have 30 days to return or exchange. First size swap is on us. Ships across the US."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
