import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./micro-interactions";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Send,
} from "lucide-react";
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
const SECTION_PX =
  "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

const HERO_BG =
  "https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const FORM_BG =
  "https://images.unsplash.com/photo-1581079289103-0544b7dfad66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

const CONTACT_CARDS = [
  {
    icon: <MapPin size={26} />,
    title: "Visit Us",
    lines: [
      "Teknas Paints HQ, Industrial Area,",
      "Hyderabad, India",
    ],
  },
  {
    icon: <Phone size={26} />,
    title: "Call Us",
    lines: ["+91 1800-123-4567", "+91 40 2345 6789"],
  },
  {
    icon: <Mail size={26} />,
    title: "Email Us",
    lines: [
      "support@teknaspaints.com",
      "sales@teknaspaints.com",
    ],
  },
  {
    icon: <Clock size={26} />,
    title: "Business Hours",
    lines: [
      "Mon – Fri: 9:00 AM – 6:00 PM",
      "Sat: 9:00 AM – 2:00 PM",
    ],
  },
];

const FAQS = [
  {
    q: "What makes Teknas Paints eco-friendly?",
    a: "Every Teknas product uses plant-derived binders, natural mineral pigments, and near-zero VOC formulations. Our paints are GREENGUARD Gold certified and exceed EPA standards, ensuring cleaner indoor air for your family and workspace.",
  },
  {
    q: "Are your low-VOC primers safe for nurseries and hospitals?",
    a: "Absolutely. Our Eco Primax line emits less than 5 g/L VOC — well below the EPA threshold. They are approved for use in sensitive environments including nurseries, healthcare facilities, and LEED-certified buildings.",
  },
  {
    q: "Do you offer bulk or contractor pricing?",
    a: "Yes! We offer special pricing for green-building contractors, architects, and bulk orders. Share your project details through our contact form and we will prepare a custom sustainable coatings quote.",
  },
  {
    q: "How does Eco Turpentine Oil differ from conventional turpentine?",
    a: "Eco Turp is derived from renewable plant sources instead of petroleum distillates. It delivers the same solvent power for thinning and brush cleaning, with significantly lower toxicity, reduced odour, and a 60% smaller carbon footprint.",
  },
  {
    q: "Where can I find Teknas eco-friendly paints near me?",
    a: "Use our Locate Dealers page to find the nearest authorised dealer, flagship store, or premium retailer. We have 15,000+ dealer partners across 12 countries carrying our full sustainable product range.",
  },
  {
    q: "What certifications do your products carry?",
    a: "Our products carry GREENGUARD Gold, EPA Safer Choice, and ISO 14001 certifications. Our manufacturing facility is ISO 9001:2015 certified and operates a closed-loop water recycling system that recovers 94% of process water.",
  },
];

const SUBJECTS = [
  "General Inquiry",
  "Product Information",
  "Bulk / Contractor Quote",
  "Colour Consultation",
  "Warranty & Returns",
  "Partnership Inquiry",
];

export function ContactPage() {
  const {
    navigateHome,
    navigateToDealers,
    navigateToProducts,
  } = useNavigation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(
    null,
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title:
      "Contact Teknas Paints | Get Expert Advice on Eco-Friendly Paints & Coatings",
    description:
      "Contact Teknas Paints for expert advice on eco-friendly textured paints, low-VOC primers, and sustainable coatings. Visit our Hyderabad HQ, call +91 1800-123-4567, or email support@teknaspaints.com. Bulk contractor pricing, colour consultation, and warranty support. Response within 24 hours.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Teknas Paints",
        mainEntity: {
          "@type": "LocalBusiness",
          name: "Teknas Paints",
          telephone: "+91-1800-123-4567",
          email: "support@teknaspaints.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Industrial Area",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500032",
            addressCountry: "IN",
          },
          openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
          geo: {
            "@type": "GeoCoordinates",
            latitude: "17.3850",
            longitude: "78.4867",
          },
          priceRange: "₹₹",
          image: "https://www.teknaspaints.com/office.jpg",
          areaServed: { "@type": "Country", name: "India" },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.teknaspaints.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "https://www.teknaspaints.com/contact",
          },
        ],
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours.",
      );
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1500);
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: CANVAS, paddingTop: 130 }}
    >
      <Toaster position="top-right" richColors />

      {/* ═══ HERO ═══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(320px, 45vw, 500px)" }}
      >
        <ImageWithFallback
          src={HERO_BG}
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${AUBERGINE}ee 0%, ${AUBERGINE}88 50%, ${AUBERGINE}33 100%)`,
          }}
        />
        <div
          className={`relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto ${SECTION_PX}`}
        >
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: GOLD }}
              />
              <span
                className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase"
                style={{ color: GOLD, fontWeight: 500 }}
              >
                Talk to Our Experts
              </span>
            </div>
            <h1
              className="font-['Fira_Sans',sans-serif] text-white text-[clamp(32px,4.5vw,56px)] max-w-[600px] mb-4"
              style={{ fontWeight: 600, lineHeight: 1.15 }}
            >
              Get in <span style={{ color: GOLD }}>Touch</span>
            </h1>
            <p
              className="font-['Fira_Sans',sans-serif] text-white/70 text-[clamp(14px,1.1vw,17px)] max-w-[520px]"
              style={{ fontWeight: 300, lineHeight: 1.75 }}
            >
              Questions about low-VOC primers, eco textured
              paints, or sustainable coatings for your next
              project? Our specialists respond within 24 hours.
            </p>
            {/* Breadcrumb */}
            <div className="mt-6">
              <p
                className="font-['Fira_Sans',sans-serif] text-[14px] text-white/50"
                style={{ fontWeight: 300 }}
              >
                <span
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={navigateHome}
                >
                  Home
                </span>
                <span className="mx-2">—</span>
                <span className="text-white/90">
                  Contact Us
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CONTACT INFO CARDS ═══ */}
      <section
        className={`max-w-[1400px] mx-auto -mt-10 relative z-20 ${SECTION_PX}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {CONTACT_CARDS.map((card, i) => {
            const isHov = hoveredCard === i;
            return (
              <ScrollReveal key={card.title} delay={i * 0.08}>
                <div
                  className="flex flex-col items-center text-center rounded-[18px] p-6 lg:p-7 transition-all duration-400 cursor-default"
                  style={{
                    backgroundColor: isHov
                      ? AUBERGINE
                      : "white",
                    transform: isHov
                      ? "translateY(-6px)"
                      : "translateY(0)",
                    boxShadow: isHov
                      ? "0 16px 60px rgba(0,0,0,0.12)"
                      : "0 4px 20px rgba(26,20,40,0.06)",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-4 transition-colors duration-400"
                    style={{
                      backgroundColor: isHov
                        ? SIENNA
                        : `${SIENNA}10`,
                      color: isHov ? GOLD : SIENNA,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="font-['Fira_Sans',sans-serif] text-[18px] lg:text-[20px] mb-2 transition-colors duration-400"
                    style={{
                      color: isHov ? "white" : AUBERGINE,
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="font-['Fira_Sans',sans-serif] text-[14px] leading-[23px] transition-colors duration-400"
                      style={{
                        color: isHov
                          ? "rgba(255,255,255,0.65)"
                          : "#565656",
                        fontWeight: 300,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══ CONTACT FORM + SIDEBAR ═══ */}
      <section
        className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">
          {/* LEFT — Form */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: SIENNA }}
              />
              <span
                className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase"
                style={{ color: SIENNA, fontWeight: 500 }}
              >
                Send a Message
              </span>
            </div>
            <h2
              className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-3"
              style={{
                color: AUBERGINE,
                fontWeight: 600,
                lineHeight: 1.16,
              }}
            >
              How Can We{" "}
              <span style={{ color: SIENNA }}>Help</span>?
            </h2>
            <p
              className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[28px] mb-8 lg:mb-10 max-w-[600px]"
              style={{ color: "#464646", fontWeight: 300 }}
            >
              Whether you need guidance on low-VOC primers, eco
              textured paints, or bulk pricing — fill out the
              form below and a specialist will respond within 24
              hours.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Name row */}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label
                    className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                    style={{
                      color: `${AUBERGINE}66`,
                      fontWeight: 500,
                    }}
                  >
                    First Name{" "}
                    <span style={{ color: SIENNA }}>*</span>
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full h-[48px] px-4 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors placeholder:text-[#bbb]"
                    style={{
                      backgroundColor: CANVAS,
                      color: AUBERGINE,
                      fontWeight: 400,
                      caretColor: SIENNA,
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                    style={{
                      color: `${AUBERGINE}66`,
                      fontWeight: 500,
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full h-[48px] px-4 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors placeholder:text-[#bbb]"
                    style={{
                      backgroundColor: CANVAS,
                      color: AUBERGINE,
                      fontWeight: 400,
                      caretColor: SIENNA,
                    }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label
                    className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                    style={{
                      color: `${AUBERGINE}66`,
                      fontWeight: 500,
                    }}
                  >
                    Email Address{" "}
                    <span style={{ color: SIENNA }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full h-[48px] px-4 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors placeholder:text-[#bbb]"
                    style={{
                      backgroundColor: CANVAS,
                      color: AUBERGINE,
                      fontWeight: 400,
                      caretColor: SIENNA,
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                    style={{
                      color: `${AUBERGINE}66`,
                      fontWeight: 500,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full h-[48px] px-4 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors placeholder:text-[#bbb]"
                    style={{
                      backgroundColor: CANVAS,
                      color: AUBERGINE,
                      fontWeight: 400,
                      caretColor: SIENNA,
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                  style={{
                    color: `${AUBERGINE}66`,
                    fontWeight: 500,
                  }}
                >
                  Subject
                </label>
                <div className="relative">
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full h-[48px] px-4 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors cursor-pointer appearance-none pr-10"
                    style={{
                      backgroundColor: CANVAS,
                      color: AUBERGINE,
                      fontWeight: 400,
                    }}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: `${AUBERGINE}55` }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block font-['Fira_Sans',sans-serif] text-[12px] tracking-[2px] uppercase mb-2"
                  style={{
                    color: `${AUBERGINE}66`,
                    fontWeight: 500,
                  }}
                >
                  Your Message{" "}
                  <span style={{ color: SIENNA }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or question..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-[1.5px] border-transparent focus:border-[#c75b3a] outline-none font-['Fira_Sans',sans-serif] text-[14px] transition-colors resize-none placeholder:text-[#bbb]"
                  style={{
                    backgroundColor: CANVAS,
                    color: AUBERGINE,
                    fontWeight: 400,
                    caretColor: SIENNA,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group self-start h-[52px] lg:h-14 px-8 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 uppercase disabled:opacity-60"
                style={{
                  fontWeight: 600,
                  backgroundColor: SIENNA,
                  boxShadow: `0 4px 16px ${SIENNA}30`,
                }}
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message{" "}
                    <Send
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* RIGHT — Image + Quick Links */}
          <ScrollReveal
            direction="right"
            className="lg:w-[400px] xl:w-[460px] shrink-0"
          >
            {/* Image block */}
            <div
              className="relative rounded-[18px] overflow-hidden mb-6"
              style={{ height: "clamp(240px, 30vw, 360px)" }}
            >
              <ImageWithFallback
                src={FORM_BG}
                alt="Colour swatches"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${AUBERGINE}dd 10%, ${AUBERGINE}33 70%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3
                  className="font-['Fira_Sans',sans-serif] text-[clamp(18px,1.5vw,24px)] text-white mb-2"
                  style={{ fontWeight: 600, lineHeight: 1.3 }}
                >
                  Need Sustainable Coatings Advice?
                </h3>
                <p
                  className="font-['Fira_Sans',sans-serif] text-[14px] text-white/65 leading-[23px]"
                  style={{ fontWeight: 300 }}
                >
                  Our green-building consultants offer free
                  guidance on low-VOC primers, eco textured
                  paints, and sustainable project specs.
                </p>
              </div>
            </div>

            {/* Quick links card */}
            <div
              className="rounded-[18px] p-6 lg:p-8"
              style={{ backgroundColor: AUBERGINE }}
            >
              <h3
                className="font-['Fira_Sans',sans-serif] text-[18px] lg:text-[20px] text-white mb-5 lg:mb-6"
                style={{ fontWeight: 600 }}
              >
                Quick Links
              </h3>
              {[
                {
                  label: "Find a Dealer Near You",
                  action: navigateToDealers,
                },
                {
                  label: "View Our Product Range",
                  action: navigateToProducts,
                },
                {
                  label: "Request a Custom Quote",
                  action: () => {},
                },
                {
                  label: "Schedule a Consultation",
                  action: () => {},
                },
              ].map((link) => (
                <div
                  key={link.label}
                  className="flex items-center gap-3.5 py-3.5 cursor-pointer group"
                  style={{
                    borderBottom:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                  onClick={link.action}
                >
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#c75b3a]"
                    style={{ backgroundColor: `${SIENNA}30` }}
                  >
                    <ArrowRight
                      size={16}
                      style={{ color: GOLD }}
                    />
                  </div>
                  <span
                    className="font-['Fira_Sans',sans-serif] text-[14px] text-white/65 group-hover:text-white transition-colors duration-300"
                    style={{ fontWeight: 400 }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: GOLD }}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MAP PLACEHOLDER ═══ */}
      <section
        className="py-16 lg:py-20 xl:py-[100px]"
        style={{ backgroundColor: "white" }}
      >
        <div className={`max-w-[1400px] mx-auto ${SECTION_PX}`}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: COBALT }}
              />
              <span
                className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase"
                style={{ color: COBALT, fontWeight: 500 }}
              >
                Find Us
              </span>
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: COBALT }}
              />
            </div>
            <h2
              className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] text-center mb-10 lg:mb-12"
              style={{
                color: AUBERGINE,
                fontWeight: 600,
                lineHeight: 1.16,
              }}
            >
              Our{" "}
              <span style={{ color: COBALT }}>
                Headquarters
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div
              className="relative rounded-[20px] overflow-hidden"
              style={{
                height: "clamp(260px, 30vw, 420px)",
                backgroundColor: "#ede7dd",
              }}
            >
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-40">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`v${i}`}
                    className="absolute top-0 bottom-0 w-[1px]"
                    style={{
                      left: `${(i / 19) * 100}%`,
                      backgroundColor: "#d5cec4",
                    }}
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`h${i}`}
                    className="absolute left-0 right-0 h-[1px]"
                    style={{
                      top: `${(i / 11) * 100}%`,
                      backgroundColor: "#d5cec4",
                    }}
                  />
                ))}
              </div>
              {/* Roads */}
              <div
                className="absolute left-0 right-0 h-[3px] top-[48%]"
                style={{ backgroundColor: "#c8bfb3" }}
              />
              <div
                className="absolute left-0 right-0 h-[2px] top-[66%]"
                style={{ backgroundColor: "#c8bfb3" }}
              />
              <div
                className="absolute top-0 bottom-0 w-[3px] left-[50%]"
                style={{ backgroundColor: "#c8bfb3" }}
              />
              <div
                className="absolute top-0 bottom-0 w-[2px] left-[26%]"
                style={{ backgroundColor: "#c8bfb3" }}
              />
              <div
                className="absolute top-0 bottom-0 w-[2px] left-[72%]"
                style={{ backgroundColor: "#c8bfb3" }}
              />
              {/* Blocks */}
              <div
                className="absolute rounded-[4px]"
                style={{
                  top: "24%",
                  left: "28%",
                  width: "20%",
                  height: "20%",
                  backgroundColor: "#ddd6cc",
                }}
              />
              <div
                className="absolute rounded-[4px]"
                style={{
                  top: "24%",
                  left: "52%",
                  width: "18%",
                  height: "20%",
                  backgroundColor: "#ddd6cc",
                }}
              />
              <div
                className="absolute rounded-[4px]"
                style={{
                  top: "52%",
                  left: "28%",
                  width: "20%",
                  height: "12%",
                  backgroundColor: "#ddd6cc",
                }}
              />
              <div
                className="absolute rounded-[4px]"
                style={{
                  top: "70%",
                  left: "28%",
                  width: "20%",
                  height: "18%",
                  backgroundColor: "#ddd6cc",
                }}
              />

              {/* Pin */}
              <div
                className="absolute"
                style={{ left: "48%", top: "32%" }}
              >
                <div className="relative">
                  <svg
                    width="48"
                    height="60"
                    viewBox="0 0 28 36"
                    fill="none"
                  >
                    <path
                      d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0Z"
                      fill={AUBERGINE}
                    />
                    <circle cx="14" cy="13" r="5" fill={GOLD} />
                  </svg>
                  <div
                    className="absolute rounded-full animate-ping"
                    style={{
                      width: 56,
                      height: 56,
                      top: -4,
                      left: -4,
                      backgroundColor: `${SIENNA}20`,
                      animationDuration: "2s",
                    }}
                  />
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2.5 rounded-[10px] text-white font-['Fira_Sans',sans-serif] text-[13px]"
                  style={{
                    bottom: "calc(100% + 14px)",
                    backgroundColor: AUBERGINE,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    fontWeight: 500,
                  }}
                >
                  Teknas Paints HQ
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-[10px] h-[10px] rotate-45"
                    style={{ backgroundColor: AUBERGINE }}
                  />
                </div>
              </div>

              {/* Address overlay */}
              <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 bg-white rounded-[14px] px-5 lg:px-6 py-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${SIENNA}10`,
                    color: SIENNA,
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <p
                    className="font-['Fira_Sans',sans-serif] text-[15px] hidden sm:block"
                    style={{
                      color: AUBERGINE,
                      fontWeight: 600,
                    }}
                  >
                    Teknas Paints HQ
                  </p>
                  <p
                    className="font-['Fira_Sans',sans-serif] text-[13px]"
                    style={{
                      color: "#595959",
                      fontWeight: 300,
                    }}
                  >
                    Industrial Area, Hyderabad, India
                  </p>
                </div>
                <button
                  className="hidden md:flex h-[36px] px-5 rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[12px] tracking-[1px] uppercase text-white items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 ml-2 shrink-0"
                  style={{
                    fontWeight: 600,
                    backgroundColor: SIENNA,
                  }}
                >
                  Get Directions
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section
        className={`max-w-[1400px] mx-auto py-16 lg:py-20 xl:py-[100px] ${SECTION_PX}`}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">
          {/* Left header */}
          <ScrollReveal
            direction="left"
            className="lg:w-[360px] xl:w-[400px] shrink-0"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: SIENNA }}
              />
              <span
                className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase"
                style={{ color: SIENNA, fontWeight: 500 }}
              >
                Common Questions
              </span>
            </div>
            <h2
              className="font-['Fira_Sans',sans-serif] text-[clamp(28px,3.5vw,48px)] mb-5"
              style={{
                color: AUBERGINE,
                fontWeight: 600,
                lineHeight: 1.16,
              }}
            >
              Frequently{" "}
              <span style={{ color: SIENNA }}>
                Asked Questions
              </span>
            </h2>
            <p
              className="font-['Fira_Sans',sans-serif] text-[15px] leading-[26px] mb-8"
              style={{ color: "#464646", fontWeight: 300 }}
            >
              Can't find what you're looking for? Send us a
              message using the form above and we'll get back to
              you promptly.
            </p>

            <div
              className="rounded-[18px] p-6 lg:p-7"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(26,20,40,0.06)",
              }}
            >
              <h3
                className="font-['Fira_Sans',sans-serif] text-[18px] mb-2"
                style={{ color: AUBERGINE, fontWeight: 600 }}
              >
                Still have questions?
              </h3>
              <p
                className="font-['Fira_Sans',sans-serif] text-[13px] mb-4"
                style={{ color: "#595959", fontWeight: 300 }}
              >
                Our team is available Mon–Sat, 9AM–6PM IST.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: SIENNA,
                    color: GOLD,
                  }}
                >
                  <Phone size={16} />
                </div>
                <span
                  className="font-['Fira_Sans',sans-serif] text-[15px]"
                  style={{ color: AUBERGINE, fontWeight: 600 }}
                >
                  +91 1800-123-4567
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right accordion */}
          <ScrollReveal direction="right" className="flex-1">
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-[14px] overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: isOpen
                        ? AUBERGINE
                        : "white",
                      border: isOpen
                        ? "none"
                        : "1px solid rgba(26,20,40,0.06)",
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(isOpen ? null : i)
                      }
                      className="w-full flex items-center justify-between px-5 lg:px-6 py-4 lg:py-5 cursor-pointer text-left border-0 bg-transparent"
                    >
                      <span
                        className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] leading-[24px] transition-colors duration-300 pr-4"
                        style={{
                          color: isOpen ? "white" : AUBERGINE,
                          fontWeight: 500,
                        }}
                      >
                        {faq.q}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isOpen
                            ? SIENNA
                            : CANVAS,
                        }}
                      >
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-300"
                          style={{
                            color: isOpen ? GOLD : SIENNA,
                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          }}
                        />
                      </div>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{
                        maxHeight: isOpen ? 200 : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="px-5 lg:px-6 pb-5">
                        <p
                          className="font-['Fira_Sans',sans-serif] text-[14px] leading-[24px]"
                          style={{
                            color: "rgba(255,255,255,0.65)",
                            fontWeight: 300,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA ═══ */}
      <section
        className="py-16 lg:py-20 xl:py-[100px] relative overflow-hidden"
        style={{ backgroundColor: DEEP_FOREST }}
      >
        <div
          className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${GOLD}, transparent 70%)`,
          }}
        />
        <div
          className={`max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 ${SECTION_PX} relative z-10`}
        >
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-9 h-[2px]"
                style={{ backgroundColor: GOLD }}
              />
              <span
                className="font-['Fira_Sans',sans-serif] text-[13px] tracking-[4px] uppercase"
                style={{ color: GOLD, fontWeight: 500 }}
              >
                Stay Updated
              </span>
            </div>
            <h2
              className="font-['Fira_Sans',sans-serif] text-[clamp(22px,2.5vw,36px)] text-white mb-2"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              Join Our Eco-Paint{" "}
              <span style={{ color: GOLD }}>Community</span>
            </h2>
            <p
              className="font-['Fira_Sans',sans-serif] text-[14px] lg:text-[15px] text-white/50 max-w-[480px]"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              Get sustainability tips, new eco-product
              announcements, and exclusive offers delivered to
              your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full lg:w-[320px] xl:w-[360px] h-[52px] px-5 rounded-xl bg-white/10 border-[1.5px] border-white/15 focus:border-[#d4a24e] outline-none font-['Fira_Sans',sans-serif] text-[14px] text-white placeholder:text-white/40 transition-colors"
              style={{ caretColor: GOLD, fontWeight: 400 }}
            />
            <button
              onClick={() =>
                toast.success(
                  "Subscribed! Welcome to the Teknas Paints community.",
                )
              }
              className="h-[52px] px-6 lg:px-7 rounded-xl border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-[13px] tracking-[1px] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 shrink-0"
              style={{
                fontWeight: 600,
                backgroundColor: SIENNA,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}