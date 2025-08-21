import React from 'react';
import Hero from '../layouts/hero';
import Features from '../layouts/features';
import Guide from '../layouts/guide';

const Homepage = () => {
    return(
        <div>
            <Hero />
            <Features />
            <Guide />
        </div>
    );
};

export default Homepage;