"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, MapPin, Star, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const priorityColor = {
  High:   "bg-rose-100 text-rose-600",
  Medium: "bg-amber-100 text-amber-600",
  Normal: "bg-green-100 text-green-600",
};

const FoodCardPage = ({ food }) => {
  const { title, description, price, category, location: foodLocation, priority, image, _id } = food || {};
  const [isAdding, setIsAdding] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart!");
      router.push("/login?redirect=/menu");
      return;
    }
    setIsAdding(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodId: _id, title, price, image,
          quantity: 1, email: user.email, timestamp: new Date()
        }),
      });
      if (res.ok) {
        toast.success(`${title} added to cart!`);
        router.push("/carts");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-[1.75rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 border border-gray-100 flex flex-col h-full transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-indigo-600 text-xs font-black rounded-lg shadow">
            {category || "Special"}
          </span>
          <span className={`px-2.5 py-1 text-xs font-black rounded-lg shadow ${priorityColor[priority] || priorityColor.Normal}`}>
            {priority || "Normal"}
          </span>
        </div>

        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-xl font-black text-sm shadow-lg">
          ${price}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart size={16} className={liked ? "fill-rose-500 text-rose-500" : "text-gray-400"} />
        </button>

        {/* Title on image */}
        <h2 className="absolute bottom-3 left-3 text-white font-black text-lg leading-tight pr-12 line-clamp-1 drop-shadow-md">
          {title}
        </h2>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-indigo-400" />
            <span className="truncate max-w-[110px]">{foodLocation || "Local"}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={13} className="fill-amber-400" />
            <span className="font-bold text-gray-700">4.9</span>
            <span className="text-gray-400">(120)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Actions */}
        <div className="flex gap-2.5">
          <Link href={`/AllFood/${_id}`}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-sm transition-all border border-gray-100 hover:border-gray-200"
          >
            <Eye size={15} /> Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAdding
              ? <span className="loading loading-spinner loading-xs" />
              : <><ShoppingCart size={15} /> Add to Cart</>
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCardPage;
