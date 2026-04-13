import { useNavigation } from "./navigation-context";
import { ScrollReveal } from "./micro-interactions";
import { Download, TrendingUp, FileText, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useSEO } from "./use-seo";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const CANVAS = "#f5f2ec";
const DEEP_FOREST = "#04150b";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

const FINANCIALS = [
  { label: "Revenue (FY25)", value: "₹8,420 Cr", change: "+14.2%", up: true, detail: "Strong growth driven by premium product mix and 22% volume increase in eco-friendly emulsions segment." },
  { label: "EBITDA Margin", value: "22.8%", change: "+1.6%", up: true, detail: "Margin expansion from operational efficiency, backward integration of key raw materials, and improved product mix." },
  { label: "Net Profit", value: "₹1,180 Cr", change: "+18.5%", up: true, detail: "Highest-ever quarterly profit. PAT margin improved to 14.0% supported by lower input costs and premiumisation." },
  { label: "Market Cap", value: "₹42,500 Cr", change: "+23.1%", up: true, detail: "Outperformed BSE Sensex by 11.4%. Price-to-earnings ratio of 35.8x reflects premium positioning in eco-paints." },
];

const REPORTS = [
  { title: "Annual Report 2024-25", date: "Apr 2025", type: "PDF", size: "12.4 MB" },
  { title: "Q3 FY25 Investor Presentation", date: "Jan 2025", type: "PDF", size: "8.2 MB" },
  { title: "Q2 FY25 Results & Analysis", date: "Oct 2024", type: "PDF", size: "5.6 MB" },
  { title: "Sustainability Report 2024", date: "Sep 2024", type: "PDF", size: "15.1 MB" },
  { title: "Q1 FY25 Investor Presentation", date: "Jul 2024", type: "PDF", size: "7.8 MB" },
  { title: "Annual Report 2023-24", date: "Apr 2024", type: "PDF", size: "11.9 MB" },
];

const EVENTS = [
  { title: "Q4 FY26 Earnings Call", date: "May 15, 2026", time: "3:00 PM IST" },
  { title: "Annual General Meeting", date: "Jul 22, 2026", time: "11:00 AM IST" },
  { title: "Investor Day 2026", date: "Sep 10, 2026", time: "10:00 AM IST" },
];

const STOCK_INFO = {
  exchange: "BSE: 540678 | NSE: TEKPAINT",
  price: "₹2,845.60",
  change: "+₹34.20 (+1.22%)",
  weekRange: "₹2,150 – ₹2,920",
  pe: "35.8x",
  dividend: "₹18.50",
};

