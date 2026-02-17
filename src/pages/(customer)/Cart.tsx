import { useState } from "react";
import { Link } from "@/lib/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X, ChevronRight, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendor: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "MacBook Air 13-inch, 8GB RAM 256GB SSD Storage – Gold",
      price: 999.0,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
      quantity: 1,
      vendor: "beagle",
    },
    {
      id: "2",
      name: "Powerbeats Pro – Totally Wireless Earphones – Ivory",
      price: 249.0,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
      quantity: 2,
      vendor: "Casual",
    },
    {
      id: "3",
      name: "Galaxy Watch Active 2 Aluminum Smart Watch",
      price: 249.0,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop",
      quantity: 1,
      vendor: "Truffles",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      toast.info("Coupon feature coming soon");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#fff]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white">
          <div className="container py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <a className="text-[#7C818B] hover:text-[#11248F]">Home</a>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#DADFE3]" />
              <span className="text-primary font-medium">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="container py-6">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <ShoppingBag className="h-20 w-20 mx-auto text-[#DADFE3] mb-4" />
              <h2 className="text-xl font-bold text-primary mb-2">Your cart is empty</h2>
              <p className="text-sm text-[#7C818B] mb-6">Add some products to get started</p>
              <Link href="/shop">
                <a className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                  Continue Shopping
                </a>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-[#DADFE3]">
                    <h1 className="text-lg font-bold text-primary">
                      Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                    </h1>
                    <button
                      onClick={clearCart}
                      className="flex items-center gap-1 text-sm text-[#7C818B] hover:text-[#D8125D] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Cart
                    </button>
                  </div>

                  {/* Table Header - Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#DADFE3] text-xs font-medium text-[#7C818B] uppercase">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-[#ECF0F4] last:border-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product */}
                        <div className="md:col-span-6 flex gap-4">
                          <Link href={`/product/${item.id}`}>
                            <a className="w-20 h-20 bg-[#F5F5F7] rounded-2xl overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </a>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.id}`}>
                              <a className="text-sm font-medium text-primary hover:text-[#11248F] line-clamp-2">
                                {item.name}
                              </a>
                            </Link>
                            <p className="text-xs text-[#7C818B] mt-1">Sold by {item.vendor}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="md:hidden flex items-center gap-1 text-xs text-[#D8125D] mt-2"
                            >
                              <X className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-2 text-center">
                          <span className="md:hidden text-xs text-[#7C818B] mr-2">Price:</span>
                          <span className="text-sm font-medium text-primary">K{item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex justify-center">
                          <div className="flex items-center border border-[#DADFE3] rounded-2xl">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#7C818B] hover:bg-[#fff] transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#7C818B] hover:bg-[#fff] transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                          <span className="text-sm font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="hidden md:flex w-8 h-8 items-center justify-center text-[#7C818B] hover:text-[#D8125D] hover:bg-[#FFF5F5] rounded-2xl transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Continue Shopping */}
                  <div className="p-4">
                    <Link href="/shop">
                      <a className="inline-flex items-center gap-2 text-sm text-[#11248F] hover:underline">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Continue Shopping
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-[120px]">
                  <h2 className="text-lg font-bold text-primary mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7C818B]">Subtotal</span>
                      <span className="font-medium text-primary">K{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7C818B]">Shipping</span>
                      <span className="font-medium text-primary">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7C818B]">Tax (10%)</span>
                      <span className="font-medium text-primary">K{tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-[#DADFE3] pt-3">
                      <div className="flex justify-between">
                        <span className="text-base font-bold text-primary">Total</span>
                        <span className="text-xl font-bold text-[#D8125D]">K{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-primary mb-2 block">Coupon Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="h-10 border-[#DADFE3] text-sm focus-visible:ring-[#11248F]"
                      />
                      <button
                        onClick={applyCoupon}
                        className="h-10 px-4 border border-[#DADFE3] text-sm font-medium text-primary rounded-2xl hover:bg-[#fff] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <a className="inline-flex w-full h-12 items-center justify-center bg-primary text-white text-sm font-medium rounded-2xl hover:bg-[#0d1c6e] transition-colors">
                      Proceed to Checkout
                    </a>
                  </Link>

                  {/* Free Shipping Notice */}
                  {subtotal < 50 && (
                    <p className="text-xs text-center text-[#7C818B] mt-4">
                      Add <span className="font-medium text-[#D8125D]">K{(50 - subtotal).toFixed(2)}</span> more to get free shipping
                    </p>
                  )}

                  {/* Secure Payment */}
                  <div className="mt-6 pt-4 border-t border-[#DADFE3]">
                    <p className="text-xs text-center text-[#7C818B]">
                      Secure checkout powered by Stripe
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-[#fff] text-xs text-primary rounded">VISA</span>
                      <span className="px-2 py-1 bg-[#fff] text-xs text-primary rounded">MC</span>
                      <span className="px-2 py-1 bg-[#fff] text-xs text-primary rounded">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

