"use client";

import { useEffect, useState } from "react";
import FoodCardPage from "../components/FoodCardPage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Fetch foods from backend with optional sort
async function fetchFoods(sort = "asc") {
  const res = await fetch(`https://users-management-food-server.vercel.app/foods?sort=${sort}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch foods");
  return res.json();
}

const AllFoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("asc");

  // Fetch foods whenever sort changes
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const data = await fetchFoods(sort);
        setFoods(data);
        setFilteredFoods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadFoods();
  }, [sort]);

  // Search filter
  useEffect(() => {
    if (!search) {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((food) =>
        food.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [search, foods]);

  return (
    <div className="max-w-6xl mx-auto px-5 mt-10">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-6 text-green-800 text-center"
      >
        All Foods
      </motion.h2>

      {/* Search + Sort Box */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search food by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* DaisyUI Sort Dropdown */}
        <select
          className="select select-bordered w-full sm:w-1/3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnimatePresence>
          {filteredFoods.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFoods.map((food, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <FoodCardPage food={food} />
                  </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No foods found.</p>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AllFoodPage;
