import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { Search } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorOrder, VendorOrderStatus } from "@/types/vendor";
import { ORDER_STATUS_LABELS, ORDER_STATUS_OPTIONS } from "@/pages/(vendor)/vendorMeta";

const currency = new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" });

export default function VendorOrders() {
  const { state } = useAuth();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | VendorOrderStatus>("all");

  useEffect(() => {
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.listOrders(ctx).then(setOrders).catch(() => setOrders([]));
  }, [state]);

  const filteredOrders = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const statusMatches = selectedStatus === "all" || order.status === selectedStatus;
      if (!statusMatches) return false;
      if (!normalized) return true;
      return (
        order.orderNumber.toLowerCase().includes(normalized) ||
        order.productName.toLowerCase().includes(normalized) ||
        order.customerName.toLowerCase().includes(normalized)
      );
    });
  }, [orders, searchQuery, selectedStatus]);

  return (
    <div className="space-y-4">
      <DashboardPageHeader title="Orders" subtitle="Search and filter orders by status." />

      <section className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by order number or customer"
            className="pl-9"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              selectedStatus === "all" ? "border-primary bg-primary text-white" : "border-gray-300"
            }`}
            onClick={() => setSelectedStatus("all")}
          >
            All
          </button>
          {ORDER_STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                selectedStatus === status ? "border-primary bg-primary text-white" : "border-gray-300"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {ORDER_STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filteredOrders.map((order) => (
          <Link key={order.id} href={`/vendor/orders/${order.id}`}>
            <a className="block rounded-2xl border border-gray-200 bg-white p-4 hover:border-primary">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">{order.orderNumber}</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>
              <p className="text-sm font-medium text-primary">{order.productName}</p>
              <p className="text-sm text-gray-600">{order.customerName}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">{currency.format(order.amountZMW)}</span>
                <span className="text-gray-500">{new Date(order.timestamp).toLocaleString()}</span>
              </div>
            </a>
          </Link>
        ))}
        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
            No matching orders.
          </div>
        )}
      </section>
    </div>
  );
}


