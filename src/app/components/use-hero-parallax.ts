import { useState, useEffect, useRef } from "react";

/**
 * Shared hero parallax hook — makes hero text follow the cursor
 * with a subtle floating motion. Also returns a lighter BG shift.
 */
export function useHeroParallax(intensity = 1) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / rect.width;
      const py = (e.clientY - cy) / rect.height;
      setParallax({ x: px * 20 * intensity, y: py * 12 * intensity });
    };

    const handleLeave = () => setParallax({ x: 0, y: 0 });

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", handleLeave);
    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity]);

  const transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";

  /** Apply to the hero text container */
  const textStyle: React.CSSProperties = {
    transform: `translate(${parallax.x}px, ${parallax.y}px)`,
    transition,
  };

  /** Apply to the hero background image for a subtler counter-shift */
  const bgStyle: React.CSSProperties = {
    transform: `scale(1.05) translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
    transition,
  };

  return { heroRef, parallax, textStyle, bgStyle };
}
