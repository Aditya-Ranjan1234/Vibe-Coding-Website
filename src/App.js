import React, { useState } from 'react';
import './App.css';
import AnimatedLoader from './components/AnimatedLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StrikingFeaturesSection from './components/StrikingFeaturesSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CustomerSection from './components/CustomerSection';
import CarouselSwitchSection from './components/CarouselSwitchSection';
import ShowcaseSection from './components/ShowcaseSection';
import StatsSection from './components/StatsSection';
import CarouselSection from './components/CarouselSection';
import SustainabilityDashboard from './components/SustainabilityDashboard';
import ParallaxSection from './components/ParallaxSection';
import RippleEffectSection from './components/RippleEffectSection';
import ScrollPopUpSection from './components/ScrollPopUpSection';
import CardsSection from './components/CardsSection';
import GraphSection from './components/GraphSection';

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
      <ParallaxSection />
      <StrikingFeaturesSection />
      <FeaturesSection />
      <RippleEffectSection />
      <CardsSection />
      <GraphSection />
      <StatsSection />
      <ScrollPopUpSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CustomerSection />
      <CarouselSwitchSection />
      <CarouselSection />
      <SustainabilityDashboard />
    </div>
  );
}

export default App;
