import { FormEvent, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const orderItems = [
  {
    id: "item-1",
    name: "Powerbeats Pro - Wireless Earphones",
    quantity: 1,
    price: 150.6,
  },
  {
    id: "item-2",
    name: "Smart Watch Active Series",
    quantity: 1,
    price: 249.0,
  },
];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    []
  );
  const shipping = subtotal > 300 ? 0 : 15;
  const total = subtotal + shipping;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderId = `NWC-${Date.now().toString().slice(-6)}`;
    setLocation(`/thank-you?order=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      <Header />
      <main className="container py-6">
        <h1 className="mb-6 text-2xl font-bold text-primary">Checkout</h1>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#DADFE3] bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-primary">Your details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={(event) => setForm((v) => ({ ...v, firstName: event.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={(event) => setForm((v) => ({ ...v, lastName: event.target.value }))}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(event) => setForm((v) => ({ ...v, phone: event.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((v) => ({ ...v, email: event.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  required
                  value={form.address}
                  onChange={(event) => setForm((v) => ({ ...v, address: event.target.value }))}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#DADFE3] bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-primary">Order & payment</h2>

            <div className="space-y-3 border-b border-[#ECF0F4] pb-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-primary">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#7C818B]">Subtotal</span>
                <span className="font-medium text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7C818B]">Shipping</span>
                <span className="font-medium text-primary">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#ECF0F4] pt-2">
                <span className="text-base font-semibold text-primary">Total</span>
                <span className="text-base font-semibold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#F5F7FA] p-3 text-sm text-[#7C818B]">
              Payment method: Card (placeholder)
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-primary px-5 text-sm font-medium text-white hover:bg-[#0d1c6e]"
            >
              Complete Checkout
            </button>
          </section>
        </form>
      </main>
      <Footer />
    </div>
  );
}
