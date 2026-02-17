export type VendorStore = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  logo: string;
  banner: string;
  productsCount: number;
};

export type VendorProduct = {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export const vendorStores: VendorStore[] = [
  {
    id: "tech-haven",
    slug: "tech-haven",
    name: "Tech Haven",
    tagline: "Premium gadgets for creators",
    description: "Curated electronics, tested by our in-house team before listing.",
    category: "Electronics",
    location: "Lusaka",
    rating: 4.8,
    reviews: 421,
    verified: true,
    logo: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&h=500&fit=crop",
    productsCount: 72,
  },
  {
    id: "urban-living",
    slug: "urban-living",
    name: "Urban Living",
    tagline: "Smart home and lifestyle picks",
    description: "Functional home tech with clean design and fast local shipping.",
    category: "Home & Lifestyle",
    location: "Ndola",
    rating: 4.5,
    reviews: 205,
    verified: true,
    logo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&h=500&fit=crop",
    productsCount: 48,
  },
  {
    id: "pixel-works",
    slug: "pixel-works",
    name: "Pixel Works",
    tagline: "Cameras and studio gear",
    description: "Photography and production essentials for creators at every level.",
    category: "Cameras",
    location: "Kitwe",
    rating: 4.6,
    reviews: 332,
    verified: false,
    logo: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=1400&h=500&fit=crop",
    productsCount: 61,
  },
  {
    id: "phone-central",
    slug: "phone-central",
    name: "Phone Central",
    tagline: "Smartphones and accessories",
    description: "Latest devices, trade-ins, and accessory bundles.",
    category: "Mobiles",
    location: "Livingstone",
    rating: 4.3,
    reviews: 198,
    verified: true,
    logo: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1400&h=500&fit=crop",
    productsCount: 89,
  },
  {
    id: "laptop-hub",
    slug: "laptop-hub",
    name: "Laptop Hub",
    tagline: "Workstations and everyday laptops",
    description: "From student laptops to pro-grade machines with warranty options.",
    category: "Computers",
    location: "Lusaka",
    rating: 4.7,
    reviews: 509,
    verified: true,
    logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=500&fit=crop",
    productsCount: 113,
  },
  {
    id: "audio-lab",
    slug: "audio-lab",
    name: "Audio Lab",
    tagline: "Headphones, speakers, and pro audio",
    description: "High-fidelity audio gear and accessories for daily and studio use.",
    category: "Audio",
    location: "Kabwe",
    rating: 4.4,
    reviews: 147,
    verified: false,
    logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400&h=500&fit=crop",
    productsCount: 37,
  },
  {
    id: "appliance-depot",
    slug: "appliance-depot",
    name: "Appliance Depot",
    tagline: "Kitchen and home appliance experts",
    description: "Reliable brands, installation guidance, and after-sales support.",
    category: "Appliances",
    location: "Chipata",
    rating: 4.2,
    reviews: 121,
    verified: true,
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1400&h=500&fit=crop",
    productsCount: 54,
  },
  {
    id: "tablet-space",
    slug: "tablet-space",
    name: "Tablet Space",
    tagline: "Tablets for work and learning",
    description: "Tablets, stylus kits, and bundles for school and business.",
    category: "Tablets",
    location: "Kasama",
    rating: 4.1,
    reviews: 87,
    verified: false,
    logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1400&h=500&fit=crop",
    productsCount: 29,
  },
  {
    id: "gaming-garage",
    slug: "gaming-garage",
    name: "Gaming Garage",
    tagline: "Consoles, accessories, and gear",
    description: "Gaming-focused store with bundles, merch, and weekly drops.",
    category: "Gaming",
    location: "Lusaka",
    rating: 4.9,
    reviews: 612,
    verified: true,
    logo: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1400&h=500&fit=crop",
    productsCount: 95,
  },
  {
    id: "wearable-zone",
    slug: "wearable-zone",
    name: "Wearable Zone",
    tagline: "Smartwatches and fitness trackers",
    description: "Wearables for fitness, productivity, and everyday health tracking.",
    category: "Wearables",
    location: "Mongu",
    rating: 4.0,
    reviews: 66,
    verified: false,
    logo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1400&h=500&fit=crop",
    productsCount: 24,
  },
  {
    id: "network-pro",
    slug: "network-pro",
    name: "Network Pro",
    tagline: "Routers, mesh, and networking kits",
    description: "Business and home networking equipment with setup guides.",
    category: "Networking",
    location: "Solwezi",
    rating: 4.3,
    reviews: 109,
    verified: true,
    logo: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=500&fit=crop",
    productsCount: 42,
  },
  {
    id: "creative-corner",
    slug: "creative-corner",
    name: "Creative Corner",
    tagline: "Design tools and accessories",
    description: "Devices and accessories for designers and digital creatives.",
    category: "Accessories",
    location: "Lusaka",
    rating: 4.6,
    reviews: 173,
    verified: true,
    logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&h=500&fit=crop",
    productsCount: 57,
  },
];

const productNames = [
  "Wireless Noise-Canceling Headphones",
  "13-inch Ultrabook Laptop",
  "4K Smart TV 55-inch",
  "Smartphone Pro Max",
  "Smartwatch Active",
  "Tablet Plus 11",
  "Home Mesh Router",
  "Bluetooth Speaker",
];

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1589739900243-4b52cd9d0f5f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop",
];

export const vendorProducts: VendorProduct[] = vendorStores.flatMap((store, storeIndex) =>
  Array.from({ length: 12 }, (_, index) => ({
    id: `${store.id}-${index + 1}`,
    vendorId: store.id,
    name: `${productNames[index % productNames.length]} ${index + 1}`,
    price: 79 + (storeIndex * 21 + index * 13) % 950,
    image: productImages[(storeIndex + index) % productImages.length],
    stock: ((storeIndex + index) * 3) % 18,
  }))
);
