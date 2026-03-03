// ============================================================
// MediOrder - Admin Orders Management
// View all orders, update status, and filter by status
// ============================================================

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Package,
  Clock,
  Filter,
  MapPin,
  CreditCard,
  User,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Order } from "../../data/mockData";

const statusOptions: Order["status"][] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusConfig: Record<
  Order["status"],
  { color: string; bg: string; dot: string }
> = {
  Pending: { color: "text-yellow-700", bg: "bg-yellow-100", dot: "bg-yellow-400" },
  Processing: { color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-400" },
  Shipped: { color: "text-purple-700", bg: "bg-purple-100", dot: "bg-purple-400" },
  Delivered: { color: "text-green-700", bg: "bg-green-100", dot: "bg-green-400" },
  Cancelled: { color: "text-red-700", bg: "bg-red-100", dot: "bg-red-400" },
};

function OrderRow({ order }: { order: Order }) {
  const { updateOrderStatus } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const status = statusConfig[order.status];

  const handleStatusChange = async (newStatus: Order["status"]) => {
    setUpdatingStatus(true);
    await new Promise((r) => setTimeout(r, 400));
    updateOrderStatus(order.id, newStatus);
    setUpdatingStatus(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5">
        {/* Order ID + User */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">#{order.id}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <User size={10} />
              {order.userName}
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={12} />
          {new Date(order.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {/* Items count */}
        <div className="text-xs text-gray-500 hidden sm:block">
          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
        </div>

        {/* Status dropdown */}
        <div className="relative">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as Order["status"])}
            disabled={updatingStatus}
            className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer transition-all ${status.bg} ${status.color} ${updatingStatus ? "opacity-60" : ""}`}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={11} className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${status.color}`} />
        </div>

        {/* Total */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-gray-800">${order.total.toFixed(2)}</p>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Items */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Items Ordered
              </p>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.medicineName}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.medicineName}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Order Info
              </p>
              <div className="flex gap-2">
                <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Delivery Address</p>
                  <p className="text-sm text-gray-700">{order.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <CreditCard size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Payment</p>
                  <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Change Buttons */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick Status Update:</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={order.status === s || updatingStatus}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        order.status === s
                          ? `${statusConfig[s].bg} ${statusConfig[s].color} opacity-100 ring-2 ring-offset-1 ring-current`
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminOrders() {
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | Order["status"]>("All");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.userName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Stats
  const stats = statusOptions.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-gray-800 text-2xl font-bold">Orders</h1>
        <p className="text-gray-500 text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statusOptions.map((s) => {
          const conf = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s === filterStatus ? "All" : s)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                filterStatus === s
                  ? `${conf.bg} border-current ${conf.color}`
                  : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className={`flex items-center gap-1.5 mb-1 ${filterStatus === s ? conf.color : "text-gray-500"}`}>
                <span className={`w-2 h-2 rounded-full ${conf.dot}`} />
                <span className="text-xs font-medium">{s}</span>
              </div>
              <p className={`text-2xl font-bold ${filterStatus === s ? conf.color : "text-gray-800"}`}>
                {stats[s] || 0}
              </p>
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer"
            >
              <option value="All">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <Package size={36} className="mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400 text-sm">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
