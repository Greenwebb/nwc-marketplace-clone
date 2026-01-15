import { Link } from "wouter";
import { Heart, GitCompare, Star } from "lucide-react";
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
  colors?: number;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to compare`);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const inStock = product.inStock !== false;

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <a className="block group">
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
          {/* Image Container with Floating Buttons */}
          <div className="relative aspect-square bg-gray-100">
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Discount Badge - Top Left */}
            {product.badge === "sale" && (
              <span className="absolute top-2 left-2 bg-[#D8125D] text-white text-xs font-semibold px-2 py-1 rounded-sm">
                {product.badgeText || `-${discount}%`}
              </span>
            )}

            {/* Hot Badge - Top Left */}
            {product.badge === "hot" && (
              <span className="absolute top-2 left-2 bg-[#FF6B00] text-white text-xs font-semibold px-2 py-1 rounded-sm">
                {product.badgeText || "Hot"}
              </span>
            )}

            {/* New Badge - Top Left */}
            {product.badge === "new" && (
              <span className="absolute top-2 left-2 bg-[#4CAF50] text-white text-xs font-semibold px-2 py-1 rounded-sm">
                {product.badgeText || "New"}
              </span>
            )}

            {/* Out of Stock Badge - Top Center */}
            {!inStock && (
              <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-sm">
                Out Of Stock
              </span>
            )}

            {/* Floating Action Buttons - Top Right */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button
                onClick={handleAddToWishlist}
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#11248F] hover:text-white transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                onClick={handleCompare}
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#11248F] hover:text-white transition-colors"
                aria-label="Add to compare"
              >
                <GitCompare className="h-4 w-4" />
              </button>
            </div>

            {/* Color Variants Indicator - Bottom Left */}
            {product.colors && product.colors > 0 && (
              <div className="absolute bottom-2 left-2 text-xs text-[#7C818B] bg-white px-2 py-1 rounded-sm shadow-sm">
                {product.colors} Color{product.colors > 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 md:p-4">
            {/* Category */}
            <span className="text-xs text-[#7C818B] block mb-1">
              {product.category}
            </span>

            {/* Product Title */}
            <h3 className="text-sm font-medium text-[#1D2128] mb-2 line-clamp-2 group-hover:text-[#11248F] transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-[#FFA500] text-[#FFA500]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-xs text-[#7C818B] ml-1">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-base md:text-lg font-bold text-[#1D2128]">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-[#7C818B] line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Vendor */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#11248F] flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">
                  {product.vendor.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-[#7C818B]">{product.vendor}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
