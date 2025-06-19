import React from 'react';
import '../App.css';

const CarouselSection = () => {
  return (
    <section id="carousel" className="section carousel-section">
      <video className="carousel-bg" src="/Assets/caraousel switch.mp4" autoPlay loop muted playsInline />
      <div className="carousel-content">
        <h2>See More Effects</h2>
        <div className="carousel-effects">
          <video className="effect-video" src="/Assets/ripple effect.mp4" autoPlay loop muted playsInline />
          <video className="effect-video" src="/Assets/scroll and pop up.mp4" autoPlay loop muted playsInline />
        </div>
      </div>
    </section>
  );
};

export default CarouselSection; 