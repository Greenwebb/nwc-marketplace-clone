import { useLocation } from "@/lib/router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorProduct } from "@/types/vendor";
import { VendorProductForm } from "@/pages/(vendor)/VendorProductForm";

export default function VendorProductNew() {
  const { state } = useAuth();
  const [, setLocation] = useLocation();

  const handleCreate = async (value: Omit<VendorProduct, "id">) => {
    const ctx = buildVendorRequestContext(state);
    const created = await mockVendorRepository.createProduct(ctx, value);
    if (!created) {
      toast.error("Unable to create product.");
      return;
    }
    toast.success("Product created.");
    setLocation(`/vendor/products/${created.id}`);
  };

  return (
    <VendorProductForm
      title="Add Product"
      submitLabel="Save Product"
      onSubmit={handleCreate}
    />
  );
}


