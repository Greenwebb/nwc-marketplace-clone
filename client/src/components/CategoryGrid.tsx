import { Link } from "wouter";
import { Laptop, Tv, Smartphone, Watch, Home, Camera, Tablet, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    name: "Laptop & Computer",
    href: "/category/laptops",
    icon: <Laptop className="h-8 w-8" />,
  },
  {
    name: "TVs & Video",
    href: "/category/tvs",
    icon: <Tv className="h-8 w-8" />,
  },
  {
    name: "Cell Phones",
    href: "/category/phones",
    icon: <Smartphone className="h-8 w-8" />,
  },
  {
    name: "Wearable Tech",
    href: "/category/wearable",
    icon: <Watch className="h-8 w-8" />,
  },
  {
    name: "Appliances",
    href: "/category/appliances",
    icon: <Home className="h-8 w-8" />,
  },
  {
    name: "Cameras",
    href: "/category/cameras",
    icon: <Camera className="h-8 w-8" />,
  },
  {
    name: "iPads & Tablets",
    href: "/category/tablets",
    icon: <Tablet className="h-8 w-8" />,
  },
  {
    name: "Headphones",
    href: "/category/headphones",
    icon: <Headphones className="h-8 w-8" />,
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={category.href}>
          <a>
            <Card className="group hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium leading-tight">{category.name}</h3>
              </CardContent>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  );
}
