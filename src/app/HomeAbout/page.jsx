"use client";
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Truck, Heart, ChefHat, Star, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
  viewport: { once: true },
});

const features = [
  { icon: Leaf,    color: "from-green-400 to-emerald-500",  shadow: "shadow-green-200",  title: "Fresh Ingredients",  desc: "Farm-to-table sourcing with zero preservatives. Every ingredient is handpicked for quality." },
  { icon: ChefHat, color: "from-orange-400 to-amber-500",   shadow: "shadow-orange-200", title: "Expert Chefs",        desc: "Our world-class chefs craft every dish with passion, skill, and authentic recipes." },
  { icon: Truck,   color: "from-blue-400 to-indigo-500",    shadow: "shadow-blue-200",   title: "Fast Delivery",      desc: "Hot, fresh food at your door in under 30 minutes — tracked in real time." },
  { icon: Heart,   color: "from-rose-400 to-pink-500",      shadow: "shadow-rose-200",   title: "Made with Love",     desc: "Every meal is prepared with care and a genuine desire to make you smile." },
];

const highlights = [
  "50,000+ happy customers",
  "200+ menu items",
  "4.9★ average rating",
  "30-min delivery guarantee",
];

export default function HomeAboutPage() {
  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left — Image collage */}
          <motion.div {...fadeUp(0)} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-52 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden h-36 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-3xl overflow-hidden h-36 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-3xl overflow-hidden h-52 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Star size={22} className="text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg leading-none">4.9 / 5.0</p>
                  <p className="text-xs text-gray-500 mt-0.5">50K+ Reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -top-5 -left-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-5 text-white"
            >
              <p className="text-3xl font-black leading-none">5+</p>
              <p className="text-xs text-indigo-200 mt-0.5 font-semibold">Years of Excellence</p>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div {...fadeUp(0.15)}>
            <span className="text-indigo-500 font-bold text-sm uppercase tracking-widest">About Foodie</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-6 leading-tight">
              Why Thousands{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Choose Us
              </span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We started Foodie with one simple mission — to bring restaurant-quality food to every home.
              From carefully sourced ingredients to expert chefs and lightning-fast delivery, we've built
              a platform that puts your satisfaction first.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every meal tells a story of dedication, passion, and love for food. Join our growing family
              and experience the difference that quality makes.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map(h => (
                <div key={h} className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                  <CheckCircle size={16} className="text-green-500 shrink-0" /> {h}
                </div>
              ))}
            </div>

            <Link href="/AboutUs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Bottom — Feature Cards */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-12">
          <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Our Promise</span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            What We Stand For
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -8 }}
              className="bg-[#f8fafc] rounded-3xl p-7 border border-gray-100 hover:shadow-xl hover:bg-white transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} shadow-lg ${f.shadow} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon size={26} className="text-white" />
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-2">{f.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
