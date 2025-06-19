import React, { useState } from 'react';
import '../App.css';

const BRANDS = [
  {
    name: 'ECorp',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="#1DE9B6" /><rect x="8" y="8" width="14" height="14" rx="4" fill="#fff" /></svg>
    ),
    key: 'ecorp',
  },
  {
    name: 'ICorp',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30"><rect x="4" y="4" width="22" height="22" rx="7" fill="#FF9800" /><circle cx="15" cy="15" r="7" fill="#fff" /></svg>
    ),
    key: 'icorp',
  },
  {
    name: 'The Agency',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30"><polygon points="15,4 28,26 2,26" fill="#F44336" /><circle cx="15" cy="18" r="6" fill="#fff" /></svg>
    ),
    key: 'theagency',
  },
];

const CardsSection = () => {
  const [selected, setSelected] = useState('theagency');

  return (
    <section className="brand-kits-section">
      <div className="brand-kits-container">
        <h2 className="brand-kits-header">Brand Kits</h2>
        <div className="card-list">
          {BRANDS.map((brand) => (
            <div
              className={`brand-kit-card${selected === brand.key ? ' selected' : ''}`}
              key={brand.key}
              onClick={() => setSelected(brand.key)}
            >
              <div className={`checkbox${selected === brand.key ? ' checkmark' : ''}`}
                tabIndex={0}
                aria-checked={selected === brand.key}
                role="checkbox"
                onClick={e => { e.stopPropagation(); setSelected(brand.key); }}
              >
                {selected === brand.key && (
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <polyline points="3,10 8,15 15,4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
                    <defs>
                      <filter id="glow">
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#800080" />
                      </filter>
                    </defs>
                  </svg>
                )}
              </div>
              <div className={`brand-icon ${brand.key}-icon`}>{brand.icon}</div>
              <span className="brand-name">{brand.name}</span>
              <button className="settings-icon" tabIndex={0} aria-label={`Settings for ${brand.name}`}
                onClick={e => { e.stopPropagation(); /* open settings modal */ }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22"><g stroke="#fff" strokeWidth="2" fill="none"><rect x="3" y="9" width="16" height="4" rx="2" /><circle cx="7" cy="11" r="2" /><circle cx="15" cy="11" r="2" /></g></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection; 