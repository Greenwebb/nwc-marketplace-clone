import { useState } from "react";
import { useLocation } from "@/lib/router";
import { getNavConfig } from "@/config/dashboardNav";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardBottomNav } from "./DashboardBottomNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "vendor" | "customer";
}

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = getNavConfig(role);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        location={location}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        config={config}
      />

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">{children}</main>
      </div>

      <DashboardBottomNav location={location} config={config} />
    </div>
  );
}
