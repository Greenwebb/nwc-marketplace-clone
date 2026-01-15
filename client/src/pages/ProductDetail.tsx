import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus, Share2, GitCompare, Facebook, Twitter, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Check scroll position for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const similarProducts = [
    {
      id: 1,
      name: "ThinkPad X1 Carbon Gen 8 (14\") Laptop",
      price: 1648.99,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      rating: 4,
      reviewCount: 1,
      vendor: "Casual",
    },
    {
      id: 2,
      name: "Galaxy Tab S6 10.5 256GB WiFi Android 9.0",
      price: 226.0,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
      rating: 5,
      reviewCount: 1,
      vendor: "Sanvo",
    },
    {
      id: 3,
      name: "Lenovo 81JW0001US Chromebook S330, 14 HD Display",
      price: 589.9,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
      rating: 4,
      reviewCount: 1,
      vendor: "Truffles",
    },
    {
      id: 4,
      name: "Beats Pro Over-Ear Headphones – Black",
      price: 55.99,
      oldPrice: 72.0,
      discount: 22,
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
      rating: 5,
      reviewCount: 1,
      vendor: "TehchiStore",
      colors: 1,
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
          <div className="flex gap-4">
            {/* Thumbnail Strip */}
            <div className="flex flex-col gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-sm overflow-hidden transition-colors ${
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
            <div className="flex-1 relative bg-white border border-gray-200 rounded-sm overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm text-[#7C818B] shadow-sm">
                {selectedImage + 1}/{product.images.length}
              </div>
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
            <h1 className="text-3xl font-bold text-[#1D2128] mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-4">
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

            {/* Social Share */}
            <div className="flex items-center gap-2 mb-6">
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
                <span className="text-4xl font-bold text-[#1D2128]">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-[#7C818B] line-through">
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

            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-sm text-[#4CAF50] font-medium">
                Available in stock
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1D2128] mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#11248F] text-white py-3 px-6 rounded-sm font-medium hover:bg-[#0D1A6F] transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white text-[#1D2128] py-3 px-6 rounded-sm font-medium border-2 border-[#1D2128] hover:bg-[#1D2128] hover:text-white transition-colors"
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
            <div className="border border-gray-200 rounded-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#7C818B] mb-1">Store</div>
                  <Link href={`/store/${product.vendor}`}>
                    <a className="text-base font-medium text-[#1D2128] hover:text-[#11248F]">
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

            {/* Ask a Question */}
            <button className="w-full bg-[#1D2128] text-white py-3 px-6 rounded-sm font-medium hover:bg-[#2D3138] transition-colors">
              Ask a Question
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger
              value="offers"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
            >
              More Offers
            </TabsTrigger>
            <TabsTrigger
              value="policies"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
            >
              Store Policies
            </TabsTrigger>
            <TabsTrigger
              value="inquiries"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#11248F] data-[state=active]:bg-transparent px-6 py-3"
            >
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p className="text-[#1D2128] leading-relaxed">{product.description}</p>
              
              <h3 className="text-xl font-semibold text-[#1D2128] mt-6 mb-4">Specifications</h3>
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 text-[#7C818B] font-medium w-1/3">{spec.label}</td>
                      <td className="py-3 text-[#1D2128]">{spec.value}</td>
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
              <h3 className="text-xl font-semibold text-[#1D2128] mb-4">Return Policy</h3>
              <p className="text-[#1D2128] leading-relaxed mb-4">
                Items can be returned within 60 days of purchase. Products must be in original condition with all packaging.
              </p>
              
              <h3 className="text-xl font-semibold text-[#1D2128] mb-4">Shipping Policy</h3>
              <p className="text-[#1D2128] leading-relaxed">
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

        {/* Similar Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1D2128] mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <a className="group">
                  <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square bg-gray-100">
                      {item.discount && (
                        <span className="absolute top-2 left-2 bg-[#D8125D] text-white text-xs px-2 py-1 rounded-sm">
                          -{item.discount}%
                        </span>
                      )}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      {item.colors && (
                        <div className="text-xs text-[#7C818B] mb-1">{item.colors} color</div>
                      )}
                      <h3 className="text-sm font-medium text-[#1D2128] mb-2 line-clamp-2 group-hover:text-[#11248F]">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < item.rating
                                ? "fill-[#FFA500] text-[#FFA500]"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-[#7C818B]">({item.reviewCount})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#1D2128]">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-[#7C818B] line-through">
                            ${item.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#7C818B] mt-1">{item.vendor}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Mobile Add to Cart Bar */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 animate-in slide-in-from-bottom">
          <div className="container py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-[#1D2128]">
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
                className="flex-1 bg-[#11248F] text-white py-3 px-6 rounded-sm font-medium hover:bg-[#0D1A6F] transition-colors"
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
