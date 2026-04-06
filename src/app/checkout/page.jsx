"use client";
import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, CreditCard, Box, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (user?.email) {
      fetch(`http://localhost:5000/carts?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setCartItems(data);
          const total = data.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
          setSubTotal(total);
          
          if (data.length === 0) {
            router.push("/carts"); // Can't checkout empty cart
          }
        });
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const orderData = {
      customerEmail: user.email,
      customerName: formData.name,
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map(item => ({ foodId: item.foodId, title: item.title, quantity: item.quantity, price: item.price })),
      subTotal: subTotal.toFixed(2),
      tax: (subTotal * 0.05).toFixed(2),
      grandTotal: (subTotal + (subTotal * 0.05) + 5).toFixed(2),
      status: "Pending", // Pending -> Cooking -> Delivered
      timestamp: new Date()
    };

    try {
      // Create the order
      const res = await fetch("http://localhost:5000/orders", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(orderData)
      });

      if (res.ok) {
        // Clear all cart items for this user
        await Promise.all(cartItems.map(item => fetch(`http://localhost:5000/carts/${item._id}`, { method: "DELETE" })));
        setOrderSuccess(true);
        setTimeout(() => router.push("/Dashboard/MyOrders"), 3000);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#020617] px-4">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center shadow-2xl border border-green-100 dark:border-green-900/50 max-w-md w-full"
        >
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-4">Order Placed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your delicious food is being prepared. We are redirecting you to track your order.
          </p>
          <div className="loading loading-dots loading-lg text-indigo-500"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] py-12 px-4 relative">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
         
         {/* Checkout Form */}
         <div className="w-full lg:w-2/3">
           <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
             <Box className="text-indigo-500" /> Checkout Details
           </h1>
           
           <form onSubmit={handlePlaceOrder} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col gap-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="form-control">
                 <label className="label font-bold text-gray-600 dark:text-gray-300">Full Name</label>
                 <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 shadow-inner w-full" required />
               </div>
               <div className="form-control">
                 <label className="label font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2"><Phone size={16}/> Phone Number</label>
                 <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 890" className="input bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 shadow-inner w-full" required />
               </div>
             </div>
             
             <div className="form-control">
               <label className="label font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2"><MapPin size={16}/> Delivery Address</label>
               <textarea name="address" value={formData.address} onChange={handleInputChange} className="textarea bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 shadow-inner w-full h-24" placeholder="Street, Apt, City, Zip" required></textarea>
             </div>

             <div className="divider my-2"></div>

             <div className="form-control">
               <label className="label font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2"><CreditCard size={16}/> Payment Method</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                 <label className="flex items-center gap-3 p-4 border border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-2xl cursor-pointer font-bold transition">
                   <input type="radio" value="Cash on Delivery" checked={true} readOnly className="radio radio-primary" />
                   Cash on Delivery
                 </label>
                 <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl cursor-not-allowed opacity-50 grayscale">
                   <input type="radio" disabled className="radio" />
                   <span className="font-semibold text-gray-500">Online Payment (Coming Soon)</span>
                 </label>
               </div>
             </div>

             <button type="submit" disabled={isPlacingOrder} className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:shadow-lg transition-all">
                {isPlacingOrder ? <span className="loading loading-spinner"></span> : "Confirm & Place Order"}
             </button>
           </form>
         </div>

         {/* Order Summary Strip */}
         <div className="w-full lg:w-1/3">
           <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
             <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Summary</h2>
             
             <div className="flex flex-col gap-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
               {cartItems.map(item => (
                 <div key={item._id} className="flex justify-between text-sm">
                   <span className="text-gray-600 dark:text-gray-400 font-medium truncate pr-4">{item.quantity}x {item.title}</span>
                   <span className="text-gray-800 dark:text-gray-200 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                 </div>
               ))}
             </div>

             <div className="divider my-0"></div>

             <div className="flex flex-col gap-3 text-sm text-gray-500 font-medium py-6">
               <div className="flex justify-between">
                 <span>Subtotal</span>
                 <span className="font-bold text-gray-800 dark:text-gray-200">${subTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span>Tax</span>
                 <span className="font-bold text-gray-800 dark:text-gray-200">${(subTotal * 0.05).toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span>Delivery</span>
                 <span className="font-bold text-gray-800 dark:text-gray-200">$5.00</span>
               </div>
             </div>

             <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
               <div className="flex justify-between items-center">
                 <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
                 <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${(subTotal + (subTotal * 0.05) + 5).toFixed(2)}</span>
               </div>
             </div>
           </div>
         </div>

       </div>
    </div>
  );
}
