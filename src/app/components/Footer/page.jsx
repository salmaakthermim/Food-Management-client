"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin, Mail, Phone, Send, ArrowRight,
  Utensils, Clock, Shield, Star
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const links = {
  Explore: [
    { name: "Home",       href: "/" },
    { name: "Menu",       href: "/menu" },
    { name: "All Food",   href: "/AllFood" },
    { name: "Gallery",    href: "/Gallery" },
    { name: "Features",   href: "/Features" },
  ],
  Company: [
    { name: "About Us",   href: "/AboutUs" },
    { name: "Contact",    href: "/ContactUs" },
    { name: "Dashboard",  href: "/Dashboard" },
    { name: "My Orders",  href: "/Dashboard/MyOrders" },
    { name: "Wishlist",   href: "/Dashboard/Wishlist" },
  ],
};

const socials = [
  { icon: FaFacebookF,  href: "#", color: "hover:bg-blue-600" },
  { icon: FaTwitter,    href: "#", color: "hover:bg-sky-500" },
  { icon: FaInstagram,  href: "#", color: "hover:bg-pink-600" },
  { icon: FaYoutube,    href: "#", color: "hover:bg-red-600" },
];

const badges = [
  { icon: Utensils, text: "200+ Menu Items" },
  { icon: Clock,    text: "30-min Delivery" },
  { icon: Shield,   text: "100% Secure" },
  { icon: Star,     text: "4.9★ Rated" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

export default function FooterPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-950 text-gray-400 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />

      {/* Top CTA Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
            />
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-1">Hungry? Order Now!</h3>
              <p className="text-indigo-200">Fresh food delivered to your door in 30 minutes.</p>
            </div>
            <Link href="/menu" className="relative z-10 shrink-0">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                Order Now <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* Col 1 — Brand */}
        <motion.div {...fadeUp(0)}>
          <Link href="/" className="flex items-center gap-3 mb-6">
            <img src="https://i.ibb.co.com/205rP86J/download-1.jpg"
              className="w-12 h-12 rounded-xl object-cover border border-indigo-500/40 shadow-lg" alt="Foodie" />
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Foodie</span>
              <p className="text-[10px] text-gray-600 font-semibold tracking-widest uppercase">Delicious</p>
            </div>
          </Link>
          <p className="text-gray-500 leading-relaxed text-sm mb-6">
            Bringing you the freshest organic meals and drinks. Built with passion and powered by modern tech. Delicious, healthy, and made just for you.
          </p>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-2">
            {badges.map(b => (
              <div key={b.text} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <b.icon size={13} className="text-indigo-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-400">{b.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Col 2 — Explore */}
        <motion.div {...fadeUp(0.1)}>
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-3">
            {links.Explore.map(l => (
              <li key={l.name}>
                <Link href={l.href}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-400 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all shrink-0" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 3 — Company + Contact */}
        <motion.div {...fadeUp(0.2)}>
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-3 mb-8">
            {links.Company.map(l => (
              <li key={l.name}>
                <Link href={l.href}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-400 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all shrink-0" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            {[
              { icon: MapPin, text: "123 Food Street, Dhaka, Bangladesh" },
              { icon: Mail,   text: "hello@foodie.com" },
              { icon: Phone,  text: "+880 1700-000000" },
            ].map(c => (
              <div key={c.text} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <c.icon size={14} className="text-indigo-400" />
                </div>
                <span className="text-sm text-gray-500 leading-snug">{c.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Col 4 — Newsletter */}
        <motion.div {...fadeUp(0.3)}>
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            Subscribe for exclusive deals, fresh recipes, and updates delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all text-sm">
              {subscribed ? "✓ Subscribed!" : <><Send size={15} /> Subscribe Now</>}
            </motion.button>
          </form>

          {/* Socials */}
          <div className="mt-8">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, color }, i) => (
                <a key={i} href={href}
                  className={`w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white ${color} hover:border-transparent transition-all hover:scale-110`}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} <span className="text-indigo-400 font-bold">Foodie</span>. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(t => (
              <a key={t} href="#" className="hover:text-indigo-400 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
