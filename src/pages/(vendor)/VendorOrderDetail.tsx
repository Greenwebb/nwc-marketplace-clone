import { useEffect, useState } from "react";
import { Link, useRoute } from "@/lib/router";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorOrder } from "@/types/vendor";
import { ORDER_STATUS_LABELS } from "@/pages/(vendor)/vendorMeta";

const currency = new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" });

export default function VendorOrderDetail() {
  const { state } = useAuth();
  const [, params] = useRoute("/vendor/orders/:orderId");
  const [order, setOrder] = useState<VendorOrder | null>(null);

  useEffect(() => {
    if (!params?.orderId) return;
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.getOrderById(ctx, params.orderId).then(setOrder).catch(() => setOrder(null));
  }, [state, params?.orderId]);

  if (!order) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">Order not found.</div>;
  }

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4">
        <h1 className="text-lg font-bold text-primary">{order.orderNumber}</h1>
        <p className="text-sm text-gray-600">
          {ORDER_STATUS_LABELS[order.status]} · Updated {new Date(order.lastUpdated).toLocaleString()}
        </p>
      </header>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-primary">Order Summary</h2>
          <p className="text-sm text-gray-700">{order.productName}</p>
          <p className="text-sm text-gray-700">Qty: {order.quantity}</p>
          <p className="text-sm font-semibold text-primary">{currency.format(order.amountZMW)}</p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-primary">Customer Information</h2>
          <p className="text-sm text-gray-700">{order.customerName}</p>
          <p className="text-sm text-gray-700">{order.customerPhone}</p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-primary">Delivery Information</h2>
          <p className="text-sm text-gray-700">Method: {order.deliveryMethod}</p>
          <p className="text-sm text-gray-700">Location: {order.deliveryLocation}</p>
          <p className="text-sm text-gray-700">Cost: {currency.format(order.deliveryCostZMW)}</p>
        </article>
      </section>

      <Link href={`/vendor/orders/${order.id}/status`}>
        <a className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
          Update Status
        </a>
      </Link>
    </div>
  );
}


