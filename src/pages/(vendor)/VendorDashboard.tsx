import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { Wallet, ShoppingBag, Clock3, Package } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorOrder, VendorProduct } from "@/types/vendor";

const currency = new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" });

export default function VendorDashboard() {
  const { state } = useAuth();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [products, setProducts] = useState<VendorProduct[]>([]);

  useEffect(() => {
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.listOrders(ctx).then(setOrders).catch(() => setOrders([]));
    mockVendorRepository.listProducts(ctx).then(setProducts).catch(() => setProducts([]));
  }, [state]);

  const todayOrders = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return orders.filter((o) => o.timestamp.slice(0, 10) === today).length;
  }, [orders]);

  const pendingOrders = useMemo(
    () => orders.filter((o) => o.status === "pending" || o.status === "confirmed").length,
    [orders],
  );

  const balance = useMemo(
    () =>
      orders
        .filter((o) => o.status === "delivered")
        .reduce((total, item) => total + item.amountZMW, 0),
    [orders],
  );

  const stats = [
    { label: "Balance", value: currency.format(balance), icon: Wallet },
    { label: "Today Orders", value: String(todayOrders), icon: ShoppingBag },
    { label: "Pending", value: String(pendingOrders), icon: Clock3 },
    { label: "Products", value: String(products.length), icon: Package },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageHeader title="Vendor Dashboard" subtitle="Quick overview and fast navigation." />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Link href="/vendor/orders">
          <a className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-primary hover:border-primary">
            Orders
          </a>
        </Link>
        <Link href="/vendor/products">
          <a className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-primary hover:border-primary">
            Products
          </a>
        </Link>
        <Link href="/vendor/settings">
          <a className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-primary hover:border-primary">
            Settings
          </a>
        </Link>
      </section>
    </div>
  );
}


