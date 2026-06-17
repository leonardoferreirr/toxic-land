"use client";

import { useCart } from "./cart/CartContext";

export default function CartButton() {
  const { open, count } = useCart();
  return (
    <button onClick={open} aria-label="Abrir sacola" className="relative p-1 hover:text-accent transition-colors">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-paper">
          {count}
        </span>
      )}
    </button>
  );
}
