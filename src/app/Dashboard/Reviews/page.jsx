"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function MyReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-reviews?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch reviews", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="loading loading-spinner text-indigo-500"></span></div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Toaster />
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-indigo-500" size={28} />
        <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Reviews</h2>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
          <MessageSquare className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">You haven't left any reviews yet</h3>
          <p className="text-gray-500 mb-6">Enjoy some food items and share your thoughts to help others!</p>
          <Link href="/menu" className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-600 transition">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="mb-2 md:mb-0">
                  <div className="flex text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-500" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Reviewed on {new Date(review.timestamp).toLocaleDateString()}</p>
                </div>
                <Link 
                  href={`/AllFood/${review.foodId}`}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider rounded-lg border border-indigo-100/50 dark:border-indigo-800/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition self-start"
                >
                  View Food Item
                </Link>
              </div>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl italic">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
