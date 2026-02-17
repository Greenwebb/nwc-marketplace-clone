import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronDown, SlidersHorizontal, X, Grid3X3, Grid2X2, LayoutGrid, Rows3, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

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
  { name: "Appliances", count: 4 },
  { name: "Cameras", count: 5 },
  { name: "Cell Phones", count: 27 },
  { name: "Headphones", count: 10 },
  { name: "iPads & Tablets", count: 20 },
  { name: "Laptops & Computers", count: 30 },
];

const priceRanges = [
  { label: "0 - $100.00", value: "0-100" },
  { label: "$100.00 - $200.00", value: "100-200" },
  { label: "$250.00+", value: "250+" },
];

const storageOptions = [
  { label: "1TB HDD Storage", count: 3 },
  { label: "256 GB", count: 12 },
  { label: "512 GB", count: 8 },
];

const processorTypes = [
  { label: "AMD Ryzen 5", count: 4 },
  { label: "Intel Core i5", count: 12 },
  { label: "Intel Core i7", count: 8 },
  { label: "Intel Core i9", count: 5 },
];

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Blue", hex: "#4A90E2" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Gray", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },
];

const ratings = [
  { label: "5 stars", value: 5 },
  { label: "4-5 stars", value: 4 },
  { label: "3-5 stars", value: 3 },
  { label: "2-5 stars", value: 2 },
  { label: "1-5 stars", value: 1 },
];

const sizes = ["XS", "S", "M", "L", "XL", "Large", "Small"];

const operatingSystems = [
  { label: "iOS", count: 15 },
  { label: "macOS", count: 8 },
  { label: "Windows", count: 22 },
];

type ViewMode = "grid-2" | "grid-3" | "grid-4" | "grid-5" | "grid-6" | "list";

