import { Link } from "wouter";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", href: "/shop?brand=apple" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", href: "/shop?brand=samsung" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg", href: "/shop?brand=sony" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg", href: "/shop?brand=lg" },
  { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Canon_wordmark.svg", href: "/shop?brand=canon" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", href: "/shop?brand=microsoft" },
];

export default function BrandLogos() {
  return (
    <section className="py-8 bg-white border-b border-[#DADFE3]">
      <div className="container">
        <div className="flex items-center justify-between gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.href}>
              <a className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-auto object-contain"
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
