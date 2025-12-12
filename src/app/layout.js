// "use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";

import FooterPage from "./components/Footer/page";
import NavbarPage from "./components/Navbar/page";
import AuthProvider from "@/provider/AuthProvider";
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
  title: "Learning Next.JS",
  description: "Trying to Learn NextJS as best as we can",
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
        <AuthProvider>
          <NavbarPage />
          {children}
          <FooterPage />
        </AuthProvider>
      </body>
    </html>
  );
}
