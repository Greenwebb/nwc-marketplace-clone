import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  Youtube,
} from "lucide-react";
import { vendorProducts, vendorStores } from "./vendorStoreData";

type Params = {
  id?: string;
};

type StoreTab = "products" | "about" | "policies" | "reviews";

const categoryOptions = [
  "TVs & Video",
  "Laptops & Computers",
  "iPads & Tablets",
  "Cell Phones",
  "Printer & Supplies",
  "Headphones",
  "Networking",
  "Wearable Technology",
  "Smart Home",
  "Cameras",
];

const storeHours = [
  { day: "Monday", time: "8:00 am - 5:00 pm" },
  { day: "Tuesday", time: "8:00 am - 5:00 pm" },
  { day: "Wednesday", time: "8:00 am - 5:00 pm" },
  { day: "Thursday", time: "8:00 am - 5:00 pm" },
  { day: "Friday", time: "8:00 am - 5:00 pm" },
  { day: "Saturday", time: "8:00 am - 5:00 pm" },
];

const recentProducts = [
  {
    name: "ZenBook Pro Duo UX581 15.6 4K UHD NanoEdge",
    rating: 5,
    price: "$472.00",
    oldPrice: "$516.00",
  },
  {
    name: "Lenovo 81JW0001US Chromebook S330, 14 HD Display",
    rating: 2,
    price: "$589.90",
  },
  {
    name: "Google Pixel 4 Black 64 GB",
    rating: 5,
    price: "$279.99",
  },
  {
    name: "G8 ThinQ 128GB Smartphone - 6.1 OLED QHD",
    rating: 3,
    price: "$809.78",
  },
  {
    name: "Surface Laptop Go, 12.4 Touchscreen Core i5 Ice Blue",
    rating: 5,
    price: "$561.00",
    oldPrice: "$699.99",
  },
];

