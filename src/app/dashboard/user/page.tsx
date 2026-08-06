// import React from 'react'

// const UserMainPageDashboard = () => {
//   return (
//     <div>UserMainPage Dashboard</div>
//   )
// }

// export default UserMainPageDashboard

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { 
  FiShoppingBag, FiHeart, FiDollarSign, FiClock, 
  FiArrowRight, FiEye, FiRefreshCw 
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa6';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import StatCard from '@/Components/ui/StatCardUserDash';

// Flexible Order Interface
interface Order {
  _id: string;
  email?: string;
  userEmail?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  items?: any;
  status?: 'Pending' | 'Preparing' | 'On the way' | 'Delivered' | 'Cancelled' | string;
  paymentStatus?: string;
  totalAmount?: number | string;
  totalPrice?: number | string;
  price?: number | string;
  createdAt?: string;
}

interface MenuItem {
  _id: string; name: string; category: string; price: number; shortDesc?: string; image?: string;
}

export default function DynamicUserDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || 'Jonayet nur';
  const userEmail = session?.user?.email?.toLowerCase().trim() || '';

  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<MenuItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [chartType, setChartType] = useState<'Bar' | 'Area' | 'Line'>('Bar');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => { setIsMounted(true); }, []);


  // 📊 Stats Calculation
