import { createContext, useContext, useState, useRef, type ReactNode } from "react";

export interface ProductInfo {
  name: string;
  image: string;
  category: string;
}

export type ViewType =
  | "home"
  | "product-detail"
  | "products"
  | "about"
  | "locate-dealers"
  | "contact"
  | "our-company"
  | "investors"
  | "account"
  | "cart"
  | "search"
  | "blog";

interface NavigationContextType {
  currentView: ViewType;
  previousView: ViewType;
  selectedProduct: ProductInfo | null;
  searchQuery: string;
  navigateToProduct: (product: ProductInfo) => void;
  navigateHome: () => void;
  navigateToProducts: () => void;
  navigateToAbout: () => void;
  navigateToDealers: () => void;
  navigateToContact: () => void;
  navigateToOurCompany: () => void;
  navigateToInvestors: () => void;
  navigateToAccount: () => void;
  navigateToCart: () => void;
  navigateToSearch: (query?: string) => void;
  navigateToBlog: (postSlug?: string) => void;
  selectedBlogPost: string | null;
  navigateBack: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentView: "home",
  previousView: "home",
  selectedProduct: null,
  searchQuery: "",
  navigateToProduct: () => {},
  navigateHome: () => {},
  navigateToProducts: () => {},
  navigateToAbout: () => {},
  navigateToDealers: () => {},
  navigateToContact: () => {},
  navigateToOurCompany: () => {},
  navigateToInvestors: () => {},
  navigateToAccount: () => {},
  navigateToCart: () => {},
  navigateToSearch: () => {},
  navigateToBlog: () => {},
  selectedBlogPost: null,
  navigateBack: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null);
  const previousViewRef = useRef<ViewType>("home");

  const goTo = (view: ViewType) => {
    previousViewRef.current = currentView;
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToProduct = (product: ProductInfo) => {
    previousViewRef.current = currentView;
    setSelectedProduct(product);
    setCurrentView("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = () => goTo("home");
  const navigateToProducts = () => goTo("products");
  const navigateToAbout = () => goTo("about");
  const navigateToDealers = () => goTo("locate-dealers");
  const navigateToContact = () => goTo("contact");
  const navigateToOurCompany = () => goTo("our-company");
  const navigateToInvestors = () => goTo("investors");
  const navigateToAccount = () => goTo("account");
  const navigateToCart = () => goTo("cart");
  const navigateToSearch = (query?: string) => {
    setSearchQuery(query || "");
    goTo("search");
  };

  const navigateToBlog = (postSlug?: string) => {
    setSelectedBlogPost(postSlug || null);
    goTo("blog");
  };

  const navigateBack = () => {
    const prev = previousViewRef.current;
    if (prev === "products") {
      navigateToProducts();
    } else {
      navigateHome();
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        previousView: previousViewRef.current,
        selectedProduct,
        searchQuery,
        navigateToProduct,
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
        selectedBlogPost,
        navigateBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}