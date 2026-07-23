// types/food.ts
export interface Variant {
  name: string;
  price: string;
}

export interface AddOn {
  name: string;
  price: string;
}

export interface FoodFormData {
  name: string;
  shortDesc: string;
  description: string;
  category: string;
  dietaryType: 'veg' | 'non-veg' | 'vegan';
  price: number;
  discountPrice: number | null;
  prepTime: string;
  calories: string;
  spiciness: '0' | '1' | '2' | '3';
  isFeatured: boolean;
  isAvailable: boolean;
  variants: Variant[];
  addOns: AddOn[];
  images: string[];
}

export interface FormErrors {
  name?: string;
  shortDesc?: string;
  category?: string;
  price?: string;
  [key: string]: string | undefined;
}

export interface ImageUploadResponse {
  success: boolean;
  data?: {
    url: string;
    thumb?: string;
    delete_url?: string;
  };
  error?: string;
}