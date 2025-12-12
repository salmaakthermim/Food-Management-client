"use client";

import React from "react";
import { FaLeaf, FaAppleAlt, FaTruck, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const features = [
    { icon: <FaLeaf size={32} className="text-green-600" />, title: "Fresh Ingredients", desc: "We use only the freshest ingredients to ensure every meal is delicious and healthy." },
    { icon: <FaAppleAlt size={32} className="text-green-600" />, title: "Healthy Choices", desc: "Our menu is crafted to provide a balance of taste and nutrition for everyone." },
    { icon: <FaTruck size={32} className="text-green-600" />, title: "Fast Delivery", desc: "Get your favorite foods delivered quickly and safely to your doorstep." },
    { icon: <FaHeart size={32} className="text-green-600" />, title: "Customer Love", desc: "Our customers are our priority, and we strive to make every experience memorable." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-green-800 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Welcome to our Food Heaven! We are passionate about delivering fresh, healthy, and delicious meals to your table.
          Our team of expert chefs carefully curates every dish, ensuring high-quality ingredients and exceptional taste.  
          From farm to fork, we bring you flavors that delight your senses and make every bite unforgettable.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
