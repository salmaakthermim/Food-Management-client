"use client";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const FoodCardPage = ({ food }) => {
  const { title, description, price, category, location, priority, image, _id } = food || {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="glassCard overflow-hidden group flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
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
        <h2 className="absolute bottom-4 left-4 text-2xl font-black text-white drop-shadow-md">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-md">
            {category || "Special"}
          </span>
          <span className="px-3 py-1 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 text-xs font-bold uppercase tracking-wider rounded-md">
            {priority || "High"}
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
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

        <Link
          href={`/AllFood/${_id}`}
          className="btn border-none w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all font-bold text-md"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default FoodCardPage;
