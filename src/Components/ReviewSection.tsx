'use client';

import React, { useEffect, useState } from 'react';

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
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/reviews`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setReviews(result.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch reviews for home page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse mb-3" />
          <div className="h-8 w-64 bg-gray-200 rounded-xl mx-auto animate-pulse mb-12" />
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

  // Seamless Loop তৈরি করার জন্য অ্যারে ডুপ্লিকেট করা হয়েছে
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 border border-amber-200/60 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
          What Our Customers Say
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Real feedback from food lovers who ordered with us.
        </p>
      </div>

      {/* Marquee Wrapper with Gradient Masking Edge */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="animate-marquee flex gap-6">
          {doubleReviews.map((rev, idx) => (
            <div
              key={`${rev._id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white font-bold flex items-center justify-center uppercase shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform duration-300">
                    {rev.userName ? rev.userName.charAt(0) : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm tracking-wide">
                      {rev.userName}
                    </h4>
                    <div className="flex text-amber-400 text-xs mt-0.5">
                      {'★'.repeat(Math.min(Math.max(rev.rating, 1), 5))}
                      <span className="text-gray-200">
                        {'★'.repeat(Math.max(5 - rev.rating, 0))}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-3">
                  "{rev.comment}"
                </p>
              </div>

              <div className="text-right text-gray-200 text-3xl font-serif select-none -mt-2">
                ”
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}