"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { User, Mail, ShieldCheck, MapPin, Calendar, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-bars loading-lg text-indigo-500"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] relative py-20 px-4">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-full md:w-[600px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-bl-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Cover Photo Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 text-sm font-semibold rounded-lg flex items-center gap-2 transition">
              <Edit3 size={16}/> Edit Cover
            </button>
          </div>

          <div className="px-6 pb-8 md:px-12 md:pb-12 relative flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-20">
            {/* Avatar */}
            <div className="relative inline-block mx-auto md:mx-0">
              <img 
                src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Profile"} 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 shadow-xl bg-white"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 border-2 border-white rounded-full" title="Online"></div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left pt-2 md:pt-0">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                {user?.displayName || "Anonymous User"}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
                <p className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Mail size={16} /> {user?.email}
                </p>
                <p className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
                  <ShieldCheck size={14} /> {isRoleLoading ? "..." : role || "Customer"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mx-auto md:mx-0">
               <button className="px-6 py-2.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-100 font-bold rounded-xl transition flex items-center gap-2">
                 <Edit3 size={16}/> Edit Profile
               </button>
            </div>
          </div>
        </motion.div>

        {/* Detailed Info Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {/* Personal Info Card */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
              <User className="text-indigo-500" /> Personal Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Full Name</p>
                <p className="text-gray-800 dark:text-gray-300 font-semibold">{user?.displayName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Email Address</p>
                <p className="text-gray-800 dark:text-gray-300 font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Phone Number</p>
                <p className="text-gray-800 dark:text-gray-300 font-semibold">Not provided</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Delivery Address</p>
                <p className="text-gray-800 dark:text-gray-300 font-semibold flex items-center gap-1.5">
                  <MapPin size={16} className="text-gray-400"/> Not set
                </p>
              </div>
            </div>
          </div>

          {/* Activity / Stats Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
             <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
              <Calendar className="text-indigo-500" /> Account Activity
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-4">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Total Orders</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">0</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Reviews Left</span>
              <span className="text-xl font-black text-purple-600 dark:text-purple-400">0</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;
