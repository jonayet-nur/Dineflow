// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiShoppingBag, FiBell, FiMenu, FiX } from "react-icons/fi";

// // রোল অনুযায়ী নেভিগেশন লিংক
// const navLinks = {
//   user: [
//     { name: "Menu", path: "/menu" },
//     { name: "About", path: "/about" },
//     { name: "Blog", path: "/blog" },
//     { name: "Contact", path: "/contact" },
//   ],
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard" },
//     { name: "Manage Menu", path: "/admin/manage-menu" },
//     { name: "Orders", path: "/admin/orders" },
//     { name: "Analytics", path: "/admin/analytics" },
//   ],
// };

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
  
//   // ১. ডেমো লগইন স্টেট (শুরুতে false থাকবে যাতে Login/Sign Up বাটন দেখায়)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [role, setRole] = useState<"user" | "admin">("user"); // টেস্ট করার জন্য 'user' বা 'admin' করতে পারেন

//   // লগইন স্ট্যাটাস অনুযায়ী নেভ লিংক সিলেক্ট করা
//   const activeLinks = isLoggedIn ? navLinks[role] : navLinks["user"];

//   return (
//     <nav className="w-full bg-[#FCF8F5] border-b border-orange-100/50 px-6 py-4 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* Left Side: Logo with SVG */}
//         <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#A03E0B]">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6 text-[#A03E0B]"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M8 3v3M16 3v3M4 11h16a1 1 0 011 1 8 8 0 01-18 0 1 1 0 011-1z" />
//           </svg>
//           <span className="tracking-tight">Dineflow</span>
//         </Link>

//         {/* Center Side: Navigation Links (Always Centered) */}
//         <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
//           {activeLinks.map((link) => {
//             const isActive = pathname === link.path;
//             return (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`relative text-sm font-medium transition-colors pb-1 ${
//                   isActive 
//                     ? "text-[#A03E0B] font-semibold" 
//                     : "text-gray-600 hover:text-[#A03E0B]"
//                 }`}
//               >
//                 {link.name}
//                 {isActive && (
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A03E0B] rounded-full" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right Side: Dynamic Buttons & Icons */}
//         <div className="hidden md:flex items-center gap-6">
//           {/* লগইন থাকলে আইকনগুলো দেখাবে */}
//           {isLoggedIn && (
//             <>
//               <button className="text-gray-700 hover:text-[#A03E0B] relative p-1 transition-colors">
//                 <FiShoppingBag className="w-5 h-5" />
//               </button>

//               <button className="text-gray-700 hover:text-[#A03E0B] relative p-1 transition-colors">
//                 <FiBell className="w-5 h-5" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
//               </button>
//             </>
//           )}

