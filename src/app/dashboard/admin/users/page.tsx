'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { FiSearch, FiUserCheck, FiShield, FiUser, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  createdAt?: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // 👈 Deleting State Added

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  // 1. Fetch All Users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/admin/users?search=${search}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data?.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch Users Error:', error);
      toast.error('Server connection failed');
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search]);

  useEffect(() => {
    const timer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  // 2. Change Role Function
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      setUpdatingId(userId);
      const res = await fetch(`${baseUrl}/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`User role updated to ${newRole.toUpperCase()}`);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(data?.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Role Update Error:', error);
      toast.error('Failed to connect to server');
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================================
  // 3. Delete User Function (নতুন যোগ করা হয়েছে)
  // ==========================================================
  const handleDeleteUser = async (userId: string, userName: string) => {
    // কনফার্মেশন অ্যালার্ট
    const confirmDelete = window.confirm(`Are you sure you want to delete ${userName}?`);
    if (!confirmDelete) return;

    try {
      setDeletingId(userId);
      const res = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || 'User deleted successfully');
        // স্টেট থেকে ইউজার রিমুভ করে পেজ লাইভ আপডেট করা
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
      } else {
        toast.error(data?.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete User Error:', error);
      toast.error('Server connection error during delete');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-3 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">Manage Users</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          View registered users and manage their role permissions
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-xs mb-6">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="p-12 text-center flex justify-center bg-white rounded-2xl border border-gray-100">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium text-sm">
          No users found.
        </div>
      ) : (
        <>
          {/* 📱 MOBILE CARD VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-blue-50 border border-gray-100 shrink-0 flex items-center justify-center">
                    {u.image ? (
                      <Image src={u.image} alt={u.name} fill className="object-cover" />
                    ) : (
                      <FiUser className="text-blue-600 text-xl" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{u.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                      u.role === 'admin'
                        ? 'bg-purple-50 text-purple-600 border-purple-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {u.role === 'admin' ? <FiShield size={12} /> : <FiUserCheck size={12} />}
                    {u.role.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Role Switch Dropdown */}
                    <select
                      value={u.role}
                      disabled={updatingId === u._id || deletingId === u._id}
                      onChange={(e) => handleRoleChange(u._id, e.target.value as 'user' | 'admin')}
                      className="text-xs font-semibold px-2.5 py-1.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 outline-none focus:border-blue-500 disabled:opacity-50"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>

                    {/* 🗑️ MOBILE DELETE BUTTON */}
                    <button
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      disabled={deletingId === u._id || updatingId === u._id}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition border border-red-100 disabled:opacity-50"
                      title="Delete User"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-100">
                    <th className="p-4 pl-6">User Info</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Current Role</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/50 transition">
                      {/* Name & Avatar */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 relative rounded-full overflow-hidden bg-blue-50 border border-gray-100 shrink-0 flex items-center justify-center">
                            {u.image ? (
                              <Image src={u.image} alt={u.name} fill className="object-cover" />
                            ) : (
                              <FiUser className="text-blue-600 text-lg" />
                            )}
                          </div>
                          <span className="font-bold text-gray-900">{u.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-4 text-gray-500">{u.email}</td>

                      {/* Current Role Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                            u.role === 'admin'
                              ? 'bg-purple-50 text-purple-600 border-purple-200'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          {u.role === 'admin' ? <FiShield size={12} /> : <FiUserCheck size={12} />}
                          {u.role.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions Column (Role Select & Delete) */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Switch Dropdown */}
                          <select
                            value={u.role}
                            disabled={updatingId === u._id || deletingId === u._id}
                            onChange={(e) =>
                              handleRoleChange(u._id, e.target.value as 'user' | 'admin')
                            }
                            className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>

                          {/* 🗑️ DESKTOP DELETE BUTTON ADDED HERE */}
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            disabled={deletingId === u._id || updatingId === u._id}
                            className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition border border-transparent hover:border-red-100 disabled:opacity-50"
                            title="Delete User"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}