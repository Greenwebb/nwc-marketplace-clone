import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function DashboardPayment() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Payment Methods" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border-2 border-[#11248F]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#11248F] bg-[#E8F4FD] px-2 py-0.5 rounded-2xl">Default</span>
            <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#1A1F71] text-white text-xs font-bold rounded">VISA</span>
            <div>
              <p className="text-sm font-medium text-primary">•••• •••• •••• 4242</p>
              <p className="text-xs text-[#7C818B]">Expires 12/2025</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#7C818B]">Secondary</span>
            <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#EB001B] text-white text-xs font-bold rounded">MC</span>
            <div>
              <p className="text-sm font-medium text-primary">•••• •••• •••• 5555</p>
              <p className="text-xs text-[#7C818B]">Expires 08/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
