import React from 'react';
import '../App.css';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section testimonials-section">
      <video className="testimonials-bg" src="/Assets/testimonials.mp4" autoPlay loop muted playsInline />
      <div className="testimonials-content">
        <h2>What Our Customers Say</h2>
        <video className="customer-section-video" src="/Assets/customer-section.mp4" autoPlay loop muted playsInline />
      </div>
    </section>
  );
};

export default TestimonialsSection; 