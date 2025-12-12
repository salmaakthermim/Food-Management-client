"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const FooterPage = () => {
  return (
    <footer className="bg-black pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Column 1: Logo + About */}
        <div className="flex flex-col items-start">
          <img
            src="https://i.ibb.co.com/205rP86J/download-1.jpg"
            alt="Logo"
            className="w-16 h-16 object-cover rounded-full mb-4"
          />
          <p className="text-white">
            Foodie brings you the freshest organic meals and juices.  
            Delicious, healthy, and made with love.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col text-white">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Menu</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col text-white">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-green-600" /> 123 Green Street, Organic City
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaEnvelope className="" /> hello@foodie.com
          </p>
          <p className="flex items-center gap-2 mb-4">
            <FaPhone className="" /> +123 456 7890
          </p>
          <div className="flex space-x-4 mt-2 ">
            <a href="#"><FaFacebookF className=" transition" /></a>
            <a href="#"><FaTwitter className=" transition" /></a>
            <a href="#"><FaInstagram className="" /></a>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="flex flex-col text-white">
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-white mb-4">
            Subscribe to get the latest updates and offers directly in your inbox.
          </p>
          <form className="flex flex-col space-y-3">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="email"
                placeholder="Enter your email"
                className="pl-10 pr-4 py-2 w-full rounded-lg border  focus:outline-none focus:ring-2 "
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-white border-t border-gray-300 pt-6">
        &copy; {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterPage;
