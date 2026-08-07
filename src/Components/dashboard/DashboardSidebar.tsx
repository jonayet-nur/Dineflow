'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaList, 
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
import toast from 'react-hot-toast';

const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  user: [
    { label: "Dashboard", href: "/dashboard/user", icon: FaHome },
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
  
  const currentRole = (session?.user as { role?: UserRole })?.role || fallbackRole;
  const currentNavItems = NAV_CONFIG[currentRole] || NAV_CONFIG.user;

  const isActive = (path: string) => pathname === path;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Successfully logged out!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative z-50 h-full bg-[#0B0F17] text-white 
          flex flex-col transition-all duration-300 ease-in-out border-r border-white/5
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header / Logo Section */}
        <div className={`
          flex items-center h-16 px-4 border-b border-white/5
          ${isOpen ? 'justify-between' : 'justify-center'}
        `}>
          {isOpen ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <Logo />
            </div>
          ) : (
            <Link href="/" className="flex items-center justify-center">
              <div className="w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-md hover:bg-slate-800 transition">
                <span className="text-orange-500 font-black text-xl">D</span>
              </div>
            </Link>
          )}

          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button
              onClick={toggleMobile}
              className="lg:hidden p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition cursor-pointer"
              aria-label="Close menu"
            >
              <span className="text-xl font-bold">✕</span>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 custom-scrollbar">
          {currentNavItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3.5 py-3 rounded-xl transition-all duration-250 font-semibold text-sm cursor-pointer
                  ${active 
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                  ${!isOpen && 'justify-center'}
                `}
                title={!isOpen ? item.label : ''}
              >
                <Icon className={`text-lg flex-shrink-0 ${active ? 'text-orange-400' : 'text-slate-400'}`} />
                {isOpen && (
                  <span className="ml-3 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="mt-auto p-4 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className={`
              group flex items-center w-full px-3.5 py-3 rounded-xl
              text-rose-400 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20
              transition-all duration-200 cursor-pointer
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
              <span className="text-sm font-bold transition-all duration-200">
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