import Image from 'next/image';
import React from 'react';

// Food Item এর Types
export interface FoodItem {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  price: number;
  category: string;
  dietaryType?: 'veg' | 'non-veg' | 'vegan';
  shortDesc?: string;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group">
      
      {/* 🖼️ ইমেজ এবং ব্যাজ সেকশন */}
      <div className="relative overflow-hidden h-48 w-full bg-gray-100">
        <img
          src={item.image || (item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300')}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {item.category}
        </span>

        {/* Dietary Tag (Veg/Non-Veg/Vegan) */}
        {item.dietaryType && (
          <span
            className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border ${
              item.dietaryType === 'veg'
                ? 'bg-green-50 border-green-500 text-green-700'
                : item.dietaryType === 'non-veg'
                ? 'bg-red-50 border-red-500 text-red-700'
                : 'bg-emerald-50 border-emerald-500 text-emerald-700'
            }`}
          >
            {item.dietaryType === 'veg' && '🟢 Veg'}
            {item.dietaryType === 'non-veg' && '🔴 Non-Veg'}
            {item.dietaryType === 'vegan' && '🌱 Vegan'}
          </span>
        )}
      </div>

      {/* 📝 কন্টেন্ট সেকশন */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {item.name}
          </h3>
          {item.shortDesc && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {item.shortDesc}
            </p>
          )}
        </div>

        {/* ৳ প্রাইস এবং বাটন সেকশন */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">price</span>
            <span className="text-xl font-extrabold text-gray-900">
              ৳{item.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(item)}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-sm shadow-amber-200"
          >
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default FoodCard;