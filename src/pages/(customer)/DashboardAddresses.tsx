import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function DashboardAddresses() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Saved Addresses" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border-2 border-[#11248F]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#11248F] bg-[#E8F4FD] px-2 py-0.5 rounded-2xl">Default</span>
            <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
          </div>
          <p className="text-sm font-medium text-primary">John Doe</p>
          <p className="text-sm text-[#7C818B] mt-1">123 Main Street, Apt 4B</p>
          <p className="text-sm text-[#7C818B]">New York, NY 10001</p>
          <p className="text-sm text-[#7C818B]">United States</p>
          <p className="text-sm text-[#7C818B] mt-2">+1 (555) 123-4567</p>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#7C818B]">Work</span>
            <button className="text-xs text-[#7C818B] hover:text-[#11248F]">Edit</button>
          </div>
          <p className="text-sm font-medium text-primary">John Doe</p>
          <p className="text-sm text-[#7C818B] mt-1">456 Business Ave, Suite 100</p>
          <p className="text-sm text-[#7C818B]">San Francisco, CA 94102</p>
          <p className="text-sm text-[#7C818B]">United States</p>
          <p className="text-sm text-[#7C818B] mt-2">+1 (555) 987-6543</p>
        </div>
      </div>
    </div>
  );
}
