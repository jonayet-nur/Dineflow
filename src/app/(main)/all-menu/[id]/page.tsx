// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'next/navigation';

// // Types Definition
// export interface Variant {
//   name: string;
//   price: string;
// }

// export interface AddOn {
//   name: string;
//   price: string;
// }

// export interface FoodDetails {
//   _id: string;
//   name: string;
//   shortDesc: string;
//   description: string;
//   category: string;
//   dietaryType: 'veg' | 'non-veg' | 'vegan';
//   price: number;
//   discountPrice?: number;
//   prepTime: string;
//   calories: string;
//   spiciness: string;
//   isFeatured: boolean;
//   isAvailable: boolean;
//   variants: Variant[];
//   addOns: AddOn[];
//   images: string[];
// }

// export interface Review {
//   id: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// const DynamicFoodDetailsPage = () => {
//   const params = useParams();
//   const foodId = params?.id as string;

//   // 📦 Data & Loading States
//   const [food, setFood] = useState<FoodDetails | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // 🖼️ Interactive Selection States
//   const [selectedImage, setSelectedImage] = useState<string>('');
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
//   const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
//   const [quantity, setQuantity] = useState<number>(1);

//   // ⭐️ Review States
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [newRating, setNewRating] = useState<number>(5);
//   const [newComment, setNewComment] = useState<string>('');
//   const [userName, setUserName] = useState<string>('');

//   // 🔄 Fetch Single Food Data from Database API
//   const fetchFoodDetails = useCallback(async () => {
//     if (!foodId) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
//       const cleanBaseUrl = baseUrl.replace(/\/$/, '');
//       const res = await fetch(`${cleanBaseUrl}/api/all-menu/${foodId}`);

//       if (!res.ok) {
//         throw new Error(`Error ${res.status}: খাবারটির তথ্য পাওয়া যায়নি!`);
//       }

//       const result = await res.json();

//       if (result.success && result.data) {
//         const item: FoodDetails = result.data;
//         setFood(item);

//         // Dynamic State Initializations
//         if (item.images && item.images.length > 0) {
//           setSelectedImage(item.images[0]);
//         }
//         if (item.variants && item.variants.length > 0) {
//           setSelectedVariant(item.variants[0]);
//         }
//       } else {
//         setError(result.message || 'খাবারের তথ্য লোড করতে সমস্যা হয়েছে!');
//       }
//     } catch (err: any) {
//       console.error('Fetch Details Error:', err);
//       setError(err.message || 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
//     } finally {
//       setLoading(false);
//     }
//   }, [foodId]);

//   useEffect(() => {
//     fetchFoodDetails();
//   }, [fetchFoodDetails]);

//   // 🧮 Addon Select/Deselect Handler
//   const handleAddOnToggle = (addOn: AddOn) => {
//     if (selectedAddOns.some((item) => item.name === addOn.name)) {
//       setSelectedAddOns(selectedAddOns.filter((item) => item.name !== addOn.name));
//     } else {
//       setSelectedAddOns([...selectedAddOns, addOn]);
//     }
//   };

//   // 💰 Dynamic Price Calculation
//   const calculateTotalPrice = () => {
//     if (!food) return 0;

//     let base = food.discountPrice || food.price;

//     if (selectedVariant && selectedVariant.price !== '0') {
//       base = parseFloat(selectedVariant.price);
//     }

//     const addOnsTotal = selectedAddOns.reduce(
//       (sum, item) => sum + (parseFloat(item.price) || 0),
//       0
//     );

//     return (base + addOnsTotal) * quantity;
//   };

//   // 📝 Submit Review Handler
//   const handleReviewSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userName.trim() || !newComment.trim()) return;

//     const newReviewObj: Review = {
//       id: Date.now().toString(),
//       userName,
//       rating: newRating,
//       comment: newComment,
//       date: new Date().toLocaleDateString('bn-BD', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//       }),
//     };

//     setReviews([newReviewObj, ...reviews]);
//     setUserName('');
//     setNewComment('');
//     setNewRating(5);
//     alert('ধন্যবাদ! আপনার রিভিউটি জমা হয়েছে।');
//   };

