import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import { useNavigation } from "./navigation-context";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ProductShowcaseScroll } from "./product-showcase-scroll";
import productSvg from "../../imports/svg-dwadcli01s";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play, Leaf, Shield, Droplets, Award, Star, MapPin, ArrowUp, PhoneCall, Check, Sparkles, Eye, Quote } from "lucide-react";
import { useSEO } from "./use-seo";
import { getProductPricing } from "./product-catalog";

/* ── Real product images (only used ones) ── */
import imgEcoTurpPlus from "figma:asset/f717437fa8b95d80708eb097bce5a470bd1af8a2.png";
import imgEcoPrimaxPlusBucket from "figma:asset/a9451194462fff0c801e1591013687f39264e8a1.png";
import imgEcoPrimaxBase from "figma:asset/e83e811049e145916b50f7424262fbade4e8e3c6.png";
import imgTexnasMarbleFront from "figma:asset/c2b21f1944f85b44af247f1116756bfbae8bbafb.png";
import imgEcoPrimaxProBucket from "figma:asset/74a8bc66dcf93c20b02812dbe3aa28edceabc3dc.png";

/* ═══════════════════════════════════════════════════════
   PALETTE & CONSTANTS
   ═══════════════════════════════════════════════════════ */
const DARK_NAVY = "#1a1428";
const SIENNA = "#c75b3a";
const GOLD = "#d4a24e";
const SAGE = "#75866c";
const FOREST = "#687967";
const DEEP_FOREST = "#04150b";
const WARM_CREAM = "#ede7dd";
const SOFT_IVORY = "#fff2da";
const PAPER_WHITE = "#fffdf6";
const CANVAS = "#f5f2ec";
const COBALT = "#3b7ca5";

const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

/* ═══════════════════════════════════════════════════════
   IMAGES
   ═══════════════════════════════════════════════════════ */
const IMAGES = {
  heroLiving: "https://images.unsplash.com/photo-1758448755778-90ebf4d0f1e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  heroBedroom: "https://images.unsplash.com/photo-1721742736268-b098283158ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  heroKitchen: "https://images.unsplash.com/photo-1761330439356-48ccd62f7e49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  paintSwatches: "https://images.unsplash.com/photo-1716471330478-7296f0266c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  painter: "https://images.unsplash.com/photo-1720970230359-7d75432f5688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  diningBlue: "https://images.unsplash.com/photo-1689263131929-82d8f6431323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  exterior: "https://images.unsplash.com/photo-1702327836807-244d14f62443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  paintBrush: "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  texturedWall: "https://images.unsplash.com/photo-1639133283847-6d0ebd4f9948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  bathroom: "https://images.unsplash.com/photo-1754534128045-ea1cfd09fb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  splash: "https://images.unsplash.com/photo-1659092836478-20925c9fc7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  office: "https://images.unsplash.com/photo-1770816307528-67e404552dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  kidsRoom: "https://images.unsplash.com/photo-1738058796315-b693b74c761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  waterproof: "https://images.unsplash.com/photo-1704747885838-e4f86841c589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  eco: "https://images.unsplash.com/photo-1593560369164-8f3a8facd0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  luxuryRoom: "https://images.unsplash.com/photo-1672130515395-32583062f72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  resultLiving: "https://images.unsplash.com/photo-1644299244258-6eff135031e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  resultWall: "https://images.unsplash.com/photo-1769024852372-2aecfefd9216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  resultExterior: "https://images.unsplash.com/photo-1767884724845-241ebce2f2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  resultBedroom: "https://images.unsplash.com/photo-1672130515395-32583062f72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  resultKitchen: "https://images.unsplash.com/photo-1740402065396-aa6f2bcd4b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
};

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL (enhanced with Motion)
   ═══════════════════════════════════════════════════════ */
