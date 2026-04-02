"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const FooterPage = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/10 pt-20 pb-8 text-gray-300 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Logo + About */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://i.ibb.co.com/205rP86J/download-1.jpg"
              alt="Logo"
              className="w-14 h-14 object-cover rounded-full border border-indigo-500/50"
            />
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Foodie</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Bringing you the freshest organic meals and juices. Built with ❤️ and powered by modern tech. 
            Delicious, healthy, and made just for you.
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6 text-white tracking-wider uppercase">Explore</h3>
          <ul className="space-y-3">
            {['Home', 'Menu', 'All Food', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link href="#" className="flex items-center gap-2 group text-gray-400 hover:text-indigo-400 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6 text-white tracking-wider uppercase">Get In Touch</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <FaMapMarkerAlt />
              </div>
              <span className="mt-1">123 Green Street, Organic City, NY 10001</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <FaEnvelope />
              </div>
              <span>hello@foodie.com</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <FaPhone />
              </div>
              <span>+1 (234) 567-890</span>
            </li>
          </ul>
        </motion.div>

        {/* Column 4: Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6 text-white tracking-wider uppercase">Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to our newsletter for exclusive offers, fresh recipes, and more directly in your inbox.
          </p>
          <form className="flex flex-col space-y-3 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex flex-col justify-center pointer-events-none">
              <FaEnvelope className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all font-sans"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all active:scale-95"
            >
              Subscribe Now
            </button>
          </form>
          
          <div className="flex gap-4 mt-8">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-indigo-500 transition-all hover:scale-110">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Foodie Platform. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
