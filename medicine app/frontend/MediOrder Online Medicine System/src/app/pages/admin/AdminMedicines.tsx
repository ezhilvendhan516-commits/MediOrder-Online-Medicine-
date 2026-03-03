// ============================================================
// MediOrder - Admin Medicines Management
// Full CRUD: Add, Edit, Delete medicines + stock management
// ============================================================

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  AlertTriangle,
  Package,
  Filter,
  Save,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Medicine, categories } from "../../data/mockData";

type ModalMode = "add" | "edit" | null;

const emptyForm: Omit<Medicine, "id"> = {
  name: "",
  category: "Pain Relief",
  price: 0,
  stock: 0,
  image: "",
  description: "",
  manufacturer: "",
  dosage: "",
  inStock: true,
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

export function AdminMedicines() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useApp();

  const [modal, setModal] = useState<ModalMode>(null);
  const [editingMed, setEditingMed] = useState<Medicine | null>(null);
  const [form, setForm] = useState<Omit<Medicine, "id">>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Filter medicines
  const filtered = medicines.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "All" || m.category === filterCategory;
    return matchSearch && matchCat;
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.category) errs.category = "Category is required";
    if (form.price <= 0) errs.price = "Price must be greater than 0";
    if (form.stock < 0) errs.stock = "Stock cannot be negative";
    if (!form.manufacturer.trim()) errs.manufacturer = "Manufacturer is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.dosage.trim()) errs.dosage = "Dosage is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingMed(null);
    setModal("add");
  };

  const handleOpenEdit = (med: Medicine) => {
    setForm({ ...med });
    setErrors({});
    setEditingMed(med);
    setModal("edit");
  };

  const handleClose = () => {
    setModal(null);
    setEditingMed(null);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const medData = {
      ...form,
      image: form.image || DEFAULT_IMAGE,
      inStock: form.stock > 0,
    };
    if (modal === "add") {
      addMedicine(medData);
    } else if (modal === "edit" && editingMed) {
      updateMedicine(editingMed.id, medData);
    }
    setSaving(false);
    handleClose();
  };

  const handleDelete = (id: string) => {
    deleteMedicine(id);
    setDeleteConfirm(null);
  };

  const handleStockUpdate = (id: string, newStock: number) => {
    if (newStock < 0) return;
    updateMedicine(id, { stock: newStock, inStock: newStock > 0 });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:ring-blue-200 focus:border-blue-400 bg-gray-50"
    }`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-800 text-2xl font-bold">Medicines</h1>
          <p className="text-gray-500 text-sm mt-0.5">{medicines.length} total medicines</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm text-sm"
        >
          <Plus size={16} />
          Add Medicine
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or manufacturer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
            />
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 appearance-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Medicine</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Stock</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    <Package size={32} className="mx-auto mb-2 text-gray-200" />
                    No medicines found
                  </td>
                </tr>
              ) : (
                filtered.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={med.image}
                          alt={med.name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{med.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{med.manufacturer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {med.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-gray-800">${med.price.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4">
                      {/* Inline stock editor */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStockUpdate(med.id, med.stock - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all text-xs"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-gray-700">{med.stock}</span>
                        <button
                          onClick={() => handleStockUpdate(med.id, med.stock + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-200 hover:text-green-500 transition-all text-xs"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {med.stock === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-600">
                          <X size={10} /> Out of Stock
                        </span>
                      ) : med.stock <= 20 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600">
                          <AlertTriangle size={10} /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-600">
                          <Check size={10} /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(med)}
                          className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        {deleteConfirm === med.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(med.id)}
                              className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                              <Check size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(med.id)}
                            className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-gray-800 font-bold">{modal === "add" ? "Add New Medicine" : "Edit Medicine"}</h2>
              <button onClick={handleClose} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Image Preview */}
              {form.image && (
                <div className="w-full h-40 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Medicine Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass("name")}
                    placeholder="e.g. Paracetamol 500mg"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Manufacturer */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Manufacturer *</label>
                  <input
                    type="text"
                    value={form.manufacturer}
                    onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                    className={inputClass("manufacturer")}
                    placeholder="e.g. PharmaCo Ltd."
                  />
                  {errors.manufacturer && <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Price ($) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className={inputClass("price")}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Stock Quantity *</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                    className={inputClass("stock")}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                </div>

                {/* Dosage */}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Dosage Instructions *</label>
                  <input
                    type="text"
                    value={form.dosage}
                    onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                    className={inputClass("dosage")}
                    placeholder="e.g. 1-2 tablets every 4-6 hours"
                  />
                  {errors.dosage && <p className="text-red-500 text-xs mt-1">{errors.dosage}</p>}
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Description *</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputClass("description")} resize-none`}
                    placeholder="Detailed product description..."
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">
                    Image URL <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className={inputClass("image")}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {saving ? (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Save size={15} />
                )}
                {saving ? "Saving..." : modal === "add" ? "Add Medicine" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
