
import { User } from '@/types/navbar';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
// ফাইল পাথ স্মল লেটার (navbar) রাখা সেফ

interface AvatarProps {
  user?: User | null;
}

export const Avatar = ({ user }: AvatarProps) => {
  // ১. ইউজার না থাকলে কিছুই রেন্ডার হবে না
  if (!user) return null;

  // ২. নামের প্রথম অক্ষর বের করা (যদি নাম থাকে)
  const userInitial = user.name ? user.name.trim().charAt(0).toUpperCase() : null;

  return (
    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-sm border border-orange-600/30 select-none">
      {user.image ? (
        <img 
          src={user.image} 
          alt={user.name || "User profile"} 
          width={32} 
          height={32} 
          className="w-full h-full object-cover" 
        />
      ) : userInitial ? (
        <span>{userInitial}</span>
      ) : (
        <FiUser className="w-4 h-4" />
      )}
    </div>
  );
};