//   // ⏳ 1. SKELETON LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
//           <div className="bg-white rounded-3xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 border">
//             <div className="bg-gray-200 h-80 sm:h-96 rounded-2xl"></div>
//             <div className="space-y-4">
//               <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
//               <div className="bg-gray-200 h-10 w-3/4 rounded"></div>
//               <div className="bg-gray-200 h-20 w-full rounded"></div>
//               <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
//               <div className="bg-gray-200 h-12 w-full rounded-2xl mt-8"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ❌ 2. ERROR STATE
//   if (error || !food) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-3xl border border-red-100 text-center max-w-md shadow-md">
//           <div className="text-4xl mb-3">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">সমস্যা দেখা দিয়েছে</h2>
//           <p className="text-sm text-gray-600 mb-6">{error || 'খাবারটি খুঁজে পাওয়া যায়নি!'}</p>
//           <button
//             onClick={fetchFoodDetails}
//             className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm"
//           >
//             আবার চেষ্টা করুন
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 🟢 3. MAIN DYNAMIC VIEW
//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
        
//         {/* ================= 🥘 FOOD DETAILS SECTION ================= */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          
//           {/* 📷 Image Gallery */}
//           <div className="flex flex-col gap-4">
//             <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
//               <img
//                 src={selectedImage || food.images?.[0]}
//                 alt={food.name}
//                 className="w-full h-full object-cover transition-all duration-300"
//               />
//               {food.dietaryType && (
//                 <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
//                   🟢 {food.dietaryType}
//                 </span>
//               )}
//             </div>

//             {/* Thumbnails */}
//             {food.images && food.images.length > 1 && (
//               <div className="flex gap-3 overflow-x-auto pb-2">
//                 {food.images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(img)}
//                     className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
//                       selectedImage === img
//                         ? 'border-amber-500 scale-105 shadow-sm'
//                         : 'border-gray-200 opacity-70 hover:opacity-100'
//                     }`}
//                   >
//                     <img src={img} alt="" className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* 📝 Details & Options */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wide">
//                   {food.category}
//                 </span>
//                 {food.prepTime && (
//                   <span className="text-xs text-gray-500 font-medium">
//                     ⏱️ {food.prepTime} মিনিট
//                   </span>
//                 )}
//               </div>

//               <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
//                 {food.name}
//               </h1>

//               <p className="text-gray-600 text-sm mt-3 leading-relaxed">
//                 {food.description || food.shortDesc}
//               </p>

//               {/* Price Tag */}
//               <div className="mt-4 flex items-baseline gap-3">
//                 <span className="text-3xl font-black text-gray-900">
//                   ৳{selectedVariant && selectedVariant.price !== '0' 
//                       ? selectedVariant.price 
//                       : (food.discountPrice || food.price)}
//                 </span>
//                 {food.discountPrice && (!selectedVariant || selectedVariant.price === '0') && (
//                   <span className="text-lg text-gray-400 line-through">
//                     ৳{food.price}
//                   </span>
//                 )}
//               </div>

