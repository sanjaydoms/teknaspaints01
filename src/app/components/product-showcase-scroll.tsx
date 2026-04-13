import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation } from "./navigation-context";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, Droplets, Shield, Leaf, Sun, Paintbrush, Home, Warehouse } from "lucide-react";

/* ── Real product images ── */
import imgEcoPrimax from "figma:asset/add0029d15268452b41616dd20a05403c54ed945.png";
import imgEcoPrimaxPlusBucket from "figma:asset/a9451194462fff0c801e1591013687f39264e8a1.png";
import imgEcoPrimaxBase from "figma:asset/e83e811049e145916b50f7424262fbade4e8e3c6.png";
import imgEcoTurpPlus from "figma:asset/f717437fa8b95d80708eb097bce5a470bd1af8a2.png";
import imgTexnasMarbleFront from "figma:asset/c2b21f1944f85b44af247f1116756bfbae8bbafb.png";

/* ═══════════════════════════════════════════════════════
   PALETTE
   ═══════════════════════════════════════════════════════ */
const DARK_NAVY = "#1a1428";
const GOLD = "#d4a24e";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

/* ═══════════════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════════════ */
interface ProductSlide {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  bgGradient: string;
  bgAccent: string;
  accentColor: string;
  textColor: string;
  icon: typeof Droplets;
  features: string[];
  bucketColor: string;
  bucketLabel: string;
  bucketSeries: string;
  platformColor: string;
  platformShadow: string;
  productImage?: string;
}

