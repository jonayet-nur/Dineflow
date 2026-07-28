'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  dietaryType?: string;
  shortDesc?: string;
  isFeatured?: boolean;
}

interface EditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onSuccess: () => void;
}

const EditMenuModal: React.FC<EditMenuModalProps> = ({
  isOpen,
  onClose,
  item,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: '',
    dietaryType: 'veg',
    shortDesc: '',
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

  // Sync form state when a selected item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        price: item.price || 0,
        category: item.category || '',
        dietaryType: item.dietaryType || 'veg',
        shortDesc: item.shortDesc || '',
        isFeatured: item.isFeatured || false,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Handle Form Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  // Submit Handler (PUT API Request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/all-menu/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data?.message || 'Food item updated successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(data?.message || 'Failed to update menu item');
      }
    } catch (error) {
      console.error('Update Error:', error);
      toast.error('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Update Food Information
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Food Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Dietary Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Dietary Type
            </label>
            <select
              name="dietaryType"
              value={formData.dietaryType || 'veg'}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="veg" className="dark:bg-slate-900">Veg</option>
              <option value="non-veg" className="dark:bg-slate-900">Non-Veg</option>
              <option value="vegan" className="dark:bg-slate-900">Vegan</option>
            </select>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              rows={3}
              value={formData.shortDesc || ''}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Is Featured Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured || false}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
              Mark as Featured Item
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50 transition cursor-pointer"
            >
              {loading && <FiLoader className="animate-spin" size={16} />}
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuModal;