import React from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero3.png';

const Hero = () => {

    const navigate = useNavigate();

    const handleClickSummerize = () => {
        navigate('/summerize');
    };

    const handleClickDashboard = () => {
      navigate('/dashboard');
    };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image Rotated */}
      <img
        src={hero}
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-3xl ml-12 px-4">
        <h1 className="text-4xl md:text-5xl text-back font-bold mb-4">Turn Hours of <span className='text-red-600'>YouTube</span> Videos into Minutes of Key Insights</h1>
        <p className="text-lg md:text-xl text-gray-900 mb-6">Get AI-powered summaries of any YouTube video instantly. Save time,<br /> learn faster, and never miss the important points again.</p>
       
          <button
          onClick={handleClickSummerize}
          className="w-40 bg-[#ff0000] hover:bg-blue-700 transition px-6 py-2 rounded text-white">
            Get Started
          </button>

          
        
      </div>
    </section>
  );
};

export default Hero;
