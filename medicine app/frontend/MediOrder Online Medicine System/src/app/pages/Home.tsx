// ============================================================
// MediOrder - Home Page
// Hero section, category filter, and medicine grid
// ============================================================

import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search,
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Star,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { MedicineCard } from "../components/MedicineCard";
import { categories } from "../data/mockData";

export function Home() {
  const { medicines } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredMedicines = useMemo(() => {
    let result = medicines;

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((m) => m.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.manufacturer.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [medicines, searchQuery, selectedCategory, sortBy]);

  const features = [
    { icon: <Shield size={22} className="text-blue-600" />, title: "Verified Medicines", desc: "All products are pharmacy-grade certified" },
    { icon: <Truck size={22} className="text-teal-600" />, title: "Fast Delivery", desc: "Same-day delivery to your doorstep" },
    { icon: <Clock size={22} className="text-purple-600" />, title: "24/7 Support", desc: "Round the clock customer assistance" },
    { icon: <Star size={22} className="text-orange-500" />, title: "Top Rated", desc: "4.9★ rated by over 50,000 customers" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Star size={13} fill="white" />
              Trusted by 50,000+ customers
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.2 }}>
              Your Health,{" "}
              <span className="text-yellow-300">Our Priority</span>
            </h1>
            <p className="text-blue-100 mb-8 text-lg">
              Order medicines online with confidence. Quality products, competitive prices, delivered right to your door.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-lg">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines, vitamins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-sm"
                />
              </div>
              <button className="px-5 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-xl font-medium transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap text-sm">
                Search
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["Pain Relief", "Vitamins", "Antibiotics", "Allergy"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat === "Vitamins" ? "Vitamins & Supplements" : cat);
                    document.getElementById("medicines-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-full transition-all backdrop-blur-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicines Section */}
      <section id="medicines-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-gray-900">Our Medicines</h2>
            <p className="text-gray-500 text-sm mt-1">
              {filteredMedicines.length} product{filteredMedicines.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <aside className="lg:w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white font-medium shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Mobile search (extra) */}
            <div className="mb-5 relative lg:hidden">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {filteredMedicines.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-gray-700 mb-2">No medicines found</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontSize: "1.8rem" }}>
            Need a Prescription Filled?
          </h2>
          <p className="text-teal-100 mb-7 text-base">
            Upload your prescription and our pharmacists will verify and process your order within 2 hours.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors shadow-lg text-sm"
          >
            Get Started Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
