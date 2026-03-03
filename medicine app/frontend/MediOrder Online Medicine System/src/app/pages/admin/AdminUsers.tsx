// ============================================================
// MediOrder - Admin Users Management
// View registered users and their details
// ============================================================

import { useState } from "react";
import { Search, Users, User, Mail, Phone, MapPin, Calendar, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AdminUsers() {
  const { users, orders } = useApp();
  const [search, setSearch] = useState("");

  const regularUsers = users.filter((u) => u.role === "user");
  const admins = users.filter((u) => u.role === "admin");

  const filtered = regularUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getUserOrderCount = (userId: string) =>
    orders.filter((o) => o.userId === userId).length;

  const getUserTotalSpend = (userId: string) =>
    orders
      .filter((o) => o.userId === userId && o.status === "Delivered")
      .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-gray-800 text-2xl font-bold">Users</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {regularUsers.length} registered users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users size={22} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{regularUsers.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <ShieldCheck size={22} className="text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Admin Accounts</p>
            <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <User size={22} className="text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Buyers</p>
            <p className="text-2xl font-bold text-gray-800">
              {regularUsers.filter((u) => getUserOrderCount(u.id) > 0).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user) => {
          const orderCount = getUserOrderCount(user.id);
          const totalSpend = getUserTotalSpend(user.id);
          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    <User size={9} />
                    Customer
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs line-clamp-2">{user.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="text-xs">
                    Joined {new Date(user.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-100 mt-4 pt-4 grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600">{orderCount}</p>
                  <p className="text-xs text-gray-400">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">${totalSpend.toFixed(0)}</p>
                  <p className="text-xs text-gray-400">Spent</p>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Users size={32} className="mx-auto mb-2 text-gray-200" />
            <p className="text-gray-400 text-sm">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
