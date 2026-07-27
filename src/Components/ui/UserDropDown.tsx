// components/ui/UserDropdown.tsx
'use client';

import Link from 'next/link';
import { FiLayout, FiSettings, FiLogOut } from 'react-icons/fi';
import { Avatar } from './Avatar';
import { User, UserRole } from '@/types/navbar';

interface UserDropdownProps {
  user?: User;
  role: UserRole;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleLogout: (e: React.FormEvent) => void;
}

const DROPDOWN_ITEM_CLASS = "w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-zinc-800 hover:text-orange-600 hover:bg-orange-500/10 transition rounded-lg";

export const UserDropdown = ({
  user,
  role,
  isDropdownOpen,
  toggleDropdown,
  dropdownRef,
  handleLogout,
}: UserDropdownProps) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown} 
        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-zinc-900/5 hover:bg-zinc-900/10 border border-zinc-900/10 transition-all cursor-pointer"
        aria-expanded={isDropdownOpen}
        aria-label="User menu"
      >
        <Avatar user={user} />
        {user?.name && (
          <span className="text-xs font-black text-zinc-800 max-w-[90px] truncate">
            {user.name}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-zinc-900/10 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-zinc-100 mb-1.5">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
              role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {role}
            </span>
            {user?.name && (
              <p className="font-black text-zinc-900 text-sm mt-2 truncate">{user.name}</p>
            )}
            {user?.email && (
              <p className="text-[11px] font-medium text-zinc-500 mt-0.5 truncate">{user.email}</p>
            )}
          </div>

          <Link 
            href={role === 'admin' ? '/dashboard' : '/dashboard'} 
            className={DROPDOWN_ITEM_CLASS}
            onClick={toggleDropdown}
          >
            <FiLayout size={15} />
            {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
          </Link>

          <Link 
            href={role === 'admin' ? '/admin/settings' : '/profile'} 
            className={DROPDOWN_ITEM_CLASS}
            onClick={toggleDropdown}
          >
            <FiSettings size={15} />
            Settings
          </Link>

          <div className="border-t border-zinc-100 my-1.5" />

          <form onSubmit={handleLogout}>
            <button 
              type="submit" 
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-black text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
            >
              <FiLogOut size={15} />
              Log Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};