import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useNavigation, type ProductInfo } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  PaintSplashDivider,
} from "./paint-splash-effects";
import { ScrollReveal } from "./micro-interactions";
import { useSEO } from "./use-seo";
import { getProductPricing } from "./product-catalog";

/* ── Gallery thumbnails ── */
const THUMB_EXTRAS = [
  "https://images.unsplash.com/photo-1734606901353-5561d3c3ec72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1595446472721-4b7aa63a2bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1751486403890-793880b12adb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
];

/* ── Related products ── */
const RELATED = [
  { name: "Eco Turp", img: "https://images.unsplash.com/photo-1696623487653-cc0ebb9db05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { name: "Eco Primax+", img: "https://images.unsplash.com/photo-1675229502792-1011e47b427f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { name: "Eco Texnas Wall Textures", img: "https://images.unsplash.com/photo-1683465559298-deb3dae9139c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { name: "Eco Turp Pro", img: "https://images.unsplash.com/photo-1769025390992-3978c290c13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
];

/* ── Color swatches ── */
const COLORS = [
  { name: "Aqua Leaf", hex: "#d4a24e" },
  { name: "Blue Leaf", hex: "#6da0b5" },
  { name: "Chevron", hex: "#c75b3a" },
  { name: "Green Leaf", hex: "#3f7a4f" },
  { name: "Slate Grey", hex: "#7a8b8f" },
  { name: "Slat Wood", hex: "#8b6f4e" },
  { name: "Multi Colour", hex: "linear-gradient(135deg,#e64b4b,#f0c040,#4ba3e6,#5bb85b)" },
];

/* ── Feature icons data ── */
const FEATURES = [
  { title: "Carbon-Neutral Shipping", desc: "Free carbon-offset delivery on all orders above ₹5,000 with fast nationwide shipping.", icon: "truck" },
  { title: "24/7 Eco-Paint Support", desc: "Get expert help anytime on low-VOC formulas, application methods, and sustainable coatings.", icon: "headphones" },
  { title: "Secured Payment", desc: "Your transactions are protected with 256-bit encryption and buyer protection guarantee.", icon: "shield" },
  { title: "GREENGUARD Certified", desc: "Every product meets GREENGUARD Gold standards for low chemical emissions and indoor air quality.", icon: "check" },
];

/* ── Product-specific copywriting ── */
const PRODUCT_COPY: Record<string, { tagline: string; description: string; benefits: string[]; benefitsHeading: string; closing: string }> = {
  "Eco Turp": {
    tagline: "Eco-Friendly Turpentine Oil for Safe Paint Thinning",
    description: "Eco Turp is a low-odor, eco-friendly turpentine oil designed for thinning oil-based paints and cleaning tools without releasing harsh fumes. Engineered for reduced emissions and improved indoor air safety, it delivers reliable performance for residential and professional use.",
    benefitsHeading: "Key Benefits",
    benefits: ["Low VOC turpentine oil", "Reduced odor formulation", "Safe for indoor paint application", "Ideal for thinning oil-based paints", "Effective brush and roller cleaning"],
    closing: "Eco Turp is the perfect sustainable solvent solution for homeowners and small-scale painting projects seeking cleaner performance without compromise.",
  },
  "Eco Turp+": {
    tagline: "Advanced Low VOC Turpentine Oil for Professional Results",
    description: "Eco Turp+ is a high-purity eco-friendly solvent designed for improved paint flow, smoother finishes, and enhanced workability. With lower emissions than traditional turpentine oil, it ensures safer handling and superior thinning performance.",
    benefitsHeading: "Why Choose Eco Turp+?",
    benefits: ["Enhanced paint consistency", "Cleaner thinning for oil-based paints", "Low emission solvent technology", "Reduced toxic fumes", "Suitable for interior and exterior applications"],
    closing: "Eco Turp+ is ideal for contractors and professional painters who demand consistent results with eco-conscious formulations.",
  },
  "Eco Turp Pro": {
    tagline: "Professional-Grade Eco Turpentine Oil",
    description: "Eco Turp Pro is a premium, high-performance eco turpentine oil formulated for heavy-duty thinning and industrial-grade cleaning applications. Designed for large-scale projects, it ensures superior flow control while maintaining lower VOC emissions.",
    benefitsHeading: "Professional Features",
    benefits: ["High-purity solvent refinement", "Optimized for large-scale painting projects", "Reduced odor, low emission profile", "Reliable cleaning efficiency", "Safer worksite application"],
    closing: "Eco Turp Pro combines professional strength with environmentally responsible solvent technology.",
  },
  "Eco Primax": {
    tagline: "Eco-Friendly Wall Primer for Strong Adhesion",
    description: "Eco Primax is a water-based eco-friendly primer designed to improve paint adhesion, enhance coverage, and extend wall durability. With low VOC content and fast drying time, it provides a healthier alternative to conventional primers.",
    benefitsHeading: "Key Benefits",
    benefits: ["Low VOC wall primer", "Improved paint adhesion", "Smooth base preparation", "Low odor and fast drying", "Suitable for interior walls"],
    closing: "Eco Primax is ideal for residential spaces requiring a sustainable primer solution before paint application.",
  },
  "Eco Primax+": {
    tagline: "High-Performance Sustainable Primer",
    description: "Eco Primax+ is an advanced eco primer engineered for superior surface bonding and enhanced moisture resistance. It prepares walls for long-lasting finishes while minimizing environmental impact.",
    benefitsHeading: "Features",
    benefits: ["Advanced water-based formulation", "Strong adhesion for textured paints", "Moisture-resistant primer technology", "Reduced chemical emissions", "Suitable for interior and exterior surfaces"],
    closing: "Eco Primax+ ensures a durable and eco-conscious foundation for premium wall finishes.",
  },
  "Eco Primax Pro": {
    tagline: "Professional Eco Primer for Maximum Durability",
    description: "Eco Primax Pro is a professional-grade low VOC primer designed for high-traffic and demanding environments. It provides exceptional surface sealing and extended paint life while maintaining eco-friendly standards.",
    benefitsHeading: "Professional Advantages",
    benefits: ["High bonding strength", "Extended paint lifespan", "Fast drying performance", "Low emission formula", "Ideal for commercial and large-scale projects"],
    closing: "Eco Primax Pro delivers industrial-level durability with sustainable primer technology.",
  },
  "Eco Texnas Wall Textures": {
    tagline: "Sustainable Textured Paint Finishes",
    description: "Eco Texnas Wall Textures offer eco-friendly textured paint solutions that combine design depth with environmental responsibility. Crafted with ultra-low VOC technology, they deliver stunning surface finishes without compromising indoor air quality.",
    benefitsHeading: "Benefits",
    benefits: ["Eco-friendly textured paint", "Low VOC wall textures", "Rich surface depth and dimension", "Long-lasting color retention", "Safe for homes and commercial spaces"],
    closing: "Eco Texnas Wall Textures are perfect for feature walls, living rooms, and contemporary interiors seeking sustainable elegance.",
  },
  "Eco Texnas Marble Wall Textures": {
    tagline: "Eco-Friendly Marble Finish Paint",
    description: "Eco Texnas Marble Wall Textures recreate the luxurious appearance of natural marble using sustainable paint technology. Designed with low emission binders and advanced texture control, they offer premium finishes with minimal environmental impact.",
    benefitsHeading: "Features",
    benefits: ["Marble effect wall texture", "Eco-friendly decorative paint", "Ultra-low VOC formulation", "Smooth, stone-like finish", "Durable and easy to maintain"],
    closing: "Eco Texnas Marble Wall Textures provide the elegance of marble without the environmental cost of natural stone extraction.",
  },
};

const DEFAULT_COPY = {
  tagline: "Eco-Friendly Paint Product",
  description: "Formulated with plant-derived binders and natural mineral pigments for vibrant, long-lasting color. Near-zero VOC emissions improve indoor air quality while delivering superior coverage and fade resistance on every surface.",
  benefitsHeading: "Key Benefits",
  benefits: ["Low VOC formulation", "Eco-friendly ingredients", "Professional-grade results", "Safe for indoor use", "Sustainable manufacturing"],
  closing: "Build responsibly. Paint sustainably. Live cleaner.",
};

/* ── Accordion data (now a function for per-product content) ── */
function getAccordions(productName: string) {
  const copy = PRODUCT_COPY[productName] || DEFAULT_COPY;
  return [
    { title: "About Product", content: `${copy.description} ${copy.closing}` },
    { title: copy.benefitsHeading, content: copy.benefits.join(" · ") + "." },
    { title: "Sustainability Details", content: "Coverage: 350-400 sq ft per gallon. VOC: Less than 5 g/L. Made in our ISO 14001 certified facility with 94% process water recycling. Packaging is 100% recyclable. Carbon footprint per gallon is 60% lower than conventional paints. Compatible with Eco Turp bio-solvent for easy cleanup." },
    { title: "Product Certificate", content: "GREENGUARD Gold Certified for low chemical emissions. EPA Safer Choice approved. ISO 9001:2015 certified manufacturing. ISO 14001 environmental management certified. Contains no lead, mercury, formaldehyde, or other hazardous materials. Build responsibly. Paint sustainably. Live cleaner." },
  ];
}

/* ═══════════════════════════════════════════
   Icon SVG component
   ═══════════════════════════════════════════ */
function Ico({ type, size = 24 }: { type: string; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "truck": return <svg {...p}><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
    case "headphones": return <svg {...p}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></svg>;
    case "shield": return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "check": return <svg {...p}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case "star": return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>;
    case "starEmpty": return <svg {...p} fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>;
    case "heart": return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
    case "share": return <svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
    case "help": return <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case "chevDown": return <svg {...p}><polyline points="6 9 12 15 18 9"/></svg>;
    case "arrowLeft": return <svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
    case "minus": return <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "plus": return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "zoom": return <svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
    case "delivery": return <svg {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 12 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case "eye": return <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    default: return null;
  }
}

/* ═══════════════════════════════════════════
   Star rating
   ═══════════════════════════════════════════ */
function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-[#f5a623]" : "text-[#d9d9d9]"}>
          <Ico type={i <= rating ? "star" : "starEmpty"} size={15} />
        </span>
      ))}
      <span className="text-[13px] text-[#888] ml-2">({count} Reviews)</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export function ProductDetailPage({ product }: { product: ProductInfo }) {
  const { navigateBack, navigateToProduct, navigateHome, previousView } = useNavigation();

  useSEO({
    title: `${product.name} | ${product.category} — Buy Online at Teknas Paints`,
    description: `Buy ${product.name} from Teknas Paints. Premium ${product.category.toLowerCase()} with eco-friendly formulation, low-VOC content, and GREENGUARD Gold certification. Free shipping on orders above Rs 5,000.`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: "Teknas Paints" },
      category: product.category,
      image: product.image,
      description: `${product.name} — premium ${product.category.toLowerCase()} by Teknas Paints. Eco-friendly, low-VOC, GREENGUARD Gold certified.`,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
        seller: { "@type": "Organization", name: "Teknas Paints" },
      },
    },
  });

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomXY, setZoomXY] = useState({ x: 50, y: 50 });
  const [accordion, setAccordion] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  /* FIX: Reset all interactive state when the product changes */
  useEffect(() => {
    setQty(1);
    setSelectedColor(0);
    setActiveThumb(0);
    setZoomed(false);
    setAccordion(null);
    setWishlisted(false);
  }, [product.name, product.image]);

  const backLabel = previousView === "products" ? "Back to All Products" : "Back to Home";
  const thumbs = [product.image, ...THUMB_EXTRAS];
  const pricing = getProductPricing(product.name);

  const isTurpentine = product.category === "Eco Turpentine Oils";

  /* handlers */
  const addToCart = () => toast.success(`Added ${qty}× ${product.name} to cart`, { description: isTurpentine ? `${product.name} × ${qty}` : `Color: ${COLORS[selectedColor].name}` });
  const buyNow = () => toast.success("Redirecting to checkout...", { description: `${product.name} × ${qty}` });
  const share = () => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied to clipboard!"); };
  const askQ = () => toast("Question form coming soon!", { description: "Our team typically responds within 24 hours." });
  const toggleWish = () => { setWishlisted(!wishlisted); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist"); };
  const onImgMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    setZoomXY({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Fira Sans', sans-serif", paddingTop: 70 }}>
      <Toaster position="top-right" richColors />

      {/* ════════════════ TOP PROMO BAR ════════════════ */}
      <header className="bg-[#c75b3a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[46px] text-[13px]">
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <span className="opacity-80">teknas@email.com</span>
            <span className="opacity-50">|</span>
            <span className="opacity-80">+22 489 456 2589</span>
          </div>
          <p className="flex-1 text-center truncate mx-4">
            Summer Sale – Get <strong>20% Discount</strong> on any paint colour
          </p>
          <span className="hidden lg:block shrink-0 opacity-80">4.8 ★ Excellent Reviews</span>
        </div>
      </header>

      {/* ════════════════ BREADCRUMB BANNER ════════════════ */}
      <section className="bg-[#1a1428] relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(199,91,58,0.2) 0%, transparent 65%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-6">
          {/* nav row */}
          <div className="flex items-center justify-between h-[64px]">
            <button
              onClick={navigateBack}
              className="flex items-center gap-2 bg-transparent text-white text-[14px] px-5 py-2 rounded-full cursor-pointer transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Ico type="arrowLeft" size={16} />
              <span className="hidden sm:inline">{backLabel}</span>
            </button>
            <nav className="flex items-center gap-3 text-[14px]">
              <button onClick={navigateHome} className="text-white/60 hover:text-white bg-transparent border-none cursor-pointer transition-colors">Home</button>
              <span className="text-white/25">/</span>
              <span className="text-white/90">{product.category}</span>
            </nav>
          </div>

          {/* title */}
          <div className="text-center pt-6 pb-12 md:pt-10 md:pb-16">
            <h1 className="text-white text-[28px] sm:text-[36px] md:text-[42px] capitalize" style={{ lineHeight: 1.2 }}>{product.name}</h1>
            <p className="text-white/40 mt-3 text-[14px] sm:text-[15px]">
              <span className="cursor-pointer hover:text-white/70 transition-colors" onClick={navigateHome}>Home</span>
              <span className="mx-2 text-white/20">/</span>
              <span className="text-white/60">{product.category}</span>
              <span className="mx-2 text-white/20">/</span>
              <span className="text-[#adc5b8]">{product.name}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ PRODUCT AREA ════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        {/* FIX: items-start prevents left gallery from stretching to right column height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">

          {/* ─── LEFT: Gallery ─── */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail strip */}
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto pb-1 sm:pb-0">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className="shrink-0 overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-300 bg-[#f5f5f5] p-0"
                  style={{
                    width: 110,
                    height: 120,
                    borderColor: activeThumb === i ? "#c75b3a" : "transparent",
                    opacity: activeThumb === i ? 1 : 0.6,
                  }}
                >
                  <ImageWithFallback src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image — uses aspect-ratio so it always sizes correctly */}
            <div
              ref={imgRef}
              className="relative flex-1 rounded-2xl overflow-hidden bg-[#f0eeeb] cursor-crosshair"
              style={{ aspectRatio: "3 / 4" }}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={onImgMove}
            >
              <ImageWithFallback
                src={thumbs[activeThumb]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out"
                style={{
                  transformOrigin: `${zoomXY.x}% ${zoomXY.y}%`,
                  transform: zoomed ? "scale(1.8)" : "scale(1)",
                }}
              />
              {/* badges */}
              <span className="absolute top-5 left-5 bg-[#c75b3a] text-white text-[12px] font-medium px-3 py-1 rounded-full z-10">
                SAVE 38%
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); toggleWish(); }}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer shadow-md transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)"; }}
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    fill: wishlisted ? "#ef4444" : "none",
                    stroke: wishlisted ? "#ef4444" : "#9ca3af",
                    transition: "fill 0.3s, stroke 0.3s",
                  }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
              {!zoomed && (
                <span
                  className="absolute bottom-5 right-5 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 pointer-events-none z-10"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                >
                  <Ico type="zoom" size={13} /> Hover to zoom
                </span>
              )}
            </div>
          </div>

          {/* ─── RIGHT: Details ─── */}
          <div className="flex flex-col">

            {/* Title row */}
            <h2 className="text-[#222] text-[24px] sm:text-[28px] md:text-[32px] capitalize" style={{ lineHeight: 1.25 }}>
              {product.name}
              <span className="text-[#888] text-[18px] sm:text-[20px] md:text-[22px] ml-2">(300 cm × 45 cm)</span>
            </h2>

            {/* Rating + meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">
              <Stars rating={4} count={24} />
              <span className="text-[13px] text-[#999]">SKU: <span className="text-[#555]">KD-566498</span></span>
              <span className="text-[12px] font-medium text-[#0ea830] border border-[#0ea830] px-2.5 rounded-full" style={{ paddingTop: 1, paddingBottom: 1 }}>In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-[32px] md:text-[36px] font-medium text-[#111]" style={{ lineHeight: 1 }}>{pricing.price}</span>
              <span className="text-[22px] md:text-[24px] text-[#b0b0b0] line-through" style={{ lineHeight: 1 }}>{pricing.oldPrice}</span>
            </div>

            {/* Separator */}
            <div className="my-6" style={{ height: 1, backgroundColor: "#ebebeb" }} />

            {/* Description */}
            <p className="text-[#666] text-[15px] md:text-[16px]" style={{ lineHeight: 1.7 }}>
              {(PRODUCT_COPY[product.name] || DEFAULT_COPY).description}
            </p>

            {/* Separator */}
            <div className="my-6" style={{ height: 1, backgroundColor: "#ebebeb" }} />

            {/* Color swatches */}
            {!isTurpentine && (
            <div>
              <p className="text-[15px] md:text-[16px] text-[#333] mb-3">
                <span className="font-medium">Color :</span>{" "}
                <span className="text-[#c75b3a] font-medium">{COLORS[selectedColor].name}</span>
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    className="h-[40px] rounded cursor-pointer flex items-center gap-2 px-3 bg-white transition-all duration-200"
                    style={{
                      border: `1px solid ${selectedColor === i ? "#c75b3a" : "#d9d9d9"}`,
                      boxShadow: selectedColor === i ? "0 0 0 1px #c75b3a" : "none",
                    }}
                  >
                    <span
                      className="w-[14px] h-[14px] rounded-full shrink-0"
                      style={{ background: c.hex, border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                    <span className="text-[12px] font-medium capitalize truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
            )}

            {/* Quantity + Cart row */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-8">
              {/* Qty stepper */}
              <div className="flex items-center justify-center rounded-full h-[52px] w-full sm:w-[148px] shrink-0" style={{ border: "1px solid #d5d5d5" }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-full flex items-center justify-center cursor-pointer text-[#555] hover:text-black transition-colors bg-transparent border-none"
                >
                  <Ico type="minus" size={15} />
                </button>
                <span className="w-10 text-center text-[17px] font-medium text-[#333]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-full flex items-center justify-center cursor-pointer text-[#555] hover:text-black transition-colors bg-transparent border-none"
                >
                  <Ico type="plus" size={15} />
                </button>
              </div>
              {/* Add to cart */}
              <button
                onClick={addToCart}
                className="flex-1 h-[52px] bg-[#1a1428] hover:bg-[#2a2040] text-white text-[14px] font-medium uppercase rounded-full cursor-pointer border-none transition-colors duration-300"
                style={{ letterSpacing: "1.5px" }}
              >
                Add to Cart
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={buyNow}
              className="h-[52px] w-full bg-[#c75b3a] hover:bg-[#b04a2d] text-white text-[14px] font-medium uppercase rounded-full cursor-pointer border-none transition-colors duration-300 mt-3"
              style={{ letterSpacing: "1.5px" }}
            >
              Buy Now
            </button>

            {/* Quick actions */}
            <div className="flex items-center gap-6 mt-5">
              <button onClick={askQ} className="flex items-center gap-1.5 text-[13px] text-[#555] hover:text-[#c75b3a] cursor-pointer bg-transparent border-none p-0 transition-colors">
                <Ico type="help" size={15} /> Ask A Question
              </button>
              <button onClick={share} className="flex items-center gap-1.5 text-[13px] text-[#555] hover:text-[#c75b3a] cursor-pointer bg-transparent border-none p-0 transition-colors">
                <Ico type="share" size={15} /> Share
              </button>
            </div>

            {/* Separator */}
            <div className="my-6" style={{ height: 1, backgroundColor: "#ebebeb" }} />

            {/* Shipping highlights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#c75b3a] mt-0.5 shrink-0"><Ico type="delivery" size={18} /></span>
                <p className="text-[14px] text-[#555]" style={{ lineHeight: 1.6 }}>
                  Nationwide Shipping on all orders ₹5,000+, Delivery in 2-5 working days.{" "}
                  <span className="underline cursor-pointer hover:text-[#333]">Shipping &amp; Return</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c75b3a] mt-0.5 shrink-0"><Ico type="clock" size={18} /></span>
                <p className="text-[14px] text-[#333] font-medium">
                  Order in the next <span className="text-[#c75b3a]">11 hours 31 minutes</span> to get it by Feb 12, 2026
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c75b3a] mt-0.5 shrink-0"><Ico type="eye" size={18} /></span>
                <p className="text-[14px] text-[#555]">
                  Real Time <strong className="text-[#c75b3a]">92</strong> Visitors Right Now
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="my-6" style={{ height: 1, backgroundColor: "#ebebeb" }} />

            {/* Accordions */}
            <div>
              {getAccordions(product.name).map((acc, i) => (
                <div key={acc.title} style={{ borderBottom: "1px solid #ebebeb" }}>
                  <button
                    onClick={() => setAccordion(accordion === i ? null : i)}
                    className="w-full flex items-center justify-between cursor-pointer bg-transparent border-none"
                    style={{ padding: "16px 0" }}
                  >
                    <span className="text-[16px] md:text-[18px] font-medium text-[#333]">{acc.title}</span>
                    <span
                      className="shrink-0 ml-4 text-[#999] transition-transform duration-300"
                      style={{ transform: accordion === i ? "rotate(180deg)" : "rotate(0)" }}
                    >
                      <Ico type="chevDown" size={18} />
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: accordion === i ? 220 : 0,
                      opacity: accordion === i ? 1 : 0,
                    }}
                  >
                    <p className="text-[14px] md:text-[15px] text-[#666] pb-4" style={{ lineHeight: 1.7 }}>{acc.content}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ Paint Splash Divider ════════════════ */}
      <PaintSplashDivider height={80} opacity={0.3} bgColor="#1a1428" />

      {/* ════════════════ FEATURES BAR ════════════════ */}
      <section style={{ backgroundColor: "#fafafa", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <ScrollReveal direction="up" delay={0.1} duration={0.7}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                style={{ border: "1px solid #f0f0f0" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f0f0f0"; }}
              >
                <div
                  className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center text-[#c75b3a]"
                  style={{ backgroundColor: "rgba(82,99,72,0.1)" }}
                >
                  <Ico type={f.icon} size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[16px] md:text-[17px] font-medium text-[#222]">{f.title}</p>
                  <p className="text-[13px] md:text-[14px] text-[#888] mt-1" style={{ lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ RELATED PRODUCTS ════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        {/* heading */}
        <ScrollReveal direction="up" delay={0.1}>
        <div className="text-center mb-12">
          <p className="text-[13px] font-medium text-[#c75b3a] uppercase mb-2" style={{ letterSpacing: "3px" }}>You May Also Like</p>
          <h3 className="text-[28px] sm:text-[34px] md:text-[40px] text-[#111] capitalize" style={{ lineHeight: 1.2 }}>Related Products</h3>
        </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {RELATED.map((r, ri) => {
            const rPricing = getProductPricing(r.name);
            return (
            <ScrollReveal key={r.name} direction="up" delay={0.1 + ri * 0.1} duration={0.7}>
            <div
              className="group cursor-pointer"
              onClick={() => navigateToProduct({ name: r.name, image: r.img, category: product.category })}
            >
              <div className="relative overflow-hidden rounded-xl bg-[#f0eeeb]" style={{ aspectRatio: "4 / 5" }}>
                <ImageWithFallback
                  src={r.img}
                  alt={r.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="text-[17px] md:text-[19px] font-medium text-[#222] group-hover:text-[#c75b3a] transition-colors">{r.name}</p>
                <p className="text-[15px] mt-1">
                  <span className="text-[#333]">{rPricing.price}</span>
                  <span className="text-[#bbb] line-through ml-2">{rPricing.oldPrice}</span>
                </p>
              </div>
            </div>
            </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Footer is rendered by App.tsx using shared PageFooter */}
    </div>
  );
}