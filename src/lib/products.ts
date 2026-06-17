export type Product = {
  id: string;
  slug: string;
  name: string;
  model: "Tee" | "Cropped" | "Hoodie"; // modelo da peça
  print: string; // nome da estampa (coleção)
  price: number; // em centavos
  compareAtPrice?: number; // preço cheio (para promo)
  collections: string[]; // slugs de coleção
  sizes: string[];
  images: string[];
  badge?: "new" | "sale" | "last";
  description: string;
  details: string[];
};

export type Collection = {
  slug: string;
  title: string;
  subtitle?: string;
  // imagem usada nos cards de "ver coleção" da home
  cover: string;
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "red-flags",
    title: "Red Flags",
    subtitle: "Situationship Mountain. The theme park of bad decisions.",
    cover: "/products/red-flags-tee.webp",
  },
  {
    slug: "bummer-king",
    title: "Bummer King",
    subtitle: "Home of the letdown. Have it your way, then regret it.",
    cover: "/products/bummer-king-tee.png",
  },
  {
    slug: "mcdumplings",
    title: "McDumplings",
    subtitle: "Billions heartbroken served.",
    cover: "/products/mcdumplings-tee.png",
  },
];

const TOP_SIZES = ["S", "M", "L", "XL"];
const CROP_SIZES = ["XS", "S", "M", "L"];

const TEE_DETAILS = ["100% ringspun cotton", "Relaxed unisex fit", "Ribbed crewneck", "Printed on demand, made to last"];
const CROP_DETAILS = ["100% combed cotton", "Boxy cropped fit", "Raw-edge hem", "Printed on demand, made to last"];
const HOODIE_DETAILS = ["80% cotton / 20% poly fleece", "Relaxed unisex fit", "Double-lined hood, kangaroo pocket", "Printed on demand, made to last"];

export const PRODUCTS: Product[] = [
  // ---- RED FLAGS ----
  {
    id: "rf-tee", slug: "red-flags-tee", name: "Red Flags Tee", model: "Tee", print: "Red Flags",
    price: 2799, collections: ["red-flags"], sizes: TOP_SIZES,
    images: ["/products/red-flags-tee.webp"], badge: "new",
    description: "The classic. \"Red Flags — Situationship Mountain\" across the chest for everyone still riding the same emotional roller coaster. Soft, heavyweight, regret-proof.",
    details: TEE_DETAILS,
  },
  {
    id: "rf-crop", slug: "red-flags-cropped", name: "Red Flags Cropped", model: "Cropped", print: "Red Flags",
    price: 2899, collections: ["red-flags"], sizes: CROP_SIZES,
    images: ["/products/red-flags-cropped.webp"], badge: "new",
    description: "The boxy cropped cut of Situationship Mountain. For the ones who saw every warning sign and bought a season pass anyway.",
    details: CROP_DETAILS,
  },
  {
    id: "rf-hood", slug: "red-flags-hoodie", name: "Red Flags Hoodie", model: "Hoodie", print: "Red Flags",
    price: 5999, collections: ["red-flags"], sizes: TOP_SIZES,
    images: ["/products/red-flags-hoodie.webp"], badge: "new",
    description: "Heavyweight fleece hoodie with the Red Flags ride logo up front. Cozy enough to ignore your own better judgment all winter long.",
    details: HOODIE_DETAILS,
  },

  // ---- BUMMER KING ----
  {
    id: "bk-tee", slug: "bummer-king-tee", name: "Bummer King Tee", model: "Tee", print: "Bummer King",
    price: 2799, collections: ["bummer-king"], sizes: TOP_SIZES,
    images: ["/products/bummer-king-tee.png"], badge: "new",
    description: "\"Bummer King — Home of the Letdown.\" Have it your way, then watch it fall apart. Crisp print on a soft, heavyweight tee.",
    details: TEE_DETAILS,
  },
  {
    id: "bk-crop", slug: "bummer-king-cropped", name: "Bummer King Cropped", model: "Cropped", print: "Bummer King",
    price: 2899, collections: ["bummer-king"], sizes: CROP_SIZES,
    images: ["/products/bummer-king-cropped.png"], badge: "new",
    description: "The cropped, boxy take on the Home of the Letdown. Flame-grilled disappointment, served oversized.",
    details: CROP_DETAILS,
  },
  {
    id: "bk-hood", slug: "bummer-king-hoodie", name: "Bummer King Hoodie", model: "Hoodie", print: "Bummer King",
    price: 5999, collections: ["bummer-king"], sizes: TOP_SIZES,
    images: ["/products/bummer-king-hoodie.png"], badge: "new",
    description: "Heavyweight fleece hoodie with the Bummer King crown. The comfort food of giving up, now in wearable form.",
    details: HOODIE_DETAILS,
  },

  // ---- McDUMPLINGS ----
  {
    id: "mc-tee", slug: "mcdumplings-tee", name: "McDumplings Tee", model: "Tee", print: "McDumplings",
    price: 2799, collections: ["mcdumplings"], sizes: TOP_SIZES,
    images: ["/products/mcdumplings-tee.png"], badge: "new",
    description: "\"McDumplings — Billions heartbroken served.\" The golden arches of poor life choices, printed on a soft heavyweight tee.",
    details: TEE_DETAILS,
  },
  {
    id: "mc-crop", slug: "mcdumplings-cropped", name: "McDumplings Cropped", model: "Cropped", print: "McDumplings",
    price: 2899, collections: ["mcdumplings"], sizes: CROP_SIZES,
    images: ["/products/mcdumplings-cropped.png"], badge: "new",
    description: "The boxy cropped cut of Billions Heartbroken Served. Fast food for the soul, none of the nutrition.",
    details: CROP_DETAILS,
  },
  {
    id: "mc-hood", slug: "mcdumplings-hoodie", name: "McDumplings Hoodie", model: "Hoodie", print: "McDumplings",
    price: 5999, collections: ["mcdumplings"], sizes: TOP_SIZES,
    images: ["/products/mcdumplings-hoodie.png"], badge: "new",
    description: "Heavyweight fleece hoodie with the McDumplings logo. Lovin' it, hating it, wearing it anyway.",
    details: HOODIE_DETAILS,
  },
];

// ---- helpers ----
export const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

export const productsInCollection = (slug: string) =>
  PRODUCTS.filter((p) => p.collections.includes(slug));

export const newIn = () => PRODUCTS.filter((p) => p.badge === "new");

// relacionados: outros modelos da mesma estampa primeiro, depois o resto
export const relatedTo = (p: Product, n = 4) => {
  const sameTheme = PRODUCTS.filter((x) => x.print === p.print && x.id !== p.id);
  const others = PRODUCTS.filter((x) => x.print !== p.print);
  return [...sameTheme, ...others].slice(0, n);
};

// menu principal
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Red Flags", href: "/collections/red-flags" },
  { label: "Bummer King", href: "/collections/bummer-king" },
  { label: "McDumplings", href: "/collections/mcdumplings" },
];
