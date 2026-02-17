import { useState } from "react";
import { useParams } from "@/lib/router";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Search, 
  ChevronDown, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Info,
  ShieldCheck,
  MessageSquare,
  Grid,
  List as ListIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Beats Pro Over-Ear Headphones – Black",
    category: "Headphones",
    price: 59.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    vendor: "Tech Haven",
    rating: 4.5,
    reviewCount: 12,
    badge: "sale"
  },
  {
    id: "2",
    name: "CLIC Marquetry Leather Case for iPhone 11 Pro",
    category: "Cell Phones",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    vendor: "Tech Haven",
    rating: 4.0,
    reviewCount: 8,
    badge: "hot"
  },
  {
    id: "3",
    name: "G8 ThinQ 128GB Smartphone – 6.1 OLED QHD",
    category: "Cell Phones",
    price: 499.00,
    oldPrice: 599.00,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    vendor: "Tech Haven",
    rating: 4.8,
    reviewCount: 25,
    badge: "new"
  },
  {
    id: "4",
    name: "Galaxy 13.3 Book S, 256GB, Mercury Gray (Wi-Fi)",
    category: "Laptops & Computers",
    price: 899.00,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    vendor: "Tech Haven",
    rating: 4.2,
    reviewCount: 15
  },
  {
    id: "5",
    name: "Galaxy Watch Active 2 Aluminum Smart Watch",
    category: "Wearable Tech",
    price: 199.00,
    oldPrice: 249.00,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400",
    vendor: "Tech Haven",
    rating: 4.6,
    reviewCount: 30,
    badge: "sale"
  },
  {
    id: "6",
    name: "Google Pixel 4 Black 64 GB",
    category: "Cell Phones",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=400",
    vendor: "Tech Haven",
    rating: 4.4,
    reviewCount: 18
  }
];

const STORE_CATEGORIES = [
  "TVs & Video",
  "Laptops & Computers",
  "iPads & Tablets",
  "Cell Phones",
  "Printer & Supplies",
  "Headphones",
  "Networking",
  "Wearable Technology",
  "Smart Home",
  "Cameras"
];

export default function TechHavenStore() {
  const params = useParams();
  const vendorId = params.id || "tech-haven";
  
  // Format vendor name from ID (e.g., tech-haven -> Tech Haven)
  const vendorName = vendorId
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [activeTab, setActiveTab] = useState("products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#7C818B] mb-6">
          <a href="/" className="hover:text-[#11248F]">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-[#11248F]">Store</a>
          <span>/</span>
          <span className="text-[#1D2128] font-medium">{vendorName}</span>
        </nav>

        {/* Store Banner & Info Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#DADFE3] mb-8">
          {/* Banner Image */}
          <div className="h-[280px] relative bg-[#11248F]">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
              alt="Store Banner" 
              className="w-full h-full object-cover opacity-60"
            />
            
            {/* Store Logo Overlay */}
            <div className="absolute -bottom-12 left-8 w-32 h-32 rounded-full bg-white p-1 shadow-lg border-4 border-white">
              <div className="w-full h-full rounded-full bg-[#1D2128] flex items-center justify-center overflow-hidden">
                <span className="text-white text-3xl font-bold">
                  {vendorName.split(" ").map(n => n[0]).join("").toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Store Details Bar */}
          <div className="pt-16 pb-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
             <h1 className="text-3xl font-bold text-[#1D2128] mb-2">{vendorName}</h1>               <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFA500] text-[#FFA500]" />
                  ))}
                  <span className="text-sm text-[#7C818B] ml-1">(0 out of 5)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#7C818B]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>123 Tech Avenue, Silicon Valley, CA, USA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  <span>+1 234-567-890</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>contact@techhaven.com</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 mr-4">
                <a href="#" className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"><Youtube className="h-5 w-5" /></a>
              </div>
              <Button className="bg-[#11248F] hover:bg-[#0D1B6E] text-white gap-2">
                <MessageSquare className="h-4 w-4" />
                Inquiry
              </Button>
            </div>
          </div>

          {/* Store Tabs */}
          <div className="border-t border-[#DADFE3] px-8">
            <div className="flex items-center gap-8">
              {[
                { id: "products", label: "Products", icon: Grid },
                { id: "about", label: "About", icon: Info },
                { id: "policies", label: "Policies", icon: ShieldCheck },
                { id: "reviews", label: "Reviews (0)", icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-[15px] font-medium transition-all relative ${
                    activeTab === tab.id 
                      ? "text-[#11248F]" 
                      : "text-[#7C818B] hover:text-[#1D2128]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#11248F]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
            {/* Product Search */}
            <div className="bg-white p-6 rounded-2xl border border-[#DADFE3] shadow-sm">
              <h3 className="text-lg font-bold text-[#1D2128] mb-4">Product Search</h3>
              <div className="relative">
                <Input 
                  placeholder="Search products..." 
                  className="pr-10 border-[#DADFE3] focus:border-[#11248F] focus:ring-[#11248F]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7C818B]" />
              </div>
            </div>

            {/* Store Categories */}
            <div className="bg-white p-6 rounded-2xl border border-[#DADFE3] shadow-sm">
              <h3 className="text-lg font-bold text-[#1D2128] mb-4">Store Categories</h3>
              <ul className="space-y-3">
                {STORE_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-[15px] text-[#7C818B] hover:text-[#11248F] transition-colors flex items-center justify-between group">
                      <span>{cat}</span>
                      <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Store Hours */}
            <div className="bg-white p-6 rounded-2xl border border-[#DADFE3] shadow-sm">
              <h3 className="text-lg font-bold text-[#1D2128] mb-4">Store Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday", hours: "9:00 am - 6:00 pm" },
                  { day: "Tuesday", hours: "9:00 am - 6:00 pm" },
                  { day: "Wednesday", hours: "9:00 am - 6:00 pm" },
                  { day: "Thursday", hours: "9:00 am - 6:00 pm" },
                  { day: "Friday", hours: "9:00 am - 6:00 pm" },
                  { day: "Saturday", hours: "10:00 am - 4:00 pm" },
                  { day: "Sunday", hours: "Closed" }
                ].map((item) => (
                  <div key={item.day} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-[#1D2128] font-medium">{item.day}:</span>
                    <span className="text-[#7C818B]">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Listing Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#DADFE3] shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px] border-[#DADFE3]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default sorting</SelectItem>
                    <SelectItem value="popularity">Sort by popularity</SelectItem>
                    <SelectItem value="rating">Sort by average rating</SelectItem>
                    <SelectItem value="latest">Sort by latest</SelectItem>
                    <SelectItem value="price-low">Price: low to high</SelectItem>
                    <SelectItem value="price-high">Price: high to low</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center border border-[#DADFE3] rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-[#ECF0F4] text-[#11248F]" : "bg-white text-[#7C818B] hover:text-[#1D2128]"}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-[#ECF0F4] text-[#11248F]" : "bg-white text-[#7C818B] hover:text-[#1D2128]"}`}
                  >
                    <ListIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="text-sm text-[#7C818B]">
                Showing 1–6 of 10 results
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-2xl border border-[#11248F] bg-[#11248F] text-white font-medium">1</button>
                <button className="w-10 h-10 rounded-2xl border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">2</button>
                <button className="px-4 h-10 rounded-2xl border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium flex items-center gap-1">
                  Next
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

