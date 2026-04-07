"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, User, Phone, Package } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function DeliveredOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/delivery/orders?email=${user.email}`)
      .then(r => r.json())
      .then(data => {
        setOrders(data.filter(o => o.status === "Delivered"));
        setLoading(false);
      });
  }, [user]);

  const total = orders.reduce((sum, o) => sum + parseFloat(o.grandTotal || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <CheckCircle className="text-green-500" /> Delivered Orders
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">All successfully completed deliveries.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg shadow-green-200">
            <CheckCircle size={22} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-800">{loading ? "—" : orders.length}</p>
            <p className="text-xs text-gray-500 font-medium">Total Delivered</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-200">
            <Package size={22} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-800">{loading ? "—" : `$${total.toFixed(2)}`}</p>
            <p className="text-xs text-gray-500 font-medium">Total Value</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-green-500"></span></div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <CheckCircle size={48} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No delivered orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {orders.map((order, i) => (
            <motion.div key={order._id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">#{order._id.slice(-8).toUpperCase()}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                  <CheckCircle size={11} /> Delivered
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <User size={13} className="text-indigo-400" />
                  <p className="font-bold text-gray-800 truncate">{order.customerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-indigo-400" />
                  <p className="text-gray-600">{order.customerPhone || "—"}</p>
                </div>
                <div className="col-span-2 flex items-start gap-2">
                  <MapPin size={13} className="text-rose-400 mt-0.5 shrink-0" />
                  <p className="text-gray-600 text-xs leading-snug">{order.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400">{new Date(order.timestamp).toLocaleDateString()}</p>
                <p className="text-lg font-black text-indigo-600">${order.grandTotal}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
