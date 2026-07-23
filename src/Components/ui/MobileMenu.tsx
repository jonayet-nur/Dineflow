// components/ui/MobileMenu.tsx
'use client';

import Link from 'next/link';
import { FiLayout, FiSettings, FiLogOut } from 'react-icons/fi';
import { Avatar } from './Avatar';
import { NavLinks } from './Navlinks';
import { NavLinkItem, User, UserRole } from '@/types/Navbar';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  navLinks: NavLinkItem[];
  isLoggedIn: boolean;
  user?: User;
  role: UserRole;
  onClose: () => void;
  handleLogout: (e: React.FormEvent) => void;
}

export const MobileMenu = ({
  isOpen,
  pathname,
  navLinks,
  isLoggedIn,
  user,
  role,
  onClose,
  handleLogout,
}: MobileMenuProps) => {
  return (
    <div className={`
      overflow-hidden transition-all duration-300 lg:hidden bg-white/95 backdrop-blur-lg
      ${isOpen ? 'max-h-[600px] border-t border-zinc-900/10' : 'max-h-0'}
    `}>
      <div className="px-4 pb-6 pt-4 flex flex-col gap-4">
        <NavLinks 
          links={navLinks} 
          pathname={pathname} 
          onClick={onClose}
        />

        {isLoggedIn ? (
          <div className="flex flex-col gap-3 pt-2 border-t border-zinc-900/10">
            <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/5 rounded-xl">
              <Avatar user={user} />
              <div className="truncate">
                {user?.name && (
                  <p className="text-sm font-black text-zinc-900 truncate">{user.name}</p>
                )}
                {user?.email && (
                  <p className="text-xs font-medium text-zinc-500 truncate">{user.email}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href={role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-900/10 text-zinc-800 text-xs font-bold hover:bg-zinc-900/5 transition"
              >
                <FiLayout size={15} /> {role === 'admin' ? 'Admin' : 'Dashboard'}
              </Link>
              <Link 
                href={role === 'admin' ? '/admin/settings' : '/profile'} 
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-900/10 text-zinc-800 text-xs font-bold hover:bg-zinc-900/5 transition"
              >
                <FiSettings size={15} /> Settings
              </Link>
            </div>

            <form onSubmit={handleLogout}>
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-black hover:bg-red-100 transition cursor-pointer"
              >
                <FiLogOut size={16} /> Log Out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900/10">
            <Link href="/login" onClick={onClose}>
              <button className="w-full px-5 py-3 rounded-xl bg-zinc-900/5 text-zinc-800 text-sm font-bold hover:bg-zinc-900/10 transition cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/register" onClick={onClose}>
              <button className="w-full px-5 py-3 rounded-xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};