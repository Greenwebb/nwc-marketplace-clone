import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import DailyDeals from "@/components/DailyDeals";
import FeaturedBanner from "@/components/FeaturedBanner";
import BrandLogos from "@/components/BrandLogos";
import FeaturedOffers from "@/components/FeaturedOffers";
import FlexiblePayment from "@/components/FlexiblePayment";
import BenefitsBar from "@/components/BenefitsBar";
import { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

function DealCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 51, seconds: 3 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { hours: 23, minutes: 59, seconds: 59 };
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1 border border-[#E91E63] rounded-full px-3 py-1">
      <span className="text-xs font-bold text-[#E91E63]">{pad(timeLeft.hours)}</span>
      <span className="text-xs font-bold text-[#E91E63]">:</span>
      <span className="text-xs font-bold text-[#E91E63]">{pad(timeLeft.minutes)}</span>
      <span className="text-xs font-bold text-[#E91E63]">:</span>
      <span className="text-xs font-bold text-[#E91E63]">{pad(timeLeft.seconds)}</span>
    </div>
  );
}

// Mock product data - Daily Deals
const dailyDealsProducts: Product[] = [
  {
    id: "1",
    name: "X509JB-EJ018 Intel Core i5 1035G1 4GB 256GB SSD MX110",
    price: 326.0,
    oldPrice: 399.0,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 1,
    vendor: "Zone Shop",
    category: "Laptops",
    badge: "sale",
  },
  {
    id: "2",
    name: "Powerbeats Pro – Totally Wireless Earphones – Ivory",
    price: 249.0,
    oldPrice: 299.0,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 12,
    vendor: "Casual",
    category: "Headphones",
    badge: "sale",
  },
  {
    id: "3",
    name: "JOBY GripTight PRO TelePod Tripod",
    price: 34.0,
    oldPrice: 45.0,
    image: "https://images.unsplash.com/photo-1606986628502-8f1e2e3e4c5e?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 8,
    vendor: "TehchiStore",
    category: "Accessories",
    badge: "sale",
  },
  {
    id: "4",
    name: "Apple – iPhone 11 64GB",
    price: 699.0,
    oldPrice: 799.0,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 45,
    vendor: "Casual",
    category: "Cell Phones",
    badge: "sale",
  },
  {
    id: "5",
    name: "Apple – HomePod – Space Gray",
    price: 249.0,
    oldPrice: 299.0,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 23,
    vendor: "Sanvo",
    category: "Accessories",
    badge: "sale",
  },
  {
    id: "6",
    name: "11-inch Tablet Pro 2020 Space Gray",
    price: 699.0,
    oldPrice: 799.0,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 34,
    vendor: "Zone Shop",
    category: "Tablets",
    badge: "sale",
  },
];

// New Arrivals products
const newArrivals: Product[] = [
  {
    id: "7",
    name: "MacBook Air 13-inch, 8GB RAM 256GB SSD Storage – Gold (2020 model)",
    price: 999.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 67,
    vendor: "beagle",
    category: "Laptops",
    badge: "new",
  },
  {
    id: "8",
    name: "Beats Pill+ Portable Speaker – Black",
    price: 179.0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 28,
    vendor: "Borda",
    category: "Headphones",
    badge: "new",
  },
  {
    id: "9",
    name: "Galaxy Watch Active 2 Aluminum Smart Watch",
    price: 249.0,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 19,
    vendor: "Truffles",
    category: "Wearable Tech",
    badge: "new",
  },
  {
    id: "10",
    name: "Smart Keyboard Folio for 12.9 (English)",
    price: 199.0,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 15,
    vendor: "Sanvo",
    category: "Accessories",
    badge: "new",
  },
  {
    id: "11",
    name: "Defender Series Pro Case for Samsung Galaxy S20+",
    price: 49.0,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 42,
    vendor: "Zone Shop",
    category: "Accessories",
    badge: "new",
  },
  {
    id: "12",
    name: "Galaxy 13.3 Book S, 256GB, Mercury Gray (Wi-Fi)",
    price: 849.0,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 31,
    vendor: "Truffles",
    category: "Laptops",
    badge: "new",
  },
];

// Best Sellers products
const bestSellers: Product[] = [
  {
    id: "13",
    name: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
    price: 348.0,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 156,
    vendor: "Sony Store",
    category: "Headphones",
    badge: "hot",
  },
  {
    id: "14",
    name: "Canon EOS R6 Full-Frame Mirrorless Camera",
    price: 2499.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 89,
    vendor: "Canon Official",
    category: "Cameras",
    badge: "hot",
  },
  {
    id: "15",
    name: "Samsung 65\" Class QLED 4K UHD Smart TV",
    price: 1297.0,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 234,
    vendor: "Samsung Store",
    category: "TVs & Video",
    badge: "hot",
  },
  {
    id: "16",
    name: "DJI Mavic Air 2 Fly More Combo Drone",
    price: 988.0,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 67,
    vendor: "DJI Store",
    category: "Cameras",
    badge: "hot",
  },
  {
    id: "17",
    name: "Apple Watch Series 7 GPS 45mm",
    price: 429.0,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 312,
    vendor: "Apple Store",
    category: "Wearable Tech",
    badge: "hot",
  },
  {
    id: "18",
    name: "Nintendo Switch OLED Model",
    price: 349.0,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 445,
    vendor: "Nintendo",
    category: "Gaming",
    badge: "hot",
  },
];

