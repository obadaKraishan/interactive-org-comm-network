import React, { useEffect } from "react";
import * as d3 from "d3";

const NetworkMap = ({ data, onNodeClick }) => {
  useEffect(() => {
    d3.select("#network-map").selectAll("*").remove();

    const container = document.getElementById("network-map");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3
      .select("#network-map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom().on("zoom", (event) => svg.attr("transform", event.transform))
      )
      .append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => svg.attr("transform", event.transform));

    d3.select("#network-map svg").call(zoom);

    const colorScale = d3
      .scaleOrdinal()
      .domain([
        "Executive Management",
        "Operations",
        "Product Development",
        "Quality Assurance",
        "Customer Support",
        "Human Resources",
        "Information Technology",
        "Finance",
        "Marketing",
        "Sales",
        "Legal",
        "Compliance",
        "Supply Chain",
        "Research & Development",
        "Public Relations",
        "Business Analytics",
        "Corporate Strategy",
        "Procurement",
        "Facilities Management",
        "Security",
      ])
      .range(d3.schemeTableau10);

    const nodeColor = (d) => {
      const departmentColor = colorScale(
        d.parent ? data.nodes.find((node) => node.id === d.parent).name : d.name
      );
      if (d.type === "manager") return d3.color(departmentColor).darker(1.5);
      if (d.type === "team-leader")
        return d3.color(departmentColor).darker(0.5);
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
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide().radius((d) => nodeSize(d) + 10)
      );

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
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
      .on("click", (event, d) => onNodeClick(d)) // Pass the node data on click
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

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y - 15);
    });

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
        d3.select("#network-map svg").transition().call(zoom.scaleBy, 1.2);
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
        d3.select("#network-map svg").transition().call(zoom.scaleBy, 0.8);
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
        d3.select("#network-map svg")
          .transition()
          .call(zoom.transform, d3.zoomIdentity);
      });
  }, [data, onNodeClick]); // Ensure `onNodeClick` is a dependency

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
