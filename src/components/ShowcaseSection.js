import React from 'react';
import '../App.css';

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="section showcase-section">
      <video className="showcase-bg" src="/Assets/showcase work.mp4" autoPlay loop muted playsInline />
      <div className="showcase-content">
        <h2>Our Work</h2>
        <img src="/Assets/graph.png" alt="Showcase Graph" className="showcase-graph" />
      </div>
    </section>
  );
};

export default ShowcaseSection; 