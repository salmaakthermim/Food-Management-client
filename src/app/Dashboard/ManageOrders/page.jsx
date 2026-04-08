"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { ListOrdered, Search, Edit3, CheckCircle, Package, Clock, Bike } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ManageOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [assigningId, setAssigningId] = useState(null);

  const fetchOrders = () => {
    setIsFetching(true);
    fetch("http://localhost:5000/orders/admin/all")
      .then(res => res.json())
      .then(data => { setOrders(data); setIsFetching(false); })
      .catch(() => setIsFetching(false));
  };

  const fetchDeliveryUsers = () => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setDeliveryUsers(data.filter(u => u.role === "delivery" || u.role === "admin")));
  };

  useEffect(() => {
    fetchOrders();
    fetchDeliveryUsers();
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
        fetchOrders();
      }
    } catch { toast.error("Failed to update status"); }
  };

  const handleAssign = async (orderId, deliveryEmail, deliveryName) => {
    setAssigningId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryEmail, deliveryName }),
      });
      if (res.ok) {
        toast.success(`Assigned to ${deliveryName}`);
        fetchOrders();
      }
    } catch { toast.error("Failed to assign"); }
    finally { setAssigningId(null); }
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "badge-warning";
      case "Cooking": return "badge-info";
      case "Out for Delivery": return "badge-primary";
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
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <ListOrdered className="text-indigo-500" /> Manage Orders
          </h1>
          <p className="text-gray-500 mt-2">View, update and assign delivery for all orders.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by ID or Email..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10 bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th>Order ID & Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-8 text-gray-400">No orders found.</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td>
                    <div className="font-mono text-xs text-gray-400">#{order._id.slice(-8)}</div>
                    <div className="text-sm font-medium">{new Date(order.timestamp).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div className="font-bold text-gray-800">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    <div className="text-xs text-gray-400 truncate max-w-[140px]">{order.deliveryAddress}</div>
                  </td>
                  <td>
                    <div className="text-sm">{order.items?.length} items</div>
                    <div className="text-xs text-gray-400 truncate max-w-[120px]">{order.items?.map(i => i.title).join(", ")}</div>
                  </td>
                  <td>
                    <div className="font-black text-indigo-600">${order.grandTotal}</div>
                    <div className="text-xs text-gray-400">{order.paymentMethod}</div>
                  </td>
                  <td>
                    <span className={`badge badge-sm font-bold border-none ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  {/* Delivery Assignment */}
                  <td>
                    {order.deliveryEmail ? (
                      <div>
                        <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                          <Bike size={12} /> {order.deliveryName || order.deliveryEmail}
                        </div>
                        {order.deliveryLocation?.address && (
                          <div className="text-xs text-gray-400 mt-0.5">📍 {order.deliveryLocation.address}</div>
                        )}
                      </div>
                    ) : order.status === "Cooking" ? (
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-xs bg-indigo-50 text-indigo-600 border-none hover:bg-indigo-100 gap-1 font-bold">
                          <Bike size={12} /> Assign
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow-xl bg-white rounded-2xl w-52 border border-gray-100">
                          {deliveryUsers.length === 0 ? (
                            <li><span className="text-xs text-gray-400 p-2">No delivery users found.<br/>Set role to "delivery" in Users page.</span></li>
                          ) : deliveryUsers.map(du => (
                            <li key={du._id}>
                              <button
                                onClick={() => handleAssign(order._id, du.email, du.name)}
                                disabled={assigningId === order._id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <img src={du.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${du.email}`} className="w-6 h-6 rounded-full" />
                                {du.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  {/* Status Update */}
                  <td>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm btn-ghost bg-gray-50 text-indigo-600 hover:bg-indigo-50 font-bold m-1">
                        Update <Edit3 size={14} className="ml-1" />
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-2xl w-44 border border-gray-100">
                        {["Pending", "Cooking", "Out for Delivery", "Delivered"].map(s => (
                          <li key={s}>
                            <button onClick={() => handleStatusUpdate(order._id, s)}
                              className={order.status === s ? "font-bold text-indigo-600 bg-indigo-50" : ""}>
                              {s === "Pending" && <Clock size={13} />}
                              {s === "Cooking" && <Package size={13} />}
                              {s === "Out for Delivery" && <Bike size={13} />}
                              {s === "Delivered" && <CheckCircle size={13} />}
                              {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

