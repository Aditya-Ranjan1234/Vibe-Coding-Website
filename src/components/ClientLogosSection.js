import React from 'react';
import './ClientLogosSection.css'; // Create this CSS file next

const logos = [
  { name: 'Airbnb', filename: 'airbnb-logo.png' },
  { name: 'Amazon', filename: 'amazon-logo.png' },
  { name: 'Facebook', filename: 'facebook-logo.png' },
  { name: 'Google', filename: 'google-logo.png' },
  { name: 'Microsoft', filename: 'microsoft-logo.png' },
  { name: 'Netflix', filename: 'netflix-logo.png' },
  { name: 'Spotify', filename: 'spotify-logo.png' },
  { name: 'Uber', filename: 'uber-logo.png' }
];

const ClientLogosSection = () => {
  return (
    <section className="client-logos-section" id="client-logos">
      <h2>Trusted By Leading Companies</h2>
      <div className="logos-container">
        {logos.map(logo => (
          <img
            key={logo.name}
            src={`assets/${logo.filename}`}
            alt={`${logo.name} Logo`}
            className="client-logo-img"
          />
        ))}
      </div>
    </section>
  );
};

export default ClientLogosSection;
