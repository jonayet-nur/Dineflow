"use client";

import Link from "next/link";

export default function BookingAndNews() {
  return (
    <div className="w-full bg-white px-6 lg:px-16 py-16 space-y-24">
      
      {/* SECTION 1: Secure Your Table (Reservation) */}
      <section className="max-w-7xl mx-auto bg-[#FDF2EA] rounded-[32px] p-8 md:p-16 text-center relative overflow-hidden shadow-sm">
        {/* ঐচ্ছিক: হালকা ব্যাকগ্রাউন্ড প্যাটার্নের জন্য ওভারলে */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A03E0B_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-950 tracking-tight">
            Secure Your Table
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal">
            Prefer the ambiance of our restaurant? Book a table for our flagship location 
            and experience the full theater of our open kitchen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/reservation"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#A03E0B] text-white rounded-xl text-sm font-semibold hover:bg-[#8A3308] shadow-md shadow-orange-950/10 transition-all duration-300"
            >
              Make a Reservation
            </Link>
            <Link
              href="/locations"
              className="w-full sm:w-auto px-8 py-3.5 border border-orange-200 bg-white/40 backdrop-blur-sm text-gray-900 rounded-xl text-sm font-semibold hover:bg-white/80 transition-all duration-300"
            >
              View Locations
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Join the Inner Circle (Newsletter) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-16">
        <div className="md:col-span-7 space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-950 tracking-tight">
            Join the Inner Circle
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl font-normal">
            Subscribe to receive exclusive menu previews, chef-led masterclass invites, and seasonal surprises.
          </p>
        </div>
        
        {/* ইনপুট ফিল্ড (পরবর্তীতে ফর্ম হ্যান্ডলিং করতে পারবেন) */}
        <div className="md:col-span-5 w-full flex items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#A03E0B] focus:ring-1 focus:ring-[#A03E0B] transition-all bg-gray-50/50"
          />
          <button className="px-6 py-3 bg-[#A03E0B] text-white rounded-xl text-sm font-semibold hover:bg-[#8A3308] whitespace-nowrap transition-colors">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
}