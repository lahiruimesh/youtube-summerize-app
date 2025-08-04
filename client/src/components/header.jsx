import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full px-12 py-4 flex justify-between items-center bg-transparent z-10">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src={logo} alt="App Logo" className="h-6 w-auto" />
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex text-gray-900 font-bold gap-12">
        <a href="#features" className="hover:text-blue-400 transition">Features</a>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      </nav>

      {/* Right: Login */}
      <div>
        <button className="bg-[#ff0000] text-white hover:bg-blue-700 transition px-4 py-2 rounded">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
