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
      <div className='section-label'>Hero Section</div>
      <HeroSection id="home" />
      <div className='section-label'>Parallax Section</div>
      <ParallaxSection id="parallax" />
      <div className='section-label'>Striking Features Section</div>
      <StrikingFeaturesSection id="striking" />
      <div className='section-label'>Features Section</div>
      <FeaturesSection id="features" />
      <div className='section-label'>Ripple Effect Section</div>
      <RippleEffectSection id="ripple" />
      <div className='section-label'>Cards Section</div>
      <CardsSection id="cards" />
      <div className='section-label'>Graph Section</div>
      <GraphSection id="graph" />
      <div className='section-label'>Stats Section</div>
      <StatsSection id="stats" />
      <div className='section-label'>Showcase Section</div>
      <ShowcaseSection id="showcase" />
      <div className='section-label'>Testimonials Section</div>
      <TestimonialsSection id="testimonials" />
      <div className='section-label'>Customer Section</div>
      <CustomerSection id="customers" />
      <div className='section-label'>Carousel Switch Section</div>
      <CarouselSwitchSection id="carouselswitch" />
      <div className='section-label'>Scroll PopUp Section</div>
      <ScrollPopUpSection id="scrollpopup" />
      <div className='section-label'>Sustainability Dashboard</div>
      <SustainabilityDashboard id="sustainability" />
    </div>
  );
}

export default App;
