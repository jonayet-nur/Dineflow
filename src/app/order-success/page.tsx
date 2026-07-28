// 'use client';

// import Link from 'next/link';
// import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';

// export default function OrderSuccessPage() {
//   return (
//     <div className="min-h-screen pt-28 pb-16 bg-gray-50 flex items-center justify-center px-4">
//       <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        
//         {/* Animated Check Icon */}
//         <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
//           <FiCheckCircle size={48} />
//         </div>

//         <h1 className="text-2xl font-black text-gray-900 mb-2">
//           অর্ডার সফল হয়েছে! 🎉
//         </h1>
        
//         <p className="text-gray-600 text-sm mb-6 leading-relaxed">
//           ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি এটি প্রস্তুত করে আপনার দেওয়া ঠিকানায় পৌঁছে দেবে।
//         </p>

//         <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8 text-left text-xs text-orange-900 space-y-1">
//           <p className="font-bold">💡 পেমেন্ট টাইপ: Cash on Delivery</p>
//           <p>খাবার হাতে পাওয়ার পর রাইডারকে টাকা বুঝিয়ে দিন।</p>
//         </div>

//         {/* Buttons */}
//         <div className="space-y-3">
//           <Link
//             href="/all-menu"
//             className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95"
//           >
//             <FiShoppingBag size={18} />
//             আরও খাবার অর্ডার করুন
//           </Link>

//           <Link
//             href="/"
//             className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition"
//           >
//             <FiHome size={18} />
//             হোম পেজে ফিরে যান
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiShoppingBag, FiHome, FiMapPin, FiClock } from 'react-icons/fi';

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // 💡 Hydration Fix: useEffect এর ভেতর ডাইনামিক ডেটা সেট করলে Hydration error হবে না
    setOrderDetails({
      orderId: '#FF-' + Math.floor(100000 + Math.random() * 900000),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [
        { name: 'চিকেন বার্গার (Special)', qty: 2, price: 360 },
        { name: 'কোকাকোলা (500ml)', qty: 1, price: 40 },
      ],
      totalAmount: 460,
      address: 'মিরপুর ১০, ব্লক-ডি, ঢাকা',
    });
    setMounted(true);
  }, []);

  // ক্লায়েন্টে রেন্ডার না হওয়া পর্যন্ত লোডিং ব্যাকঅফ রাখা
  if (!mounted || !orderDetails) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 max-w-lg w-full text-center">
        
        {/* Check Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle size={40} />
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-1">
          অর্ডার সফল হয়েছে! 🎉
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।
        </p>

        {/* 📦 অর্ডার আইডি ও সময় (এখন এটি Hydration Safe) */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left mb-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 border-b pb-2">
            <span>অর্ডার আইডি: <strong className="text-gray-800">{orderDetails.orderId}</strong></span>
            <span className="flex items-center gap-1"><FiClock /> {orderDetails.time}</span>
          </div>

          {/* খাবারের তালিকা */}
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-bold text-gray-700">খাবারের আইটেম:</p>
            {orderDetails.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between text-xs text-gray-600">
                <span>{item.name} x {item.qty}</span>
                <span className="font-semibold text-gray-800">৳{item.price}</span>
              </div>
            ))}
          </div>

          {/* ঠিকানা ও বিল */}
          <div className="border-t pt-2 space-y-1">
            <div className="flex items-start gap-1 text-xs text-gray-600">
              <FiMapPin className="mt-0.5 text-orange-600 shrink-0" />
              <span className="line-clamp-1">{orderDetails.address}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-black text-gray-900 pt-1">
              <span>সর্বমোট প্রদেয় বিল:</span>
              <span className="text-orange-600">৳{orderDetails.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* 💡 পেমেন্ট নোট */}
        <div className="bg-orange-50 border border-orange-100 p-3.5 rounded-xl mb-6 text-left text-xs text-orange-900">
          <p className="font-bold">💡 পেমেন্ট টাইপ: Cash on Delivery</p>
          <p className="text-orange-800 mt-0.5">খাবার হাতে পাওয়ার পর রাইডারকে টাকা বুঝিয়ে দিন।</p>
        </div>

        {/* 🔘 বাটনসমূহ */}
        <div className="space-y-3">
          <Link
            href="/my-orders"
            className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95"
          >
            <FiShoppingBag size={18} />
            অর্ডার ট্র্যাক করুন (My Orders)
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition text-sm"
          >
            <FiHome size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}
