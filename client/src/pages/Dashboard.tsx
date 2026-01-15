import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

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
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 999.0,
      items: 1,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 498.0,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 1247.0,
      items: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Processing":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/">
                <a className="hover:text-foreground">Home</a>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">My Account</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === item.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}

                    <Separator className="my-4" />

                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">
                      Welcome back! Here's an overview of your account.
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                            <p className="text-3xl font-bold">24</p>
                          </div>
                          <Package className="h-10 w-10 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Wishlist Items</p>
                            <p className="text-3xl font-bold">12</p>
                          </div>
                          <Heart className="h-10 w-10 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                            <p className="text-3xl font-bold">$4,832</p>
                          </div>
                          <CreditCard className="h-10 w-10 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab("orders")}
                        >
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-semibold">{order.id}</p>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {order.date} • {order.items} item{order.items > 1 ? "s" : ""}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                              <Button variant="ghost" size="sm" className="mt-1">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Order history will be displayed here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Wishlist items will be displayed here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Saved Addresses</h1>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Saved addresses will be displayed here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "payment" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Payment methods will be displayed here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Account settings will be displayed here.</p>
                    </CardContent>
                  </Card>
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
