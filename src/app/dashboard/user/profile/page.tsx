// 'use client';

// import { useState, useEffect } from 'react';
// import { authClient } from '@/lib/auth-client';
// import { 
//   FiUser, 
//   FiMail, 
//   FiShield, 
//   FiCamera, 
//   FiCheck, 
//   FiEdit2, 
//   FiPhone, 
//   FiMapPin 
// } from 'react-icons/fi';

// export default function UserProfilePage() {
//   const { data: session, isPending } = authClient.useSession();
//   const sessionUser = session?.user;

//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [successMsg, setSuccessMsg] = useState<string>('');
  
//   // Form States
//   const [name, setName] = useState<string>('');
//   const [image, setImage] = useState<string>('');
//   const [phone, setPhone] = useState<string>('');
//   const [address, setAddress] = useState<string>('');

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//   // 📡 ডাটাবেজ থেকে ইউজারের প্রোফাইল ফেচ করা
//   useEffect(() => {
//     if (sessionUser?.email) {
//       fetch(`${API_URL}/api/user/profile?email=${sessionUser.email}`)
//         .then((res) => res.json())
//         .then((result) => {
//           if (result.success && result.data) {
//             setName(result.data.name || sessionUser.name || '');
//             setImage(result.data.image || sessionUser.image || '');
//             setPhone(result.data.phone || '');
//             setAddress(result.data.address || '');
//           }
//         })
//         .catch((err) => console.error('Profile fetch error:', err));
//     }
//   }, [sessionUser, API_URL]);

//   // 📝 প্রোফাইল আপডেট করার হ্যান্ডলার
//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg('');

//     try {
//       const res = await fetch(`${API_URL}/api/user/profile`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: sessionUser?.email,
//           name,
//           image,
//           phone,
//           address,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSuccessMsg(data.message);
//         setIsEditing(false);
//       } else {
//         alert(data.message || 'আপডেট ব্যর্থ হয়েছে!');
//       }
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       alert('সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isPending) {
//     return (
//       <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-pulse">
//         <div className="h-44 bg-slate-100 rounded-3xl" />
//         <div className="h-64 bg-slate-100 rounded-2xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      
//       {/* 1. HERO BANNER */}
//       <div className="relative bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-orange-500/10 overflow-hidden">
//         <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          
//           {/* Avatar */}
//           <div className="relative group shrink-0">
//             <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center text-3xl font-black text-white shadow-lg">
//               {image ? (
//                 <img
//                   src={image}
//                   alt={name || 'User Avatar'}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span>{name ? name.charAt(0).toUpperCase() : 'U'}</span>
//               )}
//             </div>
//             <button 
//               onClick={() => setIsEditing(true)}
//               title="Change Profile Picture"
//               className="absolute bottom-1 right-1 p-2 bg-white text-orange-600 rounded-full shadow-md hover:bg-orange-50 transition cursor-pointer"
//             >
//               <FiCamera className="text-sm" />
//             </button>
//           </div>

//           {/* User Meta */}
//           <div className="text-center md:text-left space-y-1.5">
//             <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
//               User Profile
//             </span>
//             <h1 className="text-2xl md:text-3xl font-black tracking-tight">
//               {name || 'User Account'}
//             </h1>
//             <p className="text-orange-100 text-xs md:text-sm font-medium">
//               {sessionUser?.email || 'user@example.com'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* SUCCESS NOTIFICATION */}
//       {successMsg && (
//         <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 text-xs font-bold">
//           <FiCheck className="text-base shrink-0" />
//           <span>{successMsg}</span>
//         </div>
//       )}

//       {/* 2. PROFILE DETAILS / EDIT FORM */}
//       <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
//         <div className="flex items-center justify-between pb-4 border-b border-slate-100">
//           <div>
//             <h2 className="text-base font-black text-gray-900">Personal Information</h2>
//             <p className="text-xs text-gray-400 font-medium">View and edit your profile details.</p>
//           </div>
          
//           {!isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition cursor-pointer"
//             >
//               <FiEdit2 /> Edit Profile
//             </button>
//           )}
//         </div>

//         {isEditing ? (
//           /* EDIT FORM */
//           <form onSubmit={handleUpdateProfile} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//               {/* Full Name */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-700">Full Name</label>
//                 <div className="relative">
//                   <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
//                     placeholder="Enter name"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email (Read-Only) */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-700">Email (Read Only)</label>
//                 <div className="relative opacity-60">
//                   <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//                   <input
//                     type="email"
//                     value={sessionUser?.email || ''}
//                     disabled
//                     className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-600 cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {/* Image URL */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-700">Profile Image URL</label>
//                 <div className="relative">
//                   <FiCamera className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//                   <input
//                     type="url"
//                     value={image}
//                     onChange={(e) => setImage(e.target.value)}
//                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
//                     placeholder="https://example.com/photo.jpg"
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-gray-700">Phone Number</label>
//                 <div className="relative">
//                   <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
//                     placeholder="+880 1700-000000"
//                   />
//                 </div>
//               </div>

//             </div>

//             {/* Address */}
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-gray-700">Delivery Address</label>
//               <div className="relative">
//                 <FiMapPin className="absolute left-3.5 top-3 text-gray-400 text-sm" />
//                 <textarea
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   rows={2}
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
//                   placeholder="Enter full address"
//                 />
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3 pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50"
//               >
//                 {loading ? 'Updating...' : 'Save Changes'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-600 rounded-xl text-xs font-bold transition cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         ) : (
//           /* DISPLAY DETAILS */
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <FiUser className="text-orange-500" /> Full Name
//               </span>
//               <p className="text-sm font-extrabold text-gray-900">{name || 'N/A'}</p>
//             </div>

//             <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <FiMail className="text-orange-500" /> Email
//               </span>
//               <p className="text-sm font-extrabold text-gray-900">{sessionUser?.email || 'N/A'}</p>
//             </div>

//             <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <FiPhone className="text-orange-500" /> Phone
//               </span>
//               <p className="text-sm font-extrabold text-gray-900">{phone || 'Not Provided'}</p>
//             </div>

//             <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <FiShield className="text-orange-500" /> Account Status
//               </span>
//               <p className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
//                 <FiCheck className="text-xs" /> Active User
//               </p>
//             </div>

//             <div className="md:col-span-2 p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <FiMapPin className="text-orange-500" /> Address
//               </span>
//               <p className="text-sm font-extrabold text-gray-900">{address || 'No address saved yet'}</p>
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }




