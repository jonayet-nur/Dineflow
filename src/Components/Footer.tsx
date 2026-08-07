"use client";

import Link from "next/link";
import { FaYoutube, FaFacebookF, FaInstagram, FaUtensils } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-[#94A3B8] border-t border-slate-900">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand Info (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tight">
            <span className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-white text-lg flex items-center justify-center">
              <FaUtensils className="text-orange-500" />
            </span>
            <span>Dine<span className="text-orange-500">Flow</span></span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
            Elevating your dining experience. Connecting food lovers with top-rated restaurants, delivering freshness right to your doorstep.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:bg-[#A03E0B] hover:border-[#A03E0B] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:bg-[#A03E0B] hover:border-[#A03E0B] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:bg-[#A03E0B] hover:border-[#A03E0B] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="YouTube"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Explore</h4>
          <ul className="space-y-3 text-sm text-slate-400 font-medium">
            <li><Link href="/all-menu" className="hover:text-orange-400 transition-colors duration-200">Our Menu</Link></li>
            <li><Link href="/restaurants" className="hover:text-orange-400 transition-colors duration-200">Restaurants</Link></li>
            <li><Link href="/offers" className="hover:text-orange-400 transition-colors duration-200">Special Offers</Link></li>
            <li><Link href="/reservation" className="hover:text-orange-400 transition-colors duration-200">Book a Table</Link></li>
          </ul>
        </div>

        {/* Company Links (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Company</h4>
          <ul className="space-y-3 text-sm text-slate-400 font-medium">
            <li><Link href="/about" className="hover:text-orange-400 transition-colors duration-200">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400 transition-colors duration-200">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-orange-400 transition-colors duration-200">Blogs</Link></li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <Link href="/partner" className="hover:text-orange-400 transition-colors duration-200">Become Partner</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Get in Touch</h4>
          <div className="space-y-3.5 text-sm text-slate-400 leading-relaxed font-medium">
            <p className="flex items-start gap-3">
              <FiMapPin className="text-orange-500 text-lg shrink-0 mt-0.5" />
              <span>Dhaka, Bangladesh</span>
            </p>
            <p className="flex items-center gap-3">
              <FiPhone className="text-orange-500 text-lg shrink-0" />
              <span>+880 1700-000000</span>
            </p>
            <p className="flex items-center gap-3">
              <FiMail className="text-orange-500 text-lg shrink-0" />
              <a href="mailto:support@dineflow.com" className="hover:text-orange-400 transition-colors duration-200">
                support@dineflow.com
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900/60 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Dine Flow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}