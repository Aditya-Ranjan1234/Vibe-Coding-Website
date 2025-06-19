import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const KPI_DATA = [
  {
    title: 'Managed portfolio carbon footprint',
    unit: 'tCO₂e',
    value: 45048,
    change: 16,
    changeType: 'up',
    from: 2019,
    historical: [
      { year: 2022, value: 45048 },
      { year: 2021, value: 14111 },
      { year: 2020, value: 32813 },
      { year: 2019, value: 38673 },
    ],
    cta: { type: 'link', text: 'See full breakdown of carbon footprint', icon: '→' },
  },
  {
    title: 'Managed portfolio energy intensity',
    unit: 'kWh/m²',
    value: 123,
    change: -22,
    changeType: 'down',
    from: 2019,
    historical: [
      { year: 2022, value: 123 },
      { year: 2021, value: 128 },
      { year: 2020, value: 135 },
      { year: 2019, value: 157 },
    ],
    cta: { type: 'download', text: 'Download the data', icon: '↓' },
  },
  {
    title: 'Managed portfolio energy consumption',
    unit: 'kWh',
    value: 47790662,
    change: -27,
    changeType: 'down',
    from: 2019,
    historical: [
      { year: 2022, value: 47790662 },
      { year: 2021, value: 49324077 },
      { year: 2020, value: 48784205 },
      { year: 2019, value: 65198706 },
    ],
    cta: { type: 'download', text: 'Download the data', icon: '↓' },
  },
];

function animateNumber(ref, target, duration) {
  if (!ref.current) return;
  let start = 0;
  let startTime = null;
  function animate(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    ref.current.textContent = value.toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

const StatsSection = () => {
  const valueRefs = [useRef(), useRef(), useRef()];
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('stats');
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.8 && !animated) {
        setAnimated(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [animated]);

  useEffect(() => {
    if (animated) {
      KPI_DATA.forEach((kpi, i) => animateNumber(valueRefs[i], kpi.value, 1200));
      // Animate progress bars
      setTimeout(() => {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      }, 600);
    }
  }, [animated]);

  const handleKpiDownload = (kpiItem) => {
    let csvString = "";

    // Add KPI summary header and data
    csvString += "Title,Unit,Current Value,Change (%),From Year\n";
    csvString += `"${kpiItem.title}","${kpiItem.unit}",${kpiItem.value},${kpiItem.change},${kpiItem.from}\n`;

    // Add a blank line for separation
    csvString += "\n";

    // Add historical data header and data
    if (kpiItem.historical && kpiItem.historical.length > 0) {
      csvString += "Historical Data\n";
      csvString += "Year,Value\n";
      kpiItem.historical.forEach(h => {
        csvString += `${h.year},${h.value}\n`;
      });
    }

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kpi_data_${kpiItem.title.toLowerCase().replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="stats" className="stats-dashboard-section">
      <div className="stats-dashboard">
        {KPI_DATA.map((kpi, i) => {
          const max = Math.max(...kpi.historical.map(h => h.value));
          return (
            <div className="kpi-block" key={kpi.title}>
              <p className="kpi-title">{kpi.title}</p>
              <span className="unit">{kpi.unit}</span>
              <div className="current-value">
                <span className="number" ref={valueRefs[i]}>0</span>
                <span className="change-from">from {kpi.from}</span>
                <span className={`change-percent ${kpi.changeType}`}>{kpi.changeType === 'up' ? '↑' : '↓'} {Math.abs(kpi.change)}%</span>
              </div>
              <div className="historical-data">
                {kpi.historical.map((h, j) => (
                  <div className="year-entry" key={h.year}>
                    <span className="year">{h.year}</span>
                    <span className="value">{h.value.toLocaleString('en-US')}</span>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" data-width={((h.value / max) * 100).toFixed(1)} style={{ width: animated ? ((h.value / max) * 100).toFixed(1) + '%' : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
              {kpi.cta.type === 'link' ? (
                <a href="#" className="breakdown-link">{kpi.cta.text} <span className="arrow-icon">{kpi.cta.icon}</span></a>
              ) : kpi.cta.type === 'download' ? (
                <button className="download-btn" onClick={() => handleKpiDownload(kpi)}>
                  {kpi.cta.text} <span className="arrow-icon">{kpi.cta.icon}</span>
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection; 