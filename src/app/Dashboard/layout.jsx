"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, LayoutDashboard, PlusCircle, Settings, 
  Menu, X, LogOut, Utensils, ListOrdered, Users, Bike
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";

import useRole from "@/hooks/useRole";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const handleLogout = () => {
    signOut(auth);
  };

  // Define navigations dynamically based on roles
  const adminNavLinks = [
    { name: "Overview", path: "/Dashboard", icon: LayoutDashboard },
    { name: "Manage Foods", path: "/Dashboard/ManageFood", icon: Settings },
    { name: "Add Food", path: "/Dashboard/AddFood", icon: PlusCircle },
    { name: "Manage Orders", path: "/Dashboard/ManageOrders", icon: ListOrdered },
    { name: "Delivery", path: "/Dashboard/Delivery", icon: Bike },
    { name: "Users", path: "/Dashboard/Users", icon: Users },
  ];

  const customerNavLinks = [
    { name: "My Orders", path: "/Dashboard/MyOrders", icon: LayoutDashboard },
    { name: "Wishlist", path: "/Dashboard/Wishlist", icon: PlusCircle },
    { name: "Reviews", path: "/Dashboard/Reviews", icon: Settings },
    { name: "Delivery", path: "/Dashboard/Delivery", icon: Bike },
  ];

  const navItems = role === "admin" ? adminNavLinks : customerNavLinks;

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed lg:relative flex flex-col w-64 h-screen bg-white shadow-2xl z-50 border-r border-gray-100"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Utensils size={24} />
            </div>
            <span className="text-2xl font-black text-gray-800 tracking-tight">Foodie {role === "admin" ? "Admin" : "Panel"}</span>
          </Link>
          <button 
            className="lg:hidden text-gray-500 hover:text-red-500 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 border-b  border-gray-600 flex items-center gap-3">
          <img 
            src={user?.photoURL || "https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?semt=ais_incoming&w=740&q=80"} 
            alt="Profile" 
            className="w-12 h-12 rounded-full border-2 border-indigo-100 p-0.5"
          />
          <div className="overflow-hidden">
            <p className="font-bold text-gray-800 truncate">{user?.displayName || "User"}</p>
            <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wider">
              {isRoleLoading ? "Loading..." : role}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-md"
                  />
                )}
                <Icon size={20} className={isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600 transition"} />
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}

          <div className="mt-8 pt-4 border-t border-gray-100">
            <h4 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">General</h4>
            <Link 
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all font-semibold group"
            >
              <Home size={20} className="text-gray-400 group-hover:text-gray-600 transition" /> Back to Home
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 px-6 lg:px-8">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user?.displayName || "Admin"}!</p>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Decorative generic topbar elements */}
               <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center relative cursor-pointer hover:bg-indigo-100 transition">
                 <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
               </div>
               <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} className="w-9 h-9 rounded-full ring-2 ring-indigo-50 cursor-pointer" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#f8fafc] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-7xl"
          >
            {children}
          </motion.div>
        </div>
      </main>

    </div>
  );
}
