import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { VendorProduct } from "@/types/vendor";

type ProductFormValue = Omit<VendorProduct, "id">;

interface VendorProductFormProps {
  title: string;
  initialValue?: ProductFormValue;
  submitLabel: string;
  onSubmit: (value: ProductFormValue) => Promise<void>;
}

const defaultValue: ProductFormValue = {
  name: "",
  description: "",
  category: "",
  condition: "new",
  priceZMW: 0,
  deliveryAvailable: false,
  deliveryCostZMW: 0,
  image: "",
  active: true,
};

export function VendorProductForm({
  title,
  initialValue,
  submitLabel,
  onSubmit,
}: VendorProductFormProps) {
  const merged = useMemo(() => ({ ...defaultValue, ...initialValue }), [initialValue]);
  const [form, setForm] = useState<ProductFormValue>(merged);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof ProductFormValue>(key: K, value: ProductFormValue[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (form.priceZMW <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4" onSubmit={handleSubmit}>
      <header>
        <h1 className="text-lg font-bold text-primary">{title}</h1>
        <p className="text-sm text-gray-600">Basic info, delivery, and pricing.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-semibold text-gray-700">Product Name</span>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold text-gray-700">Category</span>
          <Input value={form.category} onChange={(e) => update("category", e.target.value)} />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold text-gray-700">Price (ZMW)</span>
          <Input
            type="number"
            min={0}
            value={form.priceZMW}
            onChange={(e) => update("priceZMW", Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold text-gray-700">Condition</span>
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={form.condition}
            onChange={(e) => update("condition", e.target.value as ProductFormValue["condition"])}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-xs font-semibold text-gray-700">Description</span>
        <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} />
      </label>

      <label className="space-y-1">
        <span className="text-xs font-semibold text-gray-700">Image URL</span>
        <Input value={form.image} onChange={(e) => update("image", e.target.value)} />
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.deliveryAvailable}
            onChange={(e) => update("deliveryAvailable", e.target.checked)}
          />
          Delivery available
        </label>
        <label className="space-y-1">
          <span className="text-xs font-semibold text-gray-700">Delivery Cost (ZMW)</span>
          <Input
            type="number"
            min={0}
            value={form.deliveryCostZMW}
            onChange={(e) => update("deliveryCostZMW", Number(e.target.value))}
          />
        </label>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

