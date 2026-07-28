

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

      // 🛒 কার্টে আইটেম যোগ করার লজিক (Immutability Fixed)
      addToCart: (newItem) => {
        const currentCart = get().cart;

        const existingIndex = currentCart.findIndex(
          (item) =>
            item.foodId === newItem.foodId &&
            item.variant === newItem.variant &&
            JSON.stringify(item.addOns) === JSON.stringify(newItem.addOns)
        );

        if (existingIndex > -1) {
          // Object Mutation ছাড়াই নতুন অবজেক্ট তৈরি করে আপডেট
          const updatedCart = currentCart.map((item, index) => {
            if (index === existingIndex) {
              return {
                ...item,
                quantity: item.quantity + newItem.quantity,
              };
            }
            return item;
          });
          set({ cart: updatedCart });
        } else {
          set({ cart: [...currentCart, newItem] });
        }
      },

      // ❌ কার্ট থেকে আইটেম রিমুভ
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      // 🧹 কার্ট সম্পূর্ণ খালি করা
      clearCart: () => set({ cart: [] }),

      // 🔢 মোট কতগুলো খাবার কার্টে আছে
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      // 💰 মোট অর্ডারের দাম
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'food-cart-storage',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : undefined),
    }
  )
);