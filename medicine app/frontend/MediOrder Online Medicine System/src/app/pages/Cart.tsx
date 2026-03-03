// ============================================================
// MediOrder - Shopping Cart Page
// Cart items, quantity controls, price summary
// ============================================================

import { Link, useNavigate } from "react-router";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Package,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Cart() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, currentUser } = useApp();
  const navigate = useNavigate();

  const shipping = cartTotal > 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={40} className="text-blue-300" />
        </div>
        <h2 className="text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-8">
          Looks like you haven't added any medicines yet. Browse our catalog to find what you need.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <ArrowLeft size={16} />
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-1">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={15} />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free shipping banner */}
          {cartTotal < 50 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-blue-700">
              <Tag size={15} />
              Add <strong>${(50 - cartTotal).toFixed(2)}</strong> more for FREE shipping!
            </div>
          )}
          {cartTotal >= 50 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-green-700">
              <Package size={15} />
              🎉 You've qualified for FREE shipping!
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.medicine.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                  src={item.medicine.image}
                  alt={item.medicine.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-gray-900 text-sm font-semibold line-clamp-1">
                      {item.medicine.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.medicine.manufacturer}</p>
                    <span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mt-1">
                      {item.medicine.category}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.medicine.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Price & Qty */}
                <div className="flex items-center justify-between mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                    <button
                      onClick={() => updateCartQuantity(item.medicine.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.medicine.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all shadow-sm"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-blue-700 font-bold text-lg">
                      ${(item.medicine.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      ${item.medicine.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-gray-900 text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span className="text-blue-700 text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-5 flex gap-2 justify-center">
              {["💳", "🏦", "📱"].map((icon, i) => (
                <div key={i} className="w-10 h-7 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-sm">
                  {icon}
                </div>
              ))}
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-5 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              🔒 Secure checkout · 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
