import React from 'react';

const About = () => {
    return(
        <section id="about" className="py-16 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto text-center mt-8 mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">About YTHub</h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      YTHub helps you save time by turning long YouTube videos into easy-to-read summaries. 
      Quickly grasp the key points and focus on what matters most.
    </p>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Summaries</h3>
        <p className="text-gray-600">Understand the main points of videos in minutes instead of hours.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Accurate Insights</h3>
        <p className="text-gray-600">Focus on the important content without watching the entire video.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy to Use</h3>
        <p className="text-gray-600">Simple and intuitive interface designed for everyone.</p>
      </div>
    </div>
  </div>
</section>
    );
}

export default About;