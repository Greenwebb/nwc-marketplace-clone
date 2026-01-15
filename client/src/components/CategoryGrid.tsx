import { Link } from "wouter";
import { 
  Laptop, 
  Tv, 
  Smartphone, 
  Watch, 
  Refrigerator, 
  Camera, 
  Tablet, 
  Headphones, 
  Wifi 
} from "lucide-react";

interface Category {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const categories: Category[] = [
  { name: "Laptop&Computer", slug: "laptops-computers", icon: Laptop },
  { name: "TVs & Video", slug: "tvs-video", icon: Tv },
  { name: "Cell Phones", slug: "cell-phones", icon: Smartphone },
  { name: "Wearable Tech", slug: "wearable-tech", icon: Watch },
  { name: "Appliances", slug: "appliances", icon: Refrigerator },
  { name: "Cameras", slug: "cameras", icon: Camera },
  { name: "iPads&Tablets", slug: "ipads-tablets", icon: Tablet },
  { name: "Headphones", slug: "headphones", icon: Headphones },
  { name: "Networking", slug: "networking", icon: Wifi },
];

export default function CategoryGrid() {
  return (
    <section className="py-6 bg-white border-b border-[#DADFE3]">
      <div className="container">
        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-9 gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/shop?category=${category.slug}`}>
                <a className="flex flex-col items-center justify-center min-w-[100px] lg:min-w-0 p-4 hover:bg-[#ECF0F4] rounded-sm transition-colors group">
                  {/* Icon Container */}
                  <div className="w-16 h-16 flex items-center justify-center mb-3">
                    <Icon className="w-10 h-10 text-[#7C818B] group-hover:text-[#11248F] transition-colors" strokeWidth={1.5} />
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-xs text-[#1D2128] text-center whitespace-nowrap">
                    {category.name}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
