
'use client';

import FoodCard, { FoodItem } from '@/Components/ui/FoodCard';
import React, { useEffect, useState, useCallback } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const AllMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🎛️ Filter, Search, Sort & Pagination States
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dietaryType, setDietaryType] = useState<string>('');
  const [sort, setSort] = useState<string>('newest');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // ⏱️ Search Input-এর জন্য Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // সার্চ চেঞ্জ হলে পেজ ১-এ নিয়ে যাবে
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================================================================
  // 🚀 1st PLACE: Backend API Fetch Handler Definition (কল করার ফাংশন ডিক্লেয়ারেশন)
  // =========================================================================
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // API Query Parameters তৈরি
      const queryParams = new URLSearchParams({
        search: debouncedSearch,
        category,
        dietaryType,
        sort,
        page: page.toString(),
        limit: '8', // প্রতি পেজে কতটি দেখাবে
      });

      // 🌐 API Request URL
      const apiUrl = `${BASE_URL}/api/all-menu?${queryParams.toString()}`;
      
      // 📡 এখানে Backend থেকে Main Data Fetch করা হচ্ছে
      const res = await fetch(apiUrl);

      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

      const result = await res.json();

      if (result.success) {
        setMenuItems(result.data || []);
        setTotalPages(result.totalPages || 1);
      } else {
        setError(result.message || 'ডেটা লোড করতে সমস্যা হয়েছে!');
      }
    } catch (err: unknown) {
      console.error('Fetch Menu Error:', err);
      const message = err instanceof Error ? err.message : '';
      setError(`সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। ${message}`);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, dietaryType, sort, page]);

  // =========================================================================
  // 🚀 2nd PLACE: Initial Load & Filter Change Auto-Fetch Trigger
  // (পেজ প্রথমবার লোড হলে এবং Search, Filter বা Pagination পাল্টালে automatic API Fetch কল হয়)
  // =========================================================================
  useEffect(() => {
    fetchMenu(); // 👈 এখানে Auto API Call সম্পন্ন হচ্ছে
  }, [fetchMenu]);

  // 🔄 Filter Change Handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleDietaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDietaryType(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 📌 Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore our delicious menu
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose your favorite dish and order it with just a few clicks!
          </p>
        </div>

        {/* 🔍 Search & Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food by name or details..."
              className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border-gray-200"
            />
          </div>

          {/* Filters Container */}
          <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap gap-3">
            
            {/* Category Filter - Form Page key/values-er shathe match kora hoyeche */}
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto px-3 py-2 border rounded-xl text-sm bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              <option value="burgers">Burgers & Sandwiches</option>
              <option value="pizzas">Artisanal Pizzas</option>
              <option value="pasta">Pasta & Main</option>
              <option value="desserts">Desserts & Sweets</option>
              <option value="beverages">Cold Beverages</option>
            </select>

            {/* Dietary Type Filter */}
            <select
              value={dietaryType}
              onChange={handleDietaryChange}
              className="w-full sm:w-auto px-3 py-2 border rounded-xl text-sm bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Types</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="vegan">Vegan</option>
            </select>

            {/* Sorting Filter */}
            <select
              value={sort}
              onChange={handleSortChange}
              className="w-full sm:w-auto px-3 py-2 border rounded-xl text-sm bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

          </div>
        </div>

        {/* ⏳ Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4 flex flex-col justify-between shadow-sm"
              >
                <div className="bg-gray-200 h-40 rounded-xl mb-4" />
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                <div className="bg-gray-200 h-3 rounded w-1/2" />
                <div className="bg-gray-200 h-10 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* ❌ Error State */}
        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200 my-10 max-w-md mx-auto">
            <p className="font-semibold">{error}</p>
            {/* =========================================================================
                🚀 3rd PLACE: Manual Re-try Button Click Fetch Call
                (Error hole user "Try Again" button click korle ekhane abar fetch call hoy)
               ========================================================================= */}
            <button
              onClick={fetchMenu} // 👈 Manual Retry Fetch Call
              className="mt-3 bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 🍱 Food Grid */}
        {!loading && !error && menuItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* 📭 Empty State */}
        {!loading && !error && menuItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">No menu items found!</p>
          </div>
        )}

        {/* 📄 Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border text-sm rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border text-sm rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllMenuPage;