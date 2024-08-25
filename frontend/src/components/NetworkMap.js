import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { getSubConnections } from '../services/api';

const NetworkMap = ({ data, onNodeClick }) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [subConnections, setSubConnections] = useState([]);

  useEffect(() => {
    // Fetch sub-connections data when the component mounts
    const fetchSubConnections = async () => {
      try {
        const fetchedSubConnections = await getSubConnections();
        setSubConnections(fetchedSubConnections);
      } catch (error) {
        console.error('Error fetching sub-connections:', error);
      }
    };

    fetchSubConnections(); // Fetch once on mount

    // D3 Visualization Setup
    const container = document.getElementById("network-map");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3
      .select("#network-map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      });

    const svgElement = d3.select("#network-map svg");
    svgElement.call(zoom);

    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(1);
    svgElement.call(zoom.transform, initialTransform);

    const colorScale = d3
      .scaleOrdinal()
      .domain([
        "Executive Management",
        "Operations",
        "Product Development",
        // Add other departments here
      ])
      .range(d3.schemeTableau10);

    const nodeColor = (d) => {
      const departmentColor = colorScale(
        d.parent ? data.nodes.find((node) => node.id === d.parent).name : d.name
      );
      if (d.type === "manager") return d3.color(departmentColor).darker(1.5);
      if (d.type === "team-leader") return d3.color(departmentColor).darker(0.5);
      if (d.type === "member") return d3.color(departmentColor).brighter(0.5);
      return departmentColor;
    };

    const nodeDegree = {};
    data.links.forEach((link) => {
      nodeDegree[link.source] = (nodeDegree[link.source] || 0) + 1;
      nodeDegree[link.target] = (nodeDegree[link.target] || 0) + 1;
    });

    const nodeSize = (d) => {
      if (d.type === "department") return Math.sqrt(nodeDegree[d.id] || 1) * 20;
      if (d.type === "team") return Math.sqrt(nodeDegree[d.id] || 1) * 15;
      if (d.type === "manager") return Math.sqrt(nodeDegree[d.id] || 1) * 10;
      if (d.type === "team-leader") return Math.sqrt(nodeDegree[d.id] || 1) * 7;
      return Math.sqrt(nodeDegree[d.id] || 1) * 5;
    };

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink([...data.links, ...subConnections]) // Combine links and sub-connections
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force(
        "collide",
        d3.forceCollide().radius((d) => nodeSize(d) + 10)
      )
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data([...data.links, ...subConnections]) // Combine links and sub-connections
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => nodeSize(d))
      .attr("fill", nodeColor)
      .attr("stroke", (d) => (d.id === selectedNodeId ? "#000" : null)) // Highlight selected node
      .attr("stroke-width", (d) => (d.id === selectedNodeId ? 3 : 0))
      .attr("class", (d) => (d.id === selectedNodeId ? "highlighted-node" : ""))
      .on("click", (event, d) => {
        onNodeClick(d);
        setSelectedNodeId(d.id);

        // Zoom to the clicked node
        const scale = d3.zoomTransform(svg.node()).k;
        const x = -d.x * scale + width / 2;
        const y = -d.y * scale + height / 2;

        svgElement
          .transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    const label = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text((d) => d.name);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y - 15);
    }

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

    const controls = d3
      .select("#network-map")
      .append("div")
      .style("position", "absolute")
      .style("top", "10px")
      .style("right", "10px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("gap", "10px");

    controls
      .append("button")
      .text("+")
      .style("padding", "5px")
      .style("background-color", "#333")
      .style("color", "#fff")
      .style("border", "none")
      .style("border-radius", "5px")
      .on("click", () => {
        svgElement.transition().call(zoom.scaleBy, 1.2);
      });

    controls
      .append("button")
      .text("-")
      .style("padding", "5px")
      .style("background-color", "#333")
      .style("color", "#fff")
      .style("border", "none")
      .style("border-radius", "5px")
      .on("click", () => {
        svgElement.transition().call(zoom.scaleBy, 0.8);
      });

    controls
      .append("button")
      .text("Reset")
      .style("padding", "5px")
      .style("background-color", "#333")
      .style("color", "#fff")
      .style("border", "none")
      .style("border-radius", "5px")
      .on("click", () => {
        svgElement
          .transition()
          .call(zoom.transform, d3.zoomIdentity); // Reset the zoom and pan
      });

    // Cleanup function to remove the old SVG elements when the component unmounts or updates
    return () => {
      d3.select("#network-map").selectAll("*").remove();
    };
  }, [data, onNodeClick]); // Only rerun the effect if `data` or `onNodeClick` change

  return (
    <div
      id="network-map"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* D3.js visualization will be appended here */}
    </div>
  );
};

export default NetworkMap;
