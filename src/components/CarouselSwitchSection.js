import React, { useState } from 'react';
import './CarouselSwitchSection.css';

const groups = [
  {
    badge: 'NEW',
    boxColor: 'linear-gradient(135deg, #DDA0DD 60%, #FFB6C1 100%)',
    bottles: ['#E0BBE4', '#F0B8D0', '#D390B0'],
    addToBag: true,
  },
  {
    badge: 'NEW',
    boxColor: 'linear-gradient(135deg, #B8860B 60%, #F5DEB3 100%)',
    bottles: ['#D2B48C', '#8B4513', '#F0F0F0'],
    addToBag: true,
  },
];

const CarouselSwitchSection = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % groups.length);
  const prev = () => setIndex((i) => (i - 1 + groups.length) % groups.length);

  return (
    <section className="carousel-switch-section">
      <div className="carousel-container">
        <button className="carousel-nav left" onClick={prev} aria-label="Previous">&#8592;</button>
        <div className="carousel-track" style={{ transform: `translateX(-${index * 50}%)` }}>
          {groups.map((group, i) => (
            <div
              className={`product-group${i === index ? ' active' : ' blurred'}`}
              key={i}
            >
              <div className="new-badge">{group.badge}</div>
              <div className="product-images">
                <div className="product-box" style={{ background: group.boxColor }} />
                {group.bottles.map((color, j) => (
                  <div className="product-bottle" style={{ background: color }} key={j} />
                ))}
              </div>
              <div className="add-to-bag">
                ADD TO BAG <span className="plus-icon">+</span>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-nav right" onClick={next} aria-label="Next">&#8594;</button>
      </div>
    </section>
  );
};

export default CarouselSwitchSection; 