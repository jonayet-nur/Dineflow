// // hooks/useFoodForm.ts
// import { useState, useCallback, useRef } from 'react';
// import { Variant, AddOn, FoodFormData, FormErrors } from '@/types/food';
// import { uploadMultipleImagesToImageBB } from '@/utils/imageUpload';

// const MAX_IMAGES = 3;

// export const useFoodForm = () => {
//   // Basic Info
//   const [formData, setFormData] = useState({
//     name: '',
//     shortDesc: '',
//     description: '',
//     category: '',
//     dietaryType: 'non-veg',
//     price: '',
//     discountPrice: '',
//     prepTime: '20-25',
//     calories: '',
//     spiciness: '0',
//     isFeatured: false,
//     isAvailable: true,
//   });

//   // Dynamic Lists
//   const [variants, setVariants] = useState<Variant[]>([{ name: 'Regular', price: '' }]);
//   const [addOns, setAddOns] = useState<AddOn[]>([]);
  
//   // Image States
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  
//   // Form States
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Pending files for upload
//   const pendingFilesRef = useRef<File[]>([]);

//   // Update form field
//   const updateField = useCallback((field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }
//   }, [errors]);

//   // Variant handlers
//   const addVariant = useCallback(() => {
//     setVariants([...variants, { name: '', price: '' }]);
//   }, [variants]);

//   const removeVariant = useCallback((index: number) => {
//     setVariants(variants.filter((_, i) => i !== index));
//   }, [variants]);

//   const updateVariant = useCallback((index: number, field: keyof Variant, value: string) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   }, [variants]);

//   // Add-on handlers
//   const addAddOn = useCallback(() => {
//     setAddOns([...addOns, { name: '', price: '' }]);
//   }, [addOns]);

//   const removeAddOn = useCallback((index: number) => {
//     setAddOns(addOns.filter((_, i) => i !== index));
//   }, [addOns]);

//   const updateAddOn = useCallback((index: number, field: keyof AddOn, value: string) => {
//     const updated = [...addOns];
//     updated[index][field] = value;
//     setAddOns(updated);
//   }, [addOns]);

//   // Image handlers
//   const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const remainingSlots = MAX_IMAGES - imagePreviews.length;
//     const newFiles = Array.from(files).slice(0, remainingSlots);

//     if (newFiles.length === 0) {
//       alert(`Maximum ${MAX_IMAGES} images allowed.`);
//       return;
//     }

//     pendingFilesRef.current = [...pendingFilesRef.current, ...newFiles];
//     const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prev) => [...prev, ...newPreviews]);
//   }, [imagePreviews.length]);

//   const uploadImages = useCallback(async (): Promise<string[]> => {
//     if (pendingFilesRef.current.length === 0) {
//       return imageUrls;
//     }

//     setIsUploading(true);
//     setUploadProgress({ current: 0, total: pendingFilesRef.current.length });

//     try {
//       const result = await uploadMultipleImagesToImageBB(
//         pendingFilesRef.current,
//         (completed, total) => {
//           setUploadProgress({ current: completed, total });
//         }
//       );

//       if (result.success) {
//         const newUrls = [...imageUrls, ...result.urls];
//         setImageUrls(newUrls);
//         pendingFilesRef.current = [];
//         return newUrls;
//       } else {
//         console.error('Upload errors:', result.errors);
//         alert(`Failed to upload ${result.errors.length} image(s). Please try again.`);
//         return imageUrls;
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Failed to upload images. Please try again.');
//       return imageUrls;
//     } finally {
//       setIsUploading(false);
//       setUploadProgress({ current: 0, total: 0 });
//     }
//   }, [imageUrls]);

//   const removeImage = useCallback((index: number) => {
//     URL.revokeObjectURL(imagePreviews[index]);
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    
//     // Remove from pending files if not uploaded yet
//     if (index < pendingFilesRef.current.length) {
//       pendingFilesRef.current = pendingFilesRef.current.filter((_, i) => i !== index);
//     }
//   }, [imagePreviews]);

//   // Validation
//   const validate = useCallback((): boolean => {
//     const validationErrors: FormErrors = {};

//     if (!formData.name?.trim()) {
//       validationErrors.name = 'Food name is required';
//     } else if (formData.name.length < 3) {
//       validationErrors.name = 'Food name must be at least 3 characters';
//     }

//     if (!formData.shortDesc?.trim()) {
//       validationErrors.shortDesc = 'Short description is required';
//     } else if (formData.shortDesc.length > 120) {
//       validationErrors.shortDesc = 'Must be less than 120 characters';
//     }

//     if (!formData.category) {
//       validationErrors.category = 'Please select a category';
//     }

//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       validationErrors.price = 'Valid price is required';
//     }

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   }, [formData]);

