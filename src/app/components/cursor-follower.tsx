import { useRef, useEffect, useCallback } from "react";

/* ══════════════════════════════════════
   Global Custom Cursor Follower
   ══════════════════════════════════════

   Renders two elements fixed to the viewport:
     • A small inner dot that tightly tracks the mouse
     • A larger outer ring with heavier easing (trails behind)

   Reacts to context:
     • Hovering interactive elements → scale up + color shift
     • Mouse-down → shrink (click feedback)
     • Text inputs → morphs into a vertical beam
     • Images / cards with [data-cursor="view"] → expand ring + "View" label

   Works at any CSS zoom level because it reads clientX/Y
   directly and positions via `translate` on fixed elements.
   ══════════════════════════════════════ */

type CursorMode = "default" | "hover" | "text" | "view";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  /* We store everything in refs and drive updates with rAF
     so React never re-renders — pure 60 fps perf. */
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const mode = useRef<CursorMode>("default");
  const clicking = useRef(false);
  const visible = useRef(false);

  /* Detect which cursor mode to use based on the hovered element */
  const detectMode = useCallback((target: HTMLElement): CursorMode => {
    // Text inputs
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true"
    ) {
      return "text";
    }

    // Explicit data-cursor="view"
    if (target.closest("[data-cursor='view']")) return "view";

    // Interactive
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[data-interactive]") ||
      target.closest("select") ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      window.getComputedStyle(target).cursor === "pointer"
    ) {
      return "hover";
    }

    return "default";
  }, []);

  useEffect(() => {
    /* ── Event listeners ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      mode.current = detectMode(e.target as HTMLElement);
      if (!visible.current) visible.current = true;
    };
    const onDown = () => {
      clicking.current = true;
    };
    const onUp = () => {
      clicking.current = false;
    };
    const onLeave = () => {
      visible.current = false;
    };
    const onEnter = () => {
      visible.current = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    /* ── Animation loop ── */
    let raf: number;

    const animate = () => {
      // Lerp positions
      const dotLerp = 0.22;
      const ringLerp = 0.10;

      dotPos.current.x += (mouse.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * dotLerp;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringLerp;

      const m = mode.current;
      const isClick = clicking.current;
      const isVis = visible.current;

      /* ── Dot styling ── */
      if (dotRef.current) {
        let dotScale = 1;
        let dotW = 10;
        let dotH = 10;
        let dotBg = "#d4a24e";
        let dotRadius = "50%";
        let dotOpacity = isVis ? 1 : 0;

        if (m === "hover") {
          dotScale = isClick ? 0.7 : 1.6;
          dotBg = "#c75b3a";
        } else if (m === "text") {
          dotW = 2;
          dotH = 22;
          dotRadius = "1px";
          dotBg = "#c75b3a";
          dotScale = isClick ? 0.85 : 1;
        } else if (m === "view") {
          dotScale = isClick ? 0.8 : 0.4;
          dotBg = "rgba(199,91,58,0.8)";
        } else {
          dotScale = isClick ? 0.6 : 1;
        }

        const dx = dotPos.current.x - dotW / 2;
        const dy = dotPos.current.y - dotH / 2;
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${dotScale})`;
        dotRef.current.style.width = `${dotW}px`;
        dotRef.current.style.height = `${dotH}px`;
        dotRef.current.style.borderRadius = dotRadius;
        dotRef.current.style.backgroundColor = dotBg;
        dotRef.current.style.opacity = String(dotOpacity);
      }

      /* ── Ring styling ── */
      if (ringRef.current) {
        let ringSize = 40;
        let ringScale = 1;
        let ringBorder = "1.5px solid rgba(212,162,78,0.30)";
        let ringBg = "transparent";
        let ringOpacity = isVis ? 1 : 0;

        if (m === "hover") {
          ringScale = isClick ? 0.9 : 1.5;
          ringBorder = "1.5px solid rgba(199,91,58,0.45)";
        } else if (m === "text") {
          ringScale = isClick ? 0.85 : 1.2;
          ringBorder = "1.5px solid rgba(199,91,58,0.25)";
        } else if (m === "view") {
          ringSize = 80;
          ringScale = isClick ? 0.9 : 1;
          ringBorder = "1.5px solid rgba(199,91,58,0.3)";
          ringBg = "rgba(199,91,58,0.06)";
        } else {
          ringScale = isClick ? 0.8 : 1;
        }

        const rx = ringPos.current.x - ringSize / 2;
        const ry = ringPos.current.y - ringSize / 2;
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) scale(${ringScale})`;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.border = ringBorder;
        ringRef.current.style.backgroundColor = ringBg;
        ringRef.current.style.opacity = String(ringOpacity);
      }

      /* ── "View" label inside ring ── */
      if (labelRef.current) {
        labelRef.current.style.opacity = m === "view" ? "1" : "0";
        labelRef.current.style.transform = m === "view" ? "scale(1)" : "scale(0.6)";
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [detectMode]);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          zIndex: 99999,
          width: 10,
          height: 10,
          backgroundColor: "#d4a24e",
          opacity: 0,
          willChange: "transform",
          transition:
            "background-color 0.25s ease, width 0.25s ease, height 0.25s ease, border-radius 0.25s ease, opacity 0.25s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center"
        style={{
          zIndex: 99998,
          width: 40,
          height: 40,
          border: "1.5px solid rgba(212,162,78,0.30)",
          opacity: 0,
          willChange: "transform",
          transition:
            "border 0.25s ease, width 0.35s ease, height 0.35s ease, background-color 0.25s ease, opacity 0.25s ease",
          backdropFilter: "blur(1px)",
        }}
      >
        {/* "View" label shown on data-cursor="view" elements */}
        <span
          ref={labelRef}
          className="font-['Fira_Sans:Medium',sans-serif] font-medium text-[11px] tracking-[1.5px] text-[#c75b3a] uppercase select-none"
          style={{
            opacity: 0,
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          View
        </span>
      </div>
    </>
  );
}