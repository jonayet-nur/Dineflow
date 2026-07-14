"use client";

import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FiFacebook, FiGlobe, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-[#322723] text-gray-300 px-6 lg:px-16 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
        
        {/* Brand Column (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-bold text-white tracking-wide">Dineflow</h3>
          <p className="text-xs md:text-sm text-stone-400 max-w-xs leading-relaxed">
            Elevating the standard of digital dining through culinary precision and Michelin-star passion.
          </p>
          {/* Social Icons matching image */}
          <div className="flex items-center gap-3 pt-2">

             <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
              <FiFacebook className="w-4 h-4" />
            </a>

            <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
              <FiGlobe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
              <FiMail className="w-4 h-4" />
            </a>

             <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore Column (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5 text-xs md:text-sm text-stone-400">
            <li><Link href="#" className="hover:text-white transition-colors">Tasting Menus</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Wine Cellar</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Chef's Table</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Gift Cards</Link></li>
          </ul>
        </div>

        {/* Company Column (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-xs md:text-sm text-stone-400">
            <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <Link href="#" className="hover:text-white transition-colors">Sustainability</Link>
            </li>
            <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
          </ul>
        </div>

        {/* Contact Column (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact</h4>
          <div className="space-y-3 text-xs md:text-sm text-stone-400 leading-relaxed">
            <p>123 Gastronomy Avenue<br />Epicurean District, NY 10001</p>
            <p className="pt-1">
              <span className="block font-medium text-stone-300">+1 (555) MICHELIN</span>
              <a href="mailto:concierge@culinamoderna.com" className="hover:text-white transition-colors underline underline-offset-4 decoration-stone-600">
                concierge@culinamoderna.com
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Fine Print */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] md:text-xs text-stone-500">
        <p>&copy; 2026 Dineflow. Michelin-standard digital dining experience.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-stone-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-stone-400 transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}