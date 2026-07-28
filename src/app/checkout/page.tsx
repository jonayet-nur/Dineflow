
// 'use client';

// import { useState, useEffect } from 'react';
// import { useCartStore } from '@/lib/useCartStore';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FiArrowLeft, FiShoppingBag, FiTruck, FiFileText } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// export default function CheckoutPage() {
//   const { cart, getTotalPrice, clearCart } = useCartStore();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     notes: '',
//   });

//   // Hydration Fix for Next.js Client Component
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const subTotal = mounted ? getTotalPrice() : 0;
//   const deliveryFee = cart.length > 0 ? 60 : 0;
//   const totalAmount = subTotal + deliveryFee;

//   const handleSubmitOrder = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (cart.length === 0) {
//       toast.error('আপনার কার্ট খালি!');
//       return;
//     }

//     setLoading(true);

//     const orderPayload = {
//       customerName: formData.name.trim(),
//       phone: formData.phone.trim(),
//       address: formData.address.trim(),
//       notes: formData.notes.trim(),
//       items: cart.map((item) => ({
//         foodId: item.foodId,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         variant: item.variant || null,
//         addOns: item.addOns || [],
//       })),
//       subTotal,
//       deliveryFee,
//       totalAmount,
//       status: 'pending',
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       // API Base URL Detection
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
//       const cleanUrl = `${baseUrl.replace(/\/$/, '')}/api/orders`;

//       const res = await fetch(cleanUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderPayload),
//       });

//       const responseData = await res.json().catch(() => null);

//       if (res.ok) {
//         toast.success('🎉 আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে!');
        
//         // 🧹 Clear Store & LocalStorage Cart
//         clearCart(); 

//         // 🚀 Redirect to Order Success Page
//         router.push('/order-success');
//       } else {
//         toast.error(responseData?.message || 'অর্ডার করতে সমস্যা হয়েছে, আবার চেষ্টা করুন!');
//       }
//     } catch (error) {
//       console.error('Order Submit Error:', error);
//       toast.error('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🛒 কার্ট খালি থাকলে রিটার্ন ভিউ
//   if (mounted && cart.length === 0) {
//     return (
//       <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiShoppingBag size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">কার্টে কোনো খাবার নেই!</h2>
//           <p className="text-gray-500 text-sm mb-6">
//             অর্ডার কনফার্ম করার আগে দয়া করে মেনু থেকে খাবার সিলেক্ট করুন।
//           </p>
//           <Link
//             href="/all-menu"
//             className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition"
//           >
//             মেনু দেখুন
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Top Navigation */}
//         <div className="flex items-center gap-3 mb-6">
//           <Link href="/cart" className="p-2 bg-white rounded-xl shadow-xs text-gray-600 hover:text-orange-600 transition">
//             <FiArrowLeft size={20} />
//           </Link>
//           <h1 className="text-2xl font-black text-gray-900">চেকআউট (Checkout)</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* 📝 Shipping Info Form (Left Side) */}
//           <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
//               <FiTruck className="text-orange-600" /> ডেলিভারির বিবরণ
//             </h2>

//             <form onSubmit={handleSubmitOrder} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">
//                   আপনার নাম <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="যেমন: সাকিব হাসান"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">
//                   মোবাইল নম্বর <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   placeholder="017XXXXXXXX"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">
//                   সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   required
//                   rows={3}
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   placeholder="বাসা/রোড নম্বর, এলাকা, থানা..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">
//                   বিশেষ বার্তা (Special Notes)
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   placeholder="যেমন: ঝাল কম দিয়েন, কল দিয়ে আসবেন..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div className="pt-4 border-t border-gray-100">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2">
//                       <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                       অর্ডার প্রসেস হচ্ছে...
//                     </span>
//                   ) : (
//                     `অর্ডার নিশ্চিত করুন • ৳${totalAmount}`
//                   )}
//                 </button>
//                 <p className="text-center text-xs text-gray-400 mt-3">
//                   💵 ক্যাশ অন ডেলিভারি (খাবার পেয়ে পেমেন্ট করুন)
//                 </p>
//               </div>
//             </form>
//           </div>

//           {/* 🧾 Order Summary (Right Side) */}
//           <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-gray-100 h-fit space-y-4">
//             <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
//               <FiFileText className="text-orange-600" /> অর্ডারের সামারি ({cart.length})
//             </h2>

