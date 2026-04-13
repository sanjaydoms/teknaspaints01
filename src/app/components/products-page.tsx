import { useState } from "react";
import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal, PaintRippleButton } from "./micro-interactions";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useSEO } from "./use-seo";

// Eco Turpentine Oils bottle images
import imgEcoTurp from "figma:asset/a9b63f38069b36eccad5916b636d19f9c2a28eaa.png";
import imgEcoTurpPlus from "figma:asset/f717437fa8b95d80708eb097bce5a470bd1af8a2.png";
import imgEcoTurpPro from "figma:asset/44b0c09009055e53689a503cc07e33da6273ff54.png";
// Eco Primax & Health Shield product images
import imgEcoPrimax from "figma:asset/add0029d15268452b41616dd20a05403c54ed945.png";
// Eco Primax+ bucket images (Interior & Exterior Emulsions)
import imgEcoPrimaxPlusBucket from "figma:asset/a9451194462fff0c801e1591013687f39264e8a1.png";
import imgEcoPrimaxPlusBucketBack from "figma:asset/1605b49381c8747c2d66e22594db4a7efc4a8330.png";
// Eco Primax can variants (Protective Coats & Health Shield)
import imgEcoPrimaxPro from "figma:asset/c1de157b6e7e7955a05d67a114661cb2e4cf10a3.png";
import imgEcoPrimaxBase from "figma:asset/e83e811049e145916b50f7424262fbade4e8e3c6.png";
import imgEcoPrimaxPlus from "figma:asset/fd029c39d913a121b0eab009750d36c269d7efc7.png";
// Eco Textured Paints product images
import imgTexnasWallFront from "figma:asset/386cc737611c0e6d579cf697f6cd23bca75f9803.png";
import imgTexnasWallBack from "figma:asset/916374a76635a3d055f4911947ba906569918e7e.png";
import imgTexnasMarbleFront from "figma:asset/c2b21f1944f85b44af247f1116756bfbae8bbafb.png";
import imgTexnasMarbleBack from "figma:asset/654c618466d548967e892c2cc15e9da10974557d.png";
// Low-VOC Primers product images
import imgEcoPrimaxProBucket from "figma:asset/74a8bc66dcf93c20b02812dbe3aa28edceabc3dc.png";
import imgEcoPrimaxProBucketBack from "figma:asset/c99e0519d8d5b70fc504fb6f9fa3063304d0659d.png";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const CANVAS = "#f5f2ec";
const COBALT = "#3b7ca5";
const SAGE = "#75866c";
const FOREST = "#687967";
const DEEP_FOREST = "#04150b";
const PAPER_WHITE = "#fffdf6";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

const HERO_BG = "https://images.unsplash.com/photo-1613061068451-e2cc9a980325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

const HOUSE_IMG = "https://images.unsplash.com/photo-1641014737626-99a16cd6c007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwd2hpdGUlMjB3YWxscyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzI1NDAzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ── Popular Shades Data ── */
interface PopularShade {
  name: string;
  code: string;
  hex: string;
  accent: string;
}

const POPULAR_SHADES: PopularShade[] = [
  { name: "Marigold",         code: "4510", hex: "#e2b87a", accent: "#e8943a" },
  { name: "Memories",         code: "8580", hex: "#c5c2b0", accent: "#8a8672" },
  { name: "Glacier Ridge",    code: "8428", hex: "#c8dce8", accent: "#6ba3c7" },
  { name: "Rose Bud",         code: "8035", hex: "#f0cfc8", accent: "#d47c6a" },
  { name: "Spring Time",      code: "9211", hex: "#d6e4a8", accent: "#7da03a" },
  { name: "Touch of Spring",  code: "3226", hex: "#f2ecc8", accent: "#c4b44a" },
  { name: "Ocean Calm",       code: "7150", hex: "#a8c8d8", accent: "#4a8dab" },
  { name: "Lavender Haze",    code: "3110", hex: "#d4c0e0", accent: "#8a5ea0" },
];

