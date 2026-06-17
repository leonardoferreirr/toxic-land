import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const display = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const DESC = `${BRAND.name} — ${BRAND.tagline}. Parody streetwear that says what you're thinking.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://thetoxicland.vercel.app"),
  title: `${BRAND.name} · ${BRAND.tagline}`,
  description: DESC,
  openGraph: {
    title: `${BRAND.name} · ${BRAND.tagline}`,
    description: DESC,
    url: "https://thetoxicland.vercel.app",
    siteName: BRAND.name,
    images: [
      {
        url: "/banners/manifesto-desktop.jpg",
        width: 1920,
        height: 1080,
        alt: `${BRAND.name} — ${BRAND.tagline}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} · ${BRAND.tagline}`,
    description: DESC,
    images: ["/banners/manifesto-desktop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
