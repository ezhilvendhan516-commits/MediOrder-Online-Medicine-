// ============================================================
// MediOrder - Admin Layout
// Sidebar navigation for admin panel
// ============================================================

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Pill,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Heart,
  Users,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/medicines", label: "Medicines", icon: <Pill size={18} /> },
  { to: "/admin/orders", label: "Orders", icon: <ShoppingBag size={18} /> },
  { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
];

export function AdminLayout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-blue-700/30">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Heart size={18} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">MediOrder</p>
            <p className="text-blue-200 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/20 text-white shadow-md"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
            <ChevronRight size={14} className="ml-auto opacity-60" />
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-blue-700/30">
        {currentUser && (
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/10 rounded-xl">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-blue-200 text-xs truncate">{currentUser.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-gradient-to-b from-blue-800 to-blue-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={22} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-50"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart size={13} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">
              <span className="text-blue-700">Medi</span>
              <span className="text-teal-500">Order</span>
              <span className="text-gray-400 ml-1 font-normal">Admin</span>
            </span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
