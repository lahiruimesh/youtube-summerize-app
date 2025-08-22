import React from 'react';
import Hero from '../layouts/hero';
import Features from '../layouts/features';
import Guide from '../layouts/guide';
import About from '../layouts/about';

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
            <section id="about">
                <About />
            </section>
        </div>
    );
};

export default Homepage;