import { useState } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus, Share2, GitCompare } from "lucide-react";
import { toast } from "sonner";
import VariantSelector, { ColorVariant, SizeVariant } from "@/components/VariantSelector";
import { useEffect } from "react";

export default function ProductDetail() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Check scroll position for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 400px
      setShowStickyBar(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock product data
  const colors: ColorVariant[] = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Brown", value: "#92400E" },
    { name: "Gold", value: "#D97706" },
  ];

  const sizes: SizeVariant[] = [
    { name: "128GB", available: true },
    { name: "256GB", available: true },
    { name: "512GB", available: true },
    { name: "1TB", available: false },
  ];

  const product = {
    id: params.id || "1",
    name: "MacBook Air 13-inch, 8GB RAM 256GB SSD Storage – Gold (2020 model)",
    price: 999.0,
    oldPrice: 1199.0,
    rating: 4.5,
    reviewCount: 67,
    vendor: "beagle",
    category: "Laptops",
    inStock: true,
    sku: "MBA-2020-GOLD-256",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop",
    ],
    description:
      "The incredibly thin and light MacBook Air is now more powerful than ever. It features a brilliant Retina display, new Magic Keyboard, Touch ID, processors with up to twice the performance, faster graphics, and double the storage capacity.",
    specifications: [
      { label: "Processor", value: "1.1GHz dual-core Intel Core i3" },
      { label: "Memory", value: "8GB 3733MHz LPDDR4X" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" Retina display (2560x1600)' },
      { label: "Graphics", value: "Intel Iris Plus Graphics" },
      { label: "Battery", value: "Up to 11 hours" },
      { label: "Weight", value: "2.8 pounds (1.29 kg)" },
      { label: "Color", value: "Gold" },
    ],
  };

  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      date: "January 15, 2024",
      comment: "Excellent laptop! Perfect for everyday use and light development work. The build quality is superb and the keyboard is a joy to type on.",
      helpful: 12,
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      date: "January 10, 2024",
      comment: "Great build quality and performance. Battery life is impressive. Only wish it had more ports.",
      helpful: 8,
    },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 5,
      date: "January 5, 2024",
      comment: "Love the gold color and the keyboard is much better than previous models. Highly recommended!",
      helpful: 15,
    },
  ];

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist`);
  };

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
              <Link href="/shop">
                <a className="text-[#7C818B] hover:text-[#11248F]">Shop</a>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <Link href={`/shop?category=${product.category.toLowerCase()}`}>
                <a className="text-[#7C818B] hover:text-[#11248F]">{product.category}</a>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <span className="text-[#1D2128] font-medium truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container py-6">
          {/* Product Main Section */}
          <div className="bg-white rounded-sm p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-[#F5F5F7] rounded-sm overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                  {product.oldPrice && (
                    <span className="absolute top-4 left-4 motta-badge-sale">-{discount}%</span>
                  )}
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-[#F5F5F7] rounded-sm overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#11248F]"
                          : "border-transparent hover:border-[#DADFE3]"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Category & Vendor */}
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Link href={`/shop?category=${product.category.toLowerCase()}`}>
                    <a className="text-[#11248F] hover:underline">{product.category}</a>
                  </Link>
                  <span className="text-[#DADFE3]">|</span>
                  <span className="text-[#7C818B]">Sold by: <span className="text-[#1D2128]">{product.vendor}</span></span>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl font-bold text-[#1D2128] mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(product.rating)
                            ? "fill-[#FFA132] text-[#FFA132]"
                            : "fill-[#DADFE3] text-[#DADFE3]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#7C818B]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#D8125D]">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-xl text-[#7C818B] line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-[#D8125D]">
                      <span className="w-2 h-2 bg-[#D8125D] rounded-full"></span>
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#7C818B] mb-6 leading-relaxed">{product.description}</p>

                {/* Divider */}
                <div className="border-t border-[#DADFE3] my-6"></div>

                {/* Variant Selector */}
                <VariantSelector
                  colors={colors}
                  sizes={sizes}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onColorChange={setSelectedColor}
                  onSizeChange={setSelectedSize}
                />

                {/* Divider */}
                <div className="border-t border-[#DADFE3] my-6"></div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-[#1D2128]">Quantity:</span>
                  <div className="flex items-center border border-[#DADFE3] rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#7C818B] hover:bg-[#ECF0F4] transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-[#1D2128]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#7C818B] hover:bg-[#ECF0F4] transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-[#11248F] text-white text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d1c6e] transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="h-12 px-6 border border-[#DADFE3] text-[#1D2128] text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-[#ECF0F4] transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </button>
                  <button
                    onClick={() => toast.info("Compare feature coming soon")}
                    className="h-12 w-12 border border-[#DADFE3] text-[#7C818B] rounded-sm flex items-center justify-center hover:bg-[#ECF0F4] transition-colors"
                  >
                    <GitCompare className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toast.info("Share feature coming soon")}
                    className="h-12 w-12 border border-[#DADFE3] text-[#7C818B] rounded-sm flex items-center justify-center hover:bg-[#ECF0F4] transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#ECF0F4] rounded-sm">
                    <Truck className="h-5 w-5 text-[#11248F]" />
                    <div>
                      <p className="text-xs font-medium text-[#1D2128]">Free Shipping</p>
                      <p className="text-xs text-[#7C818B]">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#ECF0F4] rounded-sm">
                    <RotateCcw className="h-5 w-5 text-[#11248F]" />
                    <div>
                      <p className="text-xs font-medium text-[#1D2128]">30 Days Return</p>
                      <p className="text-xs text-[#7C818B]">Money back guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#ECF0F4] rounded-sm">
                    <Shield className="h-5 w-5 text-[#11248F]" />
                    <div>
                      <p className="text-xs font-medium text-[#1D2128]">Secure Payment</p>
                      <p className="text-xs text-[#7C818B]">100% protected</p>
                    </div>
                  </div>
                </div>

                {/* SKU */}
                <div className="mt-6 pt-6 border-t border-[#DADFE3]">
                  <p className="text-sm text-[#7C818B]">
                    SKU: <span className="text-[#1D2128]">{product.sku}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Specifications & Reviews */}
          <div className="bg-white rounded-sm">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full justify-start border-b border-[#DADFE3] rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="specifications"
                  className="px-6 py-4 rounded-none border-b-2 border-transparent text-sm font-medium text-[#7C818B] data-[state=active]:border-[#11248F] data-[state=active]:text-[#11248F] data-[state=active]:bg-transparent"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-6 py-4 rounded-none border-b-2 border-transparent text-sm font-medium text-[#7C818B] data-[state=active]:border-[#11248F] data-[state=active]:text-[#11248F] data-[state=active]:bg-transparent"
                >
                  Reviews ({product.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex py-3 border-b border-[#ECF0F4]">
                      <span className="text-sm font-medium text-[#1D2128] w-1/3">{spec.label}</span>
                      <span className="text-sm text-[#7C818B] w-2/3">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-[#ECF0F4] last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold text-[#1D2128]">{review.author}</p>
                          <p className="text-xs text-[#7C818B]">{review.date}</p>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-[#FFA132] text-[#FFA132]"
                                  : "fill-[#DADFE3] text-[#DADFE3]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#7C818B] mb-3">{review.comment}</p>
                      <button className="text-xs text-[#7C818B] hover:text-[#11248F]">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />

      {/* Sticky Mobile Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[#DADFE3] shadow-lg z-50 transition-transform duration-300 lg:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-bold text-[#D8125D]">${product.price.toFixed(2)}</div>
              {product.oldPrice && (
                <div className="text-sm text-[#7C818B] line-through">${product.oldPrice.toFixed(2)}</div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-[#11248F] text-white text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d1c6e] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
