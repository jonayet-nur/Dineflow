"use client";

import React, { useState } from "react";
import { FaSearch, FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { Avatar } from "../ui/Avatar";
import { authClient } from "@/lib/auth-client";

interface DashboardNavbarProps {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardNavbar = ({
  toggleSidebar,
  toggleMobileSidebar,
}: DashboardNavbarProps): React.ReactElement => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // ১. সেশন থেকে ইউজার ডাটা তুলে আনা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle - Only shows on mobile */}
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-xl">☰</span>
          </button>
          {/* Search Bar - Desktop only */}
          <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 text-gray-700 w-64 text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Search - Mobile only */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FaSearch className="text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FaBell className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            {/* Profile Toggle Button */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
            >
              {/* ডাইনামিক Avatar কম্পোনেন্ট */}
              <Avatar user={user} />

              {/* ইউজার নেম ও ইমেইল (লগইন থাকলে আসল ডেটা দেখাবে) */}
              {user && (
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">
                    {user?.email}
                  </p>
                </div>
              )}

              {/* ডাউনারো আইকন */}
              <FaChevronDown
                className={`text-gray-500 text-xs transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Dropdown Header */}
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email || ""}
                  </p>
                </div>

                {/* Menu Options */}
                <div className="py-1">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    ⚙️ Settings
                  </button>
                </div>

                {/* Logout Option */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    // onClick={handleLogout} // আপনার লগআউট ফাংশন
                    className="w-full text-left px-4 py-2.5 hover:bg-red-50 transition-colors text-sm text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
