import React, { useEffect, useRef } from 'react';

/**
 * Network Dependency Visualization
 * Shows circular investment patterns (e.g., Nvidia → OpenAI → Nvidia chips)
 * Uses D3.js for force-directed graph
 * Based on Medium analysis of mutual dependencies in bubbles
 */
const NetworkDependencyChart = ({ nodes: customNodes, links: customLinks }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Load D3 dynamically (if not already loaded)
    if (typeof window.d3 === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://d3js.org/d3.v7.min.js';
      script.onload = () => renderChart();
      document.head.appendChild(script);
    } else {
      renderChart();
    }

    function renderChart() {
      const d3 = window.d3;
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.clientWidth;
      const height = 500;

      svg.selectAll('*').remove(); // Clear previous render
      svg.attr('width', width).attr('height', height);

      const nodes = customNodes || [
        { id: 'Nvidia', group: 'hardware', value: 4500, color: '#10b981' },
        { id: 'OpenAI', group: 'ai-lab', value: 500, color: '#8b5cf6' },
        { id: 'Microsoft', group: 'bigtech', value: 3900, color: '#3b82f6' },
        { id: 'Oracle', group: 'cloud', value: 800, color: '#f59e0b' },
        { id: 'xAI', group: 'ai-lab', value: 300, color: '#ec4899' },
        { id: 'Anthropic', group: 'ai-lab', value: 250, color: '#a855f7' },
        { id: 'Google', group: 'bigtech', value: 3500, color: '#3b82f6' }
      ];

      const links = customLinks || [
        { source: 'Nvidia', target: 'OpenAI', type: 'investment', value: 100 },
        { source: 'OpenAI', target: 'Nvidia', type: 'hardware', value: 80 },
        { source: 'Microsoft', target: 'OpenAI', type: 'investment', value: 150 },
        { source: 'Microsoft', target: 'Nvidia', type: 'hardware', value: 120 },
        { source: 'Oracle', target: 'OpenAI', type: 'service', value: 60 },
        { source: 'xAI', target: 'Nvidia', type: 'hardware', value: 40 },
        { source: 'Google', target: 'Anthropic', type: 'investment', value: 90 },
        { source: 'Anthropic', target: 'Nvidia', type: 'hardware', value: 50 }
      ];

      // Create force simulation
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.value / 10) + 20));

      // Add links
      const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', d => d.type === 'investment' ? '#8b5cf6' : '#ec4899')
        .attr('stroke-width', d => Math.sqrt(d.value) / 2)
        .attr('stroke-opacity', 0.6)
        .attr('marker-end', 'url(#arrowhead)');

      // Add arrow marker
      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#8b5cf6');

      // Add nodes
      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', d => Math.sqrt(d.value / 10))
        .attr('fill', d => d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('opacity', 0.8)
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      // Add labels
      const label = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#fff')
        .attr('pointer-events', 'none')
        .text(d => d.id);

      // Add tooltips
      node.append('title')
        .text(d => `${d.id}\nMarket Cap: $${d.value}B`);

      link.append('title')
        .text(d => `${d.source.id} → ${d.target.id}\nType: ${d.type}\nValue: $${d.value}M`);

      // Update positions on simulation tick
      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        label
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      });

      // Drag functions
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Calculate network density
      const density = (2 * links.length) / (nodes.length * (nodes.length - 1));
      const densityWarning = density > 0.4 ? 'text-red-600' : 'text-green-600';

      // Add legend
      const legend = svg.append('g')
        .attr('transform', `translate(20, 20)`);

      legend.append('text')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .text(`Network Density: ${(density * 100).toFixed(1)}%`)
        .attr('class', densityWarning);

      legend.append('line')
        .attr('x1', 0).attr('y1', 20).attr('x2', 30).attr('y2', 20)
        .attr('stroke', '#8b5cf6').attr('stroke-width', 3);
      legend.append('text')
        .attr('x', 35).attr('y', 24)
        .attr('font-size', '10px')
        .text('Investment');

      legend.append('line')
        .attr('x1', 0).attr('y1', 35).attr('x2', 30).attr('y2', 35)
        .attr('stroke', '#ec4899').attr('stroke-width', 3);
      legend.append('text')
        .attr('x', 35).attr('y', 39)
        .attr('font-size', '10px')
        .text('Hardware Purchase');
    }
  }, [customNodes, customLinks]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">Network Dependency Visualization</h3>
      <p className="text-sm text-gray-600 mb-4">
        Circular investment patterns typical in bubbles. Density &gt; 0.4 = systemic risk.
      </p>
      <div className="relative bg-gray-50 rounded-lg overflow-hidden">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
      <div className="mt-4 text-xs text-gray-600 border-t pt-3">
        <p className="font-semibold">🔄 Circular Dependency Alert</p>
        <p className="mt-1">
          Nvidia invests in AI startups → Startups buy Nvidia GPUs → Creates self-reinforcing cycle.
          Total recursive flow: <span className="text-purple-600 font-bold">&gt;$180B</span>
        </p>
      </div>
    </div>
  );
};

export default NetworkDependencyChart;
