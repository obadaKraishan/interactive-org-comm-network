import React, { useEffect } from 'react';
import * as d3 from 'd3';

const NetworkMap = ({ data }) => {
  useEffect(() => {
    // Clear any existing SVG elements
    d3.select('#network-map').selectAll('*').remove();

    // Set the dimensions of the graph
    const width = 1200;
    const height = 900;

    // Append the svg object to the page
    const svg = d3.select('#network-map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(d3.zoom().on("zoom", function (event) {
        svg.attr("transform", event.transform);
      }))
      .append("g");

    // Add zoom and pan controls
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => svg.attr('transform', event.transform));

    d3.select('#network-map svg').call(zoom);

    // Scale for node colors based on department
    const colorScale = d3.scaleOrdinal()
      .domain(['Executive Management', 'Operations', 'Product Development', 'Quality Assurance', 'Customer Support', 'Human Resources', 'Information Technology', 'Finance', 'Marketing', 'Sales', 'Legal', 'Compliance', 'Supply Chain', 'Research & Development', 'Public Relations', 'Business Analytics', 'Corporate Strategy', 'Procurement', 'Facilities Management', 'Security'])
      .range(d3.schemeTableau10);

    // Helper function to determine node color based on department and role
    const nodeColor = d => {
      const departmentColor = colorScale(d.team ? d.team.split(' ')[0] : d.name.split(' ')[0]);
      if (d.name.includes('(Manager)')) return d3.color(departmentColor).darker(1.5);
      if (d.name.includes('(Team Leader)')) return d3.color(departmentColor).darker(0.5);
      if (d.name.includes('(Member)')) return d3.color(departmentColor).brighter(0.5);
      return departmentColor;
    };

    // Calculate the degree (number of connections) for each node
    const nodeDegree = {};
    data.links.forEach(link => {
      nodeDegree[link.source] = (nodeDegree[link.source] || 0) + 1;
      nodeDegree[link.target] = (nodeDegree[link.target] || 0) + 1;
    });

    // Initialize the simulation with nodes and links
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => Math.sqrt(nodeDegree[d.id] || 1) * 10));

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
      .attr('r', d => Math.sqrt(nodeDegree[d.id] || 1) * 7)  // Size based on degree
      .attr('fill', nodeColor)
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
      .attr('dy', -10)
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

    // Add zoom and reset buttons
    const controls = d3.select('#network-map')
      .append('div')
      .style('position', 'absolute')
      .style('top', '10px')
      .style('right', '10px');

    controls.append('button')
      .text('+')
      .style('display', 'block')
      .style('margin-bottom', '5px')
      .on('click', () => {
        d3.select('#network-map svg').transition().call(zoom.scaleBy, 1.2);
      });

    controls.append('button')
      .text('-')
      .style('display', 'block')
      .style('margin-bottom', '5px')
      .on('click', () => {
        d3.select('#network-map svg').transition().call(zoom.scaleBy, 0.8);
      });

    controls.append('button')
      .text('Reset')
      .on('click', () => {
        d3.select('#network-map svg').transition().call(zoom.transform, d3.zoomIdentity);
      });

  }, [data]);

  return (
    <div id="network-map" style={{ position: 'relative', width: '100%', height: '900px' }}>
      {/* D3.js visualization will be appended here */}
    </div>
  );
};

export default NetworkMap;
