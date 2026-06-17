import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NAV_LINKS } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-base font-normal uppercase text-paper" style={{ letterSpacing: "0.22em" }}>
              {BRAND.name}
            </span>
            <p className="mt-4 max-w-xs text-sm text-paper/60">{BRAND.tagline}. Printed on demand, shipped from the US.</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/50">Shop</p>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-paper/70 hover:text-paper">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/50">Help</p>
            <ul className="mt-3 space-y-2 text-sm text-paper/70">
              <li><Link href="#" className="hover:text-paper">Returns &amp; exchanges</Link></li>
              <li><Link href="#" className="hover:text-paper">Size guide</Link></li>
              <li><Link href="#" className="hover:text-paper">Track your order</Link></li>
              <li><Link href={`https://instagram.com/${BRAND.instagram}`} className="hover:text-paper">@{BRAND.instagram}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-paper/50">Newsletter</p>
            <p className="mt-3 text-sm text-paper/70">Join the list and get the next drops before anyone else.</p>
            <div className="mt-3 flex border border-paper/20">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-paper/40"
              />
              <button type="button" className="bg-paper px-4 text-sm font-semibold uppercase text-ink">OK</button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/50 md:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>Parody / satire. Not affiliated with any brand referenced.</span>
        </div>
      </div>
    </footer>
  );
}
