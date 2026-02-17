import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BottomNav } from "./components/BottomNav";
import { RoleSelection } from "./components/RoleSelection";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
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
import StoreListing from "./pages/(public)/StoreListing";
import VendorOnboarding from "./pages/(vendor)/onboarding";
import VendorStorefront from "./pages/(public)/VendorStorefront";
import Checkout from "./pages/(public)/Checkout";
import ThankYou from "./pages/(public)/ThankYou";

// Customer Dashboard Pages
import Cart from "./pages/(customer)/Cart";
import Dashboard from "./pages/(customer)/Dashboard";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";

// Vendor Dashboard Pages
import VendorDashboard from "./pages/(vendor)/VendorDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Legal from "./pages/Legal";
import SiteMap from "./pages/SiteMap";

function Router() {
  const { user, isLoading } = useAuth();

  // Show role selection if user is authenticated but has no role set (shouldn't happen with default)
  // or if they explicitly navigate to /select-role
  if (user && !isLoading && !user.role) {
    return <RoleSelection onComplete={() => (window.location.href = "/")} />;
  }

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/store-listing" component={StoreListing} />
      <Route path="/stores" component={StoreListing} />
      <Route path="/vendor/onboarding" component={VendorOnboarding} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart">
        <ProtectedRoute requireAuth>
          <Cart />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute requireAuth requiredRole="customer">
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/vendor/dashboard">
        <ProtectedRoute requireAuth requiredRole="vendor">
          <VendorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/verify" component={VerifyOTP} />
      <Route path="/select-role">
        <RoleSelection onComplete={() => (window.location.href = "/")} />
      </Route>
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/about" component={About} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/faq" component={FAQ} />
      <Route path="/track-order" component={OrderTracking} />
      <Route path="/store-listing" component={StoreListing} />
      <Route path="/store-listing/" component={StoreListing} />
      <Route path="/store/vendor/:id" component={VendorStorefront} />
      <Route path="/store/vendor/:id/" component={VendorStorefront} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/" component={Checkout} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/thank-you/" component={ThankYou} />
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
