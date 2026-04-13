import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigation } from "./navigation-context";
import { ScrollReveal } from "./micro-interactions";
import { Heart, ChevronUp, ChevronDown, ArrowRight, Search, X, SlidersHorizontal, ChevronRight, Check } from "lucide-react";
import { useSEO } from "./use-seo";

/* ── Palette ── */
const DARK_NAVY = "#1a1428";
const SIENNA = "#c75b3a";
const GOLD = "#d4a24e";

const PURPLE_CTA = "#4a2d8a";

const HERO_IMG = "https://images.unsplash.com/photo-1631127900584-188260979218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

/* Room visualisation images for the popup */
const ROOM_IMAGES = [
  "https://images.unsplash.com/photo-1761782623468-6374c2a887d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1726108397211-6507220a6a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1758448511421-debb41f3e621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1768056878281-5a484402ec6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1771838230544-aac51a5fcd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
];

/* ═══════════════════════════════════════════
   COLOUR FAMILY CATEGORIES
   ═══════════════════════════════════════════ */
interface ColourFamily {
  id: string;
  label: string;
  heroTitle: string;
  swatchColors: string[];     // 2-4 tiny preview colours
}

const COLOUR_FAMILIES: ColourFamily[] = [
  { id: "all",      label: "ALL COLOURS",           heroTitle: "All Wall Colour Paint Shades",                swatchColors: ["#e63946", "#f4a261", "#a8dadc", "#6a994e", "#7b2cbf", "#ffb5a7"] },
  { id: "greys",    label: "GREYS",                  heroTitle: "Grey Wall Colour Paint Shades",               swatchColors: ["#d6ccc2", "#bdb5aa"] },
  { id: "blues",    label: "BLUES",                  heroTitle: "Blue Wall Colour Paint Shades",               swatchColors: ["#4361ee", "#3a86ff"] },
  { id: "browns",   label: "BROWNS",                 heroTitle: "Brown Wall Colour Paint Shades",              swatchColors: ["#8b5e3c", "#c4813d"] },
  { id: "reds",     label: "REDS & ORANGES",         heroTitle: "Red & Orange Wall Colour Paint Shades",       swatchColors: ["#d62828", "#f4845f"] },
  { id: "yellows",  label: "YELLOWS & GREENS",       heroTitle: "Yellow & Green Wall Colour Paint Shades",     swatchColors: ["#e9c46a", "#6a994e"] },
  { id: "purples",  label: "PURPLES & PINKS",        heroTitle: "Purple & Pink Wall Colour Paint Shades",      swatchColors: ["#7b2cbf", "#f4acb7"] },
  { id: "whites",   label: "WHITES & OFF WHITES",    heroTitle: "White & Off-White Wall Colour Paint Shades",  swatchColors: ["#fefae0", "#e8e0d5"] },
];

/* ═══════════════════════════════════════════
   MOCK COLOUR DATA
   ═══════════════════════════════════════════ */
interface PaintColour {
  id: number;
  name: string;
  code: string;
  hex: string;
  family: string;
  temperature: "cool" | "warm";
  rooms: string[];
  tonality: "light" | "medium" | "dark";
}