// Top Rated products
const topRated: Product[] = [
  {
    id: "19",
    name: "Bose QuietComfort 45 Wireless Headphones",
    price: 329.0,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 278,
    vendor: "Bose Store",
    category: "Headphones",
  },
  {
    id: "20",
    name: "LG 27\" UltraGear QHD Gaming Monitor",
    price: 449.0,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 189,
    vendor: "LG Electronics",
    category: "Monitors",
  },
  {
    id: "21",
    name: "Logitech MX Master 3 Advanced Wireless Mouse",
    price: 99.0,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 567,
    vendor: "Logitech",
    category: "Accessories",
  },
  {
    id: "22",
    name: "Razer BlackWidow V3 Pro Mechanical Keyboard",
    price: 229.0,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 234,
    vendor: "Razer",
    category: "Accessories",
  },
  {
    id: "23",
    name: "GoPro HERO10 Black Action Camera",
    price: 449.0,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 156,
    vendor: "GoPro",
    category: "Cameras",
  },
  {
    id: "24",
    name: "Anker PowerCore 26800 Portable Charger",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 892,
    vendor: "Anker",
    category: "Accessories",
  },
];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("nwc_welcome_shown");
  });

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("nwc_welcome_shown", "true");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff]">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Banners Section (TV + Daily Deals) */}
        <section className="py-8 bg-[#fff]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured TV Banner - 2/3 width */}
              <div className="md:col-span-2">
                <FeaturedBanner
                  badge="FEATURED"
                  title="See the world in a billion shades of color"
                  subtitle="100% Color Volume with Quantum Dot"
                  primaryButton={{ text: "Explore Now", href: "/shop?category=tvs" }}
                  secondaryButton={{ text: "Learn More", href: "/product/qled-tv" }}
                  image="/homev7-slider5.webp"
                  bgColor="#FFFFFF"
                  showDots
                  activeDot={0}
                  totalDots={2}
                />
              </div>

              {/* Daily Deals Card - 1/3 width */}
              <div
                className="rounded-2xl  border border-gray-200 p-8 relative overflow-hidden h-[300px] md:h-[350px] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/homev7-dailydelas.webp')" }}
              >
                <div className="relative z-10">
                  {/* Header with badge and timer */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#E91E63] uppercase tracking-[0.15em]">DEAL OF THE DAYS</span>
                    <DealCountdown />
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-[32px] font-bold italic text-primary mb-2">Daily Deals</h2>

                  {/* Subtitle */}
                  <p className="text-sm text-[#7C818B] mb-6">Today's featured deals and top tech.</p>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="default"
                    className="h-[44px] rounded-2xl bg-secondary px-8 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
                  >
                    <a href="/shop?filter=deals">Shop Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Popular Picks */}
        <ProductCarousel
          title="Today's Popular Picks"
          products={dailyDealsProducts}
          viewAllLink="/shop?filter=popular"
          viewAllText="See All Products"
        />

        {/* Flexible Payment Banner */}
        <FlexiblePayment />

        {/* New Arrivals Carousel */}
        <ProductCarousel
          title="New Arrivals"
          subtitle="Check out our latest products"
          products={newArrivals}
          viewAllLink="/shop?sort=newest"
          viewAllText="See All Products"
        />

        {/* Our Featured Offers */}
        <FeaturedOffers />

        {/* Trending Brands */}
        <BrandLogos />

        {/* Best Sellers Carousel */}
        {/* <ProductCarousel
          title="Best Sellers"
          subtitle="Our most popular products"
          products={bestSellers}
          viewAllLink="/shop?sort=bestselling"
          viewAllText="See All Products"
        /> */}

        {/* Welcome Popup Banner */}
        <Dialog open={showWelcome} onOpenChange={(open) => { if (!open) handleCloseWelcome(); }}>
          <DialogContent className="max-w-lg p-0 border-0 overflow-hidden rounded-2xl bg-transparent shadow-2xl [&>button]:hidden">
            <DialogTitle className="sr-only">Welcome Offer</DialogTitle>
            <div
              className="relative p-8 md:p-10 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/flexiblepayment.bg.webp')" }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseWelcome}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#1D2128] transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10">
                <span className="inline-block text-xs font-medium text-[#7C818B] tracking-wider uppercase mb-3">
                  LIMITED TIME OFFER
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  Local is <span className="text-secondary">Laka </span>Iwe!
                </h2>
                <p className="text-base text-[#7C818B] mb-2">New user coupon can be used on any item</p>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary">15%</span>
                  <span className="text-xl text-[#7C818B]">Off Your First Order</span>
                </div>
                <div className="space-y-1 mb-6">
                  <p className="text-sm text-primary font-medium">Code: SAVE15</p>
                  <p className="text-xs text-[#7C818B]">Valid: Feb 22 - Mar 01</p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-primary px-8 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
                >
                  <a href="/shop" onClick={handleCloseWelcome}>Shop Now</a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Top Rated Carousel */}
        {/* <ProductCarousel
          title="Top Rated"
          subtitle="Highest rated by our customers"
          products={topRated}
          viewAllLink="/shop?sort=rating"
          viewAllText="See All Products"
        /> */}
      </main>

      {/* Benefits Bar */}
      <BenefitsBar />

      <Footer />
    </div>
  );
}
