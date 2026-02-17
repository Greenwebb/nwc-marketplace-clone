import {
  Calendar,
  Camera,
  Headphones,
  Laptop,
  Refrigerator,
  RotateCcw,
  Router,
  Shield,
  Smartphone,
  Tablet,
  Truck,
  Tv,
  Watch,
} from "lucide-react";

export type HeaderCategory = {
  name: string;
  slug: string;
  icon: typeof Laptop;
  hasSubmenu: boolean;
};

export type HeaderBenefit = {
  icon: typeof Truck;
  text: string;
};

export const categories: HeaderCategory[] = [
  { name: "Laptops & Computers", slug: "laptops-computers", icon: Laptop, hasSubmenu: true },
  { name: "TVs & Video", slug: "tvs-video", icon: Tv, hasSubmenu: true },
  { name: "Cell Phones", slug: "cell-phones", icon: Smartphone, hasSubmenu: true },
  { name: "Wearable Tech", slug: "wearable-tech", icon: Watch, hasSubmenu: true },
  { name: "Appliances", slug: "appliances", icon: Refrigerator, hasSubmenu: true },
  { name: "Cameras", slug: "cameras", icon: Camera, hasSubmenu: true },
  { name: "iPads & Tablets", slug: "ipads-tablets", icon: Tablet, hasSubmenu: true },
  { name: "Headphones", slug: "headphones", icon: Headphones, hasSubmenu: true },
  { name: "Networking", slug: "networking", icon: Router, hasSubmenu: true },
];

export const benefits: HeaderBenefit[] = [
  { icon: Truck, text: "Free shipping on order over $50" },
  { icon: Shield, text: "30 days money back guarantee" },
  { icon: Calendar, text: "Next day delivery free - spend over $99" },
  { icon: RotateCcw, text: "60-day free returns, all shipping methods." },
];
