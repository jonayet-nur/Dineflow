// import React from 'react'

// const AllMenuPage = () => {
//   return (
//     <div>AllMenuPage</div>
//   )
// }

// export default AllMenuPage

// 'use client'
// import FoodCard, { FoodItem } from '@/Components/ui/FoodCard';
// import React, { useEffect, useState } from 'react';
// // import FoodCard, { FoodItem } from './FoodCard'; // FoodCard ফাইলটি সঠিক পাথ অনুযায়ী Import করুন

// const AllMenuPage: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // 🔄 API থেকে খাবার ডাটা ফেচ করা
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-menu`); // আপনার সার্ভার URL দিন
//         const result = await res.json();

//         if (result.success) {
//           setMenuItems(result.data);
//         } else {
//           setError(result.message || 'ডেটা লোড করতে সমস্যা হয়েছে!');
//         }
//       } catch (err: any) {
//         setError('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenu();
//   }, []);

//   // 🛒 কার্টে যুক্ত করার হ্যান্ডলার
//   // const handleAddToCart = (item: FoodItem) => {
//   //   console.log('Cart-এ অ্যাড করা হয়েছে:', item);
//   //   alert(`${item.name} কার্টে যোগ করা হয়েছে!`);
//   // };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* হেডার সেকশন */}
//         <div className="mb-8 text-center sm:text-left">
//           <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             আমাদের সুস্বাদু মেনু 🍔
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             আপনার পছন্দের খাবারটি বেছে নিন এবং অর্ডার করুন খুব সহজেই।
//           </p>
//         </div>

//         {/* ⏳ লোডিং স্টেট */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4 flex flex-col justify-between">
//                 <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
//                 <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
//                 <div className="bg-gray-200 h-3 rounded w-1/2"></div>
//                 <div className="bg-gray-200 h-10 rounded-xl mt-4"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ❌ এরর স্টেট */}
//         {error && !loading && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200 my-10">
//             {error}
//           </div>
//         )}

//         {/* 🍱 ফুড গার্ড গ্রিড (Food Items Grid) */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {menuItems.map((item) => (
//               <FoodCard 
//                 key={item._id} 
//                 item={item} 
//                 // onAddToCart={handleAddToCart} 
//               />
//             ))}
//           </div>
//         )}

//         {/* 📭 ডাটা না থাকলে */}
//         {!loading && !error && menuItems.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-gray-500 text-lg">কোনো খাবারের আইটেম পাওয়া যায়নি!</p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AllMenuPage;

'use client';

import FoodCard, { FoodItem } from '@/Components/ui/FoodCard';
import React, { useEffect, useState, useCallback } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const AllMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Fetch Data
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Standard URL Construction (No string replace needed)
      const apiUrl = new URL('/api/all-menu', BASE_URL).toString();
      const res = await fetch(apiUrl);

      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

      const result = await res.json();

      if (result.success) {
        setMenuItems(result.data || []);
      } else {
        setError(result.message || 'ডেটা লোড করতে সমস্যা হয়েছে!');
      }
    } catch (err: unknown) {
      console.error('Fetch Menu Error:', err);
      const message = err instanceof Error ? err.message : '';
      setError(`সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className=" text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
           Explore our delicious menu
          </h1>
          <p className=" text-center mt-2 text-sm text-gray-600">
            Choose your favorite dish and order it with just a few clicks!
          </p>
        </div>

        {/* ⏳ Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4 flex flex-col justify-between shadow-sm"
              >
                <div className="bg-gray-200 h-40 rounded-xl mb-4" />
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                <div className="bg-gray-200 h-3 rounded w-1/2" />
                <div className="bg-gray-200 h-10 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* ❌ Error State */}
        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200 my-10 max-w-md mx-auto">
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchMenu}
              className="mt-3 bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* 🍱 Food Grid */}
        {!loading && !error && menuItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* 📭 Empty State */}
        {!loading && !error && menuItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">কোনো খাবারের আইটেম পাওয়া যায়নি!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllMenuPage;