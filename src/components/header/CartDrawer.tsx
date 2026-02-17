import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";

export type HeaderCartItem = {
  id: number;
  name: string;
  store: string;
  price: number;
  quantity: number;
  image: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  cartItems: HeaderCartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onDecreaseItem: (id: number) => void;
  onIncreaseItem: (id: number) => void;
};

export function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onRemoveItem,
  onDecreaseItem,
  onIncreaseItem,
}: CartDrawerProps) {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      return;
    }

    const timeout = setTimeout(() => setIsRendered(false), 300);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between  px-6 py-5">
          <h2 className="text-xl font-semibold text-primary">Shopping Cart ({cartItems.length})</h2>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-primary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center text-primary">
              <ShoppingCart className="mb-4 h-14 w-14 text-gray-300" />
              <p>No products in the cart.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex gap-3">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 line-clamp-2 text-sm font-medium text-primary">{item.name}</h3>
                      <p className="mb-2 text-xs text-primary">
                        Store: <span className="font-medium">{item.store}</span>
                      </p>
                      <p className="text-base font-semibold text-primary">${item.price.toFixed(2)}</p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="self-start p-1 text-primary transition-colors hover:text-[#d8125d]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-2xl border border-gray-300">
                      <button
                        onClick={() => onDecreaseItem(item.id)}
                        className="px-3 py-1 text-primary transition-colors hover:bg-gray-50"
                      >
                        -
                      </button>
                      <Input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-10 border-x border-gray-300 py-1 text-center text-sm font-medium text-primary"
                      />
                      <button
                        onClick={() => onIncreaseItem(item.id)}
                        className="px-3 py-1 text-primary transition-colors hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-4 px-6 py-5">
            <div className="flex items-center justify-between text-base">
              <span className="text-primary">
                Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
              </span>
              <span className="text-xl font-semibold text-primary">
                ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>

            <Link href="/checkout">
              <a onClick={onClose} className="inline-flex w-full rounded-2xl bg-[#172a9c] py-3 font-medium text-white transition-colors hover:bg-[#122385] items-center justify-center">
                Checkout
              </a>
            </Link>

            <Link href="/cart">
              <a onClick={onClose} className="block text-center font-medium text-[#172a9c] hover:underline">
                View Cart
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
