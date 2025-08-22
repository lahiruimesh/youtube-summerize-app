import React from "react";
import { HiOutlineMail, HiOutlineGlobe, HiOutlineHeart } from "react-icons/hi";
import logo from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="App Logo" className="h-8 w-auto" />
          </a>
        </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Transform your YouTube experience with AI-powered video summaries. 
              Save time, learn faster, and never miss the important points again.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-400">
              <HiOutlineHeart className="text-red-500 mr-2" />
              <span>Made with love for content creators and learners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#guide" className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  How to Use
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/summerize" className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  Start Summarizing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@ythub.com" className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  <HiOutlineMail className="mr-2" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                  <HiOutlineGlobe className="mr-2" />
                  Privacy Policy
                </a>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-xs font-bold">F</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-xs font-bold">G</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-xs font-bold">I</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} YTHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
