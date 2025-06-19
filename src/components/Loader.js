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
      <div style={{height: '80px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>Loading...</div>
    </div>
  );
};

export default Loader; 