import React, { useState, useRef } from 'react';
import '../App.css';

const TABS = [
  {
    key: 'billing',
    label: 'BILLING',
    color: '#FF69B4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="8" width="20" height="12" rx="3" fill="currentColor" /><rect x="8" y="4" width="12" height="6" rx="2" fill="currentColor" opacity=".5" /></svg>
    ),
  },
  {
    key: 'charging',
    label: 'CHARGING',
    color: '#FFA500',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28"><polygon points="14,4 18,14 14,14 14,24 10,14 14,14" fill="currentColor" /></svg>
    ),
  },
  {
    key: 'catalog',
    label: 'CATALOG',
    color: '#32CD32',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="6" width="16" height="16" rx="4" fill="currentColor" /><rect x="10" y="10" width="8" height="8" rx="2" fill="#fff" opacity=".7" /></svg>
    ),
  },
  {
    key: 'events',
    label: 'EVENTS',
    color: '#1E90FF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="currentColor" /><rect x="12" y="8" width="4" height="8" rx="2" fill="#fff" opacity=".7" /></svg>
    ),
  },
];

const PANEL_CONTENT = {
  billing: {
    left: {
      heading: 'Real-Time Convergent Billing',
      paragraph: 'Instantaneous, accurate billing across all services and payment methods.'
    },
    right: (
      <div className="ui-card billing-card">
        <div className="ui-card-header">EMS <span className="ui-card-title">Billing</span></div>
        <div className="ui-card-metric">
          <span className="ui-card-metric-main" data-animate="112355">112,355</span> <span className="ui-card-metric-label">Estimated invoices</span>
        </div>
        <div className="ui-card-metric">
          <span className="ui-card-metric-main" data-animate="42">42 MIN</span> <span className="ui-card-metric-label">Estimated duration</span>
        </div>
        <div className="ui-card-metric">
          <span className="ui-card-metric-main" data-animate="17">17 DAYS</span> <span className="ui-card-metric-label">Current period ends</span>
        </div>
      </div>
    )
  },
  charging: {
    left: {
      heading: 'Online Charging System',
      paragraph: 'AI-powered insights that predict customer needs and drive personalized experiences.'
    },
    right: (
      <div className="ui-card charging-card">
        <div className="charging-phone-icon">
          <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#FFA500" opacity=".2" /><path d="M24 12v12l8 4" stroke="#FFA500" strokeWidth="3" fill="none" /></svg>
        </div>
        <div className="charging-call-info">+1 (415) 678-2345 Calling</div>
        <div className="charging-fields">
          <div className="charging-field">$0.00/min</div>
          <div className="charging-field">TRAFFIC TYPE</div>
          <div className="charging-field">COUNTRY</div>
          <div className="charging-field">CALL TYPE</div>
          <div className="charging-field">ZONE</div>
        </div>
      </div>
    )
  },
  catalog: {
    left: {
      heading: 'Product Catalog',
      paragraph: 'Intuitive tools that empower customers to manage their accounts with ease, freeing up your team.'
    },
    right: (
      <div className="ui-card catalog-card">
        <div className="catalog-icons">
          <span className="catalog-icon spotify" title="Spotify" />
          <span className="catalog-icon netflix" title="Netflix" />
        </div>
        <div className="catalog-item">ADD-ONS</div>
        <div className="catalog-item">MOBILE APP ONLY</div>
        <div className="catalog-item">TOTAL UNLIMITED</div>
        <div className="catalog-item">Unlimited minutes</div>
      </div>
    )
  },
  events: {
    left: {
      heading: 'Event Management',
      paragraph: 'Track, analyze, and act on real-time events across your business ecosystem.'
    },
    right: (
      <div className="ui-card events-card">
        <div className="events-icon">📅</div>
        <div className="events-item">Event Timeline</div>
        <div className="events-item">Real-time Alerts</div>
        <div className="events-item">Automated Actions</div>
      </div>
    )
  }
};

const BOTTOM_NAV = [
  { label: 'PRODUCTS +', icon: true },
  { label: 'SOLUTIONS +', icon: true },
  { label: 'RESOURCES +', icon: true },
  { label: 'SERVICES +', icon: true },
  { label: 'BOOK A MEETING', icon: false, cta: true },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState('billing');
  const [leavingTab, setLeavingTab] = useState(null);
  const timeoutRef = useRef();

  const handleTabClick = (key) => {
    if (key === activeTab) return;
    setLeavingTab(activeTab);
    setTimeout(() => {
      setActiveTab(key);
      setLeavingTab(null);
    }, 700); // match CSS transition
  };

  return (
    <section id="features" className="features-services-section">
      <div className="features-header-section">
        <p className="features-small-text">[EFFICIENCY, SCALABILITY, AND ABILITY]</p>
        <h1 className="features-main-heading">Unparalleled BSS/OSS Capabilities</h1>
      </div>
      <div className="features-tabs-navigation">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`features-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            style={activeTab === tab.key ? { background: tab.color, color: '#fff' } : {}}
            onClick={() => handleTabClick(tab.key)}
          >
            <span className="features-tab-icon" style={activeTab === tab.key ? { color: '#fff' } : {}}>{tab.icon}</span>
            {tab.label}
            <span className="features-tab-underline" style={activeTab === tab.key ? { background: tab.color } : {}} />
          </button>
        ))}
      </div>
      <div className="features-content-panel-container">
        {TABS.map(tab => (
          <div
            key={tab.key}
            className={`features-content-panel${activeTab === tab.key ? ' active' : ''}${leavingTab === tab.key ? ' leaving' : ''}`}
            style={{ zIndex: activeTab === tab.key ? 2 : 1 }}
          >
            <div className="features-panel-left">
              <h2>{PANEL_CONTENT[tab.key].left.heading}</h2>
              <p>{PANEL_CONTENT[tab.key].left.paragraph}</p>
            </div>
            <div className="features-panel-right">
              {PANEL_CONTENT[tab.key].right}
            </div>
          </div>
        ))}
      </div>
      <div className="features-bottom-navigation">
        {BOTTOM_NAV.map((btn, i) => (
          <button
            key={btn.label}
            className={`features-bottom-nav-btn${btn.cta ? ' cta' : ''}`}
          >
            {btn.label}
            {btn.icon && <span className="features-bottom-nav-icon">{btn.label.includes('+') ? '+' : <svg width="16" height="16"><path d="M4 8h8M8 4v8" stroke="#fff" strokeWidth="2"/></svg>}</span>}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection; 