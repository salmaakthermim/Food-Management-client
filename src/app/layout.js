// "use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";

import FooterPage from "./components/Footer/page";
import NavbarPage from "./components/Navbar/page";
import AuthProvider from "@/provider/AuthProvider";
import LanguageProvider from "@/provider/LanguageProvider";
// import { useEffect } from "react";
// import Aos from "aos";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Foodie — Delicious Food Delivered Fast",
  description: "Order fresh, organic meals and drinks delivered to your door in 30 minutes.",
};

export default function RootLayout({ children }) {

  //     useEffect(() => {
  //   Aos.init({
  //     duration: 900, // animation speed
  //     once: false,   // animation repeats on scroll
  //     easing: "ease-in-out",
  //   });
  // }, []);


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <NavbarPage />
            {children}
            <FooterPage />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
