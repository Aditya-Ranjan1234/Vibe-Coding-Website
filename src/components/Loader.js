import React, { useEffect, useState } from 'react';
import '../App.css';

const Loader = ({ onLoaded }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      if (onLoaded) onLoaded();
    }, 3000); // Show loader for 3 seconds
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className={`loader-overlay${hidden ? ' hidden' : ''}`}>
      <video src="/Assets/loader.mp4" autoPlay loop muted className="loader-video" />
    </div>
  );
};

export default Loader; 