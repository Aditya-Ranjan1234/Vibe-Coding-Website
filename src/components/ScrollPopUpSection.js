import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const ScrollPopUpSection = () => {
  const [stage, setStage] = useState(0);
  const sectionRefs = [useRef(), useRef(), useRef(), useRef()];
  const mainVideoRef = useRef(null);
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [showUnmuteBtn, setShowUnmuteBtn] = useState(false);

  useEffect(() => {
    // Intersection Observer for main video autoplay
    const mainVideo = mainVideoRef.current;
    if (!mainVideo) return;
    const handlePlay = () => {
      setShowPlayBtn(false);
      setShowUnmuteBtn(true);
    };
    const handlePause = () => {
      setShowPlayBtn(true);
      setShowUnmuteBtn(false);
    };
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            mainVideo.play().then(() => {
              handlePlay();
            }).catch(() => {
              setShowPlayBtn(true);
            });
          } else {
            mainVideo.pause();
            handlePause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(mainVideo);
    // Unmute logic
    const unmuteHandler = () => {
      mainVideo.muted = false;
      mainVideo.volume = 1;
      setShowUnmuteBtn(false);
    };
    // Play overlay logic
    const playHandler = () => {
      mainVideo.play();
      setShowPlayBtn(false);
      setShowUnmuteBtn(true);
    };
    // Attach event listeners
    const unmuteBtn = document.getElementById('mainUnmuteBtn');
    const playBtn = document.getElementById('mainPlayBtn');
    if (unmuteBtn) unmuteBtn.onclick = unmuteHandler;
    if (playBtn) playBtn.onclick = playHandler;
    return () => {
      observer.disconnect();
      if (unmuteBtn) unmuteBtn.onclick = null;
      if (playBtn) playBtn.onclick = null;
    };
  }, []);

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
      {/* Section 2: Full-screen video with play button and unmute */}
      <div ref={sectionRefs[1]} className={`spu-section spu-video${stage === 1 ? ' active' : ''}`} style={{position: 'relative'}}>
        <video
          ref={mainVideoRef}
          id="mainVideo"
          src="/assets/scroll-and-pop-up.mp4"
          loop
          muted
          playsInline
          preload="metadata"
          className="spu-main-video"
          style={{ width: '100%', maxHeight: '60vh', borderRadius: '16px', background: '#000' }}
        />
        {showPlayBtn && (
          <div className="spu-play-btn-overlay" id="mainPlayBtn" style={{position: 'absolute', top:0, left:0, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2, background:'rgba(0,0,0,0.2)', fontSize:'4rem', color:'#fff', cursor:'pointer'}}>
            <span className="spu-play-icon">▶</span>
          </div>
        )}
        {showUnmuteBtn && (
          <button className="spu-unmute-btn" id="mainUnmuteBtn" style={{position:'absolute', bottom:'2rem', right:'2rem', zIndex:3, fontSize:'2rem', background:'#fff', border:'none', borderRadius:'50%', padding:'0.5rem 0.7rem', cursor:'pointer'}}>🔊</button>
        )}
      </div>
      {/* Section 3: Play Reel with floral bg and text */}
      <div ref={sectionRefs[2]} className={`spu-section spu-play-reel${stage === 2 ? ' active' : ''}`}>
        <div className="spu-floral-bg" />
        <h2 className="spu-play-reel-text">PLAY <span className="spu-play-icon">▶</span> REEL</h2>
        <div className="spu-reels-row" style={{ display: 'flex', gap: '24px', marginTop: '24px', overflowX: 'auto', padding: '8px 0' }}>
          <video src="/assets/reel1.mp4" controls playsInline preload="metadata" autoPlay muted loop style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
          <video src="/assets/reel2.mp4" controls playsInline preload="metadata" autoPlay muted loop style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
          <video src="/assets/reel3.mp4" controls playsInline preload="metadata" autoPlay muted loop style={{ width: '320px', borderRadius: '12px', background: '#000' }} />
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