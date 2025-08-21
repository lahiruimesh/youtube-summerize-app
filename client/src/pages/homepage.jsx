import React from 'react';
import Hero from '../layouts/hero';
import Features from '../layouts/features';
import Guide from '../layouts/guide';

const Homepage = () => {
    return(
        <div>
            <section id="hero">
                <Hero />
            </section>
            <section id="features">
                <Features />
            </section>
            <section id="guide">
                <Guide />
            </section>
            <section id="about" className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">About YTHub</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        YTHub is an AI-powered platform that transforms how you consume YouTube content. 
                        Our advanced technology extracts key insights from video transcripts, saving you hours 
                        of watching time while ensuring you never miss the important points.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
                            <p className="text-gray-600">Advanced machine learning algorithms provide accurate and comprehensive summaries.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving</h3>
                            <p className="text-gray-600">Get the essence of hours-long videos in just minutes, not hours.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Friendly</h3>
                            <p className="text-gray-600">Simple interface designed for everyone, from students to professionals.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;