'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { authClient } from '@/lib/auth-client';
import { 
  FiUser, 
  FiMail, 
  FiShield, 
  FiCamera, 
  FiCheck, 
  FiEdit2, 
  FiPhone, 
  FiMapPin,
  FiUploadCloud,
  FiLoader
} from 'react-icons/fi';

export default function UserProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const sessionUser = session?.user;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  
  // Form States
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY; // .env.local এ ImgBB Key যোগ করতে পারেন

  // 📡 ডাটাবেজ থেকে ইউজারের প্রোফাইল ফেচ করা
  useEffect(() => {
    if (sessionUser?.email) {
      fetch(`${API_URL}/api/user/profile?email=${sessionUser.email}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            setName(result.data.name || sessionUser.name || '');
            setImage(result.data.image || sessionUser.image || '');
            setPhone(result.data.phone || '');
            setAddress(result.data.address || '');
          }
        })
        .catch((err) => console.error('Profile fetch error:', err));
    }
  }, [sessionUser, API_URL]);

  // 📤 ফাইল আপলোড হ্যান্ডলার (ImgBB)
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMGBB_API_KEY) {
      alert('ImgBB API key পাওয়া যায়নি! দয়া করে .env.local ফাইলে NEXT_PUBLIC_IMGBB_API_KEY যোগ করুন।');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImage(data.data.url); // ইমেজ URL স্টেট আপডেট
      } else {
        alert('ছবি আপলোড ব্যর্থ হয়েছে!');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('ছবি আপলোড করার সময় একটি সমস্যা দেখা দিয়েছে!');
    } finally {
      setUploadingImage(false);
    }
  };

  // 📝 প্রোফাইল আপডেট করার হ্যান্ডলার
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sessionUser?.email,
          name,
          image,
          phone,
          address,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setIsEditing(false);
      } else {
        alert(data.message || 'আপডেট ব্যর্থ হয়েছে!');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে!');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-pulse">
        <div className="h-44 bg-slate-100 rounded-3xl" />
        <div className="h-64 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* 1. HERO BANNER */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-orange-500/10 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          
          {/* Avatar with File Upload Input */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center text-3xl font-black text-white shadow-lg relative">
              {uploadingImage ? (
                <FiLoader className="animate-spin text-2xl text-white" />
              ) : image ? (
                <img
                  src={image}
                  alt={name || 'User Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{name ? name.charAt(0).toUpperCase() : 'U'}</span>
              )}
            </div>

            {/* Hidden File Input */}
            <label 
              htmlFor="avatar-upload" 
              title="Change Profile Picture"
              className="absolute bottom-1 right-1 p-2 bg-white text-orange-600 rounded-full shadow-md hover:bg-orange-50 transition cursor-pointer flex items-center justify-center"
            >
              <FiCamera className="text-sm" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {/* User Meta */}
          <div className="text-center md:text-left space-y-1.5">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
              User Profile
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              {name || 'User Account'}
            </h1>
            <p className="text-orange-100 text-xs md:text-sm font-medium">
              {sessionUser?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 text-xs font-bold">
          <FiCheck className="text-base shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. PROFILE DETAILS / EDIT FORM */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-gray-900">Personal Information</h2>
            <p className="text-xs text-gray-400 font-medium">View and edit your profile details.</p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition cursor-pointer"
            >
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          /* EDIT FORM */
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
                    placeholder="Enter name"
                    required
                  />
                </div>
              </div>

              {/* Email (Read-Only) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Email (Read Only)</label>
                <div className="relative opacity-60">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    value={sessionUser?.email || ''}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Profile Image File Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Profile Picture</label>
                <div className="relative">
                  <label 
                    htmlFor="form-image-upload" 
                    className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-slate-100 transition"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FiUploadCloud className="text-orange-500 text-base" />
                      {uploadingImage ? 'Uploading image...' : 'Choose image file'}
                    </span>
                    <span className="bg-orange-100 text-orange-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                      Browse
                    </span>
                  </label>
                  <input
                    id="form-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
                    placeholder="+880 1700-000000"
                  />
                </div>
              </div>

            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Delivery Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-3 text-gray-400 text-sm" />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-orange-500 transition"
                  placeholder="Enter full address"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-600 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* DISPLAY DETAILS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiUser className="text-orange-500" /> Full Name
              </span>
              <p className="text-sm font-extrabold text-gray-900">{name || 'N/A'}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiMail className="text-orange-500" /> Email
              </span>
              <p className="text-sm font-extrabold text-gray-900">{sessionUser?.email || 'N/A'}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiPhone className="text-orange-500" /> Phone
              </span>
              <p className="text-sm font-extrabold text-gray-900">{phone || 'Not Provided'}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiShield className="text-orange-500" /> Account Status
              </span>
              <p className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
                <FiCheck className="text-xs" /> Active User
              </p>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl bg-slate-50/70 border border-slate-100/80 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiMapPin className="text-orange-500" /> Address
              </span>
              <p className="text-sm font-extrabold text-gray-900">{address || 'No address saved yet'}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}