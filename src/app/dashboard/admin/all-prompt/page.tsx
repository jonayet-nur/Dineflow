'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiSearch, FiPlus, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import EditMenuModal from '@/Components/EditModal';

export interface FoodItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  shortDesc?: string;
  isFeatured?: boolean;
}

export default function AllFoodsPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Modal State
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  const getImageUrl = (imagesArray?: string[]) => {
    if (!imagesArray?.length) return '';
    const firstImage = imagesArray[0];
    return firstImage.startsWith('http://') || firstImage.startsWith('https://')
      ? firstImage
      : `${baseUrl}/${firstImage.replace(/^\//, '')}`;
  };

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);

      const res = await fetch(`${baseUrl}/api/all-menu?${queryParams.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setFoods(data.data || []);
      } else {
        toast.error(data?.message || 'Failed to fetch menu items');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Server connection failed');
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search, category]);

  useEffect(() => {
    const timer = setTimeout(fetchFoods, 300);
    return () => clearTimeout(timer);
  }, [fetchFoods]);

  const handleEditClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsEditModalOpen(true);
  };

  const handleDeleteFood = async (id: string) => {
    if (!id) return toast.error('Invalid food item ID');

    if (!window.confirm('Are you sure you want to delete this food item?')) return;

    try {
      const res = await fetch(`${baseUrl}/api/all-menu/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        toast.success(data?.message || 'Food item deleted successfully');
        setFoods((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data?.message || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error('Server connection failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-3 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">All Food Items</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage and update your menu inventory</p>
        </div>

        <Link
          href="/admin/add-food"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl sm:rounded-2xl transition shadow-xs"
        >
          <FiPlus size={18} /> Add New Item
        </Link>
      </div>

      {/* Search & Category Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search food by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl sm:rounded-2xl outline-none focus:border-orange-500 transition"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl sm:rounded-2xl outline-none focus:border-orange-500 cursor-pointer text-gray-700 font-medium"
          >
            <option value="">All Categories</option>
            <option value="burgers">Burgers</option>
            <option value="pizzas">Pizzas</option>
            <option value="pasta">Pasta</option>
            <option value="beverages">Drinks</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>
      </div>

      {/* Loading & Empty State */}
      {loading ? (
        <div className="p-12 text-center flex justify-center bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : foods.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 text-center text-gray-400 font-medium text-sm">
          No menu items found.
        </div>
      ) : (
        <>
          {/* 📱 MOBILE CARD VIEW (Visible on small screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {foods.map((item) => {
              const imageUrl = getImageUrl(item.images);

              return (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-3 relative flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-400 font-medium">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-gray-900 text-sm truncate">{item.name}</h3>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                            item.isFeatured
                              ? 'bg-orange-50 text-orange-600 border-orange-200'
                              : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}
                        >
                          {item.isFeatured ? 'Featured' : 'Regular'}
                        </span>
                      </div>

                      {item.shortDesc && (
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                          {item.shortDesc}
                        </p>
                      )}

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 uppercase flex items-center gap-1">
                          <FiTag size={10} /> {item.category || 'Uncategorized'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Price</span>
                      <div className="font-black text-gray-900 text-sm">
                        ৳{item.discountPrice || item.price}
                        {item.discountPrice && (
                          <span className="text-xs text-gray-400 line-through ml-1 font-normal">
                            ৳{item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                        title="Edit Item"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteFood(item._id)}
                        className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        title="Delete Item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 💻 DESKTOP TABLE VIEW (Visible on tablet & desktop) */}
          <div className="hidden md:block bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-100">
                    <th className="p-4 pl-6">Food Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                  {foods.map((item) => {
                    const imageUrl = getImageUrl(item.images);

                    return (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition">
                        {/* Item Details */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={item.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                  unoptimized={process.env.NODE_ENV === 'development'}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{item.name}</div>
                              {item.shortDesc && (
                                <div className="text-xs text-gray-400 line-clamp-1 max-w-xs">
                                  {item.shortDesc}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-gray-100 text-gray-600 uppercase">
                            {item.category || 'Uncategorized'}
                          </span>
                        </td>

                        {/* Pricing */}
                        <td className="p-4">
                          <div className="font-black text-gray-900">
                            ৳{item.discountPrice || item.price}
                            {item.discountPrice && (
                              <span className="text-xs text-gray-400 line-through ml-1 font-normal">
                                ৳{item.price}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              item.isFeatured
                                ? 'bg-orange-50 text-orange-600 border-orange-200'
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                            }`}
                          >
                            {item.isFeatured ? 'Featured' : 'Regular'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                              title="Edit Item"
                            >
                              <FiEdit size={16} />
                            </button>

                            <button
                              onClick={() => handleDeleteFood(item._id)}
                              className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                              title="Delete Item"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      <EditMenuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={selectedFood}
        onSuccess={fetchFoods}
      />
    </div>
  );
}