//           {/* লগইন না থাকলে Login ও Sign Up বাটন দেখাবে */}
//           {!isLoggedIn ? (
//             <>
//               <button 
//                 onClick={() => setIsLoggedIn(true)} // টেস্ট করার জন্য ক্লিক করলেই লগইন হয়ে যাবে
//                 className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Login
//               </button>
//               <Link 
//                 href="/register" 
//                 className="px-6 py-2 bg-[#A03E0B] text-white rounded-full text-sm font-medium hover:bg-[#8A3308] shadow-sm transition-colors"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             // লগইন থাকলে Logout বাটন দেখাবে
//             <button 
//               onClick={() => setIsLoggedIn(false)} // ক্লিক করলেই লগআউট হয়ে যাবে এবং Login/Sign Up ফিরে আসবে
//               className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//         {/* Mobile Hamburger Button */}
//         <div className="md:hidden flex items-center gap-4">
//           <button 
//             onClick={() => setIsOpen(!isOpen)} 
//             className="text-gray-700 focus:outline-none p-1"
//           >
//             {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Panel */}
//       {isOpen && (
//         <div className="md:hidden mt-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col gap-4">
//           {activeLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
//                 pathname === link.path 
//                   ? "bg-[#FCF8F5] text-[#A03E0B]" 
//                   : "text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <hr className="border-gray-100" />
//           <div className="flex flex-col gap-3">
//             {!isLoggedIn ? (
//               <>
//                 <button 
//                   onClick={() => {
//                     setIsLoggedIn(true);
//                     setIsOpen(false);
//                   }}
//                   className="w-full text-center py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
//                 >
//                   Login
//                 </button>
//                 <Link 
//                   href="/register" 
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center py-2.5 bg-[#A03E0B] text-white rounded-full text-sm font-medium"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <button 
//                 onClick={() => {
//                   setIsLoggedIn(false);
//                   setIsOpen(false);
//                 }}
//                 className="w-full text-center py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiShoppingBag, FiBell, FiMenu, FiX, FiLogOut, FiLayout, FiSettings } from "react-icons/fi";

// // রোল অনুযায়ী নেভিগেশন লিংক
// const navLinks = {
//   user: [
//     { name: "Menu", path: "/menu" },
//     { name: "About", path: "/about" },
//     { name: "Blog", path: "/blog" },
//     { name: "Contact", path: "/contact" },
//   ],
//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard" },
//     { name: "Manage Menu", path: "/admin/manage-menu" },
//     { name: "Orders", path: "/admin/orders" },
//     { name: "Analytics", path: "/admin/analytics" },
//   ],
// };

// // Props টাইপ ডিক্লেয়ারেশন
// interface NavbarProps {
//   isLoggedIn?: boolean;
//   role?: "user" | "admin";
//   user?: {
//     name?: string;
//     email?: string;
//     image?: string | null;
//   };
//   onLogout?: () => void;
// }

// export default function Navbar({ 
//   isLoggedIn = false, 
//   role = "user", 
//   user, 
//   onLogout 
// }: NavbarProps) {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // ড্রপডাউন এরিয়ার বাইরে ক্লিক করলে মেনু ক্লোজ করার জন্য
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const activeLinks = isLoggedIn ? navLinks[role] : navLinks["user"];
//   const userFirstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

//   return (
//     <header className="fixed top-0 left-1/2 z-20 -translate-x-1/2  w-[100%] max-w-7xl">
//       {/* Modern Glassmorphic Container */}
//       <div className=" backdrop-blur-md   shadow-md transition-all duration-300">
//         <div className="flex items-center justify-between px-4 md:px-8 h-16 relative">
          
//           {/* Left Side: Logo */}
//           <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#A03E0B] shrink-0">
//             <div className="p-2 bg-[#A03E0B]/10 rounded-xl transition-all duration-300 hover:scale-105">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2.5"
//                 stroke="currentColor"
//                 className="w-5 h-5 text-[#A03E0B]"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14.19C15.538 4.042 16.5 2 16.5 2L7.5 13.795h5.313L9.813 15.904z" />
//               </svg>
//             </div>
//             <span className="tracking-tight font-extrabold text-[#A03E0B]">Dineflow</span>
//           </Link>

//           {/* Center Side: Navigation Links */}
//           <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
//             {activeLinks.map((link) => {
//               const isActive = pathname === link.path || pathname.startsWith(link.path + "/");
//               return (
//                 <Link
//                   key={link.path}
//                   href={link.path}
//                   className={`relative text-sm font-medium transition-colors pb-1 ${
//                     isActive 
//                       ? "text-[#A03E0B] font-semibold" 
//                       : "text-gray-600 hover:text-[#A03E0B]"
//                   }`}
//                 >
//                   {link.name}
//                   {isActive && (
//                     <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A03E0B] rounded-full" />
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Right Side: Actions */}
//           <div className="hidden lg:flex items-center gap-4">
//             {isLoggedIn ? (
//               <>
//                 {/* Cart Icon (Only for regular users) */}
//                 {role === "user" && (
//                   <button className="text-gray-700 hover:text-[#A03E0B] relative p-2 transition-colors rounded-xl hover:bg-orange-50 cursor-pointer">
//                     <FiShoppingBag className="w-5 h-5" />
//                   </button>
//                 )}

//                 {/* Notifications */}
//                 <button className="text-gray-700 hover:text-[#A03E0B] relative p-2 transition-colors rounded-xl hover:bg-orange-50 cursor-pointer">
//                   <FiBell className="w-5 h-5" />
//                   <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 border-2 border-[#FCF8F5] rounded-full animate-pulse" />
//                 </button>

//                 {/* Profile Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-2.5 p-1 pr-3.5 rounded-full bg-[#A03E0B]/5 hover:bg-[#A03E0B]/10 border border-[#A03E0B]/10 transition-all cursor-pointer outline-none"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-[#A03E0B] text-white flex items-center justify-center font-bold text-sm shrink-0 border border-orange-100/50 overflow-hidden">
//                       {user?.image ? (
//                         <img src={user.image} alt="user" className="w-full h-full object-cover" />
//                       ) : (
//                         userFirstLetter
//                       )}
//                     </div>
//                     {user?.name && (
//                       <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">
//                         {user.name}
//                       </span>
//                     )}
//                   </button>

//                   {/* Dropdown Menu */}
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-3 w-56 bg-white border border-orange-100/40 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                       <div className="px-4 py-3 border-b border-gray-100 mb-1.5 cursor-default">
//                         <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
//                           role === "admin" 
//                             ? "bg-red-50 text-red-700 border border-red-100" 
//                             : "bg-orange-50 text-[#A03E0B] border border-orange-100"
//                         }`}>
//                           {role}
//                         </span>
//                         {user?.name && <p className="font-bold text-gray-900 text-sm mt-2 truncate">{user.name}</p>}
//                         {user?.email && <p className="text-[11px] text-gray-400 truncate">{user.email}</p>}
//                       </div>

//                       <Link
//                         href={role === "admin" ? "/admin/dashboard" : "/dashboard"}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 hover:text-[#A03E0B] hover:bg-orange-50/40 transition cursor-pointer"
//                       >
//                         <FiLayout size={15} className="text-gray-400" />
//                         <span>{role === "admin" ? "Admin Console" : "Dashboard"}</span>
//                       </Link>

//                       <Link
//                         href={role === "admin" ? "/admin/settings" : "/profile"}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 hover:text-[#A03E0B] hover:bg-orange-50/40 transition cursor-pointer"
//                       >
//                         <FiSettings size={15} className="text-gray-400" />
//                         <span>Settings</span>
//                       </Link>

//                       <div className="border-t border-gray-100 my-1.5" />

//                       <button
//                         onClick={() => {
//                           if (onLogout) onLogout();
//                           setDropdownOpen(false);
//                         }}
//                         className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50/50 transition cursor-pointer"
//                       >
//                         <FiLogOut size={15} className="text-red-500" />
//                         <span>Log Out</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-[#A03E0B] transition-colors cursor-pointer">
//                   Login
//                 </Link>
//                 <Link href="/register">
//                   <button className="px-5 py-2 rounded-full bg-[#A03E0B] text-white text-sm font-semibold hover:bg-[#8A3308] hover:scale-105 shadow-md shadow-orange-950/10 transition cursor-pointer">
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Hamburger Button */}
//           <button
//             className="lg:hidden text-gray-700 hover:text-[#A03E0B] focus:outline-none p-1.5 cursor-pointer"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Dropdown Panel */}
//         <div
//           className={`overflow-hidden transition-all duration-300 lg:hidden ${
//             isOpen ? "max-h-[500px] border-t border-orange-100/30" : "max-h-0"
//           }`}
//         >
//           <div className="px-4 pb-6 pt-4 flex flex-col gap-4">
//             <nav className="flex flex-col gap-1">
//               {activeLinks.map((link) => {
//                 const isActive = pathname === link.path || pathname.startsWith(link.path + "/");
//                 return (
//                   <Link
//                     key={link.path}
//                     href={link.path}
//                     onClick={() => setIsOpen(false)}
//                     className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
//                       isActive
//                         ? "bg-orange-50 text-[#A03E0B] font-bold"
//                         : "text-gray-600 hover:bg-gray-50/80 hover:text-[#A03E0B]"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               })}
//             </nav>

//             <hr className="border-gray-100/60" />

//             {/* Mobile Actions Area */}
//             {isLoggedIn ? (
//               <div className="flex flex-col gap-3">
//                 {/* Mobile User Card */}
//                 <div className="flex items-center gap-3 px-4 py-3 bg-orange-50/40 border border-orange-100/20 rounded-xl">
//                   <div className="w-10 h-10 rounded-full bg-[#A03E0B] text-white flex items-center justify-center font-bold shrink-0 overflow-hidden">
//                     {user?.image ? (
//                       <img src={user.image} alt="user" className="w-full h-full object-cover" />
//                     ) : (
//                       userFirstLetter
//                     )}
//                   </div>
//                   <div className="truncate">
//                     <span className="text-[9px] bg-orange-100 text-[#A03E0B] px-2 py-0.5 rounded-full font-bold uppercase">
//                       {role}
//                     </span>
//                     {user?.name && <p className="text-sm font-semibold text-gray-900 truncate mt-1">{user.name}</p>}
//                     {user?.email && <p className="text-xs text-gray-400 truncate">{user.email}</p>}
//                   </div>
//                 </div>
                
//                 {/* Mobile Actions Grid */}
//                 <div className="grid grid-cols-2 gap-2">
//                   <Link
//                     href={role === "admin" ? "/admin/dashboard" : "/dashboard"}
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-50"
//                   >
//                     <FiLayout size={15} />
//                     Console
//                   </Link>
//                   <Link
//                     href={role === "admin" ? "/admin/settings" : "/profile"}
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-50"
//                   >
//                     <FiSettings size={15} />
//                     Settings
//                   </Link>
//                 </div>

//                 <button
//                   onClick={() => {
//                     if (onLogout) onLogout();
//                     setIsOpen(false);
//                   }}
//                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition cursor-pointer"
//                 >
//                   <FiLogOut size={16} />
//                   Log Out
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition cursor-pointer">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-[#A03E0B] text-white text-sm font-semibold hover:bg-[#8A3308] transition cursor-pointer">
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  FiShoppingBag, FiBell, FiMenu, FiX, FiLogOut, 
  FiLayout, FiSettings, FiGrid, FiList, FiPieChart, 
  FiPhone, FiInfo, FiBookOpen
} from "react-icons/fi";
import toast from "react-hot-toast";

const navLinks = {
  user: [
    { name: "Menu", path: "/menu", icon: FiGrid },
    { name: "About", path: "/about", icon: FiInfo },
    { name: "Blog", path: "/blog", icon: FiBookOpen },
    { name: "Contact", path: "/contact", icon: FiPhone },
  ],
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: FiLayout },
    { name: "Manage Menu", path: "/admin/manage-menu", icon: FiList },
    { name: "Orders", path: "/admin/orders", icon: FiShoppingBag },
    { name: "Analytics", path: "/admin/analytics", icon: FiPieChart },
  ],
};

// আইকন ও টেক্সটের কনট্রাস্ট বাড়ানোর জন্য ক্লাস আপডেট করা হয়েছে
const iconBtnClass = "text-zinc-800 hover:text-orange-600 relative p-2.5 transition-all rounded-xl hover:bg-zinc-900/5 cursor-pointer";
const dropdownItemClass = "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-zinc-800 hover:text-orange-600 hover:bg-orange-500/10 transition cursor-pointer";

