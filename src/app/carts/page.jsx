"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CartPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login?redirect=/carts");
      return;
    }
    fetchCart();
  }, [user, loading]);

  const fetchCart = () => {
    setIsFetching(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching cart", err);
        setIsFetching(false);
      });
  };

  const handleUpdateQuantity = async (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return;

    // Optimistic UI update
    setCartItems(prev => prev.map(item => item._id === id ? {...item, quantity: newQty} : item));

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty })
      });
    } catch (error) {
      console.error("Failed to update quantity", error);
      fetchCart(); // Revert on failure
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this item?")) return;
    
    setCartItems(prev => prev.filter(item => item._id !== id));
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete", error);
      fetchCart();
    }
  };

  // Calculations
  const subTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  const tax = subTotal * 0.05; // 5% tax
  const delivery = subTotal > 0 ? 5.00 : 0;
  const grandTotal = subTotal + tax + delivery;

  if (loading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#020617]">
        <span className="loading loading-ring loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] py-12 px-4 relative">
       {/* Decorative */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

       <div className="max-w-6xl mx-auto">
         <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 tracking-tight flex items-center gap-4">
           <ShoppingBag className="text-indigo-500" size={40} /> Your Cart
         </h1>

         {cartItems.length === 0 ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
             className="bg-white dark:bg-gray-900 rounded-[2rem] p-16 text-center shadow-xl border border-gray-100 dark:border-gray-800"
           >
             <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-full flex mx-auto items-center justify-center mb-6">
               <ShoppingBag size={48} />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Cart is empty</h2>
             <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
             <Link href="/menu" className="inline-block px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition">
               Browse Menu
             </Link>
           </motion.div>
         ) : (
           <div className="flex flex-col lg:flex-row gap-8">
             {/* Cart Items List */}
             <div className="flex-1 flex flex-col gap-4">
               <AnimatePresence>
                 {cartItems.map((item) => (
                   <motion.div 
                     layout
                     key={item._id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95, height: 0 }}
                     className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 group"
                   >
                     <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover bg-gray-100" />
                     <div className="flex-1">
                       <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{item.title}</h3>
                       <p className="font-black text-indigo-500">${item.price}</p>
                     </div>

                     {/* Quantity Controls */}
                     <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                       <button onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-gray-600 shadow-sm text-gray-600 dark:text-gray-200 transition">
                         <Minus size={14} />
                       </button>
                       <span className="w-4 text-center font-bold text-sm dark:text-white">{item.quantity}</span>
                       <button onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-gray-600 shadow-sm text-gray-600 dark:text-gray-200 transition">
                         <Plus size={14} />
                       </button>
                     </div>

                     <button onClick={() => handleDelete(item._id)} className="ml-2 w-10 h-10 flex items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition">
                       <Trash2 size={18} />
                     </button>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>

             {/* Order Summary */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
               className="w-full lg:w-[400px]"
             >
               <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>
                 
                 <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 mb-6 font-medium">
                   <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span className="font-bold text-gray-800 dark:text-gray-200">${subTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Tax (5%)</span>
                     <span className="font-bold text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Delivery Fee</span>
                     <span className="font-bold text-gray-800 dark:text-gray-200">${delivery.toFixed(2)}</span>
                   </div>
                 </div>

                 <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mb-8">
                   <div className="flex justify-between items-center">
                     <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
                     <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${grandTotal.toFixed(2)}</span>
                   </div>
                 </div>

                 <Link href="/checkout" className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                   Proceed to Checkout <ArrowRight size={20} />
                 </Link>
               </div>
             </motion.div>
           </div>
         )}
       </div>
    </div>
  );
};

export default CartPage;
