import { useState } from "react";
import { useNavigation } from "./navigation-context";
import { ScrollReveal } from "./micro-interactions";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Chrome } from "lucide-react";
import { useSEO } from "./use-seo";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const CANVAS = "#f5f2ec";

export function AccountPage() {
  const { navigateHome, navigateToProducts } = useNavigation();
  const [isLogin, setIsLogin] = useState(true);

  useSEO({
    title: "Sign In or Create Account | Teknas Paints — Manage Orders & Colour Collections",
    description: "Sign in to your Teknas Paints account to manage orders, save colour palettes, track deliveries, and access exclusive offers on eco-friendly paints and primers.",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: CANVAS, paddingTop: 130 }}>
        <ScrollReveal>
          <div className="max-w-[440px] mx-auto px-6 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GOLD}15` }}>
              <User size={36} style={{ color: GOLD }} />
            </div>
            <h2 className="font-['Jost',sans-serif] text-[clamp(24px,3vw,32px)] mb-3" style={{ color: AUBERGINE, fontWeight: 600 }}>
              {isLogin ? "Welcome Back!" : "Account Created!"}
            </h2>
            <p className="font-['Jost',sans-serif] text-[15px] mb-8 leading-[26px]" style={{ color: `${AUBERGINE}66`, fontWeight: 300 }}>
              {isLogin
                ? "You've successfully signed in. Explore our latest collection of premium paints."
                : "Your account has been created. Start exploring our world of colours."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={navigateToProducts} className="group h-[52px] px-7 rounded-full border-0 cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] text-white flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA }}>
                Browse Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={navigateHome} className="h-[52px] px-7 rounded-full cursor-pointer font-['Jost',sans-serif] text-[14px] tracking-[1px] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 500, color: AUBERGINE, backgroundColor: "transparent", border: `1.5px solid ${AUBERGINE}20` }}>
                Go Home
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: CANVAS, paddingTop: 130, paddingBottom: 60 }}>
      <ScrollReveal>
        <div className="w-full max-w-[440px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
              <span className="font-['Jost',sans-serif] text-[13px] tracking-[4px] uppercase" style={{ color: SIENNA, fontWeight: 500 }}>
                {isLogin ? "Welcome Back" : "Join Teknas"}
              </span>
              <div className="w-9 h-[2px]" style={{ backgroundColor: SIENNA }} />
            </div>
            <h1 className="font-['Jost',sans-serif] text-[clamp(28px,3.5vw,36px)] mb-2" style={{ color: AUBERGINE, fontWeight: 600 }}>
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="font-['Jost',sans-serif] text-[14px] leading-[24px]" style={{ color: `${AUBERGINE}66`, fontWeight: 300 }}>
              {isLogin ? "Access your Teknas Paints account" : "Join our community of colour enthusiasts"}
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-[18px] p-7" style={{ backgroundColor: "white", boxShadow: "0 4px 30px rgba(26,20,40,0.06)" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase block mb-2" style={{ color: `${AUBERGINE}66`, fontWeight: 500 }}>Full Name</label>
                  <div className="flex items-center h-[46px] rounded-xl px-4 gap-3" style={{ border: `1.5px solid ${AUBERGINE}12`, backgroundColor: CANVAS }}>
                    <User size={16} style={{ color: `${AUBERGINE}40` }} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="font-['Jost',sans-serif] text-[14px] bg-transparent border-none outline-none w-full" style={{ color: AUBERGINE, fontWeight: 400 }} required />
                  </div>
                </div>
              )}
              <div>
                <label className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase block mb-2" style={{ color: `${AUBERGINE}66`, fontWeight: 500 }}>Email</label>
                <div className="flex items-center h-[46px] rounded-xl px-4 gap-3" style={{ border: `1.5px solid ${AUBERGINE}12`, backgroundColor: CANVAS }}>
                  <Mail size={16} style={{ color: `${AUBERGINE}40` }} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="font-['Jost',sans-serif] text-[14px] bg-transparent border-none outline-none w-full" style={{ color: AUBERGINE, fontWeight: 400 }} required />
                </div>
              </div>
              <div>
                <label className="font-['Jost',sans-serif] text-[12px] tracking-[2px] uppercase block mb-2" style={{ color: `${AUBERGINE}66`, fontWeight: 500 }}>Password</label>
                <div className="flex items-center h-[46px] rounded-xl px-4 gap-3" style={{ border: `1.5px solid ${AUBERGINE}12`, backgroundColor: CANVAS }}>
                  <Lock size={16} style={{ color: `${AUBERGINE}40` }} />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="font-['Jost',sans-serif] text-[14px] bg-transparent border-none outline-none w-full" style={{ color: AUBERGINE, fontWeight: 400 }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: `${AUBERGINE}40` }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="font-['Jost',sans-serif] text-[12px] border-0 bg-transparent cursor-pointer p-0 transition-colors hover:underline" style={{ color: SIENNA, fontWeight: 500 }}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="h-[48px] rounded-xl border-0 cursor-pointer font-['Jost',sans-serif] text-[15px] tracking-[1px] text-white mt-2 transition-all duration-300 hover:-translate-y-0.5 uppercase" style={{ fontWeight: 600, backgroundColor: SIENNA, boxShadow: `0 4px 16px ${SIENNA}30` }}>
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-[1px]" style={{ backgroundColor: `${AUBERGINE}10` }} />
              <span className="font-['Jost',sans-serif] text-[11px] tracking-[2px] uppercase" style={{ color: `${AUBERGINE}40`, fontWeight: 400 }}>or</span>
              <div className="flex-1 h-[1px]" style={{ backgroundColor: `${AUBERGINE}10` }} />
            </div>

            <button className="w-full h-[46px] rounded-xl cursor-pointer font-['Jost',sans-serif] text-[13px] flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5" style={{ fontWeight: 500, color: AUBERGINE, backgroundColor: "transparent", border: `1.5px solid ${AUBERGINE}12` }}>
              <Chrome size={18} /> Continue with Google
            </button>
          </div>

          <p className="font-['Jost',sans-serif] text-[14px] text-center mt-6" style={{ color: `${AUBERGINE}66`, fontWeight: 300 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setSubmitted(false); }} className="border-0 bg-transparent cursor-pointer font-['Jost',sans-serif] text-[14px] p-0 underline transition-colors" style={{ color: SIENNA, fontWeight: 600 }}>
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
