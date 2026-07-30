// import React from 'react'

// const DashboardMainPage = () => {
//   return (
//     <div>DashboardMainPage</div>
//   )
// }

// export default DashboardMainPage


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; // 👈 আপনার প্রজেক্টের Better Auth Client ফাইল পার্টটি দিন

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Better Auth সেশন লোড হওয়া পর্যন্ত অপেক্ষা করবে
    if (isPending) return;

    // লগইন করা না থাকলে লগইন পেজে রিডাইরেক্ট
    if (!session?.user) {
      router.replace('/login');
      return;
    }

    // Better Auth থেকে পাওয়া ইউজারের রোল অনুযায়ী রিডাইরেক্ট
    const userRole = (session.user as { role?: string })?.role;

    if (userRole === 'admin') {
      router.replace('/dashboard/admin');
    } else {
      router.replace('/dashboard/user');
    }
  }, [session, isPending, router]);

  // রিডাইরেক্ট হওয়া পর্যন্ত ক্লিন লোডার স্ক্রিন
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

