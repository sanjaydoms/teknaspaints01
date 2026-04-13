import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation, type ViewType } from "./navigation-context";
import { MagneticElement } from "./micro-interactions";
import svgPaths from "../../imports/svg-lnzh5yokfu";
import { Search, ChevronDown } from "lucide-react";

/* ── Brand palette ── */
const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const MEGA_HEADER = "#8b7355";

/* ── Colour by family (plain text, 2-column grid) ── */
const COLOUR_FAMILIES_LEFT = ["All Colours", "Grey", "Blue", "Brown", "Red", "Orange", "Yellow"];
const COLOUR_FAMILIES_RIGHT = ["Green", "Purple", "Pink", "Whites", "Off Whites"];

const COLOUR_COLLECTIONS = ["Royale Designer", "Colour of the year"];

const COLOUR_TOOLS: { label: string; isNew?: boolean }[] = [
  { label: "Colour Quiz" },
  { label: "Wall Paint Finder" },
  { label: "Wood Paint Finder" },
  { label: "Wood Finish Visualiser" },
  { label: "Textures For You", isNew: true },
  { label: "Shade Cards", isNew: true },
  { label: "Visualize Shades" },
];

const INSPIRATIONS = ["Colour combinations", "Celebrity homes", "Home discoveries"];

/* ── Products mega-menu data ── */
const PRODUCTS_COLS: { header: string; items: string[] }[] = [
  {
    header: "For Interior Walls",
    items: ["Paints", "Textures", "Turpentine Oils"],
  },
  {
    header: "For Exterior Walls",
    items: ["Paints", "Textures"],
  },
  {
    header: "Waterproofing",
    items: ["All products", "Bathrooms", "Terrace & tanks", "Cracks & joints", "Interior", "Tiling", "Exteriors"],
  },
  {
    header: "Other Surface",
    items: ["Wood Finishes", "Metal paints", "Undercoats", "Adhesives", "Brushes & Ancillaries"],
  },
  {
    header: "Shop",
    items: ["DIY Tools", "Mechanized tools", "Colour books", "Royale play texture tool"],
  },
];

const MORE_ITEMS: { label: string; view: ViewType }[] = [
  { label: "Our Company", view: "our-company" },
  { label: "Investors", view: "investors" },
  { label: "Blog", view: "blog" },
];

/* ── Nav items ── */
type NavItemType = "link" | "mega" | "dropdown" | "icon";
interface NavItem {
  label: string;
  type: NavItemType;
  view?: ViewType;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", type: "icon", view: "home", id: "home" },
  { label: "Colours", type: "mega", id: "colours" },
  { label: "Products", type: "mega", view: "products", id: "products" },
  { label: "about us", type: "link", view: "about", id: "about" },
  { label: "Blogs", type: "link", view: "blog", id: "blogs" },
];

/* ═══════════════════════════════════════════
   MegaLink – clean text link for the dropdown
   ═══════════════════════════════════════════ */
function MegaLink({
  label,
  isNew,
  onClick,
}: {
  label: string;
  isNew?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      className="font-['Fira_Sans',sans-serif] text-[14.5px] block py-[9px] cursor-pointer select-none transition-colors duration-150"
      style={{ color: "#3a3a3a", textDecoration: "none", fontWeight: 400 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = SIENNA;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#3a3a3a";
      }}
      onClick={onClick}
    >
      {label}
      {isNew && (
        <span
          className="inline-flex items-center font-['Fira_Sans',sans-serif] text-[10px] px-[6px] py-[2px] rounded-[3px] text-white ml-2"
          style={{ backgroundColor: "#2ecc40", fontWeight: 600, lineHeight: 1, verticalAlign: "middle" }}
        >
          New
        </span>
      )}
    </a>
  );
}

/* ═══════════════════════════════════════════
   Icon wrapper (18x18)
   ═══════════════════════════════════════════ */
