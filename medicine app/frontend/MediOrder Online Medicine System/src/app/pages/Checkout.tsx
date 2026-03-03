// ============================================================
// MediOrder - Checkout Page
// Address, payment selection, and order placement
// ============================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  MapPin,
  CreditCard,
  Check,
  Package,
  ArrowLeft,
  ShieldCheck,
  Banknote,
  Smartphone,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Order } from "../data/mockData";

type Step = "details" | "success";

export function Checkout() {
  const { cart, cartTotal, currentUser, placeOrder } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("details");
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const [form, setForm] = useState({
    fullName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "Credit Card",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.zip.trim()) errs.zip = "ZIP code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const fullAddress = `${form.address}, ${form.city}, ${form.state} ${form.zip}`;
    const order = placeOrder(fullAddress, form.paymentMethod);
    setLoading(false);
    if (order) {
      setPlacedOrder(order);
      setStep("success");
    }
  };

  const paymentOptions = [
    { id: "Credit Card", icon: <CreditCard size={18} />, label: "Credit Card" },
    { id: "Debit Card", icon: <Banknote size={18} />, label: "Debit Card" },
    { id: "PayPal", icon: <Smartphone size={18} />, label: "PayPal" },
    { id: "Cash on Delivery", icon: <Package size={18} />, label: "Cash on Delivery" },
  ];

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:ring-blue-200 focus:border-blue-400 bg-gray-50"
    }`;

  // ---- Success State ----
  if (step === "success" && placedOrder) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Success animation */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-green-50">
              <Check size={36} className="text-green-600" strokeWidth={3} />
            </div>
            <h1 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>Order Placed! 🎉</h1>
            <p className="text-gray-500 text-sm mb-6">
              Your order has been successfully placed and is now being processed.
            </p>

            {/* Order Info */}
            <div className="bg-blue-50 rounded-2xl p-5 text-left mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Order ID</span>
                <span className="text-sm font-mono text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full">
                  #{placedOrder.id}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm text-yellow-700 bg-yellow-100 px-3 py-0.5 rounded-full font-medium">
                  ⏳ Pending
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Total Paid</span>
                <span className="text-sm font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment</span>
                <span className="text-sm text-gray-700">{form.paymentMethod}</span>
              </div>
            </div>

            {/* Items summary */}
            <div className="text-left mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Items Ordered</p>
              <div className="space-y-2">
                {placedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-600">
                    <span>{item.medicineName} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                to="/order-history"
                className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-center"
              >
                View Orders
              </Link>
              <Link
                to="/"
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Shop More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Checkout Form ----
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/cart" className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-gray-900">Checkout</h1>
          <p className="text-gray-400 text-sm mt-0.5">Complete your order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Delivery Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <h2 className="text-gray-800">Delivery Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass("fullName")}
                  placeholder="John Smith"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass("phone")}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-1.5">Street Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputClass("address")}
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={inputClass("city")}
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">State *</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputClass("state")}
                  placeholder="NY"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">ZIP Code *</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className={inputClass("zip")}
                  placeholder="10001"
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard size={16} className="text-green-600" />
              </div>
              <h2 className="text-gray-800">Payment Method</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setForm({ ...form, paymentMethod: opt.id })}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl transition-all text-left ${
                    form.paymentMethod === opt.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className={form.paymentMethod === opt.id ? "text-blue-600" : "text-gray-400"}>
                    {opt.icon}
                  </div>
                  <span className="text-sm font-medium">{opt.label}</span>
                  {form.paymentMethod === opt.id && (
                    <Check size={14} className="ml-auto text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-gray-800 mb-5">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div key={item.medicine.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.medicine.image} alt={item.medicine.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.medicine.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">${(item.medicine.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
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

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>
                  <ShieldCheck size={17} />
                  Place Order · ${grandTotal.toFixed(2)}
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              🔒 Your payment info is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
