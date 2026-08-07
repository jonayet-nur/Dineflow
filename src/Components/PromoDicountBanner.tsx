"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTag, FaClock, FaArrowRight } from "react-icons/fa";

const parentVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.92 },
  show: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export function PromoDiscountBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div
        variants={parentVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative bg-gradient-to-br from-[#0F131D] via-[#1B2230] to-[#140801] text-white rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-slate-800/80 shadow-orange-950/10"
      >
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-orange-650/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Coupon Content */}
          <motion.div 
            variants={leftVariants}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <FaClock className="text-xs animate-pulse" /> Limited Time Deal
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Get <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">25% OFF</span> On Your First Order!
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Indulge in our chef-special delicacies delivered piping hot to your home. Use the promo code at checkout to claim your offer.
            </p>

            {/* Promo Code Box */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-full sm:w-auto justify-between sm:justify-start backdrop-blur-md">
                <span className="text-xs uppercase text-gray-400 font-bold tracking-wide">Code:</span>
                <span className="text-orange-450 font-extrabold tracking-widest text-base md:text-lg border-b border-dashed border-orange-400">
                  DINEFIRST25
                </span>
                <FaTag className="text-orange-400 text-sm ml-2" />
              </div>

              <Link
                href="/all-menu"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(234, 88, 12, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-600/25 text-center text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  Order Now <FaArrowRight className="text-xs" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Dish Highlight */}
          <motion.div 
            variants={rightVariants}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl group shadow-slate-950/40">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
                alt="Special Gourmet Dish"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-md border border-orange-500/20">
                SAVE $15
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}