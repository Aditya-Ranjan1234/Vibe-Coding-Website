import React, { useState } from 'react';
import '../App.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => setOpen(!open);

  const scrollToSection = (id) => {
    const section = document.querySelector(`[id='${id}']`);
    if (section) {
      const navbar = document.querySelector('.navbar.navbar-big');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-big">
      <div className="navbar-logo navbar-logo-big">Vibe Coding</div>
      <div className={`navbar-links${open ? ' open' : ''} navbar-links-big`}>
        <button className="navbar-btn" onClick={() => scrollToSection('home')}>Home</button>
        <button className="navbar-btn" onClick={() => scrollToSection('parallax')}>Parallax</button>
        <button className="navbar-btn" onClick={() => scrollToSection('striking')}>Striking Features</button>
        <button className="navbar-btn" onClick={() => scrollToSection('features')}>Features</button>
        <button className="navbar-btn" onClick={() => scrollToSection('ripple')}>Ripple Effect</button>
        <button className="navbar-btn" onClick={() => scrollToSection('cards')}>Cards</button>
        <button className="navbar-btn" onClick={() => scrollToSection('graph')}>Graph</button>
        <button className="navbar-btn" onClick={() => scrollToSection('stats')}>Stats</button>
        <button className="navbar-btn" onClick={() => scrollToSection('scrollpopup')}>Scroll PopUp</button>
        <button className="navbar-btn" onClick={() => scrollToSection('showcase')}>Showcase</button>
        <button className="navbar-btn" onClick={() => scrollToSection('testimonials')}>Testimonials</button>
        <button className="navbar-btn" onClick={() => scrollToSection('customers')}>Customers</button>
        <button className="navbar-btn" onClick={() => scrollToSection('carouselswitch')}>Carousel Switch</button>
        <button className="navbar-btn" onClick={() => scrollToSection('sustainability')}>Sustainability</button>
      </div>
      <div className="navbar-toggle navbar-toggle-big" onClick={handleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar; 