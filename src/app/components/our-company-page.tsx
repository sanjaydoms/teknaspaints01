import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./micro-interactions";
import { ArrowRight, Award, Globe, Users, Leaf } from "lucide-react";
import { useSEO } from "./use-seo";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const CANVAS = "#f5f2ec";
const SAGE = "#75866c";
const FOREST = "#687967";
const DEEP_FOREST = "#04150b";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

const MILESTONES = [
  { year: "1987", title: "Founded in Mumbai", desc: "Teknas Paints established by Rajesh Malhotra in Mumbai with a vision to bring world-class, environmentally responsible coatings to India. Our first product — a low-odour interior emulsion — launched with just 3 employees." },
  { year: "1995", title: "First Manufacturing Plant", desc: "Opened our first state-of-the-art manufacturing facility in Pune, spanning 50,000 sq. ft. with automated batch processing, in-house quality lab, and capacity to produce 12,000 KL annually." },
  { year: "2003", title: "National Dealer Network", desc: "Expanded our authorised dealer network to cover all 28 states and 8 union territories with 5,000+ retail touchpoints. Introduced the industry's first colour-matching kiosk system in partnership stores." },
  { year: "2010", title: "Eco-Friendly Pioneer", desc: "Launched India's first near-zero VOC product line — the Eco Primax series. Achieved GREENGUARD Gold certification and ISO 14001 environmental management accreditation. Invested Rs 50 Cr in green chemistry R&D." },
  { year: "2018", title: "Digital Transformation", desc: "Introduced AI-powered Colour Visualiser enabling homeowners to preview 200+ shades on their own walls. Launched e-commerce platform with home delivery across 150+ cities and online colour consultation services." },
  { year: "2025", title: "Global Expansion", desc: "Now present in 12 countries across South Asia, the Middle East, and Africa with 15,000+ dealer partners worldwide. Revenue crossed Rs 8,400 Cr. Committed to achieving carbon neutrality across all operations by 2030." },
];

