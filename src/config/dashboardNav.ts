import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  User,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardNavConfig {
  sidebarTitle: string;
  roleLabel: string;
  sidebarItems: NavItem[];
  bottomNavItems: NavItem[];
}

export const vendorNavConfig: DashboardNavConfig = {
  sidebarTitle: "Vendor Portal",
  roleLabel: "Vendor Account",
  sidebarItems: [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
    { name: "Products", href: "/vendor/products", icon: Package },
    { name: "Notifications", href: "/vendor/notifications", icon: Bell },
    { name: "Account Settings", href: "/vendor/settings", icon: Settings },
  ],
  bottomNavItems: [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
    { name: "Products", href: "/vendor/products", icon: Package },
    { name: "Settings", href: "/vendor/settings", icon: User },
  ],
};

export const customerNavConfig: DashboardNavConfig = {
  sidebarTitle: "My Account",
  roleLabel: "Customer Account",
  sidebarItems: [
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "My Orders", href: "/dashboard/orders", icon: Package },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/dashboard/payment", icon: CreditCard },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
  ],
  bottomNavItems: [
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "Orders", href: "/dashboard/orders", icon: Package },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
};

export function getNavConfig(role: "vendor" | "customer"): DashboardNavConfig {
  return role === "vendor" ? vendorNavConfig : customerNavConfig;
}
