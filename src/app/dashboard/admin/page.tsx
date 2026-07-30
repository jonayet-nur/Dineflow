'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiActivity, 
  FiRefreshCw, 
  FiArrowUpRight, 
  FiArrowDownRight,
  FiFilter,
  FiCheckCircle,
  FiAlertCircle,
  FiUser
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import toast from 'react-hot-toast';

// 📊 Types & Interfaces
export interface DashboardStats {
  totalUsers: number;
  usersGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeSessions: number;
  sessionsGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
}

export interface RevenueChartData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface UserActivityData {
  day: string;
  activeUsers: number;
}

export interface DeviceTrafficData {
  name: string;
  value: number;
  color: string;
}

export interface RecentActivity {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'user' | 'payment' | 'system';
}

export interface DashboardResponse {
  stats: DashboardStats;
  revenueChart: RevenueChartData[];
  userActivityChart: UserActivityData[];
  deviceTraffic: DeviceTrafficData[];
  recentActivities: RecentActivity[];
}

const TRAFFIC_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

// 🎨 Custom Dark Floating Tooltip for Area/Bar Charts
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-md text-white p-3 rounded-xl shadow-2xl border border-gray-800 text-xs min-w-[140px] space-y-1">
        <p className="font-bold text-gray-300 pb-1 border-b border-gray-800">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={`tt-${index}`} className="flex items-center justify-between gap-3 pt-1">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              {item.name}:
            </span>
            <span className="font-semibold text-white">
              {typeof item.value === 'number' && item.name?.toLowerCase().includes('revenue') || item.name?.toLowerCase().includes('expense')
                ? `$${item.value.toLocaleString()}`
                : item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  // Recharts SSR Hydration Safety
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🔄 Fetch Dynamic Analytics Data
  const fetchDashboardData = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(`${baseUrl}/api/admin/dashboard-stats?timeframe=${timeframe}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setData(result.data);
        if (isManualRefresh) toast.success('Analytics updated in real-time!');
      } else {
        toast.error(result?.message || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Dashboard Fetch Error:', error);
      toast.error('Failed to connect to backend server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [baseUrl, timeframe]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Fallback Device Traffic Data
  const deviceTrafficData = data?.deviceTraffic?.length ? data.deviceTraffic : [
    { name: 'Desktop', value: 58, color: '#3B82F6' },
    { name: 'Mobile', value: 32, color: '#10B981' },
    { name: 'Tablet', value: 10, color: '#F59E0B' },
  ];

  // 💀 Skeleton Loader for Production Visual Feel
  if (loading || !isMounted) {
    return (
      <div className="min-h-screen bg-gray-50/60 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-20 bg-gray-200/70 rounded-2xl w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200/70 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-gray-200/70 rounded-2xl" />
          <div className="h-80 bg-gray-200/70 rounded-2xl" />
        </div>
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-gray-50/60 p-3 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 antialiased selection:bg-blue-500 selection:text-white">
      
      {/* 🚀 HEADER & ACTION CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Executive Analytics
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Sync
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Real-time metric monitoring and system performance breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe Selector Filter */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300 transition">
            <FiFilter className="text-gray-400 shrink-0" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="bg-transparent outline-none cursor-pointer pr-1"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
          </div>

          {/* Refresh Action */}
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 active:scale-95 transition disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
            {refreshing ? 'Syncing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* 📈 STATS METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Users</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <FiUsers size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {stats?.totalUsers?.toLocaleString() || '0'}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              {(stats?.usersGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <FiArrowUpRight size={13} className="mr-0.5" /> +{stats?.usersGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  <FiArrowDownRight size={13} className="mr-0.5" /> {stats?.usersGrowth}%
                </span>
              )}
              <span className="text-[11px] font-medium text-gray-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Gross Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <FiDollarSign size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              ${stats?.totalRevenue?.toLocaleString() || '0'}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              {(stats?.revenueGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <FiArrowUpRight size={13} className="mr-0.5" /> +{stats?.revenueGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  <FiArrowDownRight size={13} className="mr-0.5" /> {stats?.revenueGrowth}%
                </span>
              )}
              <span className="text-[11px] font-medium text-gray-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Active Sessions */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Sessions</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <FiActivity size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {stats?.activeSessions?.toLocaleString() || '0'}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              {(stats?.sessionsGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <FiArrowUpRight size={13} className="mr-0.5" /> +{stats?.sessionsGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  <FiArrowDownRight size={13} className="mr-0.5" /> {stats?.sessionsGrowth}%
                </span>
              )}
              <span className="text-[11px] font-medium text-gray-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <FiTrendingUp size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {stats?.conversionRate || 0}%
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              {(stats?.conversionGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <FiArrowUpRight size={13} className="mr-0.5" /> +{stats?.conversionGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  <FiArrowDownRight size={13} className="mr-0.5" /> {stats?.conversionGrowth}%
                </span>
              )}
              <span className="text-[11px] font-medium text-gray-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

      </div>

      {/* 📊 MAIN RECHARTS ANALYTICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 1: Financial Growth (Area Chart - 2 Columns) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Financial Growth Overview</h2>
              <p className="text-xs text-gray-400">Revenue vs Expense analytical comparison</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Expenses
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueChart || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#revenueGrad)" 
                  name="Revenue" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#F43F5E" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#expenseGrad)" 
                  name="Expenses" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Device Traffic Donut Chart (1 Column) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-base font-bold text-gray-900">Traffic Distribution</h2>
            <p className="text-xs text-gray-400">Sessions segmented by user device</p>
          </div>

          <div className="h-72 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTrafficData}
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {deviceTrafficData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomChartTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span className="text-xs text-gray-600 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 📊 SECONDARY CHARTS & LIVE FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 3: Daily Engagement Bar Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-base font-bold text-gray-900">Daily User Activity</h2>
            <p className="text-xs text-gray-400">Unique active user sessions over the period</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.userActivityChart || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomChartTooltip />} />
                <Bar dataKey="activeUsers" fill="#6366F1" radius={[8, 8, 0, 0]} name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📋 ACTIVITY LOG FEED (1 Column) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
              <p className="text-xs text-gray-400">Latest platform events</p>
            </div>
            <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View All</span>
          </div>

          <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {data?.recentActivities?.length ? (
              data.recentActivities.map((act) => (
                <div key={act.id} className="py-3 flex items-start gap-3 text-xs">
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    act.type === 'user' ? 'bg-blue-50 text-blue-600' : 
                    act.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {act.type === 'user' ? <FiUser size={14} /> : 
                     act.type === 'payment' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{act.user}</p>
                    <p className="text-gray-500 text-[11px] truncate">{act.action}</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 shrink-0">{act.time}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-10">No recent activities available.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}