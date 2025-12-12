"use client"; // Client component for Framer Motion
import React from "react";
import { motion } from "framer-motion";

// Variants for staggered animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // delay between cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const StatusPage = () => {
  return (
    <div className="w-full py-16 bg-gray-100">

      {/* Top Title & Description */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <motion.h2
          variants={cardVariants}
          className="text-4xl font-bold text-gray-800"
        >
          Our Product Status
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-gray-600 mt-3 text-lg"
        >
          Explore our fresh and healthy drinks made with natural ingredients.  
          We focus on quality, nutrition, and great taste!
        </motion.p>
      </motion.div>

      {/* Status Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6"
      >
        {/* Card 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
          className="flex items-center rounded-3xl overflow-hidden shadow-lg bg-white transition-shadow"
        >
          <div className="w-full flex items-center justify-center p-6">
            <img 
              src="https://i.ibb.co/WNfZYRxR/featured2-min.jpg" 
              alt="Lychee Yogurt" 
              className="w-full object-cover rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
          className="flex items-center rounded-3xl overflow-hidden shadow-lg bg-white transition-shadow"
        >
          <div className="w-full flex items-center justify-center p-6">
            <img 
              src="https://i.ibb.co/q36kbN1R/featured1-min-1.jpg" 
              alt="Aloe Vera Juice" 
              className="w-full object-cover rounded-3xl"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StatusPage;
