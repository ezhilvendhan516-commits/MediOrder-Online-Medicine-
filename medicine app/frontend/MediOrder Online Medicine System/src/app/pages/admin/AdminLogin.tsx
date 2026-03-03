// ============================================================
// MediOrder - Admin Login Page
// Secure admin authentication
// ============================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AdminLogin() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "admin@mediorder.com", password: "admin123" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    const success = login(form.email, form.password);
    setLoading(false);
    if (success) {
      // Check if user is admin
      const allUsers = JSON.parse(localStorage.getItem("mediorder_users") || "[]");
      const user = allUsers.find((u: any) => u.email === form.email);
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Admin privileges required.");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-white/10">
              <ShieldCheck size={30} className="text-white" />
            </div>
            <h1 className="text-white" style={{ fontSize: "1.5rem" }}>Admin Panel</h1>
            <p className="text-blue-300 text-sm mt-1">MediOrder Administration</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Demo credentials badge */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-center">
              <p className="text-xs text-amber-700 font-medium">
                Demo: <span className="font-mono">admin@mediorder.com</span> / <span className="font-mono">admin123</span>
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    placeholder="admin@mediorder.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Access Admin Panel
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-gray-100 mt-6 pt-5 text-center">
              <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to MediOrder Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
