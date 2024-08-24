import React, { useEffect } from 'react';
import * as d3 from 'd3';

const NetworkMap = ({ data }) => {
  useEffect(() => {
    // Clear any existing SVG elements
    d3.select('#network-map').selectAll('*').remove();

    // Set the dimensions and margins of the graph
    const width = 1000;
    const height = 800;

    // Append the svg object to the body of the page
    const svg = d3.select('#network-map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Initialize the simulation with nodes and links
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw links (communication lines)
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Draw nodes (individuals, teams, departments)
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add labels to nodes
    const label = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .attr('dy', -3)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text(d => d.name);

    // Update the simulation on every tick
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
        .attr('y', d => d.y - 15);
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
  }, [data]);

  return (
    <div id="network-map">
      {/* D3.js visualization will be appended here */}
    </div>
  );
};

export default NetworkMap;
