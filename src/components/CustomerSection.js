import React from 'react';
import './CustomerSection.css';

const CUSTOMERS = [
  { name: 'Google', logo: process.env.PUBLIC_URL + '/assets/google-logo.png' },
  { name: 'Microsoft', logo: process.env.PUBLIC_URL + '/assets/microsoft-logo.png' },
  { name: 'Amazon', logo: process.env.PUBLIC_URL + '/assets/amazon-logo.png' },
  { name: 'Facebook', logo: process.env.PUBLIC_URL + '/assets/facebook-logo.png' },
  { name: 'Netflix', logo: process.env.PUBLIC_URL + '/assets/netflix-logo.png' },
  { name: 'Uber', logo: process.env.PUBLIC_URL + '/assets/uber-logo.png' },
  { name: 'Airbnb', logo: process.env.PUBLIC_URL + '/assets/airbnb-logo.png' },
  { name: 'Spotify', logo: process.env.PUBLIC_URL + '/assets/spotify-logo.png' },
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
