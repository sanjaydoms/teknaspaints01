import { useState, useEffect, useRef } from "react";
import paintSplash1 from "figma:asset/75f3ecbda7215f4026288d234a0dd5167a26c40d.png";
import paintSplash2 from "figma:asset/756dd3a04940cd9b09ac88ed8283ee0a7fd19ee2.png";

export { paintSplash1, paintSplash2 };

/* ══════════════════════════════════════════════
   1. PaintSplashDivider
   A full-width decorative band between sections.
   Uses both splash images with heavy overlay & gradients.
   ══════════════════════════════════════════════ */
export function PaintSplashDivider({
  height = 100,
  opacity = 0.35,
  flipped = false,
  bgColor = "#1a1428",
  blendMode = "screen" as React.CSSProperties["mixBlendMode"],
}: {
  height?: number;
  opacity?: number;
  flipped?: boolean;
  bgColor?: string;
  blendMode?: React.CSSProperties["mixBlendMode"];
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor: bgColor }}
    >
      {/* Left image */}
      <img
        src={paintSplash1}
        alt=""
        aria-hidden
        className="absolute top-0 left-0 h-full object-cover pointer-events-none select-none"
        style={{
          width: "55%",
          opacity,
          mixBlendMode: blendMode,
          transform: flipped ? "scaleX(-1)" : "none",
          maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 50%, transparent 100%)",
        }}
      />
      {/* Right image */}
      <img
        src={paintSplash2}
        alt=""
        aria-hidden
        className="absolute top-0 right-0 h-full object-cover pointer-events-none select-none"
        style={{
          width: "55%",
          opacity,
          mixBlendMode: blendMode,
          transform: flipped ? "scaleX(-1)" : "none",
          maskImage: "linear-gradient(to left, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   2. PaintSplashFooterBand
   A decorative band to sit above footer content.
   Paint splashes flow across with animated shimmer.
   ══════════════════════════════════════════════ */
export function PaintSplashFooterBand() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 120 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #1a1428 100%)",
        }}
      />
      {/* Left splash */}
      <img
        src={paintSplash1}
        alt=""
        aria-hidden
        className="absolute bottom-0 left-[-5%] pointer-events-none select-none"
        style={{
          width: "60%",
          height: "160%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.3,
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%), linear-gradient(to right, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%), linear-gradient(to right, black 60%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* Right splash */}
      <img
        src={paintSplash2}
        alt=""
        aria-hidden
        className="absolute bottom-0 right-[-5%] pointer-events-none select-none"
        style={{
          width: "60%",
          height: "160%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.25,
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* Animated shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,162,78,0.06) 25%, rgba(199,91,58,0.06) 50%, rgba(59,124,165,0.06) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "splash-shimmer 8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes splash-shimmer {
          0%, 100% { background-position: -200% center; }
          50% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   3. PaintSplashCornerAccent
   Positioned decorative accent for CTA/hero sections.
   ══════════════════════════════════════════════ */
export function PaintSplashCornerAccent({
  position = "bottom-right",
  size = 400,
  opacity = 0.15,
  imageIndex = 1,
}: {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size?: number;
  opacity?: number;
  imageIndex?: 1 | 2;
}) {
  const img = imageIndex === 1 ? paintSplash1 : paintSplash2;

  const posStyle: React.CSSProperties = {};
  let gradientDir = "";
  switch (position) {
    case "bottom-right":
      posStyle.bottom = -size * 0.15;
      posStyle.right = -size * 0.15;
      gradientDir =
        "radial-gradient(ellipse at 70% 70%, black 30%, transparent 70%)";
      break;
    case "bottom-left":
      posStyle.bottom = -size * 0.15;
      posStyle.left = -size * 0.15;
      gradientDir =
        "radial-gradient(ellipse at 30% 70%, black 30%, transparent 70%)";
      break;
    case "top-right":
      posStyle.top = -size * 0.15;
      posStyle.right = -size * 0.15;
      gradientDir =
        "radial-gradient(ellipse at 70% 30%, black 30%, transparent 70%)";
      break;
    case "top-left":
      posStyle.top = -size * 0.15;
      posStyle.left = -size * 0.15;
      gradientDir =
        "radial-gradient(ellipse at 30% 30%, black 30%, transparent 70%)";
      break;
  }

  return (
    <img
      src={img}
      alt=""
      aria-hidden
      className="absolute pointer-events-none select-none"
      style={{
        ...posStyle,
        width: size,
        height: size,
        objectFit: "cover",
        opacity,
        mixBlendMode: "screen",
        maskImage: gradientDir,
        WebkitMaskImage: gradientDir,
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   4. PaintSplashHoverCard
   Wrapper that reveals paint splash on hover
   ══════════════════════════════════════════════ */
export function PaintSplashHoverOverlay({
  isHovered,
  imageIndex = 1,
}: {
  isHovered: boolean;
  imageIndex?: 1 | 2;
}) {
  const img = imageIndex === 1 ? paintSplash1 : paintSplash2;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity: isHovered ? 0.18 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <img
        src={img}
        alt=""
        aria-hidden
        className="w-full h-full object-cover"
        style={{
          mixBlendMode: "screen",
          transform: isHovered ? "scale(1.05)" : "scale(1.15)",
          transition: "transform 0.8s cubic-bezier(0.25,0.1,0.25,1)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   5. PaintSplashParallaxBg
   Full-width background with subtle parallax.
   ══════════════════════════════════════════════ */
export function PaintSplashParallaxBg({
  opacity = 0.12,
  height = 400,
}: {
  opacity?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        setOffset((progress - 0.5) * 60);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ height }}
    >
      <img
        src={paintSplash1}
        alt=""
        aria-hidden
        className="absolute left-0 w-[55%] h-[140%] object-cover select-none"
        style={{
          top: "50%",
          transform: `translateY(calc(-50% + ${offset}px))`,
          opacity,
          mixBlendMode: "screen",
          maskImage: "linear-gradient(to right, black 40%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 40%, transparent 90%)",
        }}
      />
      <img
        src={paintSplash2}
        alt=""
        aria-hidden
        className="absolute right-0 w-[55%] h-[140%] object-cover select-none"
        style={{
          top: "50%",
          transform: `translateY(calc(-50% + ${-offset}px))`,
          opacity,
          mixBlendMode: "screen",
          maskImage: "linear-gradient(to left, black 40%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 40%, transparent 90%)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   6. FloatingPaintDrops
   Subtle animated paint drop particles using
   colors from the splash images.
   ══════════════════════════════════════════════ */
const PAINT_COLORS = [
  "#e84393",
  "#00b894",
  "#fdcb6e",
  "#6c5ce7",
  "#e17055",
  "#00cec9",
  "#fd79a8",
  "#55efc4",
];

export function FloatingPaintDrops({ count = 12 }: { count?: number }) {
  const drops = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 8,
      color: PAINT_COLORS[i % PAINT_COLORS.length],
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.3,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes paint-drop-float {
          0% { transform: translateY(110%) scale(0.5); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-110%) scale(1.2); opacity: 0; }
        }
      `}</style>
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            width: d.size,
            height: d.size * 1.3,
            backgroundColor: d.color,
            opacity: d.opacity,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            animation: `paint-drop-float ${d.duration}s ease-in-out ${d.delay}s infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
