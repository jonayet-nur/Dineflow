// import { authClient } from '@/lib/auth-client';
// import { User } from '@/types/Navbar';
// import Image from 'next/image';
// import { FiUser } from 'react-icons/fi';


// interface AvatarProps {
//   user: User | null | undefined;
// }

// export const Avatar = ({ user }: AvatarProps) => {
//   if (!user) return null;
  

//   return (
//     <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-sm border border-orange-600/30">
//       {user.image ? (
//         <Image 
//           src={user.image} 
//           alt="profile" 
//           width={32} 
//           height={32} 
//           className="w-full h-full object-cover" 
//         />
//       ) : (
//         user.name?.charAt(0).toUpperCase() || <FiUser className="w-4 h-4" />
//       )}
//     </div>
//   );
// };


import { User } from '@/types/Navbar';
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
        <Image 
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