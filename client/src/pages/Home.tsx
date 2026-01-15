import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import DailyDeals from "@/components/DailyDeals";
import FeaturedBanner from "@/components/FeaturedBanner";
import BrandLogos from "@/components/BrandLogos";
import { Product } from "@/components/ProductCard";

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
  return (
    <div className="min-h-screen flex flex-col bg-[#ECF0F4]">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Daily Deals Section */}
        <section className="py-8 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Daily Deals Banner */}
              <div className="lg:col-span-1">
                <DailyDeals />
              </div>
              
              {/* Daily Deals Products */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {dailyDealsProducts.slice(0, 6).map((product) => (
                    <div key={product.id}>
                      <div className="bg-white">
                        <div className="relative aspect-square overflow-hidden bg-[#F5F5F7]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                          />
                          {product.badge === "sale" && product.oldPrice && (
                            <span className="absolute top-2 left-2 motta-badge-sale">
                              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </span>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm text-[#1D2128] line-clamp-2 mb-2">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-[#D8125D]">${product.price.toFixed(2)}</span>
                            {product.oldPrice && (
                              <span className="text-sm text-[#7C818B] line-through">${product.oldPrice.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Banners */}
        <section className="py-8 bg-[#ECF0F4]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeaturedBanner
                badge="NEW ARRIVALS"
                title="GoPro Hero 10 Black Edition"
                subtitle="Capture your adventures in stunning 5.3K"
                primaryButton={{ text: "Shop Now", href: "/shop?category=cameras" }}
                secondaryButton={{ text: "Learn More", href: "/product/gopro-hero-10" }}
                image="https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=300&fit=crop"
                bgColor="#E8F4FD"
              />
              <FeaturedBanner
                badge="FEATURED"
                title="AirPods Pro with MagSafe"
                subtitle="Active Noise Cancellation for immersive sound"
                primaryButton={{ text: "Buy Now", href: "/shop?category=headphones" }}
                image="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop"
                bgColor="#FFF5F5"
                variant="right"
              />
            </div>
          </div>
        </section>

        {/* New Arrivals Carousel */}
        <ProductCarousel
          title="New Arrivals"
          subtitle="Check out our latest products"
          products={newArrivals}
          viewAllLink="/shop?sort=newest"
          viewAllText="See All Products"
        />

        {/* Brand Logos */}
        <BrandLogos />

        {/* Best Sellers Carousel */}
        <ProductCarousel
          title="Best Sellers"
          subtitle="Our most popular products"
          products={bestSellers}
          viewAllLink="/shop?sort=bestselling"
          viewAllText="See All Products"
        />

        {/* Promotional Banner */}
        <section className="py-8 bg-[#ECF0F4]">
          <div className="container">
            <div className="relative overflow-hidden rounded-sm bg-[#11248F] p-8 md:p-12">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5"></div>
              
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-xs font-medium text-white/60 tracking-wider uppercase mb-3">
                  LIMITED TIME OFFER
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Don't waste this discount!
                </h2>
                <p className="text-base text-white/80 mb-2">New user coupon can be used on any item</p>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-bold text-white">15%</span>
                  <span className="text-xl text-white/80">Off Your First Order</span>
                </div>
                <div className="space-y-1 mb-6">
                  <p className="text-sm text-white font-medium">Code: SAVE15</p>
                  <p className="text-xs text-white/60">Valid: Feb 22 - Mar 01</p>
                </div>
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center h-[46px] px-8 bg-white text-[#11248F] text-sm font-medium rounded-sm hover:bg-white/90 transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Top Rated Carousel */}
        <ProductCarousel
          title="Top Rated"
          subtitle="Highest rated by our customers"
          products={topRated}
          viewAllLink="/shop?sort=rating"
          viewAllText="See All Products"
        />
      </main>

      <Footer />
    </div>
  );
}
