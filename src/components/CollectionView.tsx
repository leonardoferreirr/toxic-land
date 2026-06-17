"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];
type Sort = "relevance" | "price-asc" | "price-desc";

export default function CollectionView({ products }: { products: Product[] }) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("relevance");
  const [onlySale, setOnlySale] = useState(false);

  const sizeOptions = useMemo(
    () => ALL_SIZES.filter((s) => products.some((p) => p.sizes.includes(s))),
    [products]
  );

  const filtered = useMemo(() => {
    let r = [...products];
    if (sizes.length) r = r.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (onlySale) r = r.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    return r;
  }, [products, sizes, sort, onlySale]);

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
      {/* filters */}
      <aside className="mb-8 lg:mb-0">
        <div className="lg:sticky lg:top-32">
          <p className="font-display text-sm font-semibold uppercase tracking-widest">Filter</p>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`min-w-9 border px-2 py-1 text-xs font-medium transition-colors ${
                    sizes.includes(s)
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} className="accent-ink" />
            On sale only
          </label>

          {(sizes.length > 0 || onlySale) && (
            <button onClick={() => { setSizes([]); setOnlySale(false); }} className="mt-4 text-xs text-muted underline hover:text-ink">
              Clear filters
            </button>
          )}
        </div>
      </aside>

      {/* grid */}
      <div>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="text-sm text-muted">{filtered.length} {filtered.length === 1 ? "item" : "items"}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line px-3 py-2 text-sm outline-none focus:border-ink"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted">Nothing matches that filter.</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
