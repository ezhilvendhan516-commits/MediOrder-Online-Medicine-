// ============================================================
// MediOrder - Registration Page
// New user registration with full validation
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Heart,
  AlertCircle,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Register() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    else if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setRegisterError("");
    await new Promise((r) => setTimeout(r, 800));
    const success = register(
      form.name.trim(),
      form.email.trim(),
      form.password,
      form.phone,
      form.address
    );
    setLoading(false);
    if (success) {
      navigate("/");
    } else {
      setRegisterError("An account with this email already exists.");
    }
  };

  // Password strength indicator
  const passwordStrength = () => {
    const p = form.password;
    if (!p) return { level: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { level: 2, label: "Fair", color: "bg-yellow-500" };
    return { level: 3, label: "Strong", color: "bg-green-500" };
  };

  const strength = passwordStrength();

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:ring-blue-200 focus:border-blue-400 bg-gray-50"
    }`;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 py-10 bg-slate-50">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart size={26} className="text-white" fill="white" />
            </div>
            <h1 className="text-white mb-1" style={{ fontSize: "1.5rem" }}>Create Account</h1>
            <p className="text-blue-100 text-sm">Join MediOrder for a healthier life</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {registerError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                <AlertCircle size={16} className="flex-shrink-0" />
                {registerError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass("name")}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass("email")}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${inputClass("password")} pr-11`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength indicator */}
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((l) => (
                        <div key={l} className={`h-1.5 flex-1 rounded-full ${strength.level >= l ? strength.color : "bg-gray-200"}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${strength.level === 1 ? "text-red-500" : strength.level === 2 ? "text-yellow-600" : "text-green-600"}`}>
                      {strength.label}
                    </span>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className={`${inputClass("confirmPassword")} pr-11`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <Check size={16} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.confirmPassword}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Phone Number <span className="text-gray-400">(optional)</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass("phone")}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Delivery Address <span className="text-gray-400">(optional)</span></label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <textarea
                    rows={2}
                    placeholder="123 Main Street, City, State ZIP"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
