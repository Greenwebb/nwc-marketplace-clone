import { useState, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";

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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
            {subtitle && (
              <p className="text-sm text-[#7C818B] mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                size="icon"
                variant="outline"
                className={`h-11 w-11 border-2 border-[#DADFE3] ${
                  canScrollLeft
                    ? "text-primary hover:bg-white hover:border-primary"
                    : "text-[#DADFE3] cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                size="icon"
                variant="outline"
                className={`h-11 w-11 rounded-2xl border-2 border-[#DADFE3] ${
                  canScrollRight
                    ? "text-primary hover:bg-white hover:border-primary"
                    : "text-[#DADFE3] cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* View All Link */}
            {viewAllLink && (
              <Link href={viewAllLink}>
                <Button asChild variant="link" size="sm" className="px-0 text-sm font-medium">
                  <a>{viewAllText}</a>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
              onDragStart={(e) => e.preventDefault()}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
