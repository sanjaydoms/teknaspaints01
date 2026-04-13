import { useNavigation } from "./navigation-context";
import teknasLogo from "figma:asset/0782cf6d2e471283b31a4890c291dd82863dc492.png";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const GOLD = "#d4a24e";
const SIENNA = "#c75b3a";
const AUBERGINE = "#1a1428";
const DEEP_FOREST = "#04150b";
const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

export function PageFooter() {
  const {
    navigateHome,
    navigateToProducts,
    navigateToAbout,
    navigateToDealers,
    navigateToContact,
    navigateToOurCompany,
    navigateToInvestors,
    navigateToBlog,
  } = useNavigation();

  return (
    <footer className={`w-full pt-16 lg:pt-20 pb-8 lg:pb-10 ${SECTION_PX}`} style={{ backgroundColor: DEEP_FOREST }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-[60px] pb-12 lg:pb-[60px] border-b border-white/10">
        {/* Brand column */}
        <div>
          <img
            src={teknasLogo}
            alt="Teknas Paints"
            className="h-[60px] lg:h-[80px] w-auto object-contain mb-5 lg:mb-6"
          />
          <p className="font-['Fira_Sans',sans-serif] text-[14px] leading-[24px] text-[#fffdf6]/50 m-0 mb-6 lg:mb-7 max-w-[280px]">
            Pioneering eco-friendly paint solutions for modern living. Sustainable, beautiful, and built to last.
          </p>
          <div className="flex gap-3.5 lg:gap-4">
            {[Facebook, Instagram, "x", Youtube, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#d4a24e] hover:bg-[#d4a24e]/10"
              >
                {Icon === "x" ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor" className="text-white/50" />
                  </svg>
                ) : (
                  <Icon size={16} className="text-white/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] tracking-[2px] text-white uppercase m-0 mb-6 lg:mb-7"
            style={{ fontWeight: 600 }}
          >
            Quick Links
          </h4>
          {[
            { label: "Home", action: navigateHome },
            { label: "Products", action: navigateToProducts },
            { label: "About Us", action: navigateToAbout },
            { label: "Locate Dealers", action: navigateToDealers },
            { label: "Contact Us", action: navigateToContact },
            { label: "Blog", action: navigateToBlog },
          ].map((link) => (
            <p
              key={link.label}
              onClick={link.action}
              className="font-['Fira_Sans',sans-serif] text-[15px] text-white/50 m-0 mb-3.5 cursor-pointer transition-colors hover:text-[#d4a24e]"
            >
              {link.label}
            </p>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4
            className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] tracking-[2px] text-white uppercase m-0 mb-6 lg:mb-7"
            style={{ fontWeight: 600 }}
          >
            Company
          </h4>
          {[
            { label: "Our Company", action: navigateToOurCompany },
            { label: "Investors", action: navigateToInvestors },
            { label: "Contact Us", action: navigateToContact },
          ].map((link) => (
            <p
              key={link.label}
              onClick={link.action}
              className="font-['Fira_Sans',sans-serif] text-[15px] text-white/50 m-0 mb-3.5 cursor-pointer transition-colors hover:text-[#d4a24e]"
            >
              {link.label}
            </p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            className="font-['Fira_Sans',sans-serif] text-[15px] lg:text-[16px] tracking-[2px] text-white uppercase m-0 mb-6 lg:mb-7"
            style={{ fontWeight: 600 }}
          >
            Contact
          </h4>
          <div className="flex flex-col gap-4 lg:gap-[18px]">
            {[
              { icon: <MapPin size={18} />, text: "Teknas Paints HQ, Industrial Area, Hyderabad, India" },
              { icon: <Phone size={18} />, text: "+91 1800-123-4567" },
              { icon: <Mail size={18} />, text: "info@teknaspaints.com" },
              { icon: <Clock size={18} />, text: "Mon-Sat: 9:00 AM - 6:00 PM" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="text-[#d4a24e] mt-[2px] shrink-0">{item.icon}</div>
                <p className="font-['Fira_Sans',sans-serif] text-[15px] leading-[24px] text-white/50 m-0">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 lg:pt-7 gap-4">
        <p className="font-['Fira_Sans',sans-serif] text-[13px] text-white/30 m-0">
          &copy; 2026 Teknas Paints. All rights reserved.
        </p>
        <div className="flex gap-6 lg:gap-8">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
            <p
              key={l}
              className="font-['Fira_Sans',sans-serif] text-[13px] text-white/30 m-0 cursor-pointer hover:text-white/50 transition-colors"
            >
              {l}
            </p>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div className="flex items-center justify-center pt-6 lg:pt-8">
        <a
          href="https://domsglobal.co"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Fira_Sans',sans-serif] no-underline transition-colors duration-300 hover:text-white/40 tracking-[0.5px] text-[16px] text-[#fc6816ad]"
        >
          Made by <span style={{ fontWeight: 600 }}>Doms Global</span>
        </a>
      </div>
    </footer>
  );
}