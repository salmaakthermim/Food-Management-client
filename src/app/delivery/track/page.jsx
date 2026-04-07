"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, MapPin, Bike, CheckCircle, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function TrackLocation() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationInputs, setLocationInputs] = useState({});
  const [saving, setSaving] = useState(null);

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    const data = await fetch(`http://localhost:5000/delivery/orders?email=${user.email}`).then(r => r.json());
    // only active deliveries
    setOrders(data.filter(o => o.status === "Out for Delivery"));
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const handleSave = async (orderId) => {
    const address = locationInputs[orderId];
    if (!address?.trim()) { toast.error("Enter a location first"); return; }
    setSaving(orderId);
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/location`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (res.ok) {
        toast.success("Location updated!");
        setLocationInputs(prev => ({ ...prev, [orderId]: "" }));
        await load();
      }
    } catch { toast.error("Failed"); }
    finally { setSaving(null); }
  };

  const markDelivered = async (orderId) => {
    await fetch(`http://localhost:5000/orders/${orderId}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Delivered" }),
    });
    toast.success("Marked as Delivered!");
    await load();
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Navigation className="text-rose-500" /> Location Tracking
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Update your live location for active deliveries.</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-rose-500"></span></div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <Navigation size={48} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold text-lg">No active deliveries right now.</p>
          <p className="text-gray-400 text-sm mt-1">Accept an order to start tracking.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div key={order._id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-black text-lg">{order.customerName}</p>
                    <p className="text-indigo-200 text-xs font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-white text-xs font-bold">Live</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Destination */}
                  <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                    <MapPin size={18} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-rose-400 font-bold uppercase tracking-wide mb-0.5">Destination</p>
                      <p className="text-gray-800 font-semibold text-sm">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <Navigation size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-indigo-400 font-bold uppercase tracking-wide mb-0.5">Current Location</p>
                      <p className="text-gray-800 font-semibold text-sm">
                        {order.deliveryLocation?.address || <span className="text-gray-400 italic">Not updated yet</span>}
                      </p>
                    </div>
                  </div>

                  {/* Update Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Update Current Location</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={locationInputs[order._id] || ""}
                        onChange={e => setLocationInputs(prev => ({ ...prev, [order._id]: e.target.value }))}
                        placeholder="e.g. Near City Mall, Dhaka"
                        className="flex-1 text-sm px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <button
                        onClick={() => handleSave(order._id)}
                        disabled={saving === order._id}
                        className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition disabled:opacity-60"
                      >
                        {saving === order._id ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
                      </button>
                    </div>
                  </div>

                  {/* Mark Delivered */}
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-md shadow-green-200 hover:shadow-lg transition"
                  >
                    <CheckCircle size={18} /> Mark as Delivered
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
