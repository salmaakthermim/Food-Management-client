"use client";
import Link from "next/link";
import NotificationBell from "@/app/components/NotificationBell";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, User, LogOut, LayoutDashboard,
  Bike, ShoppingCart, ChevronDown, Home,
  UtensilsCrossed, BookOpen, Info, Phone
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const NavbarPage = () => {
  const { user, dbUser } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts?email=${user.email}`)
      .then(r => r.json())
      .then(data => setCartCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
  }, [user]);

  const handleLogout = () => {
    signOut(auth).then(() => router.push("/login"));
  };

  const navLinks = [
    { name: "Home",     path: "/",          icon: Home },
    { name: "Menu",     path: "/menu",       icon: UtensilsCrossed },
    { name: "All Food", path: "/AllFood",    icon: BookOpen },
    { name: "About Us", path: "/AboutUs",    icon: Info },
    { name: "Contact",  path: "/ContactUs",  icon: Phone },
  ];

  const avatar = dbUser?.photo || user?.photoURL
    || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

  const dropdownLinks = [
    { href: "/Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile",   icon: User,            label: "My Profile" },
    { href: "/carts",     icon: ShoppingCart,    label: "My Cart" },
    ...(role === "admin" || role === "delivery"
      ? [{ href: "/delivery", icon: Bike, label: "Delivery Panel" }]
      : []),
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100"
          : "bg-white/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <motion.img
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src="https://i.ibb.co.com/205rP86J/download-1.jpg"
                className="w-10 h-10 rounded-xl object-cover shadow-md"
                alt="Foodie"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Foodie</span>
              <span className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Delicious</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all group ${
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <link.icon size={15} className={isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-indigo-400"} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {user && (
              <Link href="/carts"
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 text-gray-600 hover:text-indigo-600 transition-all"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-indigo-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            {user && <NotificationBell />}

            {!user ? (
              <div className="flex items-center gap-2 ml-1">
                <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 transition">Login</Link>
                <Link href="/Register">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition-all">
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="relative ml-1" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <img src={avatar} alt="avatar" className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-100" />
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-bold text-gray-800 leading-none">{user?.displayName?.split(" ")[0] || "User"}</p>
                    <p className="text-[10px] text-gray-400 font-medium capitalize">{role || "customer"}</p>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img src={avatar} className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow" />
                          <div className="overflow-hidden">
                            <p className="font-black text-gray-900 truncate">{user?.displayName || "User"}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                              {role || "customer"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {dropdownLinks.map(item => (
                          <Link key={item.href} href={item.href} onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all group">
                            <item.icon size={16} className="text-gray-400 group-hover:text-indigo-500 transition" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-100">
                        <button onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="lg:hidden flex items-center gap-2">
            {user && (
              <Link href="/carts" className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 transition">
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-indigo-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            )}
            {user && <NotificationBell />}
            <button onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 transition">
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link key={link.name} href={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                    }`}>
                    <link.icon size={18} className={isActive ? "text-indigo-500" : "text-gray-400"} />
                    {link.name}
                  </Link>
                );
              })}

              {!user ? (
                <div className="flex gap-2 pt-2">
                  <Link href="/login" className="flex-1 py-3 text-center font-bold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition">Login</Link>
                  <Link href="/Register" className="flex-1 py-3 text-center font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md transition">Sign Up</Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 rounded-xl mt-2">
                    <img src={avatar} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{user?.displayName || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="pt-1 space-y-1">
                    {dropdownLinks.map(item => (
                      <Link key={item.href} href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition">
                        <item.icon size={18} className="text-gray-400" /> {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarPage;
