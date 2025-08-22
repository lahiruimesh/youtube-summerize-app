import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import api from '../utils/api';

const Header = () => {
  const [user, setUser] = useState(null); 
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/user');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    
    fetchUser();
    
    // Check authentication status every 30 seconds
    const interval = setInterval(fetchUser, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
      setMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 bg-white/20 backdrop-blur-sm z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="App Logo" className="h-7 w-auto" />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex text-black font-medium gap-8 drop-shadow-sm">
          <a href="#features" className="hover:text-red-400 transition-colors duration-200">Features</a>
          <a href="#about" className="hover:text-red-400 transition-colors duration-200">About</a>
          <a href="#guide" className="hover:text-red-400 transition-colors duration-200">Guide</a>
          <a href="#contact" className="hover:text-red-400 transition-colors duration-200">Contact</a>
        </nav>

        {/* Desktop User/Login */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <button 
                onClick={goToDashboard} 
                className="text-2xl text-black hover:text-red-400 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
                title="Go to Dashboard"
              >
                <FaUserCircle />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 px-4 py-2 rounded-lg font-medium text-sm shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <a href={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/auth/google`}>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 px-5 py-2.5 rounded-lg font-medium text-sm shadow-md hover:shadow-lg">
                Sign in with Google
              </button>
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-black p-2 rounded-md hover:bg-white/10 transition">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl py-4 px-6 absolute right-6 left-6 z-40 flex flex-col gap-3">
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-red-400 font-medium">Features</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-red-400 font-medium">About</a>
          <a href="#guide" onClick={() => setMenuOpen(false)} className="hover:text-red-400 font-medium">Guide</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-red-400 font-medium">Contact</a>

          {user ? (
            <div className="flex flex-col gap-2 mt-2">
              <button onClick={goToDashboard} className="flex items-center gap-2 px-4 py-2 text-black hover:text-red-400 rounded-lg hover:bg-white/10 transition">
                <FaUserCircle /> Dashboard
              </button>
              <button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition">
                Logout
              </button>
            </div>
          ) : (
            <a href={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/auth/google`}>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all px-4 py-2 rounded-lg w-full">
                Sign in with Google
              </button>
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
