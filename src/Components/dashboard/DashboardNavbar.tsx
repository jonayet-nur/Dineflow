
// 'use client'

// import React, { useState } from 'react';

// interface DashboardNavbarProps {
//   toggleSidebar: () => void;
//   toggleMobileSidebar: () => void;
//   isSidebarOpen: boolean;
// }

// const DashboardNavbar = ({ 
//   toggleSidebar, 
//   toggleMobileSidebar,
//   isSidebarOpen 
// }: DashboardNavbarProps): React.ReactElement => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Search:', searchQuery);
//   };

//   const notifications = [
//     { id: 1, text: 'New user registered', time: '5 min ago', read: false },
//     { id: 2, text: 'Payment received', time: '1 hour ago', read: false },
//     { id: 3, text: 'System update completed', time: '3 hours ago', read: true },
//   ];

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex items-center justify-between px-4 md:px-6 h-16">
//         {/* Left Section */}
//         <div className="flex items-center space-x-3">
//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMobileSidebar}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <span className="text-xl">☰</span>
//           </button>

//           {/* Desktop Toggle */}
//           {/* <button
//             onClick={toggleSidebar}
//             className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <span className="text-xl">☰</span>
//           </button> */}

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="hidden md:flex items-center">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-80 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
//               />
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
//             </div>
//           </form>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-2 md:space-x-3">
//           {/* Search - Mobile */}
//           <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
//             <span className="text-xl">🔍</span>
//           </button>

//           {/* Notifications */}
//           <div className="relative">
//             <button
//               onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//               className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <span className="text-xl">🔔</span>
//               {unreadCount > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* Notification Dropdown */}
//             {isNotificationOpen && (
//               <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
//                 <div className="p-4 border-b border-gray-100">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-800">Notifications</h3>
//                     <button className="text-sm text-blue-600 hover:text-blue-700">
//                       Mark all read
//                     </button>
//                   </div>
//                 </div>
//                 <div className="max-h-80 overflow-y-auto">
//                   {notifications.map((notif) => (
//                     <div key={notif.id} className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}>
//                       <p className="text-sm text-gray-800">{notif.text}</p>
//                       <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="p-3 border-t border-gray-100 text-center">
//                   <button className="text-sm text-gray-600 hover:text-gray-800">
//                     View all notifications
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* User Profile */}
//           <div className="relative">
//             <button
//               onClick={() => setIsProfileOpen(!isProfileOpen)}
//               className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                 JD
//               </div>
//               <span className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>▼</span>
//             </button>

//             {/* Profile Dropdown */}
//             {isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
//                 <div className="p-4 border-b border-gray-100">
//                   <p className="font-semibold text-gray-800">John Doe</p>
//                   <p className="text-sm text-gray-500">john@example.com</p>
//                 </div>
//                 <div className="py-1">
//                   <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700">
//                     <span>👤</span>
//                     <span>Profile</span>
//                   </button>
//                   <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700">
//                     <span>⚙️</span>
//                     <span>Settings</span>
//                   </button>
//                 </div>
//                 <div className="border-t border-gray-100 py-1">
//                   <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-sm text-red-600">
//                     <span>🚪</span>
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardNavbar;




'use client'

import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { Avatar } from '../ui/Avatar';
import { authClient } from '@/lib/auth-client';

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

          {/* Desktop Toggle - Only shows on large screens */}
          {/* <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="text-xl">☰</span>
          </button> */}

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
    <FaChevronDown className={`text-gray-500 text-xs transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
  </button>

  {/* Profile Dropdown Menu */}
  {isProfileOpen && (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Dropdown Header */}
      <div className="p-4 border-b border-gray-100">
        <p className="font-semibold text-gray-800 truncate">{user?.name || 'User'}</p>
        <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
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

          {/* <div className="relative">
            
             <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaUserCircle className="w-8 h-8 text-gray-600" />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button> */}

            {/* Profile Dropdown */}
            {/* {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                    👤 Profile
                  </button>
                  <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                    ⚙️ Settings
                  </button>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button className="w-full text-left px-4 py-2.5 hover:bg-red-50 transition-colors text-sm text-red-600">
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;