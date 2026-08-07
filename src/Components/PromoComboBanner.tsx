"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUtensils, FaGift, FaCheckCircle } from "react-icons/fa";

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
  hidden: { opacity: 0, x: -50, scale: 0.92 },
  show: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -15 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 12,
    }
  },
};

export function PromoComboBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      <motion.div
        variants={parentVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-orange-100/60 rounded-[2.5rem] p-8 md:p-14 border border-orange-200/50 shadow-[0_15px_40px_rgba(160,62,11,0.03)] relative overflow-hidden"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Image Section */}
          <motion.div 
            variants={leftVariants}
            className="md:col-span-5 order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
                alt="Family Feast Offer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg border border-white/10">
                Includes Free Drinks 🥤
              </span>
            </div>
          </motion.div>

          {/* Right Details Section */}
          <motion.div 
            variants={rightVariants}
            className="md:col-span-7 order-1 md:order-2 space-y-5 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider w-fit mx-auto md:mx-0 shadow-sm border border-orange-500/10">
              <FaGift className="text-xs animate-bounce" /> Weekend Special Feast
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-snug">
              Mega Family Combo Meal <br className="hidden sm:block" />
              <span className="text-orange-650">Save Up To 35%</span>
            </h3>

            <p className="text-gray-650 text-sm leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
              Enjoy 2 Appetizers, 3 Signature Main Courses, and Dessert for up to 4 people. Perfect for family weekends and get-togethers!
            </p>

            {/* Offer Features List */}
            <motion.ul 
              variants={listVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-bold text-gray-700 pt-1"
            >
              <motion.li variants={listItemVariants} className="flex items-center gap-2 bg-white/70 border border-white/90 backdrop-blur-md shadow-sm rounded-2xl px-4 py-2">
                <FaCheckCircle className="text-orange-650 text-sm" /> Free Delivery
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center gap-2 bg-white/70 border border-white/90 backdrop-blur-md shadow-sm rounded-2xl px-4 py-2">
                <FaCheckCircle className="text-orange-650 text-sm" /> 2 Dessert Portions
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center gap-2 bg-white/70 border border-white/90 backdrop-blur-md shadow-sm rounded-2xl px-4 py-2">
                <FaCheckCircle className="text-orange-650 text-sm" /> Priority Booking
              </motion.li>
            </motion.ul>

            <div className="pt-3">
              <Link
                href="/all-menu"
                className="inline-block w-full sm:w-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(15, 23, 42, 0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-[#A03E0B] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm cursor-pointer shadow-md"
                >
                  <FaUtensils className="text-xs" /> Claim Family Combo
                </motion.button>
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}