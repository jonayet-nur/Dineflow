// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       image?: string | null;
//       role: 'admin' | 'user'; // role টাইপ যুক্ত করা হলো
//     };
//   }

//   interface User {
//     role: 'admin' | 'user';
//   }
// }




// ১. গ্লোবাল টাইপ ডিফিনিশন
export type UserRole = 'admin' | 'user';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DashboardSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggleMobile: () => void;
  role?: UserRole;
}

// NextAuth has been replaced with better-auth