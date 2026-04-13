import { useState, useEffect, useRef, useMemo, type ReactNode, type CSSProperties } from "react";
import { useNavigation } from "./navigation-context";
import {
  type BlogPost,
  type BlogContentBlock,
  BLOG_POSTS,
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
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Tag,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Calendar,
  Eye,
  ChevronUp,
  Lightbulb,
  Quote,
  List,
  ThumbsUp,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  CheckCircle,
} from "lucide-react";
import { useSEO } from "./use-seo";

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL (local lightweight)
   ═══════════════════════════════════════════════════════ */
function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   READING PROGRESS BAR
   ═══════════════════════════════════════════════════════ */
function ReadingProgressBar({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[10000]" style={{ backgroundColor: `${DARK_NAVY}08` }}>
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════════ */
function BackToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 w-[44px] h-[44px] rounded-full flex items-center justify-center border-0 cursor-pointer z-[9998] transition-all hover:scale-110"
      style={{ backgroundColor: DARK_NAVY, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      <ChevronUp size={20} className="text-white" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   SHARE POPOVER
   ═══════════════════════════════════════════════════════ */
function SharePopover({ title, onClose }: { title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className="absolute right-0 top-full mt-2 w-[220px] rounded-[14px] p-4 z-50"
      style={{ backgroundColor: "white", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", border: `1px solid ${DARK_NAVY}08` }}
    >
      <p className="font-['Jost',sans-serif] text-[12px] m-0 mb-3" style={{ color: `${DARK_NAVY}50`, fontWeight: 500 }}>Share this article</p>
      <div className="flex gap-2 mb-3">
        {[
          { Icon: Facebook, bg: "#1877F2" },
          { Icon: Twitter, bg: "#1DA1F2" },
          { Icon: Linkedin, bg: "#0A66C2" },
        ].map(({ Icon, bg }, i) => (
          <button
            key={i}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center border-0 cursor-pointer transition-all hover:scale-110"
            style={{ backgroundColor: bg }}
          >
            <Icon size={16} className="text-white" />
          </button>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="w-full h-[34px] rounded-[8px] flex items-center justify-center gap-2 border-0 cursor-pointer transition-all"
        style={{ backgroundColor: `${DARK_NAVY}06` }}
      >
        {copied ? <CheckCircle size={14} style={{ color: SAGE }} /> : <Link2 size={14} style={{ color: `${DARK_NAVY}50` }} />}
        <span className="font-['Jost',sans-serif] text-[12px]" style={{ color: `${DARK_NAVY}60`, fontWeight: 500 }}>
          {copied ? "Copied!" : "Copy link"}
        </span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTENT BLOCK RENDERER
   ═══════════════════════════════════════════════════════ */
function ContentBlock({ block, catColor }: { block: BlogContentBlock; catColor: string }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          className="font-['Jost',sans-serif] text-[22px] lg:text-[26px] m-0 mt-10 mb-4 leading-[1.25]"
          style={{ color: DARK_NAVY, fontWeight: 600 }}
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className="font-['Jost',sans-serif] text-[15.5px] lg:text-[16.5px] leading-[29px] lg:leading-[31px] m-0 mb-6"
          style={{ color: `${DARK_NAVY}bb`, fontWeight: 300 }}
        >
          {block.text}
        </p>
      );
    case "quote":
      return (
        <div
          className="relative my-8 py-6 pl-8 pr-6 rounded-r-[14px]"
          style={{ borderLeft: `4px solid ${catColor}`, backgroundColor: `${catColor}08` }}
        >
          <Quote size={20} className="absolute top-4 right-4 opacity-15" style={{ color: catColor }} />
          <p
            className="font-['Jost',sans-serif] text-[17px] lg:text-[18px] leading-[30px] m-0"
            style={{ color: DARK_NAVY, fontWeight: 400, fontStyle: "italic" }}
          >
            {block.text}
          </p>
        </div>
      );
    case "image":
      return (
        <figure className="my-8 mx-0">
          <div className="w-full rounded-[14px] overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <img
              src={block.src}
              alt={block.caption || ""}
              className="w-full h-auto block"
              style={{ maxHeight: 420, objectFit: "cover" }}
            />
          </div>
          {block.caption && (
            <figcaption
              className="font-['Jost',sans-serif] text-[13px] text-center mt-3"
              style={{ color: `${DARK_NAVY}45`, fontStyle: "italic" }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "tip":
      return (
        <div
          className="flex gap-4 my-8 p-5 rounded-[14px]"
          style={{ backgroundColor: `${GOLD}0c`, border: `1px solid ${GOLD}20` }}
        >
          <Lightbulb size={20} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
          <p
            className="font-['Jost',sans-serif] text-[14.5px] leading-[26px] m-0"
            style={{ color: `${DARK_NAVY}aa`, fontWeight: 400 }}
          >
            {block.text}
          </p>
        </div>
      );
    case "list":
      return (
        <ul className="my-6 pl-0 list-none flex flex-col gap-3">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div
                className="w-[6px] h-[6px] rounded-full mt-[11px] shrink-0"
                style={{ backgroundColor: catColor }}
              />
              <span
                className="font-['Jost',sans-serif] text-[15px] leading-[26px]"
                style={{ color: `${DARK_NAVY}aa`, fontWeight: 300 }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════
   TABLE OF CONTENTS
   ═══════════════════════════════════════════════════════ */
function TableOfContents({ blocks, catColor }: { blocks: BlogContentBlock[]; catColor: string }) {
  const headings = blocks.filter((b) => b.type === "heading");
  if (headings.length < 2) return null;
  return (
    <div
      className="rounded-[16px] p-5 mb-6"
      style={{ backgroundColor: `${catColor}08`, border: `1px solid ${catColor}12` }}
    >
      <div className="flex items-center gap-2 mb-3.5">
        <List size={15} style={{ color: catColor }} />
        <span
          className="font-['Jost',sans-serif] text-[13px] tracking-[1.5px] uppercase"
          style={{ color: catColor, fontWeight: 600 }}
        >
          In This Article
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {headings.map((h, i) => (
          <p
            key={i}
            className="font-['Jost',sans-serif] text-[13.5px] m-0 cursor-pointer transition-colors hover:underline"
            style={{ color: `${DARK_NAVY}70`, fontWeight: 400 }}
          >
            {h.text}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COMMENT SECTION
   ═══════════════════════════════════════════════════════ */
function CommentSection({ post }: { post: BlogPost }) {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const catColor = getCategoryColor(post.category);

  const toggleLike = (id: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="mt-12 pt-10 border-t" style={{ borderColor: `${DARK_NAVY}08` }}>
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle size={20} style={{ color: catColor }} />
        <h3
          className="font-['Jost',sans-serif] text-[20px] lg:text-[22px] m-0"
          style={{ color: DARK_NAVY, fontWeight: 600 }}
        >
          Discussion ({post.comments.length})
        </h3>
      </div>

      {/* Comment input */}
      <div
        className="flex gap-3 mb-8 p-4 rounded-[14px]"
        style={{ backgroundColor: CANVAS, border: `1px solid ${DARK_NAVY}06` }}
      >
        <div
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${catColor}15` }}
        >
          <User size={16} style={{ color: catColor }} />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-white rounded-[10px] p-3 border-0 outline-none resize-none font-['Jost',sans-serif] text-[14px] leading-[22px] min-h-[80px]"
            style={{ color: DARK_NAVY, boxShadow: `0 0 0 1px ${DARK_NAVY}0a` }}
          />
          <div className="flex justify-end mt-2.5">
            <button
              className="h-[36px] px-5 rounded-full border-0 cursor-pointer flex items-center gap-2 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: newComment.trim() ? catColor : `${DARK_NAVY}15`,
                opacity: newComment.trim() ? 1 : 0.5,
              }}
            >
              <Send size={13} className="text-white" />
              <span className="font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase text-white" style={{ fontWeight: 600 }}>
                Comment
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="flex flex-col gap-6">
        {post.comments.map((comment) => {
          const isLiked = likedComments.has(comment.id);
          return (
            <div key={comment.id} className="flex gap-3.5">
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${DARK_NAVY}08` }}
              >
                <span
                  className="font-['Jost',sans-serif] text-[13px]"
                  style={{ color: `${DARK_NAVY}60`, fontWeight: 600 }}
                >
                  {comment.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="font-['Jost',sans-serif] text-[14px]"
                    style={{ color: DARK_NAVY, fontWeight: 600 }}
                  >
                    {comment.author}
                  </span>
                  <span
                    className="font-['Jost',sans-serif] text-[11px]"
                    style={{ color: `${DARK_NAVY}35` }}
                  >
                    {comment.date}
                  </span>
                </div>
                <p
                  className="font-['Jost',sans-serif] text-[14px] leading-[24px] m-0 mb-2"
                  style={{ color: `${DARK_NAVY}80`, fontWeight: 300 }}
                >
                  {comment.text}
                </p>
                <button
                  onClick={() => toggleLike(comment.id)}
                  className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 transition-all hover:scale-105"
                >
                  <ThumbsUp
                    size={13}
                    fill={isLiked ? catColor : "none"}
                    style={{ color: isLiked ? catColor : `${DARK_NAVY}30` }}
                  />
                  <span
                    className="font-['Jost',sans-serif] text-[12px]"
                    style={{ color: isLiked ? catColor : `${DARK_NAVY}40` }}
                  >
                    {isLiked ? comment.likes + 1 : comment.likes}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NEXT / PREVIOUS POST NAV
   ═══════════════════════════════════════════════════════ */
function PostNavigation({ post }: { post: BlogPost }) {
  const { navigateToBlog } = useNavigation();
  const idx = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? BLOG_POSTS[idx - 1] : null;
  const next = idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-10 border-t"
      style={{ borderColor: `${DARK_NAVY}08` }}
    >
      {prev ? (
        <button
          onClick={() => navigateToBlog(prev.slug)}
          className="flex items-start gap-3 bg-transparent border rounded-[14px] p-5 cursor-pointer text-left transition-all duration-300 group hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          style={{ borderColor: `${DARK_NAVY}08` }}
        >
          <ArrowLeft
            size={18}
            className="shrink-0 mt-1 transition-transform group-hover:-translate-x-1"
            style={{ color: `${DARK_NAVY}40` }}
          />
          <div>
            <p className="font-['Jost',sans-serif] text-[11px] tracking-[1.5px] uppercase m-0 mb-1.5" style={{ color: `${DARK_NAVY}40`, fontWeight: 500 }}>
              Previous
            </p>
            <p className="font-['Jost',sans-serif] text-[14px] leading-[20px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
              {prev.title.length > 55 ? prev.title.slice(0, 55) + "..." : prev.title}
            </p>
          </div>
        </button>
      ) : <div />}
      {next ? (
        <button
          onClick={() => navigateToBlog(next.slug)}
          className="flex items-start gap-3 bg-transparent border rounded-[14px] p-5 cursor-pointer text-right transition-all duration-300 group hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:flex-row-reverse"
          style={{ borderColor: `${DARK_NAVY}08` }}
        >
          <ArrowRight
            size={18}
            className="shrink-0 mt-1 transition-transform group-hover:translate-x-1"
            style={{ color: `${DARK_NAVY}40` }}
          />
          <div>
            <p className="font-['Jost',sans-serif] text-[11px] tracking-[1.5px] uppercase m-0 mb-1.5" style={{ color: `${DARK_NAVY}40`, fontWeight: 500 }}>
              Next
            </p>
            <p className="font-['Jost',sans-serif] text-[14px] leading-[20px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
              {next.title.length > 55 ? next.title.slice(0, 55) + "..." : next.title}
            </p>
          </div>
        </button>
      ) : <div />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN BLOG POST PAGE
   ═══════════════════════════════════════════════════════ */
export function BlogPostPage({ post }: { post: BlogPost }) {
  const { navigateToBlog } = useNavigation();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const catColor = getCategoryColor(post.category);

  useSEO({
    title: `${post.title} | Teknas Paints Blog`,
    description: post.excerpt || `Read "${post.title}" — expert insights on ${post.category.toLowerCase()} from Teknas Paints blog. Tips, trends, and professional painting advice.`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      author: { "@type": "Person", name: post.author },
      publisher: { "@type": "Organization", name: "Teknas Paints", url: "https://www.teknaspaints.com" },
      datePublished: post.date,
      articleSection: post.category,
      keywords: post.tags?.join(", "),
    },
  });

  // Related posts
  const related = useMemo(() => {
    const sameCat = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
    const others = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
    return [...sameCat, ...others].slice(0, 3);
  }, [post.slug, post.category]);

  // Close share popover on outside click
  const shareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showShare) return;
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShowShare(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showShare]);

  return (
    <div className="w-full bg-white">
      <ReadingProgressBar color={catColor} />
      <BackToTopButton />

      {/* ═══════ HERO ═══════ */}
      <div className="relative w-full h-[52vh] min-h-[380px] max-h-[560px]">
        <div
          className="absolute inset-0 transition-transform duration-[1.2s] ease-out"
          style={{
            backgroundImage: `url('${post.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${DARK_NAVY}aa 0%, ${DARK_NAVY}30 35%, ${DARK_NAVY}dd 100%)`,
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className={`absolute bottom-0 left-0 right-0 pb-10 lg:pb-14 pt-36 ${SECTION_PX}`}>
          <div className="max-w-[900px]">
            {/* Back button */}
            <ScrollReveal>
              <button
                onClick={() => navigateToBlog()}
                className="flex items-center gap-2 bg-transparent border-0 cursor-pointer mb-6 group"
              >
                <ArrowLeft size={16} className="text-white/50 transition-transform group-hover:-translate-x-1" />
                <span className="font-['Jost',sans-serif] text-[13px] text-white/50" style={{ fontWeight: 400 }}>
                  Back to Journal
                </span>
              </button>
            </ScrollReveal>

            {/* Category + Read time */}
            <ScrollReveal delay={0.05}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex h-[28px] px-3.5 rounded-full items-center font-['Jost',sans-serif] text-[11px] tracking-[1px] uppercase text-white"
                  style={{ backgroundColor: catColor, fontWeight: 600 }}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-white/40" />
                  <span className="font-['Jost',sans-serif] text-[12px] text-white/45">{post.readTime}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal delay={0.1}>
              <h1
                className="font-['Jost',sans-serif] text-[clamp(28px,4.5vw,50px)] text-white m-0 mb-6 leading-[1.12]"
                style={{ fontWeight: 700 }}
              >
                {post.title}
              </h1>
            </ScrollReveal>

            {/* Author + Date */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-full overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.2)" }}>
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-['Jost',sans-serif] text-[14px] text-white m-0" style={{ fontWeight: 600 }}>
                      {post.author}
                    </p>
                    <p className="font-['Jost',sans-serif] text-[11px] text-white/45 m-0">
                      {post.authorRole}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-white/35" />
                  <span className="font-['Jost',sans-serif] text-[12px] text-white/45">{post.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Eye size={14} className="text-white/35" />
                    <span className="font-['Jost',sans-serif] text-[12px] text-white/45">{(post.views / 1000).toFixed(1)}k views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart size={14} className="text-white/35" />
                    <span className="font-['Jost',sans-serif] text-[12px] text-white/45">{post.likes} likes</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ═══════ CONTENT BODY ═══════ */}
      <div className={`w-full py-12 lg:py-16 ${SECTION_PX}`}>
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Main article */}
          <article className="flex-1 max-w-[760px]">
            {/* Lead excerpt */}
            <ScrollReveal>
              <div
                className="mb-10 pl-6 py-1"
                style={{ borderLeft: `3px solid ${catColor}` }}
              >
                <p
                  className="font-['Jost',sans-serif] text-[17px] lg:text-[19px] leading-[30px] m-0"
                  style={{ color: DARK_NAVY, fontWeight: 400, fontStyle: "italic" }}
                >
                  {post.excerpt}
                </p>
              </div>
            </ScrollReveal>

            {/* Rendered content blocks */}
            {post.content.map((block, idx) => (
              <ScrollReveal key={idx} delay={0.02}>
                <ContentBlock block={block} catColor={catColor} />
              </ScrollReveal>
            ))}

            {/* Tags */}
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t" style={{ borderColor: `${DARK_NAVY}08` }}>
                <Tag size={14} style={{ color: `${DARK_NAVY}30` }} className="mt-1 shrink-0" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-[30px] px-3.5 rounded-full flex items-center font-['Jost',sans-serif] text-[12px] cursor-pointer transition-all hover:shadow-sm"
                    style={{ backgroundColor: `${DARK_NAVY}06`, color: `${DARK_NAVY}55`, fontWeight: 400 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Engagement bar */}
            <ScrollReveal>
              <div
                className="flex items-center justify-between mt-8 py-5 px-6 rounded-[14px]"
                style={{ backgroundColor: CANVAS }}
              >
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer transition-all hover:scale-110"
                  >
                    <Heart size={19} fill={liked ? SIENNA : "none"} style={{ color: liked ? SIENNA : `${DARK_NAVY}40` }} />
                    <span className="font-['Jost',sans-serif] text-[13px]" style={{ color: `${DARK_NAVY}55` }}>
                      {liked ? post.likes + 1 : post.likes}
                    </span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={19} style={{ color: `${DARK_NAVY}40` }} />
                    <span className="font-['Jost',sans-serif] text-[13px]" style={{ color: `${DARK_NAVY}55` }}>
                      {post.comments.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye size={19} style={{ color: `${DARK_NAVY}40` }} />
                    <span className="font-['Jost',sans-serif] text-[13px]" style={{ color: `${DARK_NAVY}55` }}>
                      {(post.views / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white border-0 cursor-pointer transition-all hover:scale-110"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  >
                    <Bookmark size={17} fill={bookmarked ? GOLD : "none"} style={{ color: bookmarked ? GOLD : `${DARK_NAVY}40` }} />
                  </button>
                  <div className="relative" ref={shareRef}>
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white border-0 cursor-pointer transition-all hover:scale-110"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    >
                      <Share2 size={17} style={{ color: `${DARK_NAVY}40` }} />
                    </button>
                    {showShare && <SharePopover title={post.title} onClose={() => setShowShare(false)} />}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Next / Previous */}
            <ScrollReveal>
              <PostNavigation post={post} />
            </ScrollReveal>

            {/* Comments */}
            <ScrollReveal>
              <CommentSection post={post} />
            </ScrollReveal>
          </article>

          {/* ═══════ SIDEBAR ═══════ */}
          <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0">
            {/* Sticky wrapper */}
            <div className="lg:sticky lg:top-[140px]">

              {/* Table of Contents */}
              <TableOfContents blocks={post.content} catColor={catColor} />

              {/* Author Card */}
              <div
                className="rounded-[18px] p-6 mb-6"
                style={{ backgroundColor: PAPER_WHITE, border: `1px solid ${DARK_NAVY}06` }}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden" style={{ border: `2px solid ${catColor}20` }}>
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-['Jost',sans-serif] text-[15px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                      {post.author}
                    </p>
                    <p className="font-['Jost',sans-serif] text-[12px] m-0" style={{ color: `${DARK_NAVY}50` }}>
                      {post.authorRole}
                    </p>
                  </div>
                </div>
                <p className="font-['Jost',sans-serif] text-[13px] leading-[22px] m-0" style={{ color: `${DARK_NAVY}55` }}>
                  {post.authorBio}
                </p>
              </div>

              {/* Related Articles */}
              <div className="mb-6">
                <h4 className="font-['Jost',sans-serif] text-[15px] mb-5 m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                  Related Articles
                </h4>
                <div className="flex flex-col gap-4">
                  {related.map((rp) => (
                    <div
                      key={rp.slug}
                      className="flex gap-3.5 cursor-pointer group"
                      onClick={() => navigateToBlog(rp.slug)}
                    >
                      <div className="w-[80px] h-[60px] rounded-[10px] overflow-hidden shrink-0">
                        <div
                          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${rp.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-['Jost',sans-serif] text-[13px] leading-[18px] m-0 mb-1.5 group-hover:underline decoration-1 underline-offset-2" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                          {rp.title.length > 55 ? rp.title.slice(0, 55) + "..." : rp.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-['Jost',sans-serif] text-[10px] tracking-[0.5px] uppercase"
                            style={{ color: getCategoryColor(rp.category), fontWeight: 600 }}
                          >
                            {rp.category}
                          </span>
                          <span className="font-['Jost',sans-serif] text-[11px]" style={{ color: `${DARK_NAVY}35` }}>
                            · {rp.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="pt-6 border-t" style={{ borderColor: `${DARK_NAVY}08` }}>
                <h4 className="font-['Jost',sans-serif] text-[15px] mb-4 m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Colour Trends", "Interior Design", "Eco-Friendly", "DIY", "Texture", "Minimalism", "Bedroom", "Kitchen"].map((tag) => (
                    <span
                      key={tag}
                      className="h-[30px] px-3.5 rounded-full flex items-center font-['Jost',sans-serif] text-[12px] cursor-pointer transition-all hover:shadow-md"
                      style={{ backgroundColor: `${DARK_NAVY}06`, color: `${DARK_NAVY}55`, fontWeight: 400 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════ MORE FROM JOURNAL ═══════ */}
      <div className={`w-full py-14 lg:py-20 ${SECTION_PX}`} style={{ backgroundColor: CANVAS }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-['Jost',sans-serif] text-[24px] lg:text-[28px] m-0" style={{ color: DARK_NAVY, fontWeight: 600 }}>
              More from the <span style={{ color: GOLD, fontStyle: "italic" }}>Journal</span>
            </h3>
            <button
              onClick={() => navigateToBlog()}
              className="flex items-center gap-2 bg-transparent border-0 cursor-pointer group"
            >
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[1.5px] uppercase" style={{ color: DARK_NAVY, fontWeight: 500 }}>
                View All
              </span>
              <ArrowRight size={16} style={{ color: DARK_NAVY }} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.08}>
                <article
                  className="group cursor-pointer rounded-[16px] overflow-hidden bg-white transition-all duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  onClick={() => navigateToBlog(p.slug)}
                >
                  <div className="relative w-full h-[190px] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${p.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(26,20,40,0.3) 100%)" }} />
                    <div className="absolute top-3.5 left-3.5">
                      <span
                        className="inline-flex h-[26px] px-3 rounded-full items-center font-['Jost',sans-serif] text-[10px] tracking-[1px] uppercase text-white"
                        style={{ backgroundColor: getCategoryColor(p.category), fontWeight: 600 }}
                      >
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4
                      className="font-['Jost',sans-serif] text-[16px] m-0 mb-2.5 leading-[1.3] group-hover:underline decoration-1 underline-offset-2"
                      style={{ color: DARK_NAVY, fontWeight: 600 }}
                    >
                      {p.title.length > 65 ? p.title.slice(0, 65) + "..." : p.title}
                    </h4>
                    <p
                      className="font-['Jost',sans-serif] text-[13px] leading-[21px] m-0 mb-4"
                      style={{ color: `${DARK_NAVY}50` }}
                    >
                      {p.excerpt.length > 100 ? p.excerpt.slice(0, 100) + "..." : p.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3.5 border-t" style={{ borderColor: `${DARK_NAVY}06` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                          <img src={p.authorAvatar} alt={p.author} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-['Jost',sans-serif] text-[12px]" style={{ color: `${DARK_NAVY}55`, fontWeight: 500 }}>
                          {p.author}
                        </span>
                      </div>
                      <span className="font-['Jost',sans-serif] text-[11px]" style={{ color: `${DARK_NAVY}40` }}>
                        {p.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}