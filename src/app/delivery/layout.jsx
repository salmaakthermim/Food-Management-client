"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike, Home, Package, CheckCircle, MapPin,
  Menu, X, LogOut, Navigation
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

export default function DeliveryLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const navLinks = [
    { name: "Overview",        path: "/delivery",                 icon: Bike },
    { name: "Assigned Orders", path: "/delivery/assigned",        icon: Package },
    { name: "Delivered",       path: "/delivery/delivered",       icon: CheckCircle },
    { name: "Track Location",  path: "/delivery/track",           icon: Navigation },
  ];

  return (
    <div className="min-h-screen flex bg-[#f0f4ff] overflow-hidden">

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed lg:relative w-72 h-screen z-50 flex flex-col bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
              <Bike size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none">Delivery</p>
              <p className="text-indigo-300 text-xs font-medium">Rider Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Rider Card */}
        <div className="mx-4 mt-5 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              className="w-12 h-12 rounded-full border-2 border-white/30"
              alt="rider"
            />
            <div className="overflow-hidden">
              <p className="text-white font-bold truncate">{user?.displayName || "Rider"}</p>
              <p className="text-indigo-300 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-300 text-xs font-semibold">Active & Online</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 mb-3">Navigation</p>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all relative group ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-indigo-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="delivery-active"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                  />
                )}
                <Icon size={18} className={isActive ? "text-white" : "text-indigo-300 group-hover:text-white"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-6 space-y-2 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white/10 hover:text-white rounded-xl font-semibold transition"
          >
            <Home size={18} /> Back to Home
          </Link>
          <button
            onClick={() => signOut(auth).then(() => router.push("/login"))}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-xl font-semibold transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">{user?.displayName || "Rider"}</p>
              <p className="text-xs text-gray-400">Delivery Partner</p>
            </div>
            <img
              src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              className="w-9 h-9 rounded-full ring-2 ring-indigo-100"
              alt="avatar"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