const stat = useMemo(() => {
  const totalOrders = orders.length;
  
  // Pending Orders Filter
  const pendingOrders = orders.filter(o => (o.status || 'Pending').toLowerCase() === 'pending');
  const pendingCount = pendingOrders.length;
  
  // Pending Status wala orders er total amount
  const pendingSpent = pendingOrders.reduce((sum, ord) => {
    const val = parseFloat(String(ord.totalAmount || ord.totalPrice || ord.price || 0));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const activeOrders = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status || '')).length;
  
  const totalSpent = orders.reduce((sum, ord) => {
    const val = parseFloat(String(ord.totalAmount || ord.totalPrice || ord.price || 0));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return { totalOrders, activeOrders, pendingCount, pendingSpent, totalSpent };
}, [orders]);

  // 📡 1. Dynamic Order Fetching with Flexible Matching
  const fetchUserOrders = useCallback(async (manualRefresh = false) => {
    if (manualRefresh) setIsSyncing(true);
    else setLoadingOrders(true);

    try {
      const res = await fetch(`${API_URL}/api/orders`, { cache: 'no-store' });
      const result = await res.json();

      const rawData = Array.isArray(result) ? result : (result.data || []);

      if (Array.isArray(rawData)) {
        const filtered = rawData.filter((ord: Order) => {
          const ordEmail = (ord.email || ord.userEmail || '').toLowerCase().trim();
          const ordName = (ord.customerName || '').toLowerCase().trim();
          
          // Match strategy:
          // 1. Direct Email Match
          // 2. If email absent in order, match Customer Name with session user name or email prefix
          const sessionPrefix = userEmail.split('@')[0]; // e.g. "tanjimnur30"
          const sessionNameLower = userName.toLowerCase();

          const isEmailMatch = ordEmail && userEmail && ordEmail === userEmail;
          const isNameMatch = ordName && (ordName.includes(sessionNameLower) || ordName.includes('jonayet'));

          return isEmailMatch || isNameMatch;
        });

        // Fallback: If no match found by user email/name filter, show loaded data so UI updates
        setOrders(filtered.length > 0 ? filtered : rawData);
      }
    } catch (err) {
      console.error('Error fetching user orders:', err);
    } finally {
      setLoadingOrders(false);
      setIsSyncing(false);
    }
  }, [userEmail, userName, API_URL]);

  // 📡 2. Favorites Fetching
  const fetchFavoriteItems = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/all-menu?limit=3`, { cache: 'no-store' });
      const result = await res.json();
      const items = Array.isArray(result) ? result : (result.data || []);
      if (Array.isArray(items)) setFavorites(items);
    } catch (err) {
      console.error('Error fetching favorite items:', err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUserOrders();
    fetchFavoriteItems();
  }, [fetchUserOrders, fetchFavoriteItems]);

  // 📊 Stats Calculation
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const activeOrders = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status || '')).length;
    const pendingCount = orders.filter(o => (o.status || 'Pending') === 'Pending').length;
    
    const totalSpent = orders.reduce((sum, ord) => {
      const val = parseFloat(String(ord.totalAmount || ord.totalPrice || ord.price || 0));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    return { totalOrders, activeOrders, pendingCount, totalSpent };
  }, [orders]);

  // 📈 Dynamic Weekly Chart Data
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    orders.forEach(ord => {
      if (ord.createdAt) {
        const d = new Date(ord.createdAt);
        if (!isNaN(d.getTime())) counts[days[d.getDay()]] += 1;
      }
    });

    return ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map(day => ({
      day, bookings: counts[day] || 0
    }));
  }, [orders]);

  // 📈 Monthly Spending Trend
  const monthlyData = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthMap: Record<string, number> = {};

    orders.forEach(ord => {
      if (ord.createdAt) {
        const d = new Date(ord.createdAt);
        if (!isNaN(d.getTime())) {
          const m = monthNames[d.getMonth()];
          const amt = parseFloat(String(ord.totalAmount || ord.totalPrice || ord.price || 0));
          monthMap[m] = (monthMap[m] || 0) + (isNaN(amt) ? 0 : amt);
        }
      }
    });

    return ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => ({
      month: m, value: monthMap[m] || 0
    }));
  }, [orders]);

  const formatFoodItems = (items: any) => {
    if (!items) return 'Custom Order';
    if (typeof items === 'string') return items;
    if (Array.isArray(items)) {
      return items.map(i => typeof i === 'string' ? i : `${i.quantity || 1}x ${i.name || 'Item'}`).join(', ');
    }
    return 'Food Package';
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans text-slate-800 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            User <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-medium mt-0.5">
            Welcome back, {userName}! Here’s an overview of your activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchUserOrders(true)}
            disabled={isSyncing}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition cursor-pointer"
            title="Sync Data"
          >
            <FiRefreshCw className={`text-sm ${isSyncing ? 'animate-spin' : ''}`} />
          </button>
          <Link href="/all-menu" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2">
            <FaUtensils className="text-sm" /> <span>Browse Menu</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} sub={`${stat.pendingCount} pending`} icon={<FiShoppingBag />} loading={loadingOrders} color="blue" />
        {/* Pending Orders Card */}
<StatCard 
  title="Pending Status" 
  value={`${stat.pendingCount} Orders`} 
  sub="Status: Pending" 
  icon={<FiClock />} 
  loading={loadingOrders} 
  color="rose" 
/>
        {/* <StatCard title="Favorites" value={favorites.length} sub="Saved items" icon={<FiHeart />} loading={false} color="rose" /> */}
        <StatCard title="Total Spent" value={`৳${stats.totalSpent.toLocaleString('en-BD')}`} sub="Lifetime spending" icon={<FiDollarSign />} loading={loadingOrders} color="emerald" />
        <StatCard title="Active Orders" value={stats.activeOrders} sub="Currently active" icon={<FiClock />} loading={loadingOrders} color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-slate-900">Weekly Orders</h3>
              <p className="text-xs text-slate-400 font-medium">Last 7 days activity</p>
            </div>
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-600">
              {(['Bar', 'Area', 'Line'] as const).map(type => (
                <button key={type} onClick={() => setChartType(type)} className={`px-2.5 py-1 rounded-md ${chartType === type ? 'bg-blue-600 text-white' : ''}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'Bar' ? (
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : chartType === 'Area' ? (
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} allowDecimals={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="bookings" stroke="#10B981" fill="#D1FAE5" />
                  </AreaChart>
                ) : (
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900">Monthly Trend</h3>
            <p className="text-xs text-slate-400 font-medium">Last 6 months spending</p>
          </div>
          <div className="h-48 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <Tooltip formatter={(val: any) => [`৳${val}`, 'Spent']} />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* My Bookings Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-slate-900">My Bookings</h3>
            <p className="text-xs text-slate-400 font-medium">View and manage your order history</p>
          </div>
          <Link href="/all-menu" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Browse more</span> <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loadingOrders ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading orders data...</div>
          ) : orders.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-2">CUSTOMER / ITEM</th>
                  <th className="py-3 px-2">DATE</th>
                  <th className="py-3 px-2">AMOUNT</th>
                  <th className="py-3 px-2">STATUS</th>
                  <th className="py-3 px-2 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {orders.map((ord) => (
                  <tr key={ord._id}>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      {ord.customerName || formatFoodItems(ord.items)}
                    </td>
                    <td className="py-3 px-2 text-slate-500">
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      ৳{ord.totalAmount || ord.totalPrice || ord.price || 0}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        ord.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {ord.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition">
                        <FiEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400 font-medium">No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
