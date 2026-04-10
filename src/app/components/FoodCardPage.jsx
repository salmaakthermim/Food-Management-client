"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FoodCardPage = ({ food }) => {
  const { title, description, price, category, location, priority, image, _id } = food || {};
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart!");
      router.push("/login?redirect=/menu");
      return;
    }

    setIsAdding(true);
    const cartItem = {
      foodId: _id,
      title: title,
      price: price,
      image: image,
      quantity: 1,
      email: user.email,
      timestamp: new Date()
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem)
      });
      if (res.ok) {
        toast.success(`${title} added to cart!`);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
      router.push("/carts");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="glassCard overflow-hidden group flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative w-full h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-indigo-600 font-bold shadow-lg">
          ${price}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h2 className="absolute bottom-4 left-4 text-xl font-black text-white drop-shadow-md pr-4 line-clamp-1">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 transform -translate-y-10">
          <span className="px-3 py-1 bg-white/90 text-indigo-600 shadow-md backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-md border border-white/20">
            {category || "Special"}
          </span>
          <span className="px-3 py-1 bg-white/90 text-rose-600 shadow-md backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-md border border-white/20">
            {priority || "High"}
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1 -mt-4">
          {description}
        </p>

        <div className="w-full h-px bg-gray-100 dark:bg-gray-800 my-4"></div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <div className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-indigo-400" />
            <span className="truncate max-w-[120px]">{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <FaStar />
            <span>4.9 (120)</span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <Link
            href={`/AllFood/${_id}`}
            className="flex-1 flex items-center justify-center py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCardPage;
