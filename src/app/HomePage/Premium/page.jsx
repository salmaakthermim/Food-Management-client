"use client"; // Client component for framer-motion
import React from 'react';
import { motion } from 'framer-motion';

// Variants for staggered animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // delay between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const PremiumPage = () => {
  return (
    <div className="w-full py-20">

      {/* Top Title + Description */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-gray-800"
        >
          Premium Juice Collection
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-600 mt-3 text-lg"
        >
          Enjoy our freshly squeezed, 100% organic juice made from the best fruits.
          Perfect for boosting your energy and improving your health.
        </motion.p>
      </motion.div>

      {/* Main Banner Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl  h-[600px] mx-auto bg-gradient-to-b from-green-50 to-green-100  grid md:grid-cols-2 gap-10 items-center px-8"
      >
        {/* Left Side Image */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center relative"
        >
          <img 
            src="https://i.ibb.co/zHDyR0Qx/deal-of-the-day-juice1.png" 
            alt="Orange Juice" 
            className="w-[400px] drop-shadow-xl"
          />
        </motion.div>

        {/* Right Side Text */}
        <motion.div variants={itemVariants}>
          <span className="text-2xl text-green-600 font-semibold">
            Orange Juice
          </span>

          <h3 className="text-5xl font-extrabold mt-2 text-gray-800 leading-tight">
            For Human Health
          </h3>

          <p className="mt-6 text-gray-600 text-lg">
            Organic food is produced by methods that comply with the standards 
            of organic farming. Our juices are pure, natural, and filled with 
            nutrients to keep you healthy every day.
          </p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 mt-8">
            <button className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition">
              Learn more
            </button>
            <button className="px-8 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">
              Go Shop
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumPage;
