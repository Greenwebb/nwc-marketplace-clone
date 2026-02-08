import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  ChevronDown, 
  MessageSquare, 
  ExternalLink,
  SlidersHorizontal,
  X
} from "lucide-react";

// Mock vendors data
const MOCK_VENDORS = [
  {
    id: "v1",
    name: "Tech Haven",
    email: "contact@techhaven.com",
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    logo: "TH",
    category: "Electronics",
    location: "Silicon Valley, CA",
    featured: true
  },
  {
    id: "v2",
    name: "Zone Shop",
    email: "info@zoneshop.com",
    rating: 4.5,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    logo: "ZS",
    category: "Gadgets",
    location: "New York, NY",
    featured: false
  },
  {
    id: "v3",
    name: "Truffles",
    email: "truffles_wcfm@gmail.com",
    rating: 4.2,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
    logo: "TR",
    category: "Luxury",
    location: "London, UK",
    featured: true
  },
  {
    id: "v4",
    name: "TehchiStore",
    email: "support@tehchi.com",
    rating: 4.6,
    reviewCount: 210,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    logo: "TS",
    category: "Computing",
    location: "Tokyo, JP",
    featured: false
  },
  {
    id: "v5",
    name: "Sanvo",
    email: "hello@sanvo.com",
    rating: 4.4,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80",
    logo: "SV",
    category: "Lifestyle",
    location: "Berlin, DE",
    featured: false
  },
  {
    id: "v6",
    name: "Casual",
    email: "shop@casual.com",
    rating: 4.0,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=800&q=80",
    logo: "CS",
    category: "Fashion",
    location: "Paris, FR",
    featured: false
  }
];

const CATEGORIES = [
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

export default function StoreListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Header />
      
      <main>
        {/* Map Section */}
        <div className="w-full h-[400px] bg-[#E5E7EB] relative overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')] bg-cover bg-center opacity-80"></div>
          
          {/* Map Controls Mock */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded shadow-md flex items-center justify-center text-xl font-bold hover:bg-gray-50">+</button>
            <button className="w-10 h-10 bg-white rounded shadow-md flex items-center justify-center text-xl font-bold hover:bg-gray-50">−</button>
          </div>
          
          {/* Map Overlay Info */}
          <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded text-[10px] text-gray-600 shadow-sm">
            Leaflet | © OpenStreetMap contributors
          </div>
        </div>

        <div className="container py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#7C818B] mb-8">
            <Link href="/" className="hover:text-[#11248F]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1D2128] font-medium">Store Listing</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-[300px] flex-shrink-0 space-y-8">
              {/* Search Store */}
              <div className="bg-white p-6 rounded-lg border border-[#DADFE3] shadow-sm">
                <h3 className="text-lg font-bold text-[#1D2128] mb-4">Search Store</h3>
                <div className="relative">
                  <Input 
                    placeholder="Search store..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-[#DADFE3] focus:border-[#11248F] focus:ring-[#11248F]"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7C818B]" />
                </div>
              </div>

              {/* Filter by Category */}
              <div className="bg-white p-6 rounded-lg border border-[#DADFE3] shadow-sm">
                <h3 className="text-lg font-bold text-[#1D2128] mb-4">Search by Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full border-[#DADFE3]">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter by Location */}
              <div className="bg-white p-6 rounded-lg border border-[#DADFE3] shadow-sm">
                <h3 className="text-lg font-bold text-[#1D2128] mb-4">Search by Location</h3>
                <div className="space-y-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full border-[#DADFE3]">
                      <SelectValue placeholder="Choose Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="Search by City" className="border-[#DADFE3]" />
                  <Input placeholder="Search by ZIP" className="border-[#DADFE3]" />
                </div>
              </div>

              {/* Radius Search */}
              <div className="bg-white p-6 rounded-lg border border-[#DADFE3] shadow-sm">
                <h3 className="text-lg font-bold text-[#1D2128] mb-4">Search by Radius</h3>
                <div className="space-y-4">
                  <Input placeholder="Insert your address..." className="border-[#DADFE3]" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#7C818B]">
                      <span>Radius:</span>
                      <span className="font-medium text-[#1D2128]">10 km</span>
                    </div>
                    <input type="range" className="w-full accent-[#11248F]" min="1" max="100" defaultValue="10" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white p-4 rounded-lg border border-[#DADFE3] shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-[#7C818B]">
                  Showing 1–6 of 185 results
                </div>
                
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[220px] border-[#DADFE3]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Sort by newness: old to new</SelectItem>
                      <SelectItem value="newest-desc">Sort by newness: new to old</SelectItem>
                      <SelectItem value="rating">Sort by average rating</SelectItem>
                      <SelectItem value="alpha">Sort Alphabetical: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Store Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_VENDORS.map((vendor) => (
                  <div key={vendor.id} className="bg-white rounded-lg overflow-hidden border border-[#DADFE3] shadow-sm hover:shadow-md transition-shadow group">
                    {/* Store Banner */}
                    <div className="h-40 relative overflow-hidden">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {vendor.featured && (
                        <div className="absolute top-3 left-3 bg-[#FFA132] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Store Info */}
                    <div className="p-6 pt-12 relative">
                      {/* Store Logo Overlay */}
                      <div className="absolute -top-10 left-6 w-20 h-20 rounded-full bg-white p-1 shadow-md border border-gray-100">
                        <div className="w-full h-full rounded-full bg-[#1D2128] flex items-center justify-center text-white font-bold text-xl">
                          {vendor.logo}
                        </div>
                      </div>

                      <div className="mb-4">
                        <Link href={`/store/vendor/${vendor.id}`}>
                          <a className="text-xl font-bold text-[#1D2128] hover:text-[#11248F] transition-colors">
                            {vendor.name}
                          </a>
                        </Link>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(vendor.rating) ? "fill-[#FFA500] text-[#FFA500]" : "fill-gray-200 text-gray-200"}`} 
                            />
                          ))}
                          <span className="text-xs text-[#7C818B] ml-1">({vendor.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-[#7C818B] mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{vendor.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="flex-1 border-[#11248F] text-[#11248F] hover:bg-[#11248F] hover:text-white gap-2 h-11">
                          <MessageSquare className="h-4 w-4" />
                          Inquiry
                        </Button>
                        <Link href={`/store/vendor/${vendor.id}`} className="flex-1">
                          <Button className="w-full bg-[#1D2128] hover:bg-black text-white gap-2 h-11">
                            <ExternalLink className="h-4 w-4" />
                            Visit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#7C818B] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">«</button>
                  <button className="w-10 h-10 rounded-md border border-[#11248F] bg-[#11248F] text-white font-medium">1</button>
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">2</button>
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">3</button>
                  <span className="px-2 text-[#7C818B]">...</span>
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">30</button>
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#1D2128] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">31</button>
                  <button className="w-10 h-10 rounded-md border border-[#DADFE3] bg-white text-[#7C818B] hover:border-[#11248F] hover:text-[#11248F] transition-colors font-medium">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
