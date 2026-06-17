# THE TOXIC LAND

Parody-tee ecommerce (US market). Next.js 16 + React 19 + Tailwind 4.

3 prints (Red Flags, Bummer King, McDumplings) × 3 models (Tee $27.99, Cropped $28.99, Hoodie $59.99).

## Edit points
- `src/lib/brand.ts` — store name, tagline, announcement, WhatsApp, Instagram, free-shipping threshold.
- `src/lib/products.ts` — products, collections, prices, copy.
- `public/banners/` — hero + mid banners. **Desktop 1920×1080 (16:9), Mobile 1080×1350 (4:5).** Swap the placeholder files with final art (same names, same dimensions).
- `public/products/` — product photos (aspect 3:4, white background).

## Dev
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Notes
- Cart is functional (client-side). Checkout/payment is a stub — plug Stripe at the "Checkout" button in `src/components/cart/CartDrawer.tsx`.
- WhatsApp button is hidden until `BRAND.whatsapp` is set.
- Parody / satire. Not affiliated with any brand referenced.
