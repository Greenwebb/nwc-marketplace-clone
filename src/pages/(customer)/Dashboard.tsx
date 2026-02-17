import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

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

  const getStatusColor = (status: string) => {
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#DADFE3]">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <a className="text-[#7C818B] hover:text-[#11248F]">Home</a>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <span className="text-primary font-medium">My Account</span>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl">
                {/* User Info */}
                <div className="p-4 border-b border-[#DADFE3]">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-primary">John Doe</p>
                      <p className="text-xs text-[#7C818B]">john@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                          activeTab === item.id
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-[#fff]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}

                  <div className="border-t border-[#DADFE3] my-2"></div>

                  <button
                    onClick={() => toast.info("Logout feature coming soon")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-[#D8125D] hover:bg-[#FFF5F5] transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Welcome Header */}
                  <div className="bg-white rounded-2xl p-6">
                    <h1 className="text-xl font-bold text-primary mb-1">Welcome back, John!</h1>
                    <p className="text-sm text-[#7C818B]">
                      Here's an overview of your account activity.
                    </p>
                  </div>

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
                          <p className="text-2xl font-bold text-primary">$4,832</p>
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
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-sm text-[#11248F] hover:underline"
                      >
                        View All
                      </button>
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
                              <p className="text-base font-semibold text-primary">${order.total.toFixed(2)}</p>
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
              )}

              {activeTab === "orders" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4">
                    <h1 className="text-lg font-bold text-primary">My Orders</h1>
                  </div>

                  {/* Orders Table */}
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

                    {recentOrders.map((order) => (
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
                            <p className="text-sm font-semibold text-primary">${order.total.toFixed(2)}</p>
                          </div>
                          <div className="md:col-span-1 flex gap-2">
                            <button className="p-2 text-[#7C818B] hover:text-[#11248F] hover:bg-[#fff] rounded-2xl transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#7C818B] hover:text-[#11248F] hover:bg-[#fff] rounded-2xl transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4">
                    <h1 className="text-lg font-bold text-primary">My Wishlist</h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl p-4">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 bg-[#F5F5F7] rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-primary line-clamp-2 mb-1">{item.name}</h3>
                            <p className="text-base font-semibold text-[#D8125D]">${item.price.toFixed(2)}</p>
                            <p className={`text-xs mt-1 ${item.inStock ? "text-green-600" : "text-[#D8125D]"}`}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 h-9 bg-primary text-white text-xs font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                            Add to Cart
                          </button>
                          <button className="h-9 px-3 border border-[#DADFE3] text-[#7C818B] text-xs rounded-2xl hover:bg-[#fff] transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold text-primary">Saved Addresses</h1>
                    <button className="h-9 px-4 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                      Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 border-2 border-[#11248F]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#11248F] bg-[#E8F4FD] px-2 py-0.5 rounded-2xl">Default</span>
                        <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
                      </div>
                      <p className="text-sm font-medium text-primary">John Doe</p>
                      <p className="text-sm text-[#7C818B] mt-1">123 Main Street, Apt 4B</p>
                      <p className="text-sm text-[#7C818B]">New York, NY 10001</p>
                      <p className="text-sm text-[#7C818B]">United States</p>
                      <p className="text-sm text-[#7C818B] mt-2">+1 (555) 123-4567</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#7C818B]">Work</span>
                        <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
                      </div>
                      <p className="text-sm font-medium text-primary">John Doe</p>
                      <p className="text-sm text-[#7C818B] mt-1">456 Business Ave, Suite 100</p>
                      <p className="text-sm text-[#7C818B]">San Francisco, CA 94102</p>
                      <p className="text-sm text-[#7C818B]">United States</p>
                      <p className="text-sm text-[#7C818B] mt-2">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold text-primary">Payment Methods</h1>
                    <button className="h-9 px-4 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                      Add New Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 border-2 border-[#11248F]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[#11248F] bg-[#E8F4FD] px-2 py-0.5 rounded-2xl">Default</span>
                        <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-[#1A1F71] text-white text-xs font-bold rounded">VISA</span>
                        <div>
                          <p className="text-sm font-medium text-primary">•••• •••• •••• 4242</p>
                          <p className="text-xs text-[#7C818B]">Expires 12/2025</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[#7C818B]">Secondary</span>
                        <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-[#EB001B] text-white text-xs font-bold rounded">MC</span>
                        <div>
                          <p className="text-sm font-medium text-primary">•••• •••• •••• 5555</p>
                          <p className="text-xs text-[#7C818B]">Expires 08/2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4">
                    <h1 className="text-lg font-bold text-primary">Account Settings</h1>
                  </div>

                  <div className="bg-white rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-primary mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">First Name</label>
                        <Input
                          type="text"
                          defaultValue="John"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">Last Name</label>
                        <Input
                          type="text"
                          defaultValue="Doe"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">Email</label>
                        <Input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">Phone</label>
                        <Input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                    </div>
                    <button className="mt-6 h-10 px-6 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                      Save Changes
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-primary mb-4">Change Password</h2>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">Current Password</label>
                        <Input
                          type="password"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">New Password</label>
                        <Input
                          type="password"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary mb-1 block">Confirm New Password</label>
                        <Input
                          type="password"
                          className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
                        />
                      </div>
                    </div>
                    <button className="mt-6 h-10 px-6 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