const PAINT_COLOURS: PaintColour[] = [
  /* Greys */
  { id: 1, name: "Confetti", code: "8300", hex: "#d6ccc2", family: "greys", temperature: "warm", rooms: ["Living Room", "Bedroom"], tonality: "light" },
  { id: 2, name: "White Gold", code: "8292", hex: "#cec5b5", family: "greys", temperature: "warm", rooms: ["Living Room", "Study Room"], tonality: "light" },
  { id: 3, name: "Snowflake", code: "8332", hex: "#d3cab9", family: "greys", temperature: "warm", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
  { id: 4, name: "Silver Mist", code: "8145", hex: "#b8b4ae", family: "greys", temperature: "cool", rooms: ["Living Room", "Study Room"], tonality: "medium" },
  { id: 5, name: "Pewter Grey", code: "8167", hex: "#9a9590", family: "greys", temperature: "cool", rooms: ["Study Room", "Living Room"], tonality: "medium" },
  { id: 6, name: "Smoke Signal", code: "8201", hex: "#827d77", family: "greys", temperature: "cool", rooms: ["Bedroom", "Living Room"], tonality: "dark" },
  { id: 7, name: "Warm Flannel", code: "8310", hex: "#a8a09a", family: "greys", temperature: "warm", rooms: ["Bedroom", "Prayer Room"], tonality: "medium" },
  { id: 8, name: "Platinum Haze", code: "8421", hex: "#c4beb4", family: "greys", temperature: "cool", rooms: ["Living Room", "Niches & Alcoves"], tonality: "light" },
  { id: 9, name: "Morning Fog", code: "8503", hex: "#c0bbb3", family: "greys", temperature: "cool", rooms: ["Bedroom", "Living Room"], tonality: "light" },
  /* Blues */
  { id: 10, name: "Ocean Breeze", code: "7201", hex: "#7db8d4", family: "blues", temperature: "cool", rooms: ["Bedroom", "Kids Room"], tonality: "medium" },
  { id: 11, name: "Midnight Sky", code: "7305", hex: "#3a5f8a", family: "blues", temperature: "cool", rooms: ["Study Room", "Bedroom"], tonality: "dark" },
  { id: 12, name: "Powder Blue", code: "7110", hex: "#b5d4e8", family: "blues", temperature: "cool", rooms: ["Kids Room", "Bedroom"], tonality: "light" },
  { id: 13, name: "Cerulean Tide", code: "7280", hex: "#5b97c4", family: "blues", temperature: "cool", rooms: ["Living Room", "Bedroom"], tonality: "medium" },
  { id: 14, name: "Arctic Frost", code: "7052", hex: "#d4e5f0", family: "blues", temperature: "cool", rooms: ["Bedroom", "Living Room"], tonality: "light" },
  { id: 15, name: "Deep Sapphire", code: "7410", hex: "#2c4d7a", family: "blues", temperature: "cool", rooms: ["Study Room", "Living Room"], tonality: "dark" },
  /* Browns */
  { id: 16, name: "Caramel Latte", code: "6102", hex: "#c4a882", family: "browns", temperature: "warm", rooms: ["Living Room", "Bedroom"], tonality: "medium" },
  { id: 17, name: "Toasted Almond", code: "6210", hex: "#a88b6a", family: "browns", temperature: "warm", rooms: ["Living Room", "Prayer Room"], tonality: "medium" },
  { id: 18, name: "Rustic Oak", code: "6340", hex: "#8b6e4e", family: "browns", temperature: "warm", rooms: ["Study Room", "Living Room"], tonality: "dark" },
  { id: 19, name: "Sand Dune", code: "6055", hex: "#d8c8a8", family: "browns", temperature: "warm", rooms: ["Bedroom", "Living Room"], tonality: "light" },
  { id: 20, name: "Mocha Swirl", code: "6415", hex: "#7a5e42", family: "browns", temperature: "warm", rooms: ["Study Room", "Bedroom"], tonality: "dark" },
  { id: 21, name: "Honey Wheat", code: "6088", hex: "#c9b48c", family: "browns", temperature: "warm", rooms: ["Living Room", "Bedroom"], tonality: "medium" },
  /* Reds & Oranges */
  { id: 22, name: "Terracotta Sun", code: "5102", hex: "#c9704d", family: "reds", temperature: "warm", rooms: ["Living Room", "Highlight Walls"], tonality: "medium" },
  { id: 23, name: "Coral Bliss", code: "5205", hex: "#e88a72", family: "reds", temperature: "warm", rooms: ["Bedroom", "Kids Room"], tonality: "medium" },
  { id: 24, name: "Crimson Rose", code: "5310", hex: "#b84050", family: "reds", temperature: "warm", rooms: ["Highlight Walls", "Living Room"], tonality: "dark" },
  { id: 25, name: "Sunset Glow", code: "5055", hex: "#e8a868", family: "reds", temperature: "warm", rooms: ["Kids Room", "Living Room"], tonality: "light" },
  { id: 26, name: "Burnt Amber", code: "5420", hex: "#a05530", family: "reds", temperature: "warm", rooms: ["Study Room", "Living Room"], tonality: "dark" },
  { id: 27, name: "Peach Blossom", code: "5018", hex: "#f0c4a8", family: "reds", temperature: "warm", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
  /* Yellows & Greens */
  { id: 28, name: "Lemon Zest", code: "4102", hex: "#e8d06a", family: "yellows", temperature: "warm", rooms: ["Kitchen", "Kids Room"], tonality: "medium" },
  { id: 29, name: "Sage Garden", code: "4205", hex: "#8a9e6c", family: "yellows", temperature: "cool", rooms: ["Bedroom", "Living Room"], tonality: "medium" },
  { id: 30, name: "Olive Grove", code: "4310", hex: "#6b7e52", family: "yellows", temperature: "cool", rooms: ["Study Room", "Living Room"], tonality: "dark" },
  { id: 31, name: "Butter Cream", code: "4055", hex: "#f0e4a8", family: "yellows", temperature: "warm", rooms: ["Kids Room", "Bedroom"], tonality: "light" },
  { id: 32, name: "Mint Julep", code: "4180", hex: "#a8d4b0", family: "yellows", temperature: "cool", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
  { id: 33, name: "Fern Canopy", code: "4390", hex: "#5e7848", family: "yellows", temperature: "cool", rooms: ["Living Room", "Study Room"], tonality: "dark" },
  /* Purples & Pinks */
  { id: 34, name: "Lavender Dream", code: "3105", hex: "#c4a8d0", family: "purples", temperature: "cool", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
  { id: 35, name: "Plum Velvet", code: "3210", hex: "#7a4870", family: "purples", temperature: "cool", rooms: ["Bedroom", "Highlight Walls"], tonality: "dark" },
  { id: 36, name: "Rose Quartz", code: "3055", hex: "#e0b4c0", family: "purples", temperature: "warm", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
  { id: 37, name: "Orchid Mist", code: "3320", hex: "#a878a8", family: "purples", temperature: "cool", rooms: ["Bedroom", "Living Room"], tonality: "medium" },
  { id: 38, name: "Berry Crush", code: "3445", hex: "#8e3862", family: "purples", temperature: "warm", rooms: ["Highlight Walls", "Living Room"], tonality: "dark" },
  { id: 39, name: "Blush Pink", code: "3018", hex: "#f0c8c8", family: "purples", temperature: "warm", rooms: ["Kids Room", "Bedroom"], tonality: "light" },
  /* Whites & Off-Whites */
  { id: 40, name: "Fresh Linen", code: "9102", hex: "#f5f0e8", family: "whites", temperature: "warm", rooms: ["All Rooms", "Bedroom"], tonality: "light" },
  { id: 41, name: "Antique Ivory", code: "9210", hex: "#ede5d4", family: "whites", temperature: "warm", rooms: ["Living Room", "Bedroom"], tonality: "light" },
  { id: 42, name: "Pearl Drop", code: "9055", hex: "#f8f4ee", family: "whites", temperature: "cool", rooms: ["All Rooms", "Kids Room"], tonality: "light" },
  { id: 43, name: "Cotton Cloud", code: "9320", hex: "#eee8dc", family: "whites", temperature: "warm", rooms: ["Bedroom", "Living Room"], tonality: "light" },
  { id: 44, name: "Swiss Coffee", code: "9415", hex: "#e4ddd0", family: "whites", temperature: "warm", rooms: ["Living Room", "Niches & Alcoves"], tonality: "light" },
  { id: 45, name: "Moonbeam", code: "9018", hex: "#f0ece4", family: "whites", temperature: "cool", rooms: ["Bedroom", "Kids Room"], tonality: "light" },
];

/* ═══════════════════════════════════════════
   FILTER OPTIONS
   ═══════════════════════════════════════════ */
const FILTER_ROOMS = [
  "All Rooms", "Bedroom", "Doors & Windows", "Entertainment Room", "Exterior Body",
  "Exterior Trims And Accents", "Highlight Walls", "Kids Room", "Kitchen",
  "Living Room", "Niches & Alcoves", "Prayer Room", "Study Room",
];

const FILTER_TONALITY = ["Light", "Medium", "Dark"];

/* ═══════════════════════════════════════════
   FILTER ACCORDION SECTION
   ═══════════════════════════════════════════ */
function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid #e8e4dc" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 border-0 bg-transparent cursor-pointer"
      >
        <span
          className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase"
          style={{ color: DARK_NAVY, fontWeight: 600 }}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} style={{ color: `${DARK_NAVY}55` }} />
        ) : (
          <ChevronDown size={16} style={{ color: `${DARK_NAVY}55` }} />
        )}
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? 600 : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHECKBOX ITEM
   ═══════════════════════════════════════════ */
function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 py-[6px] cursor-pointer group">
      <div
        className="w-[16px] h-[16px] rounded-[3px] flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          border: checked ? `2px solid ${SIENNA}` : "2px solid #c8c2b8",
          backgroundColor: checked ? SIENNA : "transparent",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        className="font-['Jost',sans-serif] text-[13.5px] transition-colors duration-200 group-hover:text-[#c75b3a]"
        style={{ color: checked ? DARK_NAVY : `${DARK_NAVY}bb`, fontWeight: checked ? 500 : 400 }}
      >
        {label}{" "}
        <span style={{ color: `${DARK_NAVY}45` }}>({count})</span>
      </span>
    </label>
  );
}

