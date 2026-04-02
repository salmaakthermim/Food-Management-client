"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { ListOrdered, Search, Edit3, Trash2, CheckCircle, Package, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ManageOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = () => {
    setIsFetching(true);
    fetch("http://localhost:5000/orders/admin/all")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setIsFetching(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrders(); // refresh data
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "badge-warning";
      case "Cooking": return "badge-info";
      case "Delivered": return "badge-success";
      default: return "badge-ghost";
    }
  };

  if (isFetching && orders.length === 0) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><span className="loading loading-spinner text-indigo-500 loading-lg"></span></div>;
  }

  return (
    <div className="p-4 md:p-8 relative">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white flex items-center gap-3">
            <ListOrdered className="text-indigo-500" /> Manage Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View and update customer food orders across the platform.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID or Email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10 bg-white dark:bg-gray-900 border-none shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-sm">
              <tr>
                <th>Order ID & Date</th>
                <th>Customer Info</th>
                <th>Order Summary</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">No orders found matching your search.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors border-b border-gray-100 dark:border-gray-800">
                    <td>
                      <div className="font-mono text-xs text-gray-400 mb-1">#{order._id.substring(order._id.length - 8)}</div>
                      <div className="text-sm font-medium dark:text-gray-300">
                        {new Date(order.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-gray-800 dark:text-gray-200">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="font-medium text-indigo-400">Add:</span> <span className="truncate w-32 inline-block">{order.deliveryAddress}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm dark:text-gray-300">
                        {order.items.length} items
                        <span className="text-xs text-gray-400 block mt-0.5 truncate w-40" title={order.items.map(i=>i.title).join(", ")}>
                          {order.items.map(i => i.title).join(", ")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="font-black text-indigo-600 dark:text-indigo-400">${order.grandTotal}</div>
                      <div className="text-xs text-gray-400">Cod</div>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-bold border-none ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-ghost bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-bold m-1">
                          Update <Edit3 size={14} className="ml-1"/>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white dark:bg-gray-900 rounded-2xl w-40 border border-gray-100 dark:border-gray-800">
                          <li>
                            <button onClick={() => handleStatusUpdate(order._id, "Pending")} className={`${order.status === "Pending" ? "bg-amber-50 text-amber-600 font-bold" : ""}`}>
                              <Clock size={14} /> Pending
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleStatusUpdate(order._id, "Cooking")} className={`${order.status === "Cooking" ? "bg-indigo-50 text-indigo-600 font-bold" : ""}`}>
                              <Package size={14} /> Cooking
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleStatusUpdate(order._id, "Delivered")} className={`${order.status === "Delivered" ? "bg-green-50 text-green-600 font-bold" : ""}`}>
                              <CheckCircle size={14} /> Delivered
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
