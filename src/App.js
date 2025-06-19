import React, { useState } from 'react';
import './App.css';
import AnimatedLoader from './components/AnimatedLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import CarouselSection from './components/CarouselSection';
import SustainabilityDashboard from './components/SustainabilityDashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      {loading && <AnimatedLoader onFinish={() => setLoading(false)} />}
      <button
        className="mode-toggle"
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle dark/light mode"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <StatsSection />
      <CarouselSection />
      <SustainabilityDashboard />
    </div>
  );
}

export default App;
