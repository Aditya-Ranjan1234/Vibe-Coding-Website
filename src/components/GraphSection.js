import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../App.css';

const initialData = [
  { label: 'A', value1: 900, value2: 700 },
  { label: 'B', value1: 600, value2: 400 },
  { label: 'C', value1: 1100, value2: 800 },
  { label: 'D', value1: 500, value2: 300 },
  { label: 'E', value1: 800, value2: 600 },
];

const GraphSection = () => {
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [data, setData] = useState(initialData);
  const svgRef = useRef();

  useEffect(() => {
    // Animate bars on mount or data change
    const svg = d3.select(svgRef.current);
    const width = 480;
    const height = 260;
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    svg.selectAll('*').remove();
    const x0 = d3.scaleBand().domain(data.map(d => d.label)).range([margin.left, width - margin.right]).padding(0.3);
    const y = d3.scaleLinear().domain([0, 1200]).range([height - margin.bottom, margin.top]);
    // Draw grid lines
    svg.append('g')
      .selectAll('line')
      .data(d3.range(0, 1201, 200))
      .enter()
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1);
    // Draw bars
    svg.append('g')
      .selectAll('rect.value1')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar bar1')
      .attr('x', d => x0(d.label))
      .attr('y', y(0))
      .attr('width', x0.bandwidth() / 2 - 4)
      .attr('height', 0)
      .attr('fill', '#8B4513')
      .transition()
      .duration(900)
      .attr('y', d => y(d.value1))
      .attr('height', d => y(0) - y(d.value1));
    svg.append('g')
      .selectAll('rect.value2')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar bar2')
      .attr('x', d => x0(d.label) + x0.bandwidth() / 2 + 4)
      .attr('y', y(0))
      .attr('width', x0.bandwidth() / 2 - 4)
      .attr('height', 0)
      .attr('fill', '#D2B48C')
      .transition()
      .duration(900)
      .attr('y', d => y(d.value2))
      .attr('height', d => y(0) - y(d.value2));
    // Bar value labels
    svg.append('g')
      .selectAll('text.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => x0(d.label) + x0.bandwidth() / 4)
      .attr('y', d => y(d.value1) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8B4513')
      .attr('font-size', '1rem')
      .text(d => d.value1);
    svg.append('g')
      .selectAll('text.bar-label2')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label2')
      .attr('x', d => x0(d.label) + x0.bandwidth() * 3 / 4)
      .attr('y', d => y(d.value2) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#D2B48C')
      .attr('font-size', '1rem')
      .text(d => d.value2);
    // Y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6));
    // X axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0));
    // Target lines
    svg.append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', y(600))
      .attr('y2', y(600))
      .attr('stroke', '#aaa')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '8,4');
    svg.append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', y(600))
      .attr('y2', y(600))
      .attr('stroke', '#aaa')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '2,6');
  }, [data]);

  const handleDownload = () => {
    // Download CSV
    const csv = [
      'Label,Value1,Value2',
      ...data.map(d => `${d.label},${d.value1},${d.value2}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon_emissions_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="carbon-emissions-section">
      <div className="carbon-emissions-dashboard">
        <div className="header-filters">
          <div className="filters">
            <p className="filter-title">Filter by</p>
            <div className="filter-group">
              <span>Type</span>
              <button className={`filter-btn${type === 'refurb' ? ' active' : ''}`} onClick={() => setType('refurb')}>Refurbishment</button>
              <button className={`filter-btn${type === 'new' ? ' active' : ''}`} onClick={() => setType('new')}>New build</button>
              <button className={`filter-btn${type === 'all' ? ' active' : ''}`} onClick={() => setType('all')}>All</button>
            </div>
            <div className="filter-group">
              <span>Status</span>
              <button className={`filter-btn${status === 'complete' ? ' active' : ''}`} onClick={() => setStatus('complete')}>Complete</button>
              <button className={`filter-btn${status === 'estimate' ? ' active' : ''}`} onClick={() => setStatus('estimate')}>Estimate</button>
            </div>
          </div>
          <div className="titles-download">
            <h1 className="carbon-title">EMBODIED<br />CARBON<br />EMISSIONS</h1>
            <p className="carbon-subtitle">Intensity measured by kgCO₂e/m²</p>
            <button className="download-btn" onClick={handleDownload}>Download the data <span className="arrow-icon">↓</span></button>
          </div>
        </div>
        <div className="key">
          <h3>Key</h3>
          <p className="target-line dashed">600 kgCO₂e/m² - Embodied Carbon Target 2030</p>
          <p className="target-line dotted">600 kgCO₂e/m² - Embodied Carbon Target 2025</p>
        </div>
        <div className="bar-chart-container">
          <svg ref={svgRef} width={480} height={260} />
        </div>
      </div>
    </section>
  );
};

export default GraphSection; 