//   // Submit handler
//   // const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
    
//   //   if (!validate()) {
//   //     const firstError = document.querySelector('[data-error="true"]');
//   //     if (firstError) {
//   //       firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   //     }
//   //     return;
//   //   }

//   //   setIsSubmitting(true);

//   //   try {
//   //     // Upload images if any pending
//   //     let finalImageUrls = imageUrls;
//   //     if (pendingFilesRef.current.length > 0) {
//   //       finalImageUrls = await uploadImages();
//   //     }

//   //     const submitData: FoodFormData = {
//   //       name: formData.name,
//   //       shortDesc: formData.shortDesc,
//   //       description: formData.description || '',
//   //       category: formData.category,
//   //       dietaryType: formData.dietaryType as 'veg' | 'non-veg' | 'vegan',
//   //       price: parseFloat(formData.price) || 0,
//   //       discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
//   //       prepTime: formData.prepTime || '20-25',
//   //       calories: formData.calories || '',
//   //       spiciness: formData.spiciness as '0' | '1' | '2' | '3',
//   //       isFeatured: formData.isFeatured || false,
//   //       isAvailable: formData.isAvailable,
//   //       variants,
//   //       addOns,
//   //       images: finalImageUrls,
//   //     };

//   //     console.log('Food Data Submitted:', submitData);
      
//   //     await new Promise(resolve => setTimeout(resolve, 1000));
//   //     alert('Food Item Added Successfully! 🎉');
      
//   //   } catch (error) {
//   //     console.error('Submission error:', error);
//   //     alert('Failed to add food item. Please try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // }, [formData, variants, addOns, imageUrls, validate, uploadImages]);


//   // Submit handler
// const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
//   // ১. ইভেন্ট ডিফল্ট ও স্টপ প্রপাগেশন
//   if (e) {
//     e.preventDefault();
//     e.stopPropagation();
//   }

//   if (!validate()) {
//     const firstError = document.querySelector('[data-error="true"]');
//     if (firstError) {
//       firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     let finalImageUrls = imageUrls;
//     if (pendingFilesRef.current.length > 0) {
//       finalImageUrls = await uploadImages();
//     }

//     const submitData: FoodFormData = {
//       name: formData.name,
//       shortDesc: formData.shortDesc,
//       description: formData.description || '',
//       category: formData.category,
//       dietaryType: formData.dietaryType as 'veg' | 'non-veg' | 'vegan',
//       price: parseFloat(formData.price) || 0,
//       discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
//       prepTime: formData.prepTime || '20-25',
//       calories: formData.calories || '',
//       spiciness: formData.spiciness as '0' | '1' | '2' | '3',
//       isFeatured: formData.isFeatured || false,
//       isAvailable: formData.isAvailable,
//       variants,
//       addOns,
//       images: finalImageUrls,
//     };

//     console.log("📤 Submitting Payload Data:", submitData);
//     const response = await fetch('http://localhost:5000/api/all-menu', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(submitData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || 'খাবার যোগ করতে ব্যর্থ হয়েছে!');
//     }

//     console.log('API Response:', result);
//     alert('Food Item Added Successfully! 🎉');

//   } catch (error: any) {
//     console.error('Submission error:', error);
//     alert(error.message || 'Failed to add food item.');
//   } finally {
//     setIsSubmitting(false);
//   }
// }, [formData, variants, addOns, imageUrls, validate, uploadImages]);


  
//   return {
//     formData,
//     updateField,
//     variants,
//     addVariant,
//     removeVariant,
//     updateVariant,
//     addOns,
//     addAddOn,
//     removeAddOn,
//     updateAddOn,
//     imagePreviews,
//     handleImageChange,
//     removeImage,
//     isUploading,
//     uploadProgress,
//     errors,
//     isSubmitting,
//     handleSubmit,
//     MAX_IMAGES,
//   };
// };




// hooks/useFoodForm.ts
import { useState, useCallback, useRef } from 'react';
import { Variant, AddOn, FoodFormData, FormErrors } from '@/types/food';
import { uploadMultipleImagesToImageBB } from '@/utils/imageUpload';
import toast from 'react-hot-toast';

const MAX_IMAGES = 3;

const INITIAL_FORM_DATA = {
  name: '',
  shortDesc: '',
  description: '',
  category: '',
  dietaryType: 'non-veg',
  price: '',
  discountPrice: '',
  prepTime: '20-25',
  calories: '',
  spiciness: '0',
  isFeatured: false,
  isAvailable: true,
};

