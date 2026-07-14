"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingBag, FiBell, FiMenu, FiX } from "react-icons/fi";

// রোল অনুযায়ী নেভিগেশন লিংক
const navLinks = {
  user: [
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  admin: [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Menu", path: "/admin/manage-menu" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Analytics", path: "/admin/analytics" },
  ],
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // ১. ডেমো লগইন স্টেট (শুরুতে false থাকবে যাতে Login/Sign Up বাটন দেখায়)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState<"user" | "admin">("user"); // টেস্ট করার জন্য 'user' বা 'admin' করতে পারেন

  // লগইন স্ট্যাটাস অনুযায়ী নেভ লিংক সিলেক্ট করা
  const activeLinks = isLoggedIn ? navLinks[role] : navLinks["user"];

  return (
    <nav className="w-full bg-[#FCF8F5] border-b border-orange-100/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo with SVG */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#A03E0B]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-[#A03E0B]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M8 3v3M16 3v3M4 11h16a1 1 0 011 1 8 8 0 01-18 0 1 1 0 011-1z" />
          </svg>
          <span className="tracking-tight">Dineflow</span>
        </Link>

        {/* Center Side: Navigation Links (Always Centered) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {activeLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition-colors pb-1 ${
                  isActive 
                    ? "text-[#A03E0B] font-semibold" 
                    : "text-gray-600 hover:text-[#A03E0B]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A03E0B] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Dynamic Buttons & Icons */}
        <div className="hidden md:flex items-center gap-6">
          {/* লগইন থাকলে আইকনগুলো দেখাবে */}
          {isLoggedIn && (
            <>
              <button className="text-gray-700 hover:text-[#A03E0B] relative p-1 transition-colors">
                <FiShoppingBag className="w-5 h-5" />
              </button>

              <button className="text-gray-700 hover:text-[#A03E0B] relative p-1 transition-colors">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </button>
            </>
          )}

          {/* লগইন না থাকলে Login ও Sign Up বাটন দেখাবে */}
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => setIsLoggedIn(true)} // টেস্ট করার জন্য ক্লিক করলেই লগইন হয়ে যাবে
                className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <Link 
                href="/register" 
                className="px-6 py-2 bg-[#A03E0B] text-white rounded-full text-sm font-medium hover:bg-[#8A3308] shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : (
            // লগইন থাকলে Logout বাটন দেখাবে
            <button 
              onClick={() => setIsLoggedIn(false)} // ক্লিক করলেই লগআউট হয়ে যাবে এবং Login/Sign Up ফিরে আসবে
              className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-700 focus:outline-none p-1"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col gap-4">
          {activeLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === link.path 
                  ? "bg-[#FCF8F5] text-[#A03E0B]" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-100" />
          <div className="flex flex-col gap-3">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => {
                    setIsLoggedIn(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-center py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
                >
                  Login
                </button>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 bg-[#A03E0B] text-white rounded-full text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
                className="w-full text-center py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}