export default function Shop() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    storage: false,
    processor: false,
    color: false,
    rating: false,
    size: false,
    showOnly: false,
    os: false,
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleStorage = (storage: string) => {
    setSelectedStorage((prev) =>
      prev.includes(storage) ? prev.filter((s) => s !== storage) : [...prev, storage]
    );
  };

  const toggleProcessor = (processor: string) => {
    setSelectedProcessors((prev) =>
      prev.includes(processor) ? prev.filter((p) => p !== processor) : [...prev, processor]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleOS = (os: string) => {
    setSelectedOS((prev) =>
      prev.includes(os) ? prev.filter((o) => o !== os) : [...prev, os]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedStorage([]);
    setSelectedProcessors([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setSelectedSizes([]);
    setSelectedOS([]);
    setOnSale(false);
    setInStock(false);
    setOutOfStock(false);
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedPriceRanges.length +
    selectedStorage.length +
    selectedProcessors.length +
    selectedColors.length +
    (selectedRating ? 1 : 0) +
    selectedSizes.length +
    selectedOS.length +
    (onSale ? 1 : 0) +
    (inStock ? 1 : 0) +
    (outOfStock ? 1 : 0);

  const getGridClass = () => {
    switch (viewMode) {
      case "grid-2":
        return "grid-cols-1 md:grid-cols-2";
      case "grid-3":
        return "grid-cols-2 md:grid-cols-3";
      case "grid-4":
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case "grid-5":
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      case "grid-6":
        return "grid-cols-2 md:grid-cols-4 lg:grid-cols-6";
      case "list":
        return "grid-cols-1";
      default:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="pb-4 border-b border-[#DADFE3]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">Active Filters ({activeFiltersCount})</span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#11248F] hover:underline min-h-[44px] px-3"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-3 py-2 bg-[#fff] text-xs text-primary rounded-full"
              >
                {cat}
                <button onClick={() => toggleCategory(cat)} className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, categories: !prev.categories }))}
          className="flex items-center justify-between w-full mb-3 min-h-[44px]"
        >
          <span className="text-sm font-semibold text-primary">Categories</span>
          <ChevronDown className={`w-5 h-5 text-[#7C818B] transition-transform ${expandedFilters.categories ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between min-h-[44px]">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`cat-${category.name}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                    className="w-5 h-5 border-[#DADFE3] data-[state=checked]:bg-primary data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`cat-${category.name}`}
                    className="text-sm text-primary font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({category.count})</span>
              </div>
            ))}
            <button className="text-sm text-[#11248F] hover:underline mt-2 min-h-[44px]">See More</button>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, price: !prev.price }))}
          className="flex items-center justify-between w-full mb-3 min-h-[44px]"
        >
          <span className="text-sm font-semibold text-primary">Price</span>
          <ChevronDown className={`w-5 h-5 text-[#7C818B] transition-transform ${expandedFilters.price ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.price && (
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center gap-3 min-h-[44px]">
                <Checkbox
                  id={`price-${range.value}`}
                  checked={selectedPriceRanges.includes(range.value)}
                  onCheckedChange={() => togglePriceRange(range.value)}
                  className="w-5 h-5 border-[#DADFE3] data-[state=checked]:bg-primary data-[state=checked]:border-[#11248F]"
                />
                <Label
                  htmlFor={`price-${range.value}`}
                  className="text-sm text-primary font-normal cursor-pointer"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, color: !prev.color }))}
          className="flex items-center justify-between w-full mb-3 min-h-[44px]"
        >
          <span className="text-sm font-semibold text-primary">Color</span>
          <ChevronDown className={`w-5 h-5 text-[#7C818B] transition-transform ${expandedFilters.color ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.color && (
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.name)
                    ? "border-[#11248F] ring-2 ring-[#11248F] ring-offset-2"
                    : "border-[#DADFE3]"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Customer Rating Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, rating: !prev.rating }))}
          className="flex items-center justify-between w-full mb-3 min-h-[44px]"
        >
          <span className="text-sm font-semibold text-primary">Customer Rating</span>
          <ChevronDown className={`w-5 h-5 text-[#7C818B] transition-transform ${expandedFilters.rating ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.rating && (
          <div className="space-y-3">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setSelectedRating(rating.value)}
                className={`flex items-center gap-2 w-full min-h-[44px] px-3 py-2 rounded-2xl  transition-colors ${
                  selectedRating === rating.value ? "bg-[#fff]" : "hover:bg-[#F5F7FA]"
                }`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating.value
                        ? "fill-[#FFA500] text-[#FFA500]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm text-[#7C818B]">& up</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fff]">
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Breadcrumb - Hidden on mobile for cleaner app-like experience */}
        <div className="hidden md:block bg-white border-b border-[#DADFE3]">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-[#7C818B] hover:text-[#11248F]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <span className="text-primary font-medium">Shop</span>
            </div>
          </div>
        </div>

        {/* Shop Content */}
        <div className="container py-4 lg:py-6">
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl  p-4 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#11248F] hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl  p-3 lg:p-4 mb-4 flex items-center justify-between gap-2 lg:gap-4">
                {/* Results Count */}
                <div className="text-sm text-[#7C818B] hidden sm:block">
                  1-16 of {allProducts.length} Results
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-[#7C818B] hidden lg:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px] lg:w-[140px] border-[#DADFE3] h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Default</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle - Desktop only */}
                <div className="hidden lg:flex items-center gap-1 border border-[#DADFE3] rounded-2xl  p-1">
                  <button
                    onClick={() => setViewMode("grid-2")}
                    className={`p-2 rounded-2xl  transition-colors ${
                      viewMode === "grid-2" ? "bg-primary text-white" : "text-[#7C818B] hover:bg-[#fff]"
                    }`}
                    title="2 columns"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-3")}
                    className={`p-2 rounded-2xl  transition-colors ${
                      viewMode === "grid-3" ? "bg-primary text-white" : "text-[#7C818B] hover:bg-[#fff]"
                    }`}
                    title="3 columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-4")}
                    className={`p-2 rounded-2xl  transition-colors ${
                      viewMode === "grid-4" ? "bg-primary text-white" : "text-[#7C818B] hover:bg-[#fff]"
                    }`}
                    title="4 columns"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className={`grid ${getGridClass()} gap-4`}>
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Button - Sticky at bottom, app-like */}
      <div className="fixed bottom-20 left-0 right-0 lg:hidden z-40 px-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full bg-primary text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform min-h-[56px]"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-3 py-1 bg-white text-[#11248F] text-sm font-bold rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Dialog - Bottom sheet style */}
      <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <DialogContent className="lg:hidden max-w-full h-[85vh] p-0 bottom-0 top-auto translate-y-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom rounded-t-3xl">
          <DialogHeader className="px-6 py-4 border-b border-[#DADFE3]">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#11248F] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </DialogHeader>
          <div className="overflow-y-auto px-6 py-4 flex-1">
            <FilterPanel />
          </div>
          <div className="px-6 py-4 border-t border-[#DADFE3] bg-white">
            <Button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-primary text-white hover:bg-[#0D1A6F] rounded-full py-6 text-base font-medium"
            >
              Show Results ({allProducts.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
