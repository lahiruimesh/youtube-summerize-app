import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null); // null means not checked yet

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/user', {
          withCredentials: true, // Important for cookies
        });
        setUser(res.data); // res.data will be user object
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full px-12 py-4 flex justify-between items-center bg-transparent z-10">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <a href="/">
          <img src={logo} alt="App Logo" className="h-6 w-auto" />
        </a>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex text-gray-900 font-bold gap-12">
        <a href="#features" className="hover:text-blue-400 transition">Features</a>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      </nav>

      {/* Right: Login/Logout */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-800 transition px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <a href="http://localhost:5000/auth/google">
            <button className="bg-blue-600 text-white hover:bg-blue-800 transition px-4 py-2 rounded">
              Sign in with Google
            </button>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
