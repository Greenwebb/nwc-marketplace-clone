import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "NEW ARRIVALS",
    title: "Say hello to the new iMac.",
    description: "You've never seen a computer like this before",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    primaryAction: { label: "Buy Now", href: "/product/imac" },
    secondaryAction: { label: "Learn More", href: "/products/imac" },
  },
  {
    id: 2,
    badge: "FEATURED",
    title: "See the world in a billion shades of color",
    description: "100% Color Volume with Quantum Dot",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop",
    primaryAction: { label: "Explore Now", href: "/product/tv" },
    secondaryAction: { label: "Learn More", href: "/products/tv" },
  },
  {
    id: 3,
    badge: "BEST SELLER",
    title: "Experience wireless freedom",
    description: "Premium sound quality with active noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    primaryAction: { label: "Shop Now", href: "/product/headphones" },
    secondaryAction: { label: "Learn More", href: "/products/headphones" },
  },
  {
    id: 4,
    badge: "TRENDING",
    title: "Capture every moment",
    description: "Professional photography made simple",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop",
    primaryAction: { label: "Discover", href: "/product/camera" },
    secondaryAction: { label: "Learn More", href: "/products/camera" },
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full">
            <div className="container py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <span className="inline-block text-xs font-semibold tracking-wider text-primary uppercase">
                    {slide.badge}
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8">
                      {slide.primaryAction.label}
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8">
                      {slide.secondaryAction.label}
                    </Button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur hidden md:flex"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur hidden md:flex"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
