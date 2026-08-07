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
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import toast from 'react-hot-toast';

// Types & Interfaces
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

const TRAFFIC_COLORS = ['#ea580c', '#10b981', '#f59e0b', '#8b5cf6'];

// Custom Dark Floating Tooltip for Charts
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 text-white p-3.5 rounded-xl shadow-xl text-[11px] min-w-[150px] space-y-1.5 backdrop-blur-md">
        <p className="font-bold text-slate-350 pb-1.5 border-b border-slate-800">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={`tt-${index}`} className="flex items-center justify-between gap-4 pt-1">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              {item.name}:
            </span>
            <span className="font-bold text-white">
              {typeof item.value === 'number' && (item.name?.toLowerCase().includes('revenue') || item.name?.toLowerCase().includes('expense') || item.name?.toLowerCase().includes('spent'))
                ? `৳${item.value.toLocaleString()}`
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
  
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const deviceTrafficData = data?.deviceTraffic?.length ? data.deviceTraffic : [
    { name: 'Desktop', value: 58, color: '#ea580c' },
    { name: 'Mobile', value: 32, color: '#10b981' },
    { name: 'Tablet', value: 10, color: '#f59e0b' },
  ];

  if (loading || !isMounted) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-20 bg-slate-200/60 rounded-[22px] w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200/60 rounded-[22px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-slate-200/60 rounded-[22px]" />
          <div className="h-80 bg-slate-200/60 rounded-[22px]" />
        </div>
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-slate-50/40 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 antialiased">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Executive Analytics
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Real-time metric monitoring and system performance breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:border-slate-300 transition duration-200">
            <FiFilter className="text-slate-400 shrink-0 text-sm" />
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
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 active:scale-95 transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin text-orange-600' : ''}`} />
            {refreshing ? 'Syncing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Users */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.025)] transition-shadow duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Users</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/50 shadow-sm">
              <FiUsers size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none">
              {stats?.totalUsers?.toLocaleString() || '0'}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {(stats?.usersGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/60">
                  <FiArrowUpRight size={12} className="mr-0.5" /> +{stats?.usersGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/60">
                  <FiArrowDownRight size={12} className="mr-0.5" /> {stats?.usersGrowth}%
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Revenue */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.025)] transition-shadow duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gross Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 shadow-sm">
              <FiDollarSign size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none">
              ৳{stats?.totalRevenue?.toLocaleString('en-BD') || '0'}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {(stats?.revenueGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/60">
                  <FiArrowUpRight size={12} className="mr-0.5" /> +{stats?.revenueGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/60">
                  <FiArrowDownRight size={12} className="mr-0.5" /> {stats?.revenueGrowth}%
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Active Sessions */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.025)] transition-shadow duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Sessions</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center border border-purple-100/50 shadow-sm">
              <FiActivity size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none">
              {stats?.activeSessions?.toLocaleString() || '0'}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {(stats?.sessionsGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/60">
                  <FiArrowUpRight size={12} className="mr-0.5" /> +{stats?.sessionsGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/60">
                  <FiArrowDownRight size={12} className="mr-0.5" /> {stats?.sessionsGrowth}%
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Conversion Rate */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.025)] transition-shadow duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversion Rate</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50 shadow-sm">
              <FiTrendingUp size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none">
              {stats?.conversionRate || 0}%
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {(stats?.conversionGrowth ?? 0) >= 0 ? (
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/60">
                  <FiArrowUpRight size={12} className="mr-0.5" /> +{stats?.conversionGrowth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/60">
                  <FiArrowDownRight size={12} className="mr-0.5" /> {stats?.conversionGrowth}%
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400">vs. last timeframe</span>
            </div>
          </div>
        </div>

      </div>

      {/* RECHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart comparisons */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Financial Growth Overview</h2>
              <p className="text-xs text-slate-400 font-medium">Revenue vs Expense analytical comparison</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-2 text-orange-600">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Revenue
              </span>
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Expenses
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueChart || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ea580c" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#revenueGrad)" 
                  name="Revenue" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#64748b" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#expenseGrad)" 
                  name="Expenses" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic distributes */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-slate-900">Traffic Distribution</h2>
            <p className="text-xs text-slate-400 font-medium">Sessions segmented by user device</p>
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
                  formatter={(value) => <span className="text-xs text-slate-500 font-bold">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* engagement bars and logs feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Engagement activities charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-slate-900">Daily User Activity</h2>
            <p className="text-xs text-slate-400 font-medium">Unique active user sessions over the period</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.userActivityChart || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomChartTooltip />} />
                <Bar dataKey="activeUsers" fill="#ea580c" radius={[6, 6, 0, 0]} name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent logs log feed */}
        <div className="bg-white p-6 rounded-[22px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-5">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
              <p className="text-xs text-slate-400 font-medium">Latest platform events</p>
            </div>
            <span className="text-[11px] font-bold text-orange-650 hover:underline cursor-pointer">View All</span>
          </div>

          <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {data?.recentActivities?.length ? (
              data.recentActivities.map((act) => (
                <div key={act.id} className="py-3.5 flex items-start gap-3 text-xs">
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    act.type === 'user' ? 'bg-orange-50 text-orange-600' : 
                    act.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-650'
                  }`}>
                    {act.type === 'user' ? <FiUser size={14} /> : 
                     act.type === 'payment' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{act.user}</p>
                    <p className="text-slate-400 text-[11px] font-medium truncate">{act.action}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">{act.time}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-10 font-medium">No recent activities available.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}