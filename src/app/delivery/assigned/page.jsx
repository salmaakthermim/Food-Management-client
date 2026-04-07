"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, CheckCircle, Package, MapPin, Phone, User, Search, RefreshCw, Navigation } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const STATUS_COLOR = {
  "Pending":          "bg-amber-100 text-amber-700 border-amber-200",
  "Cooking":          "bg-blue-100 text-blue-700 border-blue-200",
  "Out for Delivery": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Delivered":        "bg-green-100 text-green-700 border-green-200",
};

export default function AssignedOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("mine");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    const [mine, all] = await Promise.all([
      fetch(`http://localhost:5000/delivery/orders?email=${user.email}`).then(r => r.json()),
      fetch("http://localhost:5000/orders/admin/all").then(r => r.json()),
    ]);
    setOrders(mine);
    setAvailable(all.filter(o => o.status === "Cooking" && !o.deliveryEmail));
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    await fetch(`http://localhost:5000/orders/${id}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast.success(`Marked as "${status}"`);
    await load();
    setUpdatingId(null);
  };

  const acceptOrder = async (id) => {
    setUpdatingId(id);
    await fetch(`http://localhost:5000/orders/${id}/assign`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryEmail: user.email, deliveryName: user.displayName }),
    });
    toast.success("Order accepted!");
    await load();
    setTab("mine");
    setUpdatingId(null);
  };

  const saveLocation = async (id) => {
    if (!locationInput.trim()) return;
    await fetch(`http://localhost:5000/orders/${id}/location`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: locationInput }),
    });
    toast.success("Location updated!");
    setLocationId(null);
    setLocationInput("");
    await load();
  };

  const list = (tab === "mine" ? orders : available).filter(o =>
    o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
    o._id.includes(search)
  );

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2"><Package className="text-indigo-500" /> Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage and accept delivery orders.</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-1">
          {[["mine", `My Orders (${orders.length})`], ["available", `Available (${available.length})`]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === key ? "bg-indigo-500 text-white shadow-md" : "text-gray-500 hover:text-gray-800"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-indigo-500"></span></div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <Package size={48} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AnimatePresence>
            {list.map((order, i) => (
              <motion.div key={order._id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">#{order._id.slice(-8).toUpperCase()}</span>
                    <p className="text-xs text-gray-400 mt-1">{new Date(order.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_COLOR[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>

                {/* Customer info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-indigo-400 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800 leading-none">{order.customerName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-indigo-400 shrink-0" />
                    <p className="font-semibold text-gray-700">{order.customerPhone || "—"}</p>
                  </div>
                  <div className="col-span-2 flex items-start gap-2">
                    <MapPin size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700 font-medium leading-snug">{order.deliveryAddress}</p>
                      {order.deliveryLocation?.address && (
                        <p className="text-xs text-indigo-500 mt-0.5 flex items-center gap-1">
                          <Navigation size={11} /> {order.deliveryLocation.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-1.5">
                  {order.items?.map((item, idx) => (
                    <span key={idx} className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-1 rounded-lg font-medium">
                      {item.quantity}× {item.title}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-xl font-black text-indigo-600">${order.grandTotal}</p>

                  {tab === "available" ? (
                    <button onClick={() => acceptOrder(order._id)} disabled={updatingId === order._id}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition disabled:opacity-60">
                      {updatingId === order._id ? <span className="loading loading-spinner loading-xs"></span> : <Bike size={14} />}
                      Accept
                    </button>
                  ) : (
                    <div className="flex gap-2 flex-wrap justify-end">
                      {order.status === "Out for Delivery" && (
                        <>
                          <button onClick={() => { setLocationId(order._id); setLocationInput(order.deliveryLocation?.address || ""); }}
                            className="flex items-center gap-1 px-3 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold hover:bg-rose-100 transition">
                            <Navigation size={12} /> Location
                          </button>
                          <button onClick={() => updateStatus(order._id, "Delivered")} disabled={updatingId === order._id}
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold shadow-md shadow-green-200 transition disabled:opacity-60">
                            <CheckCircle size={12} /> Delivered
                          </button>
                        </>
                      )}
                      {order.status !== "Out for Delivery" && order.status !== "Delivered" && (
                        <button onClick={() => updateStatus(order._id, "Out for Delivery")} disabled={updatingId === order._id}
                          className="flex items-center gap-1 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition disabled:opacity-60">
                          <Bike size={12} /> Start
                        </button>
                      )}
                      {order.status === "Delivered" && (
                        <span className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl text-xs font-bold">
                          <CheckCircle size={12} /> Done
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Location input inline */}
                {locationId === order._id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex gap-2 pt-2 border-t border-gray-100">
                    <input value={locationInput} onChange={e => setLocationInput(e.target.value)}
                      placeholder="Current location (e.g. Near City Mall)"
                      className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <button onClick={() => saveLocation(order._id)} className="px-3 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition">Save</button>
                    <button onClick={() => setLocationId(null)} className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition">✕</button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