function NavIcon18({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`size-[18px] relative shrink-0 ${className}`}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Figma Logo (TeknasDarkLogo) — responsive
   ═══════════════════════════════════════════ */
function TeknasFigmaLogo({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: 120 * scale,
        height: 62 * scale,
      }}
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div
          className="absolute"
          style={{
            width: 99.116 * scale,
            height: 52.498 * scale,
            left: 10 * scale,
            top: 5 * scale,
          }}
        >
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.1165 52.4982">
            <g id="TeknasDarkLogo">
              <g id="Group">
                <path d={svgPaths.p11d92d00} fill="black" />
                <path d={svgPaths.p2e925d00} fill="black" />
                <path d={svgPaths.p23bdb500} fill="black" />
                <path d={svgPaths.p2d5dbc00} fill="black" />
                <path d={svgPaths.p1428b5c0} fill="black" />
                <path d={svgPaths.p971ed00} fill="black" />
                <path d={svgPaths.p297fdd80} fill="black" />
                <path d={svgPaths.p3e099380} fill="black" />
              </g>
              <path d={svgPaths.p19cd3500} fill="#F6851F" />
              <path d={svgPaths.p12d89800} fill="black" />
              <path d={svgPaths.p3599b380} fill="black" />
              <path d={svgPaths.p2afba280} fill="black" />
              <path d={svgPaths.p175c040} fill="black" />
              <path d={svgPaths.pacbe200} fill="black" />
              <path d={svgPaths.p3ac97400} fill="#ED1C24" />
              <path d={svgPaths.p25107fe0} fill="black" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   useBreakpoint — reactive breakpoint hook
   ═══════════════════════════════════════════ */
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
function useBreakpoint(): Breakpoint {
  const getBreakpoint = (): Breakpoint => {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    if (w < 480) return "xs";
    if (w < 640) return "sm";
    if (w < 1024) return "md";
    if (w < 1280) return "lg";
    return "xl";
  };
  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);
  useEffect(() => {
    const h = () => setBp(getBreakpoint());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return bp;
}

/* ═══════════════════════════════════════════
   StickyNavBar – Fully responsive
   ═══════════════════════════════════════════

   Breakpoints:
   xs  (<480px)  — Phone portrait: small logo, search+hamburger
   sm  (480-639) — Phone landscape: small logo, search+cart+hamburger
   md  (640-1023)— Tablet: medium logo, search bar + action icons + hamburger
   lg  (1024-1279)— Desktop: full nav links, search bar, all actions
   xl  (1280+)   — Large desktop: full spacing
   ═══════════════════════════════════════════ */
export function StickyNavBar() {
  const {
    currentView,
    navigateHome,
    navigateToProducts,
    navigateToAbout,
    navigateToDealers,
    navigateToContact,
    navigateToOurCompany,
    navigateToInvestors,
    navigateToAccount,
    navigateToCart,
    navigateToSearch,
    navigateToBlog,
  } = useNavigation();

  const bp = useBreakpoint();
  const isMobile = bp === "xs" || bp === "sm";
  const isTablet = bp === "md";
  const isDesktop = bp === "lg" || bp === "xl";

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeLineStyle, setActiveLineStyle] = useState({ left: 0, width: 0 });
  const [initialized, setInitialized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const navRowRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const activeIndex = NAV_ITEMS.findIndex(
    (item) =>
      item.view === currentView ||
      (item.view === "products" && currentView === "product-detail") ||
      (item.id === "blogs" && currentView === "blog")
  );
  const displayIdx =
    hoveredIdx !== null ? hoveredIdx : activeIndex >= 0 ? activeIndex : -1;

  /* Measure underline position */
  const updateLine = useCallback((idx: number) => {
    const el = itemRefs.current[idx];
    const row = navRowRef.current;
    if (el && row) {
      const rowRect = row.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setActiveLineStyle({
        left: elRect.left - rowRect.left,
        width: elRect.width,
      });
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (displayIdx >= 0) updateLine(displayIdx);
      setInitialized(true);
    }, 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialized && displayIdx >= 0) updateLine(displayIdx);
  }, [displayIdx, initialized, updateLine]);

  useEffect(() => {
    const h = () => { if (displayIdx >= 0) updateLine(displayIdx); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [displayIdx, updateLine]);

  /* Close mobile menu on resize past desktop breakpoint */
  useEffect(() => {
    if (isDesktop && mobileMenuOpen) {
      setMobileMenuOpen(false);
      setMobileAccordion(null);
    }
  }, [isDesktop, mobileMenuOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleClick = (view: ViewType) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    if (view === "home") navigateHome();
    else if (view === "products") navigateToProducts();
    else if (view === "about") navigateToAbout();
    else if (view === "locate-dealers") navigateToDealers();
    else if (view === "contact") navigateToContact();
    else if (view === "our-company") navigateToOurCompany();
    else if (view === "investors") navigateToInvestors();
    else if (view === "account") navigateToAccount();
    else if (view === "cart") navigateToCart();
    else if (view === "search") navigateToSearch();
    else if (view === "blog") navigateToBlog();
  };

  /* ── Dropdown hover handlers with delay ── */
  const handleNavEnter = (id: string, type: NavItemType) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (type === "mega" || type === "dropdown") setOpenDropdown(id);
  };

  const handleNavLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const closeMega = () => setOpenDropdown(null);

  /* ── Responsive values ── */
  const logoScale = bp === "xs" ? 0.72 : bp === "sm" ? 0.78 : bp === "md" ? 0.85 : 1;
  const navPadding = bp === "xs" ? "16px" : bp === "sm" ? "20px" : bp === "md" ? "28px" : bp === "lg" ? "48px" : "72px";
  const navbarHeight = bp === "xs" ? 48 : bp === "sm" ? 52 : bp === "md" ? 56 : 62;

  /* Compute mega dropdown top from navbar height */
  const megaTop = navbarHeight + 1;

  return (
    <header className="w-full flex flex-col" style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* ════════════ SINGLE ROW NAVBAR ════════════ */}
      <div
        ref={navBarRef}
        className="w-full relative"
        style={{ backgroundColor: "rgba(255,255,255,0.82)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)" }}
      >
        <div
          className="flex items-center justify-between max-w-[1920px] mx-auto"
          style={{
            height: navbarHeight,
            paddingLeft: navPadding,
            paddingRight: navPadding,
          }}
        >
          {/* ── LEFT: Logo (responsive scale) ── */}
          <div
            className="flex items-center shrink-0 cursor-pointer"
            style={{ height: navbarHeight }}
            onClick={navigateHome}
          >
            <TeknasFigmaLogo scale={logoScale} />
          </div>

          {/* ── CENTER: Nav items (desktop only lg+) ── */}
          {isDesktop && (
            <div className="flex items-center shrink-0">
              <div
                ref={navRowRef}
                className="relative flex items-center"
                style={{ gap: bp === "lg" ? "18px" : "24px" }}
              >
                {NAV_ITEMS.map((item, i) => {
                  const isActive = item.view
                    ? item.view === currentView ||
                      (item.view === "products" && currentView === "product-detail") ||
                      (item.id === "blogs" && currentView === "blog")
                    : false;
                  const isDropdownOpen = openDropdown === item.id;
                  const isHovered = hoveredIdx === i;
                  const hasDropdown = item.type === "mega" || item.type === "dropdown";

                  return (
                    <div
                      key={item.id}
                      className="relative flex items-center h-[48px]"
                      onMouseEnter={() => {
                        setHoveredIdx(i);
                        handleNavEnter(item.id, item.type);
                      }}
                      onMouseLeave={() => {
                        setHoveredIdx(null);
                        handleNavLeave();
                      }}
                    >
                      {item.type === "icon" ? (
                        /* Home icon */
                        <a
                          ref={(el) => { itemRefs.current[i] = el; }}
                          className="cursor-pointer select-none flex items-center justify-center"
                          onClick={() => item.view && handleClick(item.view)}
                        >
                          <NavIcon18>
                            <g>
                              <path d={svgPaths.pb56cd00} stroke="#5C0404" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" />
                              <path d={svgPaths.pdd08040} stroke="#5C0404" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" />
                            </g>
                          </NavIcon18>
                        </a>
                      ) : (
                        <a
                          ref={(el) => { itemRefs.current[i] = el; }}
                          className="font-['Fira_Sans',sans-serif] cursor-pointer select-none whitespace-nowrap flex items-center gap-1"
                          style={{
                            fontSize: bp === "lg" ? "14.5px" : "16px",
                            fontWeight: isActive || isDropdownOpen ? 500 : 400,
                            letterSpacing: "0.2px",
                            lineHeight: "20.25px",
                            color: isActive || isDropdownOpen
                              ? AUBERGINE
                              : isHovered
                                ? AUBERGINE
                                : "#4a4a4a",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                          }}
                          onClick={() => {
                            if (item.view) handleClick(item.view);
                            else if (hasDropdown) setOpenDropdown(isDropdownOpen ? null : item.id);
                          }}
                        >
                          {item.label}
                        </a>
                      )}
                    </div>
                  );
                })}

                {/* Animated underline */}
                {displayIdx >= 0 && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      bottom: 0,
                      left: activeLineStyle.left,
                      width: activeLineStyle.width,
                      height: 2.5,
                      transition: initialized
                        ? "left 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease"
                        : "none",
                      opacity: initialized ? 1 : 0,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: "#d44e4e" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SEARCH BAR (tablet + desktop) ── */}
          {(isTablet || isDesktop) && (
            <div
              className="flex items-center shrink-0"
              style={{ marginLeft: isTablet ? "auto" : 16, marginRight: isTablet ? 12 : isDesktop ? 24 : 0, cursor: "pointer" }}
              onClick={() => navigateToSearch()}
            >
              <div
                className="relative flex items-center rounded-full overflow-hidden"
                style={{
                  height: isTablet ? 36 : 40,
                  width: isTablet ? 200 : bp === "lg" ? 220 : 255,
                }}
              >
                <div className="flex items-center gap-[10px] px-4 flex-1 h-full">
                  {/* Search icon from Figma */}
                  <div className="h-[15px] relative shrink-0 w-[14.063px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0625 15">
                      <path d={svgPaths.p29085e00} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.333" strokeWidth="1.17188" />
                      <path d={svgPaths.p114efc00} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.333" strokeWidth="1.17188" />
                    </svg>
                  </div>
                  <p
                    className="font-['Fira_Sans',sans-serif] text-[rgba(26,20,40,0.5)] whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ fontWeight: 400, fontSize: isTablet ? "12px" : "13px" }}
                  >
                    Search for Interior paints
                  </p>
                </div>
                {/* Border ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{ border: "1px solid rgba(40,20,20,0.59)" }}
                />
              </div>
            </div>
          )}

          {/* ── RIGHT: Actions (desktop lg+) ── */}
          {isDesktop && (
            <div className="flex items-center shrink-0" style={{ gap: bp === "lg" ? 16 : 24 }}>
              {/* Map Pin */}
              <MagneticElement strength={0.3}>
                <button
                  onClick={navigateToDealers}
                  className="flex items-center justify-center size-[38px] rounded-full border-0 bg-transparent cursor-pointer transition-all duration-200"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${GOLD}14`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <NavIcon18>
                    <g>
                      <path d={svgPaths.p625a980} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p18c84c80} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </NavIcon18>
                </button>
              </MagneticElement>

              {/* User */}
              <MagneticElement strength={0.3}>
                <button
                  onClick={navigateToAccount}
                  className="flex items-center justify-center size-[38px] rounded-full border-0 bg-transparent cursor-pointer transition-all duration-200"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${GOLD}14`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <NavIcon18>
                    <g>
                      <path d={svgPaths.p14dca900} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p117fc1f0} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </NavIcon18>
                </button>
              </MagneticElement>

              {/* Cart */}
              <MagneticElement strength={0.3}>
                <button
                  onClick={navigateToCart}
                  className="relative size-[38px] rounded-full border-0 bg-transparent cursor-pointer transition-all duration-200 flex items-center justify-center"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${GOLD}14`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <NavIcon18>
                    <g clipPath="url(#clip0_nav_cart_d)">
                      <path d={svgPaths.p61f9880} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p266da370} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p12d64e80} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                    <defs>
                      <clipPath id="clip0_nav_cart_d">
                        <rect fill="white" height="18" width="18" />
                      </clipPath>
                    </defs>
                  </NavIcon18>
                  {/* Badge */}
                  <div
                    className="absolute flex items-center justify-center size-[17px] rounded-full"
                    style={{ backgroundColor: GOLD, top: -2, right: -2 }}
                  >
                    <p className="font-['Fira_Sans',sans-serif] text-[9px] text-white text-center whitespace-nowrap m-0" style={{ fontWeight: 600, lineHeight: "9px" }}>
                      0
                    </p>
                  </div>
                </button>
              </MagneticElement>

              {/* Contact us CTA */}
              <p
                onClick={navigateToContact}
                className="font-['Fira_Sans',sans-serif] cursor-pointer select-none shrink-0 transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.5px",
                  color: "#bd595d",
                  lineHeight: "18px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                Contact us
              </p>
            </div>
          )}

          {/* ── TABLET: action icons (user + cart) beside search ── */}
          {isTablet && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={navigateToAccount}
                className="flex items-center justify-center size-[36px] rounded-full border-0 bg-transparent cursor-pointer"
              >
                <NavIcon18>
                  <g>
                    <path d={svgPaths.p14dca900} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p117fc1f0} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </NavIcon18>
              </button>

              <button
                onClick={navigateToCart}
                className="relative size-[36px] rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center"
              >
                <NavIcon18 className="absolute left-[9px] top-[9px]">
                  <g clipPath="url(#clip0_nav_cart_t)">
                    <path d={svgPaths.p61f9880} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p266da370} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p12d64e80} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_nav_cart_t">
                      <rect fill="white" height="18" width="18" />
                    </clipPath>
                  </defs>
                </NavIcon18>
                <div
                  className="absolute flex items-center justify-center size-[15px] rounded-full"
                  style={{ backgroundColor: GOLD, top: -1, right: -1 }}
                >
                  <p className="font-['Fira_Sans',sans-serif] text-[8px] text-white text-center whitespace-nowrap m-0" style={{ fontWeight: 600, lineHeight: "8px" }}>
                    0
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* ── MOBILE/TABLET: hamburger + search (mobile only for search icon) ── */}
          {!isDesktop && (
            <div className="flex items-center" style={{ gap: bp === "xs" ? 2 : 6 }}>
              {/* Search icon — only on mobile (tablet has full search bar) */}
              {isMobile && (
                <button
                  className="flex items-center justify-center border-0 bg-transparent cursor-pointer"
                  style={{ width: bp === "xs" ? 34 : 38, height: bp === "xs" ? 34 : 38 }}
                  onClick={() => navigateToSearch()}
                >
                  <Search size={bp === "xs" ? 16 : 18} style={{ color: AUBERGINE }} />
                </button>
              )}

              {/* Cart icon — phone landscape only (sm) */}
              {bp === "sm" && (
                <button
                  className="relative flex items-center justify-center border-0 bg-transparent cursor-pointer"
                  style={{ width: 38, height: 38 }}
                  onClick={navigateToCart}
                >
                  <NavIcon18>
                    <g clipPath="url(#clip0_nav_cart_m)">
                      <path d={svgPaths.p61f9880} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p266da370} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p12d64e80} stroke={AUBERGINE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                    <defs>
                      <clipPath id="clip0_nav_cart_m">
                        <rect fill="white" height="18" width="18" />
                      </clipPath>
                    </defs>
                  </NavIcon18>
                  <div
                    className="absolute flex items-center justify-center size-[14px] rounded-full"
                    style={{ backgroundColor: GOLD, top: 2, right: 2 }}
                  >
                    <p className="font-['Fira_Sans',sans-serif] text-[8px] text-white text-center whitespace-nowrap m-0" style={{ fontWeight: 600, lineHeight: "8px" }}>
                      0
                    </p>
                  </div>
                </button>
              )}

              {/* Hamburger */}
              <button
                className="flex items-center justify-center border-0 bg-transparent cursor-pointer"
                style={{ width: bp === "xs" ? 34 : 38, height: bp === "xs" ? 34 : 38 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="flex flex-col" style={{ gap: bp === "xs" ? 4 : 5 }}>
                  {[0, 1, 2].map((j) => (
                    <span
                      key={j}
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: bp === "xs" ? 18 : 20,
                        height: 2,
                        backgroundColor: AUBERGINE,
                        ...(j === 0 && mobileMenuOpen ? { transform: "rotate(45deg) translateY(6px)" } : {}),
                        ...(j === 1 ? { opacity: mobileMenuOpen ? 0 : 1 } : {}),
                        ...(j === 2 && mobileMenuOpen ? { transform: "rotate(-45deg) translateY(-6px)" } : {}),
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom border line ── */}
        <div className="w-full h-px" style={{ backgroundColor: "rgba(26,20,40,0.06)" }} />

        {/* ════════════ MEGA DROPDOWN: Colours (desktop only) ════════════ */}
        {isDesktop && (
          <div
            className="absolute left-0 w-full"
            style={{
              top: megaTop,
              zIndex: 999,
              opacity: openDropdown === "colours" ? 1 : 0,
              pointerEvents: openDropdown === "colours" ? "auto" : "none",
              transform: openDropdown === "colours" ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div style={{ backgroundColor: "#fff", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", borderTop: "1px solid #eee" }}>
              <div
                className="max-w-[1920px] mx-auto flex flex-wrap"
                style={{ paddingLeft: navPadding, paddingRight: navPadding }}
              >
                {/* Column 1: Colour by Family (2 sub-columns) */}
                <div className="py-7 pr-10 flex-shrink-0 border-0" style={{ borderRight: "1px solid #e8e4dc", minWidth: 260 }}>
                  <h4
                    className="font-['Fira_Sans',sans-serif] text-[13px] italic m-0 mb-4"
                    style={{ color: MEGA_HEADER, fontWeight: 400 }}
                  >
                    Colour by family
                  </h4>
                  <div className="flex gap-10">
                    <div className="flex flex-col">
                      {COLOUR_FAMILIES_LEFT.map((c) => (
                        <MegaLink key={c} label={c} onClick={() => { closeMega(); navigateToSearch(); }} />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      {COLOUR_FAMILIES_RIGHT.map((c) => (
                        <MegaLink key={c} label={c} onClick={() => { closeMega(); navigateToSearch(); }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Colour Collections */}
                <div className="py-7 px-10 flex-shrink-0 border-0" style={{ borderRight: "1px solid #e8e4dc", minWidth: 180 }}>
                  <h4
                    className="font-['Fira_Sans',sans-serif] text-[13px] italic m-0 mb-4"
                    style={{ color: MEGA_HEADER, fontWeight: 400 }}
                  >
                    Colour Collections
                  </h4>
                  <div className="flex flex-col">
                    {COLOUR_COLLECTIONS.map((item) => (
                      <MegaLink key={item} label={item} onClick={() => { closeMega(); navigateToSearch(); }} />
                    ))}
                  </div>
                </div>

                {/* Column 3: Colour Tools */}
                <div className="py-7 px-10 flex-shrink-0 border-0" style={{ borderRight: "1px solid #e8e4dc", minWidth: 200 }}>
                  <h4
                    className="font-['Fira_Sans',sans-serif] text-[13px] italic m-0 mb-4"
                    style={{ color: MEGA_HEADER, fontWeight: 400 }}
                  >
                    Colour Tools
                  </h4>
                  <div className="flex flex-col">
                    {COLOUR_TOOLS.map((tool) => (
                      <MegaLink key={tool.label} label={tool.label} isNew={tool.isNew} onClick={() => { closeMega(); navigateToSearch(); }} />
                    ))}
                  </div>
                </div>

                {/* Column 4: Inspirations */}
                <div className="py-7 pl-10 flex-shrink-0" style={{ minWidth: 160 }}>
                  <h4
                    className="font-['Fira_Sans',sans-serif] text-[13px] italic m-0 mb-4"
                    style={{ color: MEGA_HEADER, fontWeight: 400 }}
                  >
                    Inspirations
                  </h4>
                  <div className="flex flex-col">
                    {INSPIRATIONS.map((item) => (
                      <MegaLink key={item} label={item} onClick={() => { closeMega(); navigateToSearch(); }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ MEGA DROPDOWN: Products (desktop only) ════════════ */}
        {isDesktop && (
          <div
            className="absolute left-0 w-full"
            style={{
              top: megaTop,
              zIndex: 999,
              opacity: openDropdown === "products" ? 1 : 0,
              pointerEvents: openDropdown === "products" ? "auto" : "none",
              transform: openDropdown === "products" ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div style={{ backgroundColor: "#fff", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", borderTop: "1px solid #eee" }}>
              <div
                className="max-w-[1920px] mx-auto flex flex-wrap"
                style={{ paddingLeft: navPadding, paddingRight: navPadding }}
              >
                {PRODUCTS_COLS.map((col, colIdx) => (
                  <div
                    key={col.header}
                    className="py-7 flex-shrink-0 border-0"
                    style={{
                      paddingLeft: colIdx === 0 ? 0 : bp === "lg" ? 28 : 40,
                      paddingRight: colIdx === PRODUCTS_COLS.length - 1 ? 0 : bp === "lg" ? 28 : 40,
                      borderRight: colIdx < PRODUCTS_COLS.length - 1 ? "1px solid #e8e4dc" : "none",
                      minWidth: bp === "lg" ? 140 : 160,
                    }}
                  >
                    <h4
                      className="font-['Fira_Sans',sans-serif] text-[13px] italic m-0 mb-4"
                      style={{ color: MEGA_HEADER, fontWeight: 400 }}
                    >
                      {col.header}
                    </h4>
                    <div className="flex flex-col">
                      {col.items.map((item) => (
                        <MegaLink key={`${col.header}-${item}`} label={item} onClick={() => { closeMega(); navigateToProducts(); }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ════════════ MOBILE / TABLET DROPDOWN MENU ════════════ */}
      {!isDesktop && (
        <div
          className="overflow-y-auto transition-all duration-400 ease-out"
          style={{
            maxHeight: mobileMenuOpen ? "calc(100vh - " + navbarHeight + "px)" : 0,
            backgroundColor: AUBERGINE,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              paddingTop: 12,
              paddingBottom: isMobile ? 24 : 16,
              paddingLeft: navPadding,
              paddingRight: navPadding,
            }}
          >
            {/* On tablet, show a 2-col grid layout for accordions */}
            {isTablet ? (
              <div className="grid grid-cols-2 gap-x-8">
                {/* Left column: Colours + Products */}
                <div>
                  <MobileAccordion
                    label="Colours"
                    isOpen={mobileAccordion === "colours"}
                    onToggle={() => setMobileAccordion(mobileAccordion === "colours" ? null : "colours")}
                  >
                    <div className="pl-4 pb-2">
                      <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Colour by Family</p>
                      {[...COLOUR_FAMILIES_LEFT, ...COLOUR_FAMILIES_RIGHT].map((c) => (
                        <a key={c} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>{c}</a>
                      ))}
                      <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Collections</p>
                      {COLOUR_COLLECTIONS.map((item) => (
                        <a key={item} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>{item}</a>
                      ))}
                    </div>
                  </MobileAccordion>

                  <MobileAccordion
                    label="Products"
                    isOpen={mobileAccordion === "products"}
                    onToggle={() => setMobileAccordion(mobileAccordion === "products" ? null : "products")}
                  >
                    <div className="pl-4 pb-2">
                      {PRODUCTS_COLS.map((col) => (
                        <div key={col.header}>
                          <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>{col.header}</p>
                          {col.items.map((item) => (
                            <a key={`${col.header}-${item}`} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => handleClick("products")}>{item}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </MobileAccordion>
                </div>

                {/* Right column: Links + Tools + More */}
                <div>
                  {[
                    { label: "about us", onClick: () => { setMobileMenuOpen(false); navigateToAbout(); } },
                    { label: "Blogs", onClick: () => { setMobileMenuOpen(false); navigateToBlog(); } },
                  ].map((link) => (
                    <a
                      key={link.label}
                      className="font-['Fira_Sans',sans-serif] py-3 cursor-pointer select-none block"
                      style={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onClick={link.onClick}
                    >
                      {link.label}
                    </a>
                  ))}

                  <MobileAccordion
                    label="More"
                    isOpen={mobileAccordion === "more"}
                    onToggle={() => setMobileAccordion(mobileAccordion === "more" ? null : "more")}
                  >
                    <div className="pl-4 pb-2">
                      {MORE_ITEMS.map((item) => (
                        <a key={item.label} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => handleClick(item.view)}>{item.label}</a>
                      ))}
                    </div>
                  </MobileAccordion>

                  <MobileAccordion
                    label="Colour Tools"
                    isOpen={mobileAccordion === "tools"}
                    onToggle={() => setMobileAccordion(mobileAccordion === "tools" ? null : "tools")}
                  >
                    <div className="pl-4 pb-2">
                      {COLOUR_TOOLS.map((t) => (
                        <a key={t.label} className="font-['Fira_Sans',sans-serif] text-[13px] flex items-center gap-2 py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>
                          {t.label}
                          {t.isNew && <span className="text-[8px] px-1 py-0.5 rounded text-white" style={{ backgroundColor: "#2ecc40", fontWeight: 600 }}>New</span>}
                        </a>
                      ))}
                    </div>
                  </MobileAccordion>
                </div>
              </div>
            ) : (
              /* Single column for phones */
              <>
                {/* Colours accordion */}
                <MobileAccordion
                  label="Colours"
                  isOpen={mobileAccordion === "colours"}
                  onToggle={() => setMobileAccordion(mobileAccordion === "colours" ? null : "colours")}
                >
                  <div className="pl-4 pb-2">
                    <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Colour by Family</p>
                    {[...COLOUR_FAMILIES_LEFT, ...COLOUR_FAMILIES_RIGHT].map((c) => (
                      <a key={c} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>{c}</a>
                    ))}
                    <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Collections</p>
                    {COLOUR_COLLECTIONS.map((item) => (
                      <a key={item} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>{item}</a>
                    ))}
                    <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Tools</p>
                    {COLOUR_TOOLS.map((t) => (
                      <a key={t.label} className="font-['Fira_Sans',sans-serif] text-[13px] flex items-center gap-2 py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>
                        {t.label}
                        {t.isNew && <span className="text-[8px] px-1 py-0.5 rounded text-white" style={{ backgroundColor: "#2ecc40", fontWeight: 600 }}>New</span>}
                      </a>
                    ))}
                    <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>Inspirations</p>
                    {INSPIRATIONS.map((item) => (
                      <a key={item} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}>{item}</a>
                    ))}
                  </div>
                </MobileAccordion>

                {/* Products accordion */}
                <MobileAccordion
                  label="Products"
                  isOpen={mobileAccordion === "products"}
                  onToggle={() => setMobileAccordion(mobileAccordion === "products" ? null : "products")}
                >
                  <div className="pl-4 pb-2">
                    {PRODUCTS_COLS.map((col) => (
                      <div key={col.header}>
                        <p className="font-['Fira_Sans',sans-serif] text-[10px] tracking-[1px] uppercase m-0 mt-3 mb-2" style={{ color: GOLD, fontWeight: 600 }}>{col.header}</p>
                        {col.items.map((item) => (
                          <a key={`${col.header}-${item}`} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => handleClick("products")}>{item}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                </MobileAccordion>

                {/* Direct links */}
                {[
                  { label: "about us", onClick: () => { setMobileMenuOpen(false); navigateToAbout(); } },
                  { label: "Blogs", onClick: () => { setMobileMenuOpen(false); navigateToBlog(); } },
                ].map((link) => (
                  <a
                    key={link.label}
                    className="font-['Fira_Sans',sans-serif] py-3 cursor-pointer select-none"
                    style={{
                      fontSize: bp === "xs" ? 14 : 15,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onClick={link.onClick}
                  >
                    {link.label}
                  </a>
                ))}

                {/* More accordion */}
                <MobileAccordion
                  label="More"
                  isOpen={mobileAccordion === "more"}
                  onToggle={() => setMobileAccordion(mobileAccordion === "more" ? null : "more")}
                >
                  <div className="pl-4 pb-2">
                    {MORE_ITEMS.map((item) => (
                      <a key={item.label} className="font-['Fira_Sans',sans-serif] text-[13px] block py-1.5 cursor-pointer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }} onClick={() => handleClick(item.view)}>{item.label}</a>
                    ))}
                  </div>
                </MobileAccordion>
              </>
            )}

            {/* ── Bottom actions (search + CTA buttons) ── */}
            <div style={{ marginTop: 16 }}>
              {/* Search — mobile only (tablet already has search bar) */}
              {isMobile && (
                <div
                  className="flex items-center rounded-full px-4 gap-2.5 mb-3 cursor-pointer"
                  style={{
                    height: bp === "xs" ? 38 : 40,
                    border: "1px solid rgba(255,255,255,0.15)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                  onClick={() => { setMobileMenuOpen(false); navigateToSearch(); }}
                >
                  <Search size={14} className="text-white/40" />
                  <span
                    className="font-['Fira_Sans',sans-serif] text-white/35"
                    style={{ fontSize: bp === "xs" ? "13px" : "14px" }}
                  >
                    Search products...
                  </span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateToDealers(); }}
                  className="flex-1 flex items-center justify-center rounded-full border cursor-pointer font-['Fira_Sans',sans-serif] text-white/70 bg-transparent"
                  style={{
                    height: bp === "xs" ? 38 : 42,
                    fontSize: bp === "xs" ? "12px" : "13px",
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  Find Dealer
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateToContact(); }}
                  className="flex-1 flex items-center justify-center rounded-full border-0 cursor-pointer font-['Fira_Sans',sans-serif] text-white"
                  style={{
                    height: bp === "xs" ? 38 : 42,
                    fontSize: bp === "xs" ? "11px" : "12px",
                    fontWeight: 600,
                    backgroundColor: SIENNA,
                    letterSpacing: "0.5px",
                  }}
                >
                  Contact us
                </button>
              </div>
            </div>

            {/* Safe area spacing for notched phones */}
            <div style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }} />
          </div>
        </div>
      )}

      {/* Backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && !isDesktop && (
        <div
          className="fixed inset-0"
          style={{
            top: navbarHeight,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: -1,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════
   MobileAccordion – expandable mobile section
   ═══════════════════════════════════════════ */
function MobileAccordion({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <a
        className="font-['Fira_Sans',sans-serif] py-3 cursor-pointer select-none flex items-center justify-between"
        style={{
          fontSize: 15,
          fontWeight: isOpen ? 600 : 400,
          color: isOpen ? GOLD : "rgba(255,255,255,0.7)",
          textDecoration: "none",
        }}
        onClick={onToggle}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            opacity: 0.5,
            color: "white",
          }}
        />
      </a>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? 800 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}