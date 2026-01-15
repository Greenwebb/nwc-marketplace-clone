import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronDown, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Mock products data with realistic images
const productImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
];

const productNames = [
  "X509JB-EJ018 Intel Core i5 1035G1 4GB 256GB SSD MX110",
  "Powerbeats Pro – Totally Wireless Earphones – Ivory",
  "Apple – iPhone 11 64GB – Space Gray",
  "MacBook Air 13-inch, 8GB RAM 256GB SSD Storage",
  "Galaxy 13.3 Book S, 256GB, Mercury Gray",
  "Galaxy Watch Active 2 Aluminum Smart Watch",
  "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
  "Canon EOS R6 Full-Frame Mirrorless Camera",
];

const allProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: productNames[i % productNames.length],
  price: [326, 249, 699, 999, 849, 249, 348, 2499][i % 8],
  oldPrice: i % 3 === 0 ? [399, 299, 799, 1199, 999, 299, 399, 2799][i % 8] : undefined,
  image: productImages[i % productImages.length],
  rating: Math.floor(Math.random() * 2) + 4,
  reviewCount: Math.floor(Math.random() * 50) + 1,
  vendor: ["Zone Shop", "Casual", "TehchiStore", "Sanvo", "Truffles"][i % 5],
  category: ["Laptops", "Headphones", "Cell Phones", "Tablets", "Accessories"][i % 5],
  badge: i % 4 === 0 ? "sale" : i % 5 === 0 ? "new" : i % 7 === 0 ? "hot" : undefined,
}));

const categories = [
  { name: "Laptops & Computers", count: 45 },
  { name: "Headphones", count: 32 },
  { name: "Cell Phones", count: 28 },
  { name: "Tablets", count: 19 },
  { name: "Accessories", count: 67 },
  { name: "Cameras", count: 23 },
  { name: "TVs & Video", count: 15 },
  { name: "Wearable Tech", count: 21 },
];

const brands = [
  { name: "Apple", count: 34 },
  { name: "Samsung", count: 28 },
  { name: "Sony", count: 19 },
  { name: "LG", count: 15 },
  { name: "Dell", count: 12 },
  { name: "HP", count: 18 },
  { name: "Lenovo", count: 14 },
  { name: "Microsoft", count: 9 },
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    brands: true,
    price: true,
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 3000 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="pb-4 border-b border-[#DADFE3]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#1D2128]">Active Filters ({activeFiltersCount})</span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#11248F] hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#ECF0F4] text-xs text-[#1D2128] rounded-sm"
              >
                {cat}
                <button onClick={() => toggleCategory(cat)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedBrands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#ECF0F4] text-xs text-[#1D2128] rounded-sm"
              >
                {brand}
                <button onClick={() => toggleBrand(brand)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="border-b border-[#DADFE3] pb-4">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, categories: !prev.categories }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Categories</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.categories ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${category.name}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                    className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`cat-${category.name}`}
                    className="text-sm text-[#1D2128] font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({category.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-[#DADFE3] pb-4">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, price: !prev.price }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Price Range</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.price ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.price && (
          <div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={3000}
              step={50}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#7C818B]">$</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-16 h-8 px-2 text-sm text-[#1D2128] border border-[#DADFE3] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#11248F]"
                />
              </div>
              <span className="text-[#7C818B]">—</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#7C818B]">$</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-16 h-8 px-2 text-sm text-[#1D2128] border border-[#DADFE3] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#11248F]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="pb-4">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, brands: !prev.brands }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Brands</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.brands ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.brands && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                    className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="text-sm text-[#1D2128] font-normal cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({brand.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#ECF0F4]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#DADFE3]">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <a className="text-[#7C818B] hover:text-[#11248F]">Home</a>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <span className="text-[#1D2128] font-medium">Shop</span>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-[260px] flex-shrink-0">
              <div className="bg-white rounded-sm p-4 sticky top-[120px]">
                <h2 className="text-base font-semibold text-[#1D2128] mb-4 pb-3 border-b border-[#DADFE3]">
                  Filters
                </h2>
                <FilterPanel />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-sm p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="lg:hidden flex items-center gap-2 h-10 px-4 border border-[#DADFE3] rounded-sm text-sm text-[#1D2128] hover:bg-[#ECF0F4] transition-colors">
                          <SlidersHorizontal className="h-4 w-4" />
                          Filters
                          {activeFiltersCount > 0 && (
                            <span className="ml-1 w-5 h-5 bg-[#11248F] text-white text-xs rounded-full flex items-center justify-center">
                              {activeFiltersCount}
                            </span>
                          )}
                        </button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] p-0">
                        <SheetHeader className="p-4 border-b border-[#DADFE3]">
                          <SheetTitle className="text-[#1D2128]">Filters</SheetTitle>
                        </SheetHeader>
                        <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                          <FilterPanel />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <span className="text-sm text-[#7C818B]">
                      Showing <span className="text-[#1D2128] font-medium">{allProducts.length}</span> products
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="hidden md:flex items-center border border-[#DADFE3] rounded-sm overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${viewMode === "grid" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"}`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${viewMode === "list" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] h-10 border-[#DADFE3] text-sm">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="bestselling">Best Selling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {allProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-sm">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="h-10 px-4 border border-[#DADFE3] rounded-sm text-sm text-[#7C818B] hover:bg-white transition-colors disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="h-10 w-10 bg-[#11248F] text-white rounded-sm text-sm font-medium">
                  1
                </button>
                <button className="h-10 w-10 border border-[#DADFE3] rounded-sm text-sm text-[#1D2128] hover:bg-white transition-colors">
                  2
                </button>
                <button className="h-10 w-10 border border-[#DADFE3] rounded-sm text-sm text-[#1D2128] hover:bg-white transition-colors">
                  3
                </button>
                <span className="text-[#7C818B]">...</span>
                <button className="h-10 w-10 border border-[#DADFE3] rounded-sm text-sm text-[#1D2128] hover:bg-white transition-colors">
                  12
                </button>
                <button className="h-10 px-4 border border-[#DADFE3] rounded-sm text-sm text-[#1D2128] hover:bg-white transition-colors">
                  Next
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
