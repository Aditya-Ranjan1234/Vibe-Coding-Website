import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const backgroundIndoor = '/Assets/customer-section.mp4'; // Placeholder for indoor scene
const backgroundOutdoor = '/Assets/graph.png'; // Placeholder for outdoor scene (use an image for now)
const swingVideo = '/Assets/parallax animation.mp4'; // Placeholder for girl on swing
const thumbnails = [
  '/Assets/cards.png',
  '/Assets/stats.png',
  '/Assets/graph.png',
  '/Assets/showcase work.mp4',
];

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
          <video className="parallax-bg-indoor" src={backgroundIndoor} autoPlay loop muted playsInline />
          <img className="parallax-bg-outdoor" src={backgroundOutdoor} alt="Outdoor scene" />
        </div>
      </div>
      {/* Foreground Hero Content */}
      <div className={`parallax-hero-content${infoVisible ? ' out' : ''}`} ref={heroRef}>
        <div className="vision-pro-display">
          <video className="vision-pro-video" src={swingVideo} autoPlay loop muted playsInline />
          <div className="vision-pro-location-info">
            <span>Los Angeles</span>
            <span>May 1 1:56 PM</span>
          </div>
          <div className="vision-pro-thumbnails">
            {thumbnails.map((src, i) => (
              <img src={src} alt="thumb" key={i} className="vision-pro-thumb" />
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