import React, { useEffect, useState } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    quote: "This platform transformed our business reporting. The dashboards are beautiful and the AI insights are spot on!",
    name: "Amzigo",
    title: "UK Amazon Seller",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    logo: "WATCHEM"
  },
  {
    quote: "Forecasting and consolidations have never been easier. The interface is intuitive and the support is fantastic.",
    name: "Jane Smith",
    title: "CFO, FinTechPro",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    logo: "FinTechPro"
  },
  {
    quote: "We love the seamless integrations and the real-time insights. Highly recommended for any growing business!",
    name: "Carlos Rivera",
    title: "Operations, GlobalMart",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    logo: "GlobalMart"
  }
];

const ANIMATION_DURATION = 2200;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [headingPulse, setHeadingPulse] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeadingPulse(true), 1200);
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, ANIMATION_DURATION + 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section">
      <div className="testimonial-bg-gradient" />
      <div className="testimonial-bg-bokeh" />
      <div className="testimonial-content-wrapper">
        <p className="testimonial-sub-heading">● Customer Testimonials</p>
        <h2 className={`testimonial-main-heading${headingPulse ? ' pulsing' : ''}`}>
          <span className="happy">Happy</span> <span className="sellers">Sellers</span>
        </h2>
        <div className="testimonial-carousel">
          {testimonials.map((t, i) => (
            <div
              className={`testimonial-card${i === current ? ' current' : i < current ? ' prev' : ' next'}`}
              key={i}
            >
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-reviewer-info">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <span className="testimonial-reviewer">- {t.name} - {t.title}</span>
              </div>
              <div className="testimonial-logo">{t.logo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 