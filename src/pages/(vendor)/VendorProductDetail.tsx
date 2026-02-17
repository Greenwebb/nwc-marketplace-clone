import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "@/lib/router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorProduct } from "@/types/vendor";

const currency = new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" });

export default function VendorProductDetail() {
  const { state } = useAuth();
  const [, params] = useRoute("/vendor/products/:productId");
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<VendorProduct | null>(null);

  useEffect(() => {
    if (!params?.productId) return;
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.getProductById(ctx, params.productId).then(setProduct).catch(() => setProduct(null));
  }, [state, params?.productId]);

  const handleDelete = async () => {
    if (!params?.productId) return;
    const ctx = buildVendorRequestContext(state);
    const ok = await mockVendorRepository.deleteProduct(ctx, params.productId);
    if (!ok) {
      toast.error("Unable to delete product.");
      return;
    }
    toast.success("Product deleted.");
    setLocation("/vendor/products");
  };

  if (!product) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">Product not found.</div>;
  }

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4">
        <h1 className="text-lg font-bold text-primary">{product.name}</h1>
        <p className="text-sm text-gray-600">{product.category}</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-4">
        <img src={product.image} alt={product.name} className="mb-4 h-48 w-full rounded-xl object-cover" />
        <p className="mb-2 text-sm text-gray-700">{product.description}</p>
        <p className="text-lg font-bold text-primary">{currency.format(product.priceZMW)}</p>
        <p className="text-sm text-gray-600">
          {product.deliveryAvailable ? `Delivery: ${currency.format(product.deliveryCostZMW)}` : "Pickup only"}
        </p>
      </section>

      <section className="flex flex-wrap gap-2">
        <Link href={`/vendor/products/${product.id}/edit`}>
          <a className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Edit Product</a>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700"
        >
          Delete Product
        </button>
      </section>
    </div>
  );
}


