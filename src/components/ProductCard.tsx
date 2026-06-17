import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import ProductImage from "./ProductImage";

const BADGE_LABEL: Record<string, string> = {
  new: "NEW",
  sale: "SALE",
  last: "LAST ONES",
};

export default function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;
  const hover = product.images[1] ?? product.images[0];
  // só mostra selo de promoção/últimas (não polui com "NEW" em tudo)
  const showBadge = product.badge === "sale" || product.badge === "last";

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        {/* imagem principal */}
        <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
          <ProductImage src={product.images[0]} alt={product.name} sizes="(max-width: 768px) 50vw, 33vw" className="h-full w-full" />
        </div>
        {/* segunda foto no hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ProductImage src={hover} alt={`${product.name} — alt`} sizes="(max-width: 768px) 50vw, 33vw" className="h-full w-full" />
        </div>

        {showBadge && (
          <span className="absolute left-3 top-3 z-10 bg-sale px-2 py-1 text-[10px] font-semibold tracking-widest text-paper">
            {product.badge === "sale" && onSale ? `${discount}% ${BADGE_LABEL.sale}` : BADGE_LABEL[product.badge!]}
          </span>
        )}

        {/* painel glassmorphism branco com modelo + preço (texto preto) */}
        <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-1.5 rounded-xl border border-white/60 bg-white/55 px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.14)] ring-1 ring-black/5 backdrop-blur-md sm:inset-x-2.5 sm:px-3.5">
          <span className="min-w-0 truncate font-display text-[11px] font-semibold uppercase tracking-tight text-ink sm:text-[13px]">
            {product.model}
          </span>
          <span className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-[13px] font-bold text-ink sm:text-sm">{formatPrice(product.price)}</span>
            {onSale && <span className="text-[11px] text-ink/45 line-through">{formatPrice(product.compareAtPrice!)}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
}
