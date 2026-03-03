// ============================================================
// MediOrder - Medicine Card Component
// Displays medicine details with Add to Cart functionality
// ============================================================

import { ShoppingCart, Tag, AlertCircle, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Medicine } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

interface MedicineCardProps {
  medicine: Medicine;
}

const categoryColors: Record<string, string> = {
  "Pain Relief": "bg-orange-100 text-orange-700",
  "Vitamins & Supplements": "bg-green-100 text-green-700",
  "Cough & Cold": "bg-sky-100 text-sky-700",
  "Antibiotics": "bg-red-100 text-red-700",
  "Allergy": "bg-purple-100 text-purple-700",
  "Heart Health": "bg-pink-100 text-pink-700",
  "Digestive Health": "bg-yellow-100 text-yellow-700",
  "First Aid": "bg-teal-100 text-teal-700",
  "Medical Devices": "bg-blue-100 text-blue-700",
};

export function MedicineCard({ medicine }: MedicineCardProps) {
  const { addToCart, currentUser, cart } = useApp();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const isInCart = cart.some((item) => item.medicine.id === medicine.id);
  const colorClass = categoryColors[medicine.category] || "bg-gray-100 text-gray-600";

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (!medicine.inStock || medicine.stock === 0) return;
    addToCart(medicine);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-48">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Out of stock overlay */}
        {(!medicine.inStock || medicine.stock === 0) && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-red-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <AlertCircle size={12} />
              Out of Stock
            </span>
          </div>
        )}
        {/* Stock badge */}
        {medicine.inStock && medicine.stock > 0 && medicine.stock <= 20 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            Only {medicine.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 w-fit ${colorClass}`}>
          <Tag size={10} />
          {medicine.category}
        </span>

        {/* Name */}
        <h3 className="text-gray-900 font-semibold mb-1 line-clamp-1">{medicine.name}</h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-1">{medicine.description}</p>

        {/* Dosage */}
        <p className="text-xs text-gray-400 mb-3 italic">{medicine.dosage}</p>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <span className="text-2xl font-bold text-blue-700">${medicine.price.toFixed(2)}</span>
            <p className="text-xs text-gray-400">{medicine.manufacturer}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!medicine.inStock || medicine.stock === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
              !medicine.inStock || medicine.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : added || isInCart
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check size={15} />
                Added
              </>
            ) : isInCart ? (
              <>
                <Check size={15} />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
