"use client";
import React, { useState, useMemo } from "react";
import FoodCardPage from "../components/FoodCardPage";
import { Search, Filter, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuClient({ initialFoods }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories dynamically from data
  const categories = useMemo(() => {
    const allCategories = initialFoods
      .map(food => food.category)
      .filter(category => category && category.trim() !== "");
    
    // Default categories if data lacks variety initially
    const set = new Set(["All", "Burger", "Pizza", "Drinks", "Dessert", ...allCategories]);
    return Array.from(set);
  }, [initialFoods]);

  // Filter the foods based on Search and Selected Category
  const filteredFoods = useMemo(() => {
    return initialFoods.filter((food) => {
      const matchSearch = food.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === "All" || food.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [initialFoods, searchTerm, activeCategory]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Fresh & Organic</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight drop-shadow-sm"
        >
          Our Exquisite <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Menu</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12"
        >
          Explore our curated selection. Handcrafted with passion, prepared with the freshest ingredients, and designed to delight.
        </motion.p>

        {/* Filters and Search Control Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between mx-auto max-w-5xl"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all shadow-inner"
              placeholder="Search for your favorite dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="w-full md:w-1/2 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar justify-start md:justify-end">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                   activeCategory === cat 
                   ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 -translate-y-1" 
                   : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900"
                 }`}
               >
                 {cat === "All" ? <Filter size={16} /> : <Tag size={16} />}
                 {cat}
               </button>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Grid rendering */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {filteredFoods && filteredFoods.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredFoods.map((food) => (
                <motion.div
                  layout
                  key={food._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <FoodCardPage food={food} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-[3rem] border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={40} />
            </div>
            <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-2 tracking-tight">No foods found</h3>
            <p className="text-gray-500 text-lg">We couldn't find anything matching "{searchTerm}". Try a different search!</p>
            <button 
              onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
              className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-100 font-bold rounded-xl transition"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}
