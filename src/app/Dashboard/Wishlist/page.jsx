"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setWishlist(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch wishlist", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Removed from wishlist");
        fetchWishlist();
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="loading loading-spinner text-indigo-500"></span></div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Toaster />
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-500" fill="currentColor" size={28} />
        <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Wishlist</h2>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
          <Heart className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Explore our menu and add your favorite items here.</p>
          <Link href="/menu" className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-600 transition">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group relative">
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition shadow-sm"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">{item.title}</h3>
                </div>
                <div className="font-black text-indigo-600 dark:text-indigo-400 mb-4">${item.price}</div>
                <Link 
                  href={`/AllFood/${item.foodId}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  <ShoppingCart size={18} /> View Options
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
