import { Link } from "@/lib/router";
import { Package, Heart, CreditCard, Eye } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "January 15, 2024",
    status: "Delivered",
    total: 999.0,
    items: 1,
    products: ["MacBook Air 13-inch"],
  },
  {
    id: "ORD-2024-002",
    date: "January 10, 2024",
    status: "Shipped",
    total: 498.0,
    items: 2,
    products: ["Powerbeats Pro", "Smart Keyboard"],
  },
  {
    id: "ORD-2024-003",
    date: "January 5, 2024",
    status: "Processing",
    total: 1247.0,
    items: 3,
    products: ["iPhone 11", "AirPods Pro", "Case"],
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "text-green-600 bg-green-50";
    case "Shipped":
      return "text-[#11248F] bg-[#E8F4FD]";
    case "Processing":
      return "text-[#FFA132] bg-[#FFF5E6]";
    case "Cancelled":
      return "text-[#D8125D] bg-[#FFF5F5]";
    default:
      return "text-[#7C818B] bg-[#fff]";
  }
}

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader title="Welcome back, John!" subtitle="Here's an overview of your account activity." />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7C818B] mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-primary">24</p>
            </div>
            <div className="w-10 h-10 bg-[#E8F4FD] rounded-2xl flex items-center justify-center">
              <Package className="h-5 w-5 text-[#11248F]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7C818B] mb-1">Wishlist Items</p>
              <p className="text-2xl font-bold text-primary">12</p>
            </div>
            <div className="w-10 h-10 bg-[#FFF5F5] rounded-2xl flex items-center justify-center">
              <Heart className="h-5 w-5 text-[#D8125D]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7C818B] mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-primary">K4,832</p>
            </div>
            <div className="w-10 h-10 bg-[#E8FFF3] rounded-2xl flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#DADFE3]">
          <h2 className="text-base font-semibold text-primary">Recent Orders</h2>
          <Link href="/dashboard/orders">
            <a className="text-sm text-[#11248F] hover:underline">View All</a>
          </Link>
        </div>
        <div className="divide-y divide-[#ECF0F4]">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-[#FAFAFA] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-primary">{order.id}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-2xl font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7C818B]">
                    {order.date} • {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-[#7C818B] mt-1 line-clamp-1">
                    {order.products.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-primary">K{order.total.toFixed(2)}</p>
                  <button className="text-xs text-[#11248F] hover:underline mt-1 flex items-center gap-1 ml-auto">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

