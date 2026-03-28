<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import InsightSection from './components/InsightSection';
import ExploreSection from './components/ExploreSection';
import ConclusionSection from './components/ConclusionSection';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load sequence
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      {loading ? (
        <Loader />
      ) : (
        <ReactLenis root>
          <div className="relative w-full bg-background min-h-screen">
            <HeroSection />
            <IntroSection />
            <InsightSection />
            <ExploreSection />
            <ConclusionSection />
          </div>
        </ReactLenis>
      )}
    </>
  );
}

export default App;

=======
import React from 'react'
import HyperloopStory from './HyperloopStory'
import './index.css' // We might not need this if not existing, but vite creates it. We will keep what we need.

function App() {
  return (
    <>
      <HyperloopStory />
    </>
  )
}

export default App
>>>>>>> 9d25d099781053e242dc412cb1af4fb8fba13ef4
