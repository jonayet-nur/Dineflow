import React from 'react';
import Link from 'next/link';

// 1. Types Interface
interface Variant {
  name: string;
  price: string | number;
}

interface AddOn {
  name: string;
  price: string | number;
}

export interface MenuItem {
  _id: string;
  name: string;
  shortDesc?: string;
  description?: string;
  category: string;
  dietaryType: string;
  price: number;
  discountPrice?: number;
  prepTime?: string;
  calories?: string | number;
  spiciness: string | number;
  isFeatured: boolean;
  isAvailable: boolean;
  variants?: Variant[];
  addOns?: AddOn[];
  images: string[];
}

// 2. Async Server Component
const FeaturedItems = async () => {
  let featuredItems: MenuItem[] = [];
  let error: string | null = null;

  try {
    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
    const baseUrl = rawBaseUrl.startsWith('http') ? rawBaseUrl : `https://${rawBaseUrl}`;
    const res = await fetch(`${baseUrl}/api/featured`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    featuredItems = (await res.json()) as MenuItem[];
  } catch (err: unknown) {
    console.error('Error fetching featured items:', err);
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section with View All Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block mb-3">
            Our Menu Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Featured Specials
          </h2>
        </div>

        {/* View All Button */}
        <Link
          href="/all-menu" // আপনার All Menu পেজের সঠিক Route দিন
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group self-start sm:self-auto"
        >
          <span>View Full Menu</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item: MenuItem) => {
          const finalPrice = item.discountPrice ? item.discountPrice : item.price;
          const hasDiscount = Boolean(item.discountPrice && item.discountPrice < item.price);
          const spicinessNum = Number(item.spiciness);

          return (
            <div
              key={item._id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Overlay Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Category & Dietary Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-gray-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${
                        item.dietaryType.toLowerCase() === 'veg'
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-rose-500/90 text-white'
                      }`}
                    >
                      {item.dietaryType}
                    </span>
                  </div>

                  {/* Spiciness Level */}
                  {spicinessNum > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-amber-100">
                      <span>🌶️</span>
                      <span>Level {item.spiciness}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-5">
                    {item.shortDesc || item.description}
                  </p>

                  {/* Meta Badges (Prep Time & Calories) */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    {item.prepTime && (
                      <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                        ⏱️ {item.prepTime} mins
                      </span>
                    )}
                    {item.calories && (
                      <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                        🔥 {item.calories} kcal
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-gray-50/80">
                {/* Price */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">
                      ৳{finalPrice}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through font-medium">
                        ৳{item.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* view details Action Button */}
              
<Link href={`/all-menu/${item._id}`}>
  <button className="bg-gray-900 hover:bg-amber-600 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-amber-500/25 active:scale-95 flex items-center gap-2">
    <span>View Details</span>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedItems;