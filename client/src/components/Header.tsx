import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { SearchOverlay } from "./SearchOverlay";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Globe,
  Grid3X3,
  Truck,
  Shield,
  Calendar,
  RotateCcw,
  Laptop,
  Tv,
  Smartphone,
  Watch,
  Refrigerator,
  Camera,
  Tablet,
  Headphones,
  Router,
  ArrowLeftRight,
  Package,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// Category data with icons
const categories = [
  { name: "Laptops & Computers", slug: "laptops-computers", icon: Laptop, hasSubmenu: true },
  { name: "TVs & Video", slug: "tvs-video", icon: Tv, hasSubmenu: true },
  { name: "Cell Phones", slug: "cell-phones", icon: Smartphone, hasSubmenu: true },
  { name: "Wearable Tech", slug: "wearable-tech", icon: Watch, hasSubmenu: true },
  { name: "Appliances", slug: "appliances", icon: Refrigerator, hasSubmenu: true },
  { name: "Cameras", slug: "cameras", icon: Camera, hasSubmenu: true },
  { name: "iPads & Tablets", slug: "ipads-tablets", icon: Tablet, hasSubmenu: true },
  { name: "Headphones", slug: "headphones", icon: Headphones, hasSubmenu: true },
  { name: "Networking", slug: "networking", icon: Router, hasSubmenu: true },
];

// Benefits bar items
const benefits = [
  { icon: Truck, text: "Free shipping on order over $50" },
  { icon: Shield, text: "30 days money back guarantee" },
  { icon: Calendar, text: "Next day delivery free–spend over $99" },
  { icon: RotateCcw, text: "60-Day free returns, All shipping methods." },
];

