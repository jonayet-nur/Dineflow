'use client';

import { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiPhone, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod?: string;
  status?: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: '⏳ Pending' },
  { value: 'processing', label: '🍳 Processing' },
  { value: 'shipped', label: '🚴 Shipped' },
  { value: 'delivered', label: '✅ Delivered' },
  { value: 'cancelled', label: '❌ Cancelled' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

  // 📦 Fetch Orders
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/orders`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data || []);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Server connection error');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 🔄 Update Status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        toast.success(`Status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        toast.error(data?.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status Error:', error);
      toast.error('Server connection error');
    }
  };

  // 🗑️ Delete Order
  const handleDeleteOrder = async (orderId: string) => {
    if (!orderId) return toast.error('Invalid Order ID');
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      const res = await fetch(`${baseUrl}/api/orders/${orderId}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        toast.success(data?.message || 'Order deleted successfully');
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      } else {
        toast.error(data?.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error('Server connection error');
    }
  };

  // 🎨 Status Badge Styling
  const getStatusBadge = (status: string = 'pending') => {
    const badges: Record<string, string> = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      processing: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-purple-50 text-purple-700 border-purple-200',
      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return badges[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Order Management</h1>
          <p className="text-xs text-gray-500 mt-1">Track and update customer order statuses</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-xs text-sm font-bold text-gray-700">
          Total Orders: <span className="text-orange-600 font-black">{orders.length}</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-100">
                  <th className="p-4 pl-6">Customer Details</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total Bill</th>
                  <th className="p-4">Status Action</th>
                  <th className="p-4 pr-6 text-right">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition">
                    {/* Customer Info */}
                    <td className="p-4 pl-6 align-top">
                      <div className="font-bold text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FiPhone size={12} className="text-gray-400" /> {order.phone}
                      </div>
                      <div className="text-xs text-gray-500 flex items-start gap-1 mt-1 max-w-xs">
                        <FiMapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{order.address}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="p-4 align-top">
                      <div className="space-y-1">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-700 font-medium">
                            • {item.name} <span className="text-gray-400 font-normal">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="p-4 align-top">
                      <div className="font-black text-gray-900">৳{order.totalAmount}</div>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {order.paymentMethod || 'COD'}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="p-4 align-top">
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition ${getStatusBadge(order.status)}`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Delete Action */}
                    <td className="p-4 pr-6 align-top text-right">
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                        title="Delete order"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}