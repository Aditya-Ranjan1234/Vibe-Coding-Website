import React, { useState } from 'react';
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import CarouselSection from './components/CarouselSection';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <StatsSection />
      <CarouselSection />
    </div>
  );
}

export default App;
