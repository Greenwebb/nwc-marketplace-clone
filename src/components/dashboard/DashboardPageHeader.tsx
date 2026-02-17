import { Link } from "@/lib/router";
import { Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface DashboardPageHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardPageHeader({ title, subtitle }: DashboardPageHeaderProps) {
  const { user, activeMode } = useAuth();
  const notificationsHref = activeMode === "vendor" ? "/vendor/notifications" : "/dashboard/notifications";

  return (
    <div className=" rounded-2xl p-5 lg:p-6 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary truncate">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link href={notificationsHref}>
          <a className="relative p-2 rounded-2xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </a>
        </Link>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </div>
  );
}
