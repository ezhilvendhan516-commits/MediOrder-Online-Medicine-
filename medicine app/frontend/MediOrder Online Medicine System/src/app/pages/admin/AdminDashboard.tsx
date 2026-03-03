// ============================================================
// MediOrder - Admin Dashboard
// Overview stats, recent orders, and low stock alerts
// ============================================================

import { Link } from "react-router";
import {
  Users,
  ShoppingBag,
  Pill,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  ArrowRight,
  Package,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Order } from "../../data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const statusConfig: Record<Order["status"], { color: string; bg: string }> = {
  Pending: { color: "text-yellow-700", bg: "bg-yellow-100" },
  Processing: { color: "text-blue-700", bg: "bg-blue-100" },
  Shipped: { color: "text-purple-700", bg: "bg-purple-100" },
  Delivered: { color: "text-green-700", bg: "bg-green-100" },
  Cancelled: { color: "text-red-700", bg: "bg-red-100" },
};

// Mock revenue data for chart
const revenueData = [
  { month: "Oct", revenue: 1240 },
  { month: "Nov", revenue: 1890 },
  { month: "Dec", revenue: 2340 },
  { month: "Jan", revenue: 1780 },
  { month: "Feb", revenue: 2560 },
  { month: "Mar", revenue: 2980 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export function AdminDashboard() {
  const { medicines, orders, users } = useApp();

  const totalRevenue = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const lowStockMeds = medicines.filter((m) => m.stock > 0 && m.stock <= 20);
  const outOfStock = medicines.filter((m) => m.stock === 0);

  const recentOrders = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  // Category distribution for pie chart
  const categoryData = medicines.reduce((acc, med) => {
    const existing = acc.find((c) => c.name === med.category);
    if (existing) existing.value++;
    else acc.push({ name: med.category, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[]);

  const statCards = [
    {
      label: "Total Users",
      value: users.filter((u) => u.role === "user").length,
      icon: <Users size={22} />,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      link: "/admin/users",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: <ShoppingBag size={22} />,
      color: "from-teal-500 to-teal-600",
      bg: "bg-teal-50",
      textColor: "text-teal-600",
      change: "+8%",
      link: "/admin/orders",
    },
    {
      label: "Total Medicines",
      value: medicines.length,
      icon: <Pill size={22} />,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+3%",
      link: "/admin/medicines",
    },
    {
      label: "Revenue (Delivered)",
      value: `$${totalRevenue.toFixed(0)}`,
      icon: <DollarSign size={22} />,
      color: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+18%",
      link: "/admin/orders",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-800 text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-medium">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center ${card.textColor}`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp size={12} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">{card.change}</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-gray-800 font-semibold">Revenue Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months earnings</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              +18% growth
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(v) => [`$${v}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-gray-800 font-semibold mb-1">Categories</h3>
          <p className="text-xs text-gray-400 mb-4">Medicine distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span style={{ fontSize: 10, color: "#6b7280" }}>{value}</span>}
              />
              <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-gray-800 font-semibold">Recent Orders</h3>
            <Link
              to="/admin/orders"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Package size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.userName}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-gray-800 font-semibold">Stock Alerts</h3>
            <Link
              to="/admin/medicines"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Manage <ArrowRight size={13} />
            </Link>
          </div>
          {outOfStock.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">
                Out of Stock ({outOfStock.length})
              </p>
              <div className="space-y-2">
                {outOfStock.map((med) => (
                  <div
                    key={med.id}
                    className="flex items-center gap-2 p-2.5 bg-red-50 rounded-xl"
                  >
                    <AlertTriangle size={13} className="text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-700 font-medium line-clamp-1">{med.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {lowStockMeds.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-2">
                Low Stock ({lowStockMeds.length})
              </p>
              <div className="space-y-2">
                {lowStockMeds.slice(0, 5).map((med) => (
                  <div
                    key={med.id}
                    className="flex items-center justify-between p-2.5 bg-orange-50 rounded-xl"
                  >
                    <p className="text-xs text-orange-800 font-medium line-clamp-1 flex-1">{med.name}</p>
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                      {med.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {outOfStock.length === 0 && lowStockMeds.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package size={20} className="text-green-500" />
              </div>
              <p className="text-sm text-gray-500">All stocks look good!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
