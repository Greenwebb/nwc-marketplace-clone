import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  image: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "NEW ARRIVALS",
    title: "Say hello to the\nnew iMac.",
    subtitle: "You've never seen a computer like this before",
    primaryButton: { text: "Buy Now", href: "/shop?category=laptops-computers" },
    secondaryButton: { text: "Learn More", href: "/product/imac" },
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=500&fit=crop",
    bgColor: "#F5F5F7",
  },
  {
    id: 2,
    badge: "FEATURED",
    title: "GoPro Hero 10\nBlack Edition",
    subtitle: "Capture your adventures in stunning 5.3K",
    primaryButton: { text: "Shop Now", href: "/shop?category=cameras" },
    secondaryButton: { text: "Learn More", href: "/product/gopro" },
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&h=500&fit=crop",
    bgColor: "#E8F4FD",
  },
  {
    id: 3,
    badge: "BEST SELLER",
    title: "AirPods Pro\nwith MagSafe",
    subtitle: "Active Noise Cancellation for immersive sound",
    primaryButton: { text: "Buy Now", href: "/shop?category=headphones" },
    secondaryButton: { text: "Learn More", href: "/product/airpods-pro" },
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=500&fit=crop",
    bgColor: "#FFF5F5",
  },
  {
    id: 4,
    badge: "NEW RELEASE",
    title: "Galaxy Watch\nUltra Series",
    subtitle: "Your ultimate fitness companion",
    primaryButton: { text: "Shop Now", href: "/shop?category=wearable-tech" },
    secondaryButton: { text: "Learn More", href: "/product/galaxy-watch" },
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=500&fit=crop",
    bgColor: "#F0F8FF",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative overflow-hidden bg-[#ECF0F4]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        {/* Slides Container */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[388px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="h-full flex flex-col md:flex-row items-center">
                {/* Content Side */}
                <div className="flex-1 py-6 md:py-0 px-4 md:px-0 text-center md:text-left">
                  {/* Badge */}
                  <span className="inline-block text-xs font-medium text-[#11248F] tracking-wider mb-3">
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-[#1D2128] leading-tight mb-3 whitespace-pre-line">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm md:text-base text-[#7C818B] mb-6">
                    {slide.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Link href={slide.primaryButton.href}>
                      <a className="inline-flex items-center justify-center h-[46px] px-6 bg-[#11248F] text-white text-sm font-medium rounded-sm hover:bg-[#0d1c6e] transition-colors">
                        {slide.primaryButton.text}
                      </a>
                    </Link>
                    <Link href={slide.secondaryButton.href}>
                      <a className="inline-flex items-center justify-center h-[46px] px-6 text-[#1D2128] text-sm font-medium border-b border-[#1D2128] hover:text-[#11248F] hover:border-[#11248F] transition-colors">
                        {slide.secondaryButton.text}
                      </a>
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 h-full flex items-center justify-center p-4 md:p-8">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#1D2128] hover:bg-[#ECF0F4] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#1D2128] hover:bg-[#ECF0F4] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#11248F] w-6"
                  : "bg-[#DADFE3] hover:bg-[#7C818B]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
