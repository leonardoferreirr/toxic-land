import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS, productsInCollection } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroBanners from "@/components/HeroBanners";

export default function Home() {
  return (
    <>
      {/* HERO — 1 banner por estampa */}
      <HeroBanners />

      {/* COLEÇÕES (descritivo, sem preço) */}
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 lg:px-6">
        <div className="pb-8 text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">The collections</h2>
          <p className="mt-2 text-sm text-muted">Three jokes the internet already gets. Pick your poison.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-ink"
            >
              <Image
                src={c.cover}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="relative p-6 text-paper">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight">{c.title}</h3>
                {c.subtitle && <p className="mt-1 max-w-xs text-xs text-paper/75">{c.subtitle}</p>}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
                  See the {c.title} collection
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANNER — humor / ironia com marcas */}
      <section className="relative mx-auto my-16 w-full max-w-[1920px] overflow-hidden bg-ink text-paper">
        <div className="relative aspect-[1080/1350] w-full sm:aspect-[1920/1080]">
          <Image src="/banners/manifesto-mobile.jpg" alt="The Toxic Land" fill sizes="100vw" className="object-cover object-center sm:hidden" />
          <Image src="/banners/manifesto-desktop.jpg" alt="The Toxic Land" fill sizes="100vw" className="hidden object-cover object-center sm:block" />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="font-display max-w-3xl text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              If you can&apos;t beat the brands, <span className="italic">roast them.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm text-paper/80 sm:text-base">
              The logos you grew up with, rewritten for the world you actually live in. Wear the joke, own the bit.
            </p>
            <Link
              href="/collections/red-flags"
              className="mt-8 inline-block bg-paper px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              Shop the drop
            </Link>
          </div>
        </div>
      </section>

      {/* COLEÇÕES com preço e modelos */}
      {COLLECTIONS.map((c) => (
        <section key={c.slug} className="mx-auto max-w-7xl px-4 pb-14 lg:px-6">
          <div className="flex items-end justify-between border-b border-line pb-6">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">{c.title}</h2>
              {c.subtitle && <p className="mt-1 text-sm text-muted">{c.subtitle}</p>}
            </div>
            <Link href={`/collections/${c.slug}`} className="uline shrink-0 text-sm text-ink hover:text-accent">View all</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {productsInCollection(c.slug).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
