"use client";

import Image from "next/image";
import Link from "next/link";
import { FaClock, FaArrowRight, FaPaperPlane, FaUser } from "react-icons/fa";

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 p">
          <span className="  text-orange-600 font-semibold text-xs md:text-sm uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Dine Flow Journal
          </span>
          <h1 className=" mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Latest Stories & <span className="text-orange-600">Culinary Insights</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Welcome to our journal. Explore stories about food culture, expert cooking tips, and behind-the-scenes updates from Dine Flow.
          </p>
        </div>

        {/* Featured Blog Card (Main Highlight) */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
              alt="Culinary Techniques"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Featured Post
            </span>
          </div>

          <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="text-orange-600 font-medium">Culinary Tips</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-gray-400" /> 5 min read
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                10 Secret Culinary Techniques Used by Michelin-Star Chefs
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                Discover professional kitchen secrets that can elevate your home cooking to fine dining standards effortlessly. From precise knife skills to sauce reduction, master it all.
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <FaUser />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Chef Tanvir Hossain</h4>
                  <p className="text-xs text-gray-400">Aug 02, 2026</p>
                </div>
              </div>

              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm"
              >
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </section>

        {/* Static Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <article className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop"
                  alt="Fresh Delivery"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Inside Dine Flow
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Jul 28, 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaClock /> 4 min read
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  How Dine Flow Ensures 100% Freshness from Kitchen to Doorstep
                </h3>

                <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  Take a deep dive into our thermal insulation technology and ultra-fast dispatch routing algorithms.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-4">
              <span className="text-xs font-medium text-gray-700">By Ayesha Rahman</span>
              <Link href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                Read More <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop"
                  alt="Organic Drinks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Recipes & Drinks
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Jul 20, 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaClock /> 6 min read
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  The Ultimate Guide to Food Pairing with Organic Mocktails
                </h3>

                <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  Learn how refreshing fruit extracts and herbal blends can balance rich and savory gourmet dishes.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-4">
              <span className="text-xs font-medium text-gray-700">By Sajid Mahmud</span>
              <Link href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                Read More <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
                  alt="Gourmet Food"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Food Culture
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Jul 15, 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaClock /> 7 min read
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  Exploring Hidden Gourmet Secrets and Traditional Flavors
                </h3>

                <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  From traditional slow-cooked delicacies to modern fusion bistros, explore the rich culinary culture.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-4">
              <span className="text-xs font-medium text-gray-700">By Nusrat Jahan</span>
              <Link href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                Read More <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </article>

        </div>

        {/* Newsletter Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold">Stay Updated</h3>
            <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto">
              Subscribe to the Dine Flow newsletter for weekly food insights, promo codes, and chef tips.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <FaPaperPlane className="text-xs" /> Subscribe
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}