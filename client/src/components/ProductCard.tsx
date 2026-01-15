import { Link } from "wouter";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  vendor: string;
  badge?: "sale" | "new" | "hot";
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-border/40 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Link href={`/product/${product.id}`}>
            <a>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge === "sale" && discount > 0 && (
              <span className="badge-sale">-{discount}%</span>
            )}
            {product.badge === "new" && <span className="badge-new">New</span>}
            {product.badge === "hot" && <span className="badge-hot">Hot</span>}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-9 w-9 bg-background/90 hover:bg-background backdrop-blur"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-9 w-9 bg-background/90 hover:bg-background backdrop-blur"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4 space-y-3">
          {/* Category & Vendor */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Link href={`/category/${product.category}`}>
              <a className="hover:text-primary transition-colors">{product.category}</a>
            </Link>
            <span>{product.vendor}</span>
          </div>

          {/* Product name */}
          <Link href={`/product/${product.id}`}>
            <a>
              <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
                {product.name}
              </h3>
            </a>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-price-old">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
