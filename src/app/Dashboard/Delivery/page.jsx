"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike, MapPin, Package, CheckCircle, Clock,
  Phone, User, Search, RefreshCw, Navigation,
  ChevronDown, AlertCircle, TrendingUp
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const STATUS_CONFIG = {
  "Pending":          { color: "bg-amber-100 text-amber-700",   dot: "bg-amber-400",  icon: Clock },
  "Cooking":          { color: "bg-blue-100 text-blue-700",     dot: "bg-blue-400",   icon: Package },
  "Out for Delivery": { color: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", icon: Bike },
  "Delivered":        { color: "bg-green-100 text-green-700",   dot: "bg-green-500",  icon: CheckCircle },
};

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("assigned"); // assigned | available
  const [updatingId, setUpdatingId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  const fetchAssigned = async () => {
    if (!user?.email) return;
    const res = await fetch(`http://localhost:5000/delivery/orders?email=${user.email}`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchAll = async () => {
    const res = await fetch("http://localhost:5000/orders/admin/all");
    const data = await res.json();
    // show only Cooking orders not yet assigned
    setAllOrders(data.filter(o => o.status === "Cooking" && !o.deliveryEmail));
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchAssigned(), fetchAll()]);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [user]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Marked as "${newStatus}"`);
        await loadData();
      }
    } catch { toast.error("Failed to update"); }
    finally { setUpdatingId(null); }
  };

  const handleAssign = async (orderId) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryEmail: user.email, deliveryName: user.displayName }),
      });
      if (res.ok) {
        toast.success("Order assigned to you!");
        await loadData();
        setActiveTab("assigned");
      }
    } catch { toast.error("Failed to assign"); }
    finally { setUpdatingId(null); }
  };

  const handleUpdateLocation = async (orderId) => {
    if (!locationInput.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/location`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: locationInput }),
      });
      if (res.ok) {
        toast.success("Location updated!");
        setLocationId(null);
        setLocationInput("");
        await fetchAssigned();
      }
    } catch { toast.error("Failed to update location"); }
  };

  const filtered = (activeTab === "assigned" ? orders : allOrders).filter(o =>
    o._id.includes(search) ||
    o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const stats = {
    total: orders.length,
    active: orders.filter(o => o.status === "Out for Delivery").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    pending: orders.filter(o => o.status === "Cooking").length,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-200">
              <Bike size={28} className="text-white" />
            </div>
            Delivery Dashboard
          </h1>
          <p className="text-gray-500 mt-1 ml-1">Manage your deliveries and track orders in real-time.</p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold shadow-sm transition"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Assigned", value: stats.total, icon: Package, color: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-200" },
          { label: "Out for Delivery", value: stats.active, icon: Bike, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-200" },
          { label: "Delivered", value: stats.delivered, icon: CheckCircle, color: "from-green-500 to-emerald-500", shadow: "shadow-green-200" },
          { label: "Available Orders", value: allOrders.length, icon: AlertCircle, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-200" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
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

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          {["assigned", "available"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "assigned" ? `My Orders (${orders.length})` : `Available (${allOrders.length})`}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <Bike size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-semibold text-lg">
            {activeTab === "assigned" ? "No orders assigned to you yet." : "No available orders right now."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filtered.map((order, i) => {
              const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG["Pending"];
              const StatusIcon = statusCfg.icon;
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-5">

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusCfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}></span>
                          {order.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(order.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <User size={15} className="text-indigo-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{order.customerName}</p>
                            <p className="text-xs text-gray-500">{order.customerEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone size={15} className="text-indigo-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{order.customerPhone || "—"}</p>
                            <p className="text-xs text-gray-500">Contact</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:col-span-2">
                          <MapPin size={15} className="text-rose-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm text-gray-700 font-medium">{order.deliveryAddress}</p>
                            {order.deliveryLocation?.address && (
                              <p className="text-xs text-indigo-500 mt-0.5 flex items-center gap-1">
                                <Navigation size={11} /> Current: {order.deliveryLocation.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {order.items?.map((item, idx) => (
                          <span key={idx} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                            {item.quantity}x {item.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Price + Actions */}
                    <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-2xl font-black text-indigo-600">${order.grandTotal}</p>
                        <p className="text-xs text-gray-400 font-medium">{order.paymentMethod}</p>
                      </div>

                      {/* Action Buttons */}
                      {activeTab === "available" ? (
                        <button
                          onClick={() => handleAssign(order._id)}
                          disabled={updatingId === order._id}
                          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition disabled:opacity-60"
                        >
                          {updatingId === order._id ? <span className="loading loading-spinner loading-xs"></span> : <Bike size={15} />}
                          Accept Order
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                          {/* Status Update Buttons */}
                          <div className="flex gap-2 flex-wrap">
                            {order.status !== "Out for Delivery" && order.status !== "Delivered" && (
                              <button
                                onClick={() => handleStatusUpdate(order._id, "Out for Delivery")}
                                disabled={updatingId === order._id}
                                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-200 transition disabled:opacity-60"
                              >
                                <Bike size={13} /> Start Delivery
                              </button>
                            )}
                            {order.status === "Out for Delivery" && (
                              <button
                                onClick={() => handleStatusUpdate(order._id, "Delivered")}
                                disabled={updatingId === order._id}
                                className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-xs shadow-md shadow-green-200 transition disabled:opacity-60"
                              >
                                <CheckCircle size={13} /> Mark Delivered
                              </button>
                            )}
                            {order.status === "Delivered" && (
                              <span className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-xs border border-green-100">
                                <CheckCircle size={13} /> Completed
                              </span>
                            )}
                          </div>

                          {/* Location Update */}
                          {order.status === "Out for Delivery" && (
                            <div>
                              {locationId === order._id ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={locationInput}
                                    onChange={(e) => setLocationInput(e.target.value)}
                                    placeholder="e.g. Near City Mall..."
                                    className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                  />
                                  <button
                                    onClick={() => handleUpdateLocation(order._id)}
                                    className="px-3 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setLocationId(null)}
                                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => { setLocationId(order._id); setLocationInput(order.deliveryLocation?.address || ""); }}
                                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs border border-rose-100 transition"
                                >
                                  <Navigation size={13} /> Update Location
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
