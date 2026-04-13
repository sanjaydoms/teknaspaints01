import React, { useRef, useEffect, useState, type ReactNode } from "react";

/* ─────────────────────────────────────────────
   ScrollReveal
   Intersection-observer-based reveal animation
   ───────────────────────────────────────────── */
interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden: React.CSSProperties = (() => {
    switch (direction) {
      case "left":
        return { opacity: 0, transform: "translateX(-60px)" };
      case "right":
        return { opacity: 0, transform: "translateX(60px)" };
      case "scale":
        return { opacity: 0, transform: "scale(0.92)" };
      case "up":
      default:
        return { opacity: 0, transform: "translateY(40px)" };
    }
  })();

  const visible: React.CSSProperties = {
    opacity: 1,
    transform: "translate(0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? visible : hidden),
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PaintRippleButton
   Button with a paint-ripple click effect
   ───────────────────────────────────────────── */
interface PaintRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

export function PaintRippleButton({
  children,
  color = "#c75b3a",
  className = "",
  onClick,
  ...rest
}: PaintRippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position:absolute;left:${x}px;top:${y}px;width:0;height:0;
        border-radius:50%;background:${color}33;
        transform:translate(-50%,-50%);pointer-events:none;
        animation:paintRipple 0.6s ease-out forwards;
      `;
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  };

  return (
    <button ref={btnRef} className={className} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MagneticElement
   Subtly follows the cursor when hovered
   ───────────────────────────────────────────── */
interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticElement({
  children,
  strength = 0.3,
  className = "",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * strength;
    const dy = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.25s ease-out" }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PaintDripHover
   A drip effect on hover
   ───────────────────────────────────────────── */
interface PaintDripHoverProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function PaintDripHover({
  children,
  color = "#c75b3a",
  className = "",
}: PaintDripHoverProps) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div
        className="absolute top-0 left-0 w-full h-0 group-hover:h-full transition-all duration-500 ease-out pointer-events-none"
        style={{ background: `${color}15`, zIndex: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PaintColorShift
   Shifts background hue on hover
   ───────────────────────────────────────────── */
interface PaintColorShiftProps {
  children: ReactNode;
  colors?: string[];
  className?: string;
}

export function PaintColorShift({
  children,
  colors = ["#c75b3a", "#d4a24e", "#3b7ca5"],
  className = "",
}: PaintColorShiftProps) {
  const [idx, setIdx] = useState(0);

  return (
    <div
      className={className}
      onMouseEnter={() => setIdx((i) => (i + 1) % colors.length)}
      style={{
        color: colors[idx],
        transition: "color 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   StaggeredChildren
   Reveals children with staggered delays
   ───────────────────────────────────────────── */
interface StaggeredChildrenProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggeredChildren({
  children,
  stagger = 0.1,
  className = "",
}: StaggeredChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease ${i * stagger}s, transform 0.5s ease ${i * stagger}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TypewriterText
   Types out text character by character
   ───────────────────────────────────────────── */
interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 50,
  className = "",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let idx = 0;
    setDisplayed("");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            idx++;
            setDisplayed(text.slice(0, idx));
            if (idx >= text.length) clearInterval(interval);
          }, speed);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   CountUpNumber
   Animates a number from 0 to target
   ───────────────────────────────────────────── */
interface CountUpNumberProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUpNumber({
  target,
  duration = 2000,
  suffix = "",
  className = "",
}: CountUpNumberProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PaintSplatterTrail
   Mouse trail that leaves paint splatters
   ───────────────────────────────────────────── */
interface PaintSplatterTrailProps {
  children: ReactNode;
  colors?: string[];
  className?: string;
}

export function PaintSplatterTrail({
  children,
  colors = ["#c75b3a", "#d4a24e", "#3b7ca5"],
  className = "",
}: PaintSplatterTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (Math.random() > 0.15) return; // throttle
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 4 + Math.random() * 8;
    dot.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      border-radius:50%;background:${color};opacity:0.5;pointer-events:none;
      animation:splatterFade 1s ease-out forwards;
    `;
    el.appendChild(dot);
    setTimeout(() => dot.remove(), 1100);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      style={{ overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MicroInteractionStyles
   Global CSS keyframes for the above components
   ───────────────────────────────────────────── */
export function MicroInteractionStyles() {
  return (
    <style>{`
      @keyframes paintRipple {
        to {
          width: 300px;
          height: 300px;
          opacity: 0;
        }
      }
      @keyframes splatterFade {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(2.5); opacity: 0; }
      }
    `}</style>
  );
}
