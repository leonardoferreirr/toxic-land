"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 1 banner por estampa. Trocar os arquivos em /public/banners pelos finais do Higgsfield.
// Dimensões alvo: desktop 1920×1080 (16:9), mobile 1080×1350 (4:5).
const BANNERS = [
  { desktop: "/banners/hero-red-flags-desktop.jpg", mobile: "/banners/hero-red-flags-mobile.jpg", href: "/collections/red-flags", label: "Red Flags", title: "You saw the signs", subtitle: "You bought a season pass anyway." },
  { desktop: "/banners/hero-bummer-king-desktop.jpg", mobile: "/banners/hero-bummer-king-mobile.jpg", href: "/collections/bummer-king", label: "Bummer King", title: "Have it your way", subtitle: "Then watch it fall apart." },
  { desktop: "/banners/hero-mcdumplings-desktop.jpg", mobile: "/banners/hero-mcdumplings-mobile.jpg", href: "/collections/mcdumplings", label: "McDumplings", title: "Billions heartbroken", subtitle: "Served fresh, every day." },
];

export default function HeroBanners() {
  const [i, setI] = useState(0);
  const n = BANNERS.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  // swipe no mobile (estilo carrossel de Instagram)
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1); // arrasta pra esquerda = próximo
    touchX.current = null;
  };

  return (
    <section className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-ink">
      {/* mobile: 4:5 cheio (1080×1350) ; desktop: altura capada (crop centralizado da arte 16:9) pra deixar espiar a seção 2 */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-[1080/1350] w-full touch-pan-y select-none sm:aspect-auto sm:h-[74vh] sm:max-h-[700px] sm:min-h-[460px]"
      >
        {BANNERS.map((b, idx) => (
          <Link
            key={idx}
            href={b.href}
            aria-label={b.label}
            tabIndex={idx === i ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={idx !== i}
          >
            {/* mobile */}
            <Image
              src={b.mobile}
              alt={b.label}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center sm:hidden"
            />
            {/* desktop */}
            <Image
              src={b.desktop}
              alt={b.label}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="hidden object-cover object-center sm:block"
            />

            {/* degradê + título/subtítulo (tom irônico) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 max-w-[88%] p-6 pb-12 text-paper sm:p-10 sm:pb-12">
              <h2 className="font-display text-2xl font-bold uppercase leading-[0.95] drop-shadow-sm sm:text-4xl lg:text-5xl">
                {b.title}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-paper/85 drop-shadow-sm sm:text-base">{b.subtitle}</p>
            </div>
          </Link>
        ))}

        {/* seta esquerda */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70 sm:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* seta direita */}
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70 sm:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* dots indicadores */}
        <div className="absolute bottom-4 right-5 z-10 flex gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to banner ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-paper" : "w-1.5 bg-paper/50 hover:bg-paper/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
