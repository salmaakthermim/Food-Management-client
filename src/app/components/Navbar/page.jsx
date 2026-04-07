"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, Bike } from "lucide-react";
import { useState } from "react";

const NavbarPage = () => {
  const { user, dbUser } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "All Food", path: "/AllFood" },
    { name: "About Us", path: "/AboutUs" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glassmorphism sticky top-0 z-50 px-6 py-3 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.img
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            src="https://i.ibb.co.com/205rP86J/download-1.jpg"
            className="w-12 h-12 rounded-full border-2 border-indigo-400 p-1"
            alt="Foodie Logo"
          />
          <span className="text-2xl font-black text-gradient tracking-tight">Foodie</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-gray-700 dark:text-gray-200 font-semibold hover:text-indigo-500 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-8 shadow-lg hover:shadow-indigo-500/50"
              >
                Login
              </motion.button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-indigo-500 ring-offset-2">
                <div className="w-10 rounded-full">
                  <img src={dbUser?.photo || user?.photoURL || "https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?semt=ais_incoming&w=740&q=80"} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl glassCard rounded-box w-60">
                <li className="p-3 pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-gray-800 dark:text-white block">{user?.displayName || "User"}</span>
                  <span className="text-xs text-gray-500 truncate">{user?.email}</span>
                </li>
                <li>
                  <Link href="/Dashboard" className="hover:text-indigo-500 py-2"><LayoutDashboard size={16}/> Dashboard</Link>
                </li>
                {(role === "admin" || role === "delivery") && (
                  <li>
                    <Link href="/delivery" className="hover:text-indigo-500 py-2"><Bike size={16}/> Delivery Panel</Link>
                  </li>
                )}
                <li>
                  <Link href="/profile" className="hover:text-indigo-500 py-2"><User size={16}/> My Profile</Link>
                </li>
                <li className="mt-2">
                  <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 py-2"><LogOut size={16}/> Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden mt-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-xl p-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="text-lg font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              {link.name}
            </Link>
          ))}
          {!user ? (
            <Link href="/login" className="btn btn-block bg-indigo-500 text-white rounded-full mt-2">Login</Link>
          ) : (
            <>
              <div className="divider my-0"></div>
              <Link href="/Dashboard" className="text-lg font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2"><LayoutDashboard size={18}/> Dashboard</Link>
              {(role === "admin" || role === "delivery") && (
                <Link href="/delivery" className="text-lg font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2"><Bike size={18}/> Delivery Panel</Link>
              )}
              <button className="flex items-center justify-start w-full text-lg font-medium p-2 text-red-500 hover:bg-red-50 rounded-lg" onClick={handleLogout}><LogOut size={18} className="inline mr-2"/> Logout</button>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavbarPage;