export default function Header() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const gitPullMutation = trpc.system.gitPull.useMutation({
    onSuccess: (data) => {
      setIsPulling(false);
      if (data.success) {
        toast.success("Successfully pulled latest changes");
      } else {
        toast.error(`Pull failed: ${data.error}`);
      }
    },
    onError: (error) => {
      setIsPulling(false);
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleGitPull = () => {
    setIsPulling(true);
    gitPullMutation.mutate();
  };
  
  // Mock cart data - replace with real cart state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Powerbeats Pro - Totally Wireless Earphones - Ivory",
      store: "Casual",
      price: 150.60,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400"
    }
  ]);
  const categoryRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? "shadow-md" : ""}`}>
      {/* Main Header - Dark Blue */}
      <div className="bg-[#11248F]">
        <div className="container">
          <div className="flex items-center justify-between h-[86px] gap-4">
            {/* Left Section: Logo + Categories */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Logo */}
              <Link href="/">
                <a className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-[30px] font-bold tracking-tight leading-none">
                      Motta
                    </span>
                    <div className="flex gap-0.5 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFA132]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3]"></span>
                    </div>
                  </div>
                  <span className="text-white/60 text-[10px] tracking-wide leading-none">Best For Shopping</span>
                </a>
              </Link>

              {/* Categories Dropdown - Desktop */}
              <div className="hidden lg:block relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-2 h-[46px] px-4 text-white border border-white/20 rounded-sm hover:bg-white/10 transition-colors"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="text-base font-normal">Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Category Dropdown Menu */}
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-sm shadow-lg border border-[#DADFE3] py-2 z-50">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Link key={category.slug} href={`/shop?category=${category.slug}`}>
                          <a
                            className="flex items-center gap-3 px-5 py-3 text-[15px] text-[#1D2128] hover:bg-[#ECF0F4] transition-colors group"
                            onClick={() => setIsCategoryOpen(false)}
                          >
                            <IconComponent className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" strokeWidth={1.5} />
                            <span className="flex-1">{category.name}</span>
                            {category.hasSubmenu && <ChevronDown className="h-4 w-4 -rotate-90 text-[#7C818B]" />}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-[527px]">
              <div className={`relative w-full flex items-center bg-white rounded-sm overflow-hidden transition-all ${isSearchFocused ? "ring-2 ring-white/50" : ""}`}>
                <Input
                  type="text"
                  placeholder="Search for anything"
                  className="h-[48px] border-0 bg-transparent text-sm text-[#1D2128] placeholder:text-[#7C818B] focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button className="absolute right-0 h-full px-4 text-[#7C818B] hover:text-[#1D2128] transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Section: Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Git Pull Button */}
              <button
                onClick={handleGitPull}
                disabled={isPulling}
                className="hidden xl:flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-sm transition-colors disabled:opacity-50"
                title="Pull latest changes"
              >
                <RefreshCw className={`h-5 w-5 ${isPulling ? "animate-spin" : ""}`} />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-white/60">Git</span>
                  <span className="text-sm font-medium">Pull</span>
                </div>
              </button>

              {/* Region Selector - Desktop */}
              <button className="hidden xl:flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-sm transition-colors">
                <span className="text-lg">🇬🇧</span>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-white/60">Region</span>
                  <span className="text-sm font-medium">EN/ USD</span>
                </div>
              </button>

              {/* Account */}
              <button
                onClick={() => setIsAccountMenuOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-sm transition-colors"
              >
                <User className="h-5 w-5" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-white/60">Welcome</span>
                  <span className="text-sm font-medium">Sign in / Register</span>
                </div>
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOverlayOpen(true)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-sm transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Region Flag - Mobile */}
              <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-sm transition-colors">
                <span className="text-lg">🇬🇧</span>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <a className="p-2 text-white hover:bg-white/10 rounded-sm transition-colors">
                  <div className="relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#D8125D] text-white text-xs font-medium rounded-full flex items-center justify-center">
                      0
                    </span>
                  </div>
                </a>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:bg-white/10 rounded-sm transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#D8125D] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Bar - White */}
      <div className={`bg-white border-b border-[#DADFE3] transition-all duration-200 ${isScrolled ? "hidden" : ""} hidden md:block`}>
        <div className="container">
          <div className="flex items-center justify-center md:justify-between py-3 overflow-x-auto gap-4 md:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-[#1D2128] whitespace-nowrap flex-shrink-0">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-[#7C818B] flex-shrink-0" />
                  <span className="hidden lg:inline">{benefit.text}</span>
                  <span className="lg:hidden">{benefit.text.length > 25 ? benefit.text.substring(0, 25) + '...' : benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Overlay for Mobile */}
      <SearchOverlay 
        isOpen={isSearchOverlayOpen} 
        onClose={() => setIsSearchOverlayOpen(false)} 
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[86px] bg-white z-40 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[#1D2128] mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link key={category.slug} href={`/shop?category=${category.slug}`}>
                  <a
                    className="flex items-center justify-between px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </a>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#DADFE3]">
              <Link href="/dashboard">
                <a
                  className="flex items-center gap-3 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </a>
              </Link>
              <Link href="/wishlist">
                <a
                  className="flex items-center gap-3 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Account Side Menu */}
      {isAccountMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsAccountMenuOpen(false)}
          />
          
          {/* Side Panel */}
          <div
            ref={accountMenuRef}
            className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#DADFE3]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1D2128] flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-[#1D2128]">Account</h2>
              </div>
              <button
                onClick={() => setIsAccountMenuOpen(false)}
                className="p-2 hover:bg-[#ECF0F4] rounded-sm transition-colors"
              >
                <X className="h-5 w-5 text-[#1D2128]" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6">
              <nav className="space-y-1">
                <Link href="/login">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Sign In</span>
                  </a>
                </Link>

                <Link href="/register">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Create Account</span>
                  </a>
                </Link>

                <Link href="/wishlist">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Wishlist</span>
                  </a>
                </Link>

                <Link href="/compare">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <ArrowLeftRight className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Compare</span>
                  </a>
                </Link>

                <Link href="/track-order">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Track Order</span>
                  </a>
                </Link>

                <Link href="/help-center">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <HelpCircle className="h-5 w-5 text-[#7C818B] group-hover:text-[#11248F]" />
                    <span className="text-[15px]">Help Center</span>
                  </a>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <Link href="/about">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <span className="text-[15px]">About Us</span>
                  </a>
                </Link>

                <Link href="/contact">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <span className="text-[15px]">Contact Us</span>
                  </a>
                </Link>

                <Link href="/careers">
                  <a
                    className="flex items-center gap-4 px-4 py-3 text-[#1D2128] hover:bg-[#ECF0F4] rounded-sm transition-colors group"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    <span className="text-[15px]">Careers</span>
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Shopping Cart Side Panel */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#1D2128]">
                Shopping Cart ({cartItems.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-[#7C818B]" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                  <div className="w-32 h-32 mb-6 text-gray-300">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40 60h120l-10 80H50L40 60z" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M60 60V40c0-11 9-20 20-20h40c11 0 20 9 20 20v20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      <circle cx="70" cy="160" r="8" fill="currentColor" />
                      <circle cx="130" cy="160" r="8" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="text-[#7C818B] text-center">No products in the cart.</p>
                </div>
              ) : (
                /* Cart Items */
                <div className="px-6 py-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[#1D2128] mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#7C818B] mb-2">
                          Store: <span className="font-medium">{item.store}</span>
                        </p>
                        <p className="text-lg font-semibold text-[#1D2128]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => setCartItems(cartItems.filter(i => i.id !== item.id))}
                        className="p-2 text-[#7C818B] hover:text-[#D8125D] transition-colors self-start"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Quantity Controls (below product info) */}
                  {cartItems.map((item) => (
                    <div key={`qty-${item.id}`} className="flex items-center gap-3 -mt-2 mb-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => {
                            setCartItems(cartItems.map(i => 
                              i.id === item.id && i.quantity > 1 
                                ? { ...i, quantity: i.quantity - 1 } 
                                : i
                            ));
                          }}
                          className="px-3 py-1 text-[#7C818B] hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center border-x border-gray-300 py-1 text-sm font-medium text-[#1D2128]"
                        />
                        <button
                          onClick={() => {
                            setCartItems(cartItems.map(i => 
                              i.id === item.id 
                                ? { ...i, quantity: i.quantity + 1 } 
                                : i
                            ));
                          }}
                          className="px-3 py-1 text-[#7C818B] hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-base">
                  <span className="text-[#7C818B]">
                    Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                  </span>
                  <span className="text-xl font-semibold text-[#1D2128]">
                    ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-[#11248F] text-white py-3 rounded-md font-medium hover:bg-[#0d1a6b] transition-colors">
                  Checkout
                </button>

                {/* View Cart Link */}
                <Link href="/cart">
                  <a
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center text-[#11248F] font-medium hover:underline"
                  >
                    View Cart
                  </a>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
