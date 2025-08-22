import React from 'react';
import { HiShieldCheck, HiOutlineDownload, HiDesktopComputer, HiOutlineClipboardList, HiOutlineClock } from 'react-icons/hi';

// Sample product data with icons
const featuresList = [
  {
    id: 1,
    icon: <HiOutlineClock size={40} className="text-red-500" />,
    title: 'Speed',
    description: 'Get summaries in under 30 seconds',
  },
  {
    id: 2,
    icon: <HiOutlineClipboardList size={40} className="text-blue-500" />,
    title: 'Summerize',
    description: 'AI extracts key points automatically',
  },
  {
    id: 3,
    icon: <HiOutlineDownload size={40} className="text-green-500" />,
    title: 'Download',
    description: 'Save summaries as PDF files',
  },
  {
    id: 4,
    icon: <HiDesktopComputer size={40} className="text-pink-500" />,
    title: 'Sync',
    description: 'Watch video with timestamped summary',
  },
  {
    id: 5,
    icon: <HiShieldCheck size={40} className="text-orange-500" />,
    title: 'Free',
    description: 'All features completely free forever',
  },
];

const Features = () => {

  return (
    <section className="py-12 px-4 bg-gray-100 text-center">
      {/* Title and Subtitle */}
      <h2 className="text-3xl font-bold mt-8 mb-2">Features That Actually Matter</h2>
      <p className="text-gray-600 mb-10">No fluff, no limits, no cost. Just the tools you need to get instant video insights.</p>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
        {featuresList.map((feature) => (
          <div
            key={feature.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;