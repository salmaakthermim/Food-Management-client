"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Star, MessageSquare, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function FoodReviews({ foodId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = () => {
    setLoading(true);
    fetch(`http://localhost:5000/reviews/${foodId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch reviews", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (foodId) fetchReviews();
  }, [foodId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }

    setIsSubmitting(true);
    const reviewData = {
      foodId,
      email: user.email,
      customerName: user.displayName || "Anonymous",
      customerPhoto: user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer",
      rating,
      comment
    };

    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) {
        toast.success("Review submitted!");
        setComment("");
        setRating(5);
        fetchReviews();
      }
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
      <Toaster position="bottom-right" />
      <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3">
        <MessageSquare className="text-indigo-500" /> Customer Reviews
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Reviews List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center py-8"><span className="loading loading-spinner text-indigo-500"></span></div>
          ) : reviews.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-8 text-center border border-dashed border-gray-200 dark:border-gray-700">
              <Star size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 font-medium">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={review.customerPhoto} alt={review.customerName} className="w-10 h-10 rounded-full bg-gray-100" />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">{review.customerName}</h4>
                      <p className="text-xs text-gray-400">{new Date(review.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-500" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Review Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 sticky top-24">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Leave a Review</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Rating</label>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input 
                      key={num}
                      type="radio" 
                      name="rating" 
                      className="mask mask-star-2 bg-amber-500" 
                      checked={rating === num}
                      onChange={() => setRating(num)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Your Comment</label>
                <textarea 
                  className="textarea w-full bg-white dark:bg-gray-900 border-none focus:ring-2 focus:ring-indigo-500 h-24 shadow-inner" 
                  placeholder="What did you think about this food?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !user}
                className="w-full mt-2 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <><Send size={16}/> Submit Review</>}
              </button>
              
              {!user && <p className="text-xs text-red-400 text-center mt-2">You must be logged in to review.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
