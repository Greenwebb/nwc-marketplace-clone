import type { NavItem } from "@/config/dashboardNav";

export function isNavActive(location: string, item: NavItem) {
  const isRootDashboard =
    item.href === "/dashboard" || item.href === "/vendor/dashboard";
  if (isRootDashboard) return location === item.href;
  if (location === item.href) return true;
  if (location.startsWith(item.href + "/")) return true;
  return false;
}