/* ═══════════════════════════════════════════
   COLOUR SWATCH CARD
   ═══════════════════════════════════════════ */
function ColourCard({
  colour,
  isFavourite,
  onToggleFavourite,
  onClick,
}: {
  colour: PaintColour;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onClick: () => void;
}) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      {/* Swatch */}
      <div
        className="relative w-full rounded-[8px] overflow-hidden mb-3 transition-shadow duration-300 group-hover:shadow-lg"
        style={{ backgroundColor: colour.hex, aspectRatio: "1 / 0.8" }}
      >
        {/* Favourite heart */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavourite(); }}
          className="absolute top-3 right-3 w-[32px] h-[32px] rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor: isFavourite ? SIENNA : "rgba(255,255,255,0.85)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Heart
            size={15}
            fill={isFavourite ? "white" : "none"}
            stroke={isFavourite ? "white" : `${DARK_NAVY}55`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-['Jost',sans-serif] text-[14.5px] group-hover:text-[#c75b3a] transition-colors duration-200"
            style={{ color: DARK_NAVY, fontWeight: 500 }}
          >
            {colour.name}
          </span>
          <ArrowRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
            style={{ color: SIENNA }}
          />
        </div>
      </div>
      <span
        className="font-['Jost',sans-serif] text-[12.5px] block mt-0.5"
        style={{ color: `${DARK_NAVY}50`, fontWeight: 400 }}
      >
        {colour.code}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CATEGORY TAB
   ═══════════════════════════════════════════ */
function CategoryTab({
  family,
  isActive,
  onClick,
}: {
  family: ColourFamily;
  isActive: boolean;
  onClick: () => void;
}) {
  const isAllColours = family.id === "all";

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 px-3 sm:px-4 lg:px-5 py-3 border-0 bg-transparent cursor-pointer relative shrink-0 transition-all duration-200"
    >
      {/* Swatch preview */}
      <div
        className="w-[52px] h-[30px] rounded-[6px] overflow-hidden flex transition-all duration-200"
        style={{
          border: isActive ? `2px solid ${DARK_NAVY}` : "2px solid transparent",
          boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {isAllColours ? (
          <div className="w-full h-full flex">
            {["#e63946", "#f4a261", "#2a9d8f", "#264653", "#e9c46a", "#7b2cbf"].map((c) => (
              <div key={c} className="flex-1 h-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        ) : (
          family.swatchColors.map((c, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
          ))
        )}
      </div>

      {/* Label */}
      <span
        className="font-['Jost',sans-serif] text-[10px] tracking-[1px] uppercase text-center whitespace-nowrap"
        style={{
          color: isActive ? DARK_NAVY : `${DARK_NAVY}65`,
          fontWeight: isActive ? 700 : 500,
        }}
      >
        {family.label}
      </span>

      {/* Active underline */}
      {isActive && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
          style={{ width: "60%", backgroundColor: DARK_NAVY }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   COLOUR DETAIL POPUP
   ═══════════════════════════════════════════ */
function generateRelatedShades(hex: string): string[] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const shades: string[] = [];
  const offsets = [-30, -20, -12, -5, 5, 12, 20, 28];
  for (const off of offsets) {
    const nr = Math.min(255, Math.max(0, r + off));
    const ng = Math.min(255, Math.max(0, g + off));
    const nb = Math.min(255, Math.max(0, b + off));
    shades.push(`#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`);
  }
  return shades;
}

function ColourDetailPopup({
  colour,
  isFavourite,
  onToggleFavourite,
  onClose,
  onSelectColour,
}: {
  colour: PaintColour;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onClose: () => void;
  onSelectColour: (c: PaintColour) => void;
}) {
  const [activeShadeIdx, setActiveShadeIdx] = useState(7); // last shade = closest to original
  const [roomIdx, setRoomIdx] = useState(0);
  const relatedShades = useMemo(() => generateRelatedShades(colour.hex), [colour.hex]);
  const roomImage = ROOM_IMAGES[colour.id % ROOM_IMAGES.length];
  const familySiblings = PAINT_COLOURS.filter((c) => c.family === colour.family && c.id !== colour.id).slice(0, 7);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10000] transition-opacity duration-300"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6">
        <div
          className="w-full max-w-[960px] bg-white rounded-[8px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main content: Left swatches + Right room image */}
          <div className="flex flex-col md:flex-row" style={{ minHeight: 340 }}>
            {/* ── Left: Shade grid ── */}
            <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col" style={{ backgroundColor: "#f8f7f4" }}>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {relatedShades.map((shade, i) => {
                  const isSelected = i === activeShadeIdx;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveShadeIdx(i)}
                      className="relative border-0 cursor-pointer p-0 transition-all duration-200 hover:scale-[1.04]"
                      style={{
                        aspectRatio: "1",
                        backgroundColor: shade,
                        borderRadius: 6,
                        boxShadow: isSelected ? "0 4px 16px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
                        outline: isSelected ? "2.5px solid rgba(255,255,255,0.9)" : "none",
                        outlineOffset: -2,
                      }}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.75)", backdropFilter: "blur(4px)" }}
                          >
                            <Check size={14} style={{ color: DARK_NAVY }} strokeWidth={2.5} />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Room visualisation ── */}
            <div className="flex-1 relative" style={{ minHeight: 280 }}>
              <img
                src={roomImage}
                alt={`${colour.name} room visualisation`}
                className="w-full h-full object-cover"
                style={{ minHeight: 280 }}
              />
              {/* Colour tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${relatedShades[activeShadeIdx]}30 0%, transparent 50%)`,
                  mixBlendMode: "multiply",
                }}
              />

              {/* Top-right actions: Heart + Close */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavourite(); }}
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: isFavourite ? SIENNA : "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  <Heart
                    size={16}
                    fill={isFavourite ? "white" : "none"}
                    stroke={isFavourite ? "white" : SIENNA}
                    strokeWidth={1.8}
                  />
                </button>
                <button
                  onClick={onClose}
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  <X size={16} style={{ color: DARK_NAVY }} />
                </button>
              </div>

              {/* Right chevron for room navigation */}
              <button
                onClick={() => {/* room carousel placeholder */}}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                <ChevronRight size={18} style={{ color: DARK_NAVY }} />
              </button>
            </div>
          </div>

          {/* ── Bottom bar: Name + CTAs ── */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 py-4 sm:py-5"
            style={{ borderTop: "1px solid #eee" }}
          >
            {/* Colour info */}
            <div className="shrink-0">
              <h3
                className="font-['Jost',sans-serif] text-[22px] sm:text-[26px] m-0"
                style={{ color: DARK_NAVY, fontWeight: 600 }}
              >
                {colour.name}
              </h3>
              <p
                className="font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase m-0 mt-0.5"
                style={{ color: `${DARK_NAVY}55`, fontWeight: 400 }}
              >
                COLOUR CODE -{colour.code}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                className="h-[42px] px-6 rounded-[4px] font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-200 hover:bg-[#f5f2ec]"
                style={{
                  fontWeight: 600,
                  color: DARK_NAVY,
                  backgroundColor: "transparent",
                  border: `1.5px solid ${DARK_NAVY}30`,
                }}
              >
                Buy Now
              </button>
              <button
                className="h-[42px] px-6 rounded-[4px] font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-200 hover:bg-[#f5f2ec]"
                style={{
                  fontWeight: 600,
                  color: PURPLE_CTA,
                  backgroundColor: "transparent",
                  border: `1.5px solid ${PURPLE_CTA}40`,
                }}
              >
                Buy Now
              </button>
              <button
                className="h-[42px] px-6 rounded-[4px] font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-200 hover:opacity-90 text-white"
                style={{
                  fontWeight: 600,
                  backgroundColor: PURPLE_CTA,
                  border: `1.5px solid ${PURPLE_CTA}`,
                }}
              >
                Speak to Professional
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN SEARCH PAGE
   ═══════════════════════════════════════════ */
export function SearchPage() {
  const { searchQuery } = useNavigation();
  const [activeFamily, setActiveFamily] = useState("greys");
  const [favourites, setFavourites] = useState<Set<number>>(new Set());

  useSEO({
    title: "Colour Search & Browse | 1,800+ Paint Shades — Teknas Paints Colour Catalogue",
    description: "Explore Teknas Paints' curated colour catalogue with 1,800+ shades organised by colour family — Greys, Blues, Greens, Neutrals, Warm Tones, Pastels, and more. Search by name, code, or hex value. Save favourites, filter by undertone (warm, cool, neutral), and use our Room Visualiser to preview colours on your walls. All colours available in low-VOC, GREENGUARD Gold certified formulations.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Teknas Paints Colour Catalogue",
        description: "Search and browse 1,800+ paint shades by colour family, name, code, or hex value. Visualise colours in your room. All shades available in eco-friendly low-VOC formulations.",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.teknaspaints.com/" },
          { "@type": "ListItem", position: 2, name: "Colour Search", item: "https://www.teknaspaints.com/colours" },
        ],
      },
    ],
  });
  const [searchText, setSearchText] = useState(searchQuery || "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedColour, setSelectedColour] = useState<PaintColour | null>(null);

  /* Sync searchQuery from navigation context when it changes */
  useEffect(() => {
    if (searchQuery) setSearchText(searchQuery);
  }, [searchQuery]);

  /* Filter state */
  const [openSections, setOpenSections] = useState({
    temperature: true,
    room: true,
    tonality: true,
  });
  const [selectedTemps, setSelectedTemps] = useState<Set<string>>(new Set());
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [selectedTonality, setSelectedTonality] = useState<Set<string>>(new Set());

  const toggleSection = (s: "temperature" | "room" | "tonality") => {
    setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const toggleFavourite = useCallback((id: number) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTemp = useCallback((value: string) => {
    setSelectedTemps((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const toggleRoom = useCallback((value: string) => {
    setSelectedRooms((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const toggleTonality = useCallback((value: string) => {
    setSelectedTonality((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const currentFamily = COLOUR_FAMILIES.find((f) => f.id === activeFamily) || COLOUR_FAMILIES[0];

  /* Base colours scoped to current family (before any sidebar filters) */
  const familyScopedColours = useMemo(() => {
    return activeFamily === "all"
      ? PAINT_COLOURS
      : PAINT_COLOURS.filter((c) => c.family === activeFamily);
  }, [activeFamily]);

  /* Filtered results */
  const filteredColours = useMemo(() => {
    return familyScopedColours.filter((c) => {
      /* Search text */
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.code.toLowerCase().includes(q) &&
          !c.hex.toLowerCase().includes(q)
        )
          return false;
      }

      /* Temperature */
      if (selectedTemps.size > 0 && !selectedTemps.has(c.temperature)) return false;

      /* Room */
      if (selectedRooms.size > 0 && !c.rooms.some((r) => selectedRooms.has(r))) return false;

      /* Tonality */
      if (selectedTonality.size > 0 && !selectedTonality.has(c.tonality)) return false;

      return true;
    });
  }, [familyScopedColours, searchText, selectedTemps, selectedRooms, selectedTonality]);

  /* Dynamic filter counts — scoped to family + other active filters (cross-filtering) */
  const tempCounts = useMemo(() => {
    // Count colours that match family + room + tonality + search (excluding temp filter itself)
    const base = familyScopedColours.filter((c) => {
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q) && !c.hex.toLowerCase().includes(q)) return false;
      }
      if (selectedRooms.size > 0 && !c.rooms.some((r) => selectedRooms.has(r))) return false;
      if (selectedTonality.size > 0 && !selectedTonality.has(c.tonality)) return false;
      return true;
    });
    return {
      cool: base.filter((c) => c.temperature === "cool").length,
      warm: base.filter((c) => c.temperature === "warm").length,
    };
  }, [familyScopedColours, searchText, selectedRooms, selectedTonality]);

  const roomCounts = useMemo(() => {
    // Count colours that match family + temp + tonality + search (excluding room filter itself)
    const base = familyScopedColours.filter((c) => {
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q) && !c.hex.toLowerCase().includes(q)) return false;
      }
      if (selectedTemps.size > 0 && !selectedTemps.has(c.temperature)) return false;
      if (selectedTonality.size > 0 && !selectedTonality.has(c.tonality)) return false;
      return true;
    });
    const counts: Record<string, number> = {};
    FILTER_ROOMS.forEach((r) => {
      counts[r] = base.filter((c) => c.rooms.includes(r)).length;
    });
    return counts;
  }, [familyScopedColours, searchText, selectedTemps, selectedTonality]);

  const tonalityCounts = useMemo(() => {
    // Count colours that match family + temp + room + search (excluding tonality filter itself)
    const base = familyScopedColours.filter((c) => {
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q) && !c.hex.toLowerCase().includes(q)) return false;
      }
      if (selectedTemps.size > 0 && !selectedTemps.has(c.temperature)) return false;
      if (selectedRooms.size > 0 && !c.rooms.some((r) => selectedRooms.has(r))) return false;
      return true;
    });
    return {
      light: base.filter((c) => c.tonality === "light").length,
      medium: base.filter((c) => c.tonality === "medium").length,
      dark: base.filter((c) => c.tonality === "dark").length,
    };
  }, [familyScopedColours, searchText, selectedTemps, selectedRooms]);

  const hasActiveFilters = selectedTemps.size > 0 || selectedRooms.size > 0 || selectedTonality.size > 0 || searchText.trim().length > 0;
  const activeFilterCount = selectedTemps.size + selectedRooms.size + selectedTonality.size + (searchText.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedTemps(new Set());
    setSelectedRooms(new Set());
    setSelectedTonality(new Set());
    setSearchText("");
  };

  /* Active filter tags for display */
  const activeFilterTags = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];
    if (searchText.trim()) {
      tags.push({ label: `"${searchText}"`, onRemove: () => setSearchText("") });
    }
    selectedTemps.forEach((t) => {
      tags.push({ label: t === "cool" ? "Cool" : "Warm", onRemove: () => toggleTemp(t) });
    });
    selectedRooms.forEach((r) => {
      tags.push({ label: r, onRemove: () => toggleRoom(r) });
    });
    selectedTonality.forEach((t) => {
      tags.push({ label: t.charAt(0).toUpperCase() + t.slice(1), onRemove: () => toggleTonality(t) });
    });
    return tags;
  }, [searchText, selectedTemps, selectedRooms, selectedTonality, toggleTemp, toggleRoom, toggleTonality]);

  /* ── Sidebar content (shared between desktop & mobile) ── */
  const filterSidebar = (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span
          className="font-['Jost',sans-serif] text-[11px] tracking-[3px] uppercase"
          style={{ color: `${DARK_NAVY}55`, fontWeight: 500 }}
        >
          Filter By
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="font-['Jost',sans-serif] text-[11px] border-0 bg-transparent cursor-pointer underline"
            style={{ color: SIENNA, fontWeight: 500 }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search within colours */}
      <div
        className="flex items-center h-[38px] rounded-[8px] px-3 gap-2 mb-3"
        style={{ border: `1px solid ${searchText.trim() ? SIENNA + "60" : "#e0dbd2"}`, backgroundColor: "white", transition: "border-color 0.2s" }}
      >
        <Search size={14} style={{ color: searchText.trim() ? SIENNA : `${DARK_NAVY}35` }} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search colour name or code..."
          className="font-['Jost',sans-serif] text-[12.5px] bg-transparent border-none outline-none w-full"
          style={{ color: DARK_NAVY, fontWeight: 400 }}
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="border-0 bg-transparent cursor-pointer p-0"
          >
            <X size={12} style={{ color: `${DARK_NAVY}45` }} />
          </button>
        )}
      </div>

      {/* Color Temperature */}
      <FilterSection
        title="Color Temperature"
        isOpen={openSections.temperature}
        onToggle={() => toggleSection("temperature")}
      >
        <FilterCheckbox
          label="Cool"
          count={tempCounts.cool}
          checked={selectedTemps.has("cool")}
          onChange={() => toggleTemp("cool")}
        />
        <FilterCheckbox
          label="Warm"
          count={tempCounts.warm}
          checked={selectedTemps.has("warm")}
          onChange={() => toggleTemp("warm")}
        />
      </FilterSection>

      {/* Room */}
      <FilterSection
        title="Room"
        isOpen={openSections.room}
        onToggle={() => toggleSection("room")}
      >
        {FILTER_ROOMS.map((room) => (
          <FilterCheckbox
            key={room}
            label={room}
            count={roomCounts[room] || 0}
            checked={selectedRooms.has(room)}
            onChange={() => toggleRoom(room)}
          />
        ))}
      </FilterSection>

      {/* Tonality */}
      <FilterSection
        title="Tonality"
        isOpen={openSections.tonality}
        onToggle={() => toggleSection("tonality")}
      >
        {FILTER_TONALITY.map((t) => (
          <FilterCheckbox
            key={t}
            label={t}
            count={tonalityCounts[t.toLowerCase() as keyof typeof tonalityCounts] || 0}
            checked={selectedTonality.has(t.toLowerCase())}
            onChange={() => toggleTonality(t.toLowerCase())}
          />
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#faf9f6" }}>
      {/* ════════════ HERO BANNER ════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 40vw, 420px)", paddingTop: 121 }}>
        <img
          src={HERO_IMG}
          alt="Paint colour swatches"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${DARK_NAVY}80 0%, transparent 70%)` }}
        />

        {/* Hero text */}
        <div className="relative z-[2] flex flex-col items-center justify-center h-full text-center px-6">
          <span
            className="font-['Jost',sans-serif] text-[11px] sm:text-[12px] tracking-[5px] uppercase mb-3"
            style={{ color: GOLD, fontWeight: 500 }}
          >
            Colour Ideas For Your Home
          </span>
          <h1
            className="font-['Jost',sans-serif] text-[clamp(26px,4.5vw,52px)] text-white m-0 leading-[1.15] max-w-[700px]"
            style={{ fontWeight: 600 }}
          >
            {currentFamily.heroTitle}
          </h1>
        </div>
      </div>

      {/* ════════════ CATEGORY TABS ════════════ */}
      <div className="w-full bg-white" style={{ borderBottom: "1px solid #e8e4dc" }}>
        <div className="max-w-[1400px] mx-auto overflow-x-auto">
          <div className="flex items-center justify-start lg:justify-center min-w-max px-4 lg:px-0">
            {COLOUR_FAMILIES.map((fam) => (
              <CategoryTab
                key={fam.id}
                family={fam}
                isActive={activeFamily === fam.id}
                onClick={() => { setActiveFamily(fam.id); clearAllFilters(); }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════ MAIN CONTENT ════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 lg:py-12">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 h-[40px] px-4 rounded-[8px] border-0 cursor-pointer font-['Jost',sans-serif] text-[13px]"
            style={{
              backgroundColor: mobileFiltersOpen ? DARK_NAVY : "white",
              color: mobileFiltersOpen ? "white" : DARK_NAVY,
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] text-white"
                style={{ backgroundColor: SIENNA, fontWeight: 700 }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
          {mobileFiltersOpen && (
            <div className="mt-3 p-4 rounded-[12px] bg-white" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              {filterSidebar}
            </div>
          )}
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-[230px] xl:w-[250px] shrink-0">
            <ScrollReveal>
              {filterSidebar}
            </ScrollReveal>
          </aside>

          {/* ── Colour Grid ── */}
          <main className="flex-1 min-w-0">
            {/* Family heading + count */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2
                    className="font-['Jost',sans-serif] text-[28px] sm:text-[34px] m-0 mb-1"
                    style={{ color: DARK_NAVY, fontWeight: 700 }}
                  >
                    {activeFamily === "all"
                      ? "ALL COLOURS"
                      : currentFamily.label}
                  </h2>
                  <p
                    className="font-['Jost',sans-serif] text-[13px] m-0"
                    style={{ color: `${DARK_NAVY}50`, fontWeight: 400 }}
                  >
                    {filteredColours.length} shade{filteredColours.length !== 1 ? "s" : ""} found
                    {hasActiveFilters && " (filtered)"}
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="hidden lg:flex items-center gap-1.5 h-[32px] px-3.5 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[11.5px] tracking-[1px] uppercase transition-all duration-200 hover:bg-[#f0ebe3]"
                    style={{ color: SIENNA, fontWeight: 600, backgroundColor: `${SIENNA}08` }}
                  >
                    <X size={12} />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Active filter tags */}
              {activeFilterTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeFilterTags.map((tag, i) => (
                    <span
                      key={`${tag.label}-${i}`}
                      className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full font-['Jost',sans-serif] text-[11.5px] transition-all duration-200 hover:shadow-sm"
                      style={{ backgroundColor: `${SIENNA}0c`, color: SIENNA, fontWeight: 500, border: `1px solid ${SIENNA}20` }}
                    >
                      {tag.label}
                      <button
                        onClick={tag.onRemove}
                        className="border-0 bg-transparent cursor-pointer p-0 flex items-center justify-center hover:opacity-70 transition-opacity"
                      >
                        <X size={11} style={{ color: SIENNA }} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Grid */}
            {filteredColours.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
                {filteredColours.map((c, i) => (
                  <ScrollReveal key={c.id} delay={Math.min(i * 0.04, 0.4)}>
                    <ColourCard
                      colour={c}
                      isFavourite={favourites.has(c.id)}
                      onToggleFavourite={() => toggleFavourite(c.id)}
                      onClick={() => setSelectedColour(c)}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: `${GOLD}10` }}
                >
                  <Search size={32} style={{ color: `${GOLD}50` }} />
                </div>
                <h3
                  className="font-['Jost',sans-serif] text-[20px] mb-2"
                  style={{ color: DARK_NAVY, fontWeight: 600 }}
                >
                  No Colours Found
                </h3>
                <p
                  className="font-['Jost',sans-serif] text-[14px] mb-6 max-w-[400px] mx-auto leading-[24px]"
                  style={{ color: `${DARK_NAVY}55`, fontWeight: 300 }}
                >
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="h-[44px] px-6 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[13px] tracking-[1px] text-white transition-all duration-300 uppercase"
                  style={{ fontWeight: 600, backgroundColor: SIENNA }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ════════════ COLOUR DETAIL POPUP ════════════ */}
      {selectedColour && (
        <ColourDetailPopup
          colour={selectedColour}
          isFavourite={favourites.has(selectedColour.id)}
          onToggleFavourite={() => toggleFavourite(selectedColour.id)}
          onClose={() => setSelectedColour(null)}
          onSelectColour={(c) => setSelectedColour(c)}
        />
      )}
    </div>
  );
}