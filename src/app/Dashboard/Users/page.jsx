"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, User, Trash2, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    setIsFetching(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsFetching(false);
      })
      .catch(() => setIsFetching(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        toast.success(`Role updated to ${newRole}`);
        fetchUsers();
      }
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (userId, name) => {
    if (!confirm(`Delete user "${name}"?`)) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("User deleted");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <Users className="text-indigo-500" /> All Users
          </h1>
          <p className="text-gray-500 mt-1">Manage user roles and accounts.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10 bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">No users found.</td>
                </tr>
              ) : (
                filtered.map((u, i) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="text-gray-400 font-mono text-sm">{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={u.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`}
                          className="w-10 h-10 rounded-full border border-gray-100"
                          alt={u.name}
                        />
                        <span className="font-bold text-gray-800">{u.name || "—"}</span>
                      </div>
                    </td>
                    <td className="text-gray-500 text-sm">{u.email}</td>
                    <td>
                      <span className="badge badge-ghost text-xs font-semibold">{u.provider || "email"}</span>
                    </td>
                    <td>
                      <span className={`badge font-bold border-none text-xs ${u.role === "admin" ? "badge-warning" : "badge-info"}`}>
                        {u.role || "customer"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {u.role !== "admin" ? (
                          <button
                            onClick={() => handleRoleChange(u._id, "admin")}
                            className="btn btn-xs bg-amber-100 text-amber-700 hover:bg-amber-200 border-none gap-1"
                          >
                            <ShieldCheck size={13} /> Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(u._id, "customer")}
                            className="btn btn-xs bg-gray-100 text-gray-600 hover:bg-gray-200 border-none gap-1"
                          >
                            <User size={13} /> Make Customer
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u._id, u.name)}
                          className="btn btn-xs bg-red-50 text-red-500 hover:bg-red-100 border-none"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