const Avatar = ({ user }: { user: any }) => (
  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-sm border border-orange-600/30">
    {user?.image ? (
      <img src={user.image} alt="profile" className="w-full h-full object-cover" />
    ) : (
      user?.name?.charAt(0).toUpperCase() || "U"
    )}
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;
  const role = (user as any)?.role === "admin" ? "admin" : "user";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      setIsOpen(false);
      toast.success("Logged out successfully!")
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isPending) return <div className="h-16 fixed top-0 w-full backdrop-blur-xl z-50 border-b border-zinc-900/10" />;

  const activeLinks = isLoggedIn ? navLinks[role] : navLinks["user"];

  return (
    // ব্যাকড্রপের ভিজিবিলিটি ঠিক রাখতে bg-white/40 (সামান্য অপাসিটি) যুক্ত করা হয়েছে যেন লাইট/ডার্ক সব ইমেজের ওপর টেক্সট পড়া যায়
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-xl border-b border-zinc-900/10 bg-white/40">
      <div className="max-w-[90rem] mx-auto flex items-center justify-between px-4 md:px-8 h-16 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold shrink-0 group">
          <div className="p-2 bg-orange-600/10 rounded-xl transition-all group-hover:bg-orange-600/20 group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-orange-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14.19C15.538 4.042 16.5 2 16.5 2L7.5 13.795h5.313L9.813 15.904z" />
            </svg>
          </div>
          <span className="tracking-tight font-black text-zinc-900">Dine<span className="text-orange-600">flow</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-zinc-900/5 p-1.5 rounded-xl border border-zinc-900/5">
          {activeLinks.map((link) => {
            const isActive = pathname === link.path || pathname.startsWith(link.path + "/");
            return (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/10" 
                    : "text-zinc-800 hover:text-orange-600 hover:bg-zinc-900/5"
                }`}
              >
                <link.icon className={`w-4 h-4 ${isActive ? "text-orange-500" : "text-zinc-700"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {role === "user" && <button className={iconBtnClass}><FiShoppingBag className="w-5 h-5" /></button>}
              <button className={iconBtnClass}>
                <FiBell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 border border-white rounded-full" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-full bg-zinc-900/5 hover:bg-zinc-900/10 border border-zinc-900/10 transition-all cursor-pointer">
                  <Avatar user={user} />
                  {user?.name && <span className="text-xs font-black text-zinc-800 max-w-[90px] truncate">{user.name}</span>}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-zinc-900/10 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-zinc-100 mb-1.5">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${role === "admin" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{role}</span>
                      {user?.name && <p className="font-black text-zinc-900 text-sm mt-2 truncate">{user.name}</p>}
                      {user?.email && <p className="text-[11px] font-medium text-zinc-500 mt-0.5 truncate">{user.email}</p>}
                    </div>
                    <Link href={role === "admin" ? "/admin/dashboard" : "/dashboard"} className={dropdownItemClass} onClick={()=>setDropdownOpen(false)}><FiLayout size={15}/>{role === "admin" ? "Console" : "Dashboard"}</Link>
                    <Link href={role === "admin" ? "/admin/settings" : "/profile"} className={dropdownItemClass} onClick={()=>setDropdownOpen(false)}><FiSettings size={15}/>Settings</Link>
                    <div className="border-t border-zinc-100 my-1.5" />
                    <form onSubmit={handleLogoutSubmit}>
                      <button type="submit" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-black text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"><FiLogOut size={15}/>Log Out</button>
                    </form>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-black text-zinc-800 hover:text-orange-600">Login</Link>
              <Link href="/register"><button className="px-5 py-2 rounded-xl bg-orange-600 text-white text-sm font-black hover:bg-orange-700 shadow-md transition-all active:scale-95 cursor-pointer">Sign Up</button></Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden text-zinc-900 hover:text-orange-600 focus:outline-none p-1.5 cursor-pointer hover:bg-zinc-900/5 rounded-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`overflow-hidden transition-all duration-300 lg:hidden bg-white/95 backdrop-blur-lg ${isOpen ? "max-h-[600px] border-t border-zinc-900/10" : "max-h-0"}`}>
        <div className="px-4 pb-6 pt-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            {activeLinks.map((link) => {
              const isActive = pathname === link.path || pathname.startsWith(link.path + "/");
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? "bg-zinc-900 text-white shadow-sm" 
                      : "text-zinc-800 hover:bg-zinc-900/5 hover:text-orange-600"
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? "text-orange-500" : "text-zinc-700"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
          {isLoggedIn ? (
            <div className="flex flex-col gap-3 pt-2 border-t border-zinc-900/10">
              <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/5 rounded-xl">
                <Avatar user={user} />
                <div className="truncate">
                  {user?.name && <p className="text-sm font-black text-zinc-900 truncate">{user.name}</p>}
                  {user?.email && <p className="text-xs font-medium text-zinc-500 truncate">{user.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href={role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-900/10 text-zinc-800 text-xs font-bold hover:bg-zinc-900/5"><FiLayout size={15} /> Console</Link>
                <Link href={role === "admin" ? "/admin/settings" : "/profile"} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-900/10 text-zinc-800 text-xs font-bold hover:bg-zinc-900/5"><FiSettings size={15} /> Settings</Link>
              </div>
              <form onSubmit={handleLogoutSubmit}>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-black hover:bg-red-100 transition cursor-pointer"><FiLogOut size={16} /> Log Out</button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900/10">
              <Link href="/login" onClick={() => setIsOpen(false)}><button className="w-full px-5 py-3 rounded-xl bg-zinc-900/5 text-zinc-800 text-sm font-bold hover:bg-zinc-900/10">Login</button></Link>
              <Link href="/register" onClick={() => setIsOpen(false)}><button className="w-full px-5 py-3 rounded-xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-700">Sign Up</button></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
