import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function VendorChat() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Chat" />
      <div className="bg-white rounded-2xl p-6 text-sm text-muted-foreground">
        Vendor chat scaffold is ready. Add buyer/vendor conversations and message threads here.
      </div>
    </div>
  );
}
