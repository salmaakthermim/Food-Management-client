"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Truck, ShieldCheck, Clock, Star, Smartphone,
  ChefHat, Heart, Zap, ArrowRight, CheckCircle, Play
} from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
  viewport: { once: true },
});

const mainFeatures = [
  {
    icon: Leaf,
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-200",
    light: "bg-green-50",
    title: "100% Fresh & Organic",
    desc: "Every ingredient is sourced directly from certified organic farms. No pesticides, no GMOs — just pure, natural goodness.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80",
    points: ["Farm-to-table sourcing", "Certified organic", "No preservatives"],
  },
  {
    icon: Truck,
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-200",
    light: "bg-blue-50",
    title: "Lightning Fast Delivery",
    desc: "Our optimized delivery network ensures your food arrives hot, fresh, and on time — every single time.",
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=700&q=80",
    points: ["Under 30 minutes", "Real-time tracking", "Safe packaging"],
  },
  {
    icon: ChefHat,
    color: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-200",
    light: "bg-orange-50",
    title: "Expert Chef Crafted",
    desc: "Our world-class chefs bring restaurant-quality meals to your home. Every dish is a masterpiece of flavor and nutrition.",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=700&q=80",
    points: ["Michelin-trained chefs", "Authentic recipes", "Daily fresh prep"],
  },
];

const miniFeatures = [
  { icon: ShieldCheck, color: "from-purple-400 to-violet-500", title: "Safe & Hygienic",    desc: "Strict hygiene protocols at every step of preparation and delivery." },
  { icon: Clock,       color: "from-rose-400 to-pink-500",     title: "24/7 Available",     desc: "Order anytime, day or night. We're always ready to serve you." },
  { icon: Star,        color: "from-amber-400 to-yellow-500",  title: "Top Rated",          desc: "Consistently rated 4.9★ by over 50,000 happy customers." },
  { icon: Smartphone,  color: "from-cyan-400 to-teal-500",     title: "Easy App Ordering",  desc: "Order in seconds with our intuitive and beautiful interface." },
  { icon: Heart,       color: "from-red-400 to-rose-500",      title: "Made with Love",     desc: "Every meal is prepared with care, passion, and a whole lot of heart." },
  { icon: Zap,         color: "from-indigo-400 to-blue-500",   title: "Smart Suggestions",  desc: "AI-powered recommendations based on your taste and history." },
];

export default function FeaturesPage() {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[65vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.span {...fadeUp(0)}
            className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur border border-white/30 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
            ✨ Why Choose Foodie
          </motion.span>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-black leading-tight mb-5">
            Features That{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Set Us Apart
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/75 text-lg max-w-xl mx-auto mb-8">
            From farm-fresh ingredients to lightning-fast delivery — discover everything that makes Foodie the best choice for your meals.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 justify-center">
            <Link href="/menu"
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
              Explore Menu <ArrowRight size={18} />
            </Link>
            <button onClick={() => setVideoOpen(true)}
              className="flex items-center gap-2 px-8 py-3.5 bg-white/15 backdrop-blur border border-white/30 text-white font-bold rounded-2xl hover:bg-white/25 transition-all">
              <Play size={18} className="fill-white" /> Watch Video
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN FEATURES TABS ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="text-indigo-500 font-bold text-sm uppercase tracking-widest">Core Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Everything You{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Need</span>
            </h2>
          </motion.div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {mainFeatures.map((f, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                  active === i
                    ? `bg-gradient-to-r ${f.color} text-white shadow-lg`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                <f.icon size={16} /> {f.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src={mainFeatures[active].img} alt={mainFeatures[active].title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute bottom-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${mainFeatures[active].color} flex items-center justify-center shadow-xl`}>
                  {React.createElement(mainFeatures[active].icon, { size: 26, className: "text-white" })}
                </div>
              </div>

              {/* Text */}
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${mainFeatures[active].light} mb-5`}>
                  {React.createElement(mainFeatures[active].icon, { size: 18, className: "text-gray-600" })}
                  <span className="font-bold text-gray-700 text-sm">{mainFeatures[active].title}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">
                  {mainFeatures[active].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{mainFeatures[active].desc}</p>
                <div className="space-y-3">
                  {mainFeatures[active].points.map(p => (
                    <div key={p} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 shrink-0" />
                      <span className="text-gray-700 font-semibold">{p}</span>
                    </div>
                  ))}
                </div>
                <Link href="/Register" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── MINI FEATURES GRID ── */}
      <section
        className="py-24 px-4 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">More Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">Built for You</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniFeatures.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)}
                whileHover={{ y: -6 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7 hover:bg-white/20 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <f.icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
                <p className="text-white/65 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-gradient-to-br from-indigo-600 to-purple-700">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-5">Ready to Experience It?</h2>
          <p className="text-indigo-200 text-lg mb-10">
            Join 50,000+ happy customers who trust Foodie for their daily meals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/Register"
              className="flex items-center gap-2 px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-lg">
              Start Free Today <ArrowRight size={20} />
            </Link>
            <Link href="/menu"
              className="flex items-center gap-2 px-10 py-4 bg-white/15 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/25 transition-all text-lg">
              Browse Menu
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-bold opacity-60">Video Coming Soon</p>
                </div>
              </div>
              <div className="p-5 flex justify-end">
                <button onClick={() => setVideoOpen(false)}
                  className="px-5 py-2 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
