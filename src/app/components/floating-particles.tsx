import { useMemo } from "react";

/* ══════════════════════════════════════
   Floating Particles — Shared Hero Overlay
   ══════════════════════════════════════ */
export function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor:
              p.id % 3 === 0
                ? "#d4a24e"
                : p.id % 3 === 1
                ? "#c75b3a"
                : "#3b7ca5",
            opacity: p.opacity,
            animation: `particle-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
