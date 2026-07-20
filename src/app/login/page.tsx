// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import Link from "next/link";
// import { 
//   FiMail, 
//   FiLock, 
//   FiArrowRight, 
//   FiEye, 
//   FiEyeOff 
// } from "react-icons/fi";

// import { FcGoogle } from "react-icons/fc";

// export default function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   // ইনপুট স্টেট হ্যান্ডলার
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ফর্ম সাবমিট হ্যান্ডলার (Email/Password)
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       console.log("Logging in with:", formData);
//       // আপনার লগইন API কল এখানে হ্যান্ডেল করবেন
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // গুগল সাইন-ইন হ্যান্ডলার
//   const handleGoogleSignIn = async () => {
//     try {
//       console.log("Initiating Google Sign-In...");
//       // আপনার NextAuth বা Firebase ওথ লজিক এখানে কল করবেন
//     } catch (error) {
//       console.error("Google sign in error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4 md:p-10 pt-24 selection:bg-[#A03E0B]/20">
//       {/* Main Container */}
//       <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-orange-100/50 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] transition-all duration-300">
        
//         {/* Left Side: Premium Brand Panel */}
//         <div className="hidden md:flex md:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
//           {/* Background Image */}
//           <div 
//             className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
//             style={{ 
//               backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')` 
//             }}
//           />
//           {/* Advanced Overlay for Rich Contrast */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#A03E0B]/85 to-[#4a1902]" />

//           {/* Logo */}
//           <div className="flex items-center gap-3 relative z-10 text-white">
//             <span className="text-2xl font-black tracking-wider uppercase text-orange-50">Dineflow</span>
//           </div>

//           {/* Premium Typography */}
//           <div className="relative z-10 my-auto text-white space-y-4">
//             <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
//               Welcome Back
//             </span>
//             <h2 className="text-4xl font-black leading-tight tracking-tight">
//               Savor the <br />Moment, <span className="text-orange-300">Log In</span>.
//             </h2>
//             <p className="text-orange-100/70 text-sm leading-relaxed max-w-xs font-medium">
//               Access your personalized dashboard and take control of your culinary flow instantly.
//             </p>
//           </div>

//           {/* Footer Text */}
//           <div className="relative z-10 text-orange-200/40 text-xs font-semibold tracking-wide">
//             © 2026 Dineflow. All rights reserved.
//           </div>
//         </div>

//         {/* Right Side: Form Fields Panel */}
//         <div className="col-span-1 md:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-center bg-white/40">
//           <div className="max-w-md w-full mx-auto">
            
//             {/* Header */}
//             <div className="mb-7 text-center md:text-left">
//               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
//               <p className="text-gray-500 text-sm mt-2 font-medium">Please enter your details to sign in to your account.</p>
//             </div>

//             {/* Google Sign In Button */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="w-full py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
//             >
//               <FcGoogle size={25}></FcGoogle>
//               Continue with Google
//             </button>

//             {/* Divider (OR) */}
//             <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gray-200/80"></div>
//               <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
//               <div className="flex-grow border-t border-gray-200/80"></div>
//             </div>

//             {/* Regular Credentials Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               {/* Email Field */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
//                 <div className="relative group">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
//                     <FiMail size={18} />
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="example@dineflow.com"
//                     className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-1.5">
//                 <div className="flex items-center justify-between">
//                   <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Password</label>
//                   <Link href="/forgot-password" className="text-xs font-bold text-[#A03E0B] hover:underline transition-all">
//                     Forgot?
//                   </Link>
//                 </div>
//                 <div className="relative group">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
//                     <FiLock size={18} />
//                   </span>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="w-full pl-11 pr-12 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A03E0B] transition-colors focus:outline-none"
//                   >
//                     {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full mt-2 py-4 bg-[#A03E0B] hover:bg-[#8A3308] text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-950/10 hover:shadow-orange-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
//               >
//                 {loading ? "Signing In..." : "Sign In"}
//                 {!loading && <FiArrowRight size={16} />}
//               </button>

