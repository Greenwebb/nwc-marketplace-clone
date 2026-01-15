import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BottomNav } from "./components/BottomNav";
// Public Marketplace Pages
import Home from "./pages/(public)/Home";
import Shop from "./pages/(public)/Shop";
import ProductDetail from "./pages/(public)/ProductDetail";
import Contact from "./pages/(public)/Contact";
import Careers from "./pages/(public)/Careers";
import About from "./pages/(public)/About";
import HelpCenter from "./pages/(public)/HelpCenter";
import FAQ from "./pages/(public)/FAQ";
import OrderTracking from "./pages/(public)/OrderTracking";

// Customer Dashboard Pages
import Cart from "./pages/(customer)/Cart";
import Dashboard from "./pages/(customer)/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Legal from "./pages/Legal";
import SiteMap from "./pages/SiteMap";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/about" component={About} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/faq" component={FAQ} />
      <Route path="/track-order" component={OrderTracking} />
      <Route path="/legal/privacy-policy" component={PrivacyPolicy} />
      <Route path="/legal/terms-of-use" component={TermsOfUse} />
      <Route path="/legal" component={Legal} />
      <Route path="/site-map" component={SiteMap} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <BottomNav cartItemCount={1} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
