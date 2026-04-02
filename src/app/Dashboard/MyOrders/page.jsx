"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle } from "lucide-react";

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/orders?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setIsFetching(false);
        });
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Cooking": return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "Delivered": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return <Clock size={16} />;
      case "Cooking": return <Package size={16} />;
      case "Delivered": return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading || isFetching) {
    return <div className="p-8 flex items-center justify-center"><span className="loading loading-spinner text-indigo-500"></span></div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white flex items-center gap-3">
          <Package className="text-indigo-500" /> My Orders
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Track and manage your delicious deliveries.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-16 text-center border border-gray-100 dark:border-gray-800">
          <Package size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No orders yet</h2>
          <p className="text-gray-500">You haven't placed any orders. Go to the menu to explore!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={order._id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Order ID</p>
                  <p className="font-mono font-bold text-gray-800 dark:text-gray-200">{order._id}</p>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Items</h3>
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-800 dark:text-gray-200"><span className="font-bold text-indigo-500 mr-2">{item.quantity}x</span> {item.title}</span>
                        <span className="text-gray-500 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-64 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 flex flex-col justify-center">
                  <div className="flex justify-between text-sm mb-1 text-gray-500">
                    <span>Subtotal</span>
                    <span>${order.subTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3 text-gray-500">
                    <span>Tax & Delivery</span>
                    <span>${(parseFloat(order.tax) + 5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="font-bold text-gray-800 dark:text-gray-200">Total</span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">${order.grandTotal}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
