"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingAndNews() {
  return (
    <div className="w-full bg-white px-6 lg:px-16 py-20 space-y-24">
      
      {/* SECTION 1: Secure Your Table (Reservation Card) */}
      <motion.section 
        initial={{ opacity: 0, y: 70, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto bg-gradient-to-tr from-[#FFF7F2] to-[#FFF1E6] rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(160,62,11,0.04)] border border-orange-100/60"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#A03E0B_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold text-[#A03E0B] bg-orange-50 border border-orange-100/80 px-4.5 py-2 rounded-full uppercase tracking-wider inline-block">
            Table Booking
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Secure Your Table
          </h2>
          <p className="text-sm md:text-base text-gray-650 leading-relaxed font-medium">
            Prefer the ambiance of our restaurant? Book a table for our flagship location 
            and experience the full theater of our open kitchen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/reservation"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(160, 62, 11, 0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 bg-[#A03E0B] text-white rounded-2xl text-sm font-bold shadow-md shadow-orange-950/10 transition-all duration-300 cursor-pointer"
              >
                Make a Reservation
              </motion.button>
            </Link>
            <Link
              href="/locations"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 border border-orange-200 bg-white/60 backdrop-blur-sm text-gray-800 rounded-2xl text-sm font-bold hover:bg-white transition-all duration-300 cursor-pointer"
              >
                View Locations
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: Join the Inner Circle (Newsletter) */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-16"
      >
        <div className="md:col-span-7 space-y-3">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            Join the Inner Circle
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl font-medium">
            Subscribe to receive exclusive menu previews, chef-led masterclass invites, and seasonal surprises.
          </p>
        </div>
        
        {/* Input form */}
        <div className="md:col-span-5 w-full flex items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#A03E0B] focus:ring-1 focus:ring-[#A03E0B] transition-all bg-gray-50/40 shadow-inner font-medium text-gray-800"
          />
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-[#A03E0B] text-white rounded-2xl text-sm font-bold hover:bg-[#8A3308] whitespace-nowrap transition-colors cursor-pointer"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
}