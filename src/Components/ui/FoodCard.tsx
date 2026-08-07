import Link from 'next/link';
import React from 'react';

// Food Item Interface
export interface FoodItem {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  price: number;
  discountPrice?: number;
  category: string;
  dietaryType?: 'veg' | 'non-veg' | 'vegan' | string;
  shortDesc?: string;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  // Price Calculation: Discount price matches finalPrice if present
  const finalPrice =
    item.discountPrice && item.discountPrice < item.price
      ? item.discountPrice
      : item.price;

  const hasDiscount = Boolean(
    item.discountPrice && item.discountPrice < item.price
  );

  // Discount Percentage
  const discountPercentage = hasDiscount
    ? Math.round(((item.price - (item.discountPrice || 0)) / item.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-[22px] shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col justify-between group">
      
      {/* Image & Overlay Badges */}
      <div className="relative overflow-hidden h-48 w-full bg-slate-50">
        <img
          src={
            item.image ||
            (item.images && item.images.length > 0
              ? item.images[0]
              : 'https://via.placeholder.com/300')
          }
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Badge */}
        <span className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {item.category}
        </span>

        {/* Top Right Badges */}
        <div className="absolute top-3.5 right-3.5 flex flex-col items-end gap-1.5">
          {/* Dietary Tag */}
          {item.dietaryType && (
            <span
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-md ${
                item.dietaryType.toLowerCase() === 'veg'
                  ? 'bg-emerald-50/90 border-emerald-250 text-emerald-700'
                  : item.dietaryType.toLowerCase() === 'non-veg'
                  ? 'bg-rose-50/90 border-rose-250 text-rose-700'
                  : 'bg-teal-50/90 border-teal-250 text-teal-700'
              }`}
            >
              {item.dietaryType.toLowerCase() === 'veg' && '🟢 Veg'}
              {item.dietaryType.toLowerCase() === 'non-veg' && '🔴 Non-Veg'}
              {item.dietaryType.toLowerCase() === 'vegan' && '🌱 Vegan'}
            </span>
          )}

          {/* Discount Percentage Badge */}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#A03E0B] transition-colors tracking-tight leading-snug">
            {item.name}
          </h3>
          {item.shortDesc && (
            <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item.shortDesc}
            </p>
          )}
        </div>

        {/* Price and Details Section */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Price</span>
            <div className="flex items-baseline gap-2">
              {/* Actual Final Price */}
              <span className="text-2xl font-black text-slate-900">
                ৳{finalPrice}
              </span>

              {/* Original Price (Strike-through) */}
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ৳{item.price}
                </span>
              )}
            </div>
          </div>
          
          <Link href={`/all-menu/${item._id}`}>
            <button
              onClick={() => onAddToCart && onAddToCart(item)}
              className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-sm shadow-slate-950/10 cursor-pointer"
            >
              View Details
            </button> 
          </Link>
        </div>
      </div>

    </div>
  );
};

export default FoodCard;