export function InvestorsPage() {
  const { navigateToContact } = useNavigation();

  useSEO({
    title: "Investor Relations | Teknas Paints — BSE: 540678 | NSE: TEKPAINT — Annual Reports & Financials",
    description: "Teknas Paints investor relations: Revenue Rs 8,420 Cr (+14.2% YoY), EBITDA margin 22.8%, net profit Rs 1,180 Cr (+18.5%), market cap Rs 42,500 Cr. Download annual reports, quarterly results, and sustainability reports. Upcoming Q4 FY26 earnings call May 15, 2026. BSE: 540678 | NSE: TEKPAINT.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Teknas Paints — Investor Relations",
        description: "Financial performance, annual reports, quarterly results, sustainability reports, and investor events for Teknas Paints Limited (BSE: 540678, NSE: TEKPAINT). Revenue Rs 8,420 Cr FY25.",
        mainEntity: {
          "@type": "Corporation",
          name: "Teknas Paints Limited",
          tickerSymbol: "TEKPAINT",
          exchange: "NSE",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 4200 },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Investor Relations", item: "https://www.teknaspaints.com/investors" },
        ],
      },
    ],
  });

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
      {/* Hero */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-24 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Investor Relations</span>
          </div>
          <h1 className="font-['Jost',sans-serif] text-[clamp(32px,4.5vw,56px)] mb-4" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.15 }}>
            Building Long-Term <span style={{ color: SIENNA }}>Value</span>
          </h1>
          <p className="font-['Jost',sans-serif] text-[clamp(14px,1.1vw,17px)] max-w-[600px]" style={{ color: "#464646", fontWeight: 300, lineHeight: 1.75 }}>
            Delivering consistent growth and shareholder returns through innovation, operational excellence, and strategic market expansion.
          </p>
        </ScrollReveal>
      </section>

      {/* Stock Info Card */}
      <section className={`max-w-[1400px] mx-auto pb-16 ${SECTION_PX}`}>
        <ScrollReveal direction="scale">
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: AUBERGINE }}>
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="font-['Jost',sans-serif] text-[12px] tracking-[3px] text-white/40 uppercase mb-2" style={{ fontWeight: 400 }}>{STOCK_INFO.exchange}</p>
                  <div className="flex items-baseline gap-4">
                    <span className="font-['Jost',sans-serif] text-[clamp(32px,3.5vw,48px)] text-white" style={{ fontWeight: 600 }}>{STOCK_INFO.price}</span>
                    <span className="font-['Jost',sans-serif] text-[16px] flex items-center gap-1" style={{ color: "#4ade80", fontWeight: 500 }}>
                      <TrendingUp size={16} /> {STOCK_INFO.change}
                    </span>
                  </div>
                </div>
                <div className="flex gap-8 text-white/60 font-['Jost',sans-serif] text-[13px]" style={{ fontWeight: 300 }}>
                  <div><span className="block text-white/30 text-[11px] tracking-[2px] uppercase mb-1">P/E Ratio</span>{STOCK_INFO.pe}</div>
                  <div><span className="block text-white/30 text-[11px] tracking-[2px] uppercase mb-1">Dividend</span>{STOCK_INFO.dividend}</div>
                  <div><span className="block text-white/30 text-[11px] tracking-[2px] uppercase mb-1">52W Range</span>{STOCK_INFO.weekRange}</div>
                </div>
              </div>
              <div className="w-full h-[120px] md:h-[180px] rounded-xl flex items-end px-2 gap-[2px]" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                {Array.from({ length: 60 }, (_, i) => {
                  const h = 30 + Math.sin(i * 0.15) * 20 + Math.random() * 25 + i * 0.8;
                  return (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${Math.min(h, 95)}%`, backgroundColor: i > 55 ? `${GOLD}cc` : `${GOLD}30` }} />
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Key Financials */}
      <section className={`max-w-[1400px] mx-auto pb-16 lg:pb-20 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Performance</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-10 lg:mb-12" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Key <span style={{ color: GOLD }}>Financials</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {FINANCIALS.map((f, i) => (
            <ScrollReveal key={f.label} delay={i * 0.1}>
              <div className="p-6 lg:p-7 rounded-[18px] transition-all duration-400 hover:-translate-y-[6px] hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)]" style={{ backgroundColor: "white", border: "1px solid rgba(26,20,40,0.06)" }}>
                <p className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase mb-3" style={{ color: `${AUBERGINE}55`, fontWeight: 400 }}>{f.label}</p>
                <p className="font-['Jost',sans-serif] text-[clamp(22px,2vw,32px)]" style={{ color: AUBERGINE, fontWeight: 600 }}>{f.value}</p>
                <span className="font-['Jost',sans-serif] text-[13px] flex items-center gap-1 mt-1" style={{ color: "#4ade80", fontWeight: 500 }}>
                  <TrendingUp size={13} /> {f.change}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Reports & Downloads */}
      <section className="py-16 lg:py-20 xl:py-[100px]" style={{ backgroundColor: "white" }}>
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Documents</span>
            </div>
            <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-10 lg:mb-12" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
              Reports & <span style={{ color: SIENNA }}>Downloads</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {REPORTS.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.06}>
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 lg:p-6 rounded-[14px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
                  style={{ backgroundColor: CANVAS, border: "1px solid transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${GOLD}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <div className="flex items-center gap-4 flex-1 mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${SIENNA}10`, color: SIENNA }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <h3 className="font-['Jost',sans-serif] text-[15px] group-hover:text-[#c75b3a] transition-colors" style={{ color: AUBERGINE, fontWeight: 600 }}>{r.title}</h3>
                      <p className="font-['Jost',sans-serif] text-[12px] mt-0.5" style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}>{r.date} · {r.type} · {r.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 h-[36px] px-5 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase transition-all duration-200 hover:brightness-110 shrink-0" style={{ backgroundColor: `${GOLD}12`, color: GOLD, fontWeight: 600 }}>
                    <Download size={14} /> Download
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className={`max-w-[1400px] mx-auto py-16 lg:py-20 ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: GOLD }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: GOLD, fontWeight: 500 }}>Calendar</span>
          </div>
          <h2 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-10 lg:mb-12" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Upcoming <span style={{ color: GOLD }}>Events</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {EVENTS.map((e, i) => (
            <ScrollReveal key={e.title} delay={i * 0.1}>
              <div className="p-6 lg:p-7 rounded-[18px] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)] cursor-pointer" style={{ backgroundColor: "white", border: `1px solid ${GOLD}15` }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: "#4ade80" }} />
                  <span className="font-['Jost',sans-serif] text-[11px] tracking-[2px] uppercase" style={{ color: "#4ade80", fontWeight: 500 }}>Upcoming</span>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GOLD}10`, color: GOLD }}>
                  <Calendar size={20} />
                </div>
                <h3 className="font-['Jost',sans-serif] text-[16px] lg:text-[18px] mb-2" style={{ color: AUBERGINE, fontWeight: 600 }}>{e.title}</h3>
                <p className="font-['Jost',sans-serif] text-[13px]" style={{ color: `${AUBERGINE}66`, fontWeight: 400 }}>{e.date} · {e.time}</p>
                <button className="flex items-center gap-1.5 mt-5 font-['Jost',sans-serif] text-[13px] tracking-[1px] uppercase border-0 bg-transparent cursor-pointer p-0 transition-colors hover:brightness-110" style={{ color: SIENNA, fontWeight: 600 }}>
                  Set Reminder <ExternalLink size={13} />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact IR CTA */}
      <section className="py-16 lg:py-20 xl:py-[100px] relative overflow-hidden" style={{ backgroundColor: DEEP_FOREST }}>
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }} />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-['Jost',sans-serif] text-white text-[clamp(24px,3vw,40px)] mb-4" style={{ fontWeight: 600, lineHeight: 1.16 }}>
              Investor <span style={{ color: GOLD }}>Queries</span>?
            </h2>
            <p className="font-['Jost',sans-serif] text-white/55 text-[15px] lg:text-[16px] mb-8 leading-[28px]" style={{ fontWeight: 300 }}>
              For any investor-related queries, reach out to our dedicated Investor Relations team.
            </p>
            <button onClick={navigateToContact} className="group h-[52px] lg:h-14 px-8 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 mx-auto transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
              Contact IR Team <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}