"use client";
import { useEffect, useRef, useState } from "react";
import { Bell, Check, CheckCheck, Trash2, ShoppingBag, Bike, Star, Users, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const TYPE_CONFIG = {
  order_placed:  { icon: ShoppingBag, color: "bg-indigo-100 text-indigo-600" },
  order_status:  { icon: Bike,        color: "bg-green-100 text-green-600" },
  new_order:     { icon: Package,     color: "bg-amber-100 text-amber-600" },
  new_review:    { icon: Star,        color: "bg-rose-100 text-rose-600" },
  new_user:      { icon: Users,       color: "bg-purple-100 text-purple-600" },
};

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const fetchNotifications = async () => {
    if (!user?.email) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications?email=${user.email}`);
    const data = await res.json();
    setNotifications(data);
    setUnread(data.filter(n => !n.read).length);
  };

  // Poll every 15 seconds
  useEffect(() => {
    if (!user?.email) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read`, { method: "PATCH" });
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    setUnread(prev => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    if (!user?.email) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnread(0);
  };

  const clearAll = async () => {
    if (!user?.email) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications?email=${user.email}`, { method: "DELETE" });
    setNotifications([]);
    setUnread(0);
    setOpen(false);
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
      >
        <Bell size={18} className="text-gray-600" />
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white"
            >
              {unread > 9 ? "9+" : unread}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-indigo-500" />
                <span className="font-black text-gray-800">Notifications</span>
                {unread > 0 && (
                  <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-bold transition">
                    <CheckCheck size={13} /> All read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-bold transition">
                    <Trash2 size={13} /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
              {notifications.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell size={36} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-semibold text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.order_placed;
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={n._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer group ${!n.read ? "bg-indigo-50/40" : ""}`}
                      onClick={() => markRead(n._id)}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-bold leading-snug ${!n.read ? "text-gray-900" : "text-gray-600"}`}>
                            {n.title}
                          </p>
                          {!n.read && <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{timeAgo(n.createdAt)}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
                <Link href="/Dashboard/MyOrders" onClick={() => setOpen(false)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 font-bold flex items-center justify-center gap-1 transition">
                  View all orders →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
