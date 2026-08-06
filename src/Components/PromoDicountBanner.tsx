"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTag, FaClock, FaArrowRight } from "react-icons/fa";

export function PromoDiscountBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Coupon Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <FaClock className="text-xs animate-pulse" /> Limited Time Deal
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Get <span className="text-orange-500">25% OFF</span> On Your First Order!
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Indulge in our chef-special delicacies delivered piping hot to your home. Use the promo code at checkout to claim your offer.
            </p>

            {/* Promo Code Box */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs uppercase text-gray-400 font-medium">Code:</span>
                <span className="text-orange-400 font-extrabold tracking-widest text-base md:text-lg border-b border-dashed border-orange-400">
                  DINEFIRST25
                </span>
                <FaTag className="text-orange-400 text-sm ml-2" />
              </div>

              <Link
                href="/all-menu"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-orange-600/30 text-center text-sm flex items-center justify-center gap-2"
              >
                Order Now <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Right Dish Highlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-slate-700/50 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
                alt="Special Gourmet Dish"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                SAVE $15
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}