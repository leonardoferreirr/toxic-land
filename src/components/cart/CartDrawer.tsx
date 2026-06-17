"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import ProductImage from "@/components/ProductImage";

import { BRAND } from "@/lib/brand";

const FREE_SHIPPING = BRAND.freeShippingFrom;

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal, count } = useCart();
  // frete grátis em todo EUA quando freeShippingFrom = 0
  const freeAllUS = FREE_SHIPPING <= 0;
  const missing = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = FREE_SHIPPING > 0 ? Math.min(100, (subtotal / FREE_SHIPPING) * 100) : 100;

  return (
    <>
      {/* overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg uppercase tracking-tight">
            Bag {count > 0 && <span className="text-muted">({count})</span>}
          </h2>
          <button onClick={close} aria-label="Close" className="text-2xl leading-none text-ink hover:text-accent">
            &times;
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted">Your bag is empty.</p>
            <button onClick={close} className="bg-ink px-6 py-3 text-sm font-medium uppercase tracking-widest text-paper hover:bg-accent transition-colors">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* free shipping note */}
            <div className="border-b border-line px-5 py-3">
              {freeAllUS ? (
                <p className="text-center text-xs font-medium uppercase tracking-widest text-ink">
                  🇺🇸 Free shipping across the US
                </p>
              ) : (
                <>
                  <p className="text-xs text-ink">
                    {missing > 0 ? (
                      <>You&apos;re <strong>{formatPrice(missing)}</strong> away from free shipping</>
                    ) : (
                      <>🎉 You unlocked <strong>free shipping</strong></>
                    )}
                  </p>
                  <div className="mt-2 h-1 w-full bg-line">
                    <div className="h-full bg-ink transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {items.map((it) => (
                <div key={`${it.id}-${it.size}`} className="flex gap-4 border-b border-line py-4">
                  <div className="h-24 w-20 shrink-0">
                    <ProductImage src={it.image} alt={it.name} className="h-full w-full" sizes="80px" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/product/${it.slug}`} onClick={close} className="font-display text-xs uppercase tracking-tight hover:text-accent">
                      {it.name}
                    </Link>
                    <span className="mt-0.5 text-xs text-muted">Size: {it.size}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-line">
                        <button onClick={() => setQty(it.id, it.size, it.qty - 1)} className="px-2 py-1 text-sm hover:text-accent" aria-label="Diminuir">−</button>
                        <span className="px-2 text-sm tabular-nums">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.size, it.qty + 1)} className="px-2 py-1 text-sm hover:text-accent" aria-label="Aumentar">+</button>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(it.price * it.qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(it.id, it.size)} aria-label="Remover" className="self-start text-muted hover:text-sale">
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <footer className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between pb-3">
                <span className="text-sm uppercase tracking-widest text-muted">Subtotal</span>
                <span className="font-display text-lg">{formatPrice(subtotal)}</span>
              </div>
              <button className="w-full bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-paper hover:bg-accent transition-colors">
                Checkout
              </button>
              <p className="pt-2 text-center text-[11px] text-muted">
                Checkout &amp; payment to be connected (Stripe)
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
