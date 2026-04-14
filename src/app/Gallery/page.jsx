"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",  cat: "Main Course", title: "Grilled Perfection",    span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",  cat: "Healthy",     title: "Fresh Salad Bowl",     span: "" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",  cat: "Pizza",       title: "Wood-fired Pizza",     span: "" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",     cat: "Burgers",     title: "Gourmet Burger",       span: "" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",  cat: "Breakfast",   title: "Pancake Stack",        span: "" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",  cat: "Healthy",     title: "Colorful Bowl",        span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",  cat: "Dessert",     title: "Sweet Treats",         span: "" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",  cat: "Fine Dining", title: "Restaurant Ambiance",  span: "" },
  { src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",     cat: "Burgers",     title: "Classic Cheeseburger", span: "" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",  cat: "Pasta",       title: "Creamy Pasta",         span: "" },
  { src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",  cat: "Breakfast",   title: "French Toast",         span: "" },
  { src: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",  cat: "Dessert",     title: "Chocolate Cake",       span: "col-span-2" },
];

const categories = ["All", ...new Set(images.map(i => i.cat))];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

export default function GalleryPage() {
  const [activecat, setActivecat] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activecat === "All" ? images : images.filter(i => i.cat === activecat);

  const prev = () => setLightbox(l => (l === 0 ? filtered.length - 1 : l - 1));
  const next = () => setLightbox(l => (l === filtered.length - 1 ? 0 : l + 1));

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">

      {/* Hero */}
      <section
        className="relative h-72 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <motion.div {...fadeUp(0)} className="relative z-10 text-center px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur border border-white/30 rounded-full text-white text-sm font-bold mb-4">
            <Camera size={14} /> Food Gallery
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white">Our Gallery</h1>
          <p className="text-white/70 mt-3 text-lg max-w-xl mx-auto">
            A visual feast of our finest dishes, crafted with passion and served with love.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActivecat(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activecat === cat
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">{img.cat}</span>
                  <p className="text-white font-black text-lg leading-tight">{img.title}</p>
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition">
              <X size={22} />
            </button>

            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition">
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.src}
                alt={filtered[lightbox]?.title}
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="text-center mt-4">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{filtered[lightbox]?.cat}</span>
                <p className="text-white font-black text-2xl mt-1">{filtered[lightbox]?.title}</p>
                <p className="text-gray-500 text-sm mt-1">{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
