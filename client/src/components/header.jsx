import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/user', {
          withCredentials: true,
        });
        setUser(res.data);
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

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="relative w-full px-6 md:px-12 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="App Logo" className="h-6 w-auto" />
          </a>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex text-gray-700 font-medium gap-8">
          <a href="#features" className="hover:text-red-600 transition-colors duration-200">Features</a>
          <a href="#about" className="hover:text-red-600 transition-colors duration-200">About</a>
          <a href="#guide" className="hover:text-red-600 transition-colors duration-200">Guide</a>
          <a href="#contact" className="hover:text-red-600 transition-colors duration-200">Contact</a>
        </nav>

        {/* Right: Login/Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Profile Icon */}
              <button 
                onClick={goToDashboard} 
                className="text-2xl text-gray-700 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                title="Go to Dashboard"
              >
                <FaUserCircle />
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 px-4 py-2 rounded-lg font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="http://localhost:5000/auth/google">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 px-5 py-2.5 rounded-lg font-medium text-sm shadow-md hover:shadow-lg">
                Sign in with Google
              </button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
