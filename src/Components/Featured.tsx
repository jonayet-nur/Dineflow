import React from 'react';
import Link from 'next/link';
import FeaturedItemsClient from './FeaturedItemsClient';

// Types Interface
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

// Async Server Component
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
      <div className="text-center py-12 text-rose-500 font-medium">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100/60">
      {/* Header Section with View All Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 border-b border-gray-100/85 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#A03E0B] bg-orange-50 px-4.5 py-2 rounded-full border border-orange-100 shadow-sm shadow-orange-500/5 inline-block mb-3">
            Our Menu Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Featured Specials
          </h2>
        </div>

        {/* View All Button */}
        <Link
          href="/all-menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#A03E0B] hover:text-[#8A3308] transition-colors group self-start sm:self-auto cursor-pointer"
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

      {/* Grid Container wrapped in Framer Motion Client component */}
      {featuredItems.length > 0 ? (
        <FeaturedItemsClient items={featuredItems} />
      ) : (
        <div className="text-center text-gray-500 py-12 font-medium">
          No featured items available at this time.
        </div>
      )}
    </section>
  );
};

export default FeaturedItems;