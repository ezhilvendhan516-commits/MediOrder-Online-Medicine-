// ============================================================
// MediOrder - User Layout
// Wraps all user-facing pages with Navbar + Footer
// ============================================================

import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

export function UserLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                  <Heart size={15} className="text-white" fill="white" />
                </div>
                <span className="font-bold text-gray-900">
                  <span className="text-blue-700">Medi</span>
                  <span className="text-teal-500">Order</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your trusted online pharmacy for quality medicines and healthcare products delivered to your door.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="/cart" className="hover:text-blue-600 transition-colors">Cart</a></li>
                <li><a href="/order-history" className="hover:text-blue-600 transition-colors">Order History</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Pain Relief</li>
                <li>Vitamins & Supplements</li>
                <li>Cough & Cold</li>
                <li>Antibiotics</li>
                <li>Allergy</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-500" />
                  +1 (800) MEDI-ORD
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-500" />
                  support@mediorder.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  San Francisco, CA 94102
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-400">© 2026 MediOrder. All rights reserved.</p>
            <p className="text-xs text-gray-400">Made with ❤️ for better healthcare</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