const PRODUCTS: ProductSlide[] = [
  {
    id: "interior",
    category: "01",
    title: "Interior\nEmulsions",
    tagline: "Effortless Beauty, Lasting Quality",
    description:
      "Teknas' wide range of Interior Emulsions brings your walls and ceilings to life, with effortless application and lasting vibrancy guaranteed thanks to our water-based formulas. Whether you seek luxurious elegance (Platinum), timeless appeal (Gold), versatile style (Silver), or budget-friendly options (Bronze), our diverse series cater to every vision and preference.",
    bgGradient: "linear-gradient(135deg, #d4a088 0%, #c9917a 30%, #dbb09c 70%, #c9917a 100%)",
    bgAccent: "#c9917a",
    accentColor: "#8b4c2f",
    textColor: "#3d1f10",
    icon: Home,
    features: ["Low VOC", "Washable", "Anti-Bacterial"],
    bucketColor: "#7a9bb5",
    bucketLabel: "LUXURY INTERIOR EMULSION",
    bucketSeries: "PLATINUM SERIES",
    platformColor: "#6b4a35",
    platformShadow: "rgba(107,74,53,0.4)",
    productImage: imgEcoPrimax,
  },
  {
    id: "exterior",
    category: "02",
    title: "Exterior\nEmulsions",
    tagline: "Shield and Beautify Your Exteriors",
    description:
      "At Teknas, we recognise the significance of selecting the perfect exterior paint for your home. Our premium-grade exterior paints ensure enduring protection against the elements while revitalising your home with vibrant hues. With an extensive palette of colours and paint types, coupled with expert guidance from our team, trust us to elevate your home's exterior with confidence and style.",
    bgGradient: "linear-gradient(135deg, #c4a882 0%, #b89b76 30%, #d4b896 60%, #9c8666 100%)",
    bgAccent: "#b89b76",
    accentColor: "#6b5030",
    textColor: "#3a2810",
    icon: Warehouse,
    features: ["Weather Proof", "UV Resistant", "Anti-Algal"],
    bucketColor: "#a8b07a",
    bucketLabel: "EXTERIOR LAMINATE",
    bucketSeries: "PLATINUM SERIES",
    platformColor: "#7a6040",
    platformShadow: "rgba(122,96,64,0.4)",
    productImage: imgEcoPrimaxPlusBucket,
  },
  {
    id: "ext-int",
    category: "03",
    title: "Exterior & Interior\nEmulsions",
    tagline: "Transforming Spaces, In and Out",
    description:
      "India's first paint that works phenomenally well on both exterior and interior surfaces. Our high-quality paint colour and emulsions guarantee longevity, impeccable coverage, and a flawless finish, resonating with the refined tastes of homeowners. Discover Teknas Paint's Ideal Exterior & Interior Colour Combinations, today.",
    bgGradient: "linear-gradient(160deg, #a8b8c8 0%, #8da0b4 30%, #b0c4d4 60%, #7e94a8 100%)",
    bgAccent: "#8da0b4",
    accentColor: "#3a5568",
    textColor: "#1a2e40",
    icon: Paintbrush,
    features: ["Dual Surface", "Premium Finish", "10-Year Warranty"],
    bucketColor: "#96a488",
    bucketLabel: "ACRYLIC LAMINATE",
    bucketSeries: "PLATINUM SERIES",
    platformColor: "#d8d4cc",
    platformShadow: "rgba(140,150,160,0.35)",
    productImage: imgEcoPrimaxBase,
  },
  {
    id: "waterproof",
    category: "04",
    title: "Waterproofing\nSolutions",
    tagline: "Ultimate Protection Against Moisture",
    description:
      "Protect your home from the harshest monsoons with Teknas' advanced waterproofing solutions. Our StormShield range uses cross-linking polymer technology to form a breathable yet waterproof membrane, preventing dampness, seepage, and structural damage while maintaining your walls' pristine appearance for years.",
    bgGradient: "linear-gradient(135deg, #6b8a7a 0%, #5a7a6a 30%, #7a9a8a 60%, #4a6a5a 100%)",
    bgAccent: "#5a7a6a",
    accentColor: "#2a4a3a",
    textColor: "#102820",
    icon: Droplets,
    features: ["Monsoon Proof", "Anti-Seepage", "Breathable"],
    bucketColor: "#5a8a7a",
    bucketLabel: "WATERPROOFING SOLUTION",
    bucketSeries: "STORMSHIELD SERIES",
    platformColor: "#4a6a5a",
    platformShadow: "rgba(74,106,90,0.4)",
    productImage: imgEcoTurpPlus,
  },
  {
    id: "eco",
    category: "05",
    title: "Eco-Friendly\nRange",
    tagline: "Colours That Care for Your World",
    description:
      "Our EcoShield range represents a decade of research into plant-based binders and mineral pigments. Every product carries less than 5g/L of VOCs — well below industry standards. Engineered with photocatalytic technology that actively purifies indoor air, these paints don't just look beautiful — they make your home healthier.",
    bgGradient: "linear-gradient(135deg, #c4b896 0%, #b0a680 30%, #d4c8a6 60%, #9a9070 100%)",
    bgAccent: "#b0a680",
    accentColor: "#5a5028",
    textColor: "#302a10",
    icon: Leaf,
    features: ["Plant Based", "Air Purifying", "Green Certified"],
    bucketColor: "#8a9a5a",
    bucketLabel: "ECO EMULSION",
    bucketSeries: "ECOSHIELD SERIES",
    platformColor: "#8a7a50",
    platformShadow: "rgba(138,122,80,0.4)",
    productImage: imgTexnasMarbleFront,
  },
];

/* ═══════════════════════════════════════════════════════
   3D PAINT BUCKET (CSS-based)
   ═══════════════════════════════════════════════════════ */
