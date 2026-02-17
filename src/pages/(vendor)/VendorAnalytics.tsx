import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function VendorAnalytics() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Analytics" />
      <div className="bg-white rounded-2xl p-6 text-sm text-muted-foreground">
        Analytics scaffold is ready. Add performance charts and sales trend metrics.
      </div>
    </div>
  );
}
