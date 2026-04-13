import { useState } from "react";
import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./micro-interactions";
import { ArrowRight, Leaf, Award, Users, Zap, Factory, FlaskConical, Recycle, ShieldCheck, ChevronDown, BadgeCheck } from "lucide-react";
import { useSEO } from "./use-seo";

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

const HERO_BG = "https://images.unsplash.com/photo-1627445021452-c87e2f25e91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const STORY_IMG = "https://images.unsplash.com/photo-1629036420663-5fd4579da6bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const MISSION_IMG = "https://images.unsplash.com/photo-1647082550285-119acfd169f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const VISION_IMG = "https://images.unsplash.com/photo-1591506366787-02de167e9049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const CTA_IMG = "https://images.unsplash.com/photo-1769013649052-add139112bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const FACTORY_IMG = "https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const SOLAR_IMG = "https://images.unsplash.com/photo-1589276534126-adef63a95e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const LAB_IMG = "https://images.unsplash.com/photo-1766297246958-b6ca17b56fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const CERT_IMG = "https://images.unsplash.com/photo-1754300681803-61eadeb79d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

const STATS = [
  { value: "25+", label: "Years of Eco Innovation" },
  { value: "8K+", label: "Sustainable Projects" },
  { value: "120+", label: "Low-VOC Formulations" },
  { value: "50K+", label: "Greener Homes" },
];

const VALUES = [
  { icon: <Leaf size={28} />, title: "Zero-Compromise Sustainability", desc: "Every product is formulated with plant-derived binders, natural mineral pigments, and near-zero VOC levels — exceeding EPA and GREENGUARD Gold standards." },
  { icon: <Award size={28} />, title: "Advanced Eco-Pigment Tech", desc: "Our proprietary EcoPigment system delivers vibrant, fade-resistant colour using responsibly sourced minerals and bio-based resins." },
  { icon: <Users size={28} />, title: "Expert Green Consultation", desc: "Certified green-building consultants guide architects, contractors, and homeowners through selecting the right low-impact coatings." },
  { icon: <Zap size={28} />, title: "Continuous R&D", desc: "From self-priming textured paints to bio-solvent turpentine oils, our R&D lab pioneers breakthroughs that reduce embodied carbon." },
];

/* ── Manufacturing & R&D ── */
const MANUFACTURING_HIGHLIGHTS = [
  { icon: <Factory size={24} />, title: "3 State-of-the-Art Plants", desc: "Our facilities in Pune, Hyderabad, and Chennai collectively produce over 85,000 KL of eco-friendly coatings annually using automated batch processing, in-line quality monitoring, and AI-driven colour matching systems." },
  { icon: <FlaskConical size={24} />, title: "85-Member R&D Team", desc: "Our research division — comprising polymer chemists, materials scientists, and colour technologists — has filed 47 patents in bio-based binders, self-cleaning coatings, anti-microbial paints, and nano-ceramic surface treatments." },
  { icon: <ShieldCheck size={24} />, title: "200+ Quality Tests Per Batch", desc: "Every formulation undergoes rigorous testing for adhesion strength, UV resistance, scrub cycles (10,000+), washability, colour consistency, and VOC emission levels before shipping. Our QA labs are ISO 17025 accredited." },
  { icon: <Recycle size={24} />, title: "Closed-Loop Water Recycling", desc: "Our manufacturing plants recover 94% of process water through a patented three-stage filtration system. Recovered water is reused in non-critical manufacturing stages, saving over 12 million litres annually." },
];

/* ── Sustainability Metrics ── */
const SUSTAINABILITY_METRICS = [
  { metric: "94%", label: "Process Water Recycled", desc: "Three-stage closed-loop filtration system across all manufacturing plants recovers and purifies 94% of process water for reuse in non-critical production stages." },
  { metric: "60%", label: "Solar-Powered Energy", desc: "Our Pune manufacturing facility operates on 60% solar energy from an on-site 4.2 MW rooftop installation, reducing grid dependency by 6,800 MWh annually." },
  { metric: "0.02g/L", label: "Lowest VOC Rating", desc: "The Eco Primax Pro line achieves industry-leading 0.02 g/L VOC emissions — 99.8% below conventional paints and 96% below GREENGUARD Gold thresholds." },
  { metric: "38%", label: "Carbon Reduction Since 2019", desc: "Comprehensive Scope 1, 2, and 3 emissions tracking has driven a 38% reduction in our carbon footprint since 2019, with a roadmap to achieve net-zero by 2030." },
  { metric: "12M+", label: "Litres Water Saved Annually", desc: "Closed-loop water systems, rainwater harvesting, and process optimisation save over 12 million litres of freshwater per year across our three manufacturing plants." },
  { metric: "15K+", label: "Trees Planted via Green Fund", desc: "Our Green Fund initiative has planted 15,000+ native trees across India since 2018 as part of our broader biodiversity and carbon offset programme." },
];

