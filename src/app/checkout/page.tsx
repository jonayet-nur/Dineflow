
// 'use client';

// import { useState, useEffect } from 'react';
// import { useCartStore } from '@/lib/useCartStore';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FiArrowLeft, FiShoppingBag, FiTruck, FiFileText, FiCheckCircle } from 'react-icons/fi';
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

//   // Hydration fix for Next.js Client Component
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const subTotal = mounted ? getTotalPrice() : 0;
//   const deliveryFee = cart.length > 0 ? 60 : 0;
//   const totalAmount = subTotal + deliveryFee;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitOrder = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (cart.length === 0) {
//       toast.error('Your cart is empty!');
//       return;
//     }

//     setLoading(true);

//     const orderPayload = {
//       customerName: formData.name.trim(),
//       phone: formData.phone.trim(),
//       address: formData.address.trim(),
//       notes: formData.notes.trim(),
//       paymentMethod: 'Cash on Delivery',
//       items: cart.map(({ foodId, name, price, quantity, variant, addOns }) => ({
//         foodId,
//         name,
//         price,
//         quantity,
//         variant: variant || null,
//         addOns: addOns || [],
//       })),
//       subTotal,
//       deliveryFee,
//       totalAmount,
//       status: 'pending',
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
//       const endpoint = `${baseUrl.replace(/\/$/, '')}/api/orders`;

//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderPayload),
//       });

//       const responseData = await res.json().catch(() => null);

//       if (res.ok) {
//         toast.success('🎉 Order placed successfully!');
//         clearCart();
//         router.push('/order-success');
//       } else {
//         toast.error(responseData?.message || 'Failed to place order. Please try again!');
//       }
//     } catch (error) {
//       console.error('Order Submit Error:', error);
//       toast.error('Unable to connect to the server. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Empty Cart State
//   if (mounted && cart.length === 0) {
//     return (
//       <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiShoppingBag size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty!</h2>
//           <p className="text-gray-500 text-sm mb-6">
//             Please select items from the menu before proceeding to checkout.
//           </p>
//           <Link
//             href="/all-menu"
//             className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition"
//           >
//             Explore Menu
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Top Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <Link 
//             href="/cart" 
//             className="p-2 bg-white rounded-xl shadow-xs text-gray-600 hover:text-orange-600 transition"
//             aria-label="Back to Cart"
//           >
//             <FiArrowLeft size={20} />
//           </Link>
//           <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* Shipping Form */}
//           <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6">
//             <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
//               <FiTruck className="text-orange-600" /> Delivery Details
//             </h2>

//             <form onSubmit={handleSubmitOrder} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="e.g., John Doe"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="017XXXXXXXX"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="address" className="block text-xs font-bold text-gray-700 mb-1">
//                   Delivery Address <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   required
//                   rows={3}
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="House/Road no., Area, City..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div>

//               {/* <div>
//                 <label htmlFor="notes" className="block text-xs font-bold text-gray-700 mb-1">
//                   Order Notes <span className="text-gray-400 font-normal">(Optional)</span>
//                 </label>
//                 <input
//                   id="notes"
//                   name="notes"
//                   type="text"
//                   value={formData.notes}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Less spicy, call before delivery..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 />
//               </div> */}

//               {/* Payment Method Notice */}
//               <div className="pt-2">
//                 <label className="block text-xs font-bold text-gray-700 mb-2">
//                   Payment Method
//                 </label>
//                 <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 flex items-center justify-between text-emerald-900">
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">💵</span>
//                     <div>
//                       <p className="font-bold text-sm">Cash on Delivery</p>
//                       <p className="text-xs text-emerald-700">Pay cash upon receiving your order</p>
//                     </div>
//                   </div>
//                   <FiCheckCircle className="text-emerald-600 text-xl shrink-0" />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4 border-t border-gray-100">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2">
//                       <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing Order...
//                     </span>
//                   ) : (
//                     `Confirm Order • ৳${totalAmount}`
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-gray-100 h-fit space-y-4">
//             <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
//               <FiFileText className="text-orange-600" /> Order Summary ({cart.length})
//             </h2>

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

//             <div className="space-y-2 text-sm text-gray-600 pt-2 border-t">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="font-bold text-gray-800">৳{subTotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 <span className="font-bold text-gray-800">৳{deliveryFee}</span>
//               </div>
//               <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-gray-900">
//                 <span>Total Amount</span>
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = mounted ? getTotalPrice() : 0;
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const totalAmount = subTotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setLoading(true);

    const orderPayload = {
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
      paymentMethod: 'Cash on Delivery',
      items: cart.map(({ foodId, name, price, quantity, variant, addOns }) => ({
        foodId,
        name,
        price,
        quantity,
        variant: variant || null,
        addOns: addOns || [],
      })),
      subTotal,
      deliveryFee,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      const endpoint = `${baseUrl.replace(/\/$/, '')}/api/orders`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const responseData = await res.json().catch(() => null);

      if (res.ok) {
        // 🔑 আসল অর্ডারের সকল তথ্য sessionStorage-এ সেভ করা হচ্ছে
        const completedOrderData = {
          orderId: responseData?.data?._id || responseData?.orderId || `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            variant: item.variant || null,
          })),
          subTotal,
          deliveryFee,
          totalAmount,
          address: formData.address.trim(),
          createdAt: new Date().toISOString(),
        };

        sessionStorage.setItem('latestOrder', JSON.stringify(completedOrderData));

        toast.success('🎉 Order placed successfully!');
        clearCart(); // কার্ট ক্লিয়ার করার আগে sessionStorage-এ ডাটা রাখা হয়েছে
        router.push('/order-success');
      } else {
        toast.error(responseData?.message || 'Failed to place order. Please try again!');
      }
    } catch (error) {
      console.error('Order Submit Error:', error);
      toast.error('Unable to connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (mounted && cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Please select items from the menu before proceeding to checkout.
          </p>
          <Link
            href="/all-menu"
            className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link 
            href="/cart" 
            className="p-2 bg-white rounded-xl shadow-xs text-gray-600 hover:text-orange-600 transition"
          >
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FiTruck className="text-orange-600" /> Delivery Details
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House/Road no., Area, City..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Order Notes <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  name="notes"
                  type="text"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g., Less spicy, call before delivery..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div> */}

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">Payment Method</label>
                <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-bold text-sm">Cash on Delivery</p>
                      <p className="text-xs text-emerald-700">Pay cash upon receiving your order</p>
                    </div>
                  </div>
                  <FiCheckCircle className="text-emerald-600 text-xl shrink-0" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing Order...' : `Confirm Order • ৳${totalAmount}`}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-gray-100 h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
              <FiFileText className="text-orange-600" /> Order Summary ({cart.length})
            </h2>

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

            <div className="space-y-2 text-sm text-gray-600 pt-2 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">৳{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-800">৳{deliveryFee}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-gray-900">
                <span>Total Amount</span>
                <span className="text-orange-600 text-lg">৳{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}