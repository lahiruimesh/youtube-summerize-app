import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black opacity-90 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo / Brand */}
        <h2 className="text-xl font-semibold text-white">YTHub</h2>
        

        {/* Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="mt-4 md:mt-0 text-sm text-gray-400">
          © {new Date().getFullYear()} YTHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
