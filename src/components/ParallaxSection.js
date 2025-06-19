import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const ParallaxSection = () => {
  const bgRef = useRef();
  const heroRef = useRef();
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.5) {
          setInfoVisible(true);
        } else {
          setInfoVisible(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="parallax-section">
      {/* Parallax Background */}
      <div className="parallax-bg" ref={bgRef}>
        <div className="parallax-bg-split">
          <video
            src="Assets/parallax animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ flex: 1, width: '100%', height: '100%', objectFit: 'cover', minHeight: '120px', background: '#000', borderRadius: '0' }}
          />
          <img
            src="/assets/parallax-image.jpg"
            alt="Parallax Visual"
            style={{ flex: 1, width: '100%', height: '100%', objectFit: 'cover', minHeight: '120px', background: '#f4f4f4', borderRadius: '0' }}
          />
        </div>
      </div>
      {/* Foreground Hero Content */}
      <div className={`parallax-hero-content${infoVisible ? ' out' : ''}`} ref={heroRef}>
        <div className="vision-pro-display">
          <img
            src="/assets/parallax-image.jpg"
            alt="Parallax Thumbnail"
            style={{ height: '80px', width: '100%', objectFit: 'cover', borderRadius: '8px', background: '#eee' }}
          />
          <div className="vision-pro-location-info">
            <span>Los Angeles</span>
            <span>May 1 1:56 PM</span>
          </div>
          <div className="vision-pro-thumbnails">
            {[1,2,3,4].map((_, i) => (
              <img
                key={i}
                src="/assets/parallax-image.jpg"
                alt={`Thumbnail ${i+1}`}
                style={{ width: '40px', height: '30px', background: '#eee', margin: '0 4px', display: 'inline-block', objectFit: 'cover', borderRadius: '4px' }}
              />
            ))}
          </div>
        </div>
        <div className="parallax-main-text">
          <p className="parallax-sub-heading">Connection</p>
          <h1>Share quality time.<br />And space.</h1>
        </div>
      </div>
      {/* Info Section (scroll-triggered) */}
      <div className={`parallax-info-section${infoVisible ? ' visible' : ''}`}>
        <div className="parallax-info-left">
          <h2>A more engaging way<br />to get together.</h2>
        </div>
        <div className="parallax-info-right">
          <p>Apple Vision Pro makes it easy to collaborate and connect wherever you are. You can see FaceTime participants in life-size video tiles, or you can choose to use your spatial Persona and feel like you are sharing the same space with others. And use SharePlay to watch, listen, and play together with your favorite people.</p>
          <button className="parallax-cta-btn">
            <span className="parallax-cta-plus">+</span> Learn more about connection
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection; 