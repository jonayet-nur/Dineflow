// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  foodId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string | null;
  addOns?: { name: string; price: string }[];
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // 🛒 কার্টে আইটেম যোগ করার লজিক
      addToCart: (newItem) => {
        const currentCart = get().cart;
        
        // চেক করা হচ্ছে একই খাবার, একই ভ্যারিয়েন্ট ও এড-অন দিয়ে আগে যোগ করা হয়েছে কিনা
        const existingIndex = currentCart.findIndex(
          (item) =>
            item.foodId === newItem.foodId &&
            item.variant === newItem.variant &&
            JSON.stringify(item.addOns) === JSON.stringify(newItem.addOns)
        );

        if (existingIndex > -1) {
          // যদি একই আইটেম থাকে, তবে Quantity বাড়িয়ে দেওয়া হবে
          const updatedCart = [...currentCart];
          updatedCart[existingIndex].quantity += newItem.quantity;
          set({ cart: updatedCart });
        } else {
          // নতুন আইটেম হলে অ্যারিতে পুশ করা হবে
          set({ cart: [...currentCart, newItem] });
        }
      },

      // ❌ কার্ট থেকে আইটেম রিমুভ
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      // 🧹 কার্ট সম্পূর্ণ খালি করা
      clearCart: () => set({ cart: [] }),

      // 🔢 মোট কতগুলো খাবার কার্টে আছে (Navbar Badge-এর জন্য)
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      // 💰 মোট অর্ডারের দাম
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'food-cart-storage', // LocalStorage Key Name
      storage: createJSONStorage(() => localStorage),
    }
  )
);