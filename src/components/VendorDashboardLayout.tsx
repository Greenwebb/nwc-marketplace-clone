import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface VendorDashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Settings", href: "/vendor/settings", icon: Settings },
];

export default function VendorDashboardLayout({ children }: VendorDashboardLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/">
            <a className="text-xl font-bold text-[#11248F]">Newworld Marketplace Vendor</a>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-2xl  hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
            onClick={() => {
              // Logout logic will be implemented
              window.location.href = "/";
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-2xl  hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Page title - hidden on mobile, shown on desktop */}
            <h1 className="hidden lg:block text-xl font-bold text-primary">
              {navigation.find((item) => item.href === location)?.name || "Dashboard"}
            </h1>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-2xl  hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-primary">{user?.name || "Vendor"}</p>
                  <p className="text-xs text-gray-500">Vendor Account</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {user?.name?.[0] || "V"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex items-center justify-around h-16">
          {[
            { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
            { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
            { name: "Products", href: "/vendor/products", icon: Package },
            { name: "Profile", href: "/vendor/settings", icon: User },
          ].map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={`flex flex-col items-center justify-center w-16 h-full ${
                    isActive ? "text-[#11248F]" : "text-gray-500"
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
