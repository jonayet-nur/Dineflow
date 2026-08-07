"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MenuItem } from "./Featured";

interface FeaturedItemsClientProps {
  items: MenuItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.94, rotate: -1 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 55,
      damping: 13,
    }
  },
};

export default function FeaturedItemsClient({ items }: FeaturedItemsClientProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {items.map((item) => {
        const finalPrice = item.discountPrice ? item.discountPrice : item.price;
        const hasDiscount = Boolean(item.discountPrice && item.discountPrice < item.price);
        const spicinessNum = Number(item.spiciness);

        return (
          <motion.div
            key={item._id}
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(160,62,11,0.06)] hover:border-orange-200/30 transition-all duration-500 flex flex-col justify-between h-full cursor-pointer"
          >
            <div>
              {/* Image & Overlay Badges */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                <img
                  src={item.images?.[0] || 'https://via.placeholder.com/400x300'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Category & Dietary Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md border ${
                      item.dietaryType.toLowerCase() === 'veg'
                        ? 'bg-emerald-50/90 text-emerald-700 border-emerald-100/50'
                        : 'bg-rose-50/90 text-rose-700 border-rose-100/50'
                    }`}
                  >
                    {item.dietaryType}
                  </span>
                </div>

                {/* Spiciness Level */}
                {spicinessNum > 0 && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#A03E0B] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-orange-100/50">
                    <span>🌶️</span>
                    <span>Level {item.spiciness}</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#A03E0B] transition-colors line-clamp-1 mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-5 font-medium">
                  {item.shortDesc || item.description}
                </p>

                {/* Meta Badges (Prep Time & Calories) */}
                <div className="flex items-center gap-2.5 text-xs text-gray-500 font-bold">
                  {item.prepTime && (
                    <span className="inline-flex items-center gap-1 bg-orange-50/50 border border-orange-100/20 text-[#A03E0B] px-3 py-1.5 rounded-xl">
                      ⏱️ {item.prepTime} mins
                    </span>
                  )}
                  {item.calories && (
                    <span className="inline-flex items-center gap-1 bg-orange-50/50 border border-orange-100/20 text-[#A03E0B] px-3 py-1.5 rounded-xl">
                      🔥 {item.calories} kcal
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-gray-50">
              {/* Price */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2.5xl font-black text-gray-900">
                    ৳{finalPrice}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through font-medium">
                      ৳{item.price}
                    </span>
                  )}
                </div>
              </div>

              {/* details Action Button */}
              <Link href={`/all-menu/${item._id}`}>
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 hover:bg-[#A03E0B] text-white px-5.5 py-3 rounded-2xl font-bold text-sm transition-all duration-350 shadow-md hover:shadow-orange-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
