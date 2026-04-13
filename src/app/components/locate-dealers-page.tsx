import { useState, useMemo } from "react";
import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./micro-interactions";
import { MapPin, Phone, Clock, Star, Search, ChevronDown, Navigation, ArrowRight } from "lucide-react";
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

const HERO_BG = "https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const STORE_IMGS = [
  "https://images.unsplash.com/photo-1767351372193-0a475b494938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1675741954819-18ceaf53eb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1707328739134-7cf382e74fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
];

interface Dealer {
  id: number; name: string; type: "Flagship" | "Authorized" | "Premium";
  address: string; city: string; state: string; zip: string; phone: string;
  hours: string; rating: number; reviews: number; distance: string;
  lat: number; lng: number; img: number;
}

const DEALERS: Dealer[] = [
  { id: 1, name: "Teknas Paints — Downtown LA", type: "Flagship", address: "1247 S Grand Ave", city: "Los Angeles", state: "California", zip: "90015", phone: "(213) 555-0142", hours: "Mon–Sat: 8AM–8PM", rating: 4.9, reviews: 284, distance: "2.1 mi", lat: 34.04, lng: -118.26, img: 0 },
  { id: 2, name: "ColorCraft Supply Co.", type: "Authorized", address: "892 Market Street", city: "San Francisco", state: "California", zip: "94102", phone: "(415) 555-0198", hours: "Mon–Fri: 9AM–7PM", rating: 4.7, reviews: 156, distance: "5.8 mi", lat: 37.78, lng: -122.41, img: 1 },
  { id: 3, name: "ProPaint Warehouse", type: "Premium", address: "3401 E Foothill Blvd", city: "Pasadena", state: "California", zip: "91107", phone: "(626) 555-0277", hours: "Mon–Sat: 7AM–9PM", rating: 4.8, reviews: 203, distance: "8.3 mi", lat: 34.15, lng: -118.07, img: 2 },
  { id: 4, name: "Heritage Paint & Design", type: "Authorized", address: "5520 Whittier Blvd", city: "Whittier", state: "California", zip: "90601", phone: "(562) 555-0334", hours: "Mon–Sat: 8AM–6PM", rating: 4.6, reviews: 128, distance: "12.0 mi", lat: 33.98, lng: -118.03, img: 0 },
  { id: 5, name: "Teknas Paints — NYC Flagship", type: "Flagship", address: "420 Broadway", city: "New York", state: "New York", zip: "10013", phone: "(212) 555-0451", hours: "Mon–Sun: 9AM–9PM", rating: 4.9, reviews: 412, distance: "—", lat: 40.72, lng: -74.0, img: 1 },
  { id: 6, name: "Pacific Paint Emporium", type: "Premium", address: "1833 4th Ave", city: "San Diego", state: "California", zip: "92101", phone: "(619) 555-0189", hours: "Mon–Sat: 8AM–7PM", rating: 4.5, reviews: 97, distance: "120 mi", lat: 32.72, lng: -117.16, img: 2 },
  { id: 7, name: "Lone Star Coatings", type: "Authorized", address: "7100 Greenville Ave", city: "Dallas", state: "Texas", zip: "75231", phone: "(214) 555-0523", hours: "Mon–Fri: 8AM–6PM", rating: 4.7, reviews: 178, distance: "—", lat: 32.86, lng: -96.77, img: 0 },
  { id: 8, name: "Teknas Paints — Chicago", type: "Flagship", address: "233 N Michigan Ave", city: "Chicago", state: "Illinois", zip: "60601", phone: "(312) 555-0617", hours: "Mon–Sat: 8AM–8PM", rating: 4.8, reviews: 339, distance: "—", lat: 41.89, lng: -87.62, img: 1 },
  { id: 9, name: "Sunshine Paint Studio", type: "Premium", address: "1250 Collins Ave", city: "Miami Beach", state: "Florida", zip: "33139", phone: "(305) 555-0744", hours: "Mon–Sun: 9AM–8PM", rating: 4.6, reviews: 145, distance: "—", lat: 25.79, lng: -80.13, img: 2 },
  { id: 10, name: "Northwest Paint Hub", type: "Authorized", address: "1420 NW Lovejoy St", city: "Portland", state: "Oregon", zip: "97209", phone: "(503) 555-0832", hours: "Mon–Sat: 8AM–6PM", rating: 4.4, reviews: 89, distance: "—", lat: 45.53, lng: -122.69, img: 0 },
  { id: 11, name: "Desert Colors Supply", type: "Premium", address: "4402 N Scottsdale Rd", city: "Scottsdale", state: "Arizona", zip: "85251", phone: "(480) 555-0296", hours: "Mon–Sat: 7AM–7PM", rating: 4.7, reviews: 134, distance: "—", lat: 33.5, lng: -111.93, img: 1 },
  { id: 12, name: "Emerald City Paints", type: "Authorized", address: "2200 1st Ave", city: "Seattle", state: "Washington", zip: "98121", phone: "(206) 555-0413", hours: "Mon–Fri: 9AM–7PM", rating: 4.5, reviews: 112, distance: "—", lat: 47.61, lng: -122.35, img: 2 },
];

