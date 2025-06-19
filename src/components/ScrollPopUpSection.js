import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

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
          <div className="spu-blue-pipe" />
        </div>
      </div>
      {/* Section 2: Full-screen video with play button */}
      <div ref={sectionRefs[1]} className={`spu-section spu-video${stage === 1 ? ' active' : ''}`}>
        <video
          className="spu-main-video"
          src="/assets/scroll-and-pop-up.mp4"
          controls
          playsInline
          preload="metadata"
          style={{ width: '100%', maxHeight: '60vh', borderRadius: '16px', background: '#000' }}
        />
      </div>
      {/* Section 3: Play Reel with floral bg and text */}
      <div ref={sectionRefs[2]} className={`spu-section spu-play-reel${stage === 2 ? ' active' : ''}`}>
        <div className="spu-floral-bg" />
        <h2 className="spu-play-reel-text">PLAY <span className="spu-play-icon">▶</span> REEL</h2>
        <div className="spu-reels-row" style={{ display: 'flex', gap: '24px', marginTop: '24px', overflowX: 'auto', padding: '8px 0' }}>
          <video src="/assets/reel1.mp4" controls playsInline preload="metadata" style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
          <video src="/assets/reel2.mp4" controls playsInline preload="metadata" style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
          <video src="/assets/reel3.mp4" controls playsInline preload="metadata" style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
        </div>
      </div>
      {/* Section 4: Red image grid with pop-up overlays */}
      <div className="spu-image-grid">
        <div className="spu-image-card">
          <div className="spu-img" style={{height: '80px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>No Image</div>
        </div>
      </div>
      <div className="spu-featured-work-heading">Featured Work</div>
    </section>
  );
};

export default ScrollPopUpSection; 