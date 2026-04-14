"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Leaf, ArrowRight, TrendingUp, Award, Users } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const products = [
  {
    id: 1,
    tag: "Best Seller",
    tagColor: "bg-orange-100 text-orange-600",
    name: "Fresh Orange Juice",
    subtitle: "Cold Pressed · 500ml",
    desc: "100% pure cold-pressed orange juice. Rich in Vitamin C, zero preservatives, and bursting with natural flavor.",
    price: 8.99,
    oldPrice: 12.99,
    rating: 4.9,
    sold: "12K+",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80",
    bg: "from-orange-400 to-amber-500",
    light: "from-orange-50 to-amber-50",
    perks: ["No added sugar", "Vitamin C rich", "Cold-pressed"],
  },
  {
    id: 2,
    tag: "New Arrival",
    tagColor: "bg-green-100 text-green-600",
    name: "Green Detox Smoothie",
    subtitle: "Organic Blend · 400ml",
    desc: "A powerful blend of spinach, kale, cucumber and apple. Detox your body and boost your energy naturally.",
    price: 10.99,
    oldPrice: 14.99,
    rating: 4.8,
    sold: "8K+",
    img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&q=80",
    bg: "from-green-400 to-emerald-500",
    light: "from-green-50 to-emerald-50",
    perks: ["Detox blend", "High fiber", "Energy boost"],
  },
  {
    id: 3,
    tag: "Limited",
    tagColor: "bg-rose-100 text-rose-600",
    name: "Berry Blast Mix",
    subtitle: "Antioxidant Rich · 450ml",
    desc: "A vibrant mix of strawberries, blueberries and raspberries. Loaded with antioxidants and natural sweetness.",
    price: 11.99,
    oldPrice: 15.99,
    rating: 5.0,
    sold: "15K+",
    img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80",
    bg: "from-rose-400 to-pink-500",
    light: "from-rose-50 to-pink-50",
    perks: ["Antioxidant rich", "Natural sweet", "Immunity boost"],
  },
  {
    id: 4,
    tag: "Popular",
    tagColor: "bg-purple-100 text-purple-600",
    name: "Mango Passion Blend",
    subtitle: "Tropical Mix · 500ml",
    desc: "Exotic mango and passion fruit blended to perfection. A tropical escape in every sip.",
    price: 9.99,
    oldPrice: 13.99,
    rating: 4.7,
    sold: "10K+",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&q=80",
    bg: "from-yellow-400 to-orange-500",
    light: "from-yellow-50 to-orange-50",
    perks: ["Tropical flavor", "No additives", "Vitamin A rich"],
  },
];

const stats = [
  { icon: TrendingUp, value: "50K+", label: "Orders Delivered", color: "text-indigo-500" },
  { icon: Award,      value: "4.9★", label: "Average Rating",   color: "text-amber-500" },
  { icon: Users,      value: "20K+", label: "Happy Customers",  color: "text-green-500" },
  { icon: Leaf,       value: "100%", label: "Organic Products", color: "text-emerald-500" },
];

export default function StatusPage() {
  const [liked, setLiked] = useState({});

  return (
    <section className="py-24 px-4 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold mb-4">
            <Leaf size={14} /> Our Product Status
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Freshly Made,{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Naturally Yours
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Explore our fresh and healthy drinks made with natural ingredients.
            Quality, nutrition, and great taste — all in one sip.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.08)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <s.icon size={28} className={s.color} />
              <div>
                <p className="text-2xl font-black text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row"
            >
              {/* Image Side */}
              <div className={`relative sm:w-52 h-52 sm:h-auto bg-gradient-to-br ${p.light} flex items-center justify-center p-6 shrink-0`}>
                <img src={p.img} alt={p.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg" />
                {/* Discount */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r ${p.bg} text-white shadow`}>
                  -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                </div>
              </div>

              {/* Content Side */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.tagColor}`}>{p.tag}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={13} className="fill-amber-400" />
                      <span className="text-sm font-black text-gray-800">{p.rating}</span>
                      <span className="text-xs text-gray-400">· {p.sold} sold</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 leading-tight">{p.name}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5 mb-3">{p.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{p.desc}</p>

                  {/* Perks */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.perks.map(pk => (
                      <span key={pk} className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                        <Leaf size={10} className="text-green-500" /> {pk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-gray-900">${p.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">${p.oldPrice}</span>
                  </div>
                  <Link href="/AllFood">
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${p.bg} text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm`}
                    >
                      <ShoppingCart size={15} /> Order Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-14">
          <Link href="/AllFood"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">
            View All Products <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
