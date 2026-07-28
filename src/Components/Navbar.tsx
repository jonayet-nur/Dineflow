
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FiShoppingBag, FiMenu, FiX, FiGrid, FiInfo, FiBookOpen, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Sub-components
import { NavLinks } from './ui/Navlinks';
import { Logo } from './ui/Logo';
import { MobileMenu } from './ui/MobileMenu';
import { UserDropdown } from './ui/UserDropDown';
import { NavLinkItem, User, UserRole } from '@/types/navbar';
import { useCartStore } from '@/lib/useCartStore';

// 🛒 Import Zustand Cart Store (Correct Path)
// import { useCartStore } from '@/store/useCartStore';

const NAV_LINKS: NavLinkItem[] = [
  { name: "All Menu", path: "/all-menu", icon: FiGrid },
  { name: "About", path: "/about", icon: FiInfo },
  { name: "Blog", path: "/blog", icon: FiBookOpen },
  { name: "Contact", path: "/contact", icon: FiPhone },
];

const ICON_BTN_CLASS = "text-zinc-800 hover:text-orange-600 relative p-2.5 transition-all rounded-xl hover:bg-zinc-900/5 cursor-pointer";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🛒 Subscribe directly to the `cart` array for instant reactivity
  const cart = useCartStore((state) => state.cart);

  // Next.js Hydration Fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate live total quantity directly from state
  const cartItemCount = mounted
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  // Auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as User | undefined;
  const isLoggedIn = !!session;
  const role: UserRole = (user?.role === 'admin') ? 'admin' : 'user';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authClient.signOut();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      toast.success('Logged out successfully!');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  }, [router]);

  // Loading state
  if (isPending) {
    return <div className="h-16 fixed top-0 w-full backdrop-blur-xl z-50 border-b border-zinc-900/10" />;
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-xl border-b border-zinc-900/10 bg-white/40">
      <div className="max-w-[90rem] mx-auto flex items-center justify-between px-4 md:px-8 h-16 relative">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-zinc-900/5 p-1.5 rounded-xl border border-zinc-900/5">
          <NavLinks links={NAV_LINKS} pathname={pathname} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Cart Icon - Live Count Badge */}
          <Link href="/cart" className={ICON_BTN_CLASS} aria-label="Shopping Cart">
            <FiShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm transition-transform animate-in zoom-in">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <UserDropdown
              user={user}
              role={role}
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              dropdownRef={dropdownRef}
              handleLogout={handleLogout}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-black text-zinc-800 hover:text-orange-600 transition">
                Login
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 rounded-xl bg-orange-600 text-white text-sm font-black hover:bg-orange-700 shadow-md transition-all active:scale-95 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-zinc-900 hover:text-orange-600 focus:outline-none p-1.5 hover:bg-zinc-900/5 rounded-xl transition cursor-pointer"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={pathname}
        navLinks={NAV_LINKS}
        isLoggedIn={isLoggedIn}
        user={user}
        role={role}
        cartItemCount={cartItemCount}
        onClose={() => setIsMobileMenuOpen(false)}
        handleLogout={handleLogout}
      />
    </header>
  );
}