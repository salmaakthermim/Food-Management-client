"use client";
import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { Utensils, Users, DollarSign, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch true data to make charts realistic
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foods`);
        const data = await res.json();
        setFoods(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard data.", err);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // Prepare data for Recharts based on actual foods
  // Grouping by price segments or status
  const sortedByPrice = [...foods].sort((a,b) => a.price - b.price);
  
  const chartData = [
    { name: "Mon", Revenue: 4000, Users: 2400 },
    { name: "Tue", Revenue: 3000, Users: 1398 },
    { name: "Wed", Revenue: 2000, Users: 9800 },
    { name: "Thu", Revenue: 2780, Users: 3908 },
    { name: "Fri", Revenue: 1890, Users: 4800 },
    { name: "Sat", Revenue: 2390, Users: 3800 },
    { name: "Sun", Revenue: 3490, Users: 4300 },
  ];

  // We can track the 5 most expensive foods
  const topExpensive = sortedByPrice.slice(-5).map(f => ({
    name: f.title ? (f.title.substring(0, 10) + "...") : "Unknown",
    price: parseInt(f.price) || 0
  }));

  const StatsCard = ({ title, value, subtitle, icon: Icon, color, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
    >
      <div className={`p-4 rounded-xl ${color} shadow-inner`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
        <h2 className="text-3xl font-black text-gray-800 mb-1">{loading ? "..." : value}</h2>
        <p className="text-sm text-green-600 font-medium flex items-center gap-1">
          <Activity size={14} /> {subtitle}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-500">Monitor your food platform analytics and statistics.</p>
        </div>
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-100 inline-flex">
          <button className="px-4 py-1.5 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-md">7 Days</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">30 Days</button>
        </div>
      </div>

      {/* Stats Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Foods Managed" 
          value={foods.length} 
          subtitle="+12% from last week" 
          icon={Utensils} 
          color="bg-gradient-to-br from-indigo-500 to-purple-600" 
          delay={0.1}
        />
        <StatsCard 
          title="Active Users" 
          value="1,245" 
          subtitle="+5% new users today" 
          icon={Users} 
          color="bg-gradient-to-br from-green-400 to-emerald-600" 
          delay={0.2}
        />
        <StatsCard 
          title="Revenue Generated" 
          value="$4,592" 
          subtitle="Steady growth" 
          icon={DollarSign} 
          color="bg-gradient-to-br from-orange-400 to-red-500" 
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Area Chart: Revenue Overview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-800">Revenue & Engagement</h3>
            <button className="text-gray-400 hover:text-indigo-500 mb-1">...</button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Area type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart: Most Expensive Foods */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
           <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-800">Top High-Value Foods</h3>
            <button className="text-gray-400 hover:text-indigo-500 mb-1">...</button>
          </div>
          <div className="h-72 w-full">
            {topExpensive.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topExpensive} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <RechartsTooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Bar dataKey="price" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">Loading data...</div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
