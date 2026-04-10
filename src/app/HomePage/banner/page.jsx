"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "🌿 Fresh & Organic",
    title: "Discover",
    highlight: "Fresh Foods",
    description: "Farm-to-table goodness delivered straight to your door. Experience the authentic taste of nature in every bite.",
    bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
    accent: "from-green-400 to-emerald-500",
    badge: "bg-green-500",
    cta: "/AllFood",
  },
  {
    id: 2,
    tag: "🥗 Healthy Living",
    title: "Nourish",
    highlight: "Your Body",
    description: "Explore our rich variety of healthy meals crafted to keep you energized and feeling your absolute best all day.",
    bg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80",
    accent: "from-blue-400 to-indigo-500",
    badge: "bg-blue-500",
    cta: "/menu",
  },
  {
    id: 3,
    tag: "🔥 Chef's Special",
    title: "Savor",
    highlight: "Every Bite",
    description: "Dive into our deliciously crafted culinary masterpieces that bring joy and warmth to your family table.",
    bg: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80",
    accent: "from-orange-400 to-red-500",
    badge: "bg-orange-500",
    cta: "/menu",
  },
  {
    id: 4,
    tag: "🍕 Fast Delivery",
    title: "Order",
    highlight: "In Minutes",
    description: "Hot, fresh food at your doorstep in under 30 minutes. Because great food shouldn't make you wait.",
    bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80",
    accent: "from-purple-400 to-pink-500",
    badge: "bg-purple-500",
    cta: "/AllFood",
  },
];

const BannerPage = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? slides.length - 1 : current - 1, -1), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (dir) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, scale: 0.95, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (dir) => ({ opacity: 0, scale: 1.1 }),
            center: { opacity: 1, scale: 1 },
            exit: (dir) => ({ opacity: 0, scale: 1.05 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slide.bg}')` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur border border-white/30 rounded-full text-white text-sm font-bold mb-6"
            >
              <span className={`w-2 h-2 rounded-full ${slide.badge} animate-pulse`} />
              {slide.tag}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight"
            >
              {slide.title}
              <br />
              <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              {slide.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href={slide.cta}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${slide.accent} text-white font-black rounded-2xl shadow-2xl hover:shadow-lg transition-all text-lg`}
                >
                  Order Now <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="/AboutUs">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur border border-white/40 text-white font-bold rounded-2xl hover:bg-white/25 transition-all text-lg"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mt-10"
            >
              <div className="flex -space-x-2">
                {["Felix", "Mia", "John", "Sara"].map(seed => (
                  <img key={seed} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                    className="w-9 h-9 rounded-full border-2 border-white bg-white" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  <span className="text-white font-black ml-1">4.9</span>
                </div>
                <p className="text-white/60 text-xs">50,000+ happy customers</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Number */}
      <div className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-2 text-white/60 text-sm font-bold">
        <span className="text-white text-2xl font-black">{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/15 backdrop-blur border border-white/30 text-white rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/15 backdrop-blur border border-white/30 text-white rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`transition-all duration-400 rounded-full ${
              i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
          className={`h-full bg-gradient-to-r ${slide.accent}`}
        />
      </div>
    </div>
  );
};

export default BannerPage;
