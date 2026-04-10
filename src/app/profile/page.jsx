"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import {
  User, Mail, ShieldCheck, MapPin, Calendar,
  Edit3, Check, X, Package, Star, Heart, Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase.config";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const { user, dbUser, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    setName(user.displayName || "");
    setPhoto(dbUser?.photo || user.photoURL || "");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?email=${user.email}`)
      .then(r => r.json()).then(setOrders).catch(() => {});
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-reviews?email=${user.email}`)
      .then(r => r.json()).then(setReviews).catch(() => {});
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists?email=${user.email}`)
      .then(r => r.json()).then(setWishlist).catch(() => {});
  }, [user, dbUser]);

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, photo }),
      });
      toast.success("Profile updated!");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const roleConfig = {
    admin:    { label: "Admin",    color: "bg-purple-100 text-purple-700 border-purple-200" },
    delivery: { label: "Delivery", color: "bg-blue-100 text-blue-700 border-blue-200" },
    customer: { label: "Customer", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  };
  const rc = roleConfig[role] || roleConfig.customer;

  const delivered = orders.filter(o => o.status === "Delivered").length;
  const pending   = orders.filter(o => o.status !== "Delivered").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-bars loading-lg text-indigo-500"></span>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <p className="text-2xl font-bold text-gray-700">You are not logged in.</p>
    </div>
  );

  const avatar = dbUser?.photo || user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;

  return (
    <div className="min-h-screen bg-[#f0f4ff] relative py-12 px-4">
      <Toaster position="top-right" />

      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Cover */}
          <div className="h-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
            />
          </div>

          <div className="px-6 md:px-10 pb-8 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14 md:-mt-16">
              <div className="relative w-fit mx-auto md:mx-0">
                <img
                  src={editing ? (photo || avatar) : avatar}
                  alt="avatar"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-xl object-cover bg-white"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>

              <div className="flex-1 text-center md:text-left pt-2">
                {editing ? (
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="text-2xl font-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full max-w-xs"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    {user?.displayName || "Anonymous"}
                  </h1>
                )}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Mail size={14} /> {user?.email}
                  </span>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${rc.color}`}>
                    <ShieldCheck size={12} /> {isRoleLoading ? "..." : rc.label}
                  </span>
                </div>
              </div>

              {/* Edit / Save buttons */}
              <div className="flex gap-2 mx-auto md:mx-0">
                {editing ? (
                  <>
                    <button onClick={handleSave} disabled={saving}
                      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition disabled:opacity-60">
                      {saving ? <span className="loading loading-spinner loading-xs" /> : <Check size={15} />} Save
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition">
                      <X size={15} /> Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-bold text-sm border border-indigo-100 transition">
                    <Edit3 size={15} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Photo URL input when editing */}
            {editing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="mt-5 flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <Camera size={18} className="text-gray-400 shrink-0" />
                <input
                  value={photo}
                  onChange={e => setPhoto(e.target.value)}
                  placeholder="Paste new photo URL..."
                  className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700"
                />
                {photo && <img src={photo} className="w-10 h-10 rounded-xl object-cover border border-gray-200" />}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Orders",   value: orders.length,   icon: Package, color: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-200" },
            { label: "Delivered",      value: delivered,       icon: Check,   color: "from-green-500 to-emerald-500", shadow: "shadow-green-200" },
            { label: "Active Orders",  value: pending,         icon: Calendar,color: "from-amber-500 to-orange-500",  shadow: "shadow-amber-200" },
            { label: "Wishlist",       value: wishlist.length, icon: Heart,   color: "from-rose-500 to-pink-500",     shadow: "shadow-rose-200" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg ${s.shadow}`}>
                <s.icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info + Recent Orders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="font-black text-gray-800 text-lg mb-5 flex items-center gap-2">
              <User size={18} className="text-indigo-500" /> Account Info
            </h3>
            <div className="space-y-4">
              {[
                { label: "Full Name",  value: user?.displayName || "—" },
                { label: "Email",      value: user?.email },
                { label: "Role",       value: rc.label },
                { label: "Provider",   value: dbUser?.provider || "email" },
                { label: "Member Since", value: user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                    : "—" },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-800 truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="font-black text-gray-800 text-lg mb-5 flex items-center gap-2">
              <Package size={18} className="text-indigo-500" /> Recent Orders
            </h3>
            {orders.length === 0 ? (
              <div className="py-10 text-center">
                <Package size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-semibold">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => {
                  const statusColor = {
                    "Pending":          "bg-amber-100 text-amber-700",
                    "Cooking":          "bg-blue-100 text-blue-700",
                    "Out for Delivery": "bg-indigo-100 text-indigo-700",
                    "Delivered":        "bg-green-100 text-green-700",
                  }[order.status] || "bg-gray-100 text-gray-600";
                  return (
                    <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.items?.length} items · {new Date(order.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}>{order.status}</span>
                        <span className="font-black text-indigo-600">${order.grandTotal}</span>
                      </div>
                    </div>
                  );
                })}
                {orders.length > 5 && (
                  <a href="/Dashboard/MyOrders" className="block text-center text-sm text-indigo-500 hover:text-indigo-700 font-bold pt-2 transition">
                    View all {orders.length} orders →
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Reviews */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="font-black text-gray-800 text-lg mb-5 flex items-center gap-2">
              <Star size={18} className="text-amber-500" /> My Reviews
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.slice(0, 3).map(r => (
                <div key={r._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill={i < r.rating ? "#f59e0b" : "none"} className={i < r.rating ? "text-amber-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 font-medium line-clamp-2">{r.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(r.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
