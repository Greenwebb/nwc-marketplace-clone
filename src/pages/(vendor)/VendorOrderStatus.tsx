import { useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "@/lib/router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { buildVendorRequestContext } from "@/services/auth/requestContext";
import { mockVendorRepository } from "@/services/repositories/mockVendorRepository";
import type { VendorOrder, VendorOrderStatus } from "@/types/vendor";
import { ORDER_STATUS_LABELS, ORDER_STATUS_OPTIONS } from "@/pages/(vendor)/vendorMeta";

const allowedTransitions: Record<VendorOrderStatus, VendorOrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["ready", "cancelled"],
  ready: ["out_for_delivery", "delivered", "cancelled"],
  out_for_delivery: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export default function VendorOrderStatus() {
  const { state } = useAuth();
  const [, params] = useRoute("/vendor/orders/:orderId/status");
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<VendorOrder | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<VendorOrderStatus | "">("");

  useEffect(() => {
    if (!params?.orderId) return;
    const ctx = buildVendorRequestContext(state);
    mockVendorRepository.getOrderById(ctx, params.orderId).then((found) => {
      setOrder(found);
      setSelectedStatus(found ? found.status : "");
    }).catch(() => setOrder(null));
  }, [state, params?.orderId]);

  const availableStatuses = useMemo(() => {
    if (!order) return ORDER_STATUS_OPTIONS;
    return [order.status, ...allowedTransitions[order.status]];
  }, [order]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!order || !params?.orderId || !selectedStatus) return;
    const ctx = buildVendorRequestContext(state);
    try {
      const updated = await mockVendorRepository.updateOrderStatus(ctx, params.orderId, selectedStatus);
      if (!updated) {
        toast.error("Unable to update status.");
        return;
      }
      toast.success("Order status updated.");
      setLocation(`/vendor/orders/${params.orderId}`);
    } catch {
      toast.error("Invalid status transition.");
    }
  };

  if (!order) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">Order not found.</div>;
  }

  return (
    <form className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4" onSubmit={handleSubmit}>
      <header>
        <h1 className="text-lg font-bold text-primary">Update Status</h1>
        <p className="text-sm text-gray-600">Current status: {ORDER_STATUS_LABELS[order.status]}</p>
      </header>

      <div className="space-y-2">
        {availableStatuses.map((status) => (
          <label key={status} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="status"
              value={status}
              checked={selectedStatus === status}
              onChange={() => setSelectedStatus(status)}
            />
            {ORDER_STATUS_LABELS[status]}
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
          onClick={() => setLocation(`/vendor/orders/${order.id}`)}
        >
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
          Update
        </button>
      </div>
    </form>
  );
}