export default function VendorStorefront() {
  const { id } = useParams<Params>();
  const store = vendorStores.find((item) => item.id === id);

  const [activeTab, setActiveTab] = useState<StoreTab>("products");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [currentPage, setCurrentPage] = useState(1);

  if (!store) {
    return (
      <div className="min-h-screen bg-[#fff]">
        <Header />
        <main className="container py-10">
          <h1 className="text-2xl font-bold text-primary">Store not found</h1>
          <p className="mt-2 text-sm text-[#7C818B]">The storefront you requested does not exist.</p>
          <Link href="/store-listing">
            <a className="mt-4 inline-flex rounded-2xl bg-primary px-5 py-2 text-sm font-medium text-white">
              Back to Store Listing
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const rawProducts = vendorProducts.filter((product) => product.vendorId === store.id).slice(0, 12);
  const storefrontProducts: Product[] = rawProducts.map((product, index) => ({
    id: product.id,
    name: product.name,
    category: categoryOptions[index % categoryOptions.length],
    price: product.price,
    image: product.image,
    vendor: store.name,
    rating: store.rating,
    reviewCount: store.reviews,
    inStock: product.stock > 0,
  }));

  const filteredProducts = useMemo(() => {
    return storefrontProducts.filter((product) => {
      const searchMatch =
        searchTerm.trim().length === 0 ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const stockMatch = !inStockOnly || product.inStock;
      const priceMatch = product.price <= maxPrice;

      return searchMatch && categoryMatch && stockMatch && priceMatch;
    });
  }, [inStockOnly, maxPrice, searchTerm, selectedCategories, storefrontProducts]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [filteredProducts, sortBy]);

  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, sortedProducts.length);
  const visibleProducts = sortedProducts.slice(start, end);

  const contactEmail = `${store.slug.replace(/-/g, "_")}@gmail.com`;
  const contactPhone = `4444-333-${(300 + store.productsCount).toString().slice(-3)}`;
  const contactAddress = `${store.location}, Great East Road, Zambia`;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((value) => value !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setInStockOnly(false);
    setMaxPrice(1200);
    setSortBy("default");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      <Header />
      <main className="container py-6">
        <section className="mb-8">
          <div className="mb-5 flex items-center gap-2 text-sm text-[#7C818B]">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/store-listing">
              <a className="hover:text-primary">Store</a>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{store.name}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-primary">Products</span>
          </div>

          <div className="overflow-hidden rounded-sm border border-[#DADFE3] bg-[#f2f2f2] shadow-sm">
            <div className="relative h-[300px] md:h-[430px]">
              <img src={store.banner} alt={store.name} className="h-full w-full object-cover" />
            </div>

            <div className="relative grid gap-6 px-6 pb-5 pt-8 lg:grid-cols-[220px_minmax(0,1fr)_auto]">
              <div className="absolute -top-16 left-10 h-32 w-32 rounded-full bg-black p-2 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                  <span className="text-5xl font-bold text-white">
                    {store.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block" />

              <div>
                <h1 className="text-6xl font-bold text-primary">{store.name}</h1>
                <div className="mt-2 flex items-center gap-1 text-[#C6CCD4]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${store.id}-profile-star-${index}`} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <div className="mt-3 grid gap-2 text-3xl text-[#5E6775] lg:grid-cols-2">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-1 h-5 w-5" />
                    {contactAddress}
                  </p>
                  <div>
                    <p className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {contactPhone}
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {contactEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 justify-self-end lg:items-end">
                <button className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-2xl bg-[#1f2937] px-6 text-3xl font-semibold text-white hover:bg-[#111827]">
                  <CircleHelp className="h-4 w-4" />
                  Inquiry
                </button>
                <div className="flex items-center gap-5 text-[#2A84CC]">
                  <a href="#" aria-label="Facebook" className="hover:text-primary">
                    <Facebook className="h-7 w-7" />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-primary">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                      <path d="M18.244 2H21l-6.55 7.49L22 22h-6.06l-4.75-6.2L5.77 22H3l7.01-8L2 2h6.21l4.3 5.67L18.24 2Z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                    <Linkedin className="h-7 w-7" />
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:text-primary">
                    <Instagram className="h-7 w-7" />
                  </a>
                  <a href="#" aria-label="Youtube" className="hover:text-primary">
                    <Youtube className="h-7 w-7 text-red-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside>
            {activeTab === "products" ? (
              <>
              <div className="border-b border-[#DADFE3] pb-8">
                <p className="text-4xl font-semibold text-primary">Product Search</p>
                <label className="mt-4 block text-base text-[#7C818B]">Search for:</label>
                <div className="relative mt-3">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#7C818B]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search products..."
                    className="h-14 w-full rounded-sm border border-[#DADFE3] pl-14 pr-4 text-sm text-primary outline-none focus:border-[#172a9c]"
                  />
                </div>
              </div>

              <div className="mt-8 border-b border-[#DADFE3] pb-6">
                <p className="text-[38px] font-semibold text-primary">Store Categories</p>
                <div className="mt-4 space-y-4 text-[34px] text-[#5E6775]">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`block text-left transition-colors ${
                        selectedCategories.includes(category)
                          ? "font-semibold text-primary"
                          : "hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-b border-[#ECF0F4] pb-4">
                <p className="text-2xl font-semibold text-primary">Store Hours</p>
                <div className="mt-2 space-y-1 text-sm text-[#5E6775]">
                  {storeHours.map((item) => (
                    <p key={item.day}>
                      <span className="font-medium text-primary">{item.day}:</span> {item.time}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-b border-[#ECF0F4] pb-4">
                <p className="text-2xl font-semibold text-primary">Top Rated Vendors</p>
                <div className="mt-2 space-y-2 text-sm text-primary">
                  <p className="text-[#5E6775]">Si Dong Fei Dong</p>
                  {vendorStores
                    .slice()
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 4)
                    .map((vendor) => (
                      <p key={vendor.id} className="flex items-center justify-between">
                        <span>{vendor.name}</span>
                        <span className="text-xs text-[#7C818B]">{vendor.rating.toFixed(1)}</span>
                      </p>
                    ))}
                </div>
              </div>

              <div className="mt-4 border-b border-[#ECF0F4] pb-4">
                <p className="text-2xl font-semibold text-primary">Recent Products</p>
                <div className="mt-3 space-y-3">
                  {recentProducts.map((item) => (
                    <div key={item.name} className="text-xs">
                      <p className="line-clamp-2 font-medium text-primary">{item.name}</p>
                      <p className="mt-1 text-[#5E6775]">Rated {item.rating.toFixed(2)} out of 5</p>
                      <p className="mt-1 text-primary">
                        {item.oldPrice && (
                          <span className="mr-1 text-[#7C818B] line-through">{item.oldPrice}</span>
                        )}
                        <span className="font-semibold">{item.price}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-b border-[#ECF0F4] pb-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-primary">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) => {
                      setInStockOnly(event.target.checked);
                      setCurrentPage(1);
                    }}
                    className="h-4 w-4"
                  />
                  In stock only
                </label>
              </div>

              <div className="mt-4 pb-4">
                <p className="text-sm font-semibold text-primary">Max price: ${maxPrice}</p>
                <input
                  type="range"
                  min={50}
                  max={1200}
                  step={10}
                  value={maxPrice}
                  onChange={(event) => {
                    setMaxPrice(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                  className="mt-2 w-full"
                />
              </div>
              </>
            ) : (
              <div />
            )}
          </aside>

          <div>
            <div className="border-b border-[#DADFE3]">
              <div className="flex flex-wrap items-end gap-8 md:gap-16">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`pb-4 text-4xl font-semibold transition-colors ${
                    activeTab === "products"
                      ? "border-b-2 border-[#1f2937] text-primary"
                      : "text-[#8A92A0] hover:text-primary"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`pb-4 text-4xl font-semibold transition-colors ${
                    activeTab === "about"
                      ? "border-b-2 border-[#1f2937] text-primary"
                      : "text-[#8A92A0] hover:text-primary"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`pb-4 text-4xl font-semibold transition-colors ${
                    activeTab === "policies"
                      ? "border-b-2 border-[#1f2937] text-primary"
                      : "text-[#8A92A0] hover:text-primary"
                  }`}
                >
                  Policies
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 text-4xl font-semibold transition-colors ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#1f2937] text-primary"
                      : "text-[#8A92A0] hover:text-primary"
                  }`}
                >
                  Reviews (0)
                </button>
              </div>
            </div>

            {activeTab === "products" && (
              <div className="mt-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-14 min-w-[300px] rounded-sm border border-[#DADFE3] bg-white px-4 text-sm font-medium text-primary"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>

                  <div className="flex items-center gap-4">
                    <button onClick={resetFilters} className="text-sm text-[#172a9c] hover:underline">
                      Reset Filters
                    </button>
                    <p className="text-sm text-primary">
                      Showing {sortedProducts.length === 0 ? 0 : start + 1}-{end} of {sortedProducts.length} results
                    </p>
                  </div>
                </div>

                {visibleProducts.length === 0 ? (
                  <div className="rounded-2xl border border-[#DADFE3] bg-white p-8 text-sm text-[#7C818B]">
                    No products found with current filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={safePage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-[#DADFE3] px-3 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>

                  <button
                    disabled={safePage === totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-[#DADFE3] px-3 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="mt-6 rounded-2xl border border-[#DADFE3] bg-white p-6">
                <h3 className="text-lg font-semibold text-primary">About {store.name}</h3>
                <p className="mt-3 text-sm text-[#7C818B]">{store.description}</p>
                <p className="mt-3 text-sm text-[#7C818B]">
                  We are focused on quality products, trusted support, and reliable delivery.
                </p>
              </div>
            )}

            {activeTab === "policies" && (
              <div className="mt-6 rounded-2xl border border-[#DADFE3] bg-white p-6">
                <h3 className="text-lg font-semibold text-primary">Store Policies</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#7C818B]">
                  <li>Orders are processed within 1-2 business days.</li>
                  <li>Returns are accepted within 14 days for eligible items.</li>
                  <li>Warranty and support vary by product type.</li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="mt-6 rounded-2xl border border-[#DADFE3] bg-white p-6 text-sm text-[#7C818B]">
                No reviews yet for this storefront.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
