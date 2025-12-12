"use client";

import React from "react";
import { FaLeaf, FaAppleAlt, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturesPage = () => {
  const features = [
    {
      image: "https://i.ibb.co.com/7J0mg3mL/food1.jpg",
      icon: <FaLeaf size={28} className="text-green-600" />,
      title: "Fresh Ingredients",
      desc: "We deliver the freshest ingredients to your home. Quality is our top priority.",
    },
    {
      image: "https://i.ibb.co.com/qLFVj22q/food2.jpg",
      icon: <FaAppleAlt size={28} className="text-red-500" />,
      title: "Healthy Choices",
      desc: "Our meals are carefully crafted to provide nutritious and delicious options.",
    },
    {
      image: "https://i.ibb.co.com/5XkXH27D/food3.jpg",
      icon: <FaTruck size={28} className="text-blue-500" />,
      title: "Fast Delivery",
      desc: "Get your food delivered quickly and safely, right to your doorstep.",
    },
  ];

  return (
    <div className="bg-green-50 py-20">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-green-800 mb-4">Our Features</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Explore the top features that make our food service stand out. Fresh, healthy, and fast — all for your delight.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.desc}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-20 cursor-pointer py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
