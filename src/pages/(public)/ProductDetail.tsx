import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, ChevronDown, Minus, Plus, Share2, GitCompare, Facebook, Twitter, Mail, MessageCircle, ZoomIn, Headphones } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["description"]);

  // Check scroll position for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Mock product data
  const product = {
    id: params.id || "1",
    name: "Galaxy Note 10+, 256GB Aura Glow",
    price: 233.98,
    oldPrice: 267.0,
    rating: 4.0,
    reviewCount: 1,
    vendor: "Sanvo",
    vendorRating: 0,
    category: "Android Tablets",
    breadcrumb: ["Home", "Cell Phones", "Locked Cell Phones"],
    inStock: true,
    sku: "GN10-256-GLOW",
    savings: 34.0,
    savingsPercent: 12,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop",
    ],
    description:
      "The Galaxy Note 10+ combines powerful performance with a stunning design. Features include a large 6.8-inch Dynamic AMOLED display, versatile quad-camera system, and the iconic S Pen for enhanced productivity.",
    specifications: [
      { label: "Display", value: '6.8" Dynamic AMOLED (3040x1440)' },
      { label: "Processor", value: "Snapdragon 855" },
      { label: "Memory", value: "12GB RAM" },
      { label: "Storage", value: "256GB" },
      { label: "Camera", value: "12MP + 16MP + 12MP + DepthVision" },
      { label: "Battery", value: "4300mAh" },
      { label: "OS", value: "Android 9.0" },
    ],
  };

  const similarProducts: Product[] = [
    {
      id: "1",
      name: "ThinkPad X1 Carbon Gen 8 (14\") Laptop",
      price: 1648.99,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      rating: 4,
      reviewCount: 1,
      vendor: "Casual",
      category: "Laptops",
    },
    {
      id: "2",
      name: "Galaxy Tab S6 10.5 256GB WiFi Android 9.0",
      price: 226.0,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
      rating: 5,
      reviewCount: 1,
      vendor: "Sanvo",
      category: "Tablets",
    },
    {
      id: "3",
      name: "Lenovo 81JW0001US Chromebook S330, 14 HD Display",
      price: 589.9,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
      rating: 4,
      reviewCount: 1,
      vendor: "Truffles",
      category: "Laptops",
    },
    {
      id: "4",
      name: "Beats Pro Over-Ear Headphones – Black",
      price: 55.99,
      oldPrice: 72.0,
      badge: "sale",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
      rating: 5,
      reviewCount: 1,
      vendor: "TehchiStore",
      category: "Headphones",
      colors: 1,
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Worldwide Delivery",
      description: "200 countries and regions worldwide",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Pay with popular and secure payment methods",
    },
    {
      icon: RotateCcw,
      title: "60-day Return Policy",
      description: "Merchandise must be returned within 60 days",
    },
    {
      icon: Headphones,
      title: "24/7 Help Center",
      description: "We'll respond to you within 24 hours",
    },
  ];

  const handleAddToCart = () => {
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    toast.info("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#7C818B] mb-4">
          {product.breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <Link href="/">
                <a className="hover:text-[#11248F]">{crumb}</a>
              </Link>
              {index < product.breadcrumb.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ))}
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip - Hidden on mobile */}
            <div className="hidden md:flex flex-col gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-2xl overflow-hidden transition-colors ${
                    selectedImage === index
                      ? "border-[#11248F]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
              {/* Zoom Icon */}
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <ZoomIn className="h-5 w-5 text-[#7C818B]" />
              </button>
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm text-[#7C818B] shadow-sm">
                {selectedImage + 1}/{product.images.length}
              </div>
            </div>

            {/* Dots Navigation - Mobile only */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImage === index ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Category Badge */}
            <Link href={`/shop?category=${product.category}`}>
              <a className="text-sm text-[#11248F] hover:underline mb-2 inline-block">
                {product.category}
              </a>
            </Link>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#FFA500] text-[#FFA500]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm text-[#7C818B] ml-1">
                  {product.rating.toFixed(2)} ({product.reviewCount} Review{product.reviewCount !== 1 ? 's' : ''})
                </span>
              </div>
              <button className="text-sm text-[#11248F] hover:underline">
                Write a Review
              </button>
            </div>

            {/* Social Share - Desktop only */}
            <div className="hidden md:flex items-center gap-2 mb-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Facebook className="h-4 w-4 text-[#7C818B]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Twitter className="h-4 w-4 text-[#7C818B]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mail className="h-4 w-4 text-[#7C818B]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="h-4 w-4 text-[#7C818B]" />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg md:text-xl text-[#7C818B] line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.savings && (
                <div className="text-sm text-[#D8125D]">
                  Save: ${product.savings.toFixed(2)} ({product.savingsPercent}%)
                </div>
              )}
            </div>

            {/* Quantity & Stock */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-primary">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-2xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="h-10 w-16 rounded-2xl border-0 border-x border-gray-300 px-0 text-center focus-visible:ring-0"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <span className="text-sm text-[#4CAF50] font-medium">
                  Available in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-2xl font-medium hover:bg-[#0D1A6F] transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white text-primary py-3 px-6 rounded-2xl font-medium border-2 border-[#1D2128] hover:bg-[#1D2128] hover:text-white transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-6 mb-6">
              <button className="flex items-center gap-2 text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                <GitCompare className="h-5 w-5" />
                Compare
              </button>
              <button className="flex items-center gap-2 text-sm text-[#7C818B] hover:text-[#11248F] transition-colors">
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
            </div>

            {/* Store Info */}
            <div className="border border-gray-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {product.vendor.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-[#7C818B] mb-1">Store</div>
                    <Link href={`/store/${product.vendor}`}>
                      <a className="text-base font-medium text-primary hover:text-[#11248F]">
                        {product.vendor}
                      </a>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-gray-200 text-gray-200"
                        />
                      ))}
                      <span className="text-xs text-[#7C818B] ml-1">
                        {product.vendorRating} out of 5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ask a Question */}
            <button className="w-full bg-[#1D2128] text-white py-3 px-6 rounded-2xl font-medium hover:bg-[#2D3138] transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Ask a Question
            </button>
          </div>
        </div>

        {/* Tabs Section - Desktop */}
        <div className="hidden md:block mb-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent rounded-2xl h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-2xl border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-2xl border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger
                value="offers"
                className="rounded-2xl border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
              >
                More Offers
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="rounded-2xl border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
              >
                Store Policies
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="rounded-2xl border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
              >
                Inquiries
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p className="text-primary leading-relaxed">{product.description}</p>
                
                <h3 className="text-xl font-semibold text-primary mt-6 mb-4">Specifications</h3>
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 text-[#7C818B] font-medium w-1/3">{spec.label}</td>
                        <td className="py-3 text-primary">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-6">
              <div className="text-center py-12 text-[#7C818B]">
                <p>No reviews yet. Be the first to review this product!</p>
                <button className="mt-4 text-[#11248F] hover:underline">Write a Review</button>
              </div>
            </TabsContent>

            <TabsContent value="offers" className="py-6">
              <div className="text-center py-12 text-[#7C818B]">
                <p>No additional offers available for this product.</p>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-primary mb-4">Return Policy</h3>
                <p className="text-primary leading-relaxed mb-4">
                  Items can be returned within 60 days of purchase. Products must be in original condition with all packaging.
                </p>
                
                <h3 className="text-xl font-semibold text-primary mb-4">Shipping Policy</h3>
                <p className="text-primary leading-relaxed">
                  Free shipping on orders over $99. Standard delivery takes 3-5 business days.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="inquiries" className="py-6">
              <div className="text-center py-12 text-[#7C818B]">
                <p>Have a question? Click "Ask a Question" button above to contact the seller.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Accordion Section - Mobile */}
        <div className="md:hidden mb-12 space-y-4">
          {/* Description */}
          <Collapsible
            open={openSections.includes("description")}
            onOpenChange={() => toggleSection("description")}
            className="border border-gray-200 rounded-2xl"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="font-semibold text-primary">Description</span>
              <ChevronDown
                className={`h-5 w-5 text-[#7C818B] transition-transform ${
                  openSections.includes("description") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-primary leading-relaxed mb-4">{product.description}</p>
              <h4 className="font-semibold text-primary mb-2">Specifications</h4>
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 text-sm text-[#7C818B] font-medium">{spec.label}</td>
                      <td className="py-2 text-sm text-primary">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CollapsibleContent>
          </Collapsible>

          {/* Reviews */}
          <Collapsible
            open={openSections.includes("reviews")}
            onOpenChange={() => toggleSection("reviews")}
            className="border border-gray-200 rounded-2xl"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="font-semibold text-primary">Reviews ({product.reviewCount})</span>
              <ChevronDown
                className={`h-5 w-5 text-[#7C818B] transition-transform ${
                  openSections.includes("reviews") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="text-center py-6 text-[#7C818B]">
                <p className="text-sm">No reviews yet. Be the first to review this product!</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* More Offers */}
          <Collapsible
            open={openSections.includes("offers")}
            onOpenChange={() => toggleSection("offers")}
            className="border border-gray-200 rounded-2xl"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="font-semibold text-primary">More Offers</span>
              <ChevronDown
                className={`h-5 w-5 text-[#7C818B] transition-transform ${
                  openSections.includes("offers") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="text-center py-6 text-[#7C818B]">
                <p className="text-sm">No additional offers available for this product.</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Store Policies */}
          <Collapsible
            open={openSections.includes("policies")}
            onOpenChange={() => toggleSection("policies")}
            className="border border-gray-200 rounded-2xl"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="font-semibold text-primary">Store Policies</span>
              <ChevronDown
                className={`h-5 w-5 text-[#7C818B] transition-transform ${
                  openSections.includes("policies") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <h4 className="font-semibold text-primary mb-2">Return Policy</h4>
              <p className="text-sm text-primary leading-relaxed mb-3">
                Items can be returned within 60 days of purchase. Products must be in original condition with all packaging.
              </p>
              <h4 className="font-semibold text-primary mb-2">Shipping Policy</h4>
              <p className="text-sm text-primary leading-relaxed">
                Free shipping on orders over $99. Standard delivery takes 3-5 business days.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* Inquiries */}
          <Collapsible
            open={openSections.includes("inquiries")}
            onOpenChange={() => toggleSection("inquiries")}
            className="border border-gray-200 rounded-2xl"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="font-semibold text-primary">Inquiries</span>
              <ChevronDown
                className={`h-5 w-5 text-[#7C818B] transition-transform ${
                  openSections.includes("inquiries") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="text-center py-6 text-[#7C818B]">
                <p className="text-sm">Have a question? Click "Ask a Question" button above to contact the seller.</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Similar Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-t border-gray-200">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 flex items-center justify-center">
                  <Icon className="h-8 w-8 md:h-12 md:w-12 text-[#7C818B]" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-primary mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm text-[#7C818B]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sticky Mobile Add to Cart Bar */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 animate-in slide-in-from-bottom">
          <div className="container py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>
                {product.oldPrice && (
                  <div className="text-sm text-[#7C818B] line-through">
                    ${product.oldPrice.toFixed(2)}
                  </div>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-2xl font-medium hover:bg-[#0D1A6F] transition-colors"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
