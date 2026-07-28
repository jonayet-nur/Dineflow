'use client';

import { useCartStore } from '@/lib/useCartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { FaFileShield } from 'react-icons/fa6';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag, FiShield,  } from 'react-icons/fi';

export default function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart, getTotalPrice } = useCartStore();
  const router = useRouter();

  // Function to handle quantity increments/decrements
  const handleQuantityChange = (item: (typeof cart)[number], change: number) => {
    if (item.quantity + change <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: change });
    }
  };

  // Empty cart fallback state
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50/50">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xs border border-gray-100 text-center max-w-md w-full transition-all">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <FiShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Your Cart is Empty!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            You have not added any items to your cart yet. Explore our delicious menu to get started!
          </p>
          <Link
            href="/all-menu"
            className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold py-3.5 rounded-2xl transition duration-200 shadow-md shadow-orange-600/20"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link 
              href="/all-menu" 
              className="p-2.5 bg-white rounded-2xl shadow-xs border border-gray-100 text-gray-600 hover:text-orange-600 hover:border-orange-100 transition"
              aria-label="Back to menu"
            >
              <FiArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
              <p className="text-xs text-gray-500 font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition hover:border-gray-200"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image || '/placeholder-food.png'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-2xl bg-gray-100 border border-gray-100 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800 text-base leading-snug">{item.name}</h3>
                    {item.variant && (
                      <p className="text-xs text-orange-600 font-semibold">
                        Size: {item.variant}
                      </p>
                    )}
                    {item.addOns && item.addOns.length > 0 && (
                      <p className="text-xs text-gray-400">
                        Add-ons: {item.addOns.map((a: any) => a.name).join(', ')}
                      </p>
                    )}
                    <p className="font-black text-gray-900 text-base pt-0.5">৳{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls & Actions */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-gray-100/80 rounded-xl p-1 border border-gray-200/50">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 active:scale-95 transition cursor-pointer"
                      title="Decrease"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="px-3 font-bold text-sm text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 active:scale-95 transition cursor-pointer"
                      title="Increase"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-gray-100 space-y-5">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-gray-800">৳60</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-orange-600">
                    ৳{getTotalPrice() + 60}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full pt-2">
                <button className="w-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-600/20 transition cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <BsFillShieldLockFill size={16} className="text-emerald-500" />
              <span>Safe & Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}