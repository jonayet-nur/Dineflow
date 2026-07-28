// 'use client';

// import { useEffect, useState } from 'react';
// import { FiPackage, FiClock } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // dynamic URL fallback
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
//         const res = await fetch(`${baseUrl}/api/orders`);

//         if (!res.ok) {
//           throw new Error(`Server returned status: ${res.status}`);
//         }

//         const data = await res.json();
//         if (data.success) {
//           setOrders(data.data || []);
//         }
//       } catch (error) {
//         console.error('Fetch orders error:', error);
//         toast.error('অর্ডার ডেটা লোড করতে ব্যর্থ হয়েছে!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-28 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-28 pb-16 bg-gray-50 px-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
//         <FiPackage className="text-orange-600" /> আমার অর্ডারসমূহ (My Orders)
//       </h1>

//       {orders.length === 0 ? (
//         <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 text-gray-500">
//           আপনার কোনো পূর্বের অর্ডার পাওয়া যায়নি।
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
//               <div className="flex justify-between items-center border-b pb-3 mb-3">
//                 <div>
//                   <span className="text-xs font-bold text-gray-400">ID: {order._id?.slice(-6)}</span>
//                   <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
//                     <FiClock size={12} /> {order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD') : ''}
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 capitalize">
//                   {order.status || 'Pending'}
//                 </span>
//               </div>

//               <div className="space-y-1 mb-3">
//                 {order.items?.map((item: any, i: number) => (
//                   <div key={i} className="flex justify-between text-xs text-gray-700">
//                     <span>{item.name} x {item.quantity}</span>
//                     <span>৳{item.price * item.quantity}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between items-center pt-2 border-t text-sm font-extrabold text-gray-900">
//                 <span>মোট বিল:</span>
//                 <span className="text-orange-600">৳{order.totalAmount}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }