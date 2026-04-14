"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Star, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    color: "from-gray-500 to-slate-600",
    bg: "bg-white",
    border: "border-gray-200",
    badge: null,
    features: [
      "Browse full menu",
      "Place up to 3 orders/month",
      "Standard delivery (45 min)",
      "Email support",
      "Order tracking",
    ],
    disabled: ["Priority delivery", "Exclusive deals", "Free delivery"],
    cta: "Get Started Free",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-700",
  },
  {
    name: "Pro",
    icon: Star,
    price: { monthly: 9.99, yearly: 7.99 },
    color: "from-indigo-500 to-purple-600",
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    border: "border-indigo-400",
    badge: "Most Popular",
    features: [
      "Unlimited orders",
      "Priority delivery (20 min)",
      "Free delivery on all orders",
      "Exclusive member deals",
      "24/7 live chat support",
      "Order tracking + history",
    ],
    disabled: ["Personal chef consultation"],
    cta: "Start Pro Plan",
    ctaStyle: "bg-white text-indigo-600 hover:bg-indigo-50",
  },
  {
    name: "Premium",
    icon: Crown,
    price: { monthly: 19.99, yearly: 15.99 },
    color: "from-amber-500 to-orange-500",
    bg: "bg-white",
    border: "border-amber-200",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Personal chef consultation",
      "Custom meal planning",
      "VIP priority delivery (10 min)",
      "Dedicated account manager",
      "Early access to new dishes",
      "Monthly surprise gift box",
    ],
    disabled: [],
    cta: "Go Premium",
    ctaStyle: "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-200",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const FeeChartPage = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 px-4 bg-[#f8fafc] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-60 -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold mb-4">
            <Sparkles size={14} /> Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No hidden fees. Choose the plan that fits your appetite and upgrade anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-bold ${!yearly ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${yearly ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <motion.div
                animate={{ x: yearly ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-sm font-bold ${yearly ? "text-gray-900" : "text-gray-400"}`}>
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs font-black rounded-full">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const isPro = plan.name === "Pro";
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl border-2 ${plan.border} overflow-hidden flex flex-col ${
                  isPro ? "shadow-2xl shadow-indigo-200 scale-105" : "shadow-sm"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${
                    isPro ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {/* Header */}
                <div className={`p-7 ${isPro ? plan.bg : "bg-white"}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className={`text-xl font-black mb-1 ${isPro ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-3">
                    <span className={`text-4xl font-black ${isPro ? "text-white" : "text-gray-900"}`}>
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className={`text-sm font-medium mb-1 ${isPro ? "text-white/70" : "text-gray-400"}`}>
                        /{yearly ? "mo, billed yearly" : "month"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="p-7 bg-white flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br ${plan.color}`}>
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                    {plan.disabled.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-300 font-medium line-through">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-gray-100">
                          <Check size={11} className="text-gray-300" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/Register" className="mt-8 block">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${plan.ctaStyle}`}
                    >
                      {plan.cta} <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p {...fadeUp(0.4)} className="text-center text-gray-400 text-sm mt-10">
          All plans include a 7-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default FeeChartPage;
