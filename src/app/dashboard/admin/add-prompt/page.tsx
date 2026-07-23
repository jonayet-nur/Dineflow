// app/add-food/page.tsx
'use client';

import React from 'react';
import {
  FiPlus,
  FiTrash2,
  FiClock,
  FiDollarSign,
  FiTag,
  FiZap,
  FiEye,
} from 'react-icons/fi';
import { useFoodForm } from '@/hooks/useFoodForm';
import { ImageUpload } from '@/Components/ui/ImageUpload';
// import { ImageUpload } from '@/components/ImageUpload';

export default function AddFoodPage() {
  const {
    formData,
    updateField,
    variants,
    addVariant,
    removeVariant,
    updateVariant,
    addOns,
    addAddOn,
    removeAddOn,
    updateAddOn,
    imagePreviews,
    handleImageChange,
    removeImage,
    isUploading,
    uploadProgress,
    errors,
    isSubmitting,
    handleSubmit,
    MAX_IMAGES,
  } = useFoodForm();

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 md:p-8 max-w-[90rem] mx-auto text-zinc-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
          Add New Food Item
        </h1>
        <p className="text-sm font-medium text-zinc-500 mt-1">
          Create and publish a new item for your Dineflow menu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-zinc-100">
              <FiTag className="text-orange-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-zinc-900">Basic Information</h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Food Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gourmet Truffle Burger"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  data-error={!!errors.name}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-zinc-300 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={120}
                  placeholder="A brief summary for card views (max 120 chars)"
                  value={formData.shortDesc}
                  onChange={(e) => updateField('shortDesc', e.target.value)}
                  data-error={!!errors.shortDesc}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition ${
                    errors.shortDesc 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-zinc-300 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                />
                {errors.shortDesc && (
                  <p className="text-xs text-red-500 mt-1">{errors.shortDesc}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe ingredient origins, cooking method, flavor profile..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    data-error={!!errors.category}
                    className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition ${
                      errors.category 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-zinc-300 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="burgers">Burgers & Sandwiches</option>
                    <option value="pizzas">Artisanal Pizzas</option>
                    <option value="pasta">Pasta & Main</option>
                    <option value="desserts">Desserts & Sweets</option>
                    <option value="beverages">Cold Beverages</option>
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">
                    Dietary Type
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-700">
                      <input
                        type="radio"
                        name="dietary"
                        value="veg"
                        checked={formData.dietaryType === 'veg'}
                        onChange={(e) => updateField('dietaryType', e.target.value)}
                        className="accent-amber-500"
                      />
                      🌱 Veg
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-red-700">
                      <input
                        type="radio"
                        name="dietary"
                        value="non-veg"
                        checked={formData.dietaryType === 'non-veg'}
                        onChange={(e) => updateField('dietaryType', e.target.value)}
                        className="accent-amber-500"
                      />
                      🍖 Non-Veg
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-green-600">
                      <input
                        type="radio"
                        name="dietary"
                        value="vegan"
                        checked={formData.dietaryType === 'vegan'}
                        onChange={(e) => updateField('dietaryType', e.target.value)}
                        className="accent-amber-500"
                      />
                      🥑 Vegan
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-zinc-100">
              <FiDollarSign className="text-orange-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-zinc-900">Pricing & Timing</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Base Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      data-error={!!errors.price}
                      className={`w-full pl-8 pr-3.5 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition ${
                        errors.price 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-zinc-300 focus:border-orange-500 focus:ring-orange-500'
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Discount/Offer Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Optional"
                      value={formData.discountPrice}
                      onChange={(e) => updateField('discountPrice', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2 text-sm bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Prep Time (Mins)
                  </label>
                  <div className="relative">
                    <FiClock className="absolute top-3 left-3.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. 15-20"
                      value={formData.prepTime}
                      onChange={(e) => updateField('prepTime', e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 450"
                    value={formData.calories}
                    onChange={(e) => updateField('calories', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Spiciness Level
                  </label>
                  <select
                    value={formData.spiciness}
                    onChange={(e) => updateField('spiciness', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  >
                    <option value="0">0 - Mild / No Spice</option>
                    <option value="1">1 - Medium 🌶️</option>
                    <option value="2">2 - Hot 🌶️🌶️</option>
                    <option value="3">3 - Extra Hot 🌶️🌶️🌶️</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Variants & Add-ons */}
          <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-zinc-100">
              <FiZap className="text-orange-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-zinc-900">Variants & Add-ons</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-zinc-800">Size Variants</label>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                  >
                    <FiPlus /> Add Variant
                  </button>
                </div>
                <div className="space-y-3">
                  {variants.map((v, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Variant Name (e.g. Large)"
                        value={v.name}
                        onChange={(e) => updateVariant(i, 'name', e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price Offset (+$)"
                        value={v.price}
                        onChange={(e) => updateVariant(i, 'price', e.target.value)}
                        className="w-36 px-3 py-1.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-zinc-100" />

              {/* Add-ons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-zinc-800">Optional Extra Add-ons</label>
                  <button
                    type="button"
                    onClick={addAddOn}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                  >
                    <FiPlus /> Add Add-on
                  </button>
                </div>
                {addOns.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">No extra add-ons specified yet.</p>
                ) : (
                  <div className="space-y-3">
                    {addOns.map((addon, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Add-on Name (e.g. Extra Cheese)"
                          value={addon.name}
                          onChange={(e) => updateAddOn(i, 'name', e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Extra Price ($)"
                          value={addon.price}
                          onChange={(e) => updateAddOn(i, 'price', e.target.value)}
                          className="w-36 px-3 py-1.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeAddOn(i)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload */}
          <ImageUpload
            imagePreviews={imagePreviews}
            onImageChange={handleImageChange}
            onImageRemove={removeImage}
            maxImages={MAX_IMAGES}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />

          {/* Visibility & Status */}
          <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-bold text-zinc-900">Visibility & Status</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-800">Available in Menu</p>
                  <p className="text-xs text-zinc-400">In stock for customer orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => updateField('isAvailable', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <hr className="border-zinc-100" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-800">Featured Item</p>
                  <p className="text-xs text-zinc-400">Showcase on Home Specials</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => updateField('isFeatured', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Customer Preview */}
          <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-zinc-100">
              <FiEye className="text-orange-600" />
              <h2 className="text-sm font-bold text-zinc-800">Customer Card Preview</h2>
            </div>
            <div className="p-4">
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="h-32 bg-zinc-100 relative">
                  {imagePreviews.length > 0 ? (
                    <img
                      src={imagePreviews[0]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                      No Image Uploaded
                    </div>
                  )}
                  {formData.isFeatured && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                      SPECIAL
                    </span>
                  )}
                  {imagePreviews.length > 1 && (
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">
                      +{imagePreviews.length - 1} more
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-zinc-900 truncate">
                      {formData.name || 'Item Name'}
                    </h3>
                    <span className="text-sm font-black text-orange-600">
                      ${formData.price || '0.00'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {formData.shortDesc || 'Short description will appear here.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-3.5 px-4 font-black text-white bg-orange-600 hover:bg-orange-700 rounded-2xl shadow-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : isUploading ? 'Uploading Images...' : 'Publish Food Item'}
          </button>
        </div>
      </form>
    </div>
  );
}