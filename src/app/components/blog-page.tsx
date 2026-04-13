import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { useNavigation } from "./navigation-context";
import { BlogPostPage } from "./blog-post-page";
import {
  BLOG_POSTS,
  CATEGORIES,
  DARK_NAVY,
  SIENNA,
  GOLD,
  SAGE,
  CANVAS,
  PAPER_WHITE,
  SECTION_PX,
  getCategoryColor,
} from "./blog-data";
import {
  ArrowRight,
  Clock,
  User,
  Search,
  TrendingUp,
  Eye,
} from "lucide-react";
import { useSEO } from "./use-seo";

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════ */
function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial: CSSProperties =
    direction === "left"
      ? { opacity: 0, transform: "translateX(-60px)" }
      : direction === "right"
      ? { opacity: 0, transform: "translateX(60px)" }
      : direction === "scale"
      ? { opacity: 0, transform: "scale(0.9)" }
      : { opacity: 0, transform: "translateY(50px)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(vis
          ? { opacity: 1, transform: "translate(0) scale(1)" }
          : initial),
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOG LISTING PAGE
   ═══════════════════════════════════════════════════════ */
function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { navigateToBlog } = useNavigation();

  const filtered = BLOG_POSTS.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  const featured = BLOG_POSTS.filter((p) => p.featured);
  const recent = filtered.slice(0, 8);

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <div
        className={`relative w-full pt-[140px] sm:pt-[160px] pb-16 lg:pb-20 ${SECTION_PX}`}
        style={{
          background: `linear-gradient(135deg, ${DARK_NAVY} 0%, #2a2040 50%, ${DARK_NAVY} 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-[20%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{
            background: `radial-gradient(circle, ${SIENNA} 0%, transparent 70%)`,
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
              <span
                className="font-['Jost',sans-serif] text-[12px] tracking-[5px] uppercase"
                style={{ color: GOLD, fontWeight: 500 }}
              >
                Teknas Journal
              </span>
            </div>
            <h1
              className="font-['Jost',sans-serif] text-[clamp(36px,5vw,64px)] m-0 mb-4 text-white"
              style={{ lineHeight: 1.1 }}
            >
              <span style={{ fontWeight: 300 }}>Colour,</span>{" "}
              <span style={{ fontWeight: 700, fontStyle: "italic", color: GOLD }}>
                Craft
              </span>{" "}
              <span style={{ fontWeight: 300 }}>&</span>{" "}
              <span style={{ fontWeight: 700 }}>Inspiration</span>
            </h1>
            <p
              className="font-['Jost',sans-serif] text-[clamp(14px,1.1vw,17px)] leading-[28px] m-0 max-w-[560px]"
              style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
            >
              Expert insights, design tips, and the latest trends from Teknas
              Paints — your guide to creating spaces that inspire.
            </p>
          </ScrollReveal>

          {/* Search Bar */}
          <ScrollReveal delay={0.15}>
            <div className="mt-8 max-w-[520px]">
              <div
                className="flex items-center h-[52px] rounded-full overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Search size={18} className="ml-5 text-white/40 shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles, topics, tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 h-full px-3 bg-transparent border-0 outline-none font-['Jost',sans-serif] text-[14px] text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        className={`w-full py-5 border-b ${SECTION_PX}`}
        style={{ borderColor: `${DARK_NAVY}08` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              const catColor = getCategoryColor(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="h-[38px] px-5 rounded-full border-0 cursor-pointer whitespace-nowrap transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: isActive ? catColor : "transparent",
                    color: isActive ? "white" : `${DARK_NAVY}60`,
                    fontFamily: "'Fira Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    boxShadow: isActive
                      ? `0 4px 14px ${catColor}35`
                      : "none",
                    border: isActive ? "none" : `1px solid ${DARK_NAVY}12`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Posts (only on "All" with no search) */}
      {activeCategory === "All" && !searchTerm && (
        <div
          className={`w-full py-14 lg:py-20 ${SECTION_PX}`}
          style={{ backgroundColor: PAPER_WHITE }}
        >
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <TrendingUp size={18} style={{ color: SIENNA }} />
                <span
                  className="font-['Jost',sans-serif] text-[13px] tracking-[3px] uppercase"
                  style={{ color: SIENNA, fontWeight: 600 }}
                >
                  Featured Stories
                </span>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featured.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.1}>
                  <article
                    className="group cursor-pointer rounded-[20px] overflow-hidden transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.1)]"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                    }}
                    onClick={() => navigateToBlog(post.slug)}
                  >
                    <div className="relative w-full h-[240px] sm:h-[280px] overflow-hidden">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${post.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 40%, rgba(26,20,40,0.6) 100%)",
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="inline-flex h-[28px] px-3.5 rounded-full items-center font-['Jost',sans-serif] text-[11px] tracking-[1px] uppercase text-white"
                          style={{
                            backgroundColor: getCategoryColor(post.category),
                            fontWeight: 600,
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3
                          className="font-['Jost',sans-serif] text-[22px] sm:text-[26px] text-white m-0 leading-[1.2]"
                          style={{ fontWeight: 600 }}
                        >
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p
                        className="font-['Jost',sans-serif] text-[14px] leading-[24px] m-0 mb-5"
                        style={{ color: `${DARK_NAVY}60` }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p
                              className="font-['Jost',sans-serif] text-[13px] m-0"
                              style={{
                                color: DARK_NAVY,
                                fontWeight: 600,
                              }}
                            >
                              {post.author}
                            </p>
                            <p
                              className="font-['Jost',sans-serif] text-[11px] m-0"
                              style={{ color: `${DARK_NAVY}45` }}
                            >
                              {post.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock
                            size={13}
                            style={{ color: `${DARK_NAVY}35` }}
                          />
                          <span
                            className="font-['Jost',sans-serif] text-[12px]"
                            style={{ color: `${DARK_NAVY}45` }}
                          >
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Posts Grid */}
      <div className={`w-full py-14 lg:py-20 ${SECTION_PX}`}>
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <h2
                className="font-['Jost',sans-serif] text-[28px] lg:text-[34px] m-0"
                style={{ color: DARK_NAVY, fontWeight: 600 }}
              >
                {activeCategory === "All"
                  ? "Latest Articles"
                  : activeCategory}
                {searchTerm && (
                  <span style={{ color: `${DARK_NAVY}40`, fontWeight: 300 }}>
                    {" "}
                    — "{searchTerm}"
                  </span>
                )}
              </h2>
              <span
                className="font-['Jost',sans-serif] text-[13px]"
                style={{ color: `${DARK_NAVY}40` }}
              >
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </ScrollReveal>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search
                size={48}
                className="mx-auto mb-4"
                style={{ color: `${DARK_NAVY}15` }}
              />
              <p
                className="font-['Jost',sans-serif] text-[18px] m-0 mb-2"
                style={{ color: `${DARK_NAVY}50`, fontWeight: 500 }}
              >
                No articles found
              </p>
              <p
                className="font-['Jost',sans-serif] text-[14px] m-0"
                style={{ color: `${DARK_NAVY}35` }}
              >
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {recent.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.06}>
                  <article
                    className="group cursor-pointer rounded-[18px] overflow-hidden bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] h-full flex flex-col"
                    style={{
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                      border: `1px solid ${DARK_NAVY}06`,
                    }}
                    onClick={() => navigateToBlog(post.slug)}
                  >
                    <div className="relative w-full h-[200px] overflow-hidden shrink-0">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${post.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 50%, rgba(26,20,40,0.35) 100%)",
                        }}
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span
                          className="inline-flex h-[26px] px-3 rounded-full items-center font-['Jost',sans-serif] text-[10px] tracking-[1px] uppercase text-white"
                          style={{
                            backgroundColor: getCategoryColor(post.category),
                            fontWeight: 600,
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="font-['Jost',sans-serif] text-[17px] sm:text-[18px] m-0 mb-2.5 leading-[1.3] group-hover:underline decoration-1 underline-offset-2"
                        style={{ color: DARK_NAVY, fontWeight: 600 }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="font-['Jost',sans-serif] text-[13px] leading-[22px] m-0 mb-5 flex-1"
                        style={{ color: `${DARK_NAVY}50` }}
                      >
                        {post.excerpt.length > 120
                          ? post.excerpt.slice(0, 120) + "..."
                          : post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${DARK_NAVY}06` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-[22px] h-[22px] rounded-full overflow-hidden">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span
                            className="font-['Jost',sans-serif] text-[12px]"
                            style={{
                              color: `${DARK_NAVY}55`,
                              fontWeight: 500,
                            }}
                          >
                            {post.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye
                              size={12}
                              style={{ color: `${DARK_NAVY}30` }}
                            />
                            <span
                              className="font-['Jost',sans-serif] text-[11px]"
                              style={{ color: `${DARK_NAVY}40` }}
                            >
                              {(post.views / 1000).toFixed(1)}k
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock
                              size={12}
                              style={{ color: `${DARK_NAVY}30` }}
                            />
                            <span
                              className="font-['Jost',sans-serif] text-[11px]"
                              style={{ color: `${DARK_NAVY}40` }}
                            >
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className={`w-full py-16 lg:py-20 ${SECTION_PX}`} style={{ backgroundColor: CANVAS }}>
        <div className="max-w-[700px] mx-auto text-center">
          <ScrollReveal>
            <h3
              className="font-['Jost',sans-serif] text-[28px] lg:text-[34px] m-0 mb-3"
              style={{ color: DARK_NAVY, fontWeight: 600 }}
            >
              Stay <span style={{ color: GOLD, fontStyle: "italic" }}>Inspired</span>
            </h3>
            <p
              className="font-['Jost',sans-serif] text-[14px] leading-[24px] m-0 mb-8"
              style={{ color: `${DARK_NAVY}50` }}
            >
              Get the latest colour trends, design tips, and exclusive offers delivered to your inbox every week.
            </p>
            <div
              className="flex items-center h-[52px] rounded-full overflow-hidden max-w-[460px] mx-auto"
              style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-full px-6 bg-transparent border-0 outline-none font-['Jost',sans-serif] text-[14px]"
                style={{ color: DARK_NAVY }}
              />
              <button
                className="h-[42px] px-6 rounded-full border-0 cursor-pointer mr-[5px] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: DARK_NAVY }}
              >
                <span
                  className="font-['Jost',sans-serif] text-[12px] tracking-[1.5px] uppercase text-white"
                  style={{ fontWeight: 600 }}
                >
                  Subscribe
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOG PAGE (router — listing vs post detail)
   ═══════════════════════════════════════════════════════ */
export function BlogPage() {
  useSEO({
    title: "Teknas Paints Blog | Expert Guides on Eco-Friendly Painting, Colour Trends & Home Renovation",
    description: "Read expert articles on eco-friendly painting techniques, colour trends 2026, low-VOC paint guides, sustainable home renovation tips, textured wall finishes, GREENGUARD Gold paint benefits, and professional painting advice from Teknas Paints' in-house experts and industry professionals.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Teknas Paints Blog",
        description: "Expert guides on eco-friendly painting, colour trends 2026, low-VOC coatings, textured wall finishes, and sustainable home renovation from India's leading eco-paint manufacturer.",
        publisher: { "@type": "Organization", name: "Teknas Paints", url: "https://www.teknaspaints.com", logo: "https://www.teknaspaints.com/logo.png" },
        blogPost: BLOG_POSTS.slice(0, 6).map(post => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
          datePublished: post.date,
          image: post.image,
          keywords: post.tags.join(", "),
          articleSection: post.category,
          interactionStatistic: { "@type": "InteractionCounter", interactionType: "https://schema.org/ReadAction", userInteractionCount: post.views },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.teknaspaints.com/blog" },
        ],
      },
    ],
  });

  const { selectedBlogPost } = useNavigation();

  if (selectedBlogPost) {
    const post = BLOG_POSTS.find((p) => p.slug === selectedBlogPost);
    if (post) return <BlogPostPage post={post} />;
  }

  return <BlogListing />;
}
