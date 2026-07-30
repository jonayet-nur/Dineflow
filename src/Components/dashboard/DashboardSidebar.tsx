
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaList, 
  FaBookmark, 
  FaStar, 
  FaUser, 
  FaUsers, 
  FaPlus, 
  FaChartBar, 
  FaCog 
} from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { DashboardSidebarProps, NavItem, UserRole } from '@/types/next-auth';
import { FiLogOut } from 'react-icons/fi';
import { Logo } from '../ui/Logo';

// রেন্ডার পারফরম্যান্স বাড়াতে নেভিগেশন কনফিগ কম্পোনেন্টের বাইরে রাখা ভালো
const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  user: [
    { label: "Dashboard", href: "/dashboard/user", icon: FaHome },
    { label: "My Prompts", href: "/dashboard/user/my-prompts", icon: FaList },
    { label: "Saved Prompts", href: "/dashboard/user/saved-prompts", icon: FaBookmark },
    { label: "My Reviews", href: "/dashboard/user/my-reviews", icon: FaStar },
    { label: "Profile", href: "/dashboard/user/profile", icon: FaUser },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: FaChartBar },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: FaUsers },
    { label: "All Food Items", href: "/dashboard/admin/all-prompt", icon: FaList },
    { label: "Add Food", href: "/dashboard/admin/add-prompt", icon: FaPlus },
    { label: "All Orders", href: "/dashboard/admin/orders", icon: FaList },
    { label: "Settings", href: "/dashboard/admin/settings", icon: FaCog },
  ],
};

const DashboardSidebar = ({ 
  isOpen, 
  isMobileOpen, 
  toggleMobile,
  role: fallbackRole = 'user'
}: DashboardSidebarProps): React.ReactElement => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  
  // সেশন থেকে রোল নিন, না থাকলে ফলব্যাক রোল (user) ব্যবহার করুন
  const currentRole = (session?.user as { role?: UserRole })?.role || fallbackRole;
  const currentNavItems = NAV_CONFIG[currentRole] || NAV_CONFIG.user;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative z-50 h-full bg-gray-800 text-white 
          flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header / Logo Section */}
        <div className={`
          flex items-center h-16 px-4 border-b border-gray-800
          ${isOpen ? 'justify-between' : 'justify-center'}
        `}>
          {isOpen ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <Logo />
            </div>
          ) : (
            <Link href="/" className="flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md hover:bg-blue-500 transition">
                <span className="text-white font-black text-xl">D</span>
              </div>
            </Link>
          )}

          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button
              onClick={toggleMobile}
              className="lg:hidden p-1.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"
              aria-label="Close menu"
            >
              <span className="text-xl font-bold">✕</span>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {currentNavItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
                  }
                  ${!isOpen && 'justify-center'}
                `}
                title={!isOpen ? item.label : ''}
              >
                <Icon className="text-xl flex-shrink-0" />
                {isOpen && (
                  <span className="ml-3 text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="mt-auto p-4 border-t border-gray-800">
          <button
            // onClick={handleLogout}
            className={`
              group flex items-center w-full px-3 py-2.5 rounded-xl
              text-gray-400 hover:text-white hover:bg-gray-800/80
              transition-all duration-200
              ${!isOpen ? 'justify-center' : 'gap-3'}
            `}
            aria-label="Logout"
          >
            <FiLogOut 
              className={`
                w-5 h-5 flex-shrink-0
                transition-all duration-200
                group-hover:rotate-[-8deg] group-hover:scale-110
              `} 
            />
            {isOpen && (
              <span className="text-sm font-medium transition-all duration-200 group-hover:translate-x-0.5">
                Logout
              </span>
            )}
          </button>
        </div> 
      </aside>
    </>
  );
};

export default DashboardSidebar;