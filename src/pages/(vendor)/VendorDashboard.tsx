import { DollarSign, ShoppingBag, Package, Clock } from "lucide-react";
import VendorDashboardLayout from "@/components/VendorDashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Mock data - will be replaced with real data from tRPC
const stats = [
  {
    name: "Total Sales",
    value: "$12,426",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "Total Orders",
    value: "156",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: ShoppingBag,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    name: "Total Products",
    value: "48",
    change: "+3",
    changeType: "neutral" as const,
    icon: Package,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    name: "Pending Orders",
    value: "12",
    change: "-2",
    changeType: "negative" as const,
    icon: Clock,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const recentOrders = [
  {
    id: "#ORD-2024-001",
    customer: "John Doe",
    product: "MacBook Air 13-inch",
    amount: "$999.00",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "#ORD-2024-002",
    customer: "Jane Smith",
    product: "AirPods Pro",
    amount: "$249.00",
    status: "Processing",
    date: "2024-01-15",
  },
  {
    id: "#ORD-2024-003",
    customer: "Bob Johnson",
    product: "iPhone 11 64GB",
    amount: "$699.00",
    status: "Shipped",
    date: "2024-01-14",
  },
  {
    id: "#ORD-2024-004",
    customer: "Alice Williams",
    product: "Galaxy Watch Active 2",
    amount: "$249.00",
    status: "Delivered",
    date: "2024-01-14",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function VendorDashboard() {
  return (
    <VendorDashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#11248F] to-[#1e3a8a] rounded-2xl p-6 lg:p-8 text-white">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, Vendor!</h1>
          <p className="text-white/90">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} ${stat.iconColor} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/vendor/products/new">
            <a className="block">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#11248F] hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary mb-1">Add Product</h3>
                <p className="text-sm text-gray-600">Create a new product listing</p>
              </div>
            </a>
          </Link>

          <Link href="/vendor/orders">
            <a className="block">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#11248F] hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary mb-1">View Orders</h3>
                <p className="text-sm text-gray-600">Manage your orders</p>
              </div>
            </a>
          </Link>

          <Link href="/vendor/analytics">
            <a className="block">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#11248F] hover:shadow-md transition-all text-center">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary mb-1">View Analytics</h3>
                <p className="text-sm text-gray-600">Check your performance</p>
              </div>
            </a>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Recent Orders</h2>
              <Link href="/vendor/orders">
                <a className="text-sm font-semibold text-[#11248F] hover:underline">View All</a>
              </Link>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-primary">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-primary">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-primary">{order.product}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-primary">{order.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{order.id}</span>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="text-sm font-medium text-primary">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="text-sm font-medium text-primary">{order.product}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-primary">{order.amount}</span>
                  <span className="text-sm text-gray-600">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