/* ── Certifications & Partnerships ── */
const CERTIFICATIONS = [
  { name: "GREENGUARD Gold", body: "UL Environment", year: "2010", desc: "All interior paint products certified for low chemical emissions, approved for use in schools, healthcare facilities, and sensitive environments like nurseries." },
  { name: "EPA Safer Choice", body: "U.S. EPA", year: "2015", desc: "Recognised for using safer chemical ingredients across our entire eco-friendly product line, meeting EPA's rigorous criteria for human health and environmental safety." },
  { name: "ISO 14001:2015", body: "Bureau Veritas", year: "2010", desc: "Environmental Management System certification ensuring systematic reduction of environmental impact across manufacturing, logistics, and product lifecycle management." },
  { name: "ISO 9001:2015", body: "Bureau Veritas", year: "2003", desc: "Quality Management System certification with Six Sigma protocols ensuring consistent product quality, customer satisfaction, and continuous process improvement." },
  { name: "Green Seal GS-11", body: "Green Seal", year: "2018", desc: "Independent certification verifying that our paints and coatings meet stringent environmental leadership standards for reduced toxicity and improved indoor air quality." },
  { name: "LEED Contributor", body: "USGBC", year: "2016", desc: "Our low-VOC products contribute to LEED Green Building credits (IEQ Credit 4.2 — Low-Emitting Materials), helping projects achieve Platinum and Gold certifications." },
];

/* ── About Page FAQ ── */
const ABOUT_FAQS = [
  { q: "When was Teknas Paints founded?", a: "Teknas Paints was established in 2001 in Hyderabad, India, with a mission to develop eco-friendly textured paints and low-VOC coatings. Over the past 25 years, we have grown into one of India's most trusted sustainable paint manufacturers, serving over 50,000 homes and 8,000+ commercial projects." },
  { q: "What makes Teknas Paints different from other paint companies?", a: "Teknas Paints is differentiated by our unwavering commitment to environmental sustainability without sacrificing performance. Every product in our portfolio uses plant-derived binders, natural mineral pigments, and near-zero VOC formulations. We hold six major environmental certifications including GREENGUARD Gold, EPA Safer Choice, and Green Seal GS-11 — a combination few competitors can match." },
  { q: "Where are Teknas Paints products manufactured?", a: "We operate three state-of-the-art manufacturing plants located in Pune, Hyderabad, and Chennai with a combined annual production capacity of 85,000 KL. All facilities are ISO 14001 and ISO 9001:2015 certified, feature closed-loop water recycling systems, and utilise solar energy for up to 60% of their power needs." },
  { q: "What eco-friendly certifications does Teknas Paints hold?", a: "Teknas Paints products carry GREENGUARD Gold, EPA Safer Choice, ISO 14001:2015, ISO 9001:2015, Green Seal GS-11, and LEED Contributor certifications. Our Eco Primax Pro line achieves an industry-leading 0.02 g/L VOC rating — 99.8% below conventional paints." },
  { q: "Does Teknas Paints have a sustainability or carbon neutrality goal?", a: "Yes. We are committed to achieving carbon neutrality across all operations by 2030. Since 2019, we have already reduced our total carbon footprint by 38% through solar energy adoption, process optimisation, closed-loop water recycling, and our Green Fund tree-planting initiative which has planted over 15,000 native trees." },
  { q: "How many products does Teknas Paints offer?", a: "Our product portfolio includes over 120 formulations across five major categories: Eco Turpentine Oils (bio-solvent thinners), Eco Primax (low-VOC primers and emulsions), Eco Textured Paints (designer wall textures), Interior & Exterior Emulsions, and Protective Coatings. Each category includes standard, plus, and professional-grade variants." },
  { q: "What is Teknas Paints' community impact?", a: "We actively invest in community development through our Skill India partnership, training 12,000+ local painters and artisans. We invest Rs 15 Cr annually in community programmes including painter health insurance, children's education scholarships, and the Green Fund environmental restoration initiative." },
  { q: "Can Teknas Paints be used in hospitals and schools?", a: "Absolutely. Our GREENGUARD Gold and EPA Safer Choice certified products are specifically approved for use in sensitive environments including hospitals, schools, nurseries, and elderly care facilities. The Eco Primax Pro line emits just 0.02 g/L VOC — far below the thresholds set for healthcare and educational environments." },
];

