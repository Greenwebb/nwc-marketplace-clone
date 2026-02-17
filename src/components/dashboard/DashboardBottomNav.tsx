import { Link } from "@/lib/router";
import { type DashboardNavConfig } from "@/config/dashboardNav";
import { isNavActive } from "./dashboardLayoutUtils";

interface DashboardBottomNavProps {
  location: string;
  config: DashboardNavConfig;
}

export function DashboardBottomNav({ location, config }: DashboardBottomNavProps) {
  return (
    <nav className="fixed bottom-0 m-2 py-2 left-0 right-0 z-30 bg-primary rounded-2xl border-t border-gray-200 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {config.bottomNavItems.map((item) => {
          const active = isNavActive(location, item);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex flex-col items-center justify-center w-16 h-full ${
                  active ? "text-white" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

