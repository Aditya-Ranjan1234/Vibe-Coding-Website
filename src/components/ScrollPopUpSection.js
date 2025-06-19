import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const images = [
  '/Assets/cards.png', // lemon glass placeholder
  '/Assets/customer-section.mp4', // patterned clothing placeholder
  '/Assets/graph.png', // cat placeholder
];

const ScrollPopUpSection = () => {
  const [stage, setStage] = useState(0);
  const sectionRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const observers = sectionRefs.map((ref, idx) => {
      if (!ref.current) return null;
      return new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setStage(idx);
        },
        { threshold: 0.5 }
      );
    });
    sectionRefs.forEach((ref, idx) => {
      if (ref.current && observers[idx]) observers[idx].observe(ref.current);
    });
    return () => {
      observers.forEach((obs, idx) => {
        if (obs && sectionRefs[idx].current) obs.unobserve(sectionRefs[idx].current);
      });
    };
  }, []);

  return (
    <section className="scroll-popup-section">
      {/* Section 1: Initial fluid background, About Us, blurred image, blue pipe */}
      <div ref={sectionRefs[0]} className={`spu-section spu-initial${stage === 0 ? ' active' : ''}`}>
        <div className="spu-fluid-bg" />
        <div className="spu-content">
          <button className="spu-about-btn">ABOUT US</button>
          <img src="/Assets/stats.png" alt="Train Track" className="spu-blur-img" />
          <div className="spu-blue-pipe" />
        </div>
      </div>
      {/* Section 2: Full-screen video with play button */}
      <div ref={sectionRefs[1]} className={`spu-section spu-video${stage === 1 ? ' active' : ''}`}>
        <video className="spu-video-bg" src="/Assets/scroll and pop up.mp4" autoPlay loop muted playsInline />
        <div className="spu-play-btn"><span className="spu-play-icon">▶</span></div>
      </div>
      {/* Section 3: Play Reel with floral bg and text */}
      <div ref={sectionRefs[2]} className={`spu-section spu-play-reel${stage === 2 ? ' active' : ''}`}>
        <div className="spu-floral-bg" />
        <h2 className="spu-play-reel-text">PLAY <span className="spu-play-icon">▶</span> REEL</h2>
      </div>
      {/* Section 4: Red image grid with pop-up overlays */}
      <div ref={sectionRefs[3]} className={`spu-section spu-image-grid${stage === 3 ? ' active' : ''}`}>
        <div className="spu-image-grid">
          {images.map((src, i) => (
            <div className="spu-image-card" key={i}>
              <img src={src} alt={`img${i}`} className="spu-img" />
              <div className="spu-interactive-icons">
                <span className="spu-icon">⬆</span>
                <span className="spu-icon">📷</span>
                <span className="spu-icon">⚙</span>
                <span className="spu-icon">⇪</span>
                <span className="spu-plus">+</span>
              </div>
              <div className="spu-hover-overlay">
                <span className="spu-hover-icon">⬇</span>
                <span className="spu-hover-icon">⇪</span>
                <span className="spu-hover-icon">📷</span>
                <span className="spu-hover-icon">🔗</span>
              </div>
            </div>
          ))}
        </div>
        <div className="spu-featured-work-heading">Featured Work</div>
      </div>
    </section>
  );
};

export default ScrollPopUpSection; 