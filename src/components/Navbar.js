import React, { useState } from 'react';
import '../App.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => setOpen(!open);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Vibe Coding</div>
      <div className={`navbar-links${open ? ' open' : ''}`}>
        <button onClick={() => scrollToSection('home')}>Home</button>
        <button onClick={() => scrollToSection('features')}>Features</button>
        <button onClick={() => scrollToSection('showcase')}>Showcase</button>
        <button onClick={() => scrollToSection('testimonials')}>Testimonials</button>
        <button onClick={() => scrollToSection('stats')}>Stats</button>
        <button onClick={() => scrollToSection('carousel')}>Carousel</button>
      </div>
      <div className="navbar-toggle" onClick={handleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar; 