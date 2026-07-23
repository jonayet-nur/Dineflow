// import { IconType } from 'react-icons';

// export type UserRole = 'admin' | 'user';

// export interface User {
//   name?: string;
//   email?: string;
//   image?: string;
//   role?: UserRole;
// }

// export interface NavLinkItem {
//   name: string;
//   path: string;
//   icon: IconType;
// }



import { IconType } from 'react-icons';

export type UserRole = 'admin' | 'user';

export interface User {
  id?: string;
  name?: string | null;     // 👈 | null যোগ করা হয়েছে
  email?: string | null;    // 👈 | null যোগ করা হয়েছে
  image?: string | null;    // 👈 এই জায়গায় | null না থাকায় TypeScript এরর দিচ্ছিল
  role?: UserRole;
}

export interface NavLinkItem {
  name: string;
  path: string;
  icon: IconType;
}