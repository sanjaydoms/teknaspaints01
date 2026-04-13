/* Teknas Paints — root shell (verified) */
import { NavigationProvider, useNavigation } from "./components/navigation-context";
import { StickyNavBar } from "./components/sticky-navbar";
import { HomePage } from "./components/home-page";
import { ProductDetailPage } from "./components/product-detail-page";
import { ProductsPage } from "./components/products-page";
import { AboutPage } from "./components/about-page";
import { LocateDealersPage } from "./components/locate-dealers-page";
import { ContactPage } from "./components/contact-page";
import { OurCompanyPage } from "./components/our-company-page";
import { InvestorsPage } from "./components/investors-page";
import { AccountPage } from "./components/account-page";
import { CartPage } from "./components/cart-page";
import { SearchPage } from "./components/search-page";
import { BlogPage } from "./components/blog-page";
import { PageFooter } from "./components/page-footer";

const FOOTER_VIEWS = new Set([
  "home",
  "products",
  "product-detail",
  "about",
  "locate-dealers",
  "contact",
  "our-company",
  "investors",
  "account",
  "cart",
  "search",
  "blog",
]);

function AppContent() {
  const { currentView, selectedProduct } = useNavigation();

  const renderPage = () => {
    if (currentView === "product-detail" && selectedProduct) {
      return <ProductDetailPage product={selectedProduct} />;
    }
    switch (currentView) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "about":
        return <AboutPage />;
      case "locate-dealers":
        return <LocateDealersPage />;
      case "contact":
        return <ContactPage />;
      case "our-company":
        return <OurCompanyPage />;
      case "investors":
        return <InvestorsPage />;
      case "account":
        return <AccountPage />;
      case "cart":
        return <CartPage />;
      case "search":
        return <SearchPage />;
      case "blog":
        return <BlogPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
        <StickyNavBar />
      </div>
      {renderPage()}
      {FOOTER_VIEWS.has(currentView) && <PageFooter />}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}