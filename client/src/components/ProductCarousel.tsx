import { useState, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  viewAllText?: string;
}

export default function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllLink,
  viewAllText = "See All Products",
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1D2128]">{title}</h2>
            {subtitle && (
              <p className="text-sm text-[#7C818B] mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border border-[#DADFE3] flex items-center justify-center transition-colors ${
                  canScrollLeft
                    ? "text-[#1D2128] hover:bg-[#ECF0F4]"
                    : "text-[#DADFE3] cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border border-[#DADFE3] flex items-center justify-center transition-colors ${
                  canScrollRight
                    ? "text-[#1D2128] hover:bg-[#ECF0F4]"
                    : "text-[#DADFE3] cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Link */}
            {viewAllLink && (
              <Link href={viewAllLink}>
                <a className="text-sm font-medium text-[#11248F] hover:underline">
                  {viewAllText}
                </a>
              </Link>
            )}
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
