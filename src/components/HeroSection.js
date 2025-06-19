import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const HIGHLIGHTS = [
  { word: 'reports', widget: 'expenses', duration: 4000 },
  { word: 'forecasts', widget: 'income', duration: 3000 },
  { word: 'dashboards', widget: 'cash', duration: 4000 },
  { word: 'consolidations', widget: 'consolidations', duration: 4000 },
];

const platformLogos = [
  { name: 'Capterra', svg: <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#fff" opacity="0.7" /></svg> },
  { name: 'G2', svg: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="4" fill="#fff" opacity="0.7" /></svg> },
  { name: 'Xero', svg: <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="9" ry="7" fill="#fff" opacity="0.7" /></svg> },
  { name: 'Quickbooks', svg: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" rx="6" fill="#fff" opacity="0.7" /></svg> },
];

function useHighlightCycle() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % HIGHLIGHTS.length);
    }, HIGHLIGHTS[index].duration);
    return () => clearTimeout(timeout);
  }, [index]);
  return [index, HIGHLIGHTS[index]];
}

const HeroSection = () => {
  const [highlightIndex, highlight] = useHighlightCycle();
  const [showHealth, setShowHealth] = useState(false);
  useEffect(() => {
    if (highlight.word === 'forecasts') {
      setTimeout(() => setShowHealth(true), 1200);
    }
  }, [highlight.word]);

  return (
    <section className="hero-section">
      {/* Background gradient and blobs */}
      <div className="hero-bg-gradient" />
      <div className="hero-bg-blob blob1" />
      <div className="hero-bg-blob blob2" />
      <div className="hero-bg-blob blob3" />
      <div className="hero-bg-blob blob4" />
      <div className="hero-bg-blob red-blob" />
      {/* Faint widgets as background */}
      <div className="hero-bg-widget widget1" />
      <div className="hero-bg-widget widget2" />
      <div className="hero-bg-widget widget3" />

      {/* Top bar with ratings */}
      <div className="hero-top-bar">
        <span className="star-icon">★</span>
        <span className="rating-text">4.8 rating on</span>
        {platformLogos.map((logo, i) => (
          <span className="platform-logo" key={logo.name} title={logo.name}>{logo.svg}</span>
        ))}
      </div>

      {/* Main content */}
      <div className="hero-main-content">
        <h1>
          Create{' '}
          <span className={`highlight-text${highlight.word === 'reports' ? ' active' : ''}`}>reports</span>,{' '}
          <span className={`highlight-text${highlight.word === 'forecasts' ? ' active' : ''}`}>forecasts</span>,{' '}
          <span className={`highlight-text${highlight.word === 'dashboards' ? ' active' : ''}`}>dashboards</span> &{' '}
          <span className={`highlight-text${highlight.word === 'consolidations' ? ' active' : ''}`}>consolidations</span>
        </h1>
        <p className="ai-insights">
          <span className="sparkle-icon">✨</span> Now with AI-insights
        </p>
        <button className="cta-button">Start 14-day free trial</button>
        <a href="#" className="learn-more">
          <span className="icon">👁️</span> See what we do
        </a>
      </div>

      {/* Feature widgets pop-in */}
      <div className="feature-widgets">
        <div className={`widget expenses-widget${highlight.widget === 'expenses' ? ' active' : ''}`}> {/* Placeholder */}
          <div className="widget-title">Expenses</div>
          <div className="widget-chart">💹</div>
          <div className="widget-amount">$56.2K</div>
        </div>
        <div className={`widget income-widget${highlight.widget === 'income' ? ' active' : ''}`}> {/* Placeholder */}
          <div className="widget-title">Total Income</div>
          <div className="widget-bar-chart">📊</div>
          <div className="widget-amount">$426.8K</div>
          <div className="widget-change">↑ 36.5%</div>
        </div>
        <div className={`widget cash-widget${highlight.widget === 'cash' ? ' active' : ''}`}> {/* Placeholder */}
          <div className="widget-title">Cash</div>
          <div className="widget-metric">$288,721</div>
        </div>
        <div className={`widget consolidations-widget${highlight.widget === 'consolidations' ? ' active' : ''}`}> {/* Placeholder */}
          <div className="widget-title">Consolidations</div>
          <div className="widget-branches">Global Finance
            <div className="branch">US Branch<div className="sub-branch">Texas</div><div className="sub-branch">California</div></div>
            <div className="branch">AU Branch</div>
          </div>
          <div className="widget-integrations">Quickbooks · Xero · Sage</div>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className={`bottom-right-metric${showHealth ? ' active' : ''}`}>
        <span className="heart-icon">❤️</span> 90% Financial Health Score
      </div>
    </section>
  );
};

export default HeroSection; 