// components/ImageUpload.tsx
import Image from 'next/image';
import React from 'react';
import { FiUploadCloud, FiX, FiLoader } from 'react-icons/fi';

interface ImageUploadProps {
  imagePreviews: string[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  maxImages: number;
  isUploading?: boolean;
  uploadProgress?: { current: number; total: number };
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreviews,
  onImageChange,
  onImageRemove,
  maxImages,
  isUploading = false,
  uploadProgress = { current: 0, total: 0 },
}) => {
  const isLimitReached = imagePreviews.length >= maxImages;

  return (
    <div className="border border-zinc-200/80 bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h2 className="text-lg font-bold text-zinc-900">Food Images</h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Upload up to {maxImages} images (ImageBB)
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Upload Area */}
        {!isLimitReached && !isUploading && (
          <div className="relative group border-2 border-dashed border-zinc-300 hover:border-orange-500 rounded-2xl p-6 transition flex flex-col items-center justify-center bg-zinc-50">
            <FiUploadCloud className="w-10 h-10 text-orange-500 mb-2" />
            <p className="text-xs font-bold text-zinc-700">Click to Upload Images</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              PNG, JPG or WEBP up to 5MB
            </p>
            <p className="text-[11px] text-orange-600 font-medium mt-1">
              {imagePreviews.length}/{maxImages} used
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        )}

        {/* Uploading Progress */}
        {isUploading && (
          <div className="border-2 border-dashed border-orange-500 rounded-2xl p-6 flex flex-col items-center justify-center bg-orange-50/30">
            <FiLoader className="w-10 h-10 text-orange-500 mb-2 animate-spin" />
            <p className="text-xs font-bold text-zinc-700">Uploading Images...</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              {uploadProgress.current}/{uploadProgress.total} uploaded
            </p>
            <div className="w-full max-w-xs h-1.5 bg-zinc-200 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ 
                  width: uploadProgress.total > 0 
                    ? `${(uploadProgress.current / uploadProgress.total) * 100}%` 
                    : '0%' 
                }}
              />
            </div>
          </div>
        )}

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden border border-zinc-200"
              >
                <img
                  src={preview}
                  alt={`Food preview ${index + 1}`}
                  className="w-full h-32 object-cover"
                  
                />
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  disabled={isUploading}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                >
                  <FiX className="w-3 h-3" />
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">
                  {index + 1}/{maxImages}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Max Reached */}
        {isLimitReached && !isUploading && (
          <p className="text-xs text-center text-orange-600 font-medium bg-orange-50 py-2 rounded-lg">
            Maximum {maxImages} images uploaded ✓
          </p>
        )}
      </div>
    </div>
  );
};