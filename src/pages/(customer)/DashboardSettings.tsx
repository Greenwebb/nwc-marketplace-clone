import { Input } from "@/components/ui/input";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function DashboardSettings() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Account Settings" />

      <div className="bg-white rounded-2xl p-6">
        <h2 className="text-base font-semibold text-primary mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">First Name</label>
            <Input
              type="text"
              defaultValue="John"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">Last Name</label>
            <Input
              type="text"
              defaultValue="Doe"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">Email</label>
            <Input
              type="email"
              defaultValue="john@example.com"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">Phone</label>
            <Input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
        </div>
        <button className="mt-6 h-10 px-6 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h2 className="text-base font-semibold text-primary mb-4">Change Password</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">Current Password</label>
            <Input
              type="password"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">New Password</label>
            <Input
              type="password"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary mb-1 block">Confirm New Password</label>
            <Input
              type="password"
              className="w-full rounded-2xl border-[#DADFE3] text-sm focus-visible:ring-[#11248F]/50"
            />
          </div>
        </div>
        <button className="mt-6 h-10 px-6 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
          Update Password
        </button>
      </div>
    </div>
  );
}
