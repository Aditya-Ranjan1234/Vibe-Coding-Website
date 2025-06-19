import React from 'react';
import '../App.css';

const HeroSection = () => {
  return (
    <section id="home" className="section hero-section">
      <video className="hero-bg" src="/Assets/homepage.mp4" autoPlay loop muted playsInline />
      <div className="hero-content">
        <h1>Welcome to Vibe Coding</h1>
        <p>Unleash creativity with stunning web experiences</p>
      </div>
    </section>
  );
};

export default HeroSection; 