//             {/* Item List */}
//             <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
//                   <div>
//                     <p className="font-bold text-gray-800">{item.name}</p>
//                     <p className="text-xs text-gray-500">
//                       ৳{item.price} x {item.quantity} {item.variant ? `(${item.variant})` : ''}
//                     </p>
//                   </div>
//                   <span className="font-bold text-gray-900">৳{item.price * item.quantity}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Calculations */}
//             <div className="space-y-2 text-sm text-gray-600 pt-2 border-t">
//               <div className="flex justify-between">
//                 <span>খাবারের সাবটোটাল</span>
//                 <span className="font-bold text-gray-800">৳{subTotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>ডেলিভারি চার্জ</span>
//                 <span className="font-bold text-gray-800">৳{deliveryFee}</span>
//               </div>
//               <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-gray-900">
//                 <span>সর্বমোট বিল</span>
//                 <span className="text-orange-600 text-lg">৳{totalAmount}</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/useCartStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiShoppingBag, FiTruck, FiFileText, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  // Hydration Fix for Next.js Client Component
  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = mounted ? getTotalPrice() : 0;
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const totalAmount = subTotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('আপনার কার্ট খালি!');
      return;
    }

    setLoading(true);

    const orderPayload = {
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
      paymentMethod: 'Cash on Delivery',
      items: cart.map((item) => ({
        foodId: item.foodId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant || null,
        addOns: item.addOns || [],
      })),
      subTotal,
      deliveryFee,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      // API Base URL Detection
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      const cleanUrl = `${baseUrl.replace(/\/$/, '')}/api/orders`;

      const res = await fetch(cleanUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const responseData = await res.json().catch(() => null);

      if (res.ok) {
        toast.success('🎉 আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে!');
        
        // 🧹 Clear Store & LocalStorage Cart
        clearCart(); 

        // 🚀 Redirect to Order Success Page
        router.push('/order-success');
      } else {
        toast.error(responseData?.message || 'অর্ডার করতে সমস্যা হয়েছে, আবার চেষ্টা করুন!');
      }
    } catch (error) {
      console.error('Order Submit Error:', error);
      toast.error('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি!');
    } finally {
      setLoading(false);
    }
  };

  // 🛒 কার্ট খালি থাকলে রিটার্ন ভিউ
  if (mounted && cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">কার্টে কোনো খাবার নেই!</h2>
          <p className="text-gray-500 text-sm mb-6">
            অর্ডার কনফার্ম করার আগে দয়া করে মেনু থেকে খাবার সিলেক্ট করুন।
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
      <div className="max-w-4xl mx-auto">
        
        {/* Top Navigation */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/cart" className="p-2 bg-white rounded-xl shadow-xs text-gray-600 hover:text-orange-600 transition">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-gray-900">চেকআউট (Checkout)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 📝 Shipping Info Form (Left Side) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FiTruck className="text-orange-600" /> ডেলিভারির বিবরণ
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: সাকিব হাসান"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="বাসা/রোড নম্বর, এলাকা, থানা..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  বিশেষ বার্তা (Special Notes)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="যেমন: ঝাল কম দিয়েন, কল দিয়ে আসবেন..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* 💵 Payment Method Display (Fixed as Cash on Delivery) */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  পেমেন্ট পদ্ধতি
                </label>
                <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-bold text-sm">Cash on Delivery (ক্যাশ অন ডেলিভারি)</p>
                      <p className="text-xs text-emerald-700">খাবার হাতে পাওয়ার পর মূল্য পরিশোধ করুন</p>
                    </div>
                  </div>
                  <FiCheckCircle className="text-emerald-600 text-xl shrink-0" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      অর্ডার প্রসেস হচ্ছে...
                    </span>
                  ) : (
                    `অর্ডার নিশ্চিত করুন • ৳${totalAmount}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 🧾 Order Summary (Right Side) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-gray-100 h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FiFileText className="text-orange-600" /> অর্ডারের সামারি ({cart.length})
            </h2>

            {/* Item List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                  <div>
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      ৳{item.price} x {item.quantity} {item.variant ? `(${item.variant})` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-sm text-gray-600 pt-2 border-t">
              <div className="flex justify-between">
                <span>খাবারের সাবটোটাল</span>
                <span className="font-bold text-gray-800">৳{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-bold text-gray-800">৳{deliveryFee}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-gray-900">
                <span>সর্বমোট বিল</span>
                <span className="text-orange-600 text-lg">৳{totalAmount}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}