//               {/* 🍕 Variants Selection */}
//               {food.variants && food.variants.length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="text-sm font-bold text-gray-800 mb-2">সাইজ সিলেক্ট করুন:</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {food.variants.map((variant, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSelectedVariant(variant)}
//                         className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
//                           selectedVariant?.name === variant.name
//                             ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
//                             : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
//                         }`}
//                       >
//                         {variant.name} {variant.price !== '0' && `(৳${variant.price})`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* 🧀 Add-ons Selection */}
//               {food.addOns && food.addOns.length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="text-sm font-bold text-gray-800 mb-2">এড-অন যোগ করুন:</h3>
//                   <div className="space-y-2">
//                     {food.addOns.map((addOn, i) => {
//                       const isChecked = selectedAddOns.some((item) => item.name === addOn.name);
//                       return (
//                         <label
//                           key={i}
//                           onClick={() => handleAddOnToggle(addOn)}
//                           className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
//                             isChecked
//                               ? 'bg-amber-50 border-amber-400 text-amber-900'
//                               : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
//                           }`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={isChecked}
//                               onChange={() => {}}
//                               className="accent-amber-500 rounded"
//                             />
//                             <span>{addOn.name}</span>
//                           </div>
//                           <span className="font-bold">+৳{addOn.price}</span>
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* 🛒 Quantity & Add To Cart */}
//             <div className="mt-8 pt-6 border-t border-gray-100">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-bold text-gray-700">পরিমাণ:</span>
//                 <div className="flex items-center bg-gray-100 rounded-xl p-1">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-gray-200 transition"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 font-extrabold text-gray-800 text-sm">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-gray-200 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <button 
//                 disabled={!food.isAvailable}
//                 className={`w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
//                   food.isAvailable
//                     ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 active:scale-98'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 <span>{food.isAvailable ? 'অর্ডার করুন •' : 'বর্তমানে স্টক নেই'}</span>
//                 {food.isAvailable && (
//                   <span className="text-lg">৳{calculateTotalPrice().toFixed(0)}</span>
//                 )}
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* ================= ⭐ REVIEWS & RATING SECTION ================= */}
//         <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//             ⭐ গ্রাহকদের রিভিউ ({reviews.length})
//           </h2>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
//             {/* ✍️ Form */}
//             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60 h-fit">
//               <h3 className="text-base font-bold text-gray-800 mb-4">আপনার অভিজ্ঞতা শেয়ার করুন</h3>
//               <form onSubmit={handleReviewSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-1">আপনার নাম</label>
//                   <input
//                     type="text"
//                     required
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     placeholder="যেমন: সাকিব হাসান"
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-1">রেটিং দিন</label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         type="button"
//                         key={star}
//                         onClick={() => setNewRating(star)}
//                         className={`text-2xl transition ${
//                           star <= newRating ? 'text-amber-400' : 'text-gray-300'
//                         }`}
//                       >
//                         ★
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-1">আপনার মতামত</label>
//                   <textarea
//                     required
//                     rows={3}
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="খাবারের স্বাদ এবং সার্ভিস কেমন ছিল লিখুন..."
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2.5 rounded-xl text-sm transition"
//                 >
//                   রিভিউ জমা দিন
//                 </button>
//               </form>
//             </div>

//             {/* 💬 List */}
//             <div className="lg:col-span-2 space-y-4">
//               {reviews.length === 0 ? (
//                 <div className="text-center py-12 border border-dashed rounded-2xl">
//                   <p className="text-gray-400 text-sm">এখনো কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনিই দিন!</p>
//                 </div>
//               ) : (
//                 reviews.map((rev) => (
//                   <div key={rev.id} className="p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
//                           {rev.userName.charAt(0)}
//                         </div>
//                         <h4 className="font-bold text-gray-800 text-sm">{rev.userName}</h4>
//                       </div>
//                       <span className="text-xs text-gray-400">{rev.date}</span>
//                     </div>

//                     <div className="flex text-amber-400 text-sm mb-2">
//                       {'★'.repeat(rev.rating)}
//                       <span className="text-gray-200">{'★'.repeat(5 - rev.rating)}</span>
//                     </div>

//                     <p className="text-gray-600 text-sm">{rev.comment}</p>
//                   </div>
//                 ))
//               )}
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DynamicFoodDetailsPage;





'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';

// Types Definition
export interface Variant {
  name: string;
  price: string;
}

export interface AddOn {
  name: string;
  price: string;
}

