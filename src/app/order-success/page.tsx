'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiShoppingBag, FiHome, FiMapPin, FiClock } from 'react-icons/fi';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  variant?: string | null;
}

interface OrderData {
  orderId?: string;
  createdAt?: string;
  items: OrderItem[];
  subTotal?: number;
  deliveryFee?: number;
  totalAmount: number;
  address: string;
}

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
  const [fallbackOrderId, setFallbackOrderId] = useState('');
  const [fallbackTime, setFallbackTime] = useState('');

  useEffect(() => {
    setMounted(true);

    // 💡 Impure function (Math.random & Date) useEffect এর ভেতরে নিরাপদ
    setFallbackOrderId(`#ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setFallbackTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const savedOrder = sessionStorage.getItem('latestOrder');
    if (savedOrder) {
      try {
        setOrderDetails(JSON.parse(savedOrder));
      } catch (err) {
        console.error('Error parsing order data:', err);
      }
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ এখন রেন্ডারের ভেতরে কোনো impure function কল হচ্ছে না
  const orderId = orderDetails?.orderId || fallbackOrderId;
  const orderTime = orderDetails?.createdAt
    ? new Date(orderDetails.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : fallbackTime;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 max-w-lg w-full text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle size={40} />
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-1">
          Order Placed Successfully! 🎉
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you! Your order has been received and is being prepared.
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left mb-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 border-b pb-2">
            <span>Order ID: <strong className="text-gray-800">{orderId}</strong></span>
            <span className="flex items-center gap-1"><FiClock /> {orderTime}</span>
          </div>

          {/* Dynamic Item List */}
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-bold text-gray-700">Ordered Items:</p>
            {orderDetails?.items && orderDetails.items.length > 0 ? (
              orderDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600">
                  <span>
                    {item.name} x {item.quantity} {item.variant ? `(${item.variant})` : ''}
                  </span>
                  <span className="font-semibold text-gray-800">৳{item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No order details found.</p>
            )}
          </div>

          {/* Delivery Address & Total Price Breakdown */}
          <div className="border-t pt-2 space-y-1.5">
            {orderDetails?.address && (
              <div className="flex items-start gap-1 text-xs text-gray-600 mb-2">
                <FiMapPin className="mt-0.5 text-orange-600 shrink-0" />
                <span className="line-clamp-2">{orderDetails.address}</span>
              </div>
            )}

            {orderDetails?.deliveryFee !== undefined && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery Charge:</span>
                <span>৳{orderDetails.deliveryFee}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-sm font-black text-gray-900 pt-1 border-t border-gray-200/60">
              <span>Total Payable Amount:</span>
              <span className="text-orange-600 text-base">৳{orderDetails?.totalAmount || 0}</span>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-orange-50 border border-orange-100 p-3.5 rounded-xl mb-6 text-left text-xs text-orange-900">
          <p className="font-bold">💡 Payment Method: Cash on Delivery</p>
          <p className="text-orange-800 mt-0.5">Please hand over the total amount to the rider upon food delivery.</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* <Link
            href="/my-orders"
            className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95"
          >
            <FiShoppingBag size={18} />
            Track Order (My Orders)
          </Link> */}

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition text-sm"
          >
            <FiHome size={16} />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}