// ============================================================
// MediOrder - Global App Context
// Manages all application state: auth, cart, medicines, orders
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Medicine,
  User,
  Order,
  OrderItem,
  initialMedicines,
  initialUsers,
  initialOrders,
} from "../data/mockData";

// ---- Types ----
export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface AppContextType {
  // Auth
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string, address: string) => boolean;
  logout: () => void;

  // Medicines
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, "id">) => void;
  updateMedicine: (id: string, updates: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (medicineId: string) => void;
  updateCartQuantity: (medicineId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  placeOrder: (address: string, paymentMethod: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getUserOrders: () => Order[];
}

// ---- Create Context ----
const AppContext = createContext<AppContextType | null>(null);

// ---- Provider ----
export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mediorder_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("mediorder_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem("mediorder_medicines");
    return saved ? JSON.parse(saved) : initialMedicines;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mediorder_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("mediorder_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("mediorder_user", JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem("mediorder_users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("mediorder_medicines", JSON.stringify(medicines));
  }, [medicines]);
  useEffect(() => {
    localStorage.setItem("mediorder_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("mediorder_orders", JSON.stringify(orders));
  }, [orders]);

  // ---- Auth ----
  const login = (email: string, password: string): boolean => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ): boolean => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      phone,
      address,
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  // ---- Medicines ----
  const addMedicine = (medicine: Omit<Medicine, "id">) => {
    const newMed: Medicine = { ...medicine, id: `med-${Date.now()}` };
    setMedicines((prev) => [...prev, newMed]);
  };

  const updateMedicine = (id: string, updates: Partial<Medicine>) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  // ---- Cart ----
  const addToCart = (medicine: Medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ---- Orders ----
  const placeOrder = (address: string, paymentMethod: string): Order | null => {
    if (!currentUser || cart.length === 0) return null;

    const items: OrderItem[] = cart.map((item) => ({
      medicineId: item.medicine.id,
      medicineName: item.medicine.name,
      price: item.medicine.price,
      quantity: item.quantity,
      image: item.medicine.image,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      items,
      total: cartTotal,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      address,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const getUserOrders = (): Order[] => {
    if (!currentUser) return [];
    return orders.filter((o) => o.userId === currentUser.id);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        medicines,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        updateOrderStatus,
        getUserOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ---- Custom Hook ----
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
