"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff, 
  FiImage,
  FiCheckCircle
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // টেক্সট ইনপুট হ্যান্ডলার
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ইমেজ ফাইল হ্যান্ডলার
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
// ফর্ম সাবমিট হ্যান্ডলার (Better-Auth System)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting Data via authClient:", { ...formData, image });

      // ১. ফাইলটিকে Base64 বা টেক্সট ফরম্যাটে রূপান্তর করার লজিক
      let base64Image = "";
      if (image) {
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      }
      
      // ২. authClient এর মাধ্যমে Better-Auth এ সাইন-আপ কল
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: base64Image || "", // কনভার্ট করা ইমেজ স্ট্রিং বা খালি স্ট্রিং
        callbackURL: "/login"
      });

      // ৩. যদি কোনো এরর আসে
      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message || "Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", data);
      
      // ৪. সফল হলে টোস্ট মেসেজ দেখানো
      toast.success("🎉 Account created successfully!");
      
      // ৫. ইনপুট ফর্ম ও ইমেজের স্টেট রিসেট করা
      setFormData({ name: "", email: "", password: "" });
      setImage(null);
      setImagePreview(null);
      
      // ৬. ১.৫ সেকেন্ড অপেক্ষা করে লগইন পেজে রিডাইরেক্ট করা
      setTimeout(() => {
      router.push("/"); // হোম পেজে নিয়ে যাবে
        router.refresh(); // সেশন/স্টেট আপডেট করার জন্য পেজ রিফ্রেশ করবে
      }, 2500);
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };




  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     console.log("Submitting Data:", { ...formData, image });
  //     // আপনার API কল বা সাবমিশন লজিক এখানে হবে
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  // গুগল সাইন-ইন হ্যান্ডলার
  const handleGoogleSignIn = async () => {
    try {
      console.log("Initiating Google Sign-In...");
      // আপনার NextAuth বা Firebase ওথ লজিক এখানে কল করবেন
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4 md:p-10 pt-24 selection:bg-[#A03E0B]/20">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-orange-100/50 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[650px] transition-all duration-300">
        
        {/* Left Side: Premium Brand Panel */}
        <div className="hidden md:flex md:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')` 
            }}
          />
          {/* Advanced Overlay for Rich Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#A03E0B]/85 to-[#4a1902]" />

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10 text-white">
            {/* <div className="p-2.5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-inner">
              <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth="2.5"
                 stroke="currentColor"
                 className="w-5 h-5 text-white"
               >
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14.19C15.538 4.042 16.5 2 16.5 2L7.5 13.795h5.313L9.813 15.904z" />
               </svg>
            </div> */}
            <Link href="/"><span className="text-2xl font-black tracking-wider uppercase text-orange-50">Dineflow</span></Link>
          </div>

          {/* Premium Typography */}
          <div className="relative z-10 my-auto text-white space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
              Premium Experience
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Discover the <br /><span className="text-orange-300">Art</span> of Great Food.
            </h2>
            <p className="text-orange-100/70 text-sm leading-relaxed max-w-xs font-medium">
              Join Dineflow today and manage your culinary journey with premium controls and effortless flow.
            </p>
          </div>

          {/* Footer Text */}
          <div className="relative z-10 text-orange-200/40 text-xs font-semibold tracking-wide">
            © 2026 Dineflow. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form Fields Panel */}
        <div className="col-span-1 md:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-center bg-white/40">
          <div className="max-w-md w-full mx-auto">
            
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">Get started with your free developer or client account.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Full Name</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#A03E0B] transition-colors">
                    <FiUser size={18} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jonayet"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#A03E0B]/5 focus:border-[#A03E0B] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

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
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Password</label>
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

              {/* Profile Image Input Field (Placed below Password) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Profile Photo</label>
                <div className="relative group">
                  {/* Visual Fake Input Trigger */}
                  <label className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100/70 border border-gray-200 group-hover:border-gray-300 rounded-2xl text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-between overflow-hidden">
                    
                    {/* Icon and Text Container */}
                    <div className="flex items-center gap-0">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-hover:text-[#A03E0B] transition-colors">
                        <FiImage size={18} />
                      </span>
                      <span className={`${image ? "text-gray-900 font-semibold" : "text-gray-400"} truncate max-w-[240px]`}>
                        {image ? image.name : "Upload profile image"}
                      </span>
                    </div>

                    {/* Preview Badge or Upload Tag */}
                    <div className="flex items-center gap-2 shrink-0">
                      {imagePreview ? (
                        <div className="w-7 h-7 rounded-full border border-orange-200 overflow-hidden shadow-sm">
                          <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200/60 px-2.5 py-1 rounded-lg group-hover:bg-[#A03E0B]/10 group-hover:text-[#A03E0B] transition-colors">
                          Browse
                        </span>
                      )}
                      {image && <FiCheckCircle size={16} className="text-emerald-500 shrink-0" />}
                    </div>

                    {/* Actual Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 bg-[#A03E0B] hover:bg-[#8A3308] text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-950/10 hover:shadow-orange-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <FiArrowRight size={16} />}
              </button>

              {/* Divider / Redirect */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500 font-semibold">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#A03E0B] hover:underline font-bold transition-all">
                    Log In
                  </Link>
                </p>
              </div>

                {/* Google Sign In Button */}
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
                          >
                            <FcGoogle size={25}></FcGoogle>
                            Continue with Google
                          </button>
              
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}