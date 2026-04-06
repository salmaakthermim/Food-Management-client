"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    tag: "New Introduction",
    title: "Discover ",
    highlight: "Fresh Foods",
    description: "Organic food is produced by methods that comply with the highest standards of organic farming. Enjoy the authentic taste of nature.",
    image: "https://i.ibb.co.com/kV6fcqGf/banner1.png",
    bgFrom: "from-[#d4f8e8]",
    bgVia: "via-white",
    bgTo: "to-[#e8fff2]",
    buttonColors: "from-[#ff6f61] to-[#ff4e3e]",
    blob1: "bg-green-200",
    blob2: "bg-yellow-100",
  },
  {
    id: 2,
    tag: "Healthy Living",
    title: "Nourish ",
    highlight: "Your Body",
    description: "Explore our rich variety of organic salads and healthy meals crafted specifically to keep you full of energy all day.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    bgFrom: "from-[#e6f2ff]",
    bgVia: "via-white",
    bgTo: "to-[#f0f9ff]",
    buttonColors: "from-[#3b82f6] to-[#2563eb]",
    blob1: "bg-blue-200",
    blob2: "bg-cyan-100",
  },
  {
    id: 3,
    tag: "Spicy & Tasty",
    title: "Savor ",
    highlight: "Every Bite",
    description: "Dive into our deliciously crafted culinary masterpieces that bring joy and warmth to your family table.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
    bgFrom: "from-[#fff0e6]",
    bgVia: "via-white",
    bgTo: "to-[#fff5f0]",
    buttonColors: "from-[#f97316] to-[#ea580c]",
    blob1: "bg-orange-200",
    blob2: "bg-red-100",
  }
];

const BannerPage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const slide = slides[current];

  return (
    <div className={`relative w-full bg-gradient-to-br ${slide.bgFrom} ${slide.bgVia} ${slide.bgTo} py-20 overflow-hidden shadow-sm transition-colors duration-1000 min-h-[600px] flex items-center`}>
      {/* Background Decorative Shapes */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 ${slide.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob transition-colors duration-1000`}></div>
      <div className={`absolute top-0 left-0 -ml-20 mt-32 w-72 h-72 ${slide.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 transition-colors duration-1000`}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10 w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-12"
          >
            {/* Left Text Section */}
            <div className="flex flex-col items-start justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-800 font-semibold text-sm uppercase tracking-wider cursor-default shadow-sm border border-white">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                {slide.tag}
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
                {slide.title} <br className="hidden md:block" />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.buttonColors}`}>
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-lg min-h-[80px]">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/AllFood">
                  <button className={`px-8 py-4 bg-gradient-to-r ${slide.buttonColors} text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300`}>
                    Shop Now
                  </button>
                </Link>
                <Link href="/Features">
                  <button className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-800 rounded-full text-lg font-bold shadow-md hover:shadow-lg border border-white hover:bg-white transform transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative flex justify-center group mt-10 md:mt-0">
              <div className={`absolute inset-0 ${slide.blob1} blur-[80px] rounded-full opacity-30 transition-colors duration-1000`}></div>
              <motion.img
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                src={slide.image}
                alt={slide.highlight}
                className="w-full max-w-sm md:max-w-lg lg:max-w-xl relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
                style={slide.id !== 1 ? { borderRadius: "20px", objectFit: "cover", aspectRatio: "4/3" } : {}}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="flex justify-center md:justify-start items-center gap-4 mt-8 md:mt-12 absolute md:relative bottom-4 md:bottom-auto left-0 right-0 z-20 md:pl-2">
          <button 
            onClick={prevSlide}
            className="p-3 text-lg font-bold text-gray-700 rounded-full bg-white/60 hover:bg-white backdrop-blur-sm shadow-sm transition border border-gray-100"
            aria-label="Previous slide"
          >
             &#8592;
          </button>
          
          <div className="flex gap-2">
            {slides.map((s, i) => (
               <button
                 key={s.id}
                 onClick={() => setCurrent(i)}
                 className={`h-2 rounded-full transition-all duration-300 ${
                   i === current ? `w-8 bg-gradient-to-r ${slide.buttonColors}` : "w-2 bg-gray-300"
                 }`}
                 aria-label={`Go to slide ${i + 1}`}
               />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-3 text-lg font-bold text-gray-700 rounded-full bg-white/60 hover:bg-white backdrop-blur-sm shadow-sm transition border border-gray-100"
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
