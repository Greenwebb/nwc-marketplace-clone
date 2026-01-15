import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, GitCompare, Star } from "lucide-react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  badge?: "sale" | "hot" | "new";
  badgeText?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info("Compare feature coming soon");
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <a
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-white rounded-sm overflow-hidden motta-card-hover">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                {product.badge === "sale" && (
                  <span className="motta-badge-sale">
                    {product.badgeText || `-${discount}%`}
                  </span>
                )}
                {product.badge === "hot" && (
                  <span className="motta-badge-hot">
                    {product.badgeText || "Hot"}
                  </span>
                )}
                {product.badge === "new" && (
                  <span className="motta-badge-new">
                    {product.badgeText || "New"}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3">
            {/* Category */}
            <span className="motta-category-label block mb-1">
              {product.category}
            </span>

            {/* Product Name */}
            <h3 className="motta-product-title line-clamp-2 mb-2 group-hover:text-[#11248F] transition-colors">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`motta-price ${product.oldPrice ? "text-[#D8125D]" : ""}`}>
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="motta-price-old">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Vendor with Icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-[#11248F] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">{product.vendor.charAt(0).toUpperCase()}</span>
              </div>
              <span className="motta-vendor">{product.vendor}</span>
            </div>

            {/* Rating - Always Visible */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(product.rating)
                        ? "fill-[#FFA132] text-[#FFA132]"
                        : "fill-[#DADFE3] text-[#DADFE3]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#7C818B]">({product.reviewCount})</span>
            </div>

            {/* Desktop: Hover Actions | Mobile: Always Visible */}
            <div className={`space-y-2 transition-all duration-200 md:${isHovered ? "opacity-100 max-h-32" : "opacity-0 max-h-0 overflow-hidden"}`}>
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full h-11 bg-[#11248F] text-white text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d1c6e] transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to cart
              </button>

              {/* Compare and Wishlist Icons */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCompare}
                  className="w-10 h-10 border border-[#DADFE3] rounded-sm flex items-center justify-center text-[#7C818B] hover:text-[#11248F] hover:border-[#11248F] transition-colors"
                  aria-label="Compare"
                  title="Compare"
                >
                  <GitCompare className="w-4 h-4" />
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="w-10 h-10 border border-[#DADFE3] rounded-sm flex items-center justify-center text-[#7C818B] hover:text-[#D8125D] hover:border-[#D8125D] transition-colors"
                  aria-label="Add to wishlist"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile: Always Visible Actions */}
            <div className="md:hidden space-y-2">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full h-11 bg-[#11248F] text-white text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-[#0d1c6e] transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to cart
              </button>

              {/* Compare and Wishlist Icons */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCompare}
                  className="w-10 h-10 border border-[#DADFE3] rounded-sm flex items-center justify-center text-[#7C818B] hover:text-[#11248F] hover:border-[#11248F] transition-colors"
                  aria-label="Compare"
                  title="Compare"
                >
                  <GitCompare className="w-4 h-4" />
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="w-10 h-10 border border-[#DADFE3] rounded-sm flex items-center justify-center text-[#7C818B] hover:text-[#D8125D] hover:border-[#D8125D] transition-colors"
                  aria-label="Add to wishlist"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
