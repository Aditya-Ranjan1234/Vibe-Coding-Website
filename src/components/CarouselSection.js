import React from 'react';
import '../App.css';

const CarouselSection = () => {
  return (
    <section id="carousel" className="section carousel-section">
      <div className="carousel-content">
        <h2>See More Effects</h2>
        <div className="carousel-effects">
          <div style={{height: '80px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>No Video</div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection; 