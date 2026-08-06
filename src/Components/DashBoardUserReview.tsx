'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  FiStar, 
  FiTrash2, 
  FiMessageSquare, 
  FiRefreshCw, 
  FiCheckCircle, 
  FiClock, 
  FiPlus 
} from 'react-icons/fi';

// Types & Interfaces
type ReviewStatus = 'All' | 'Approved' | 'Pending';

interface Review {
  _id: string;
  email?: string;
  userEmail?: string;
  authorEmail?: string;
  user_email?: string;
  userName?: string;
  name?: string;
  authorName?: string;
  itemName?: string;
  itemImage?: string;
  rating: number;
  comment: string;
  createdAt?: string;
  status?: ReviewStatus | string;
}

interface UserReviewsSectionProps {
  userEmail?: string;
  userName?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function UserReviewsSection({ userEmail, userName }: UserReviewsSectionProps) {
  // 🟢 Hydration Guard State
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ReviewStatus>('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Set mounted flag on client render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 📡 Robust User Review Fetcher
  const fetchUserReviews = useCallback(async () => {
    if (!userEmail && !userName) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
      }

      const result = await response.json();

      // Extract Array standard response wrappers safely
      const rawData: Review[] = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.reviews)
        ? result.reviews
        : [];

      const targetEmail = (userEmail || '').toLowerCase().trim();
      const targetName = (userName || '').toLowerCase().trim();

      // 🔒 Filter logic based on email or name matches
      const filteredData = rawData.filter((item) => {
        const itemEmail = (item.email || item.userEmail || item.authorEmail || item.user_email || '')
          .toLowerCase()
          .trim();
        const itemName = (item.userName || item.name || item.authorName || '')
          .toLowerCase()
          .trim();

        const isEmailMatch = targetEmail.length > 0 && itemEmail === targetEmail;
        const isNameMatch = targetName.length > 0 && (itemName === targetName || itemName.includes(targetName));

        return isEmailMatch || isNameMatch;
      });

      setReviews(filteredData);
    } catch (error) {
      console.error('❌ [UserReviewsSection] Fetching error:', error);
    } finally {
      setLoading(false);
    }
  }, [userEmail, userName]);

  useEffect(() => {
    if (isMounted) {
      fetchUserReviews();
    }
  }, [fetchUserReviews, isMounted]);

  // 🗑️ Optimistic Review Delete Handler
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    setDeletingId(id);
    const previousReviews = [...reviews];

    // Optimistic Update
    setReviews((prev) => prev.filter((item) => item._id !== id));

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review on server');
      }
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      setReviews(previousReviews);
      alert('Could not delete the review. Please try again later.');
    } finally {
      setDeletingId(null);
    }
  };

  // 🎯 Filter Reviews according to Tab
  const displayedReviews = useMemo(() => {
    if (activeTab === 'All') return reviews;
    return reviews.filter((r) => (r.status || 'Approved') === activeTab);
  }, [reviews, activeTab]);

  // 🌟 Rating Stars Helper
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={`text-xs md:text-sm ${
          index < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'
        }`}
      />
    ));
  };

  // 🛑 Prevents SSR Hydration Mismatch completely
  if (!isMounted) {
    return (
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 min-h-[250px] flex items-center justify-center">
        <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <FiMessageSquare className="text-lg" />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              My <span className="text-blue-600">Reviews & Feedback</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Showing reviews submitted by{' '}
            <span suppressHydrationWarning className="font-bold text-slate-700">
              {userName || userEmail || 'You'}
            </span>
          </p>
        </div>

        {/* Action Controls & Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            {(['All', 'Approved', 'Pending'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm font-black'
                    : 'hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchUserReviews}
            disabled={loading}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition border border-slate-200 cursor-pointer disabled:opacity-50"
            title="Refresh Reviews"
          >
            <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-slate-400">Loading your feedback...</p>
        </div>
      ) : displayedReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedReviews.map((review) => {
            const isApproved = (review.status || 'Approved') === 'Approved';
            const isDeleting = deletingId === review._id;

            return (
              <article
                key={review._id}
                className={`bg-slate-50/50 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all rounded-xl p-4 flex flex-col justify-between space-y-3 ${
                  isDeleting ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div className="space-y-2">
                  {/* Item Info & Status Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {review.itemImage ? (
                        <img
                          src={review.itemImage}
                          alt={review.itemName || 'Food Item'}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {review.itemName ? review.itemName.slice(0, 2).toUpperCase() : 'FD'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {review.itemName || 'Food Review'}
                        </h4>
                        <time className="text-[11px] text-slate-400 font-medium block" suppressHydrationWarning>
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Recent'}
                        </time>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {isApproved ? <FiCheckCircle className="text-xs" /> : <FiClock className="text-xs" />}
                      {review.status || 'Approved'}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 pt-1">
                    {renderStars(review.rating)}
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {(review.rating || 5).toFixed(1)}
                    </span>
                  </div>

                  {/* Comment Box */}
                  <blockquote className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal bg-white p-3 rounded-lg border border-slate-100 not-italic">
                    {review.comment}
                  </blockquote>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span suppressHydrationWarning className="text-[11px] font-semibold text-slate-400">
                    By {userName || review.userName || 'You'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteReview(review._id)}
                    disabled={isDeleting}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer disabled:opacity-40"
                    title="Delete Review"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 px-4 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto text-xl">
            <FiMessageSquare />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No reviews found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your submitted ratings and comments for ordered items will show up here.
            </p>
          </div>
          <Link
            href="/all-menu"
            className="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition shadow-sm mt-2"
          >
            <FiPlus /> Order & Leave Review
          </Link>
        </div>
      )}
    </section>
  );
}