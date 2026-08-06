'use client'
import UserReviewsSection from '@/Components/DashBoardUserReview';
import { authClient } from '@/lib/auth-client';

export default function DynamicUserDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || 'Jonayet nur';
  const userEmail = session?.user?.email?.toLowerCase().trim() || '';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* ... Baki Dashboard Cards & Charts ... */}

      {/* 🌟 Professional User Reviews Section */}
      <UserReviewsSection userEmail={userEmail} userName={userName} />
    </div>
  );
}