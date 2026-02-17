import { Link } from "@/lib/router";
import { LogOut, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { type DashboardNavConfig } from "@/config/dashboardNav";
import { isNavActive } from "./dashboardLayoutUtils";

interface DashboardSidebarProps {
  location: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  config: DashboardNavConfig;
}

export function DashboardSidebar({
  location,
  sidebarOpen,
  setSidebarOpen,
  config,
}: DashboardSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex bg-primary items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
          <Link href="/">
            <a className="flex flex-col leading-none my-6 ">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white">New<span className="text-secondar">world</span></span>
                <div className="mb-2 flex gap-0.5">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                </div>
              </div>
              <span className="text-[9px] tracking-wide text-white">Marketplace</span>
            </a>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-2xl hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {config.sidebarItems.map((item) => {
            const active = isNavActive(location, item);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 shrink-0">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {config.roleLabel}
              </p>
            </div>
          </div>
          <button
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
            onClick={() => logout()}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

