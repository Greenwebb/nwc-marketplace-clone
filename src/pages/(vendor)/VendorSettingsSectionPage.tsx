import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorSettings, VendorSettingsSection } from "@/types/vendor";

interface VendorSettingsSectionPageProps {
  section: VendorSettingsSection;
  title: string;
}

export function VendorSettingsSectionPage({ section, title }: VendorSettingsSectionPageProps) {
  const { state } = useAuth();
  const [settings, setSettings] = useState<VendorSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.getSettings(ctx).then(setSettings).catch(() => setSettings(null));
  }, [state]);

  const entries = useMemo(() => {
    if (!settings) return [];
    return Object.entries(settings[section]) as [string, string | boolean][];
  }, [section, settings]);

  const [form, setForm] = useState<Record<string, string | boolean>>({});

  useEffect(() => {
    setForm(Object.fromEntries(entries));
  }, [entries]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const ctx = buildVendorRequestContext(state);
    setSaving(true);
    try {
      await mockVendorRepository.updateSettingsSection(ctx, section, form as Partial<VendorSettings[typeof section]>);
      toast.success("Settings saved.");
    } catch {
      toast.error("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">Unable to load settings.</div>;
  }

  return (
    <form className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4" onSubmit={handleSave}>
      <header>
        <h1 className="text-lg font-bold text-primary">{title}</h1>
        <p className="text-sm text-gray-600">Edit and save this setting section.</p>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {entries.map(([key, value]) => (
          <label key={key} className="space-y-1 text-sm">
            <span className="font-semibold text-gray-700">{key}</span>
            {typeof value === "boolean" ? (
              <input
                type="checkbox"
                checked={Boolean(form[key])}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))}
              />
            ) : (
              <input
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={String(form[key] ?? "")}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            )}
          </label>
        ))}
      </div>
      <button type="submit" disabled={saving} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

