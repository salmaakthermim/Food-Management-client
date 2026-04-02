"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Plus, Minus, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import FoodReviews from "./FoodReviews";

export default function FoodDetailsClient({ food }) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login?redirect=/AllFood/" + food._id);
      return;
    }
    
    setAddingToCart(true);
    
    try {
      const cartItem = {
        foodId: food._id,
        title: food.title,
        price: food.price,
        image: food.image,
        quantity: quantity,
        email: user.email,
        timestamp: new Date()
      };

      const res = await fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem)
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <Link href="/menu" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium mb-8 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={18} /> Back to Menu
        </Link>
        
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 lg:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-inner group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={food?.image || "https://placehold.co/600x600?text=No+Image"} 
                alt={food?.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-indigo-600 font-black text-xl shadow-lg">
                ${food?.price}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
               <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider rounded-lg">
                 {food?.category || "Special"}
               </span>
               <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg text-sm">
                 <Star size={16} fill="currentColor" /> 4.9 <span className="text-gray-400 font-medium ml-1">(128 Reviews)</span>
               </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {food?.title}
            </h1>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              {food?.description}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-700 dark:text-gray-300">Quantity</span>
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-full p-1.5 border border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 shadow hover:text-indigo-600 transition"
                >
                  <Minus size={18} />
                </button>
                <span className="w-6 text-center font-bold text-lg dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 shadow hover:text-indigo-600 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Total and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-medium mb-1">Total Price</span>
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  ${(parseFloat(food?.price || 0) * quantity).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart || added}
                className="flex-1 w-full flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : added ? (
                  <>
                    <CheckCircle size={22} className="animate-bounce" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={22} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* REVIEWS SECTION */}
        <FoodReviews foodId={food?._id} />
      </div>
    </div>
  );
}
