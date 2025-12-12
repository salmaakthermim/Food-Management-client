"use client";

import React from "react";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const images = [
    "https://i.ibb.co.com/7J0mg3mL/food1.jpg",
    "https://i.ibb.co.com/qLFVj22q/food2.jpg",
    "https://i.ibb.co.com/5XkXH27D/food3.jpg",
    "https://i.ibb.co.com/hxzC3CmS/food4.png",
    "https://i.ibb.co.com/Pv1pVDXT/food5.jpg",
    "https://i.ibb.co.com/wZL8QRx3/food6.jpg",
  ];

  return (
    <div className="bg-green-50 py-20">
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-5xl font-bold text-green-800 mb-4">Our Gallery</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Explore our beautiful collection of fresh and healthy foods. 
          Quality ingredients, vibrant colors, and delicious meals await you.
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
