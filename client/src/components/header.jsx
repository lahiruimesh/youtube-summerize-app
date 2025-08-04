import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-transparent z-10">
      {/* Left: Logo */}
      <div className="text-xl font-bold">MyLogo</div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex text-gray-900 font-bold gap-12 font-medium">
        <a href="#features" className="hover:text-blue-400 transition">Features</a>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
      </nav>

      {/* Right: Login */}
      <div>
        <button className="bg-red-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
