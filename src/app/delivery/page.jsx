"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bike, Package, CheckCircle, Clock, TrendingUp, AlertCircle } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function DeliveryOverview() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/delivery/orders?email=${user.email}`).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/admin/all`).then(r => r.json()),
    ]).then(([mine, all]) => {
      setOrders(mine);
      setAvailable(all.filter(o => o.status === "Cooking" && !o.deliveryEmail));
      setLoading(false);
    });
  }, [user]);

  const stats = [
    { label: "Total Assigned",     value: orders.length,                                          icon: Package,     color: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-200" },
    { label: "Out for Delivery",   value: orders.filter(o => o.status === "Out for Delivery").length, icon: Bike,    color: "from-blue-500 to-cyan-500",     shadow: "shadow-blue-200" },
    { label: "Delivered Today",    value: orders.filter(o => o.status === "Delivered").length,    icon: CheckCircle, color: "from-green-500 to-emerald-500",  shadow: "shadow-green-200" },
    { label: "Available to Pick",  value: available.length,                                       icon: AlertCircle, color: "from-amber-500 to-orange-500",   shadow: "shadow-amber-200" },
  ];

  const recent = orders.slice(0, 5);

  const statusColor = {
    "Pending":          "badge-warning",
    "Cooking":          "badge-info",
    "Out for Delivery": "badge-primary",
    "Delivered":        "badge-success",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Good day, {user?.displayName?.split(" ")[0]} 👋</h1>
        <p className="text-gray-500 mt-1">Here's your delivery summary for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg ${s.shadow}`}>
              <s.icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-800">{loading ? "—" : s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/delivery/assigned" className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all">
          <Package size={32} className="mb-3 opacity-80" />
          <p className="text-xl font-black">My Assigned Orders</p>
          <p className="text-indigo-200 text-sm mt-1">View and manage your current deliveries</p>
        </Link>
        <Link href="/delivery/track" className="group bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all">
          <Bike size={32} className="mb-3 opacity-80" />
          <p className="text-xl font-black">Track & Update Location</p>
          <p className="text-rose-200 text-sm mt-1">Update your live delivery location</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-black text-gray-800 text-lg">Recent Orders</h2>
          <Link href="/delivery/assigned" className="text-indigo-500 text-sm font-bold hover:underline">View all</Link>
        </div>
        {loading ? (
          <div className="p-10 flex justify-center"><span className="loading loading-spinner text-indigo-500"></span></div>
        ) : recent.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No orders yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map(order => (
              <div key={order._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <p className="font-bold text-gray-800 text-sm">{order.customerName}</p>
                  <p className="text-xs text-gray-400 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-indigo-600">${order.grandTotal}</span>
                  <span className={`badge badge-sm font-bold border-none ${statusColor[order.status] || "badge-ghost"}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
