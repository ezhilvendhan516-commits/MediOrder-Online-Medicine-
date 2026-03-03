// ============================================================
// MediOrder - Routes Configuration
// React Router Data Mode setup with protected routes
// ============================================================

import React from "react";
import { createBrowserRouter, redirect } from "react-router";

import { UserLayout } from "./layouts/UserLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderHistory } from "./pages/OrderHistory";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminMedicines } from "./pages/admin/AdminMedicines";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminUsers } from "./pages/admin/AdminUsers";

// Helper to check if user is authenticated admin (reads from localStorage)
const requireAdmin = () => {
  const user = JSON.parse(localStorage.getItem("mediorder_user") || "null");
  if (!user || user.role !== "admin") {
    return redirect("/admin/login");
  }
  return null;
};

// Helper to check if user is authenticated
const requireAuth = () => {
  const user = JSON.parse(localStorage.getItem("mediorder_user") || "null");
  if (!user) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  // ---- User Routes ----
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "cart", Component: Cart },
      {
        path: "checkout",
        loader: requireAuth,
        Component: Checkout,
      },
      {
        path: "order-history",
        Component: OrderHistory,
      },
    ],
  },

  // ---- Admin Routes ----
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      {
        path: "",
        loader: requireAdmin,
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: AdminDashboard },
          { path: "medicines", Component: AdminMedicines },
          { path: "orders", Component: AdminOrders },
          { path: "users", Component: AdminUsers },
        ],
      },
    ],
  },

  // ---- 404 Catch-all ----
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-8xl font-bold text-blue-100">404</p>
          <h2 className="text-gray-700 mt-2">Page Not Found</h2>
          <p className="text-gray-400 text-sm mt-2 mb-6">The page you're looking for doesn't exist.</p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm">
            Back to Home
          </a>
        </div>
      </div>
    ),
  },
]);