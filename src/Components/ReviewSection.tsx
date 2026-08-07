"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/reviews`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setReviews(result.data.slice(0, 8));
        }
      } catch (error) {
        console.error("Failed to fetch reviews for home page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse mb-3" />
          <div className="h-10 w-64 bg-gray-200 rounded-xl mx-auto animate-pulse mb-12" />
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[320px] bg-white p-6 rounded-2xl border border-gray-100 h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  // Duplicate the reviews array to create a seamless infinite marquee scroll
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 overflow-hidden border-b border-gray-100/60">
      
      {/* Header Container with scroll trigger reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 55, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
        <span className="text-xs font-bold text-[#A03E0B] bg-orange-50 border border-orange-100/80 px-4.5 py-2 rounded-full uppercase tracking-wider inline-block">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-4 tracking-tight leading-tight">
          What Our Customers Say
        </h2>
        <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto font-medium">
          Real feedback from food lovers who ordered with us.
        </p>
      </motion.div>

      {/* Marquee Wrapper with Gradient Masking Edge */}
      <motion.div 
        initial={{ opacity: 0, y: 70, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <div className="animate-marquee flex gap-6">
          {doubleReviews.map((rev, idx) => (
            <motion.div
              key={`${rev._id}-${idx}`}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white p-6 rounded-3xl border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(160,62,11,0.05)] hover:border-orange-200/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer backdrop-blur-md"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center uppercase shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {rev.userName ? rev.userName.charAt(0) : "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-wide group-hover:text-[#A03E0B] transition-colors">
                      {rev.userName}
                    </h4>
                    <div className="flex text-amber-500 text-xs mt-0.5">
                      {"★".repeat(Math.min(Math.max(rev.rating, 1), 5))}
                      <span className="text-gray-200">
                        {"★".repeat(Math.max(5 - rev.rating, 0))}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-3 font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="text-right text-[#A03E0B]/10 text-4xl font-serif select-none -mt-2">
                ”
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}