//               {/* Divider / Redirect */}
//               <div className="text-center mt-6">
//                 <p className="text-xs text-gray-500 font-semibold">
//                   Do not have an account?{" "}
//                   <Link href="/register" className="text-[#A03E0B] hover:underline font-bold transition-all">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </form>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client"; 
// import { 
//   FiMail, 
//   FiLock, 
//   FiArrowRight, 
//   FiEye, 
//   FiEyeOff 
// } from "react-icons/fi";
// import { FcGoogle } from "react-icons/fc";
// import toast from "react-hot-toast";

// export default function LoginForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // ইনপুট স্টেট হ্যান্ডলার
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ফর্ম সাবমিট হ্যান্ডলার (Better-Auth Email/Password)
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await authClient.signIn.email({
//         email: formData.email,
//         password: formData.password,
//         callbackURL: "/", // সফল লগইনের পর হোম পেজে রিডাইরেক্ট করবে
//       });
//       router.push("/");
//       router.refresh();
//     } catch (err: any) {
//       console.error("Login error:", err);
//       setError(err?.message || "Invalid email or password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // গুগল সাইন-ইন হ্যান্ডলার (Better-Auth Social)
//   const handleGoogleSignIn = async () => {
//     try {
//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "/", // সফল লগইনের পর হোম পেজে রিডাইরেক্ট করবে
//       });
//       // ১. সফল হলে টোস্ট মেসেজ দেখাবে
//       toast.success("🎉 Welcome back! Login successful.");

//       // ২. টোস্ট দেখার জন্য একটু সময় দিয়ে রিডাইরেক্ট করা (অপশনাল কিন্তু বেস্ট প্র্যাকটিস)
//       setTimeout(() => {
//         router.push("/");
//         router.refresh();
//       }, 1000);
//     } catch (err) {
//       console.error("Google sign in error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4 md:p-10 pt-24 selection:bg-[#A03E0B]/20">
//       {/* Main Container */}
//       <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-orange-100/50 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] transition-all duration-300">
        
//         {/* Left Side: Premium Brand Panel */}
//         <div className="hidden md:flex md:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
//           {/* Background Image */}
//           <div 
//             className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
//             style={{ 
//               backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')` 
//             }}
//           />
//           {/* Advanced Overlay for Rich Contrast */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#A03E0B]/85 to-[#4a1902]" />

//           {/* Logo */}
//           <div className="flex items-center gap-3 relative z-10 text-white">
//             <span className="text-2xl font-black tracking-wider uppercase text-orange-50">Dineflow</span>
//           </div>

//           {/* Premium Typography */}
//           <div className="relative z-10 my-auto text-white space-y-4">
//             <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
//               Welcome Back
//             </span>
//             <h2 className="text-4xl font-black leading-tight tracking-tight">
//               Savor the <br />Moment, <span className="text-orange-300">Log In</span>.
//             </h2>
//             <p className="text-orange-100/70 text-sm leading-relaxed max-w-xs font-medium">
//               Access your personalized dashboard and take control of your culinary flow instantly.
//             </p>
//           </div>

//           {/* Footer Text */}
//           <div className="relative z-10 text-orange-200/40 text-xs font-semibold tracking-wide">
//             © 2026 Dineflow. All rights reserved.
//           </div>
//         </div>

//         {/* Right Side: Form Fields Panel */}
//         <div className="col-span-1 md:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-center bg-white/60 backdrop-blur-md">
//           <div className="max-w-md w-full mx-auto">
            
//             {/* Header */}
//             <div className="mb-7 text-center md:text-left">
//               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
//               <p className="text-gray-500 text-sm mt-2 font-medium">Please enter your details to sign in to your account.</p>
//             </div>

//             {/* Error Message Display */}
//             {error && (
//               <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
//                 {error}
//               </div>
//             )}

//             {/* Google Sign In Button */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="w-full py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
//             >
//               <FcGoogle size={25} />
//               Continue with Google
//             </button>

//             {/* Divider (OR) */}
//             <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gray-200/80"></div>
//               <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
//               <div className="flex-grow border-t border-gray-200/80"></div>
//             </div>

//             {/* Regular Credentials Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               {/* Email Field */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
//                 <div className="relative group">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
//                     <FiMail size={18} />
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="example@dineflow.com"
//                     className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-1.5">
//                 <div className="flex items-center justify-between">
//                   <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Password</label>
//                   <Link href="/forgot-password" className="text-xs font-bold text-[#A03E0B] hover:underline transition-all">
//                     Forgot?
//                   </Link>
//                 </div>
//                 <div className="relative group">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
//                     <FiLock size={18} />
//                   </span>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="w-full pl-11 pr-12 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A03E0B] transition-colors focus:outline-none"
//                   >
//                     {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full mt-2 py-4 bg-[#A03E0B] hover:bg-[#8A3308] text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-950/10 hover:shadow-orange-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
//               >
//                 {loading ? "Signing In..." : "Sign In"}
//                 {!loading && <FiArrowRight size={16} />}
//               </button>

//               {/* Redirect to Register */}
//               <div className="text-center mt-6">
//                 <p className="text-xs text-gray-500 font-semibold">
//                   Don't have an account?{" "}
//                   <Link href="/register" className="text-[#A03E0B] hover:underline font-bold transition-all">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </form>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }





"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff 
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ইনপুট স্টেট হ্যান্ডলার
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার (Better-Auth Email/Password)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/", // সফল লগইনের পর হোম পেজে রিডাইরেক্ট করবে
      });
      
      // ১. সফল লগইনের টোস্ট দেখাবে
      toast.success("🎉 Welcome back! Login successful.");

      // ২. সেশন কুকি ব্রাউজারে সেট হতে এবং টোস্ট দেখতে ১ সেকেন্ড অপেক্ষা করবে
      setTimeout(() => {
        router.push("/");
        router.refresh(); // অবতার এবং নেভবার স্টেট রিফ্রেশ করবে
      }, 2500);

    } catch (err: any) {
      console.error("Login error:", err);
      const errMsg = err?.message || "Invalid email or password. Please try again.";
      setError(errMsg);
      toast.error(errMsg); // এরর টোস্ট দেখাবে
    } finally {
      setLoading(false);
    }
  };

  // গুগল সাইন-ইন হ্যান্ডলার (Better-Auth Social)
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
      
      toast.success("🎉 Welcome back! Login successful.");
      
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error("Google sign in error:", err);
      toast.error(err?.message || "Google sign in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4 md:p-10 pt-24 selection:bg-[#A03E0B]/20">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-orange-100/50 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] transition-all duration-300">
        
        {/* Left Side: Premium Brand Panel */}
        <div className="hidden md:flex md:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#A03E0B]/85 to-[#4a1902]" />

          <div className="flex items-center gap-3 relative z-10 text-white">
            <span className="text-2xl font-black tracking-wider uppercase text-orange-50">Dineflow</span>
          </div>

          <div className="relative z-10 my-auto text-white space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
              Welcome Back
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Savor the <br />Moment, <span className="text-orange-300">Log In</span>.
            </h2>
            <p className="text-orange-100/70 text-sm leading-relaxed max-w-xs font-medium">
              Access your personalized dashboard and take control of your culinary flow instantly.
            </p>
          </div>

          <div className="relative z-10 text-orange-200/40 text-xs font-semibold tracking-wide">
            © 2026 Dineflow. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form Fields Panel */}
        <div className="col-span-1 md:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-center bg-white/60 backdrop-blur-md">
          <div className="max-w-md w-full mx-auto">
            
            {/* Header */}
            <div className="mb-7 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">Please enter your details to sign in to your account.</p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
                {error}
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
            >
              <FcGoogle size={25} />
              Continue with Google
            </button>

            {/* Divider (OR) */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-200/80"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-gray-200/80"></div>
            </div>

            {/* Regular Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
                    <FiMail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@dineflow.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Password</label>
                  <Link href="/forgot-password" className="text-xs font-bold text-[#A03E0B] hover:underline transition-all">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
                    <FiLock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A03E0B] transition-colors focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 bg-[#A03E0B] hover:bg-[#8A3308] text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-950/10 hover:shadow-orange-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <FiArrowRight size={16} />}
              </button>

              {/* Redirect to Register */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500 font-semibold">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-[#A03E0B] hover:underline font-bold transition-all">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}