/* ── Journey Timeline ── */
const JOURNEY = [
  { year: "2001", title: "Founded in Hyderabad", desc: "Teknas Paints was established with a bold vision: every coating applied to a wall should protect the people inside it just as much as the surface beneath it. Our first product — a plant-based interior emulsion — was developed with just 5 employees in a small Hyderabad workshop." },
  { year: "2005", title: "First Textured Paint Line", desc: "Launched India's first eco-friendly textured paint range using mineral pigments and plant-derived binders. The line became an instant success among interior designers and green-building architects." },
  { year: "2008", title: "Pune Manufacturing Plant", desc: "Opened our first large-scale manufacturing facility in Pune, spanning 50,000 sq. ft. with automated batch processing, in-house quality lab, and capacity to produce 25,000 KL of paint annually." },
  { year: "2010", title: "GREENGUARD Gold Certification", desc: "Became one of India's first paint manufacturers to achieve GREENGUARD Gold certification for low chemical emissions — opening doors to the healthcare, education, and LEED-certified building sectors." },
  { year: "2015", title: "EPA Safer Choice Recognition", desc: "The entire Eco Primax product line received EPA Safer Choice recognition, validating our commitment to using safer chemical ingredients for human health and environmental safety." },
  { year: "2018", title: "Digital Transformation", desc: "Launched AI-powered Colour Visualiser enabling homeowners to preview 200+ shades on their own walls. Also launched online e-commerce platform with home delivery across 150+ Indian cities." },
  { year: "2022", title: "85,000 KL Annual Capacity", desc: "Expanded manufacturing to three plants (Pune, Hyderabad, Chennai) with combined 85,000 KL capacity. Introduced AI-driven quality monitoring and robotic colour matching systems." },
  { year: "2025", title: "Carbon Neutrality Roadmap", desc: "Announced ambitious plan to achieve net-zero carbon emissions by 2030. Already achieved 38% reduction since 2019 through solar energy, process optimisation, and the 15,000-tree Green Fund initiative." },
];

