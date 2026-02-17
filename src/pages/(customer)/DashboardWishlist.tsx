import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

const wishlistItems = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 348.0,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop",
    inStock: true,
  },
  {
    id: "2",
    name: "Canon EOS R6 Mirrorless Camera",
    price: 2499.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    inStock: true,
  },
  {
    id: "3",
    name: "DJI Mavic Air 2 Drone",
    price: 988.0,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop",
    inStock: false,
  },
];

export default function DashboardWishlist() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="My Wishlist" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-[#F5F5F7] rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary line-clamp-2 mb-1">{item.name}</h3>
                <p className="text-base font-semibold text-[#D8125D]">K{item.price.toFixed(2)}</p>
                <p className={`text-xs mt-1 ${item.inStock ? "text-green-600" : "text-[#D8125D]"}`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 h-9 bg-primary text-white text-xs font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                Add to Cart
              </button>
              <button className="h-9 px-3 border border-[#DADFE3] text-[#7C818B] text-xs rounded-2xl hover:bg-gray-50 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
