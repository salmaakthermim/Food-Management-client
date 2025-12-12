"use client";
import React from "react";
import { motion } from "framer-motion";

const FeeChartPage = () => {
  return (
    <div className="w-full">

      {/* Top Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}  // increased duration
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center py-10 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Our Special Fee Chart
        </h2>
        <p className="text-lg text-gray-600 mt-6">
          Explore our fee structure designed with transparency and simplicity.  
          No hidden charges — just clear and honest pricing that everyone can trust.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl bg-gradient-to-b from-green-100 to-green-100 mx-auto grid md:grid-cols-2 gap-20 items-center px-6">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }} // increased duration
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-gray-800 leading-snug">
            Affordable Pricing  
            <span className="text-green-600 block">For Everyone</span>
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Our fee chart ensures that every user receives the best value.  
            Whether you are registering, upgrading, or unlocking premium features —  
            our pricing is designed to be simple and completely transparent.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}  // slightly bigger hover
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            View Fee Chart
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}  // increased duration
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co/YBYFJyk5/organic-feature-product1.png"
            alt="Fee Chart"
            className="w-[400px] md:w-[500px] drop-shadow-2xl"
          />
        </motion.div>

      </div>

    </div>
  );
};

export default FeeChartPage;