function PaintBucket({ product, isActive }: { product: ProductSlide; isActive: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={false}
      animate={{
        y: isActive ? 0 : 30,
        scale: isActive ? 1 : 0.88,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Bucket */}
      <div className="relative w-[220px] h-[240px] sm:w-[260px] sm:h-[280px] lg:w-[300px] lg:h-[320px]">
        {/* Handle */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] sm:w-[160px] lg:w-[180px] h-[30px] sm:h-[36px]"
          style={{
            borderRadius: "60px 60px 0 0",
            border: "4px solid #c8c8c8",
            borderBottom: "none",
            background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
          }}
        />
        {/* Lid */}
        <div
          className="absolute top-[22px] sm:top-[28px] left-1/2 -translate-x-1/2 w-[200px] sm:w-[235px] lg:w-[270px] h-[20px] sm:h-[24px] rounded-[6px]"
          style={{
            background: "linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 50%, #c8c8c8 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        {/* Body */}
        <div
          className="absolute top-[40px] sm:top-[50px] left-1/2 -translate-x-1/2 w-[190px] sm:w-[225px] lg:w-[258px] rounded-b-[16px] overflow-hidden"
          style={{
            height: "calc(100% - 40px)",
            background: `linear-gradient(135deg, ${product.bucketColor}dd 0%, ${product.bucketColor} 40%, ${product.bucketColor}bb 100%)`,
            boxShadow: `8px 0 24px rgba(0,0,0,0.15), -4px 0 12px rgba(255,255,255,0.1) inset`,
          }}
        >
          {/* Decorative colour stripes (left edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-[18px] sm:w-[22px]">
            {["#c75b3a", "#d4a24e", "#75866c", "#3b7ca5", "#8B6DAF", "#c75b3a"].map((c, i) => (
              <div
                key={i}
                className="w-full"
                style={{ height: `${100 / 6}%`, backgroundColor: c, opacity: 0.8 }}
              />
            ))}
          </div>
          {/* Decorative colour stripes (right edge) */}
          <div className="absolute right-0 top-0 bottom-0 w-[18px] sm:w-[22px]">
            {["#d4a24e", "#c75b3a", "#3b7ca5", "#75866c", "#8B6DAF", "#d4a24e"].map((c, i) => (
              <div
                key={i}
                className="w-full"
                style={{ height: `${100 / 6}%`, backgroundColor: c, opacity: 0.8 }}
              />
            ))}
          </div>
          {/* Label area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-10">
            {/* Logo circle */}
            <div
              className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full mb-2 flex items-center justify-center"
              style={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              <span className="font-['Fira_Sans',sans-serif] text-[10px] sm:text-[11px] tracking-[1px]" style={{ color: DARK_NAVY, fontWeight: 700 }}>
                T
              </span>
            </div>
            <p className="font-['Fira_Sans',sans-serif] text-[14px] sm:text-[16px] text-white m-0 mb-0.5" style={{ fontWeight: 700, letterSpacing: "2px" }}>
              TEKNAS
            </p>
            <p className="font-['Fira_Sans',sans-serif] text-[8px] sm:text-[9px] text-white/60 m-0 italic mb-3">
              Be inspired!
            </p>
            {/* Product label strip */}
            <div
              className="w-full py-1.5 sm:py-2 px-3 rounded-[4px] text-center mb-1"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
            >
              <p className="font-['Fira_Sans',sans-serif] text-[7px] sm:text-[8px] tracking-[1.5px] uppercase text-white/90 m-0" style={{ fontWeight: 600 }}>
                {product.bucketLabel}
              </p>
            </div>
            <p className="font-['Fira_Sans',sans-serif] text-[7px] sm:text-[8px] tracking-[2px] uppercase text-white/50 m-0 mt-1" style={{ fontWeight: 500 }}>
              {product.bucketSeries}
            </p>
          </div>
          {/* Highlight / reflection */}
          <div
            className="absolute top-0 right-[25px] w-[4px] bottom-0 opacity-[0.12]"
            style={{ background: "linear-gradient(180deg, white 0%, transparent 60%)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PEDESTAL / PLATFORM
   ═══════════════════════════════════════════════════════ */
function Pedestal({ product, isActive }: { product: ProductSlide; isActive: boolean }) {
  return (
    <motion.div
      className="relative w-[260px] sm:w-[300px] lg:w-[340px]"
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Platform top */}
      <div
        className="w-full h-[18px] sm:h-[22px] rounded-[4px]"
        style={{
          background: `linear-gradient(180deg, ${product.platformColor} 0%, ${product.platformColor}dd 100%)`,
          boxShadow: `0 4px 20px ${product.platformShadow}`,
        }}
      />
      {/* Platform front */}
      <div
        className="w-full h-[28px] sm:h-[34px] rounded-b-[4px]"
        style={{
          background: `linear-gradient(180deg, ${product.platformColor}bb 0%, ${product.platformColor}88 100%)`,
        }}
      />
      {/* Shadow on ground */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-[10px] rounded-full"
        style={{ background: product.platformShadow, filter: "blur(8px)" }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION DOTS (vertical)
   ═══════════════════════════════════════════════════════ */
function NavDots({ active, total, onSelect, products }: { active: number; total: number; onSelect: (i: number) => void; products: ProductSlide[] }) {
  return (
    <div className="hidden lg:flex flex-col items-center gap-2.5 absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-20">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative group border-0 bg-transparent cursor-pointer p-0 flex items-center gap-3"
        >
          <span
            className="absolute right-full mr-3 whitespace-nowrap font-['Fira_Sans',sans-serif] text-[11px] tracking-[1px] uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ color: products[active]?.textColor || DARK_NAVY, fontWeight: 500 }}
          >
            {products[i].id.replace(/-/g, " ")}
          </span>
          <div
            className="rounded-full transition-all duration-500"
            style={{
              width: active === i ? 12 : 8,
              height: active === i ? 12 : 8,
              backgroundColor: active === i ? (products[active]?.textColor || DARK_NAVY) : `${products[active]?.textColor || DARK_NAVY}30`,
              boxShadow: active === i ? `0 0 12px ${products[active]?.textColor || DARK_NAVY}40` : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN: PRODUCT SHOWCASE SCROLL SECTION
   ═══════════════════════════════════════════════════════ */
export function ProductShowcaseScroll() {
  const { navigateToProducts } = useNavigation();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const isTransitioning = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning.current) return;
    if (idx < 0 || idx >= PRODUCTS.length) return;
    isTransitioning.current = true;
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    setTimeout(() => { isTransitioning.current = false; }, 900);
  }, [active]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Wheel scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let accumulatedDelta = 0;
    const THRESHOLD = 80;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept when this section is mostly in view
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.7;
      if (!inView) return;

      // If at first product and scrolling up, or last product and scrolling down, let page scroll
      if ((active === 0 && e.deltaY < 0) || (active === PRODUCTS.length - 1 && e.deltaY > 0)) {
        accumulatedDelta = 0;
        return;
      }

      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (accumulatedDelta > THRESHOLD) {
        next();
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -THRESHOLD) {
        prev();
        accumulatedDelta = 0;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [active, next, prev]);

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning.current) {
        setDirection(1);
        setActive((prev) => (prev + 1) % PRODUCTS.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const product = PRODUCTS[active];
  const Icon = product.icon;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(600px, 85vh, 850px)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0"
          style={{ background: product.bgGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Subtle light overlay / ambient effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${product.bgAccent}40 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${product.bgAccent}30 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col lg:flex-row items-center ${SECTION_PX}`}>

        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center pt-16 lg:pt-0 max-w-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, x: direction > 0 ? -40 : 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 40 : -40, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category number + icon */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${product.textColor}20` }}
                >
                  <Icon size={18} style={{ color: product.textColor }} />
                </div>
                <span
                  className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[4px] uppercase"
                  style={{ color: product.textColor, fontWeight: 500 }}
                >
                  {product.category} / {String(PRODUCTS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-['Fira_Sans',sans-serif] text-[clamp(36px,5.5vw,62px)] m-0 mb-3"
                style={{
                  color: product.textColor,
                  fontWeight: 300,
                  lineHeight: 1.08,
                  fontStyle: "italic",
                  whiteSpace: "pre-line",
                }}
              >
                {product.title}
              </h2>

              {/* Tagline */}
              <p
                className="font-['Fira_Sans',sans-serif] text-[clamp(16px,1.6vw,22px)] m-0 mb-5"
                style={{ color: product.textColor, fontWeight: 600, lineHeight: 1.3 }}
              >
                {product.tagline}
              </p>

              {/* Description */}
              <p
                className="font-['Fira_Sans',sans-serif] text-[clamp(13px,1vw,15px)] leading-[26px] m-0 mb-7 max-w-[480px]"
                style={{ color: `${product.textColor}dd`, fontWeight: 400 }}
              >
                {product.description}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {product.features.map((f) => (
                  <span
                    key={f}
                    className="h-[32px] px-4 rounded-full flex items-center font-['Fira_Sans',sans-serif] text-[11px] tracking-[1px] uppercase"
                    style={{
                      backgroundColor: `${product.textColor}18`,
                      color: product.textColor,
                      fontWeight: 600,
                      border: `1px solid ${product.textColor}30`,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={navigateToProducts}
                className="inline-flex items-center gap-3 h-[50px] px-8 rounded-full border-0 cursor-pointer transition-all duration-400 hover:scale-[1.04] hover:shadow-lg group"
                style={{
                  backgroundColor: product.textColor,
                  boxShadow: `0 6px 24px ${product.textColor}30`,
                }}
              >
                <span
                  className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[3px] uppercase text-white"
                  style={{ fontWeight: 600 }}
                >
                  Know More
                </span>
                <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Paint Bucket on Pedestal */}
        <div className="flex-1 flex flex-col items-center justify-end lg:justify-center pb-10 lg:pb-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bucket-${active}`}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: direction > 0 ? 80 : -80, rotateY: direction > 0 ? -8 : 8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -60 : 60, rotateY: direction > 0 ? 8 : -8 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1000 }}
            >
              {product.productImage ? (
                /* Real product image */
                <div className="relative flex flex-col items-center">
                  <img
                    src={product.productImage}
                    alt={product.title}
                    className="object-contain drop-shadow-2xl"
                    style={{
                      height: "clamp(260px, 32vw, 380px)",
                      width: "auto",
                      filter: `drop-shadow(0 30px 60px ${product.platformShadow})`,
                    }}
                  />
                  {/* Ground shadow */}
                  <div
                    className="w-[70%] h-[14px] rounded-[50%] mt-2"
                    style={{
                      background: `radial-gradient(ellipse, ${product.platformShadow}, transparent 70%)`,
                    }}
                  />
                </div>
              ) : (
                <>
                  <PaintBucket product={product} isActive={true} />
                  <div className="mt-[-4px]">
                    <Pedestal product={product} isActive={true} />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Floating glow behind bucket */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full -z-10"
            style={{
              background: `radial-gradient(circle, ${product.bucketColor}25 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        </div>
      </div>

      {/* Navigation Dots */}
      <NavDots active={active} total={PRODUCTS.length} onSelect={goTo} products={PRODUCTS} />

      {/* Bottom: Arrow navigation + counter (mobile) */}
      <div className={`absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between ${SECTION_PX}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-[42px] h-[42px] rounded-full border-2 bg-transparent flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-30"
            style={{ borderColor: `${product.textColor}30` }}
          >
            <ChevronUp size={18} style={{ color: product.textColor }} />
          </button>
          <button
            onClick={next}
            disabled={active === PRODUCTS.length - 1}
            className="w-[42px] h-[42px] rounded-full border-2 bg-transparent flex items-center justify-center cursor-pointer transition-all hover:scale-110 disabled:opacity-30"
            style={{ borderColor: `${product.textColor}30` }}
          >
            <ChevronDown size={18} style={{ color: product.textColor }} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span
            className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[1px]"
            style={{ color: `${product.textColor}60`, fontWeight: 500 }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="w-[100px] sm:w-[140px] h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: `${product.textColor}15` }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: product.textColor }}
              initial={false}
              animate={{ width: `${((active + 1) / PRODUCTS.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span
            className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[1px]"
            style={{ color: `${product.textColor}60`, fontWeight: 500 }}
          >
            {String(PRODUCTS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Mobile dot indicators */}
      <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="border-0 bg-transparent cursor-pointer p-0"
          >
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: active === i ? 28 : 8,
                height: 8,
                backgroundColor: active === i ? product.textColor : `${product.textColor}25`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}