/* ── Popular Shades Section Component ── */
function PopularShadesSection() {
  const { navigateToSearch } = useNavigation();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const selected = POPULAR_SHADES[selectedIdx];

  const handleSelect = (idx: number) => {
    if (idx === selectedIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 280);
  };

  return (
    <section className="py-16 lg:py-24 xl:py-[110px]" style={{ backgroundColor: PAPER_WHITE }}>
      <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* ── Left: House Visualisation ── */}
          <ScrollReveal className="flex-1 w-full lg:w-auto">
            <div className="relative w-full overflow-hidden rounded-[20px] lg:rounded-[24px]" style={{ aspectRatio: "4 / 3" }}>
              <ImageWithFallback
                src={HOUSE_IMG}
                alt="Modern house exterior"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(0.6) brightness(1.05)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: selected.hex,
                  mixBlendMode: "multiply",
                  opacity: isTransitioning ? 0 : 0.45,
                  transition: "opacity 0.35s ease, background-color 0.5s ease",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: selected.hex,
                  mixBlendMode: "soft-light",
                  opacity: isTransitioning ? 0 : 0.35,
                  transition: "opacity 0.35s ease, background-color 0.5s ease",
                }}
              />
              <div
                className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2.5 h-[36px] px-4 rounded-full backdrop-blur-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  transform: isTransitioning ? "scale(0.95)" : "scale(1)",
                }}
              >
                <div
                  className="w-[18px] h-[18px] rounded-full shrink-0"
                  style={{
                    backgroundColor: selected.hex,
                    border: "2px solid white",
                    boxShadow: `0 0 0 1px ${selected.hex}40`,
                  }}
                />
                <span
                  className="font-['Fira_Sans',sans-serif] text-[12.5px] tracking-[0.5px]"
                  style={{ color: AUBERGINE, fontWeight: 600 }}
                >
                  {selected.name}
                </span>
                <span
                  className="font-['Fira_Sans',sans-serif] text-[11px]"
                  style={{ color: `${AUBERGINE}55`, fontWeight: 400 }}
                >
                  #{selected.code}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: Text + CTA ── */}
          <ScrollReveal delay={0.15} className="lg:w-[400px] xl:w-[420px] shrink-0">
            <div>
              <h2
                className="font-['Fira_Sans',sans-serif] text-[clamp(32px,4vw,52px)] m-0 mb-4"
                style={{ color: AUBERGINE, fontWeight: 700, lineHeight: 1.1 }}
              >
                Popular<br />
                <span
                  style={{
                    color: selected.accent,
                    transition: "color 0.4s ease",
                    fontStyle: "italic",
                  }}
                >
                  Shades
                </span>
              </h2>
              <p
                className="font-['Fira_Sans',sans-serif] text-[clamp(14px,1.1vw,16px)] leading-[28px] m-0 mb-8 max-w-[380px]"
                style={{ color: `${AUBERGINE}77`, fontWeight: 300 }}
              >
                From elegant neutrals to rich, vibrant hues, our popular shades collection offers the perfect palette to transform your space
              </p>
              <PaintRippleButton
                color={selected.accent}
                className="group inline-flex items-center gap-2.5 h-[48px] px-7 rounded-full cursor-pointer font-['Fira_Sans',sans-serif] text-[13.5px] tracking-[0.5px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: `1.5px solid ${AUBERGINE}`,
                  backgroundColor: "transparent",
                  color: AUBERGINE,
                  fontWeight: 500,
                }}
                onClick={() => navigateToSearch()}
              >
                View Catalogue
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </PaintRippleButton>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Swatch Strip ── */}
        <ScrollReveal delay={0.25}>
          <div className="mt-10 lg:mt-14">
            <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-2 -mx-2 px-2">
              {POPULAR_SHADES.map((shade, i) => {
                const isActive = i === selectedIdx;
                return (
                  <button
                    key={shade.code}
                    onClick={() => handleSelect(i)}
                    className="flex flex-col items-center gap-2 cursor-pointer border-0 bg-transparent p-0 shrink-0 group transition-transform duration-200 hover:-translate-y-1"
                    style={{ minWidth: 72 }}
                  >
                    <div
                      className="relative w-[64px] sm:w-[72px] h-[64px] sm:h-[72px] rounded-[10px] transition-all duration-300 flex items-center justify-center"
                      style={{
                        backgroundColor: shade.hex,
                        boxShadow: isActive
                          ? `0 4px 20px ${shade.hex}60, 0 0 0 2.5px ${AUBERGINE}`
                          : `0 2px 8px ${shade.hex}30`,
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-[10px] flex items-center justify-center transition-opacity duration-200"
                        style={{
                          backgroundColor: `${AUBERGINE}20`,
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div
                          className="w-[24px] h-[24px] rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "white", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
                        >
                          <Check size={13} style={{ color: AUBERGINE }} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p
                        className="font-['Fira_Sans',sans-serif] text-[11.5px] sm:text-[12px] m-0 leading-[16px] transition-colors duration-200 whitespace-nowrap"
                        style={{
                          color: isActive ? AUBERGINE : `${AUBERGINE}88`,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {shade.name}
                      </p>
                      <p
                        className="font-['Fira_Sans',sans-serif] text-[10px] sm:text-[10.5px] m-0 leading-[14px]"
                        style={{ color: `${AUBERGINE}44`, fontWeight: 400 }}
                      >
                        #{shade.code}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const ALL_PRODUCTS = [
  {
    category: "Eco Turpentine Oils",
    accent: SIENNA,
    description: "Low-odour, eco-friendly turpentine oils engineered for safe paint thinning, brush cleaning, and reduced emissions. Plant-derived formulas deliver reliable performance for residential and professional use.",
    items: [
      { name: "Eco Turp", tagline: "Eco-Friendly Turpentine Oil for Safe Paint Thinning", image: imgEcoTurp, price: "₹1,999", oldPrice: "₹3,499", rating: 4.8, reviews: 342 },
      { name: "Eco Turp+", tagline: "Advanced Low VOC Turpentine Oil for Professional Results", image: imgEcoTurpPlus, price: "₹2,499", oldPrice: "₹3,999", rating: 4.9, reviews: 518 },
      { name: "Eco Turp Pro", tagline: "Professional-Grade Eco Turpentine Oil", image: imgEcoTurpPro, price: "₹2,999", oldPrice: "₹4,999", rating: 4.9, reviews: 724 },
    ],
  },
  {
    category: "Interior & Exterior Emulsions",
    accent: SAGE,
    description: "High-performance interior and exterior emulsion paints built for Indian walls. Eco Primax delivers exceptional coverage, rich colour depth, and long-lasting durability with low-VOC formulations.",
    items: [
      { name: "Eco Primax", tagline: "High-Performance Interior Emulsion — Exterior & Interior", image: imgEcoPrimax, price: "₹3,499", oldPrice: "₹5,499", rating: 4.9, reviews: 1247 },
      { name: "Eco Primax+", tagline: "Premium Silk Finish Emulsion for Flawless Walls", image: imgEcoPrimaxPlusBucket, price: "₹4,299", oldPrice: "₹6,799", rating: 4.9, reviews: 863 },
      { name: "Eco Primax+ — Back", tagline: "Product Description & Manufacturing Details", image: imgEcoPrimaxPlusBucketBack, price: "₹4,299", oldPrice: "₹6,799", rating: 4.9, reviews: 863 },
      { name: "Eco Primax Pro", tagline: "Professional-Grade Emulsion for Maximum Durability", image: imgEcoPrimaxProBucket, price: "₹5,499", oldPrice: "₹8,499", rating: 4.9, reviews: 1589 },
    ],
  },
  {
    category: "Protective Coats & Health Shield",
    accent: COBALT,
    description: "Advanced protective clear coats powered by Silver Ion Technology. Royale Health Shield kills 99% of infection-causing bacteria within 2 hours, neutralises formaldehyde, and is certified Asthma & Allergy Friendly.",
    items: [
      { name: "Royale Health Shield Clear", tagline: "Water-Based Antibacterial Protective Clear Coat", image: imgEcoPrimaxBase, price: "₹2,999", oldPrice: "₹4,799", rating: 4.8, reviews: 672 },
      { name: "Royale Health Shield Soft Sheen", tagline: "Luxurious Soft Sheen Finish with Silver Ion Protection", image: imgEcoPrimaxPlus, price: "₹3,499", oldPrice: "₹5,499", rating: 4.9, reviews: 894 },
      { name: "Royale Health Shield Gloss", tagline: "High-Gloss Antibacterial Finish for Stain Resistance", image: imgEcoPrimaxPro, price: "₹3,799", oldPrice: "₹5,999", rating: 4.8, reviews: 531 },
    ],
  },
  {
    category: "Eco Textured Paints",
    accent: GOLD,
    description: "Eco-friendly textured paint solutions that combine design depth with environmental responsibility. Crafted with ultra-low VOC technology for stunning surface finishes.",
    items: [
      { name: "Eco Texnas Wall Texture", tagline: "High-Strength Polymer Based Putty — 25 kg", image: imgTexnasWallFront, price: "₹2,299", oldPrice: "₹3,799", rating: 4.7, reviews: 285 },
      { name: "Eco Texnas Wall Texture — Back", tagline: "Product Info & Application Instructions", image: imgTexnasWallBack, price: "₹2,299", oldPrice: "₹3,799", rating: 4.7, reviews: 285 },
      { name: "Eco Texnas Marble Wall Texture", tagline: "Premium Marble Finish Polymer Based Putty — 25 kg", image: imgTexnasMarbleFront, price: "₹2,799", oldPrice: "₹4,499", rating: 4.8, reviews: 412 },
      { name: "Eco Texnas Marble — Back", tagline: "Product Info & Application Instructions", image: imgTexnasMarbleBack, price: "₹2,799", oldPrice: "₹4,499", rating: 4.8, reviews: 412 },
    ],
  },
  {
    category: "Low-VOC Primers",
    accent: COBALT,
    description: "Water-based eco-friendly primers designed to improve paint adhesion, enhance coverage, and extend wall durability. Low VOC content provides a healthier alternative.",
    items: [
      { name: "Eco Primax Pro", tagline: "High-Performance Interior Emulsion — Exterior & Interior, 20L", image: imgEcoPrimaxProBucket, price: "₹1,599", oldPrice: "₹2,799", rating: 4.6, reviews: 198 },
      { name: "Eco Primax Pro — Back", tagline: "Product Description & Manufacturing Details", image: imgEcoPrimaxProBucketBack, price: "₹1,599", oldPrice: "₹2,799", rating: 4.6, reviews: 198 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   FAQ DATA (SEO-optimised)
   ═══════════════════════════════════════════════════════ */
const PRODUCT_FAQS = [
  {
    question: "What makes Teknas Paints eco-friendly compared to regular paints?",
    answer: "Teknas Paints are formulated with ultra-low VOC (Volatile Organic Compounds) levels — typically under 5 g/L, well below the industry standard of 50 g/L. Our paints use plant-derived binders and mineral pigments instead of petroleum-based chemicals, resulting in significantly lower emissions during and after application. This means healthier indoor air quality, reduced environmental impact, and no strong chemical odour — making them safe for homes with children, pets, and allergy-sensitive occupants.",
  },
  {
    question: "Which Teknas paint is best for interior walls — Eco Turp, Eco Texnas, or Eco Primax?",
    answer: "Each product line serves a different purpose. Eco Turp is our turpentine oil range used for paint thinning and brush cleaning — not a wall paint itself. For interior wall finishes, choose Eco Texnas for stunning textured and marble-effect finishes, or Eco Primax as a primer base coat to improve adhesion and durability before applying your top coat. For the best results, we recommend applying Eco Primax primer first, followed by your chosen Eco Texnas textured finish.",
  },
  {
    question: "How much wall area does one litre of Teknas paint cover?",
    answer: "Coverage varies by product line and surface texture. Our interior emulsions typically cover 300–400 sq. ft per litre on smooth, primed walls with a single coat. Textured paints like Eco Texnas Marble cover approximately 180–220 sq. ft per litre due to the thicker application required for texture effects. Primers (Eco Primax range) cover 350–450 sq. ft per litre. For accurate estimates, we recommend using our online paint calculator or consulting with a Teknas dealer near you.",
  },
  {
    question: "Are Teknas eco-friendly paints as durable as conventional paints?",
    answer: "Absolutely. Our eco-friendly formulations are engineered to match or exceed the performance of conventional paints. The Eco Primax Pro primer offers a 15-year warranty against peeling and flaking. Our textured finishes resist moisture, fungal growth, and UV degradation. Independent lab tests confirm that Teknas paints maintain colour vibrancy and adhesion strength for over a decade under normal conditions. Going green does not mean compromising on quality.",
  },
  {
    question: "What is the drying time for Teknas paints and primers?",
    answer: "Drying times depend on the product and environmental conditions. Most Teknas interior emulsions are touch-dry within 1–2 hours and ready for a second coat in 3–4 hours at 25 °C and 50 % relative humidity. Eco Primax primers dry in 2–3 hours. Textured finishes like Eco Texnas Marble may take 4–6 hours for the full texture to set. For best results, ensure good ventilation and avoid painting in high humidity or temperatures below 10 °C.",
  },
  {
    question: "Can I use Teknas paints for both interior and exterior surfaces?",
    answer: "Yes — our Exterior & Interior Emulsions range is specifically engineered as India's first dual-surface paint, delivering outstanding performance on both indoor and outdoor walls. For specialised applications, our dedicated Interior Emulsions offer premium finishes optimised for indoor use, while our Exterior Emulsions provide enhanced weather resistance, UV protection, and anti-algal properties for outdoor surfaces. Our Waterproofing Solutions (StormShield Series) can also be applied to both interior and exterior walls for moisture protection.",
  },
  {
    question: "Where can I buy Teknas Paints and find a dealer near me?",
    answer: "Teknas Paints are available through our authorised dealer network across India. Use our Locate Dealers tool on this website to find the nearest stockist by entering your city or pin code. You can also order select products directly through our website with home delivery. For bulk orders, commercial projects, or custom colour mixing, contact our sales team at +91 1800-123-4567 or email info@teknaspaints.com for personalised assistance and trade pricing.",
  },
  {
    question: "Does Teknas offer a colour matching or custom colour mixing service?",
    answer: "Yes, Teknas offers an extensive colour palette with over 200 curated shades available off the shelf. For custom colours, visit any authorised Teknas dealer equipped with our computerised colour matching system — simply bring a sample (fabric swatch, tile, or photograph) and we can match it precisely. Our online Colour Explorer and Colour Guide tools also let you visualise how different shades will look in your room before committing. Custom tinting is available at no extra charge for orders over 4 litres.",
  },
];

/* ── FAQ Accordion Item ── */
function FaqItem({ question, answer, isOpen, onToggle, index }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className="border-b transition-colors duration-300"
        style={{ borderColor: isOpen ? `${SIENNA}20` : `${AUBERGINE}0a` }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-6 py-6 lg:py-7 text-left cursor-pointer border-0 bg-transparent group"
        >
          <h3
            className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[17px] leading-[1.55] m-0 pr-2 transition-colors duration-300"
            style={{ color: isOpen ? SIENNA : AUBERGINE, fontWeight: 600 }}
          >
            {question}
          </h3>
          <div
            className="w-[36px] h-[36px] rounded-full shrink-0 flex items-center justify-center transition-all duration-500 ease-out mt-0.5"
            style={{
              backgroundColor: isOpen ? `${SIENNA}12` : `${AUBERGINE}06`,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown
              size={18}
              className="transition-colors duration-300"
              style={{ color: isOpen ? SIENNA : `${AUBERGINE}60` }}
            />
          </div>
        </button>
        <div
          className="overflow-hidden transition-all duration-600 ease-out"
          style={{
            maxHeight: isOpen ? 500 : 0,
            opacity: isOpen ? 1 : 0,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p
            className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[1.85] m-0 pb-7 lg:pb-8 max-w-[820px]"
            style={{ color: `${AUBERGINE}70`, fontWeight: 300 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── FAQ Section with JSON-LD Structured Data ── */
function ProductFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  /* JSON-LD FAQPage schema for Google rich snippets */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRODUCT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 xl:py-[110px]" style={{ backgroundColor: PAPER_WHITE }}>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-28">
          {/* Left: Heading (sticky on desktop) */}
          <ScrollReveal className="lg:w-[340px] xl:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-[140px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px]" style={{ backgroundColor: SIENNA }} />
                <span
                  className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[4px] uppercase"
                  style={{ color: SIENNA, fontWeight: 500 }}
                >
                  FAQs
                </span>
              </div>
              <h2
                className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,44px)] m-0 mb-4"
                style={{ color: AUBERGINE, fontWeight: 700, lineHeight: 1.12 }}
              >
                Frequently Asked{" "}
                <span style={{ color: SIENNA, fontStyle: "italic", fontWeight: 300 }}>
                  Questions
                </span>
              </h2>
              <p
                className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px] m-0 mb-8 max-w-[340px]"
                style={{ color: `${AUBERGINE}60`, fontWeight: 300 }}
              >
                Everything you need to know about our eco-friendly paint products, application, coverage, and availability.
              </p>
              <div
                className="hidden lg:block w-full h-[3px] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${SIENNA}30, ${GOLD}20, transparent)`,
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right: Accordion list */}
          <div className="flex-1 min-w-0">
            <div
              className="border-t"
              style={{ borderColor: `${AUBERGINE}0a` }}
            >
              {PRODUCT_FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIdx === i}
                  onToggle={() => toggle(i)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PRODUCTS PAGE
   ═══════════════════════════════════════════════════════ */
export function ProductsPage() {
  const { navigateToProduct, navigateHome } = useNavigation();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useSEO({
    title: "Eco-Friendly Paint Products | Textured Paints, Low-VOC Primers, Turpentine Oils — Teknas Paints",
    description: "Browse 120+ eco-friendly paint formulations from Teknas Paints: Eco Turpentine Oils (bio-solvent thinners), Interior & Exterior Emulsions, Protective Health Shield Coats, Designer Textured Paints, and Low-VOC Primers. GREENGUARD Gold certified. Free shipping above Rs 5,000. Bulk contractor pricing available.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Teknas Paints — Eco-Friendly Paint Products",
        description: "Complete range of 120+ eco-friendly textured paints, low-VOC primers, bio-solvent turpentine oils, interior emulsions, exterior emulsions, and protective coatings. All products GREENGUARD Gold and EPA Safer Choice certified.",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: 16,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Eco Turpentine Oils — Bio-Solvent Paint Thinners", url: "https://www.teknaspaints.com/products#turpentine-oils" },
            { "@type": "ListItem", position: 2, name: "Interior & Exterior Emulsions — Premium Wall Paints", url: "https://www.teknaspaints.com/products#emulsions" },
            { "@type": "ListItem", position: 3, name: "Protective Coats & Health Shield — Anti-Microbial Paints", url: "https://www.teknaspaints.com/products#health-shield" },
            { "@type": "ListItem", position: 4, name: "Eco Textured Paints — Designer Wall Finishes", url: "https://www.teknaspaints.com/products#textured-paints" },
            { "@type": "ListItem", position: 5, name: "Low-VOC Primers — Eco-Friendly Surface Preparation", url: "https://www.teknaspaints.com/products#primers" },
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://www.teknaspaints.com/products" },
        ],
      },
    ],
  });

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 45vw, 500px)" }}>
        <ImageWithFallback src={HERO_BG} alt="Products hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${AUBERGINE}ee 0%, ${AUBERGINE}88 50%, ${AUBERGINE}33 100%)` }} />
        <div className={`relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Eco-Friendly Paint Solutions</span>
            </div>
            <h1 className="font-['Fira_Sans',sans-serif] text-white text-[clamp(32px,4.5vw,56px)] max-w-[600px] mb-4" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Our <span style={{ color: GOLD }}>Sustainable</span> Products
            </h1>
            <p className="font-['Fira_Sans',sans-serif] text-white/70 text-[clamp(14px,1.1vw,17px)] max-w-[520px]" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              Explore our complete range of eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils — engineered for professional performance and a healthier planet.
            </p>
            <div className="mt-6">
              <p className="font-['Fira_Sans',sans-serif] text-[14px] text-white/50" style={{ fontWeight: 300 }}>
                <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={navigateHome}>Home</span>
                <span className="mx-2">—</span>
                <span className="text-white/90">Products</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ POPULAR SHADES ═══ */}
      <PopularShadesSection />

      {/* ═══ PRODUCT SECTIONS ═══ */}
      {ALL_PRODUCTS.map((section, sIdx) => (
        <section
          key={section.category}
          className="py-16 lg:py-20 xl:py-[100px]"
          style={{ backgroundColor: sIdx % 2 === 0 ? "white" : CANVAS }}
        >
          <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3.5 mb-4">
                <div className="w-9 h-[2px]" style={{ backgroundColor: section.accent }} />
                <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: section.accent, fontWeight: 500 }}>
                  Category {String(sIdx + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-[2px]" style={{ backgroundColor: section.accent }} />
              </div>
              <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-3" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
                {section.category}
              </h2>
              <p className="font-['Fira_Sans',sans-serif] text-[clamp(13px,1vw,16px)] text-center max-w-[600px] mx-auto mb-12 lg:mb-[60px] leading-[26px]" style={{ color: "#464646", fontWeight: 300 }}>
                {section.description}
              </p>
            </ScrollReveal>

            {section.category === "Eco Turpentine Oils" ? (
              /* ─── Bottle Showcase for Eco Turpentine Oils ─── */
              <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 items-end justify-center">
                {section.items.map((product, pIdx) => {
                  const key = `${sIdx}-${pIdx}`;
                  const isHov = hoveredKey === key;
                  // Middle bottle (Eco Turp+) is taller
                  const isCenter = pIdx === 1;
                  return (
                    <ScrollReveal key={key} delay={pIdx * 0.15}>
                      <div
                        className="flex flex-col items-center cursor-pointer group"
                        onMouseEnter={() => setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        onClick={() => navigateToProduct({ name: product.name, image: product.image, category: section.category })}
                      >
                        {/* Bottle image — floating, no background */}
                        <div className="relative flex items-end justify-center mb-4">
                          {/* Ground shadow */}
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[10px] rounded-[50%] transition-all duration-500"
                            style={{
                              background: `radial-gradient(ellipse, ${AUBERGINE}14, transparent 70%)`,
                              transform: `translateX(-50%) ${isHov ? "scaleX(1.2) scaleY(1.4)" : "scaleX(1) scaleY(1)"}`,
                            }}
                          />
                          <div
                            className="relative transition-all duration-500 ease-out"
                            style={{
                              transform: isHov ? "translateY(-14px) scale(1.04)" : "translateY(0) scale(1)",
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-contain drop-shadow-xl pointer-events-none"
                              style={{
                                height: isCenter ? "clamp(320px, 30vw, 440px)" : "clamp(280px, 26vw, 380px)",
                                width: "auto",
                              }}
                            />
                          </div>
                        </div>

                        {/* Product name + tagline */}
                        <h3
                          className="font-['Fira_Sans',sans-serif] text-[clamp(18px,1.5vw,24px)] text-center mb-1 transition-colors duration-300"
                          style={{ color: isHov ? SIENNA : AUBERGINE, fontWeight: 600, lineHeight: 1.25 }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="font-['Fira_Sans',sans-serif] text-[12px] text-center max-w-[200px] mb-2.5"
                          style={{ color: `${AUBERGINE}55`, fontWeight: 300, lineHeight: 1.5 }}
                        >
                          {product.tagline}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="font-['Inter',sans-serif] text-[17px] lg:text-[19px]" style={{ color: AUBERGINE, fontWeight: 700 }}>
                            {product.price}
                          </span>
                          <span className="font-['Inter',sans-serif] text-[13px] line-through" style={{ color: `${AUBERGINE}35`, fontWeight: 400 }}>
                            {product.oldPrice}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            ) : (
              <div className={`grid gap-x-6 gap-y-10 lg:gap-x-10 lg:gap-y-14 ${section.items.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-[900px] mx-auto" : section.items.length === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-[960px] mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                {section.items.map((product, pIdx) => {
                  const key = `${sIdx}-${pIdx}`;
                  const isHov = hoveredKey === key;
                  const discount = Math.round((1 - parseInt(product.price.replace(/[^\d]/g, "")) / parseInt(product.oldPrice.replace(/[^\d]/g, ""))) * 100);
                  return (
                    <ScrollReveal key={key} delay={pIdx * 0.1}>
                      <div
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        onClick={() => navigateToProduct({ name: product.name, image: product.image, category: section.category })}
                      >
                        {/* Product Image — clean, no background */}
                        <div className="relative flex items-center justify-center mb-5 lg:mb-6">
                          {/* Subtle shadow disc behind product */}
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[12px] rounded-[50%] transition-all duration-500"
                            style={{
                              background: `radial-gradient(ellipse, ${AUBERGINE}12, transparent 70%)`,
                              transform: `translateX(-50%) ${isHov ? "scaleX(1.15) scaleY(1.3)" : "scaleX(1) scaleY(1)"}`,
                            }}
                          />
                          <div
                            className="relative w-full transition-transform duration-500 ease-out"
                            style={{
                              transform: isHov ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                            }}
                          >
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-auto object-contain max-h-[320px] lg:max-h-[360px] drop-shadow-lg"
                            />
                          </div>

                          {/* Save badge — floating top-left */}
                          <div
                            className="absolute top-2 left-2 h-[26px] px-3 rounded-full flex items-center font-['Fira_Sans',sans-serif] text-[11px] text-white tracking-[0.5px] transition-transform duration-300"
                            style={{
                              backgroundColor: SIENNA,
                              fontWeight: 600,
                              transform: isHov ? "scale(1.05)" : "scale(1)",
                            }}
                          >
                            Save {discount}%
                          </div>

                          {/* Quick-view pill on hover */}
                          <div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[38px] px-5 rounded-full flex items-center gap-2 backdrop-blur-xl transition-all duration-400 ease-out"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.92)",
                              boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                              opacity: isHov ? 1 : 0,
                              transform: `translateX(-50%) ${isHov ? "translateY(0)" : "translateY(8px)"}`,
                              pointerEvents: isHov ? "auto" : "none",
                            }}
                          >
                            <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[1.5px] uppercase" style={{ color: AUBERGINE, fontWeight: 600 }}>
                              Quick View
                            </span>
                            <ArrowRight size={13} style={{ color: SIENNA }} />
                          </div>
                        </div>

                        {/* Product Info — centered, clean typography */}
                        <div className="text-center px-2">
                          <p
                            className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[3px] uppercase mb-2 transition-colors duration-300"
                            style={{ color: isHov ? section.accent : `${section.accent}88`, fontWeight: 500 }}
                          >
                            {section.category}
                          </p>
                          <h3
                            className="font-['Fira_Sans',sans-serif] text-[clamp(17px,1.3vw,22px)] mb-1.5 transition-colors duration-300"
                            style={{ color: isHov ? SIENNA : AUBERGINE, fontWeight: 600, lineHeight: 1.25 }}
                          >
                            {product.name}
                          </h3>
                          <p
                            className="font-['Fira_Sans',sans-serif] text-[13px] leading-[20px] mb-3 mx-auto max-w-[280px]"
                            style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}
                          >
                            {product.tagline}
                          </p>

                          {/* Price row */}
                          <div className="flex items-center justify-center gap-2.5">
                            <span className="font-['Inter',sans-serif] text-[18px] lg:text-[20px]" style={{ color: AUBERGINE, fontWeight: 700 }}>
                              {product.price}
                            </span>
                            <span className="font-['Inter',sans-serif] text-[14px] line-through" style={{ color: `${AUBERGINE}35`, fontWeight: 400 }}>
                              {product.oldPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ═══ FAQ SECTION ═══ */}
      <ProductFaqSection />

      {/* ═══ WHY ECO-FRIENDLY PAINT — Educational SEO Section ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SAGE }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SAGE, fontWeight: 500 }}>Paint Education</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: SAGE }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Why Choose <span style={{ color: SAGE }}>Eco-Friendly Paint</span>?
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[700px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
              Understanding the science behind low-VOC and eco-friendly paints helps you make informed decisions for your home, health, and the environment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal direction="left">
              <article className="space-y-6">
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>What Are VOCs and Why Do They Matter?</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    Volatile Organic Compounds (VOCs) are chemicals that evaporate at room temperature, releasing gases that contribute to indoor air pollution, respiratory issues, and environmental degradation. Conventional paints can contain 30–150 g/L of VOCs. Teknas Paints' eco-friendly formulations contain as little as 0.02 g/L — a 99.8% reduction that meets and exceeds GREENGUARD Gold, EPA Safer Choice, and WHO indoor air quality guidelines.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>Health Benefits of Low-VOC Paints</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    Low-VOC paints significantly improve indoor air quality, reducing the risk of headaches, dizziness, eye irritation, and long-term respiratory conditions. This is especially critical for nurseries, children's bedrooms, hospital wards, and elderly care facilities. Teknas' GREENGUARD Gold certified products have been independently tested to meet the strictest standards for chemical emissions in schools and healthcare environments.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>Bio-Based Binders vs. Petroleum-Based Binders</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    Traditional paint binders are derived from petroleum, contributing to fossil fuel dependency and carbon emissions. Teknas uses proprietary plant-derived binders — sourced from renewable castor oil and soy derivatives — that deliver identical adhesion strength, flexibility, and durability while reducing the carbon footprint of each litre by up to 45%.
                  </p>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <article className="space-y-6">
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>Eco-Friendly Paint and LEED Certification</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    Choosing Teknas' low-VOC paints directly contributes to earning LEED (Leadership in Energy and Environmental Design) green building credits. Specifically, our products qualify under LEED IEQ Credit 4.2 — Low-Emitting Materials: Paints and Coatings. Over 1,200 LEED-certified projects across India have used Teknas products to achieve Platinum and Gold ratings.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>Performance Without Compromise</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    A common misconception is that eco-friendly paints sacrifice durability or colour vibrancy. Teknas' proprietary EcoPigment technology uses responsibly sourced mineral pigments and nano-ceramic additives that deliver 10,000+ scrub cycle washability, superior UV fade resistance (Delta E &lt; 1.5 after 500 hours), and a colour palette of 1,800+ shades — matching or exceeding conventional paint performance benchmarks.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>How to Choose the Right Eco Paint</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px]" style={{ color: "#565656", fontWeight: 300 }}>
                    For interior walls, choose our Eco Primax Plus emulsions (0.05 g/L VOC) or the Pro variant (0.02 g/L VOC) for sensitive spaces. For exteriors, select our weather-resistant Eco Primax Plus Exterior with UV protection and 10-year warranty. For feature walls and premium finishes, our Eco Textured Paints offer marble, stone, and metallic effects in low-VOC formulations.
                  </p>
                </div>
              </article>
            </ScrollReveal>
          </div>

          {/* Trust indicators */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-12 lg:mt-16">
              {[
                { label: "GREENGUARD Gold Certified", color: SAGE },
                { label: "EPA Safer Choice", color: COBALT },
                { label: "ISO 14001 & 9001", color: GOLD },
                { label: "Green Seal GS-11", color: FOREST },
                { label: "LEED IEQ Credit Contributor", color: SIENNA },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ backgroundColor: `${badge.color}08`, border: `1px solid ${badge.color}20` }}>
                  <Check size={14} style={{ color: badge.color }} />
                  <span className="font-['Fira_Sans',sans-serif] text-[12px] tracking-[1px]" style={{ color: badge.color, fontWeight: 500 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px] relative overflow-hidden" style={{ backgroundColor: DEEP_FOREST }}>
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }} />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-['Fira_Sans',sans-serif] text-white text-[clamp(24px,3vw,40px)] mb-4" style={{ fontWeight: 600, lineHeight: 1.16 }}>
              Can't Find What You <span style={{ color: GOLD }}>Need</span>?
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-white/55 text-[15px] lg:text-[16px] mb-8 leading-[28px]" style={{ fontWeight: 300 }}>
              Our product specialists can help you find the perfect eco-friendly paint system for your project — whether it's a residential renovation, commercial build-out, healthcare facility, or LEED-certified green building. Get personalised recommendations based on your surface type, environment, and performance requirements.
            </p>
            <button className="group h-[52px] lg:h-14 px-8 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 mx-auto transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
              Contact a Specialist <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}