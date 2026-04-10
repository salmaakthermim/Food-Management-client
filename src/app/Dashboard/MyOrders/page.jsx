"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, ChefHat, MapPin, ReceiptText, ArrowRight } from "lucide-react";

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setIsFetching(false);
        });
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "from-amber-400 to-orange-500 text-white shadow-amber-500/30";
      case "Cooking": return "from-indigo-400 to-blue-500 text-white shadow-indigo-500/30";
      case "Delivered": return "from-emerald-400 to-teal-500 text-white shadow-emerald-500/30";
      default: return "from-gray-400 to-slate-500 text-white shadow-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return <Clock size={16} />;
      case "Cooking": return <ChefHat size={16} />;
      case "Delivered": return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading || isFetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        <p className="font-medium text-gray-500 animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto relative relative overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 -z-10"></div>

      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 flex items-center justify-center md:justify-start gap-4 mb-3">
            <Package className="text-indigo-500" size={40} /> Order History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-md">Track the status of your delicious meals and review your past purchases right here.</p>
        </div>
      </div>

      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem] p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white dark:border-gray-800"
          >
            <div className="w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
               <Package size={64} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">No active orders found</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">Looks like you haven't indulged recently. Why not grab something delicious right now?</p>
            <a href="/menu" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
              Explore Our Menu <ArrowRight size={20} />
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {orders.map((order, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={order._id}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white dark:border-gray-800 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50/50 dark:bg-gray-800/30 p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <ReceiptText size={20} className="text-indigo-400" />
                       <span className="text-sm font-black text-indigo-500 tracking-widest uppercase">Order Reference</span>
                    </div>
                    <p className="font-mono font-bold text-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 px-4 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm inline-block">{order._id}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                    <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r shadow-lg ${getStatusColor(order.status || "Pending")}`}>
                      {getStatusIcon(order.status || "Pending")} {order.status || "Pending"}
                    </span>
                    <p className="text-sm text-gray-500 font-medium mt-3 flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <Clock size={14} className="text-gray-400" /> {new Date(order.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Delivery Tracking Steps */}
                <div className="px-6 md:px-8 pt-6 pb-2">
                  <div className="flex items-center gap-0">
                    {[
                      { label: "Order Placed", status: "Pending", icon: ReceiptText },
                      { label: "Cooking", status: "Cooking", icon: ChefHat },
                      { label: "Out for Delivery", status: "Out for Delivery", icon: MapPin },
                      { label: "Delivered", status: "Delivered", icon: CheckCircle },
                    ].map((step, idx, arr) => {
                      const statuses = ["Pending", "Cooking", "Out for Delivery", "Delivered"];
                      const currentIdx = statuses.indexOf(order.status);
                      const stepIdx = statuses.indexOf(step.status);
                      const isDone = stepIdx <= currentIdx;
                      const isActive = stepIdx === currentIdx;
                      const Icon = step.icon;
                      return (
                        <React.Fragment key={step.status}>
                          <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDone ? "bg-indigo-500 shadow-lg shadow-indigo-200" : "bg-gray-100"}`}>
                              <Icon size={16} className={isDone ? "text-white" : "text-gray-400"} />
                            </div>
                            <span className={`text-[10px] font-bold text-center leading-tight ${isActive ? "text-indigo-600" : isDone ? "text-gray-600" : "text-gray-400"}`}>
                              {step.label}
                            </span>
                          </div>
                          {idx < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mb-5 transition-all ${stepIdx < currentIdx ? "bg-indigo-500" : "bg-gray-200"}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Delivery person info */}
                  {order.deliveryEmail && (
                    <div className="mt-4 flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl px-4 py-3 border border-indigo-100 dark:border-indigo-800">
                      <div className="p-2 bg-indigo-500 rounded-xl">
                        <MapPin size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-indigo-600">Delivery Partner: {order.deliveryName || order.deliveryEmail}</p>
                        {order.deliveryLocation?.address && (
                          <p className="text-xs text-gray-500 mt-0.5">📍 Currently at: {order.deliveryLocation.address}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Details Body */}
                <div className="flex flex-col lg:flex-row p-6 md:p-8 gap-8">
                  {/* Items List */}
                  <div className="flex-1">
                    <h3 className="font-black text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2 text-lg">
                      <UtensilsIcon /> Ordered Items
                    </h3>
                    <div className="space-y-4 pr-0 lg:pr-8">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl group hover:bg-white dark:hover:bg-gray-800 transition shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black">
                              {item.quantity}x
                            </div>
                            <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">{item.title}</span>
                          </div>
                          <span className="font-black text-gray-800 dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {order.shippingAddress && (
                       <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                         <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                           <MapPin size={16} className="text-rose-400" /> Delivery To
                         </h3>
                         <p className="font-medium text-gray-700 dark:text-gray-300">{order.shippingAddress}</p>
                       </div>
                    )}
                  </div>

                  {/* Pricing Summary Card */}
                  <div className="w-full lg:w-80 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] p-8 border border-white dark:border-gray-700 shadow-sm flex flex-col justify-center h-fit">
                    <h3 className="font-black text-gray-800 dark:text-gray-200 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Payment Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">${order.subTotal || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                        <span>Tax & Delivery</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">${order.tax ? (parseFloat(order.tax) + 5).toFixed(2) : "5.00"}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="font-black text-gray-800 dark:text-gray-200 text-lg">Total</span>
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">${order.grandTotal || order.price || "0.00"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const UtensilsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);