const LEADERSHIP = [
  { name: "Rajesh Malhotra", role: "Chairman & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop", bio: "Founded Teknas Paints in 1987. 38 years of experience in coatings technology and green chemistry. IIT Bombay alumnus." },
  { name: "Priya Sharma", role: "Chief Operating Officer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop", bio: "15 years in FMCG operations. Led the expansion to 15,000+ dealers. MBA from IIM Ahmedabad." },
  { name: "Vikram Patel", role: "Chief Technology Officer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop", bio: "Pioneer of low-VOC formulation technology. Holds 14 patents in coatings chemistry. PhD in Polymer Science." },
  { name: "Anita Desai", role: "VP of Sustainability", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop", bio: "Leads our carbon neutrality roadmap and ESG strategy. Former sustainability director at a Fortune 500 chemical company." },
];

const VALUES = [
  { icon: <Award size={28} />, title: "Excellence", desc: "Every product undergoes 200+ quality tests including adhesion strength, UV resistance, washability, and VOC emission levels before reaching customers. Our manufacturing is ISO 9001:2015 certified with Six Sigma quality protocols." },
  { icon: <Leaf size={28} />, title: "Sustainability", desc: "Committed to carbon neutrality by 2030 across all operations. Our closed-loop water recycling system recovers 94% of process water. We source 60% of energy from solar panels installed at our Pune facility." },
  { icon: <Users size={28} />, title: "Community", desc: "Empowering 12,000+ local painters and artisans through our Skill India partnership programme. Annual Rs 15 Cr investment in community development including painter health insurance and children's education scholarships." },
  { icon: <Globe size={28} />, title: "Innovation", desc: "Rs 250 Cr annual R&D investment across two dedicated innovation labs. Our 85-member research team has filed 47 patents in bio-based binders, self-cleaning coatings, and anti-microbial paint technology." },
];

export function OurCompanyPage() {
  const { navigateToContact } = useNavigation();

  useSEO({
    title: "Our Company | Teknas Paints — 38+ Years of Excellence in Coatings & Paint Manufacturing",
    description: "Teknas Paints: 38+ years of excellence in eco-friendly coatings. Founded in 1987 in Mumbai, now operating across 12 countries with 15,000+ dealer partners, 4,200+ employees, and Rs 8,420 Cr revenue. Discover our milestones from first plant to global expansion, meet our leadership team, and explore our Rs 250 Cr annual R&D investment.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Teknas Paints",
        foundingDate: "1987",
        founder: { "@type": "Person", name: "Rajesh Malhotra", jobTitle: "Chairman & CEO" },
        numberOfEmployees: { "@type": "QuantitativeValue", value: 4200 },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "12 countries across South Asia, Middle East, and Africa" },
        ],
        slogan: "Painting India's Dreams, One Wall at a Time",
        award: ["GREENGUARD Gold Certification", "EPA Safer Choice", "ISO 14001:2015", "ISO 9001:2015"],
        knowsAbout: ["Paint manufacturing", "Eco-friendly coatings", "Low-VOC formulations", "Textured paints", "Bio-solvent turpentine oils"],
        member: LEADERSHIP.map(l => ({
          "@type": "Person",
          name: l.name,
          jobTitle: l.role,
          description: l.bio,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Our Company", item: "https://www.teknaspaints.com/our-company" },
        ],
      },
    ],
  });

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 50vw, 520px)" }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760246964044-1384f71665b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMG1vZGVybnxlbnwxfHx8fDE3NzI0MDYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Teknas HQ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${AUBERGINE}ee 0%, ${AUBERGINE}88 50%, ${AUBERGINE}33 100%)` }} />
        <div className={`relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Since 1987</span>
            </div>
            <h1 className="font-['Jost',sans-serif] text-white text-[clamp(32px,4.5vw,56px)] max-w-[600px] mb-4" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Painting India's Dreams, <span style={{ color: GOLD }}>One Wall</span> at a Time
            </h1>
            <p className="font-['Jost',sans-serif] text-white/70 text-[clamp(14px,1.1vw,17px)] max-w-[480px]" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              For nearly four decades, Teknas Paints has been at the forefront of innovation in the coatings industry, transforming spaces across the globe.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      <div className="w-full" style={{ backgroundColor: DEEP_FOREST }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {[
            { num: "38+", label: "Years of Excellence" },
            { num: "15,000+", label: "Dealer Partners" },
            { num: "12", label: "Countries" },
            { num: "2,000+", label: "Products" },
          ].map((s) => (
            <ScrollReveal key={s.label}>
              <div className="flex flex-col items-center py-8 md:py-10" style={{ backgroundColor: DEEP_FOREST }}>
                <span className="font-['Jost',sans-serif] text-[clamp(24px,2.5vw,38px)]" style={{ color: GOLD, fontWeight: 600 }}>{s.num}</span>
                <span className="font-['Jost',sans-serif] text-[clamp(11px,0.8vw,14px)] text-white/50 mt-1" style={{ fontWeight: 400 }}>{s.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Our Values */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>What Drives Us</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-12 lg:mb-[60px]" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Our Core <span style={{ color: SIENNA }}>Values</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="p-7 lg:p-8 rounded-[18px] transition-all duration-400 hover:-translate-y-[6px] hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)] cursor-default" style={{ backgroundColor: "white", border: "1px solid rgba(26,20,40,0.06)" }}>
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-6" style={{ backgroundColor: `${SIENNA}10`, color: SIENNA }}>
                  {v.icon}
                </div>
                <h3 className="font-['Jost',sans-serif] text-[18px] lg:text-[20px] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>{v.title}</h3>
                <p className="font-['Jost',sans-serif] text-[14px] leading-[23px]" style={{ color: `${AUBERGINE}88`, fontWeight: 300 }}>{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Our Journey</span>
            </div>
            <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-12 lg:mb-[60px]" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Key <span style={{ color: GOLD }}>Milestones</span>
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]" style={{ backgroundColor: `${GOLD}25` }} />
            {MILESTONES.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.08}>
                <div className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <span className="font-['Jost',sans-serif] text-[clamp(28px,2.5vw,42px)]" style={{ color: GOLD, fontWeight: 700 }}>{m.year}</span>
                    <h3 className="font-['Jost',sans-serif] text-[18px] lg:text-[20px] mt-1" style={{ color: AUBERGINE, fontWeight: 600 }}>{m.title}</h3>
                    <p className="font-['Jost',sans-serif] text-[14px] mt-2 leading-[23px]" style={{ color: "#565656", fontWeight: 300 }}>{m.desc}</p>
                  </div>
                  <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 w-[18px] h-[18px] rounded-full border-[3px] z-10" style={{ borderColor: GOLD, backgroundColor: "white", top: 4 }} />
                  <div className="md:hidden pl-10">
                    <span className="font-['Jost',sans-serif] text-[24px]" style={{ color: GOLD, fontWeight: 700 }}>{m.year}</span>
                    <h3 className="font-['Jost',sans-serif] text-[16px] mt-1" style={{ color: AUBERGINE, fontWeight: 600 }}>{m.title}</h3>
                    <p className="font-['Jost',sans-serif] text-[13px] mt-1 leading-[22px]" style={{ color: "#565656", fontWeight: 300 }}>{m.desc}</p>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Leadership</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-12 lg:mb-[60px]" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Meet Our <span style={{ color: SIENNA }}>Team</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map((l, i) => (
            <ScrollReveal key={l.name} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[18px] mb-4 aspect-square">
                  <ImageWithFallback src={l.img} alt={l.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to top, ${AUBERGINE}cc, transparent)` }} />
                </div>
                <h3 className="font-['Jost',sans-serif] text-[clamp(14px,1vw,18px)]" style={{ color: AUBERGINE, fontWeight: 600 }}>{l.name}</h3>
                <p className="font-['Jost',sans-serif] text-[clamp(12px,0.8vw,14px)]" style={{ color: GOLD, fontWeight: 400 }}>{l.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 xl:py-[100px] relative overflow-hidden" style={{ backgroundColor: DEEP_FOREST }}>
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }} />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-['Jost',sans-serif] text-white text-[clamp(24px,3vw,40px)] mb-5" style={{ fontWeight: 600, lineHeight: 1.16 }}>
              Want to Be Part of Our <span style={{ color: GOLD }}>Story</span>?
            </h2>
            <p className="font-['Jost',sans-serif] text-white/55 text-[15px] lg:text-[16px] mb-8 lg:mb-10 leading-[28px]" style={{ fontWeight: 300 }}>
              Whether you're looking to partner with us, join our team, or simply learn more — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={navigateToContact} className="group h-[52px] lg:h-14 px-8 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
                Contact Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}