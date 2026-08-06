"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUtensils, FaGift, FaCheckCircle } from "react-icons/fa";

export function PromoComboBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 rounded-3xl p-8 md:p-12 border border-orange-200/60 shadow-sm relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Image Section */}
          <div className="md:col-span-5 order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
                alt="Family Feast Offer"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg">
                Includes Free Drinks 🥤
              </span>
            </div>
          </div>

          {/* Right Details Section */}
          <div className="md:col-span-7 order-1 md:order-2 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mx-auto md:mx-0">
              <FaGift className="text-xs" /> Weekend Special Feast
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              Mega Family Combo Meal <br className="hidden sm:block" />
              <span className="text-orange-600">Save Up To 35%</span>
            </h3>

            <p className="text-gray-600 text-xs md:text-sm max-w-lg mx-auto md:mx-0">
              Enjoy 2 Appetizers, 3 Signature Main Courses, and Dessert for up to 4 people. Perfect for family weekends and get-togethers!
            </p>

            {/* Offer Features list */}
            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs font-semibold text-gray-700 pt-1">
              <li className="flex items-center gap-1.5">
                <FaCheckCircle className="text-orange-500" /> Free Delivery
              </li>
              <li className="flex items-center gap-1.5">
                <FaCheckCircle className="text-orange-500" /> 2 Dessert Portions
              </li>
              <li className="flex items-center gap-1.5">
                <FaCheckCircle className="text-orange-500" /> Priority Booking
              </li>
            </ul>

            <div className="pt-3">
              <Link
                href="/all-menu"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-xs md:text-sm shadow-md"
              >
                <FaUtensils className="text-xs" /> Claim Family Combo
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}