import { useEffect, useState } from "react";
import { useLocation, useRoute } from "@/lib/router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorProduct } from "@/types/vendor";
import { VendorProductForm } from "@/pages/(vendor)/VendorProductForm";

export default function VendorProductEdit() {
  const { state } = useAuth();
  const [, params] = useRoute("/vendor/products/:productId/edit");
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<VendorProduct | null>(null);

  useEffect(() => {
    if (!params?.productId) return;
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.getProductById(ctx, params.productId).then(setProduct).catch(() => setProduct(null));
  }, [state, params?.productId]);

  if (!product) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">Loading product...</div>;
  }

  const handleSave = async (value: Omit<VendorProduct, "id">) => {
    const ctx = buildVendorRequestContext(state);
    const updated = await mockVendorRepository.updateProduct(ctx, product.id, value);
    if (!updated) {
      toast.error("Unable to update product.");
      return;
    }
    toast.success("Product updated.");
    setLocation(`/vendor/products/${product.id}`);
  };

  return (
    <VendorProductForm
      title="Edit Product"
      initialValue={{
        name: product.name,
        description: product.description,
        category: product.category,
        condition: product.condition,
        priceZMW: product.priceZMW,
        deliveryAvailable: product.deliveryAvailable,
        deliveryCostZMW: product.deliveryCostZMW,
        image: product.image,
        active: product.active,
      }}
      submitLabel="Save Changes"
      onSubmit={handleSave}
    />
  );
}


