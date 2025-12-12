"use client";

import React from "react";
import { FaLeaf, FaAppleAlt, FaTruck, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const HomeAboutPage = () => {
  const features = [
    {
      icon: <FaLeaf size={32} className="text-green-600" />,
      title: "Fresh Ingredients",
      desc: "We use only the freshest ingredients to make every meal healthy and delicious.",
    },
    {
      icon: <FaAppleAlt size={32} className="text-green-600" />,
      title: "Healthy Choices",
      desc: "Our menu is designed to offer a perfect balance of taste and nutrition.",
    },
    {
      icon: <FaTruck size={32} className="text-green-600" />,
      title: "Fast Delivery",
      desc: "Get your favorite foods delivered quickly and safely to your doorstep.",
    },
    {
      icon: <FaHeart size={32} className="text-green-600" />,
      title: "Customer Love",
      desc: "We care for our customers and ensure every experience is memorable.",
    },
  ];

  return (
    <div className="bg-green-50 py-20">
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto px-5 mb-16"
      >
        <h2 className="text-5xl font-bold text-green-800 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          Discover the reasons why our customers love us! From fresh ingredients to fast delivery, we make sure your dining experience is delightful every time.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeAboutPage;
