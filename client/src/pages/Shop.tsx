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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
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
            <button className="text-sm text-[#11248F] hover:underline mt-2">See More</button>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, price: !prev.price }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Price</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.price ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${range.value}`}
                  checked={selectedPriceRanges.includes(range.value)}
                  onCheckedChange={() => togglePriceRange(range.value)}
                  className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                />
                <Label
                  htmlFor={`price-${range.value}`}
                  className="text-sm text-[#1D2128] font-normal cursor-pointer"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Storage Capacity Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, storage: !prev.storage }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Storage Capacity</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.storage ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.storage && (
          <div className="space-y-2">
            {storageOptions.map((storage) => (
              <div key={storage.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`storage-${storage.label}`}
                    checked={selectedStorage.includes(storage.label)}
                    onCheckedChange={() => toggleStorage(storage.label)}
                    className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`storage-${storage.label}`}
                    className="text-sm text-[#1D2128] font-normal cursor-pointer"
                  >
                    {storage.label}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({storage.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processor Type Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, processor: !prev.processor }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Processor Type</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.processor ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.processor && (
          <div className="space-y-2">
            {processorTypes.map((processor) => (
              <div key={processor.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`processor-${processor.label}`}
                    checked={selectedProcessors.includes(processor.label)}
                    onCheckedChange={() => toggleProcessor(processor.label)}
                    className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`processor-${processor.label}`}
                    className="text-sm text-[#1D2128] font-normal cursor-pointer"
                  >
                    {processor.label}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({processor.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, color: !prev.color }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Color</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.color ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.color && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
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
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Customer Rating</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.rating ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating.value} className="flex items-center gap-2">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRating === rating.value}
                  onCheckedChange={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                  className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                />
                <Label
                  htmlFor={`rating-${rating.value}`}
                  className="flex items-center gap-1 text-sm text-[#1D2128] font-normal cursor-pointer"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating.value ? "fill-[#FFA500] text-[#FFA500]" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-1">{rating.label}</span>
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, size: !prev.size }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Size</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.size ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.size && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-sm border rounded-sm transition-all ${
                  selectedSizes.includes(size)
                    ? "bg-[#11248F] text-white border-[#11248F]"
                    : "bg-white text-[#1D2128] border-[#DADFE3] hover:border-[#11248F]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show Only Filter */}
      <div className="pb-4 border-b border-[#DADFE3]">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, showOnly: !prev.showOnly }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Show Only</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.showOnly ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.showOnly && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="on-sale"
                checked={onSale}
                onCheckedChange={(checked) => setOnSale(checked as boolean)}
                className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
              />
              <Label htmlFor="on-sale" className="text-sm text-[#1D2128] font-normal cursor-pointer">
                On sale
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="in-stock"
                checked={inStock}
                onCheckedChange={(checked) => setInStock(checked as boolean)}
                className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
              />
              <Label htmlFor="in-stock" className="text-sm text-[#1D2128] font-normal cursor-pointer">
                In stock
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="out-of-stock"
                checked={outOfStock}
                onCheckedChange={(checked) => setOutOfStock(checked as boolean)}
                className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
              />
              <Label htmlFor="out-of-stock" className="text-sm text-[#1D2128] font-normal cursor-pointer">
                Out of stock
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Operating System Filter */}
      <div className="pb-4">
        <button
          onClick={() => setExpandedFilters((prev) => ({ ...prev, os: !prev.os }))}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-[#1D2128]">Operating System</span>
          <ChevronDown className={`w-4 h-4 text-[#7C818B] transition-transform ${expandedFilters.os ? "rotate-180" : ""}`} />
        </button>
        {expandedFilters.os && (
          <div className="space-y-2">
            {operatingSystems.map((os) => (
              <div key={os.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`os-${os.label}`}
                    checked={selectedOS.includes(os.label)}
                    onCheckedChange={() => toggleOS(os.label)}
                    className="border-[#DADFE3] data-[state=checked]:bg-[#11248F] data-[state=checked]:border-[#11248F]"
                  />
                  <Label
                    htmlFor={`os-${os.label}`}
                    className="text-sm text-[#1D2128] font-normal cursor-pointer"
                  >
                    {os.label}
                  </Label>
                </div>
                <span className="text-xs text-[#7C818B]">({os.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ListViewProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white border border-[#DADFE3] rounded-sm p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-48 h-48 flex-shrink-0">
          {product.badge && (
            <span
              className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white rounded-sm z-10 ${
                product.badge === "sale"
                  ? "bg-[#D8125D]"
                  : product.badge === "new"
                  ? "bg-[#00A651]"
                  : "bg-[#FF6B00]"
              }`}
            >
              {product.badge === "sale" && product.oldPrice
                ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
                : product.badge.toUpperCase()}
            </span>
          )}
          {product.colors && (
            <span className="absolute bottom-2 left-2 text-xs text-[#7C818B] bg-white px-2 py-1 rounded-sm">
              {product.colors} Color
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="text-xs text-[#7C818B] mb-1">Sku: MO1927</div>
          <Link href={`/product/${product.id}`}>
            <a className="text-lg font-medium text-[#1D2128] hover:text-[#11248F] mb-2 line-clamp-2">
              {product.name}
            </a>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < product.rating
                    ? "fill-[#FFA500] text-[#FFA500]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-[#7C818B]">({product.reviewCount} Review)</span>
          </div>

          {/* Features */}
          <div className="mb-3">
            <div className="text-sm font-medium text-[#1D2128] mb-1">Features</div>
            <ul className="text-sm text-[#7C818B] space-y-1 list-disc list-inside">
              <li>5G speed. A14 Bionic, the fastest chip in a smartphone</li>
              <li>6.1-inch Super Retina XDR display2</li>
              <li>5G for superfast downloads and high-quality streaming</li>
            </ul>
          </div>

          {/* Price and Vendor */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-[#1D2128]">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-[#7C818B] line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#11248F] flex items-center justify-center text-white text-xs font-bold">
                {product.vendor[0]}
              </div>
              <span className="text-sm text-[#7C818B]">{product.vendor}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <Button
              variant="outline"
              className="flex-1 border-[#11248F] text-[#11248F] hover:bg-[#11248F] hover:text-white"
              onClick={() => toast.info("Quick View coming soon!")}
            >
              Quick View
            </Button>
            <Button
              className="flex-1 bg-[#11248F] text-white hover:bg-[#0D1A6F]"
              onClick={() => toast.success("Added to cart!")}
            >
              Add to cart
            </Button>
          </div>
        </div>

        {/* Compare and Wishlist */}
        <div className="flex flex-col gap-2">
          <button
            className="p-2 text-[#7C818B] hover:text-[#11248F] transition-colors"
            onClick={() => toast.info("Added to compare!")}
            title="Compare"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
          <button
            className="p-2 text-[#7C818B] hover:text-[#D8125D] transition-colors"
            onClick={() => toast.success("Added to wishlist!")}
            title="Wishlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
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

        {/* Shop Content */}
        <div className="container py-6">
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-sm p-4 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#1D2128]">Filters</h2>
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
              <div className="bg-white rounded-sm p-4 mb-4 flex items-center justify-between gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm text-[#1D2128] border border-[#DADFE3] rounded-sm hover:border-[#11248F]">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filter
                      {activeFiltersCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-[#11248F] text-white text-xs rounded-full">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results Count */}
                <div className="text-sm text-[#7C818B]">
                  1-16 of {allProducts.length} Results
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#7C818B] hidden sm:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] border-[#DADFE3]">
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

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center gap-1 border border-[#DADFE3] rounded-sm p-1">
                  <button
                    onClick={() => setViewMode("grid-2")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "grid-2" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="2 columns"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-3")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "grid-3" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="3 columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-4")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "grid-4" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="4 columns"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-5")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "grid-5" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="5 columns"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="3" height="3" />
                      <rect x="7" y="2" width="3" height="3" />
                      <rect x="12" y="2" width="3" height="3" />
                      <rect x="17" y="2" width="3" height="3" />
                      <rect x="2" y="7" width="3" height="3" />
                      <rect x="7" y="7" width="3" height="3" />
                      <rect x="12" y="7" width="3" height="3" />
                      <rect x="17" y="7" width="3" height="3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("grid-6")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "grid-6" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="6 columns"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="2" height="2" />
                      <rect x="6" y="2" width="2" height="2" />
                      <rect x="10" y="2" width="2" height="2" />
                      <rect x="14" y="2" width="2" height="2" />
                      <rect x="18" y="2" width="2" height="2" />
                      <rect x="2" y="6" width="2" height="2" />
                      <rect x="6" y="6" width="2" height="2" />
                      <rect x="10" y="6" width="2" height="2" />
                      <rect x="14" y="6" width="2" height="2" />
                      <rect x="18" y="6" width="2" height="2" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-sm transition-colors ${
                      viewMode === "list" ? "bg-[#11248F] text-white" : "text-[#7C818B] hover:bg-[#ECF0F4]"
                    }`}
                    title="List view"
                  >
                    <Rows3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`grid ${getGridClass()} gap-4`}>
                {allProducts.map((product) =>
                  viewMode === "list" ? (
                    <ListViewProductCard key={product.id} product={product} />
                  ) : (
                    <div key={product.id} className="bg-white rounded-sm">
                      <ProductCard product={product} />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
