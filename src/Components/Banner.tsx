"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-b from-orange-50/30 via-white to-white px-6 lg:px-16 py-12 lg:py-20">
      
      {/* 1. Background Pattern and Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/background.jpg"
          alt="Background Pattern"
          fill
          priority
          className="object-cover opacity-15"
        />
        {/* Soft Spotlights */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-orange-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/10" />
      </div>

      {/* Hero Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full grid grid-cols-1 pt-10 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10"
      >
        
        {/* Left Side: Content (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 max-w-2xl relative z-20">
          
          {/* Organic Badge */}
          <motion.div 
            variants={itemVariants}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-orange-50 border border-orange-100 shadow-sm shadow-orange-500/5"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#A03E0B] uppercase">
              100% Organic Ingredients
            </span>
          </motion.div>

          {/* Headings */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7.5xl font-black text-gray-900 leading-[1.1] tracking-tight"
          >
            Gastronomy <br />
            <span className="bg-gradient-to-r from-[#A03E0B] to-[#ff7a33] bg-clip-text text-transparent">
              Reimagined.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-650 font-medium leading-relaxed max-w-xl"
          >
            Experience Michelin-standard dining from the comfort of your home. 
            Curated by master chefs using only the finest farm-to-table ingredients.
          </motion.p>

          {/* CTAs (Buttons) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <Link href="/all-menu" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(160, 62, 11, 0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A03E0B] text-white rounded-full text-base font-bold transition-all duration-300 w-full sm:w-auto group cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Menu 
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.button>
            </Link>
            
            <Link href="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 bg-white/80 backdrop-blur-md text-gray-800 rounded-full text-base font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="pt-6 flex items-center gap-4 border-t border-gray-100 w-full"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold overflow-hidden shadow-md">
                  <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-amber-400 text-sm">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
              <span className="text-xs font-bold text-gray-500 mt-0.5">4.9/5 from 2k+ reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Image Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative w-full mt-10 lg:mt-0">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(160,62,11,0.12)] border-[10px] border-white bg-white group"
          >
            <Image
              src="/assets/right.jpg"
              alt="Michelin Star Dish"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-w-1024px) 100vw, 480px"
            />
            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
          </motion.div>

          {/* Floating Action Card (Top Right) */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 -right-4 md:-right-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2 max-w-[200px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-650" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">Delivery</h4>
                <p className="text-xs text-gray-500 font-medium">Under 30 mins</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Action Card (Bottom Left) */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 md:-left-8 bg-white/95 backdrop-blur-xl py-4 px-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-[280px]"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A03E0B] to-[#ff7a33] flex items-center justify-center text-white shrink-0 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-gray-900">Signature Tasting</h4>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">Available for pre-order</p>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}