function ScrollReveal({ children, delay = 0, direction = "up", className = "" }: {
  children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "scale"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial: CSSProperties = direction === "left" ? { opacity: 0, transform: "translateX(-36px)" }
    : direction === "right" ? { opacity: 0, transform: "translateX(36px)" }
    : direction === "scale" ? { opacity: 0, transform: "scale(0.94)" }
    : { opacity: 0, transform: "translateY(32px)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(vis ? { opacity: 1, transform: "translate(0) scale(1)" } : initial),
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING PAINT PARTICLES (ambient hero decoration)
   ═══════════════════════════════════════════════════════ */
function FloatingPaintParticles() {
  const particles = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 14,
      color: [SIENNA, GOLD, SAGE, COBALT, PAPER_WHITE, WARM_CREAM, "#e8845e", "#a3b899"][Math.floor(Math.random() * 8)],
      duration: 14 + Math.random() * 22,
      delay: Math.random() * 8,
      opacity: 0.12 + Math.random() * 0.22,
      blur: Math.random() > 0.5,
    }))
  ).current;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.size > 6 ? 3 : 1}px)` : "none",
            animation: `floatP${p.id % 4} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatP0 { 0%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(25px,-35px) scale(1.3); } 50% { transform: translate(-15px,20px) scale(0.7); } 75% { transform: translate(30px,10px) scale(1.1); } }
        @keyframes floatP1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-30px,25px) scale(0.85); } 66% { transform: translate(20px,-28px) scale(1.2); } }
        @keyframes floatP2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(18px,30px) scale(1.15); } }
        @keyframes floatP3 { 0%,100% { transform: translate(0,0) rotate(0); } 40% { transform: translate(-22px,-18px) rotate(90deg); } 80% { transform: translate(15px,22px) rotate(180deg); } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 1: CINEMATIC HERO
   ═══════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1647845500203-0e7ab145efcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    tag: "This is TEXNAS",
    heading: "Color Your",
    headingAccent: "World Beautifully",
    description: "Your home deserves more than just paint — it deserves personality. At TEXNAS, we bring you premium quality paints designed to transform your walls into stunning spaces.",
    color: SAGE,
    badge: "Trending",
    stat: { value: "97%", label: "Customer Satisfaction" },
    swatchColors: [SAGE, "#a3b899", "#5e7055"],
  },
  {
    image: "https://images.unsplash.com/photo-1768488314310-3742b3c75579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    tag: "Interior Paints",
    heading: "Elegant",
    headingAccent: "Interiors",
    description: "Give your walls a fresh and elegant look with our interior paints. Designed for smooth finish, rich colors, and long-lasting beauty.",
    color: SIENNA,
    badge: "Eco-Certified",
    stat: { value: "0.02g/L", label: "VOC Content" },
    swatchColors: [SIENNA, "#e8845e", "#a04228"],
  },
  {
    image: "https://images.unsplash.com/photo-1598528644648-6b4b989a7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    tag: "Exterior Paints",
    heading: "Built To",
    headingAccent: "Last",
    description: "Protect your home with our weather-resistant exterior paints. Built to last and keep your home looking new for years.",
    color: GOLD,
    badge: "Artisan",
    stat: { value: "200+", label: "Texture Finishes" },
    swatchColors: [GOLD, "#e8c06e", "#b8842e"],
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { navigateToProducts } = useNavigation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(springX, [0, 1], [-15, 15]);
  const parallaxY = useTransform(springY, [0, 1], [-10, 10]);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === current || transitioning) return;
    setTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setTransitioning(false), 1200);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % HERO_SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, 7500);
    return () => clearTimeout(timerRef.current);
  }, [current, next]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const slide = HERO_SLIDES[current];
  const vis = loaded && !transitioning;
  const padNum = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 700, maxHeight: 1100 }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Background imagery with Ken Burns ── */}
      {HERO_SLIDES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-[-20px]"
          style={{ x: current === i ? parallaxX : 0, y: current === i ? parallaxY : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${s.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: current === i ? 1 : 0,
              transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1)",
              ...(current === i ? { animation: "heroKenBurns 10s ease-out forwards" } : {}),
            }}
          />
        </motion.div>
      ))}

      {/* ── Multi-layer cinematic overlay — lighter to let images shine ── */}
      <div className="absolute inset-0 z-[1]" style={{
        background: `
          linear-gradient(155deg, ${DARK_NAVY}cc 0%, ${DARK_NAVY}88 25%, ${DARK_NAVY}30 50%, transparent 75%, ${DARK_NAVY}15 100%),
          linear-gradient(to top, ${DARK_NAVY}c0 0%, ${DARK_NAVY}25 18%, transparent 45%),
          radial-gradient(ellipse at 80% 45%, transparent 30%, ${DARK_NAVY}35 100%)
        `,
      }} />

      {/* ── Vibrant color accent at top ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-[6]" style={{
        background: `linear-gradient(to right, ${slide.color}, ${GOLD}, ${slide.color})`,
        transition: "background 1s ease",
        boxShadow: `0 0 20px ${slide.color}50`,
      }} />

      {/* ── Grain texture ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }} />

      {/* ── Ambient particles ── */}
      <FloatingPaintParticles />

      {/* ── Decorative vertical accent line (left) ── */}
      <div className="absolute z-[3] left-6 sm:left-10 md:left-14 lg:left-20 xl:left-28 2xl:left-[140px] top-[25%] bottom-[30%] w-[1px] hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${slide.color}40, transparent)`, transition: "background 1s ease" }} />

      {/* ── Slide counter (left edge, vertical) ── */}
      <div className="absolute z-[5] left-6 sm:left-10 md:left-14 lg:left-20 xl:left-28 2xl:left-[140px] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
        <span className="font-['Fira_Sans',sans-serif] text-[clamp(11px,0.7vw,13px)] tracking-[3px]" style={{ fontWeight: 600, color: slide.color, transition: "color 0.7s ease" }}>{padNum(current)}</span>
        <div className="w-[1px] h-16 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor: slide.color }}
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 7.5, ease: "linear" }}
            key={`progress-${current}`}
          />
        </div>
        <span className="font-['Fira_Sans',sans-serif] text-[clamp(11px,0.7vw,13px)] tracking-[3px] text-white/30" style={{ fontWeight: 400 }}>{padNum(HERO_SLIDES.length - 1)}</span>
      </div>

      {/* ── Main content grid ── */}
      <div className={`absolute inset-0 z-[4] flex items-center ${SECTION_PX}`}>
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">

          {/* Left column — Editorial text */}
          <div className="max-w-[680px] md:pl-8 lg:pl-14">
            {/* Tag line */}
            <motion.div
              className="flex items-center gap-4 mb-6 lg:mb-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: vis ? 1 : 0, x: vis ? 0 : -40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              key={`tag-${current}`}
            >
              <div className="h-[1.5px] w-10 lg:w-14 transition-colors duration-700" style={{ backgroundColor: slide.color }} />
              <div className="flex items-center gap-3">
                <span className="font-['Fira_Sans',sans-serif] text-[11px] lg:text-[12px] tracking-[5px] uppercase transition-colors duration-700" style={{ color: slide.color, fontWeight: 500, filter: "brightness(1.2)" }}>
                  {slide.tag}
                </span>
                <span className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full transition-colors duration-700" style={{ color: "white", backgroundColor: `${slide.color}cc`, fontWeight: 600, boxShadow: `0 2px 12px ${slide.color}40` }}>
                  {slide.badge}
                </span>
              </div>
            </motion.div>

            {/* Main heading — oversized editorial */}
            <motion.div
              className="mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 50 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              key={`heading-${current}`}
            >
              <h1 className="font-['Fira_Sans',sans-serif] text-[clamp(52px,7vw,110px)] leading-[0.92] m-0 tracking-[-0.035em]" style={{ color: PAPER_WHITE, fontWeight: 300, textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
                {slide.heading}
                <br />
                <span
                  className="inline-block relative"
                  style={{
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    background: `linear-gradient(135deg, ${slide.color} 0%, ${GOLD} 40%, ${SOFT_IVORY} 70%, ${slide.color} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "brightness(1.15)",
                  }}
                >
                  {slide.headingAccent}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="font-['Fira_Sans',sans-serif] text-[clamp(13px,1.05vw,16px)] leading-[1.9] max-w-[440px] mb-8 lg:mb-10"
              style={{ color: "rgba(255,255,255,0.72)", fontWeight: 300 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              key={`desc-${current}`}
            >
              {slide.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              key={`cta-${current}`}
            >
              <button
                onClick={navigateToProducts}
                className="group flex items-center gap-4 h-[54px] lg:h-[58px] px-9 lg:px-11 rounded-full border-0 cursor-pointer transition-all duration-500 ease-out hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-[1.05] hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: slide.color, boxShadow: `0 8px 40px ${slide.color}50, 0 0 0 2px ${slide.color}20` }}
              >
                <span className="font-['Fira_Sans',sans-serif] text-[11px] lg:text-[12px] tracking-[3.5px] text-white uppercase" style={{ fontWeight: 600 }}>
                  Explore Collection
                </span>
                <ArrowRight size={16} className="text-white transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>
              <button className="group flex items-center gap-3 h-[54px] lg:h-[58px] px-7 lg:px-8 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-2xl cursor-pointer transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/[0.14] hover:scale-[1.03]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 transition-all duration-500 group-hover:border-white/40" style={{ backgroundColor: `${slide.color}30` }}>
                  <Play size={13} className="text-white ml-[2px]" fill="white" />
                </div>
                <span className="font-['Fira_Sans',sans-serif] text-[11px] lg:text-[12px] text-white/80 tracking-[2.5px] uppercase" style={{ fontWeight: 400 }}>
                  Watch Film
                </span>
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-5 mt-8 lg:mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: vis ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              key={`trust-${current}`}
            >
              {[
                { icon: <Leaf size={14} />, text: "Zero VOC", col: SAGE },
                { icon: <Shield size={14} />, text: "GREENGUARD Gold", col: GOLD },
                { icon: <Award size={14} />, text: "ISO 14001", col: SIENNA },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ color: b.col }}>{b.icon}</div>
                  <span className="font-['Fira_Sans',sans-serif] text-[10px] lg:text-[11px] text-white/60 tracking-[1.5px] uppercase" style={{ fontWeight: 400 }}>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Vivid stacked cards with colour palette */}
          <motion.div
            className="hidden lg:flex flex-col items-end gap-5"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: vis ? 1 : 0, x: vis ? 0 : 50, scale: vis ? 1 : 0.95 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            key={`card-${current}`}
          >
            {/* Main image card with vivid glow */}
            <div className="relative group cursor-pointer" data-cursor="view">
              {/* Glow effect behind card */}
              <div className="absolute -inset-6 rounded-[34px] opacity-40 blur-2xl transition-all duration-1000" style={{ background: `radial-gradient(circle, ${slide.color}60 0%, transparent 70%)` }} />
              <div
                className="relative w-[240px] xl:w-[280px] h-[300px] xl:h-[350px] rounded-[24px] overflow-hidden transition-all duration-700 group-hover:scale-[1.04] group-hover:shadow-2xl"
                style={{ boxShadow: `0 32px 80px ${slide.color}30, 0 0 0 1px rgba(255,255,255,0.1) inset` }}
              >
                {/* Room image background */}
                <div className="absolute inset-0 transition-transform duration-[1.5s] group-hover:scale-110" style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} />
                {/* Gradient overlay on card */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK_NAVY}dd 0%, ${DARK_NAVY}20 40%, transparent 60%)` }} />
                {/* Glass sheen */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }} />
                {/* View icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12">
                  <Eye size={16} className="text-white" />
                </div>
                {/* Bottom card info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-6">
                  <p className="font-['Fira_Sans',sans-serif] text-[17px] xl:text-[19px] text-white m-0" style={{ fontWeight: 600 }}>{slide.headingAccent}</p>
                  <p className="font-['Fira_Sans',sans-serif] text-[11px] text-white/50 m-0 mt-1.5 tracking-[1.5px] uppercase" style={{ fontWeight: 400 }}>{slide.tag}</p>
                  {/* Colour swatches row */}
                  <div className="flex items-center gap-2 mt-3.5">
                    {slide.swatchColors.map((c, j) => (
                      <div key={j} className="w-7 h-7 rounded-full border-2 border-white/25 transition-transform duration-300 hover:scale-125 hover:border-white/60" style={{ backgroundColor: c, boxShadow: `0 4px 12px ${c}50` }} />
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white/15 flex items-center justify-center bg-white/5 backdrop-blur">
                      <span className="font-['Fira_Sans',sans-serif] text-[9px] text-white/50">+8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat pill with glow */}
            <div className="relative w-[240px] xl:w-[280px]">
              <div className="absolute -inset-2 rounded-[20px] opacity-20 blur-lg" style={{ backgroundColor: slide.color }} />
              <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-[18px] px-5 py-4 border border-white/[0.1] flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors duration-700" style={{ backgroundColor: `${slide.color}25`, boxShadow: `0 0 20px ${slide.color}15` }}>
                  <Sparkles size={18} style={{ color: slide.color }} />
                </div>
                <div>
                  <p className="font-['Inter',sans-serif] text-[22px] xl:text-[24px] text-white m-0" style={{ fontWeight: 700 }}>{slide.stat.value}</p>
                  <p className="font-['Fira_Sans',sans-serif] text-[10px] text-white/45 m-0 tracking-[1.5px] uppercase" style={{ fontWeight: 400 }}>{slide.stat.label}</p>
                </div>
              </div>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-3 px-2 w-[240px] xl:w-[280px]">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(j => <Star key={j} size={13} fill={GOLD} className="text-[#d4a24e]" />)}</div>
              <span className="font-['Fira_Sans',sans-serif] text-[11px] text-white/50" style={{ fontWeight: 400 }}>4.9 (2,400+ reviews)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Navigation arrows (mobile only — desktop arrows in bottom bar) ── */}
      <button onClick={prev} className="absolute z-[5] left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl cursor-pointer flex items-center justify-center transition-all duration-500 hover:bg-white/[0.08] hover:border-white/15 md:hidden">
        <ChevronLeft size={18} className="text-white/50" />
      </button>
      <button onClick={next} className="absolute z-[5] right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl cursor-pointer flex items-center justify-center transition-all duration-500 hover:bg-white/[0.08] hover:border-white/15 md:hidden">
        <ChevronRight size={18} className="text-white/50" />
      </button>

      {/* ── Bottom bar: indicators + scroll cue ── */}
      <div className={`absolute z-[5] bottom-0 left-0 right-0 ${SECTION_PX}`}>
        <div className="max-w-[1400px] mx-auto flex items-end justify-between pb-8 lg:pb-10">
          {/* Slide indicators — animated capsules */}
          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="cursor-pointer border-0 bg-transparent p-0 group flex items-center gap-2.5"
              >
                <div className="relative overflow-hidden rounded-full transition-all duration-700" style={{
                  width: current === i ? 48 : 8,
                  height: 8,
                  backgroundColor: current === i ? "transparent" : "rgba(255,255,255,0.15)",
                }}>
                  {current === i && (
                    <>
                      <div className="absolute inset-0 rounded-full" style={{ backgroundColor: `${s.color}40` }} />
                      <motion.div
                        className="absolute inset-0 rounded-full origin-left"
                        style={{ backgroundColor: s.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7.5, ease: "linear" }}
                        key={`ind-${current}`}
                      />
                    </>
                  )}
                </div>
                {current === i && (
                  <span className="font-['Fira_Sans',sans-serif] text-[10px] text-white/50 tracking-[1px] uppercase hidden sm:inline" style={{ fontWeight: 400 }}>
                    {s.heading.replace(",", "")}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Desktop nav arrows + scroll cue */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/[0.08] bg-transparent cursor-pointer flex items-center justify-center transition-all duration-400 hover:bg-white/[0.06] hover:border-white/15">
              <ChevronLeft size={16} className="text-white/50" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/[0.08] bg-transparent cursor-pointer flex items-center justify-center transition-all duration-400 hover:bg-white/[0.06] hover:border-white/15">
              <ChevronRight size={16} className="text-white/50" />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            <div className="flex flex-col items-center gap-1.5 animate-bounce" style={{ animationDuration: "2.5s" }}>
              <div className="w-[1px] h-4 bg-white/20" />
              <span className="font-['Fira_Sans',sans-serif] text-[9px] text-white/25 tracking-[3px] uppercase" style={{ fontWeight: 400, writingMode: "vertical-lr" }}>Scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top-right decorative circles with glow ── */}
      <div className="absolute z-[3] top-[15%] right-[6%] w-[220px] h-[220px] hidden xl:block pointer-events-none" style={{
        border: `1.5px solid ${slide.color}20`,
        borderRadius: "50%",
        transition: "border-color 1s ease",
        boxShadow: `0 0 60px ${slide.color}08`,
      }}>
        <div className="absolute inset-5 rounded-full" style={{ border: `1px solid ${slide.color}15` }} />
        <div className="absolute inset-10 rounded-full" style={{ border: `1px solid ${slide.color}10` }} />
        {/* Glowing dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: slide.color, boxShadow: `0 0 12px ${slide.color}80`, transition: "all 1s ease" }} />
      </div>

      {/* ── Bottom progress line ── */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-[6] bg-white/[0.03]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: slide.color }}
          initial={{ width: "0%" }}
          animate={{ width: `${((current + 1) / HERO_SLIDES.length) * 100}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <style>{`
        @keyframes heroKenBurns { 0% { transform: scale(1) brightness(1); } 50% { transform: scale(1.04); } 100% { transform: scale(1.08); } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2: BRAND MARQUEE (premium)
   ═══════════════════════════════════════════════════════ */
function BrandMarquee() {
  const brands = ["Eco Turp", "Eco Turp+", "Eco Turp Pro", "Eco Texnas", "Eco Primax", "Eco Primax+", "Eco Primax Pro", "Teknas Paints"];
  return (
    <div className="w-full py-8 lg:py-10 overflow-hidden relative" style={{ backgroundColor: SAGE }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      {/* Fade edges for premium look */}
      <div className="absolute top-0 bottom-0 left-0 w-[80px] lg:w-[140px] z-[1] pointer-events-none" style={{ background: `linear-gradient(to right, ${SAGE}, transparent)` }} />
      <div className="absolute top-0 bottom-0 right-0 w-[80px] lg:w-[140px] z-[1] pointer-events-none" style={{ background: `linear-gradient(to left, ${SAGE}, transparent)` }} />
      <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      <div className="flex" style={{ animation: "marqueeScroll 35s linear infinite", width: "max-content" }}>
        {[0, 1].map(copy => (
          <div key={copy} className="flex items-center shrink-0">
            {brands.map((b, i) => (
              <div key={`${copy}-${i}`} className="flex items-center">
                <span className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[16px] tracking-[6px] text-white/70 uppercase px-10 lg:px-14 whitespace-nowrap" style={{ fontWeight: 300 }}>{b}</span>
                <div className="w-[4px] h-[4px] rounded-full bg-white/25 shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3: COLOUR EXPLORER (elevated)
   ═══════════════════════════════════════════════════════ */
const TRENDING_COLORS = [
  { name: "Sage Serenity", hex: "#75866c", description: "A muted sage that brings calm and organic warmth to any room.", room: "Living Room", image: "https://images.unsplash.com/photo-1674376360467-6dee088f35e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { name: "Burnt Sienna", hex: "#c75b3a", description: "A rich, earthy terracotta that radiates warmth and sophistication.", room: "Bedroom", image: "https://images.unsplash.com/photo-1612320583354-02dd0cf04612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { name: "Ochre Gold", hex: "#d4a24e", description: "A luminous golden hue that adds elegance and sunlit warmth.", room: "Dining Room", image: "https://images.unsplash.com/photo-1675528030415-dc82908eeb73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { name: "Cobalt Dusk", hex: "#3b7ca5", description: "A deep, confident blue that evokes depth and tranquility.", room: "Study", image: "https://images.unsplash.com/photo-1593853919383-37c43e748897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { name: "Aubergine Night", hex: "#1a1428", description: "A dramatic dark purple that creates intimate, luxurious spaces.", room: "Master Suite", image: "https://images.unsplash.com/photo-1743867840110-ee532b7c6fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { name: "Warm Canvas", hex: "#ede7dd", description: "A soft, creamy neutral that's the perfect backdrop for any design.", room: "Nursery", image: "https://images.unsplash.com/photo-1571164860029-856acbc24b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
];

function ColourExplorer() {
  const [activeColor, setActiveColor] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const color = TRENDING_COLORS[activeColor];

  const handleColorChange = (i: number) => {
    if (i === activeColor || isTransitioning) return;
    setIsTransitioning(true);
    setActiveColor(i);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const isDarkHex = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  };

  return (
    <div className="w-full relative overflow-hidden" style={{ backgroundColor: CANVAS }}>
      {/* Header */}
      <div className={`pt-20 lg:pt-24 xl:pt-[120px] pb-10 lg:pb-14 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-[2px]" style={{ backgroundColor: SIENNA }} />
                <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Colour Trends 2026</span>
              </div>
              <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] xl:text-[56px] leading-[1.1] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                Find Your Perfect <span style={{ color: SIENNA }}>Shade</span>
              </h2>
            </div>
            <button className="flex items-center gap-3 font-['Jost',sans-serif] text-[13px] tracking-[3px] uppercase bg-transparent border-0 cursor-pointer transition-all hover:gap-5 shrink-0 self-start lg:self-auto" style={{ color: SIENNA, fontWeight: 600 }}>
              Explore All Colours <ArrowRight size={18} />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Immersive viewer */}
      <ScrollReveal>
        <div className={`pb-0 ${SECTION_PX}`}>
          <div className="relative w-full rounded-t-[28px] lg:rounded-t-[36px] overflow-hidden" style={{ minHeight: 560 }}>
            {/* Crossfading room images */}
            {TRENDING_COLORS.map((c, i) => (
              <div
                key={c.name}
                className="absolute inset-0"
                style={{
                  opacity: activeColor === i ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
                  zIndex: activeColor === i ? 1 : 0,
                }}
              >
                <img src={c.image} alt={c.room} className="w-full h-full object-cover" style={{ filter: "brightness(0.72) saturate(1.15) contrast(1.02)" }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.hex}40 0%, transparent 60%)`, mixBlendMode: "multiply" }} />
              </div>
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />
            <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />

            {/* Content */}
            <div className="relative z-[3] flex flex-col lg:flex-row h-full min-h-[560px]">
              {/* Left info */}
              <div className="flex-1 flex flex-col justify-end p-8 lg:p-12 xl:p-16 pb-32 lg:pb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeColor}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className="pb-28 lg:pb-32 xl:pb-36"
                  >
                    <p className="font-['Jost',sans-serif] text-[11px] tracking-[4px] uppercase mb-2" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                      Colour of the Year · {color.room}
                    </p>
                    <h3 className="font-['Jost',sans-serif] text-[42px] lg:text-[54px] xl:text-[62px] text-white m-0 mb-4 leading-[1.05]" style={{ fontWeight: 600 }}>
                      {color.name}
                    </h3>
                    <p className="font-['Jost',sans-serif] text-[15px] lg:text-[17px] leading-[28px] max-w-[440px] m-0 mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {color.description}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <div className="w-[22px] h-[22px] rounded-full shadow-inner" style={{ backgroundColor: color.hex, boxShadow: "0 0 0 2px rgba(255,255,255,0.25), inset 0 1px 3px rgba(0,0,0,0.15)" }} />
                        <span className="font-['Jost',sans-serif] text-[14px] text-white/80" style={{ fontWeight: 500 }}>{color.hex.toUpperCase()}</span>
                      </div>
                      <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 cursor-pointer transition-all duration-300 hover:bg-white/20">
                        <Eye size={15} className="text-white/70" />
                        <span className="font-['Jost',sans-serif] text-[13px] text-white/75" style={{ fontWeight: 500 }}>Visualize</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: floating paint swatch */}
              <div className="hidden xl:flex items-end justify-end p-16 pr-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeColor}
                    initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    className="relative"
                    style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.35))" }}
                  >
                    <div className="w-[180px] h-[240px] rounded-[18px] overflow-hidden flex flex-col" style={{ backgroundColor: "#fff" }}>
                      <div className="flex-1" style={{ backgroundColor: color.hex, transition: "background-color 0.6s ease" }} />
                      <div className="px-4 py-3">
                        <p className="font-['Jost',sans-serif] text-[11px] tracking-[2px] uppercase m-0 mb-0.5" style={{ color: `${DARK_NAVY}40`, fontWeight: 500 }}>Teknas</p>
                        <p className="font-['Jost',sans-serif] text-[14px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>{color.name}</p>
                        <p className="font-['Jost',sans-serif] text-[11px] m-0 mt-0.5" style={{ color: `${DARK_NAVY}45` }}>{color.hex.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.1)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom colour strip */}
            <div className="absolute bottom-0 left-0 right-0 z-[4]">
              <div className="flex items-stretch w-full">
                {TRENDING_COLORS.map((c, i) => {
                  const isActive = activeColor === i;
                  const labelDark = isDarkHex(c.hex);
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(i)}
                      className="flex-1 border-0 cursor-pointer transition-all duration-700 relative group p-0"
                      style={{ backgroundColor: c.hex, height: isActive ? 88 : 56, outline: "none", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                    >
                      {isActive && (
                        <motion.div layoutId="colorStripHL" className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "white" }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} />
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-400" style={{ opacity: isActive ? 1 : 0 }}>
                        <span className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase" style={{ color: labelDark ? "rgba(255,255,255,0.85)" : `${DARK_NAVY}90`, fontWeight: 600 }}>{c.name}</span>
                        <span className="font-['Jost',sans-serif] text-[10px] mt-0.5" style={{ color: labelDark ? "rgba(255,255,255,0.4)" : `${DARK_NAVY}45`, fontWeight: 400 }}>{c.hex.toUpperCase()}</span>
                      </div>
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="font-['Jost',sans-serif] text-[10px] tracking-[1px]" style={{ color: labelDark ? "rgba(255,255,255,0.7)" : `${DARK_NAVY}60`, fontWeight: 500 }}>{c.name}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4: PRODUCT CATEGORIES + SHOWCASE
   ═══════════════════════════════════════════════════════ */
const CATEGORY_ACCENTS = [SAGE, SIENNA, COBALT, GOLD, FOREST];
const CATEGORY_GRADIENTS = [
  "linear-gradient(160deg, #e8ede5 0%, #d4ddd0 100%)",
  "linear-gradient(160deg, #f5ebe6 0%, #edd9d0 100%)",
  "linear-gradient(160deg, #e3eef5 0%, #d0e0ed 100%)",
  "linear-gradient(160deg, #f7f0e2 0%, #ede3cc 100%)",
  "linear-gradient(160deg, #e6ebe5 0%, #d4ddd2 100%)",
];
const PRODUCT_CATEGORIES = [
  { name: "Eco Turpentine Oils", count: 3, description: "Low-odour, eco-friendly turpentine oils for safe paint thinning.", productImg: imgEcoTurpPlus },
  { name: "Interior & Exterior Emulsions", count: 4, description: "High-performance emulsions for flawless walls inside and out.", productImg: imgEcoPrimaxPlusBucket },
  { name: "Protective Coats", count: 3, description: "Antibacterial protective coats with Silver Ion Technology.", productImg: imgEcoPrimaxBase },
  { name: "Eco Textured Paints", count: 4, description: "Stunning textured finishes with ultra-low VOC technology.", productImg: imgTexnasMarbleFront },
  { name: "Low-VOC Primers", count: 2, description: "Eco-friendly primers for superior adhesion and durability.", productImg: imgEcoPrimaxProBucket },
];

const PRODUCT_SHOWCASE = [
  { name: "Eco Turp+", tagline: "Advanced Low VOC Turpentine Oil", color: SAGE, accentLight: "#e8ede5", rating: 4.9, reviews: 518, coverage: "—", finish: "Liquid", dryTime: "—", price: getProductPricing("Eco Turp+").price, badges: ["Low VOC", "Eco Certified"], resultImage: IMAGES.resultLiving, resultRoom: "Living Room", productImage: imgEcoTurpPlus },
  { name: "Eco Primax+", tagline: "Premium Silk Finish Emulsion", color: SIENNA, accentLight: "#f5e8e3", rating: 4.9, reviews: 863, coverage: "350 sq.ft/L", finish: "Silk Finish", dryTime: "2 hours", price: getProductPricing("Eco Primax+").price, badges: ["Dual Surface", "Premium"], resultImage: IMAGES.resultWall, resultRoom: "Feature Wall", productImage: imgEcoPrimaxPlusBucket },
  { name: "Royale Health Shield", tagline: "Antibacterial Protective Clear Coat", color: COBALT, accentLight: "#e3eef5", rating: 4.8, reviews: 672, coverage: "300 sq.ft/L", finish: "Semi-Gloss", dryTime: "3 hours", price: getProductPricing("Royale Health Shield").price, badges: ["Anti-Bacterial", "Silver Ion"], resultImage: IMAGES.resultExterior, resultRoom: "Exterior", productImage: imgEcoPrimaxBase },
  { name: "Eco Texnas Marble", tagline: "Premium Marble Finish Wall Texture", color: GOLD, accentLight: "#f7f0e2", rating: 4.8, reviews: 412, coverage: "200 sq.ft/L", finish: "Textured", dryTime: "4 hours", price: getProductPricing("Eco Texnas Marble").price, badges: ["Eco-Friendly", "Anti-Fungal"], resultImage: IMAGES.resultBedroom, resultRoom: "Bedroom", productImage: imgTexnasMarbleFront },
  { name: "Eco Primax Pro", tagline: "Professional-Grade Low-VOC Primer", color: "#6b7b8d", accentLight: "#eaecef", rating: 4.6, reviews: 198, coverage: "400 sq.ft/L", finish: "Matte", dryTime: "2.5 hours", price: getProductPricing("Eco Primax Pro").price, badges: ["Low VOC", "Pro Grade"], resultImage: IMAGES.resultKitchen, resultRoom: "Kitchen", productImage: imgEcoPrimaxProBucket },
];

function SpecPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 lg:px-5 py-3 lg:py-[13px] rounded-[14px]" style={{ backgroundColor: `${color}0a`, border: `1px solid ${color}14` }}>
      <span className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[1px] uppercase m-0" style={{ color: `${DARK_NAVY}40`, fontWeight: 400, lineHeight: "16.5px" }}>{label}</span>
      <span className="font-['Fira_Sans',sans-serif] text-[14px] m-0" style={{ color: DARK_NAVY, fontWeight: 600, lineHeight: "21px" }}>{value}</span>
    </div>
  );
}

function ProductCategories() {
  const { navigateToProducts } = useNavigation();
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToProduct = useCallback((idx: number) => {
    setActiveProduct(idx);
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-product-card]");
    if (cards[idx]) {
      const cardLeft = cards[idx].offsetLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = cards[idx].offsetWidth;
      container.scrollTo({ left: cardLeft - (containerWidth / 2) + (cardWidth / 2), behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const cards = container.querySelectorAll<HTMLElement>("[data-product-card]");
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closest = 0, closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - containerCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveProduct(closest);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const product = PRODUCT_SHOWCASE[activeProduct];

  return (
    <div className="w-full bg-white py-20 lg:py-24 xl:py-[120px]">
      {/* ── Section Header ── */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-[70px] gap-6 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
            <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Our Products</span>
          </div>
          <h2 className="font-['Fira_Sans',sans-serif] text-[40px] lg:text-[50px] xl:text-[56px] leading-[1.1] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
            Eco-Friendly Paint <span style={{ color: SAGE, fontStyle: "italic", fontWeight: 300 }}>Solutions</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <button onClick={navigateToProducts} className="flex items-center gap-2.5 h-[52px] px-8 rounded-full border-2 bg-transparent cursor-pointer transition-all duration-400 hover:scale-[1.03] group" style={{ borderColor: DARK_NAVY }}>
            <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase transition-colors" style={{ color: DARK_NAVY, fontWeight: 600 }}>View All</span>
            <ArrowUpRight size={18} style={{ color: DARK_NAVY }} />
          </button>
        </ScrollReveal>
      </div>

      {/* ── Category Cards — Product-first clean design ── */}
      <div className={`${SECTION_PX}`}>
        {/* Top row: 3 large cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {PRODUCT_CATEGORIES.slice(0, 3).map((cat, i) => {
            const accent = CATEGORY_ACCENTS[i];
            const gradient = CATEGORY_GRADIENTS[i];
            const isHov = hovered === i;
            return (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <div
                  className="relative rounded-[24px] overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={navigateToProducts}
                  style={{
                    background: gradient,
                    transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)",
                    transform: isHov ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHov ? `0 28px 60px ${accent}25, 0 0 0 1px ${accent}15` : `0 4px 20px rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Product image area */}
                  <div className="relative flex items-center justify-center pt-10 pb-4 lg:pt-12 lg:pb-5 h-[260px] sm:h-[280px] lg:h-[320px]">
                    {/* Soft radial glow behind product */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full pointer-events-none transition-all duration-700"
                      style={{
                        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
                        transform: `translate(-50%, -50%) scale(${isHov ? 1.3 : 1})`,
                      }}
                    />
                    <img
                      src={cat.productImg}
                      alt={cat.name}
                      className="relative z-10 object-contain max-h-[200px] lg:max-h-[240px] w-auto transition-all duration-700 ease-out"
                      style={{
                        transform: isHov ? "translateY(-12px) scale(1.06)" : "translateY(0) scale(1)",
                        filter: `drop-shadow(0 ${isHov ? 24 : 12}px ${isHov ? 48 : 24}px rgba(0,0,0,${isHov ? 0.18 : 0.1}))`,
                      }}
                    />
                  </div>
                  {/* Info area */}
                  <div className="relative px-7 lg:px-8 pb-7 lg:pb-8">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: accent }} />
                      <span className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[3px] uppercase" style={{ color: accent, fontWeight: 600 }}>
                        {cat.count} products
                      </span>
                    </div>
                    <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] m-0 mb-2" style={{ color: DARK_NAVY, fontWeight: 600, lineHeight: 1.25 }}>
                      {cat.name}
                    </h3>
                    <p className="font-['Fira_Sans',sans-serif] text-[13px] leading-[21px] m-0 mb-4" style={{ color: `${DARK_NAVY}55`, fontWeight: 300 }}>
                      {cat.description}
                    </p>
                    {/* Explore link */}
                    <div className="flex items-center gap-2 transition-all duration-500" style={{ transform: isHov ? "translateX(4px)" : "translateX(0)" }}>
                      <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase" style={{ color: accent, fontWeight: 600 }}>Explore</span>
                      <ArrowRight size={14} className="transition-transform duration-500" style={{ color: accent, transform: isHov ? "translateX(4px)" : "translateX(0)" }} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        {/* Bottom row: 2 wide cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {PRODUCT_CATEGORIES.slice(3).map((cat, rawI) => {
            const i = rawI + 3;
            const accent = CATEGORY_ACCENTS[i];
            const gradient = CATEGORY_GRADIENTS[i];
            const isHov = hovered === i;
            return (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <div
                  className="relative rounded-[24px] overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={navigateToProducts}
                  style={{
                    background: gradient,
                    transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)",
                    transform: isHov ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHov ? `0 28px 60px ${accent}25, 0 0 0 1px ${accent}15` : `0 4px 20px rgba(0,0,0,0.04)`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    {/* Product image — left side */}
                    <div className="relative flex items-center justify-center w-full sm:w-[45%] h-[220px] sm:h-[260px] lg:h-[280px] shrink-0">
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full pointer-events-none transition-all duration-700"
                        style={{
                          background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
                          transform: `translate(-50%, -50%) scale(${isHov ? 1.3 : 1})`,
                        }}
                      />
                      <img
                        src={cat.productImg}
                        alt={cat.name}
                        className="relative z-10 object-contain max-h-[180px] lg:max-h-[210px] w-auto transition-all duration-700 ease-out"
                        style={{
                          transform: isHov ? "translateY(-10px) scale(1.06)" : "translateY(0) scale(1)",
                          filter: `drop-shadow(0 ${isHov ? 24 : 12}px ${isHov ? 48 : 24}px rgba(0,0,0,${isHov ? 0.18 : 0.1}))`,
                        }}
                      />
                    </div>
                    {/* Info — right side */}
                    <div className="flex-1 px-7 pb-7 sm:py-8 sm:pr-8 sm:pl-0 lg:pr-10 lg:py-10">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: accent }} />
                        <span className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[3px] uppercase" style={{ color: accent, fontWeight: 600 }}>
                          {cat.count} products
                        </span>
                      </div>
                      <h3 className="font-['Fira_Sans',sans-serif] text-[22px] lg:text-[26px] m-0 mb-2.5" style={{ color: DARK_NAVY, fontWeight: 600, lineHeight: 1.2 }}>
                        {cat.name}
                      </h3>
                      <p className="font-['Fira_Sans',sans-serif] text-[13px] lg:text-[14px] leading-[22px] m-0 mb-5 max-w-[360px]" style={{ color: `${DARK_NAVY}55`, fontWeight: 300 }}>
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-2 transition-all duration-500" style={{ transform: isHov ? "translateX(4px)" : "translateX(0)" }}>
                        <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase" style={{ color: accent, fontWeight: 600 }}>Explore</span>
                        <ArrowRight size={14} className="transition-transform duration-500" style={{ color: accent, transform: isHov ? "translateX(4px)" : "translateX(0)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ── Best Sellers Showcase ── */}
      <ScrollReveal className="mt-20 lg:mt-24">
        <div className={`flex items-center justify-between mb-10 lg:mb-12 ${SECTION_PX}`}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={18} style={{ color: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Product Showcase</span>
            </div>
            <h3 className="font-['Fira_Sans',sans-serif] text-[30px] lg:text-[38px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
              Explore Our <span style={{ color: product.color, fontStyle: "italic", fontWeight: 300 }}>Best Sellers</span>
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollToProduct(Math.max(0, activeProduct - 1))} className="w-12 h-12 rounded-full border-2 bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 disabled:opacity-30" style={{ borderColor: `${DARK_NAVY}20` }} disabled={activeProduct === 0}>
              <ChevronLeft size={18} style={{ color: DARK_NAVY }} />
            </button>
            <button onClick={() => scrollToProduct(Math.min(PRODUCT_SHOWCASE.length - 1, activeProduct + 1))} className="w-12 h-12 rounded-full border-2 bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 disabled:opacity-30" style={{ borderColor: `${DARK_NAVY}20` }} disabled={activeProduct === PRODUCT_SHOWCASE.length - 1}>
              <ChevronRight size={18} style={{ color: DARK_NAVY }} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="product-scroll flex gap-7 lg:gap-9 overflow-x-auto pb-8 scroll-smooth" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "clamp(1.5rem, 5vw, 140px)", paddingRight: "clamp(1.5rem, 5vw, 140px)" }}>
          <style>{`.product-scroll::-webkit-scrollbar { display: none; }`}</style>
          {PRODUCT_SHOWCASE.map((p, i) => (
            <div
              key={p.name}
              data-product-card
              className="shrink-0 w-[88vw] sm:w-[620px] lg:w-[760px] xl:w-[840px] rounded-[28px] overflow-hidden transition-all duration-600 cursor-pointer group"
              style={{
                scrollSnapAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: activeProduct === i ? `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px ${p.color}15` : "0 8px 40px rgba(0,0,0,0.05)",
                transform: activeProduct === i ? "scale(1)" : "scale(0.96)",
              }}
              onClick={() => scrollToProduct(i)}
            >
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left — Product image on gradient background */}
                <div
                  className="relative w-full lg:w-[320px] xl:w-[345px] h-[280px] lg:h-auto shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(160deg, ${p.accentLight} 0%, ${p.color}12 100%)` }}
                >
                  {/* Radial glow */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${p.color}15 0%, transparent 70%)` }}
                  />
                  <img
                    src={p.productImage}
                    alt={p.name}
                    className="relative z-10 object-contain max-h-[220px] lg:max-h-[300px] w-auto transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                    style={{ filter: `drop-shadow(0 20px 40px ${p.color}30)` }}
                  />
                  {/* Badges overlaid on image */}
                  <div className="absolute top-5 left-5 flex flex-col gap-1.5 z-20">
                    {p.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 h-[26px] px-3 rounded-full font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase backdrop-blur-md"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)", color: p.color, fontWeight: 600, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                      >
                        <Check size={10} strokeWidth={2.5} />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — Details */}
                <div className="flex-1 p-7 lg:px-10 lg:py-9 flex flex-col justify-between">
                  <div>
                    <p className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[3px] uppercase m-0 mb-2.5" style={{ color: p.color, fontWeight: 500 }}>Teknas Paints</p>
                    <h4 className="font-['Fira_Sans',sans-serif] text-[26px] lg:text-[32px] m-0 mb-1.5" style={{ color: DARK_NAVY, fontWeight: 700, lineHeight: 1.15 }}>{p.name}</h4>
                    <p className="font-['Fira_Sans',sans-serif] text-[14px] m-0 mb-6" style={{ color: `${DARK_NAVY}50`, lineHeight: "21px" }}>{p.tagline}</p>

                    {/* Star rating */}
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => {
                          const isFull = j < Math.floor(p.rating);
                          return (
                            <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d={productSvg.p6932200} fill={isFull ? GOLD : "none"} stroke={GOLD} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                            </svg>
                          );
                        })}
                      </div>
                      <span className="font-['Fira_Sans',sans-serif] text-[14px]" style={{ color: DARK_NAVY, fontWeight: 600 }}>{p.rating}</span>
                      <span className="font-['Fira_Sans',sans-serif] text-[13px]" style={{ color: `${DARK_NAVY}40` }}>({p.reviews.toLocaleString()} reviews)</span>
                    </div>

                    {/* Spec pills */}
                    <div className="flex items-center gap-2 lg:gap-2.5 flex-wrap mb-7">
                      <SpecPill label="Coverage" value={p.coverage} color={p.color} />
                      <SpecPill label="Finish" value={p.finish} color={p.color} />
                      <SpecPill label="Dry Time" value={p.dryTime} color={p.color} />
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <span className="font-['Fira_Sans',sans-serif] text-[12px] block mb-1" style={{ color: `${DARK_NAVY}40` }}>Starting from</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-['Inter',sans-serif] text-[30px] lg:text-[34px]" style={{ color: DARK_NAVY, fontWeight: 700 }}>{p.price}</span>
                        <span className="font-['Fira_Sans',sans-serif] text-[13px]" style={{ color: `${DARK_NAVY}40` }}>/litre</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateToProducts(); }}
                      className="inline-flex items-center gap-2 h-[44px] px-6 rounded-full border-0 cursor-pointer transition-all duration-400 hover:scale-[1.04] hover:shadow-lg"
                      style={{ backgroundColor: p.color, color: "white" }}
                    >
                      <span className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[2px] uppercase" style={{ fontWeight: 600 }}>View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {PRODUCT_SHOWCASE.map((p, i) => (
            <button key={p.name} onClick={() => scrollToProduct(i)} className="cursor-pointer border-0 bg-transparent p-0" style={{ width: activeProduct === i ? 40 : 10, height: 10 }}>
              <div className="h-full rounded-full transition-all duration-600" style={{ backgroundColor: activeProduct === i ? p.color : `${DARK_NAVY}15`, width: "100%", boxShadow: activeProduct === i ? `0 0 16px ${p.color}40` : "none" }} />
            </button>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4B: COLOUR GUIDE (interactive room visualizer)
   ═══════════════════════════════════════════════════════ */
const GUIDE_ROOMS = [
  { label: "Living Room", image: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { label: "Bedroom", image: "https://images.unsplash.com/photo-1603072387986-d6136328c664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { label: "Kitchen", image: "https://images.unsplash.com/photo-1600684388091-627109f3cd60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { label: "Kids Room", image: "https://images.unsplash.com/photo-1745636624902-0c11c981d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { label: "Bathroom", image: "https://images.unsplash.com/photo-1763485956023-49c4a03283fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
];

const GUIDE_PALETTES = [
  { name: "Slate Grey", code: "SG-4012", hex: "#6b6b6b", family: ["#858585", "#6b6b6b", "#525252", "#3d3d3d"] },
  { name: "Charcoal", code: "CH-2820", hex: "#2d2d2d", family: ["#484848", "#2d2d2d", "#1a1a1a", "#0f0f0f"] },
  { name: "Burnt Amber", code: "BA-5540", hex: "#c67a2e", family: ["#dba05a", "#c67a2e", "#a45f1c", "#834a0e"] },
  { name: "Terracotta", code: "TC-3315", hex: "#c75b3a", family: ["#dd826a", "#c75b3a", "#a43f23", "#7d2e16"] },
  { name: "Emerald", code: "EM-7210", hex: "#2e8b57", family: ["#5cb880", "#2e8b57", "#1e6b40", "#0f4d2b"] },
  { name: "Deep Teal", code: "DT-6105", hex: "#0d4d4d", family: ["#1a7a7a", "#0d4d4d", "#063939", "#022727"] },
  { name: "Ocean Pine", code: "OP-8322", hex: "#1a5c5c", family: ["#348888", "#1a5c5c", "#0e4242", "#062e2e"] },
];

function ColourGuideSection() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [selectedColour, setSelectedColour] = useState(3);
  const [roomTransition, setRoomTransition] = useState(false);
  const [colourTransition, setColourTransition] = useState(false);
  const { navigateToDealers, navigateToSearch } = useNavigation();

  const room = GUIDE_ROOMS[selectedRoom];
  const colour = GUIDE_PALETTES[selectedColour];

  const handleRoomChange = (idx: number) => {
    if (idx === selectedRoom) return;
    setRoomTransition(true);
    setTimeout(() => {
      setSelectedRoom(idx);
      setTimeout(() => setRoomTransition(false), 60);
    }, 300);
  };

  const handleColourChange = (idx: number) => {
    if (idx === selectedColour) return;
    setColourTransition(true);
    setTimeout(() => {
      setSelectedColour(idx);
      setTimeout(() => setColourTransition(false), 60);
    }, 250);
  };

  const sliderPercent = (selectedColour / (GUIDE_PALETTES.length - 1)) * 100;

  return (
    <div className={`w-full py-20 lg:py-24 xl:py-[120px] ${SECTION_PX}`} style={{ backgroundColor: CANVAS }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20">
          {/* ── Left: Heading + Room Thumbnails ── */}
          <ScrollReveal className="lg:w-[38%] xl:w-[36%] shrink-0">
            <div>
              <div
                className="inline-flex items-center h-[32px] px-4 rounded-full mb-6"
                style={{ backgroundColor: `${SAGE}18`, border: `1px solid ${SAGE}30` }}
              >
                <span className="font-['Jost',sans-serif] text-[12px] tracking-[1.5px] uppercase" style={{ color: SAGE, fontWeight: 600 }}>
                  Colour Guide
                </span>
              </div>

              <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,44px)] m-0 mb-3" style={{ color: DARK_NAVY, lineHeight: 1.15 }}>
                <span style={{ fontWeight: 300, fontStyle: "italic" }}>Your Home's Dream Look</span>
                <br />
                <span style={{ fontWeight: 700 }}>Starts With A Single Click</span>
              </h2>

              <p className="font-['Jost',sans-serif] text-[clamp(13px,1vw,15px)] leading-[26px] m-0 mb-8" style={{ color: `${DARK_NAVY}60`, fontWeight: 300 }}>
                Choose a room, pick a colour, and instantly see how it transforms your space.
              </p>

              <div className="flex gap-2.5 flex-wrap">
                {GUIDE_ROOMS.map((r, i) => {
                  const isActive = i === selectedRoom;
                  return (
                    <button
                      key={r.label}
                      onClick={() => handleRoomChange(i)}
                      className="cursor-pointer border-0 p-0 bg-transparent flex flex-col items-center gap-1.5 group"
                    >
                      <div
                        className="w-[72px] h-[56px] sm:w-[82px] sm:h-[62px] rounded-[10px] overflow-hidden transition-all duration-300"
                        style={{
                          boxShadow: isActive ? `0 4px 16px ${GOLD}40, 0 0 0 2px ${GOLD}` : "0 2px 8px rgba(0,0,0,0.06)",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                          opacity: isActive ? 1 : 0.7,
                        }}
                      >
                        <div
                          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${r.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                      </div>
                      <span
                        className="font-['Jost',sans-serif] text-[10px] sm:text-[11px] whitespace-nowrap transition-colors"
                        style={{ color: isActive ? DARK_NAVY : `${DARK_NAVY}55`, fontWeight: isActive ? 600 : 400 }}
                      >
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: Room Visualisation + Controls ── */}
          <ScrollReveal direction="right" className="flex-1">
            <div>
              <div className="relative w-full rounded-[20px] lg:rounded-[24px] overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    backgroundImage: `url('${room.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: roomTransition ? 0 : 1,
                    filter: "brightness(1.02) saturate(0.85)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${colour.hex}50 0%, ${colour.hex}35 50%, transparent 50.5%, transparent 100%)`,
                    opacity: colourTransition ? 0 : 1,
                    transition: "opacity 0.35s ease, background 0.5s ease",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: colour.hex,
                    mixBlendMode: "multiply",
                    opacity: colourTransition ? 0 : 0.3,
                    transition: "opacity 0.35s ease, background-color 0.5s ease",
                  }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.25) 100%)" }} />

                <button
                  className="absolute bottom-4 left-4 w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer border-0 backdrop-blur-xl transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                  onClick={() => navigateToSearch()}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                <button
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 flex flex-col items-center gap-1 cursor-pointer border-0 bg-transparent group"
                  onClick={navigateToDealers}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: GOLD, boxShadow: `0 6px 24px ${GOLD}50` }}
                  >
                    <MapPin size={20} className="text-white" />
                  </div>
                  <span className="font-['Jost',sans-serif] text-[10px] text-white/90 whitespace-nowrap" style={{ fontWeight: 500, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                    Dealer Locator
                  </span>
                </button>
              </div>

              <div className="mt-5 lg:mt-6">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase" style={{ color: `${DARK_NAVY}55`, fontWeight: 500 }}>
                      Colour Name :
                    </span>
                    <span className="font-['Jost',sans-serif] text-[14px]" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                      {colour.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase" style={{ color: `${DARK_NAVY}55`, fontWeight: 500 }}>
                      Colour Code :
                    </span>
                    <span className="font-['Jost',sans-serif] text-[14px]" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                      {colour.code}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3 mb-5">
                  {GUIDE_PALETTES.map((p, i) => {
                    const isActive = i === selectedColour;
                    return (
                      <button
                        key={p.code}
                        onClick={() => handleColourChange(i)}
                        className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] rounded-[8px] cursor-pointer border-0 p-0 transition-all duration-300 relative"
                        style={{
                          backgroundColor: p.hex,
                          boxShadow: isActive ? `0 4px 16px ${p.hex}60, 0 0 0 2.5px ${DARK_NAVY}` : `0 2px 8px ${p.hex}25`,
                          transform: isActive ? "scale(1.12)" : "scale(1)",
                        }}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-[8px] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                            <Check size={16} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full h-[8px] rounded-full overflow-visible" style={{ backgroundColor: `${DARK_NAVY}08` }}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(sliderPercent + 8, 12)}%`,
                      background: `linear-gradient(90deg, ${colour.family[0]}, ${colour.hex}, ${colour.family[3] || colour.hex})`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 w-[16px] h-[16px] rounded-full border-[2.5px] border-white transition-all duration-500"
                    style={{
                      left: `${sliderPercent}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: colour.hex,
                      boxShadow: `0 2px 8px ${colour.hex}60`,
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6: WHY TEKNAS (dramatic stats + USPs)
   ═══════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2200;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Paint Colours" },
  { value: 50, suffix: "K+", label: "Happy Homes" },
  { value: 100, suffix: "%", label: "Eco-Friendly" },
];

const USP_POINTS = [
  { icon: <Leaf size={24} />, title: "Zero VOC Emissions", desc: "All products tested and certified for ultra-low volatile organic compounds." },
  { icon: <Shield size={24} />, title: "15-Year Warranty", desc: "Industry-leading warranty on all premium interior and exterior coatings." },
  { icon: <Award size={24} />, title: "ISO Certified", desc: "Manufacturing processes certified to ISO 9001 and ISO 14001 standards." },
  { icon: <Droplets size={24} />, title: "Water-Based Formula", desc: "Innovative water-based technology for easy application and quick drying." },
];

function WhyTeknasSection() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Stats bar — dramatic */}
      <div className={`py-16 lg:py-20 ${SECTION_PX} relative`} style={{ backgroundColor: SAGE }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-[1]">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.12} className="text-center">
              <p className="font-['Jost',sans-serif] text-[48px] lg:text-[60px] xl:text-[68px] text-white m-0 mb-2" style={{ fontWeight: 700, lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-['Jost',sans-serif] text-[12px] lg:text-[13px] tracking-[3px] text-white/60 uppercase m-0">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* USPs */}
      <div className={`bg-[#f5f2ec] py-20 lg:py-24 xl:py-[120px] ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-[2px]" style={{ backgroundColor: COBALT }} />
            <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: COBALT, fontWeight: 500 }}>Why Choose Teknas</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] xl:text-[56px] leading-[1.1] m-0 mb-14 lg:mb-[70px]" style={{ color: DARK_NAVY, fontWeight: 600 }}>
            The Teknas <span style={{ color: COBALT }}>Difference</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {USP_POINTS.map((usp, i) => (
            <ScrollReveal key={usp.title} delay={i * 0.1}>
              <div className="bg-white rounded-[24px] p-8 lg:p-10 h-[260px] lg:h-[290px] transition-all duration-700 ease-out hover:shadow-[0_28px_72px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 group cursor-default border border-[#3b7ca5]/[0.04] hover:border-[#3b7ca5]/12">
                <div className="w-14 h-14 rounded-[16px] flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110" style={{ backgroundColor: `${COBALT}10`, color: COBALT }}>
                  <div className="transition-all duration-400 group-hover:text-white" style={{ color: "inherit" }}>{usp.icon}</div>
                </div>
                <h4 className="font-['Jost',sans-serif] text-[18px] lg:text-[20px] m-0 mb-3" style={{ color: DARK_NAVY, fontWeight: 600 }}>{usp.title}</h4>
                <p className="font-['Jost',sans-serif] text-[14px] leading-[23px] m-0" style={{ color: `${DARK_NAVY}55` }}>{usp.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 7: INSPIRATION GALLERY (premium masonry)
   ═══════════════════════════════════════════════════════ */
const GALLERY_ITEMS = [
  { image: IMAGES.heroLiving, label: "Living Room", color: SAGE },
  { image: IMAGES.heroBedroom, label: "Bedroom", color: COBALT },
  { image: IMAGES.diningBlue, label: "Dining Room", color: DARK_NAVY },
  { image: IMAGES.heroKitchen, label: "Kitchen", color: SIENNA },
  { image: IMAGES.bathroom, label: "Bathroom", color: GOLD },
  { image: IMAGES.office, label: "Home Office", color: SAGE },
  { image: IMAGES.kidsRoom, label: "Kids Room", color: SIENNA },
  { image: IMAGES.texturedWall, label: "Feature Wall", color: COBALT },
];

function InspirationGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={`w-full bg-[#f5f2ec] py-20 lg:py-24 xl:py-[120px] ${SECTION_PX}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-[70px] gap-6">
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-[2px]" style={{ backgroundColor: SAGE }} />
            <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: SAGE, fontWeight: 500 }}>Get Inspired</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] xl:text-[56px] leading-[1.1] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
            Room <span style={{ color: SAGE }}>Inspiration</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <button className="flex items-center gap-3 font-['Jost',sans-serif] text-[13px] tracking-[3px] uppercase bg-transparent border-0 cursor-pointer transition-all hover:gap-5" style={{ color: SAGE, fontWeight: 600 }}>
            View Full Gallery <ArrowRight size={18} />
          </button>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {GALLERY_ITEMS.map((item, i) => {
          const heights = [300, 380, 300, 380, 380, 300, 380, 300];
          return (
            <ScrollReveal key={item.label} delay={i * 0.06}>
              <div
                className="relative w-full rounded-[20px] overflow-hidden cursor-pointer group"
                style={{
                  height: heights[i],
                  boxShadow: hovered === i ? "0 28px 64px rgba(0,0,0,0.14)" : "0 4px 24px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="absolute inset-0 transition-transform duration-[800ms] group-hover:scale-115" style={{ backgroundImage: `url('${item.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="absolute inset-0 transition-all duration-600" style={{ background: hovered === i ? `linear-gradient(180deg, transparent 30%, ${item.color}dd 100%)` : "linear-gradient(180deg, transparent 55%, rgba(26,20,40,0.45) 100%)" }} />
                <div className="absolute bottom-5 lg:bottom-7 left-5 lg:left-7 right-5 lg:right-7 flex items-end justify-between transition-all duration-500" style={{ transform: hovered === i ? "translateY(0)" : "translateY(6px)", opacity: hovered === i ? 1 : 0.75 }}>
                  <div>
                    <p className="font-['Jost',sans-serif] text-[18px] lg:text-[22px] text-white m-0" style={{ fontWeight: 600 }}>{item.label}</p>
                    <p className="font-['Jost',sans-serif] text-[11px] tracking-[2px] text-white/50 uppercase m-0 mt-1">Explore Ideas</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-400 group-hover:bg-white/25 group-hover:scale-110">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 9: OUR STORY (cinematic split)
   ═══════════════════════════════════════════════════════ */
function OurStorySection() {
  const { navigateToAbout } = useNavigation();
  return (
    <div className="w-full relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <ScrollReveal direction="left" className="shrink-0 w-full lg:w-1/2 h-[420px] lg:h-[620px] xl:h-[700px] relative">
          <div className="absolute inset-0" style={{ backgroundImage: `url('${IMAGES.splash}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK_NAVY}50 0%, transparent 70%)` }} />
          <div className="absolute top-8 lg:top-12 left-8 lg:left-12 bg-white/[0.07] backdrop-blur-2xl rounded-[20px] p-6 lg:p-8 border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
            <p className="font-['Jost',sans-serif] text-[40px] lg:text-[48px] text-white m-0" style={{ fontWeight: 700 }}>15+</p>
            <p className="font-['Jost',sans-serif] text-[12px] tracking-[3px] text-white/60 uppercase m-0">Years of Innovation</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24" style={{ backgroundColor: WARM_CREAM }}>
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
            <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Our Story</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] leading-[1.1] m-0 mb-7" style={{ color: DARK_NAVY, fontWeight: 600 }}>
            Color Your <span style={{ color: GOLD }}>World</span><br />Beautifully
          </h2>
          <p className="font-['Jost',sans-serif] text-[15px] lg:text-[16px] leading-[28px] m-0 mb-5 max-w-[520px]" style={{ color: `${DARK_NAVY}65` }}>
            Your home deserves more than just paint — it deserves personality. At TEXNAS, we bring you premium quality paints designed to transform your walls into stunning spaces.
          </p>
          <p className="font-['Jost',sans-serif] text-[15px] lg:text-[16px] leading-[28px] m-0 mb-10 max-w-[520px]" style={{ color: `${DARK_NAVY}65` }}>
            From vibrant interior colors to long-lasting exterior paints, we offer solutions that combine durability, style, and innovation.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <button onClick={navigateToAbout} className="flex items-center gap-3 h-[54px] px-8 rounded-full border-0 cursor-pointer transition-all duration-400 hover:scale-[1.03] group" style={{ backgroundColor: DARK_NAVY }}>
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[1px] text-white uppercase" style={{ fontWeight: 600 }}>About Us</span>
              <ArrowRight size={18} className="text-white transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-400 group-hover:scale-110" style={{ borderColor: GOLD }}>
                <Play size={16} className="ml-[2px] transition-colors" style={{ color: GOLD }} fill={GOLD} />
              </div>
              <span className="font-['Jost',sans-serif] text-[15px] transition-colors" style={{ color: `${DARK_NAVY}70` }}>Our Journey</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 10: TESTIMONIALS (premium card design)
   ═══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Homeowner, Mumbai", text: "Teknas Paints transformed our living room completely. The eco-friendly textured finish has a depth that conventional paints simply cannot match. Truly premium quality.", rating: 5 },
  { name: "Rajesh Menon", role: "Interior Designer", text: "As a designer, I only recommend Teknas for my high-end projects. The low VOC formula means my clients can move in sooner, and the colour accuracy is outstanding.", rating: 5 },
  { name: "Anita Desai", role: "Architect, Delhi", text: "The marble texture finish from Teknas is indistinguishable from real marble. Incredible craftsmanship and the eco-friendly certification gives peace of mind.", rating: 5 },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`w-full py-20 lg:py-24 xl:py-[120px] ${SECTION_PX} relative overflow-hidden`} style={{ backgroundColor: DARK_NAVY }}>
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }} />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${SIENNA}, transparent 70%)` }} />

      <ScrollReveal className="text-center mb-14 lg:mb-[70px]">
        <div className="flex items-center justify-center gap-3.5 mb-4">
          <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
          <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Testimonials</span>
          <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
        </div>
        <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] xl:text-[56px] leading-[1.1] text-white m-0" style={{ fontWeight: 600 }}>
          What Our <span style={{ color: GOLD }}>Clients</span> Say
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <div className="max-w-[860px] mx-auto text-center relative" style={{ minHeight: 300 }}>
          {/* Large decorative quote */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <Quote size={60} className="opacity-10" style={{ color: GOLD }} fill={GOLD} />
          </div>

          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="absolute inset-0 flex flex-col items-center pt-12 transition-all duration-[1000ms]" style={{ opacity: current === i ? 1 : 0, transform: current === i ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)", pointerEvents: current === i ? "auto" : "none", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}>
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={20} fill={GOLD} className="text-[#d4a24e]" />)}
              </div>
              <p className="font-['Jost',sans-serif] text-[20px] lg:text-[24px] xl:text-[26px] leading-[1.65] text-white/75 m-0 mb-10 max-w-[720px]" style={{ fontWeight: 300, fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-['Jost',sans-serif] text-[18px]" style={{ backgroundColor: `${GOLD}30`, fontWeight: 600 }}>
                  {t.name[0]}
                </div>
                <div className="text-left">
                  <p className="font-['Jost',sans-serif] text-[17px] text-white m-0" style={{ fontWeight: 600 }}>{t.name}</p>
                  <p className="font-['Jost',sans-serif] text-[13px] text-white/40 m-0">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="cursor-pointer border-0 bg-transparent p-0 transition-all duration-500" style={{ width: current === i ? 40 : 12, height: 12 }}>
              <div className="h-full rounded-full transition-all duration-600" style={{ backgroundColor: current === i ? GOLD : "rgba(255,255,255,0.15)", width: "100%", boxShadow: current === i ? `0 0 20px ${GOLD}40` : "none" }} />
            </button>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 11: NEWSLETTER (cinematic)
   ═══════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full relative h-[480px] lg:h-[540px] overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `url('${IMAGES.painter}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK_NAVY}f0 0%, ${DARK_NAVY}cc 50%, ${DARK_NAVY}88 100%)` }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div className={`relative z-[1] h-full flex flex-col justify-center ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
            <span className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Stay Updated</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[40px] lg:text-[50px] leading-[1.1] text-white m-0 mb-5" style={{ fontWeight: 600 }}>
            Subscribe for Latest <span style={{ color: GOLD }}>Trends</span>
          </h2>
          <p className="font-['Jost',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-white/50 m-0 mb-9 max-w-[480px]">
            Get colour inspiration, painting tips, and exclusive offers delivered straight to your inbox.
          </p>
          <div className="flex items-center gap-3.5 flex-wrap">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full sm:w-[400px] lg:w-[440px] h-[56px] rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] px-7 font-['Fira_Sans',sans-serif] text-[14px] text-white placeholder:text-white/25 outline-none transition-all duration-600 focus:border-[#d4a24e]/40 focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(212,162,78,0.08)]" />
            <button className="h-[56px] px-9 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[12px] tracking-[3px] text-white uppercase transition-all duration-600 ease-out hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(212,162,78,0.25)] flex items-center gap-3" style={{ backgroundColor: GOLD, fontWeight: 600, boxShadow: `0 8px 32px ${GOLD}30` }}>
              Subscribe <ArrowRight size={18} />
            </button>
          </div>
          <p className="font-['Jost',sans-serif] text-[12px] text-white/25 m-0 mt-5">No spam, unsubscribe anytime. We respect your privacy.</p>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* FooterSection removed — now using shared <PageFooter /> */

/* ═══════════════════════════════════════════════════════
   FLOATING ELEMENTS
   ═══════════════════════════════════════════════════════ */
function FloatingElements() {
  const [showTop, setShowTop] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed z-[100] right-6 lg:right-[30px] bottom-[100px] w-11 h-11 rounded-full border-0 cursor-pointer flex items-center justify-center shadow-[0_8px_32px_rgba(26,20,40,0.25)] transition-all duration-700 ease-out hover:scale-110 hover:shadow-[0_12px_40px_rgba(26,20,40,0.35)]"
        style={{ backgroundColor: DARK_NAVY, opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)", pointerEvents: showTop ? "auto" : "none" }}
      >
        <ArrowUp size={20} className="text-white" />
      </button>

      <div className="fixed z-[100] right-6 lg:right-[30px] bottom-6 lg:bottom-[30px]">
        <button
          onClick={() => setCallbackOpen(!callbackOpen)}
          className="w-14 h-14 rounded-full border-0 cursor-pointer flex items-center justify-center shadow-[0_8px_36px_rgba(199,91,58,0.4)] transition-all duration-400 hover:scale-110"
          style={{ backgroundColor: callbackOpen ? DARK_NAVY : SIENNA }}
        >
          <PhoneCall size={22} className="text-white" />
        </button>

        <div className="absolute bottom-[72px] right-0 w-[310px] lg:w-[330px] bg-white rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-700 ease-out" style={{ opacity: callbackOpen ? 1 : 0, transform: callbackOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)", pointerEvents: callbackOpen ? "auto" : "none" }}>
          <div className="px-6 py-5" style={{ backgroundColor: SIENNA }}>
            <p className="font-['Jost',sans-serif] text-[17px] text-white m-0" style={{ fontWeight: 600 }}>Request a Callback</p>
            <p className="font-['Jost',sans-serif] text-[13px] text-white/65 m-0 mt-1">We'll call you within 30 minutes</p>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <input placeholder="Your Name" className="w-full h-12 rounded-[12px] border px-4 font-['Jost',sans-serif] text-[14px] outline-none transition-all focus:border-[#c75b3a]/40" style={{ borderColor: `${DARK_NAVY}15`, color: DARK_NAVY }} />
            <input placeholder="Phone Number" className="w-full h-12 rounded-[12px] border px-4 font-['Jost',sans-serif] text-[14px] outline-none transition-all focus:border-[#c75b3a]/40" style={{ borderColor: `${DARK_NAVY}15`, color: DARK_NAVY }} />
            <button className="w-full h-12 rounded-[12px] border-0 cursor-pointer font-['Jost',sans-serif] text-[13px] tracking-[1px] text-white uppercase transition-all hover:brightness-110" style={{ backgroundColor: SIENNA, fontWeight: 600 }}>
              Call Me Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN HOMEPAGE
   ═══════════��═══════════════════════════════════════════ */
/* Premium section divider */
function SectionDivider({ from = "white", to = "white" }: { from?: string; to?: string }) {
  return (
    <div className="w-full h-[1px] relative" style={{ background: `linear-gradient(90deg, transparent 5%, ${DARK_NAVY}08 30%, ${DARK_NAVY}12 50%, ${DARK_NAVY}08 70%, transparent 95%)` }} />
  );
}

export function HomePage() {
  useSEO({
    title: "TEXNAS Paints | Premium Wall Paints & Home Painting Solutions in India",
    description: "Discover high-quality wall paints, interior & exterior paints at TEXNAS. Durable, stylish, and affordable painting solutions for your home. Best paint company in India.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Teknas Paints",
        url: "https://www.teknaspaints.com",
        logo: "https://www.teknaspaints.com/logo.png",
        description: "India's leading manufacturer of eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils. GREENGUARD Gold, EPA Safer Choice, ISO 14001, and Green Seal GS-11 certified. 85,000 KL annual production across 3 plants.",
        foundingDate: "2001",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 4200 },
        address: { "@type": "PostalAddress", streetAddress: "Industrial Area", addressLocality: "Hyderabad", addressRegion: "Telangana", postalCode: "500032", addressCountry: "IN" },
        contactPoint: { "@type": "ContactPoint", telephone: "+91-1800-123-4567", contactType: "customer service", availableLanguage: ["English", "Hindi"] },
        sameAs: ["https://www.facebook.com/teknaspaints", "https://www.instagram.com/teknaspaints", "https://twitter.com/teknaspaints", "https://www.youtube.com/teknaspaints", "https://www.linkedin.com/company/teknaspaints"],
        award: ["GREENGUARD Gold Certification", "EPA Safer Choice", "ISO 14001:2015", "ISO 9001:2015", "Green Seal GS-11"],
        knowsAbout: ["Eco-friendly paint", "Low-VOC coatings", "Textured paints", "Bio-solvent turpentine oil", "Interior emulsions", "Exterior emulsions", "Protective coatings", "GREENGUARD Gold paints", "Sustainable manufacturing", "Paint colour consultation"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Teknas Paints",
        url: "https://www.teknaspaints.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.teknaspaints.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Teknas Paints Product Categories",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Eco Turpentine Oils", url: "https://www.teknaspaints.com/products#eco-turpentine-oils" },
          { "@type": "ListItem", position: 2, name: "Interior & Exterior Emulsions", url: "https://www.teknaspaints.com/products#emulsions" },
          { "@type": "ListItem", position: 3, name: "Eco Textured Paints", url: "https://www.teknaspaints.com/products#textured-paints" },
          { "@type": "ListItem", position: 4, name: "Low-VOC Primers", url: "https://www.teknaspaints.com/products#primers" },
          { "@type": "ListItem", position: 5, name: "Protective Coatings", url: "https://www.teknaspaints.com/products#protective-coatings" },
        ],
      },
    ],
  });

  return (
    <div className="w-full bg-white relative" style={{ WebkitFontSmoothing: "antialiased" }}>
      <HeroSection />
      <BrandMarquee />
      <ColourExplorer />
      <ProductShowcaseScroll />
      <SectionDivider />
      <ProductCategories />
      <ColourGuideSection />
      <WhyTeknasSection />
      <InspirationGallery />
      <OurStorySection />
      <TestimonialsSection />
      <NewsletterSection />
      <FloatingElements />
    </div>
  );
}