export function AboutPage() {
  const { navigateHome, navigateToProducts, navigateToContact } = useNavigation();
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "About Teknas Paints | 25+ Years of Eco-Friendly Paint Innovation in India",
    description: "Learn about Teknas Paints — India's pioneer in eco-friendly textured paints and low-VOC coatings since 2001. Discover our mission, values, manufacturing excellence, sustainability impact, 6 environmental certifications including GREENGUARD Gold & EPA Safer Choice, and our roadmap to carbon neutrality by 2030.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Teknas Paints",
        description: "Teknas Paints has pioneered eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils since 2001. 85,000 KL annual capacity across 3 plants. GREENGUARD Gold, EPA Safer Choice, ISO 14001, Green Seal GS-11 certified.",
        mainEntity: {
          "@type": "Organization",
          name: "Teknas Paints",
          foundingDate: "2001",
          foundingLocation: "Hyderabad, India",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 4200 },
          award: ["GREENGUARD Gold Certification", "EPA Safer Choice", "ISO 14001:2015", "ISO 9001:2015", "Green Seal GS-11", "LEED Contributor"],
          knowsAbout: ["Eco-friendly paint", "Low-VOC coatings", "Textured paints", "Bio-solvent turpentine", "GREENGUARD Gold paints", "Sustainable manufacturing"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ABOUT_FAQS.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  });

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 45vw, 500px)" }}>
        <ImageWithFallback src={HERO_BG} alt="Teknas Paints headquarters — eco-friendly paint manufacturing since 2001" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${AUBERGINE}ee 0%, ${AUBERGINE}88 50%, ${AUBERGINE}33 100%)` }} />
        <div className={`relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Sustainable Paint Innovation Since 2001</span>
            </div>
            <h1 className="font-['Fira_Sans',sans-serif] text-white text-[clamp(32px,4.5vw,56px)] max-w-[650px] mb-4" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              About <span style={{ color: GOLD }}>Teknas Paints</span>
            </h1>
            <p className="font-['Fira_Sans',sans-serif] text-white/70 text-[clamp(14px,1.1vw,17px)] max-w-[560px]" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              For over 25 years, we've pioneered eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils — proving that premium performance and environmental responsibility belong on the same label. With 120+ formulations, 6 environmental certifications, and 85,000 KL annual production capacity, we're building a greener future one wall at a time.
            </p>
            <div className="mt-6">
              <p className="font-['Fira_Sans',sans-serif] text-[14px] text-white/50" style={{ fontWeight: 300 }}>
                <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={navigateHome}>Home</span>
                <span className="mx-2">—</span>
                <span className="text-white/90">About Us</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-center">
          <ScrollReveal direction="left" className="w-full lg:w-1/2 shrink-0">
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden">
                <ImageWithFallback src={STORY_IMG} alt="Teknas Paints eco-friendly paint formulation process in Hyderabad lab" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-[120px] lg:w-[150px] h-[120px] lg:h-[150px] rounded-[14px] -z-10" style={{ backgroundColor: SIENNA }} />
              <div className="absolute -bottom-4 -left-4 w-[100px] lg:w-[120px] h-[100px] lg:h-[120px] rounded-full flex flex-col items-center justify-center" style={{ backgroundColor: AUBERGINE, border: `3px solid ${GOLD}` }}>
                <span className="font-['Fira_Sans',sans-serif] text-[clamp(24px,2vw,32px)]" style={{ color: GOLD, fontWeight: 600 }}>25+</span>
                <span className="font-['Fira_Sans',sans-serif] text-[10px] lg:text-[11px] tracking-[1.5px] text-white/70 uppercase">Years</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="flex-1">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Our Story</span>
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-5" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Pioneering Eco-Friendly <span style={{ color: SIENNA }}>Paint Technology</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] mb-4" style={{ color: "#464646", fontWeight: 300 }}>
              Founded in 2001, Teknas Paints began with a bold conviction: every coating applied to a wall should protect the people inside it just as much as the surface beneath it. From our workshop in Hyderabad, we developed the first generation of textured paints made entirely with plant-based binders and natural mineral pigments — at a time when the Indian paint industry was still heavily reliant on petroleum-derived solvents.
            </p>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] mb-4" style={{ color: "#464646", fontWeight: 300 }}>
              Today our product line spans eco turpentine oils, self-priming low-VOC primers, designer textured finishes, interior and exterior emulsions, and protective coatings — totalling over 120 unique formulations across five major categories. Every formulation is third-party tested to meet GREENGUARD Gold, EPA Safer Choice, and Green Seal GS-11 standards.
            </p>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] mb-8" style={{ color: "#464646", fontWeight: 300 }}>
              Our products are trusted by over 50,000 homeowners, 8,000+ commercial projects, and leading architects and interior designers across India. Whether you're coating a nursery, a hospital ward, a heritage restoration project, or a modern skyscraper lobby — Teknas provides the right eco-conscious solution.
            </p>
            <button onClick={navigateToProducts} className="group h-[52px] lg:h-14 px-8 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
              Explore Our Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="w-full" style={{ backgroundColor: DEEP_FOREST }}>
        <div className={`max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 py-12 lg:py-16 ${SECTION_PX}`}>
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <span className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3vw,48px)] block" style={{ color: GOLD, fontWeight: 600 }}>{stat.value}</span>
                <span className="font-['Fira_Sans',sans-serif] text-[clamp(11px,0.8vw,15px)] text-white/55 mt-1 block" style={{ fontWeight: 400 }}>{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ═══ OUR JOURNEY TIMELINE ═══ */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: COBALT }} />
            <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: COBALT, fontWeight: 500 }}>Milestones</span>
            <div className="w-9 h-[2px]" style={{ backgroundColor: COBALT }} />
          </div>
          <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Our Journey of <span style={{ color: COBALT }}>Innovation</span>
          </h2>
          <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[680px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
            From a small Hyderabad workshop to one of India's most trusted eco-paint brands — every year has been a step towards a greener, healthier built environment.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden sm:block" style={{ background: `linear-gradient(to bottom, transparent, ${COBALT}30, ${COBALT}30, transparent)` }} />

          <div className="flex flex-col gap-8 lg:gap-12">
            {JOURNEY.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="bg-white p-6 lg:p-8 rounded-[16px]" style={{ boxShadow: "0 2px 16px rgba(26,20,40,0.05)", border: "1px solid rgba(26,20,40,0.04)" }}>
                      <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[3px] uppercase" style={{ color: COBALT, fontWeight: 600 }}>{item.year}</span>
                      <h3 className="font-['Fira_Sans',sans-serif] text-[18px] lg:text-[20px] mt-2 mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>{item.title}</h3>
                      <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[25px]" style={{ color: "#565656", fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden lg:flex w-10 h-10 rounded-full shrink-0 items-center justify-center z-10" style={{ backgroundColor: COBALT, boxShadow: `0 0 0 6px ${CANVAS}, 0 0 0 8px ${COBALT}30` }}>
                    <span className="font-['Fira_Sans',sans-serif] text-[10px] text-white" style={{ fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>What Drives Us</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Our Mission & <span style={{ color: SIENNA }}>Vision</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[680px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
              We believe that the coatings industry has a responsibility to protect both people and the planet. These guiding principles inform every formulation we develop and every decision we make.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <ScrollReveal direction="left">
              <div className="relative rounded-[18px] overflow-hidden" style={{ height: "clamp(320px, 30vw, 440px)" }}>
                <ImageWithFallback src={MISSION_IMG} alt="Teknas Paints mission — eliminating harmful chemicals from the built environment" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${AUBERGINE}ee 40%, ${AUBERGINE}50 100%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: SIENNA }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                    </div>
                    <h3 className="font-['Fira_Sans',sans-serif] text-[clamp(20px,1.8vw,28px)] text-white" style={{ fontWeight: 600 }}>Our Mission</h3>
                  </div>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] text-white/70 leading-[26px]" style={{ fontWeight: 300 }}>
                    To eliminate harmful chemicals from the built environment by developing eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils that outperform conventional coatings — while protecting indoor air quality, reducing carbon emissions, and making premium sustainable paints accessible to every homeowner and contractor in India and beyond.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative rounded-[18px] overflow-hidden" style={{ height: "clamp(320px, 30vw, 440px)" }}>
                <ImageWithFallback src={VISION_IMG} alt="Teknas Paints vision — a circular paint economy for a sustainable future" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${AUBERGINE}ee 40%, ${AUBERGINE}50 100%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: SIENNA }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                    </div>
                    <h3 className="font-['Fira_Sans',sans-serif] text-[clamp(20px,1.8vw,28px)] text-white" style={{ fontWeight: 600 }}>Our Vision</h3>
                  </div>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] text-white/70 leading-[26px]" style={{ fontWeight: 300 }}>
                    A world where every surface is coated with products that improve indoor air quality, lower carbon emissions, and increase durability. We envision a circular paint economy where sustainability is the standard — where bio-based raw materials, closed-loop manufacturing, and zero-waste packaging become the industry norm, not the exception.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MANUFACTURING EXCELLENCE ═══ */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-center">
          <ScrollReveal direction="left" className="flex-1">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: FOREST }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: FOREST, fontWeight: 500 }}>Manufacturing & R&D</span>
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-5" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              World-Class <span style={{ color: FOREST }}>Manufacturing</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] mb-8" style={{ color: "#464646", fontWeight: 300 }}>
              Our three ISO-certified manufacturing plants combine cutting-edge automation with rigorous environmental controls. Every batch passes 200+ quality tests before it reaches your walls. Our 85-member R&D team continuously pushes the boundaries of what eco-friendly coatings can achieve — from self-cleaning nano-ceramic surfaces to anti-microbial hospital-grade paints.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {MANUFACTURING_HIGHLIGHTS.map((item, i) => (
                <div key={item.title} className="p-5 rounded-[14px] bg-white" style={{ boxShadow: "0 2px 12px rgba(26,20,40,0.04)", border: "1px solid rgba(26,20,40,0.04)" }}>
                  <div className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-3" style={{ backgroundColor: `${FOREST}12`, color: FOREST }}>
                    {item.icon}
                  </div>
                  <h4 className="font-['Fira_Sans',sans-serif] text-[15px] mb-2" style={{ color: AUBERGINE, fontWeight: 600 }}>{item.title}</h4>
                  <p className="font-['Fira_Sans',sans-serif] text-[13px] leading-[21px]" style={{ color: "#666", fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="w-full lg:w-[45%] shrink-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] overflow-hidden aspect-[3/4]">
                <ImageWithFallback src={FACTORY_IMG} alt="Teknas Paints automated manufacturing plant producing eco-friendly coatings" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-[16px] overflow-hidden aspect-square">
                  <ImageWithFallback src={LAB_IMG} alt="Teknas Paints quality laboratory — 200+ tests per paint batch" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-[16px] overflow-hidden aspect-square flex items-center justify-center" style={{ backgroundColor: FOREST }}>
                  <div className="text-center px-4">
                    <span className="font-['Fira_Sans',sans-serif] text-[clamp(28px,2.5vw,40px)] block text-white" style={{ fontWeight: 600 }}>85K</span>
                    <span className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[2px] text-white/60 uppercase">KL Annual Capacity</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SUSTAINABILITY IMPACT ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: DEEP_FOREST }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Environmental Impact</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4 text-white" style={{ fontWeight: 600, lineHeight: 1.16 }}>
              Sustainability in <span style={{ color: GOLD }}>Every Drop</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[700px] mx-auto mb-12 lg:mb-[60px] text-white/55" style={{ fontWeight: 300 }}>
              Our commitment to sustainability goes far beyond the paint can. From solar-powered manufacturing to closed-loop water recycling and carbon offset programmes, we measure and reduce our environmental footprint at every stage.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
            {SUSTAINABILITY_METRICS.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.08}>
                <div className="p-6 lg:p-7 rounded-[16px] h-full" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="font-['Inter',sans-serif] text-[clamp(28px,2.5vw,38px)] block" style={{ color: GOLD, fontWeight: 700 }}>{item.metric}</span>
                  <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[2px] text-white/80 uppercase mt-1 block" style={{ fontWeight: 500 }}>{item.label}</span>
                  <p className="font-['Fira_Sans',sans-serif] text-[13px] lg:text-[14px] leading-[22px] text-white/45 mt-3" style={{ fontWeight: 300 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-6 items-center rounded-[18px] p-6 lg:p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-full lg:w-[280px] h-[200px] shrink-0 rounded-[14px] overflow-hidden">
                <ImageWithFallback src={SOLAR_IMG} alt="Solar panels at Teknas Paints Pune manufacturing facility generating 4.2 MW clean energy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-['Fira_Sans',sans-serif] text-[20px] lg:text-[22px] text-white mb-3" style={{ fontWeight: 600 }}>Carbon Neutrality by 2030</h3>
                <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[26px] text-white/55" style={{ fontWeight: 300 }}>
                  Teknas Paints is on track to achieve complete carbon neutrality across all Scope 1, 2, and 3 emissions by 2030. Our comprehensive roadmap includes expanding solar capacity to 100% across all three manufacturing plants, transitioning to 100% electric logistics by 2028, introducing biodegradable packaging for all product sizes by 2027, and investing Rs 100 Cr in carbon offset projects including reforestation and methane capture. Since 2019, we've already reduced our carbon intensity by 38% while growing production volume by 42%.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS & PARTNERSHIPS ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Trust & Compliance</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Certifications & <span style={{ color: GOLD }}>Accreditations</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[700px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
              Our products and manufacturing processes are independently verified by the world's most respected environmental and quality certification bodies. These aren't marketing badges — they're rigorous audits that validate our commitment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 0.08}>
                <div className="p-6 lg:p-7 rounded-[16px] h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: CANVAS, border: "1px solid rgba(26,20,40,0.04)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: `${GOLD}15` }}>
                      <BadgeCheck size={22} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <h3 className="font-['Fira_Sans',sans-serif] text-[16px]" style={{ color: AUBERGINE, fontWeight: 600 }}>{cert.name}</h3>
                      <p className="font-['Fira_Sans',sans-serif] text-[11px] tracking-[1px]" style={{ color: "#888", fontWeight: 400 }}>{cert.body} · Since {cert.year}</p>
                    </div>
                  </div>
                  <p className="font-['Fira_Sans',sans-serif] text-[13px] lg:text-[14px] leading-[22px]" style={{ color: "#565656", fontWeight: 300 }}>{cert.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR VALUES ═══ */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: SAGE }} />
            <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SAGE, fontWeight: 500 }}>Why Teknas</span>
            <div className="w-9 h-[2px]" style={{ backgroundColor: SAGE }} />
          </div>
          <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Our Core <span style={{ color: FOREST }}>Values</span>
          </h2>
          <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[680px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
            These four values guide every product we formulate, every partnership we build, and every decision we make as a company committed to sustainable excellence.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => {
            const isHov = hoveredValue === i;
            return (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div
                  className="p-7 lg:p-8 rounded-[18px] transition-all duration-400 cursor-default"
                  style={{
                    backgroundColor: isHov ? AUBERGINE : "white",
                    transform: isHov ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHov ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 12px rgba(26,20,40,0.04)",
                    border: isHov ? "none" : "1px solid rgba(26,20,40,0.05)",
                  }}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <div
                    className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-6 transition-colors duration-400"
                    style={{ backgroundColor: isHov ? SIENNA : `${SIENNA}10`, color: isHov ? GOLD : SIENNA }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-['Fira_Sans',sans-serif] text-[18px] lg:text-[20px] mb-3 transition-colors duration-400" style={{ color: isHov ? "white" : AUBERGINE, fontWeight: 600 }}>{v.title}</h3>
                  <p className="font-['Fira_Sans',sans-serif] text-[14px] leading-[23px] transition-colors duration-400" style={{ color: isHov ? "rgba(255,255,255,0.65)" : "#565656", fontWeight: 300 }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══ FREQUENTLY ASKED QUESTIONS ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[900px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Knowledge Base</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Frequently Asked <span style={{ color: SIENNA }}>Questions</span>
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] text-center max-w-[600px] mx-auto mb-12 lg:mb-[60px]" style={{ color: "#666", fontWeight: 300 }}>
              Everything you need to know about Teknas Paints, our eco-friendly products, certifications, and sustainability initiatives.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {ABOUT_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div
                    className="rounded-[14px] overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? AUBERGINE : CANVAS,
                      border: isOpen ? "none" : "1px solid rgba(26,20,40,0.04)",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 lg:p-6 cursor-pointer border-0 bg-transparent text-left"
                    >
                      <span className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] pr-4 transition-colors duration-300" style={{ color: isOpen ? "white" : AUBERGINE, fontWeight: 500 }}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className="shrink-0 transition-transform duration-300"
                        style={{
                          color: isOpen ? GOLD : "#999",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{ maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] leading-[25px] px-5 lg:px-6 pb-5 lg:pb-6" style={{ color: isOpen ? "rgba(255,255,255,0.65)" : "#666", fontWeight: 300 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="relative overflow-hidden" style={{ height: "clamp(280px, 30vw, 380px)" }}>
        <ImageWithFallback src={CTA_IMG} alt="Choose eco-friendly Teknas Paints for sustainable home improvement" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: `${AUBERGINE}cc` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <ScrollReveal direction="scale">
            <div className="flex items-center gap-3.5 mb-4 justify-center">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Build Responsibly. Paint Sustainably.</span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
            </div>
            <h2 className="font-['Fira_Sans',sans-serif] text-white text-[clamp(24px,3vw,40px)] mb-3" style={{ fontWeight: 600, lineHeight: 1.2 }}>
              Choose Eco-Friendly Coatings Today
            </h2>
            <p className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] text-white/55 max-w-[550px] mx-auto mb-6" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Join 50,000+ homeowners and 8,000+ projects that trust Teknas Paints for healthier, more vibrant, and environmentally responsible surfaces.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button onClick={navigateToProducts} className="group h-[52px] px-8 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
                Browse Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={navigateToContact} className="h-[52px] px-8 rounded-full cursor-pointer font-['Fira_Sans',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 500, backgroundColor: "transparent", border: `1.5px solid rgba(255,255,255,0.4)` }}>
                Contact Us
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
