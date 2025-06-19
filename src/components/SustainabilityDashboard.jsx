import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './SustainabilityDashboard.css';

const SustainabilityKPIModule = ({
  title, unit, currentYearData, historicalData, footerActionText, footerActionIcon
}) => {
  const currentValRef = useRef(null);
  const progressBarRefs = useRef([]);
  const [animated, setAnimated] = useState(false);

  const maxHistoricalValue = Math.max(...historicalData.map(d => d.value));

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animateNumber(currentValRef.current, currentYearData.value, 2000);
            historicalData.forEach((data, idx) => {
              const bar = progressBarRefs.current[idx];
              if (bar) {
                const pct = (data.value / maxHistoricalValue) * 100;
                bar.style.width = `${pct}%`;
              }
            });
            setAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (currentValRef.current) observer.observe(currentValRef.current);
    return () => observer.disconnect();
  }, [animated, currentYearData.value, historicalData, maxHistoricalValue]);

  const animateNumber = (el, target, duration) => {
    if (!el) return;
    const i = d3.interpolateNumber(0, target);
    d3.select(el)
      .transition()
      .duration(duration)
      .ease(d3.easeQuadOut)
      .tween('text', function() {
        return t => { this.textContent = Math.round(i(t)).toLocaleString('en-US'); };
      });
  };

  return (
    <div className="kpi-module">
      <div className="kpi-header">
        <h2 className="kpi-title">{title}</h2>
        <span className="kpi-unit">{unit}</span>
      </div>
      <div className="kpi-summary">
        <div className="kpi-current-value" ref={currentValRef}>{currentYearData.value.toLocaleString('en-US')}</div>
        <div className="kpi-change" style={{ color: currentYearData.changeType === 'increase' ? 'var(--color-green-increase)' : 'var(--color-red-decrease)' }}>
          {currentYearData.changeType === 'increase' ? (
            <svg className="arrow-icon increase" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
          ) : (
            <svg className="arrow-icon decrease" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          )}
          <span className="percentage-value">{currentYearData.percentageChange}%</span>
        </div>
      </div>
      <div className="kpi-historical-data">
        {historicalData.map((data, idx) => (
          <div className="data-row" key={data.year}>
            <span className="year">{data.year}</span>
            <span className="value">{data.value.toLocaleString('en-US')}</span>
            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <span
                  className="progress-bar-fill"
                  ref={el => progressBarRefs.current[idx] = el}
                  style={{ width: animated ? `${(data.value / maxHistoricalValue) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="kpi-footer">
        <button className="action-button">
          {footerActionText}
          {footerActionIcon === 'right' ? (
            <svg className="arrow-right-icon" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          ) : (
            <svg className="arrow-down-icon" viewBox="0 0 24 24"><polyline points="12 5 12 19 19 12 5 12"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const SustainabilityDashboard = () => {
  const carbonData = {
    currentYear: { value: 45048, percentageChange: 16, changeType: 'decrease' },
    historical: [
      { year: 2022, value: 45048 },
      { year: 2021, value: 14111 },
      { year: 2020, value: 32813 },
      { year: 2019, value: 38673 },
    ],
  };
  const energyIntensityData = {
    currentYear: { value: 123, percentageChange: 22, changeType: 'decrease' },
    historical: [
      { year: 2022, value: 123 },
      { year: 2021, value: 128 },
      { year: 2020, value: 135 },
      { year: 2019, value: 157 },
    ],
  };
  const energyConsumptionData = {
    currentYear: { value: 47790662, percentageChange: 27, changeType: 'decrease' },
    historical: [
      { year: 2022, value: 47790662 },
      { year: 2021, value: 49324077 },
      { year: 2020, value: 48784205 },
      { year: 2019, value: 65198706 },
    ],
  };

  return (
    <div className="sustainability-dashboard">
      <SustainabilityKPIModule
        title="Managed portfolio carbon footprint"
        unit="tCO2e"
        currentYearData={carbonData.currentYear}
        historicalData={carbonData.historical}
        footerActionText="See full breakdown of carbon footprint"
        footerActionIcon="right"
      />
      <SustainabilityKPIModule
        title="Managed portfolio energy intensity"
        unit="kWh/m²"
        currentYearData={energyIntensityData.currentYear}
        historicalData={energyIntensityData.historical}
        footerActionText="Download the data"
        footerActionIcon="down"
      />
      <SustainabilityKPIModule
        title="Managed portfolio energy consumption"
        unit="kWh"
        currentYearData={energyConsumptionData.currentYear}
        historicalData={energyConsumptionData.historical}
        footerActionText="Download the data"
        footerActionIcon="down"
      />
    </div>
  );
};

export default SustainabilityDashboard; 