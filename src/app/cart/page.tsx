'use client';

import { useCartStore } from '@/lib/useCartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart, getTotalPrice } = useCartStore();
  const router = useRouter();

  // পরিমাণ বাড়ানো/কমানোর ফাংশন
  const handleQuantityChange = (item: any, change: number) => {
    if (item.quantity + change <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: change });
    }
  };

  // কার্ট খালি থাকলে যা দেখাবে
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">আপনার কার্ট খালি!</h2>
          <p className="text-gray-500 text-sm mb-6">
            আপনি এখনো কোনো খাবার কার্টে যোগ করেননি। মেনু থেকে সুস্বাদু খাবার পছন্দ করুন।
          </p>
          <Link
            href="/all-menu"
            className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition"
          >
            মেনু দেখুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/all-menu" className="p-2 bg-white rounded-xl shadow-xs text-gray-600 hover:text-orange-600 transition">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">আপনার শপিং কার্ট ({cart.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🥘 কার্টের খাবারের তালিকা */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 flex gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || '/placeholder-food.png'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-100 border"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
                    {item.variant && (
                      <p className="text-xs text-orange-600 font-semibold mt-0.5">
                        সাইজ: {item.variant}
                      </p>
                    )}
                    {item.addOns && item.addOns.length > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        এড-অন: {item.addOns.map((a: any) => a.name).join(', ')}
                      </p>
                    )}
                    <p className="font-extrabold text-gray-900 mt-1">৳{item.price}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  {/* রিমুভ বাটন */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1 transition cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <FiTrash2 size={18} />
                  </button>

                  {/* পরিমাণ প্লাস/মাইনাস */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="w-7 h-7 bg-white rounded-md flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 transition"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="px-3 font-bold text-sm text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      className="w-7 h-7 bg-white rounded-md flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 transition"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs font-semibold text-red-500 hover:underline pt-2 cursor-pointer"
            >
              সব খাবার কার্ট থেকে খালি করুন
            </button>
          </div>

          {/* 💳 বিল বিবরণী ও চেকআউট */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">অর্ডারের হিসাব</h2>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>মোট খাবারের দাম</span>
                <span className="font-bold text-gray-800">৳{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-bold text-gray-800">৳৬০</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-gray-900">
                <span>সর্বমোট</span>
                <span className="text-orange-600">৳{getTotalPrice() + 60}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 transition active:scale-95 cursor-pointer mt-2">
                চেকআউট করুন (Proceed to Checkout)
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}