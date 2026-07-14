"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiActivity } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center bg-[#FCF8F5] overflow-hidden px-6 lg:px-16 py-12 lg:py-20">
      
      {/* ১. Background Image (Assets থেকে) */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
        <Image
          src="/assets/background.jpg" // আপনার public/assets/bg-pattern.png ফোল্ডারে ইমেজটি রাখবেন
          alt="Background Pattern"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Content (6 Columns on Large Screen) */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 max-w-xl">
          
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#A03E0B] bg-[#F5E6DC] uppercase">
            Est. 2024
          </span>

          {/* Headings */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Gastronomy <br />
            <span className="text-[#A03E0B]">Reimagined.</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 font-normal leading-relaxed">
            Experience Michelin-standard dining from the comfort of your home. 
            Curated by master chefs using only the finest farm-to-table ingredients.
          </p>

          {/* CTAs (Buttons) */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <Link 
              href="/menu" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A03E0B] text-white rounded-full text-sm font-semibold hover:bg-[#8A3308] shadow-lg shadow-orange-950/10 hover:shadow-xl transition-all duration-300 w-full sm:w-auto group"
            >
              Explore Menu 
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 bg-white/80 backdrop-blur-sm text-[#A03E0B] rounded-full text-sm font-semibold hover:bg-gray-50/50 hover:border-gray-300 transition-all duration-300 w-full sm:w-auto"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Right Side: Image with Overlay Badge (6 Columns) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full">
          
          {/* Main Floating Dining Image Container */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-orange-950/10 border-4 border-white/60">
            <Image
              src="/assets/right.jpg" // আপনার public/assets/hero-dish.png ফোল্ডারে মেইন ডিশ ইমেজটি রাখবেন
              alt="Michelin Star Dish"
              fill
              priority
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 480px"
            />
          </div>

          {/* Floating Action/Info Card (Bottom Left of the Image) */}
          <div className="absolute -bottom-6 left-4 md:-left-6 bg-white/95 backdrop-blur-md py-4 px-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-[260px] animate-bounce-slow">
            <div className="w-10 h-10 rounded-full bg-[#A03E0B] flex items-center justify-center text-white shrink-0">
              {/* Dining/Plate Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Signature Tasting</h4>
              <p className="text-xs text-gray-500 mt-0.5">Available for pre-order</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}