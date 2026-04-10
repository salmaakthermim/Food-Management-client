"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Plus, Minus, CheckCircle, ArrowLeft, Heart, Share2, Flame } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import FoodReviews from "./FoodReviews";

export default function FoodDetailsClient({ food }) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem)
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => router.push("/carts"), 1000);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/login?redirect=/AllFood/" + food._id);
      return;
    }
    
    setIsFavorite(true);
    const wishlistItem = {
      foodId: food._id,
      title: food.title,
      price: food.price,
      image: food.image,
      email: user.email,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishlistItem)
      });
      const data = await res.json();
      if (data.insertedId || data.message === "Item already in wishlist") {
        toast.success(data.message === "Item already in wishlist" ? "Already in Wishlist!" : "Added to Wishlist! ❤️");
      }
    } catch (e) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] py-12 px-4 relative overflow-hidden">
      
      {/* Decorative blurred background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob transition-opacity duration-1000"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-96 h-96 bg-indigo-200 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 transition-opacity duration-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/menu" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold mb-8 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-x-1 transition-all duration-300">
          <ArrowLeft size={18} /> BACK TO MENU
        </Link>
        
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem] p-6 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white dark:border-gray-800 flex flex-col lg:flex-row gap-12 lg:gap-24 relative overflow-hidden">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex items-center justify-center relative"
          >
            {/* Glowing background behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
            
            <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={food?.image || "https://placehold.co/600x600?text=No+Image"} 
                alt={food?.title} 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
              {/* Floating Price Tag */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-8 right-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full text-indigo-600 dark:text-indigo-400 font-black text-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-white/50 dark:border-gray-700"
              >
                ${food?.price}
              </motion.div>
            </div>
            
            {/* Action Buttons floating top left */}
            <Toaster position="top-right" />
            <div className="absolute top-8 left-8 flex flex-col gap-4">
               <button 
                onClick={handleAddWishlist}
                className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 transition-all text-gray-500"
               >
                 <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} size={22} />
               </button>
               <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 transition-all text-indigo-500">
                 <Share2 size={22} />
               </button>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center py-6"
          >
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
               <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-sm border border-orange-200/50 dark:border-orange-800/30">
                 <Flame size={14} /> Popular Choice
               </span>
               <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full shadow-sm border border-indigo-100/50 dark:border-indigo-800/30">
                 {food?.category || "Special"}
               </span>
               <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/30 px-3 py-2 rounded-full text-sm shadow-sm border border-amber-100/50 dark:border-amber-800/30">
                 <Star size={16} fill="currentColor" /> <span>4.9</span> <span className="text-gray-400 font-medium ml-1 text-xs hidden sm:inline">(128 Reviews)</span>
               </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              {food?.title}
            </h1>
            
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8"></div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-medium">
              {food?.description}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mb-10 pb-10 border-b border-gray-200 dark:border-gray-800">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Select Quantity</span>
              <div className="flex items-center gap-5 bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm border border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-white dark:hover:bg-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all active:scale-95"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>
                <span className="w-8 text-center font-black text-2xl text-gray-800 dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-white dark:hover:bg-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all active:scale-95"
                >
                  <Plus size={20} strokeWidth={2.5} />
               </button>
              </div>
            </div>

            {/* Total Menu & Add to Cart Action */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col items-center sm:items-start min-w-[120px]">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Total Due</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  ${(parseFloat(food?.price || 0) * quantity).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart || added}
                className="flex-1 w-full flex items-center justify-center gap-3 py-5 px-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-black text-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
              >
                {addingToCart ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-gray-900/30 dark:border-t-gray-900 rounded-full animate-spin"></span> Processing...
                  </span>
                ) : added ? (
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-3 text-green-400 dark:text-green-600"
                  >
                    <CheckCircle size={24} strokeWidth={2.5} /> Added to Cart!
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-3 group">
                    <ShoppingCart size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> Add to Cart
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Spacer before reviews */}
        <div className="h-16"></div>

        {/* REVIEWS SECTION */}
        <div className="mt-8">
           <FoodReviews foodId={food?._id} />
        </div>
      </div>
    </div>
  );
}
