// ============================================================
// MediOrder - Order History Page
// User's past orders with status badges and details
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Order } from "../data/mockData";

const statusConfig: Record<Order["status"], { color: string; bg: string; dot: string; icon: string }> = {
  Pending: { color: "text-yellow-700", bg: "bg-yellow-100", dot: "bg-yellow-400", icon: "⏳" },
  Processing: { color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-400", icon: "⚙️" },
  Shipped: { color: "text-purple-700", bg: "bg-purple-100", dot: "bg-purple-400", icon: "🚚" },
  Delivered: { color: "text-green-700", bg: "bg-green-100", dot: "bg-green-400", icon: "✅" },
  Cancelled: { color: "text-red-700", bg: "bg-red-100", dot: "bg-red-400", icon: "❌" },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[order.status];

  const steps: Order["status"][] = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={22} className="text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-800">Order #{order.id}</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.icon} {order.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <Clock size={11} />
              {new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-blue-700 font-bold">${order.total.toFixed(2)}</p>
            <p className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Progress Tracker (for non-cancelled orders) */}
      {order.status !== "Cancelled" && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-0">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      i <= currentStep
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs mt-1 whitespace-nowrap ${i <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < currentStep ? "bg-blue-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Details */}
      {expanded && (
        <div className="border-t border-gray-100 p-5">
          {/* Items */}
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Items</h4>
          <div className="space-y-3 mb-5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <img
                  src={item.image}
                  alt={item.medicineName}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.medicineName}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-2 text-gray-600">
              <MapPin size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Delivery Address</p>
                <p>{order.address}</p>
              </div>
            </div>
            <div className="flex gap-2 text-gray-600">
              <CreditCard size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Payment Method</p>
                <p>{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Order Total</span>
            <span className="text-blue-700 font-bold text-lg">${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrderHistory() {
  const { getUserOrders, currentUser } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShoppingBag size={32} className="text-blue-300" />
        </div>
        <h2 className="text-gray-800 mb-2">Sign In Required</h2>
        <p className="text-gray-500 text-sm mb-6">Please sign in to view your order history.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const orders = getUserOrders();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-gray-900">My Orders</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-blue-300" />
          </div>
          <h3 className="text-gray-700 mb-2">No orders yet</h3>
          <p className="text-gray-400 text-sm mb-6">
            Start shopping to see your orders here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Browse Medicines
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
