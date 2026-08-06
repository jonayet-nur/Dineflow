// components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  loading?: boolean;
  color: 'blue' | 'rose' | 'emerald' | 'purple' | string;
}

const colorStyles: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  rose: 'bg-rose-50 text-rose-500',
  emerald: 'bg-emerald-50 text-emerald-600',
  purple: 'bg-purple-50 text-purple-600',
};

export default function StatCard({
  title,
  value,
  sub,
  icon,
  loading = false,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex justify-between items-start transition hover:border-slate-300">
      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-500">{title}</p>
        {loading ? (
          <div className="h-7 w-16 bg-slate-100 animate-pulse rounded-md" />
        ) : (
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        )}
        <p className="text-[11px] font-medium text-slate-400">{sub}</p>
      </div>
      <div className={`p-3 rounded-xl ${colorStyles[color] || colorStyles.blue}`}>
        {icon}
      </div>
    </div>
  );
}