/* ═══════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH — Product Pricing & Metadata
   All pages (home, products, product-detail, cart) must
   import prices from here so they stay consistent.
   ═══════════════════════════════════════════════════════ */

export interface ProductPricing {
  price: string;      // e.g. "₹2,499"
  oldPrice: string;   // e.g. "₹3,999"
  priceNum: number;   // raw number for cart math, e.g. 2499
  oldPriceNum: number;
  rating: number;
  reviews: number;
}

/**
 * Canonical pricing keyed by product name.
 * Every page must look up prices here.
 */
export const PRODUCT_PRICES: Record<string, ProductPricing> = {
  /* ── Eco Turpentine Oils ── */
  "Eco Turp":        { price: "₹1,999", oldPrice: "₹3,499", priceNum: 1999, oldPriceNum: 3499, rating: 4.8, reviews: 342 },
  "Eco Turp+":       { price: "₹2,499", oldPrice: "₹3,999", priceNum: 2499, oldPriceNum: 3999, rating: 4.9, reviews: 518 },
  "Eco Turp Pro":    { price: "₹2,999", oldPrice: "₹4,999", priceNum: 2999, oldPriceNum: 4999, rating: 4.9, reviews: 724 },

  /* ── Eco Primax Emulsions ── */
  "Eco Primax":           { price: "₹3,499", oldPrice: "₹5,499", priceNum: 3499, oldPriceNum: 5499, rating: 4.9, reviews: 1247 },
  "Eco Primax+":          { price: "₹4,299", oldPrice: "₹6,799", priceNum: 4299, oldPriceNum: 6799, rating: 4.9, reviews: 863 },
  "Eco Primax+ — Back":   { price: "₹4,299", oldPrice: "₹6,799", priceNum: 4299, oldPriceNum: 6799, rating: 4.9, reviews: 863 },
  "Eco Primax Pro":       { price: "₹1,599", oldPrice: "₹2,799", priceNum: 1599, oldPriceNum: 2799, rating: 4.6, reviews: 198 },
  "Eco Primax Pro — Back":{ price: "₹1,599", oldPrice: "₹2,799", priceNum: 1599, oldPriceNum: 2799, rating: 4.6, reviews: 198 },

  /* ── Royale Health Shield ── */
  "Royale Health Shield":           { price: "₹2,999", oldPrice: "₹4,799", priceNum: 2999, oldPriceNum: 4799, rating: 4.8, reviews: 672 },
  "Royale Health Shield Clear":     { price: "₹2,999", oldPrice: "₹4,799", priceNum: 2999, oldPriceNum: 4799, rating: 4.8, reviews: 672 },
  "Royale Health Shield Soft Sheen":{ price: "₹3,499", oldPrice: "₹5,499", priceNum: 3499, oldPriceNum: 5499, rating: 4.9, reviews: 894 },
  "Royale Health Shield Gloss":     { price: "₹3,799", oldPrice: "₹5,999", priceNum: 3799, oldPriceNum: 5999, rating: 4.8, reviews: 531 },

  /* ── Eco Texnas Textures ── */
  "Eco Texnas Wall Texture":          { price: "₹2,299", oldPrice: "₹3,799", priceNum: 2299, oldPriceNum: 3799, rating: 4.7, reviews: 285 },
  "Eco Texnas Wall Textures":         { price: "₹2,299", oldPrice: "₹3,799", priceNum: 2299, oldPriceNum: 3799, rating: 4.7, reviews: 285 },
  "Eco Texnas Wall Texture — Back":   { price: "₹2,299", oldPrice: "₹3,799", priceNum: 2299, oldPriceNum: 3799, rating: 4.7, reviews: 285 },
  "Eco Texnas Marble":                { price: "₹2,799", oldPrice: "₹4,499", priceNum: 2799, oldPriceNum: 4499, rating: 4.8, reviews: 412 },
  "Eco Texnas Marble Wall Texture":   { price: "₹2,799", oldPrice: "₹4,499", priceNum: 2799, oldPriceNum: 4499, rating: 4.8, reviews: 412 },
  "Eco Texnas Marble — Back":         { price: "₹2,799", oldPrice: "₹4,499", priceNum: 2799, oldPriceNum: 4499, rating: 4.8, reviews: 412 },

  /* ── Primers (bucket) ── */
  "Eco Primax Pro Primer":       { price: "₹1,599", oldPrice: "₹2,799", priceNum: 1599, oldPriceNum: 2799, rating: 4.6, reviews: 198 },

  /* ── Cart-specific general paints ── */
  "Royale Luxury Emulsion":  { price: "₹2,450", oldPrice: "₹3,999", priceNum: 2450, oldPriceNum: 3999, rating: 4.8, reviews: 450 },
  "Apex Weatherproof":       { price: "₹4,800", oldPrice: "₹7,499", priceNum: 4800, oldPriceNum: 7499, rating: 4.7, reviews: 380 },
  "Damp Guard Primer":       { price: "₹680",   oldPrice: "₹1,199", priceNum: 680,  oldPriceNum: 1199, rating: 4.5, reviews: 210 },
};

/** Look up pricing with a fuzzy fallback */
export function getProductPricing(name: string): ProductPricing {
  // Exact match
  if (PRODUCT_PRICES[name]) return PRODUCT_PRICES[name];
  // Try stripping " — Back" suffix
  const base = name.replace(/ — Back$/, "");
  if (PRODUCT_PRICES[base]) return PRODUCT_PRICES[base];
  // Fallback
  return { price: "₹1,999", oldPrice: "₹3,499", priceNum: 1999, oldPriceNum: 3499, rating: 4.5, reviews: 100 };
}

/** Format a number as ₹X,XXX */
export function formatINR(num: number): string {
  return `₹${num.toLocaleString("en-IN")}`;
}