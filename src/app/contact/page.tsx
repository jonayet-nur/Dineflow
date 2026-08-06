'use client'

import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";



export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // মেসেজ সেন্ড করার ডামি টাইমার
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Get in Touch with  <Link href="/"><span className="text-orange-500">Dine Flow</span></Link>
          </h1>
          <p className="text-gray-500 mt-3">
            Have questions, feedback, or need help with your order? Send us a message and we will respond shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Contact Details */}
          <div className="bg-orange-600 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-orange-100 text-sm leading-relaxed mb-8">
                Fill out the form or reach out to us directly through the options below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl text-xl">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase font-semibold">Phone Number</p>
                    <p className="font-medium mt-0.5">+880 1700-000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase font-semibold">Email Address</p>
                    <p className="font-medium mt-0.5">support@dineflow.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase font-semibold">Our Office</p>
                    <p className="font-medium mt-0.5">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-orange-500/50">
              <p className="text-xs text-orange-200">
                Operating Hours: Sunday - Thursday (9:00 AM - 10:00 PM)
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order Query / Feedback"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}