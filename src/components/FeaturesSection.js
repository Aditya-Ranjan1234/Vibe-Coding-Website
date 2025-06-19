import React from 'react';
import '../App.css';

const FeaturesSection = () => {
  return (
    <section id="features" className="section features-section">
      <video className="features-bg" src="/Assets/features-services.mp4" autoPlay loop muted playsInline />
      <div className="features-content">
        <h2>Our Features</h2>
        <div className="features-cards">
          <img src="/Assets/cards.png" alt="Features Cards" className="features-cards-img" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 