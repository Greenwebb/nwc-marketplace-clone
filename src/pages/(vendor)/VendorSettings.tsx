import { Link } from "@/lib/router";
import { SETTINGS_SECTIONS } from "@/pages/(vendor)/vendorMeta";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export default function VendorSettings() {
  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Settings" subtitle="Choose a section to update." />

      <section className="space-y-2">
        {SETTINGS_SECTIONS.map((section) => (
          <Link key={section.key} href={`/vendor/settings/${section.key}`}>
            <a className="block rounded-2xl border border-gray-200 bg-white p-4 hover:border-primary">
              <p className="text-sm font-semibold text-primary">{section.label}</p>
              <p className="text-xs text-gray-600">{section.description}</p>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
}


