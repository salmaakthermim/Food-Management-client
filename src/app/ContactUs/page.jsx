"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, Send,
  CheckCircle, MessageSquare, ArrowRight, ChevronDown
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const contactInfo = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "123 Food Street, Dhaka 1200, Bangladesh",
    color: "from-rose-400 to-pink-500",
    shadow: "shadow-rose-200",
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: "+880 1700-000000",
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-200",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "hello@foodie.com",
    color: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-200",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sun: 8:00 AM – 11:00 PM",
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-200",
  },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <Toaster position="top-right" />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.span
            {...fadeUp(0)}
            className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur rounded-full text-sm font-bold tracking-widest uppercase mb-5 border border-white/30"
          >
            💬 Get in Touch
          </motion.span>
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl font-black leading-tight mb-5"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="text-white/75 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Have a question, feedback, or just want to say hi?
            We'd love to hear from you. Our team is always ready to help.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-20 px-4 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg ${item.shadow} flex items-center justify-center`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-gray-800 font-semibold text-sm leading-snug">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ── */}
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
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <motion.div {...fadeUp(0)} className="text-white">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">Send a Message</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 leading-tight">
              We're Here to <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Help You
              </span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Whether you have a question about our menu, delivery, or anything else —
              our team is ready to answer all your questions.
            </p>

            {/* FAQ quick links */}
            <div className="space-y-3">
              {[
                { q: "How do I track my order?", a: "Go to Dashboard → My Orders. You'll see a live status tracker showing Pending, Cooking, Out for Delivery, and Delivered steps." },
                { q: "What are your delivery hours?", a: "We deliver every day from 8:00 AM to 11:00 PM. Orders placed after 11 PM will be processed the next morning." },
                { q: "Can I customize my meal?", a: "Yes! On the food details page you can adjust quantity. For special requests, mention it in the delivery address field at checkout." },
                { q: "How do I cancel an order?", a: "You can cancel from Dashboard → My Orders as long as the status is still 'Pending'. Once cooking starts, cancellation is not possible." },
              ].map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div {...fadeUp(0.2)}>
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-12 text-center shadow-2xl"
              >
                <CheckCircle size={64} className="text-green-500 mx-auto mb-5" />
                <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-2xl space-y-5"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-2">Send us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all disabled:opacity-60 text-lg"
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm" />
                    : <><Send size={18} /> Send Message</>
                  }
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="h-80 w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.36721519!2d90.27923898!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </section>
    </div>
  );
}

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left group"
      >
        <MessageSquare size={16} className="text-orange-400 shrink-0" />
        <span className="text-white/90 text-sm font-semibold flex-1 group-hover:text-white transition">
          {question}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-white/50 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4 pl-9 text-white/65 text-sm leading-relaxed border-t border-white/10 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
