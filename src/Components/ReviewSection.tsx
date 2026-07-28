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
          // সাম্প্রতিক ৬টি রিভিউ দেখানো হচ্ছে
          setReviews(result.data.slice(0, 6));
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">রিভিউ লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            গ্রাহকদের মতামত
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
            আমাদের কাস্টমাররা কি বলছেন?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center uppercase">
                  {rev.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{rev.userName}</h4>
                  <div className="flex text-amber-400 text-xs mt-0.5">
                    {'★'.repeat(rev.rating)}
                    <span className="text-gray-200">{'★'.repeat(5 - rev.rating)}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}