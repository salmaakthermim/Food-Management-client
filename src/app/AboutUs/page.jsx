"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Leaf, Apple, Truck, Heart, Star, Users,
  ChefHat, Award, Clock, MapPin, Phone, Mail,
  ArrowRight, CheckCircle
} from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true },
});

const AboutUsPage = () => {

  const features = [
    { icon: Leaf,    color: "from-green-400 to-emerald-500",  shadow: "shadow-green-200",  title: "Fresh Ingredients",  desc: "Only the freshest farm-to-table ingredients in every dish." },
    { icon: ChefHat, color: "from-orange-400 to-amber-500",   shadow: "shadow-orange-200", title: "Expert Chefs",        desc: "Our world-class chefs craft every meal with passion and skill." },
    { icon: Truck,   color: "from-blue-400 to-indigo-500",    shadow: "shadow-blue-200",   title: "Fast Delivery",      desc: "Hot, fresh food delivered to your door in under 30 minutes." },
    { icon: Heart,   color: "from-rose-400 to-pink-500",      shadow: "shadow-rose-200",   title: "Made with Love",     desc: "Every recipe is crafted with care and a whole lot of heart." },
  ];

  const stats = [
    { value: "50K+",  label: "Happy Customers" },
    { value: "200+",  label: "Menu Items" },
    { value: "15+",   label: "Expert Chefs" },
    { value: "4.9★",  label: "Average Rating" },
  ];

  const team = [
    { name: "Arif Rahman",   role: "Head Chef",        img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80" },
    { name: "Nadia Islam",   role: "Pastry Chef",      img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&q=80" },
    { name: "Karim Hossain", role: "Delivery Manager", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
    { name: "Sadia Akter",   role: "Customer Care",    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" },
  ];

  const values = [
    "100% Halal certified ingredients",
    "No artificial preservatives",
    "Eco-friendly packaging",
    "Same-day fresh preparation",
    "24/7 customer support",
    "Money-back guarantee",
  ];

  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            {...fadeUp(0)}
            className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-white/30"
          >
            🍽️ Welcome to Foodie
          </motion.span>
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            We Cook with <br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Passion & Love
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From farm-fresh ingredients to your doorstep — we deliver happiness in every bite.
            Discover the story behind Foodie and why thousands love us.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 justify-center">
            <Link href="/menu"
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all">
              Explore Menu <ArrowRight size={18} />
            </Link>
            <a href="#story"
              className="flex items-center gap-2 px-8 py-3.5 bg-white/15 backdrop-blur border border-white/30 text-white font-bold rounded-2xl hover:bg-white/25 transition-all">
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)} className="text-center text-white">
              <p className="text-4xl md:text-5xl font-black mb-1">{s.value}</p>
              <p className="text-indigo-200 font-semibold text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-6 leading-tight">
              Started with a <br />
              <span className="text-indigo-600">Simple Dream</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Foodie was born in 2020 from a small kitchen with a big dream — to bring restaurant-quality food to every home.
              What started as a weekend passion project quickly grew into a beloved food platform serving thousands of happy customers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Today, we partner with local farmers, employ talented chefs, and use cutting-edge technology to ensure your food
              arrives fresh, hot, and exactly as you imagined it.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle size={16} className="text-green-500 shrink-0" /> {v}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Our Kitchen"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-black text-gray-900">Best Food App</p>
                  <p className="text-xs text-gray-500">Award 2024</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="font-black text-gray-900 text-lg">4.9</span>
                <span className="text-xs text-gray-500">/ 5.0</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">50K+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        className="py-24 px-4 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">Why Foodie</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
              What Makes Us Different
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7 text-center text-white hover:bg-white/20 transition-all"
              >
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${f.color} shadow-lg ${f.shadow} flex items-center justify-center`}>
                  <f.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{f.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 px-4 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="text-indigo-500 font-bold text-sm uppercase tracking-widest">The People</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Meet Our Team</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">The passionate people behind every delicious meal.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-black text-gray-900 text-lg">{member.name}</h3>
                  <p className="text-indigo-500 font-semibold text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="text-rose-500 font-bold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">What People Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahim Uddin",   text: "Best food delivery app I've ever used! The food is always fresh and arrives on time.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim" },
              { name: "Fatema Begum",  text: "The variety of menu items is amazing. My family loves ordering from Foodie every weekend!", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatema" },
              { name: "Sakib Hassan",  text: "Super fast delivery and the packaging is eco-friendly. Highly recommend to everyone!", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakib" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp(i * 0.1)}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} className="w-11 h-11 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        className="py-24 px-4 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-indigo-900/85" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div {...fadeUp(0)}>
            <span className="text-indigo-300 font-bold text-sm uppercase tracking-widest">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">We'd Love to Hear From You</h2>
            <p className="text-indigo-200 text-lg mb-12 max-w-xl mx-auto">
              Have a question, feedback, or just want to say hi? Our team is always here for you.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MapPin, label: "Address",  value: "123 Food Street, Dhaka, Bangladesh" },
              { icon: Phone,  label: "Phone",    value: "+880 1700-000000" },
              { icon: Mail,   label: "Email",    value: "hello@foodie.com" },
            ].map(c => (
              <div key={c.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <c.icon size={22} className="text-white" />
                </div>
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-wide mb-1">{c.label}</p>
                <p className="text-white font-semibold text-sm">{c.value}</p>
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <Link href="/menu"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all text-lg">
              Order Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
