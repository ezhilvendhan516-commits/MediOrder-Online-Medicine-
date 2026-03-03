// ============================================================
// MediOrder - Mock Data
// All sample data for medicines, users, and orders
// ============================================================

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  manufacturer: string;
  dosage: string;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone: string;
  address: string;
  joinDate: string;
}

export interface OrderItem {
  medicineId: string;
  medicineName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  address: string;
  paymentMethod: string;
}

// ---- Medicines ----
export const initialMedicines: Medicine[] = [
  {
    id: "med-001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 4.99,
    stock: 150,
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0cyUyMHBoYXJtYWN5fGVufDF8fHx8MTc3MjU1Mjc4OXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Effective pain and fever relief. Suitable for adults and children over 12. Relieves mild to moderate pain including headaches, toothache, and cold symptoms.",
    manufacturer: "PharmaCo Ltd.",
    dosage: "1-2 tablets every 4-6 hours",
    inStock: true,
  },
  {
    id: "med-002",
    name: "Vitamin C 1000mg",
    category: "Vitamins & Supplements",
    price: 12.99,
    stock: 200,
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzI1Mzk3MjB8MA&ixlib=rb-4.1.0&q=80&w=400",
    description: "High-potency Vitamin C supplement that supports immune function, collagen synthesis, and acts as a powerful antioxidant. Suitable for daily use.",
    manufacturer: "NutriHealth Inc.",
    dosage: "1 tablet daily with food",
    inStock: true,
  },
  {
    id: "med-003",
    name: "Benadryl Cough Syrup",
    category: "Cough & Cold",
    price: 8.49,
    stock: 80,
    image: "https://images.unsplash.com/photo-1577276218751-2ffe1caa4994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VnaCUyMHN5cnVwJTIwbWVkaWNpbmUlMjBib3R0bGV8ZW58MXx8fHwxNzcyNTUyNzg5fDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Multi-symptom cough and cold relief. Soothes throat irritation, suppresses cough, and relieves nasal congestion. Fast-acting formula.",
    manufacturer: "Benadryl Healthcare",
    dosage: "10ml every 4-6 hours, max 4 doses/day",
    inStock: true,
  },
  {
    id: "med-004",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 6.29,
    stock: 120,
    image: "https://images.unsplash.com/photo-1612448071097-a6b55cf216c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWluJTIwcmVsaWVmJTIwaWJ1cHJvZmVuJTIwdGFibGV0fGVufDF8fHx8MTc3MjU1Mjc5MHww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Non-steroidal anti-inflammatory drug (NSAID) for pain relief, fever reduction, and inflammation. Effective for arthritis, backache, and menstrual pain.",
    manufacturer: "MediRelief Corp.",
    dosage: "1 tablet 3 times daily with food",
    inStock: true,
  },
  {
    id: "med-005",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    price: 14.99,
    stock: 60,
    image: "https://images.unsplash.com/photo-1616526628217-c21fd2eef624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpYmlvdGljJTIwYW1veGljaWxsaW4lMjBjYXBzdWxlfGVufDF8fHx8MTc3MjU1Mjc5MHww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Broad-spectrum antibiotic for bacterial infections including respiratory tract, urinary tract, and skin infections. Prescription required.",
    manufacturer: "BioPharm Solutions",
    dosage: "1 capsule 3 times daily for 7-10 days",
    inStock: true,
  },
  {
    id: "med-006",
    name: "Cetirizine 10mg",
    category: "Allergy",
    price: 9.99,
    stock: 90,
    image: "https://images.unsplash.com/photo-1616526629747-c72ee5b45fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxlcmd5JTIwYW50aWhpc3RhbWluZSUyMG1lZGljaW5lfGVufDF8fHx8MTc3MjU1Mjc5NXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Second-generation antihistamine for allergy relief. Treats hay fever, hives, and allergic rhinitis with minimal drowsiness effect.",
    manufacturer: "AllerClear Pharma",
    dosage: "1 tablet daily, preferably in evening",
    inStock: true,
  },
  {
    id: "med-007",
    name: "Amlodipine 5mg",
    category: "Heart Health",
    price: 18.49,
    stock: 45,
    image: "https://images.unsplash.com/photo-1699883430258-785510b807db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwaGVhcnQlMjBtZWRpY2F0aW9ufGVufDF8fHx8MTc3MjU1Mjc5NXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Calcium channel blocker for managing high blood pressure and angina. Helps relax blood vessels and improve blood flow to the heart.",
    manufacturer: "CardioMed Labs",
    dosage: "1 tablet daily at the same time",
    inStock: true,
  },
  {
    id: "med-008",
    name: "First Aid Kit",
    category: "First Aid",
    price: 24.99,
    stock: 35,
    image: "https://images.unsplash.com/photo-1758204054683-6e3a7d552bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGJhbmRhZ2UlMjB3b3VuZCUyMGNhcmV8ZW58MXx8fHwxNzcyNDUyNTMzfDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Complete 50-piece first aid kit with bandages, antiseptic wipes, gauze pads, scissors, and emergency guide. Essential for home and travel.",
    manufacturer: "SafeCare Medical",
    dosage: "For external use",
    inStock: true,
  },
  {
    id: "med-009",
    name: "Digital Thermometer",
    category: "Medical Devices",
    price: 11.99,
    stock: 70,
    image: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVybW9tZXRlciUyMGhlYWx0aCUyMG1vbml0b3JpbmclMjBkZXZpY2V8ZW58MXx8fHwxNzcyNTUyNzk1fDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Accurate digital thermometer with 10-second reading and memory recall. Suitable for oral, rectal, and underarm use. Fever alert feature included.",
    manufacturer: "MediTech Devices",
    dosage: "Medical device",
    inStock: true,
  },
  {
    id: "med-010",
    name: "Omeprazole 20mg",
    category: "Digestive Health",
    price: 10.49,
    stock: 0,
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0cyUyMHBoYXJtYWN5fGVufDF8fHx8MTc3MjU1Mjc4OXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Proton pump inhibitor for treating acid reflux (GERD), stomach ulcers, and heartburn. Reduces stomach acid production effectively.",
    manufacturer: "DigestCare Pharma",
    dosage: "1 capsule daily before meals",
    inStock: false,
  },
  {
    id: "med-011",
    name: "Multivitamin Complex",
    category: "Vitamins & Supplements",
    price: 16.99,
    stock: 180,
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzI1Mzk3MjB8MA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Comprehensive daily multivitamin with 23 essential vitamins and minerals. Supports energy, immunity, and overall wellbeing for adults.",
    manufacturer: "NutriHealth Inc.",
    dosage: "1 tablet daily with breakfast",
    inStock: true,
  },
  {
    id: "med-012",
    name: "Nasal Decongestant Spray",
    category: "Cough & Cold",
    price: 7.99,
    stock: 55,
    image: "https://images.unsplash.com/photo-1577276218751-2ffe1caa4994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VnaCUyMHN5cnVwJTIwbWVkaWNpbmUlMjBib3R0bGV8ZW58MXx8fHwxNzcyNTUyNzg5fDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Fast-acting nasal spray that relieves stuffy nose, congestion and sinus pressure. Works within minutes and lasts up to 12 hours.",
    manufacturer: "ClearBreath Pharma",
    dosage: "2 sprays each nostril, up to 2x daily",
    inStock: true,
  },
];

