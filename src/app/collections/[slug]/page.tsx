import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, productsInCollection, COLLECTIONS } from "@/lib/products";
import { BRAND } from "@/lib/brand";
import CollectionView from "@/components/CollectionView";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  return { title: c ? `${c.title} · ${BRAND.name}` : BRAND.name };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = productsInCollection(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-xs text-muted">
        <span>Shop</span> <span className="px-1">/</span>{" "}
        <span className="text-ink">{collection.title}</span>
      </nav>

      <header className="border-b border-line py-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {collection.title}
        </h1>
        {collection.subtitle && <p className="mt-2 text-muted">{collection.subtitle}</p>}
      </header>

      <div className="pt-10">
        <CollectionView products={products} />
      </div>
    </div>
  );
}
