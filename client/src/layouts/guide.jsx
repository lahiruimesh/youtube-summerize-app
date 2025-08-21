import React from 'react';
import { HiOutlinePlay, HiOutlineClipboardList, HiOutlineDownload, HiOutlineCheckCircle, HiOutlineClock, HiOutlineUser, HiOutlineGlobe } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Guide = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/summerize');
    }

  const steps = [
    {
      id: 1,
      icon: <HiOutlinePlay size={40} className="text-red-500" />,
      title: 'Paste YouTube URL',
      description: 'Copy any YouTube video link and paste it into the input field above.',
      details: 'Simply right-click on any YouTube video and select "Copy video URL" or "Copy link address".'
    },
    {
      id: 2,
      icon: <HiOutlineClock size={40} className="text-blue-500" />,
      title: 'Wait for Processing',
      description: 'Our AI analyzes the video content and extracts key information automatically.',
      details: 'Processing typically takes 15-30 seconds depending on video length. Longer videos may take a bit more time.'
    },
    {
      id: 3,
      icon: <HiOutlineClipboardList size={40} className="text-green-500" />,
      title: 'Review Summary',
      description: 'Get a comprehensive summary with main points, key insights, and timestamps.',
      details: 'The summary includes bullet points of main topics, important quotes, and relevant timestamps for easy navigation.'
    },
    {
      id: 4,
      icon: <HiOutlineDownload size={40} className="text-purple-500" />,
      title: 'Download & Share',
      description: 'Save your summary as PDF or copy text to share with others.',
      details: 'Click the download button to save as PDF, or use the copy button to paste the summary anywhere you need.'
    }
  ];

  const tips = [
    {
      icon: <HiOutlineUser size={24} className="text-orange-500" />,
      text: 'Works with any public YouTube video - no account required'
    },
    {
      icon: <HiOutlineGlobe size={24} className="text-blue-500" />,
      text: 'Supports videos in multiple languages'
    },
    {
      icon: <HiOutlineCheckCircle size={24} className="text-green-500" />,
      text: '100% free with no usage limits'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            How to Use YouTube Summarizer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just 4 simple steps. Our AI-powered tool makes it easy to extract 
            key insights from any YouTube video in seconds.
          </p>
        </div>

        {/* Step-by-Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {step.id}
              </div>
              
              {/* Step Card */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 pt-8 text-center hover:border-red-300 hover:shadow-lg transition-all duration-300 h-full">
                <div className="mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {step.details}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">
            Pro Tips & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  {tip.icon}
                </div>
                <p className="text-gray-700 font-medium">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Try it now with any YouTube video and see the magic happen!
          </p>
          <button 
          onClick={handleClick}
          className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Start Summarizing
          </button>
        </div>
      </div>
    </section>
  );
};

export default Guide;