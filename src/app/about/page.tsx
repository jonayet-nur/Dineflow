import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUtensils, FaRocket, FaHeart, FaUsers } from "react-icons/fa";

export const metadata = {
  title: "About Us | Dine Flow",
  description: "Learn more about Dine Flow and our mission to deliver great food experience.",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Welcome to <Link href="/"><span className="text-yellow-300">Dine Flow</span></Link>
          </h1>
          <p className="text-lg md:text-xl font-light text-orange-100 max-w-2xl mx-auto">
            Redefining your dining experience with seamless service, curated culinary delights, and lightning-fast delivery.
          </p>
        </div>
      </section>

      {/* Our Mission / Story Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Crafting Memorable Meals, Every Single Day
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Dine Flow, we believe food is more than just sustenance it is an experience that brings people together. Founded with a vision to connect food lovers with the best local restaurants, we ensure quality, speed, and freshness in every order.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are craving gourmet dishes, wholesome comfort food, or quick office lunches, Dine Flow streamlines your dining journey effortlessly.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
            <Image
              src="/assets/about.jpg"
              alt="Dine Flow Food Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Dine Flow?</h2>
            <p className="text-gray-500 mt-2">
              We bring quality food directly to your table with speed and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto text-xl">
                <FaUtensils />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Quality Food</h3>
              <p className="text-sm text-gray-500">
                Partnered with top-rated restaurants and certified hygienic kitchens.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto text-xl">
                <FaRocket />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Fast Delivery</h3>
              <p className="text-sm text-gray-500">
                Real-time tracking and hyper-fast delivery to keep your meal fresh.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto text-xl">
                <FaHeart />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Made with Care</h3>
              <p className="text-sm text-gray-500">
                Customer satisfaction is at the core of everything we build.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto text-xl">
                <FaUsers />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Community First</h3>
              <p className="text-sm text-gray-500">
                Supporting local restaurants and food businesses to grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-orange-600 text-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">10K+</h3>
            <p className="text-orange-200 text-sm mt-1">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">200+</h3>
            <p className="text-orange-200 text-sm mt-1">Partner Restaurants</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">50K+</h3>
            <p className="text-orange-200 text-sm mt-1">Orders Delivered</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">4.9★</h3>
            <p className="text-orange-200 text-sm mt-1">Customer Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
}