export interface FoodDetails {
  _id: string;
  name: string;
  shortDesc: string;
  description: string;
  category: string;
  dietaryType: 'veg' | 'non-veg' | 'vegan';
  price: number;
  discountPrice?: number;
  prepTime: string;
  calories: string;
  spiciness: string;
  isFeatured: boolean;
  isAvailable: boolean;
  variants: Variant[];
  addOns: AddOn[];
  images: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const DynamicFoodDetailsPage = () => {
  const params = useParams();
  const foodId = params?.id as string;

  // 📦 Data & Loading States
  const [food, setFood] = useState<FoodDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🖼️ Interactive Selection States
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // ⭐️ Review States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // 🔄 Fetch Single Food Data from Database API
  const fetchFoodDetails = useCallback(async () => {
    if (!foodId) return;

    try {
      setLoading(true);
      setError(null);

      const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
      const baseUrlWithProto = rawBaseUrl.startsWith('http') ? rawBaseUrl : `https://${rawBaseUrl}`;
      const cleanBaseUrl = baseUrlWithProto.replace(/\/$/, '');
      const res = await fetch(`${cleanBaseUrl}/api/all-menu/${foodId}`);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: খাবারটির তথ্য পাওয়া যায়নি!`);
      }

      const result = await res.json();

      if (result.success && result.data) {
        const item: FoodDetails = result.data;
        setFood(item);

        // Dynamic State Initializations
        if (item.images && item.images.length > 0) {
          setSelectedImage(item.images[0]);
        }
        // নোট: পেজ লোড হওয়ার সময় ডিফল্ট কোনো ভ্যারিয়েন্ট সিলেক্ট না রেখে ফাঁকা রাখা হলো
        // যাতে মূল আইটেমের Discount Price প্রথম থেকে সুন্দরভাবে দেখা যায়।
      } else {
        setError(result.message || 'খাবারের তথ্য লোড করতে সমস্যা হয়েছে!');
      }
    } catch (err: any) {
      console.error('Fetch Details Error:', err);
      setError(err.message || 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  useEffect(() => {
    fetchFoodDetails();
  }, [fetchFoodDetails]);

  // 🧮 Addon Select/Deselect Handler
  const handleAddOnToggle = (addOn: AddOn) => {
    if (selectedAddOns.some((item) => item.name === addOn.name)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.name !== addOn.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // 💰 Dynamic Price Calculation for Total Cart Price
  const calculateTotalPrice = () => {
    if (!food) return 0;

    let base = (food.discountPrice && food.discountPrice > 0) ? food.discountPrice : food.price;

    if (selectedVariant && selectedVariant.price !== '0') {
      base = parseFloat(selectedVariant.price);
    }

    const addOnsTotal = selectedAddOns.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0),
      0
    );

    return (base + addOnsTotal) * quantity;
  };

  // 📝 Submit Review Handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !newComment.trim()) return;

    const newReviewObj: Review = {
      id: Date.now().toString(),
      userName,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setReviews([newReviewObj, ...reviews]);
    setUserName('');
    setNewComment('');
    setNewRating(5);
    alert('ধন্যবাদ! আপনার রিভিউটি জমা হয়েছে।');
  };

  // ⏳ SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="bg-white rounded-3xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 border">
            <div className="bg-gray-200 h-80 sm:h-96 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
              <div className="bg-gray-200 h-10 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-20 w-full rounded"></div>
              <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
              <div className="bg-gray-200 h-12 w-full rounded-2xl mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ❌ ERROR STATE
  if (error || !food) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-red-100 text-center max-w-md shadow-md">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">সমস্যা দেখা দিয়েছে</h2>
          <p className="text-sm text-gray-600 mb-6">{error || 'খাবারটি খুঁজে পাওয়া যায়নি!'}</p>
          <button
            onClick={fetchFoodDetails}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = Boolean(food.discountPrice && food.discountPrice > 0 && food.discountPrice < food.price);

  // 🟢 MAIN DYNAMIC VIEW
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= 🥘 FOOD DETAILS SECTION ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          
          {/* 📷 Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src={selectedImage || food.images?.[0]}
                alt={food.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {food.dietaryType && (
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                  🟢 {food.dietaryType}
                </span>
              )}

              {/* 🏷️ Discount Badge on Image (যদি ডিসকাউন্ট থাকে) */}
              {!selectedVariant && hasDiscount && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  ছাড় ৳{Math.floor(food.price - food.discountPrice!)}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {food.images && food.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {food.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-amber-500 scale-105 shadow-sm'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 📝 Details & Options */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {food.category}
                </span>
                {food.prepTime && (
                  <span className="text-xs text-gray-500 font-medium">
                    ⏱️ {food.prepTime} মিনিট
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                {food.name}
              </h1>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {food.description || food.shortDesc}
              </p>

              {/* 💰 DYNAMIC DISCOUNT PRICE TAG */}
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                {selectedVariant && selectedVariant.price !== '0' ? (
                  // ১. যদি ইউজার কোনো নির্দিষ্ট Variant সিলেক্ট করে
                  <span className="text-3xl font-black text-gray-900">
                    ৳{selectedVariant.price}
                  </span>
                ) : hasDiscount ? (
                  // ২. যদি Variant সিলেক্ট না থাকে এবং Discount Price থাকে
                  <>
                    <span className="text-3xl font-black text-amber-600">
                      ৳{food.discountPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ৳{food.price}
                    </span>
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2.5 py-1 rounded-md">
                      ছাড় ৳{Math.floor(food.price - food.discountPrice!)}
                    </span>
                  </>
                ) : (
                  // ৩. সাধারণ Price (কোনো ডিসকাউন্ট বা ভ্যারিয়েন্ট সিলেক্ট ছাড়া)
                  <span className="text-3xl font-black text-gray-900">
                    ৳{food.price}
                  </span>
                )}
              </div>

              {/* 🍕 Variants Selection */}
              {food.variants && food.variants.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">সাইজ সিলেক্ট করুন:</h3>
                  <div className="flex flex-wrap gap-2">
                    {food.variants.map((variant, i) => {
                      const isSelected = selectedVariant?.name === variant.name;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedVariant(isSelected ? null : variant)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {variant.name} {variant.price !== '0' && `(৳${variant.price})`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🧀 Add-ons Selection */}
              {food.addOns && food.addOns.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">এড-অন যোগ করুন:</h3>
                  <div className="space-y-2">
                    {food.addOns.map((addOn, i) => {
                      const isChecked = selectedAddOns.some((item) => item.name === addOn.name);
                      return (
                        <label
                          key={i}
                          onClick={() => handleAddOnToggle(addOn)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                            isChecked
                              ? 'bg-amber-50 border-amber-400 text-amber-900'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="accent-amber-500 rounded"
                            />
                            <span>{addOn.name}</span>
                          </div>
                          <span className="font-bold">+৳{addOn.price}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 🛒 Quantity & Add To Cart */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-700">পরিমাণ:</span>
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4 font-extrabold text-gray-800 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                disabled={!food.isAvailable}
                className={`w-full font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  food.isAvailable
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 active:scale-98'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{food.isAvailable ? 'অর্ডার করুন •' : 'বর্তমানে স্টক নেই'}</span>
                {food.isAvailable && (
                  <span className="text-lg">৳{calculateTotalPrice().toFixed(0)}</span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ================= ⭐ REVIEWS & RATING SECTION ================= */}
        <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            ⭐ গ্রাহকদের রিভিউ ({reviews.length})
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* ✍️ Form */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60 h-fit">
              <h3 className="text-base font-bold text-gray-800 mb-4">আপনার অভিজ্ঞতা শেয়ার করুন</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="যেমন: সাকিব হাসান"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">রেটিং দিন</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`text-2xl transition ${
                          star <= newRating ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">আপনার মতামত</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="খাবারের স্বাদ এবং সার্ভিস কেমন ছিল লিখুন..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2.5 rounded-xl text-sm transition"
                >
                  রিভিউ জমা দিন
                </button>
              </form>
            </div>

            {/* 💬 List */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-2xl">
                  <p className="text-gray-400 text-sm">এখনো কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনিই দিন!</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                          {rev.userName.charAt(0)}
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">{rev.userName}</h4>
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400 text-sm mb-2">
                      {'★'.repeat(rev.rating)}
                      <span className="text-gray-200">{'★'.repeat(5 - rev.rating)}</span>
                    </div>

                    <p className="text-gray-600 text-sm">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DynamicFoodDetailsPage;