import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { useIsMobile } from "@/hooks/useMobile";
import { AccountDrawer } from "./header/AccountDrawer";
import { BrandLogo } from "./header/BrandLogo";
import { CartDrawer, HeaderCartItem } from "./header/CartDrawer";
import { CategoryDropdown } from "./header/CategoryDropdown";
import { HeaderActions } from "./header/HeaderActions";
import { HeaderBenefitsStrip } from "./header/HeaderBenefitsStrip";
import { HeaderSearchInput } from "./header/HeaderSearchInput";
import { MobileMenuDrawer } from "./header/MobileMenuDrawer";
import { benefits, categories } from "./header/headerData";

export default function Header() {
  const STICKY_REAPPEAR_OFFSET = 220;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isStickyRendered, setIsStickyRendered] = useState(false);
  const isMobile = useIsMobile();

  const [cartItems, setCartItems] = useState<HeaderCartItem[]>([
    {
      id: 1,
      name: "Powerbeats Pro - Totally Wireless Earphones - Ivory",
      store: "Casual",
      price: 150.6,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
    },
  ]);

  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsStickyVisible(window.scrollY >= STICKY_REAPPEAR_OFFSET);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isStickyVisible) {
      setIsStickyRendered(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsStickyRendered(false);
    }, 220);

    return () => clearTimeout(timeout);
  }, [isStickyVisible]);

  const openAccountFromMobileMenu = () => {
    setIsAccountMenuOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isStickyRendered && <div className="h-[80px] min-[1020px]:h-[80px] min-[1020px]:min-h-[80px]" />}
      {isStickyRendered && <div className="h-[52px] min-[1020px]:hidden" />}
      <header
        className={`z-50 border-[#0f1f78]/30 shadow-sm transition-all duration-200 ${
          isStickyRendered
            ? `fixed inset-x-0 top-0 ${isStickyVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`
            : "relative"
        }`}
      >
        <div className="bg-primary">
          <div className="container">
            <div className="hidden min-[1020px]:flex h-[80px] items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <BrandLogo />
                <CategoryDropdown
                  containerRef={categoryRef}
                  categories={categories}
                  isOpen={isCategoryOpen}
                  onToggle={() => setIsCategoryOpen((prev) => !prev)}
                  onClose={() => setIsCategoryOpen(false)}
                />
              </div>

              <HeaderSearchInput
                isFocused={isSearchFocused}
                onBlur={() => setIsSearchFocused(false)}
                onFocus={() => setIsSearchFocused(true)}
              />

              <HeaderActions
                cartCount={cartItems.length}
                onOpenAccount={() => setIsAccountMenuOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </div>

            <div className="py-3 min-[1020px]:hidden">
              <div className="flex h-14 items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="rounded-2xl p-2 text-white transition-colors hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                  </button>
                  <BrandLogo mobile />
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-2xl p-2 text-white transition-colors hover:bg-white/10">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[10px] font-semibold">
                      ZM
                    </span>
                  </button>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative rounded-2xl p-2 text-white transition-colors hover:bg-white/10"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e31b63] text-[11px] font-semibold text-white">
                      {cartItems.length}
                    </span>
                  </button>
                </div>
              </div>

              <HeaderSearchInput mobile />
            </div>
          </div>
        </div>

        {!isStickyRendered && <HeaderBenefitsStrip benefits={benefits} isMobile={isMobile} />}
      </header>

      <SearchOverlay isOpen={isSearchOverlayOpen} onClose={() => setIsSearchOverlayOpen(false)} />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        categories={categories}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAccount={openAccountFromMobileMenu}
      />

      <AccountDrawer isOpen={isAccountMenuOpen} onClose={() => setIsAccountMenuOpen(false)} />

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={(id) => setCartItems((items) => items.filter((item) => item.id !== id))}
        onDecreaseItem={(id) =>
          setCartItems((items) =>
            items.map((item) =>
              item.id === id && item.quantity > 1
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
          )
        }
        onIncreaseItem={(id) =>
          setCartItems((items) =>
            items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            )
          )
        }
      />
    </>
  );
}
