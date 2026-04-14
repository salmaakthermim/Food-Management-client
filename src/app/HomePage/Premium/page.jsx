"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Flame, Leaf, Zap, Award } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Fresh Orange Juice",
    tag: "Best Seller",
    tagColor: "bg-orange-100 text-orange-600",
    price: 8.99,
    oldPrice: 12.99,
    rating: 4.9,
    reviews: 2.4,
    desc: "100% pure cold-pressed orange juice packed with Vitamin C and natural antioxidants. No added sugar, no preservatives.",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80",
    bg: "from-orange-400 to-amber-500",
    light: "from-orange-50 to-amber-50",
    badge: "🍊",
    perks: ["No added sugar", "Cold-pressed", "Rich in Vitamin C"],
  },
  {
    id: 2,
    name: "Green Detox Smoothie",
    tag: "New Arrival",
    tagColor: "bg-green-100 text-green-600",
    price: 10.99,
    oldPrice: 14.99,
    rating: 4.8,
    reviews: 1.8,
    desc: "A powerful blend of spinach, kale, cucumber and apple. Detox your body and boost your energy naturally every morning.",
    img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&q=80",
    bg: "from-green-400 to-emerald-500",
    light: "from-green-50 to-emerald-50",
    badge: "🥬",
    perks: ["Detox blend", "High fiber", "Energy boost"],
  },
  {
    id: 3,
    name: "Berry Blast Mix",
    tag: "Limited",
    tagColor: "bg-rose-100 text-rose-600",
    price: 11.99,
    oldPrice: 15.99,
    rating: 5.0,
    reviews: 3.1,
    desc: "A vibrant mix of strawberries, blueberries and raspberries. Loaded with antioxidants and natural sweetness.",
    img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80",
    bg: "from-rose-400 to-pink-500",
    light: "from-rose-50 to-pink-50",
    badge: "🍓",
    perks: ["Antioxidant rich", "Natural sweetness", "Immunity boost"],
  },
];

const stats = [
  { icon: Leaf,  value: "100%", label: "Organic",       color: "text-green-500" },
  { icon: Zap,   value: "0",    label: "Preservatives", color: "text-amber-500" },
  { icon: Award, value: "5★",   label: "Rated",         color: "text-indigo-500" },
  { icon: Flame, value: "30m",  label: "Delivery",      color: "text-rose-500" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

export default function PremiumPage() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState({});
  const product = products[active];

  return (
    <section className="py-24 px-4 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
            <Star size={14} className="fill-amber-500 text-amber-500" /> Premium Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            Crafted for Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Wellbeing
            </span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Farm-fresh, cold-pressed drinks made with love. No shortcuts, no compromises.
          </p>
        </motion.div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left — Image */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${product.light} rounded-[3rem] -z-10`} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-[3rem] overflow-hidden aspect-square shadow-2xl"
              >
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-black text-gray-900">{product.rating}</span>
                    <span className="text-gray-400 text-xs">({product.reviews}k)</span>
                  </div>
                </motion.div>

                {/* Discount badge */}
                <div className={`absolute bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br ${product.bg} flex flex-col items-center justify-center shadow-xl`}>
                  <span className="text-white text-xs font-bold">SAVE</span>
                  <span className="text-white text-sm font-black">{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail selector */}
            <div className="flex gap-3 mt-5 justify-center">
              {products.map((p, i) => (
                <button key={p.id} onClick={() => setActive(i)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${active === i ? "border-indigo-500 scale-110 shadow-lg" : "border-gray-200 opacity-60 hover:opacity-100"}`}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.tagColor}`}>{product.tag}</span>
                <span className="text-3xl">{product.badge}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{product.name}</h3>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">{product.rating} · {product.reviews}k reviews</span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{product.desc}</p>

              {/* Perks */}
              <div className="flex flex-wrap gap-2">
                {product.perks.map(p => (
                  <span key={p} className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${product.light} border border-gray-100 rounded-xl text-sm font-semibold text-gray-700`}>
                    <Leaf size={13} className="text-green-500" /> {p}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                <span className="text-xl text-gray-400 line-through mb-1">${product.oldPrice}</span>
                <span className={`mb-1 px-3 py-1 rounded-full text-sm font-black bg-gradient-to-r ${product.bg} text-white`}>
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <Link href="/AllFood" className="flex-1">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r ${product.bg} text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg`}>
                    <ShoppingCart size={20} /> Order Now
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setLiked(prev => ({ ...prev, [active]: !prev[active] }))}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all ${liked[active] ? "bg-rose-50 border-rose-300 text-rose-500" : "border-gray-200 text-gray-400 hover:border-rose-200 hover:text-rose-400"}`}>
                  <Heart size={20} className={liked[active] ? "fill-rose-500" : ""} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Row */}
        <motion.div {...fadeUp(0.2)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.08)} className="text-center">
              <s.icon size={28} className={`mx-auto mb-2 ${s.color}`} />
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-gray-400 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
