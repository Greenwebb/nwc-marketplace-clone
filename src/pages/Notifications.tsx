import { useState } from "react";
import { Bell, Package, CreditCard, ShieldCheck, Info } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "payment" | "security" | "info";
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Order Confirmed",
    message: "Your order #ORD-2024-012 has been confirmed and is being processed.",
    time: "2 minutes ago",
    read: false,
    type: "order",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment of ZMW 1,250.00 has been received for order #ORD-2024-011.",
    time: "1 hour ago",
    read: false,
    type: "payment",
  },
  {
    id: "3",
    title: "Security Alert",
    message: "A new device was used to sign in to your account.",
    time: "3 hours ago",
    read: true,
    type: "security",
  },
  {
    id: "4",
    title: "New Feature",
    message: "You can now track your deliveries in real-time from the orders page.",
    time: "1 day ago",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Order Shipped",
    message: "Your order #ORD-2024-010 has been shipped via Newworld Cargo Logistics.",
    time: "2 days ago",
    read: true,
    type: "order",
  },
];

const TYPE_ICON = {
  order: Package,
  payment: CreditCard,
  security: ShieldCheck,
  info: Info,
};

const TYPE_COLOR = {
  order: "bg-blue-50 text-blue-600",
  payment: "bg-green-50 text-green-600",
  security: "bg-amber-50 text-amber-600",
  info: "bg-gray-100 text-gray-600",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="space-y-4">
      <DashboardPageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
      />

      {/* Actions */}
      <div className="flex items-center justify-end">
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-primary font-medium hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="bg-white rounded-2xl divide-y divide-gray-100 overflow-hidden">
        {notifications.map((notification) => {
          const Icon = TYPE_ICON[notification.type];
          const colorClass = TYPE_COLOR[notification.type];
          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => markRead(notification.id)}
              className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-gray-50 ${
                !notification.read ? "bg-primary/[0.02]" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${!notification.read ? "text-primary" : "text-gray-700"}`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </button>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
