import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock product data
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "X509JB-EJ018 Intel Core i5 1035G1 4GB 256GB SSD MX110",
    price: 326.0,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 1,
    vendor: "Zone Shop",
    category: "Laptops",
    badge: "new",
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
    badge: "hot",
  },
  {
    id: "4",
    name: "Apple – iPhone 11 64GB",
    price: 699.0,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 45,
    vendor: "Casual",
    category: "Cell Phones",
    badge: "hot",
  },
  {
    id: "5",
    name: "Apple – HomePod – Space Gray",
    price: 299.0,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 23,
    vendor: "Sanvo",
    category: "Accessories",
  },
  {
    id: "6",
    name: "11-inch Tablet Pro 2020 Space Gray",
    price: 799.0,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 34,
    vendor: "Zone Shop",
    category: "Tablets",
  },
];

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
    badge: "hot",
  },
  {
    id: "8",
    name: "Beats Pill+ Portable Speaker – Black",
    price: 179.0,
    oldPrice: 229.0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4,
    reviewCount: 28,
    vendor: "Borda",
    category: "Headphones",
    badge: "sale",
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
  },
  {
    id: "11",
    name: "Defender Series Pro Case for Samsung Galaxy S20+",
    price: 49.0,
    oldPrice: 69.0,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    rating: 5,
    reviewCount: 42,
    vendor: "Zone Shop",
    category: "Accessories",
    badge: "hot",
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
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <section className="container py-8">
          <HeroCarousel />
        </section>

        {/* Category Grid */}
        <section className="container py-12">
          <CategoryGrid />
        </section>

        {/* Deal of the Days */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Daily Deals</h2>
                <p className="text-muted-foreground">Today's featured deals and top tech</p>
              </div>
              <Link href="/deals">
                <a>
                  <Button variant="outline" className="gap-2 rounded-full">
                    See All Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Check out our latest products</p>
            </div>
            <Link href="/shop">
              <a>
                <Button variant="outline" className="gap-2 rounded-full">
                  See All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="container py-12">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don't waste this discount!
              </h2>
              <p className="text-lg mb-2 opacity-90">New user coupon can be used on any item</p>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold">15%</span>
                <span className="text-xl">Off Your First Order</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="font-semibold">Code: SAVE15</p>
                <p className="text-sm opacity-90">Valid: Feb 22 - Mar 01</p>
              </div>
              <Button size="lg" variant="secondary" className="rounded-full">
                Shop Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
