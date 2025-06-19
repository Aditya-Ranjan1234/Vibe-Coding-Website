import React from 'react';
import './CustomerSection.css';

const CUSTOMERS = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
];

const CustomerSection = () => (
  <section className="customer-section">
    <div className="customer-header">
      <p className="sub-heading">OUR CUSTOMERS</p>
      <h2 className="main-heading">Join a community of the leading teams.</h2>
    </div>
    <div className="customer-logos-grid">
      {CUSTOMERS.map((customer, idx) => (
        <div className="logo-card" key={customer.name}>
          <div className="logo-card-hover-bg" />
          <img
            src={customer.logo}
            alt={customer.name + ' Logo'}
            className="logo grayscale"
            draggable="false"
          />
        </div>
      ))}
    </div>
    <div className="bottom-cta">
      <button className="view-partners-btn">
        VIEW ALL OUR PARTNERS <span className="arrow-icon">→</span>
      </button>
    </div>
  </section>
);

export default CustomerSection; 