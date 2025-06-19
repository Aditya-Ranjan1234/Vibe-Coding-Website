import React, { useEffect, useState } from 'react';
import './AnimatedLoader.css';

const NUM_BLOCKS = 6;
const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 20;
const ANIMATION_TIMINGS = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];

const AbstractVisual = () => (
  <div className="abstract-bg">
    {/* Simulate blurry tubes using divs and heavy blur */}
    <div className="tube tube1" />
    <div className="tube tube2" />
    <div className="tube tube3" />
    <div className="tube tube4" />
    <div className="tube tube5" />
  </div>
);

const AnimatedLoader = ({ onFinish }) => {
  const [phase, setPhase] = useState(0); // 0: blocks, 1: L, 2: wipe, 3: abstract
  const [blockStates, setBlockStates] = useState(Array(NUM_BLOCKS).fill('white'));
  const [animatedNum, setAnimatedNum] = useState(0);
  const [showNum, setShowNum] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showWipe, setShowWipe] = useState(false);

  useEffect(() => {
    let timeouts = [];
    // Phase 1: Block-based loader
    timeouts.push(setTimeout(() => {
      setBlockStates(['white', 'dark', 'dark', 'dark', 'dark', 'dark']);
      setShowNum(true);
    }, 0));
    timeouts.push(setTimeout(() => {
      setBlockStates(['dark', 'white', 'dark', 'dark', 'dark', 'dark']);
    }, 500));
    timeouts.push(setTimeout(() => {
      setBlockStates(['dark', 'dark', 'white', 'dark', 'dark', 'dark']);
    }, 1000));
    timeouts.push(setTimeout(() => {
      setBlockStates(['dark', 'dark', 'dark', 'white', 'dark', 'dark']);
    }, 1500));
    timeouts.push(setTimeout(() => {
      setBlockStates(['dark', 'dark', 'dark', 'dark', 'white', 'dark']);
      setShowNum(false);
    }, 2000));
    timeouts.push(setTimeout(() => {
      setBlockStates(['white', 'white', 'white', 'white', 'white', 'white']);
    }, 2500));
    timeouts.push(setTimeout(() => {
      setBlockStates(['l-vert', 'l-horiz', 'none', 'none', 'none', 'none']);
      setPhase(1); // L shape
    }, 3500));
    // Phase 2: Wipe
    timeouts.push(setTimeout(() => {
      setShowWipe(true);
      setPhase(2);
    }, 4000));
    // Phase 3: Abstract visual
    timeouts.push(setTimeout(() => {
      setPhase(3);
      setShowLoader(false);
      if (onFinish) onFinish();
    }, 4500));
    return () => timeouts.forEach(clearTimeout);
  }, [onFinish]);

  // Animated number logic
  useEffect(() => {
    if (!showNum) return;
    let start = null;
    let raf;
    const duration = 2000; // 2 seconds for the number animation
    function animateNum(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      let progress = Math.min(elapsed / duration, 1);
      setAnimatedNum(Math.floor(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(animateNum);
      } else {
        setAnimatedNum(100);
      }
    }
    raf = requestAnimationFrame(animateNum);
    return () => raf && cancelAnimationFrame(raf);
  }, [showNum]);

  return (
    <div className={`animated-loader${showLoader ? '' : ' hidden'}`}>
      {/* Phase 1: Block loader */}
      {phase === 0 && (
        <div className="block-loader">
          {blockStates.map((state, i) => (
            <div
              key={i}
              className={`block ${state}`}
              style={{ width: BLOCK_WIDTH, height: BLOCK_HEIGHT }}
            />
          ))}
        </div>
      )}
      {/* Phase 1: Animated number */}
      {showNum && (
        <div className="loader-num-text">{String(animatedNum).padStart(3, '0')}</div>
      )}
      {/* Phase 1/2: L shape */}
      {phase === 1 && (
        <div className="l-shape">
          <div className="l-vert" />
          <div className="l-horiz" />
        </div>
      )}
      {/* Phase 2: Wipe */}
      {showWipe && <div className="wipe" />}
      {/* Phase 3: Abstract visual */}
      {phase === 3 && <AbstractVisual />}
    </div>
  );
};

export default AnimatedLoader; 