const STATES = [...new Set(DEALERS.map((d) => d.state))].sort();
const TYPES: Dealer["type"][] = ["Flagship", "Authorized", "Premium"];
const TYPE_COLORS: Record<Dealer["type"], { bg: string; text: string }> = {
  Flagship: { bg: AUBERGINE, text: GOLD },
  Authorized: { bg: SIENNA, text: "#fff" },
  Premium: { bg: COBALT, text: "#fff" },
};

function MiniMap({ dealers, selectedId, hoveredId, onSelect }: {
  dealers: Dealer[]; selectedId: number | null; hoveredId: number | null; onSelect: (id: number) => void;
}) {
  const minLat = 24, maxLat = 50, minLng = -125, maxLng = -66;
  const toPct = (lat: number, lng: number) => ({
    xPct: ((lng - minLng) / (maxLng - minLng)) * 100,
    yPct: (1 - (lat - minLat) / (maxLat - minLat)) * 100,
  });

  return (
    <div className="relative w-full rounded-[18px] overflow-hidden" style={{ aspectRatio: "16/10", backgroundColor: "#f2efe9" }}>
      <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" className="absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={(i * 1000) / 15} y1={0} x2={(i * 1000) / 15} y2={460} stroke="#e2ddd5" strokeWidth="1" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i * 460) / 9} x2={1000} y2={(i * 460) / 9} stroke="#e2ddd5" strokeWidth="1" />
        ))}
        <path d="M 112 110 L 180 90 L 250 85 L 340 80 L 430 82 L 510 85 L 590 90 L 670 95 L 740 110 L 790 130 L 840 120 L 890 130 L 910 170 L 900 220 L 880 280 L 860 310 L 820 340 L 790 350 L 720 340 L 660 330 L 590 310 L 530 320 L 460 340 L 390 350 L 330 340 L 260 310 L 220 290 L 170 300 L 120 310 L 80 280 L 65 230 L 72 180 L 90 140 Z" fill="#ede7dd" stroke="#c8bfb3" strokeWidth="2" />
      </svg>

      {dealers.map((d) => {
        const { xPct, yPct } = toPct(d.lat, d.lng);
        const isSel = selectedId === d.id;
        const isHov = hoveredId === d.id;
        const isHighlighted = isSel || isHov;
        return (
          <div key={d.id} className="absolute cursor-pointer" style={{ left: `${xPct}%`, top: `${yPct}%`, zIndex: isSel ? 30 : isHov ? 20 : 5, transform: `translate(-50%, -100%) ${isHighlighted ? "scale(1.4)" : "scale(1)"}`, transition: "transform 0.3s ease" }} onClick={() => onSelect(d.id)}>
            <svg width={24} height={30} viewBox="0 0 28 36" fill="none">
              <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0Z" fill={isSel ? AUBERGINE : d.type === "Flagship" ? SIENNA : COBALT} />
              <circle cx="14" cy="13" r="5" fill="white" fillOpacity="0.9" />
            </svg>
            {isHighlighted && (
              <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-white font-['Jost',sans-serif] text-[11px]" style={{ bottom: "calc(100% + 6px)", backgroundColor: AUBERGINE, boxShadow: "0 4px 16px rgba(0,0,0,0.2)", fontWeight: 500 }}>
                {d.name}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4px] w-2 h-2 rotate-45" style={{ backgroundColor: AUBERGINE }} />
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute bottom-3 right-3 flex gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        {TYPES.map((t) => (
          <div key={t} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: TYPE_COLORS[t].bg }} />
            <span className="font-['Jost',sans-serif] text-[11px]" style={{ color: `${AUBERGINE}88`, fontWeight: 400 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocateDealersPage() {
  const { navigateHome, navigateToContact } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");

  useSEO({
    title: "Find Teknas Paints Dealers Near You | 15,000+ Authorised Paint Stores",
    description: "Locate authorised Teknas Paints dealers, flagship showrooms, and premium retailers near you. 15,000+ dealer partners across 12 countries. Search by city, state, or pin code. Get store hours, directions, ratings, and phone numbers. Flagship stores in Los Angeles, New York, and Chicago.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Locate Teknas Paints Dealers",
        description: "Find authorised Teknas Paints dealers, flagship stores, and premium retailers near you. 15,000+ dealer partners worldwide.",
      },
      ...DEALERS.slice(0, 3).map(d => ({
        "@context": "https://schema.org" as const,
        "@type": "Store" as const,
        name: d.name,
        telephone: d.phone,
        address: { "@type": "PostalAddress" as const, streetAddress: d.address, addressLocality: d.city, addressRegion: d.state, postalCode: d.zip, addressCountry: "US" },
        geo: { "@type": "GeoCoordinates" as const, latitude: d.lat, longitude: d.lng },
        openingHours: d.hours,
        aggregateRating: { "@type": "AggregateRating" as const, ratingValue: d.rating, reviewCount: d.reviews },
      })),
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Locate Dealers", item: "https://www.teknaspaints.com/locate-dealers" },
        ],
      },
    ],
  });
  const [typeFilter, setTypeFilter] = useState<"All" | Dealer["type"]>("All");
  const [selectedDealerId, setSelectedDealerId] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [stateDropOpen, setStateDropOpen] = useState(false);

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((d) => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.zip.includes(searchTerm);
      const matchState = stateFilter === "All States" || d.state === stateFilter;
      const matchType = typeFilter === "All" || d.type === typeFilter;
      return matchSearch && matchState && matchType;
    });
  }, [searchTerm, stateFilter, typeFilter]);

  const handleSelect = (id: number) => setSelectedDealerId(selectedDealerId === id ? null : id);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 35vw, 400px)" }}>
        <ImageWithFallback src={HERO_BG} alt="Map hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${AUBERGINE}ee 0%, ${AUBERGINE}88 50%, ${AUBERGINE}33 100%)` }} />
        <div className={`relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Experience Eco Paints In Person</span>
            </div>
            <h1 className="font-['Jost',sans-serif] text-white text-[clamp(28px,4vw,52px)] max-w-[550px] mb-4" style={{ fontWeight: 600, lineHeight: 1.15 }}>
              Locate <span style={{ color: GOLD }}>Our Dealers</span>
            </h1>
            <p className="font-['Jost',sans-serif] text-white/65 text-[clamp(13px,1vw,16px)] max-w-[480px]" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              Find a Teknas Paints dealer near you and explore our full range of eco-friendly textured paints, low-VOC primers, and bio-solvent turpentine oils.
            </p>
            <div className="mt-5">
              <p className="font-['Jost',sans-serif] text-[14px] text-white/50" style={{ fontWeight: 300 }}>
                <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={navigateHome}>Home</span>
                <span className="mx-2">—</span>
                <span className="text-white/90">Locate Dealers</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SEARCH & FILTER ═══ */}
      <section className={`max-w-[1400px] mx-auto -mt-8 relative z-20 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="rounded-[18px] p-4 lg:p-5 flex flex-col md:flex-row gap-3" style={{ backgroundColor: "white", boxShadow: "0 8px 40px rgba(26,20,40,0.08)" }}>
            {/* Search */}
            <div className="flex items-center h-[48px] rounded-xl px-4 gap-2.5 flex-1" style={{ backgroundColor: CANVAS, border: `1.5px solid ${AUBERGINE}08` }}>
              <Search size={18} style={{ color: `${AUBERGINE}44` }} />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by city, state, or zip..." className="font-['Jost',sans-serif] text-[14px] bg-transparent border-none outline-none w-full" style={{ color: AUBERGINE, fontWeight: 400, caretColor: SIENNA }} />
            </div>
            {/* State dropdown */}
            <div className="relative w-full md:w-[200px]">
              <button onClick={() => setStateDropOpen(!stateDropOpen)} className="w-full h-[48px] px-4 rounded-xl flex items-center justify-between cursor-pointer font-['Jost',sans-serif] text-[14px] border-0" style={{ backgroundColor: CANVAS, color: AUBERGINE, fontWeight: 400 }}>
                {stateFilter}
                <ChevronDown size={16} style={{ color: `${AUBERGINE}55`, transform: stateDropOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
              </button>
              {stateDropOpen && (
                <div className="absolute top-[52px] left-0 w-full bg-white rounded-xl overflow-hidden z-50 max-h-[240px] overflow-y-auto" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <div className="px-4 py-2.5 cursor-pointer font-['Jost',sans-serif] text-[13px] hover:bg-[#f5f2ec] transition-colors" style={{ color: AUBERGINE, fontWeight: 400 }} onClick={() => { setStateFilter("All States"); setStateDropOpen(false); }}>All States</div>
                  {STATES.map((s) => (
                    <div key={s} className="px-4 py-2.5 cursor-pointer font-['Jost',sans-serif] text-[13px] hover:bg-[#f5f2ec] transition-colors" style={{ color: AUBERGINE, fontWeight: 400 }} onClick={() => { setStateFilter(s); setStateDropOpen(false); }}>{s}</div>
                  ))}
                </div>
              )}
            </div>
            {/* Type filters */}
            <div className="flex gap-2 flex-wrap">
              {(["All", ...TYPES] as const).map((t) => {
                const isActive = typeFilter === t;
                return (
                  <button key={t} onClick={() => setTypeFilter(t)} className="h-[40px] px-4 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[12px] transition-all duration-200" style={{ backgroundColor: isActive ? AUBERGINE : `${AUBERGINE}06`, color: isActive ? GOLD : "#595959", fontWeight: isActive ? 600 : 400 }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ RESULTS HEADER ═══ */}
      <section className={`max-w-[1400px] mx-auto mt-8 mb-6 ${SECTION_PX}`}>
        <div className="flex items-center justify-between">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Our Network</span>
            </div>
            <h2 className="font-['Jost',sans-serif] text-[clamp(24px,2.5vw,36px)]" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              All Dealer <span style={{ color: SIENNA }}>Locations</span>
            </h2>
          </ScrollReveal>
          <p className="font-['Jost',sans-serif] text-[13px] hidden sm:block" style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}>
            Showing <span style={{ fontWeight: 600, color: AUBERGINE }}>{filteredDealers.length}</span> dealer{filteredDealers.length !== 1 ? "s" : ""}
            {stateFilter !== "All States" && <span> in <span style={{ color: SIENNA }}>{stateFilter}</span></span>}
          </p>
        </div>
      </section>

      {/* ═══ MAP + CARDS ═══ */}
      <section className={`max-w-[1400px] mx-auto pb-16 lg:pb-20 ${SECTION_PX}`}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Map */}
          <ScrollReveal direction="left" className="w-full lg:w-[55%] xl:w-[60%]">
            <div className="sticky top-[140px]">
              <MiniMap dealers={filteredDealers} selectedId={selectedDealerId} hoveredId={hoveredCard} onSelect={handleSelect} />
            </div>
          </ScrollReveal>

          {/* Cards */}
          <ScrollReveal direction="right" className="flex-1">
            {filteredDealers.length === 0 ? (
              <div className="py-20 text-center">
                <MapPin size={48} style={{ color: `${AUBERGINE}25`, margin: "0 auto 16px" }} />
                <h3 className="font-['Jost',sans-serif] text-[18px] mb-2" style={{ color: AUBERGINE, fontWeight: 600 }}>No dealers found</h3>
                <p className="font-['Jost',sans-serif] text-[14px]" style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDealers.map((dealer, idx) => {
                  const isHov = hoveredCard === dealer.id;
                  const isSel = selectedDealerId === dealer.id;
                  const tc = TYPE_COLORS[dealer.type];
                  return (
                    <ScrollReveal key={dealer.id} delay={idx * 0.05}>
                      <div
                        className="rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 group"
                        style={{
                          backgroundColor: "white",
                          border: isSel ? `2px solid ${SIENNA}` : "2px solid transparent",
                          boxShadow: isHov || isSel ? `0 12px 40px ${SIENNA}12` : "0 2px 12px rgba(26,20,40,0.04)",
                          transform: isHov ? "translateY(-4px)" : "translateY(0)",
                        }}
                        onMouseEnter={() => setHoveredCard(dealer.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleSelect(dealer.id)}
                      >
                        {/* Image strip */}
                        <div className="relative h-[100px] sm:h-[120px] overflow-hidden">
                          <ImageWithFallback src={STORE_IMGS[dealer.img]} alt={dealer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${AUBERGINE}55 0%, transparent 50%)` }} />
                          <div className="absolute top-3 left-3 h-[24px] px-2.5 rounded-full flex items-center font-['Jost',sans-serif] text-[10px] tracking-[1px] uppercase" style={{ backgroundColor: tc.bg, color: tc.text, fontWeight: 600 }}>
                            {dealer.type}
                          </div>
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
                            <Star size={11} fill="#d4a24e" className="text-[#d4a24e]" />
                            <span className="font-['Jost',sans-serif] text-[11px]" style={{ color: AUBERGINE, fontWeight: 600 }}>{dealer.rating}</span>
                            <span className="font-['Jost',sans-serif] text-[10px]" style={{ color: `${AUBERGINE}55` }}>({dealer.reviews})</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 lg:p-5">
                          <h3 className="font-['Jost',sans-serif] text-[15px] lg:text-[16px] mb-2 group-hover:text-[#c75b3a] transition-colors" style={{ color: AUBERGINE, fontWeight: 600 }}>{dealer.name}</h3>
                          <div className="flex flex-col gap-1.5 mb-3">
                            <div className="flex items-start gap-2">
                              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: SIENNA }} />
                              <p className="font-['Jost',sans-serif] text-[13px] leading-[20px]" style={{ color: "#565656", fontWeight: 300 }}>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={13} style={{ color: SIENNA }} />
                              <p className="font-['Jost',sans-serif] text-[13px]" style={{ color: "#565656", fontWeight: 300 }}>{dealer.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={13} style={{ color: SIENNA }} />
                              <p className="font-['Jost',sans-serif] text-[13px]" style={{ color: "#565656", fontWeight: 300 }}>{dealer.hours}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${AUBERGINE}08` }}>
                            <div className="flex items-center gap-1.5">
                              <Navigation size={13} style={{ color: SIENNA }} />
                              <span className="font-['Jost',sans-serif] text-[13px]" style={{ color: SIENNA, fontWeight: 600 }}>{dealer.distance}</span>
                            </div>
                            <button className="flex items-center gap-1.5 h-[32px] px-4 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[11px] tracking-[1px] uppercase text-white transition-all duration-200 hover:brightness-110" style={{ fontWeight: 600, backgroundColor: SIENNA }} onClick={(e) => e.stopPropagation()}>
                              <Navigation size={12} /> Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 lg:py-20 xl:py-[100px] relative overflow-hidden" style={{ backgroundColor: DEEP_FOREST }}>
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${SIENNA}, transparent 70%)` }} />
        <div className={`max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 ${SECTION_PX} relative z-10`}>
          <div>
            <h2 className="font-['Jost',sans-serif] text-white text-[clamp(22px,2.5vw,36px)] mb-2" style={{ fontWeight: 600, lineHeight: 1.2 }}>
              Can't Find a Dealer <span style={{ color: GOLD }}>Nearby</span>?
            </h2>
            <p className="font-['Jost',sans-serif] text-[14px] lg:text-[15px] text-white/50 max-w-[500px]" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              We're always expanding our network. Contact us to inquire about becoming an authorised dealer or to find the closest location.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={navigateToContact} className="group h-[52px] px-8 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
              Contact Us <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="h-[52px] px-8 rounded-full cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 500, backgroundColor: "transparent", border: `1.5px solid ${GOLD}50` }}>
              Shop Online
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}