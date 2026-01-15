import { useState } from "react";
import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
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
      date: "2024-01-15",
      comment: "Excellent laptop! Perfect for everyday use and light development work.",
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      date: "2024-01-10",
      comment: "Great build quality and performance. Battery life is impressive.",
    },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 5,
      date: "2024-01-05",
      comment: "Love the gold color and the keyboard is much better than previous models.",
    },
  ];

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/">
                <a className="hover:text-foreground">Home</a>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/shop">
                <a className="hover:text-foreground">Shop</a>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/category/${product.category.toLowerCase()}`}>
                <a className="hover:text-foreground">{product.category}</a>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted/30">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Link href={`/category/${product.category.toLowerCase()}`}>
                    <a className="hover:text-primary">{product.category}</a>
                  </Link>
                  <span>•</span>
                  <span>SKU: {product.sku}</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-2xl text-muted-foreground line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                      <span className="badge-sale">-{discount}%</span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <span className="text-sm font-medium text-green-600">In Stock</span>
                  ) : (
                    <span className="text-sm font-medium text-destructive">Out of Stock</span>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button size="lg" className="flex-1 gap-2 rounded-full">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 rounded-full">
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">On orders over $50</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">30 Days Return</p>
                        <p className="text-xs text-muted-foreground">Money back guarantee</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">100% protected</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Specifications & Reviews */}
          <Tabs defaultValue="specifications" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex border-b pb-3">
                        <span className="font-medium w-1/3">{spec.label}:</span>
                        <span className="text-muted-foreground w-2/3">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
