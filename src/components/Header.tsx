"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NAV_LINKS } from "@/lib/products";
import CartButton from "./CartButton";

const Wordmark = ({ className = "" }: { className?: string }) => (
  <span className={`font-display font-normal uppercase leading-none ${className}`} style={{ letterSpacing: "0.22em" }}>
    {BRAND.name}
  </span>
);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      {/* announcement */}
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl overflow-hidden whitespace-nowrap px-4 py-2 text-center text-[11px] tracking-widest">
          {BRAND.announcement}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        {/* mobile burger */}
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* logo (wordmark em texto) */}
        <Link href="/" aria-label={BRAND.name} className="text-ink">
          <Wordmark className="text-sm sm:text-base lg:text-lg" />
        </Link>

        {/* nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="uline text-xs font-medium uppercase tracking-widest text-ink hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ações */}
        <div className="flex items-center gap-4">
          <button aria-label="Buscar" className="hidden p-1 hover:text-accent sm:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
            </svg>
          </button>
          <CartButton />
        </div>
      </div>

      {/* drawer mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-xs overflow-y-auto bg-paper p-6">
            <div className="flex items-center justify-between pb-6">
              <Wordmark className="text-sm text-ink" />
              <button onClick={() => setMobileOpen(false)} className="text-2xl leading-none">&times;</button>
            </div>
            <nav className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-t border-line py-4 font-display text-sm font-semibold uppercase tracking-widest text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
