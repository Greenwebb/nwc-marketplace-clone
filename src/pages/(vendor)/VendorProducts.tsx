import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { Search } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorProduct } from "@/types/vendor";

const currency = new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" });

export default function VendorProducts() {
  const { state } = useAuth();
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.listProducts(ctx).then(setProducts).catch(() => setProducts([]));
  }, [state]);

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized),
    );
  }, [products, searchQuery]);

  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Products" subtitle="Manage product catalog and availability." />

      <section className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products"
              className="pl-9"
            />
          </div>
          <Link href="/vendor/products/new">
            <a className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-white">
              Add Product
            </a>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/vendor/products/${product.id}`}>
            <a className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-primary">
              <img
                src={product.image}
                alt={product.name}
                className="mb-3 h-36 w-full rounded-xl object-cover"
              />
              <p className="text-sm font-semibold text-primary">{product.name}</p>
              <p className="text-xs text-gray-600">{product.category}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{currency.format(product.priceZMW)}</p>
              <p className="text-xs text-gray-500">
                {product.deliveryAvailable ? "Delivery available" : "Pickup only"}
              </p>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
}


