import { Eye, Download } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

const orders = [
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

export default function DashboardOrders() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="My Orders" />

      <div className="bg-white rounded-2xl">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#DADFE3] text-xs font-medium text-[#7C818B] uppercase">
          <div className="col-span-3">Order ID</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Items</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-1">Action</div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="p-4 border-b border-[#ECF0F4] last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-primary">{order.id}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-[#7C818B]">{order.date}</p>
              </div>
              <div className="md:col-span-2">
                <span className={`text-xs px-2 py-0.5 rounded-2xl font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-[#7C818B]">{order.items} item{order.items > 1 ? "s" : ""}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-primary">K{order.total.toFixed(2)}</p>
              </div>
              <div className="md:col-span-1 flex gap-2">
                <button className="p-2 text-[#7C818B] hover:text-[#11248F] hover:bg-gray-50 rounded-2xl transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-[#7C818B] hover:text-[#11248F] hover:bg-gray-50 rounded-2xl transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