export const useFoodForm = () => {
  // Basic Info
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Dynamic Lists
  const [variants, setVariants] = useState<Variant[]>([{ name: 'Regular', price: '' }]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  
  // Image States
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  
  // Form States
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Pending files for upload
  const pendingFilesRef = useRef<File[]>([]);

  // Reset form handler (সফল সাবমিট হলে স্বয়ংক্রিয়ভাবে ফর্ম রিসেট করবে)
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setVariants([{ name: 'Regular', price: '' }]);
    setAddOns([]);
    setImageUrls([]);
    
    // ব্রাউজারের মেমোরি থেকে ইমেজের প্রিভিউ URL গুলো ক্লিনআপ করা
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
    pendingFilesRef.current = [];
    setErrors({});
  }, [imagePreviews]);

  // Update form field
  const updateField = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Variant handlers
  const addVariant = useCallback(() => {
    setVariants((prev) => [...prev, { name: '', price: '' }]);
  }, []);

  const removeVariant = useCallback((index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateVariant = useCallback((index: number, field: keyof Variant, value: string) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  // Add-on handlers
  const addAddOn = useCallback(() => {
    setAddOns((prev) => [...prev, { name: '', price: '' }]);
  }, []);

  const removeAddOn = useCallback((index: number) => {
    setAddOns((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateAddOn = useCallback((index: number, field: keyof AddOn, value: string) => {
    setAddOns((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  // Image handlers
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    const newFiles = Array.from(files).slice(0, remainingSlots);

    if (newFiles.length === 0) {
      alert(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    pendingFilesRef.current = [...pendingFilesRef.current, ...newFiles];
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  }, [imagePreviews.length]);

  const uploadImages = useCallback(async (): Promise<string[]> => {
    if (pendingFilesRef.current.length === 0) {
      return imageUrls;
    }

    setIsUploading(true);
    setUploadProgress({ current: 0, total: pendingFilesRef.current.length });

    try {
      const result = await uploadMultipleImagesToImageBB(
        pendingFilesRef.current,
        (completed, total) => {
          setUploadProgress({ current: completed, total });
        }
      );

      if (result.success) {
        const newUrls = [...imageUrls, ...result.urls];
        setImageUrls(newUrls);
        pendingFilesRef.current = [];
        return newUrls;
      } else {
        console.error('Upload errors:', result.errors);
        alert(`Failed to upload ${result.errors.length} image(s). Please try again.`);
        return imageUrls;
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
      return imageUrls;
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  }, [imageUrls]);

  const removeImage = useCallback((index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    
    if (index < pendingFilesRef.current.length) {
      pendingFilesRef.current = pendingFilesRef.current.filter((_, i) => i !== index);
    }
  }, [imagePreviews]);

  // Validation
  const validate = useCallback((): boolean => {
    const validationErrors: FormErrors = {};

    if (!formData.name?.trim()) {
      validationErrors.name = 'Food name is required';
    } else if (formData.name.length < 3) {
      validationErrors.name = 'Food name must be at least 3 characters';
    }

    if (!formData.shortDesc?.trim()) {
      validationErrors.shortDesc = 'Short description is required';
    } else if (formData.shortDesc.length > 120) {
      validationErrors.shortDesc = 'Must be less than 120 characters';
    }

    if (!formData.category) {
      validationErrors.category = 'Please select a category';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      validationErrors.price = 'Valid price is required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  // Submit handler (উন্নত করা হয়েছে)
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // ১. পেন্ডিং ইমেজ থাকলে ImageBB তে আপলোড করা
      let finalImageUrls = imageUrls;
      if (pendingFilesRef.current.length > 0) {
        finalImageUrls = await uploadImages();
      }

      // ২. ব্যাকএন্ডের জন্য Payload তৈরি
      const submitData: FoodFormData = {
        name: formData.name,
        shortDesc: formData.shortDesc,
        description: formData.description || '',
        category: formData.category,
        dietaryType: formData.dietaryType as 'veg' | 'non-veg' | 'vegan',
        price: parseFloat(formData.price) || 0,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        prepTime: formData.prepTime || '20-25',
        calories: formData.calories || '',
        spiciness: formData.spiciness as '0' | '1' | '2' | '3',
        isFeatured: formData.isFeatured || false,
        isAvailable: formData.isAvailable,
        variants,
        addOns,
        images: finalImageUrls,
      };

      //  সাবমিট হওয়া ডেটা 
      console.log('📤 Submitting Payload Data:', submitData);

      // ৩. ব্যাকএন্ডে API কল
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add food item!');
      }

      console.log('📥 API Response:', result);
      toast.success('Food Item Added Successfully! 🎉');

      // ৪. সফল হলে ফর্ম রিসেট করা
      resetForm();

    } catch (error: any) {
      toast.error('Submission error:', error);
      alert(error.message || 'Failed to add food item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, variants, addOns, imageUrls, validate, uploadImages, resetForm]);

  return {
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
    resetForm,
    MAX_IMAGES,
  };
};