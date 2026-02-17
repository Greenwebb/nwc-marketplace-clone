import { Link } from "@/lib/router";
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
    <section className="mt-4 border border-[#DADFE3] bg-white py-6">
      <div className="container">
        {/* 3 columns on smaller screens, 1 horizontal row on desktop */}
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-9 lg:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/shop?category=${category.slug}`}>
                <a className="group flex flex-col items-center justify-center rounded-2xl p-3 transition-colors hover:bg-[#f7f9fc] lg:p-4">
                  {/* Icon Container */}
                  <div className="mb-2 flex h-12 w-12 items-center justify-center lg:mb-3 lg:h-16 lg:w-16">
                    <Icon className="h-7 w-7 text-[#7C818B] transition-colors group-hover:text-[#11248F] lg:h-10 lg:w-10" strokeWidth={1.5} />
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-center text-[11px] text-primary lg:text-xs">
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