// ---- Users ----
export const initialUsers: User[] = [
  {
    id: "user-001",
    name: "John Smith",
    email: "john@example.com",
    password: "user123",
    role: "user",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    joinDate: "2024-01-15",
  },
  {
    id: "user-002",
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "user123",
    role: "user",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    joinDate: "2024-02-20",
  },
  {
    id: "user-003",
    name: "Michael Brown",
    email: "michael@example.com",
    password: "user123",
    role: "user",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Road, Chicago, IL 60601",
    joinDate: "2024-03-10",
  },
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@mediorder.com",
    password: "admin123",
    role: "admin",
    phone: "+1 (555) 999-0000",
    address: "MediOrder HQ, San Francisco, CA 94102",
    joinDate: "2023-12-01",
  },
];

// ---- Orders ----
export const initialOrders: Order[] = [
  {
    id: "ord-001",
    userId: "user-001",
    userName: "John Smith",
    items: [
      { medicineId: "med-001", medicineName: "Paracetamol 500mg", price: 4.99, quantity: 2, image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0cyUyMHBoYXJtYWN5fGVufDF8fHx8MTc3MjU1Mjc4OXww&ixlib=rb-4.1.0&q=80&w=400" },
      { medicineId: "med-002", medicineName: "Vitamin C 1000mg", price: 12.99, quantity: 1, image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzI1Mzk3MjB8MA&ixlib=rb-4.1.0&q=80&w=400" },
    ],
    total: 22.97,
    status: "Delivered",
    date: "2025-02-10",
    address: "123 Main Street, New York, NY 10001",
    paymentMethod: "Credit Card",
  },
  {
    id: "ord-002",
    userId: "user-001",
    userName: "John Smith",
    items: [
      { medicineId: "med-004", medicineName: "Ibuprofen 400mg", price: 6.29, quantity: 1, image: "https://images.unsplash.com/photo-1612448071097-a6b55cf216c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWluJTIwcmVsaWVmJTIwaWJ1cHJvZmVuJTIwdGFibGV0fGVufDF8fHx8MTc3MjU1Mjc5MHww&ixlib=rb-4.1.0&q=80&w=400" },
      { medicineId: "med-006", medicineName: "Cetirizine 10mg", price: 9.99, quantity: 2, image: "https://images.unsplash.com/photo-1616526629747-c72ee5b45fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxlcmd5JTIwYW50aWhpc3RhbWluZSUyMG1lZGljaW5lfGVufDF8fHx8MTc3MjU1Mjc5NXww&ixlib=rb-4.1.0&q=80&w=400" },
    ],
    total: 26.27,
    status: "Pending",
    date: "2025-03-01",
    address: "123 Main Street, New York, NY 10001",
    paymentMethod: "PayPal",
  },
  {
    id: "ord-003",
    userId: "user-002",
    userName: "Emily Johnson",
    items: [
      { medicineId: "med-003", medicineName: "Benadryl Cough Syrup", price: 8.49, quantity: 2, image: "https://images.unsplash.com/photo-1577276218751-2ffe1caa4994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VnaCUyMHN5cnVwJTIwbWVkaWNpbmUlMjBib3R0bGV8ZW58MXx8fHwxNzcyNTUyNzg5fDA&ixlib=rb-4.1.0&q=80&w=400" },
      { medicineId: "med-011", medicineName: "Multivitamin Complex", price: 16.99, quantity: 1, image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzI1Mzk3MjB8MA&ixlib=rb-4.1.0&q=80&w=400" },
    ],
    total: 33.97,
    status: "Shipped",
    date: "2025-02-25",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    paymentMethod: "Credit Card",
  },
  {
    id: "ord-004",
    userId: "user-003",
    userName: "Michael Brown",
    items: [
      { medicineId: "med-007", medicineName: "Amlodipine 5mg", price: 18.49, quantity: 1, image: "https://images.unsplash.com/photo-1699883430258-785510b807db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwaGVhcnQlMjBtZWRpY2F0aW9ufGVufDF8fHx8MTc3MjU1Mjc5NXww&ixlib=rb-4.1.0&q=80&w=400" },
      { medicineId: "med-008", medicineName: "First Aid Kit", price: 24.99, quantity: 1, image: "https://images.unsplash.com/photo-1758204054683-6e3a7d552bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGJhbmRhZ2UlMjB3b3VuZCUyMGNhcmV8ZW58MXx8fHwxNzcyNDUyNTMzfDA&ixlib=rb-4.1.0&q=80&w=400" },
    ],
    total: 43.48,
    status: "Processing",
    date: "2025-02-28",
    address: "789 Pine Road, Chicago, IL 60601",
    paymentMethod: "Debit Card",
  },
  {
    id: "ord-005",
    userId: "user-002",
    userName: "Emily Johnson",
    items: [
      { medicineId: "med-005", medicineName: "Amoxicillin 500mg", price: 14.99, quantity: 1, image: "https://images.unsplash.com/photo-1616526628217-c21fd2eef624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpYmlvdGljJTIwYW1veGljaWxsaW4lMjBjYXBzdWxlfGVufDF8fHx8MTc3MjU1Mjc5MHww&ixlib=rb-4.1.0&q=80&w=400" },
    ],
    total: 14.99,
    status: "Delivered",
    date: "2025-01-20",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    paymentMethod: "Credit Card",
  },
];

export const categories = [
  "All",
  "Pain Relief",
  "Vitamins & Supplements",
  "Cough & Cold",
  "Antibiotics",
  "Allergy",
  "Heart Health",
  "Digestive Health",
  "First Aid",
  "Medical Devices",
];
