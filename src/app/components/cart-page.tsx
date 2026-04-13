import { useState } from "react";
import { useNavigation } from "./navigation-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./micro-interactions";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { useSEO } from "./use-seo";
import { getProductPricing } from "./product-catalog";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const CANVAS = "#f5f2ec";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

interface CartItem {
  id: number;
  name: string;
  variant: string;
  size: string;
  price: number;
  qty: number;
  image: string;
}

const INITIAL_CART: CartItem[] = [
  { id: 1, name: "Royale Luxury Emulsion", variant: "Ivory Dream #F5F0E6", size: "4 Litres", price: getProductPricing("Royale Luxury Emulsion").priceNum, qty: 2, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=120&h=120&fit=crop" },
  { id: 2, name: "Apex Weatherproof", variant: "Terracotta Red #C75B3A", size: "10 Litres", price: getProductPricing("Apex Weatherproof").priceNum, qty: 1, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=120&h=120&fit=crop" },
  { id: 3, name: "Damp Guard Primer", variant: "White Base", size: "1 Litre", price: getProductPricing("Damp Guard Primer").priceNum, qty: 3, image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=120&h=120&fit=crop" },
];

export function CartPage() {
  const { navigateToProducts } = useNavigation();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  useSEO({
    title: "Shopping Cart | Teknas Paints — Free Shipping on Orders Above Rs 5,000",
    description: "Review and checkout your Teknas Paints order. Eco-friendly textured paints, low-VOC primers, and turpentine oils. Free shipping on orders above Rs 5,000. Secure payment.",
  });

  const updateQty = (id: number, delta: number) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 249;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
        <ScrollReveal>
          <div className="max-w-[400px] mx-auto px-6 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GOLD}10` }}>
              <ShoppingBag size={40} style={{ color: `${GOLD}60` }} />
            </div>
            <h2 className="font-['Jost',sans-serif] text-[clamp(24px,3vw,32px)] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>Your Cart is Empty</h2>
            <p className="font-['Jost',sans-serif] text-[14px] mb-8 leading-[24px]" style={{ color: `${AUBERGINE}66`, fontWeight: 300 }}>
              Looks like you haven't added any paints yet. Explore our premium collection to find the perfect colours for your space.
            </p>
            <button onClick={navigateToProducts} className="group h-[52px] px-8 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center gap-2 mx-auto transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
              Browse Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: CANVAS, paddingTop: 140, paddingBottom: 60 }}>
      <div className={`max-w-[1200px] mx-auto ${SECTION_PX}`}>
        <ScrollReveal>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>Your Selection</span>
          </div>
          <h1 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,44px)] mb-2" style={{ color: AUBERGINE, fontWeight: 600, lineHeight: 1.16 }}>
            Shopping <span style={{ color: SIENNA }}>Cart</span>
          </h1>
          <p className="font-['Jost',sans-serif] text-[14px] mb-10" style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}>
            {items.length} item{items.length > 1 ? "s" : ""} in your cart
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            {items.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <div className="flex gap-4 p-4 rounded-[18px]" style={{ backgroundColor: "white", border: "1px solid rgba(26,20,40,0.05)" }}>
                  <div className="w-[90px] h-[90px] rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: CANVAS }}>
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-['Jost',sans-serif] text-[15px] truncate" style={{ color: AUBERGINE, fontWeight: 600 }}>{item.name}</h3>
                        <p className="font-['Jost',sans-serif] text-[12px] mt-0.5" style={{ color: `${AUBERGINE}55`, fontWeight: 300 }}>{item.variant} · {item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center border-0 bg-transparent cursor-pointer transition-colors hover:bg-red-50" style={{ color: `${AUBERGINE}40` }}>
                        <X size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0.5 rounded-full overflow-hidden" style={{ border: `1px solid ${AUBERGINE}12` }}>
                        <button onClick={() => updateQty(item.id, -1)} className="w-[32px] h-[32px] flex items-center justify-center border-0 bg-transparent cursor-pointer transition-colors hover:bg-gray-50" style={{ color: AUBERGINE }}>
                          <Minus size={14} />
                        </button>
                        <span className="font-['Jost',sans-serif] text-[14px] w-[32px] text-center" style={{ color: AUBERGINE, fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-[32px] h-[32px] flex items-center justify-center border-0 bg-transparent cursor-pointer transition-colors hover:bg-gray-50" style={{ color: AUBERGINE }}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-['Jost',sans-serif] text-[16px]" style={{ color: AUBERGINE, fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <button onClick={navigateToProducts} className="flex items-center gap-2 mt-4 font-['Jost',sans-serif] text-[13px] tracking-[1px] uppercase border-0 bg-transparent cursor-pointer p-0 transition-colors hover:brightness-110" style={{ color: SIENNA, fontWeight: 600 }}>
              <ArrowRight size={14} className="rotate-180" /> Continue Shopping
            </button>
          </div>

          {/* Order summary */}
          <ScrollReveal delay={0.15}>
            <div className="lg:w-[360px] shrink-0">
              <div className="rounded-[18px] p-6 sticky top-[140px]" style={{ backgroundColor: "white", border: "1px solid rgba(26,20,40,0.05)" }}>
                <h3 className="font-['Jost',sans-serif] text-[18px] lg:text-[20px] mb-5" style={{ color: AUBERGINE, fontWeight: 600 }}>Order Summary</h3>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between font-['Jost',sans-serif] text-[14px]" style={{ color: `${AUBERGINE}88` }}>
                    <span style={{ fontWeight: 300 }}>Subtotal ({items.reduce((s, it) => s + it.qty, 0)} items)</span>
                    <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-['Jost',sans-serif] text-[14px]" style={{ color: `${AUBERGINE}88` }}>
                    <span style={{ fontWeight: 300 }}>Shipping</span>
                    <span style={{ fontWeight: 500, color: shipping === 0 ? "#16a34a" : undefined }}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="font-['Jost',sans-serif] text-[11px]" style={{ color: "#16a34a", fontWeight: 400 }}>Free shipping on orders above ₹5,000!</p>
                  )}
                </div>
                <div className="h-[1px] mb-4" style={{ backgroundColor: `${AUBERGINE}08` }} />
                <div className="flex justify-between mb-6">
                  <span className="font-['Jost',sans-serif] text-[16px]" style={{ color: AUBERGINE, fontWeight: 600 }}>Total</span>
                  <span className="font-['Jost',sans-serif] text-[20px]" style={{ color: AUBERGINE, fontWeight: 700 }}>₹{total.toLocaleString()}</span>
                </div>

                <div className="flex gap-2 mb-5">
                  <input type="text" placeholder="Promo code" className="flex-1 h-[40px] rounded-lg px-3 font-['Jost',sans-serif] text-[13px] border-none outline-none" style={{ backgroundColor: CANVAS, color: AUBERGINE, fontWeight: 400 }} />
                  <button className="h-[40px] px-4 rounded-lg border-0 cursor-pointer font-['Jost',sans-serif] text-[12px] tracking-[1px] uppercase transition-colors" style={{ backgroundColor: `${GOLD}15`, color: GOLD, fontWeight: 600 }}>
                    Apply
                  </button>
                </div>

                <button className="w-full h-[50px] rounded-xl border-0 cursor-pointer font-['Jost',sans-serif] text-[15px] tracking-[1px] text-white transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA, boxShadow: `0 4px 16px ${SIENNA}30` }}>
                  Proceed to Checkout
                </button>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: <Truck size={16} />, label: "Fast Delivery" },
                    { icon: <Shield size={16} />, label: "Secure Pay" },
                    { icon: <RotateCcw size={16} />, label: "Easy Returns" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5 py-2">
                      <span style={{ color: GOLD }}>{b.icon}</span>
                      <span className="font-['Jost',sans-serif] text-[10px] text-center" style={{ color: `${AUBERGINE}55`, fontWeight: 400 }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}