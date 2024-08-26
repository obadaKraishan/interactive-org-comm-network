import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const NetworkMap = ({ data, onNodeClick }) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
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

    const initialTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(1);
    svgElement.call(zoom.transform, initialTransform);

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
        d.parent
          ? data.nodes.find((node) => node._id === d.parent.toString())._id
          : d.name
      );
      if (d.type === "manager") return d3.color(departmentColor).darker(1.5);
      if (d.type === "team-leader")
        return d3.color(departmentColor).darker(0.5);
      if (d.type === "member") return d3.color(departmentColor).brighter(0.5);
      return departmentColor;
    };

    const nodeSize = (d) => {
      const linksCount = data.links.filter(
        (link) => link.source._id === d._id || link.target._id === d._id
      ).length;
      if (d.type === "department") return Math.sqrt(linksCount) * 20;
      if (d.type === "team") return Math.sqrt(linksCount) * 15;
      if (d.type === "manager") return Math.sqrt(linksCount) * 10;
      if (d.type === "team-leader") return Math.sqrt(linksCount) * 7;
      return Math.sqrt(linksCount) * 5;
    };

    // Arrange nodes in a radial pattern with CEO at the center
    const centerNode = data.nodes.find((node) => node.type === "CEO");
    const executiveNodes = data.nodes.filter(
      (node) => node.type === "executive"
    );
    const departmentNodes = data.nodes.filter(
      (node) => node.type === "department"
    );
    const teamNodes = data.nodes.filter((node) => node.type === "team");

    // Set the CEO at the center
    if (centerNode) {
      centerNode.x = width / 2;
      centerNode.y = height / 2;
    }

    // Arrange executive nodes around the CEO
    const execRadius = 150;
    executiveNodes.forEach((node, i) => {
      const angle = (i / executiveNodes.length) * 2 * Math.PI;
      node.x = width / 2 + execRadius * Math.cos(angle);
      node.y = height / 2 + execRadius * Math.sin(angle);
    });

    // Arrange departments around the executives
    const deptRadius = 300;
    departmentNodes.forEach((node, i) => {
      const angle = (i / departmentNodes.length) * 2 * Math.PI;
      node.x = width / 2 + deptRadius * Math.cos(angle);
      node.y = height / 2 + deptRadius * Math.sin(angle);
    });

    // Arrange teams around their respective departments
    const teamRadius = 450;
    teamNodes.forEach((node, i) => {
      const departmentNode = data.nodes.find(
        (dep) => dep._id === node.parent
      );
      if (departmentNode) {
        const angle = (i / teamNodes.length) * 2 * Math.PI;
        node.x = departmentNode.x + teamRadius * Math.cos(angle);
        node.y = departmentNode.y + teamRadius * Math.sin(angle);
      }
    });

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => d._id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d) => nodeSize(d) + 20))
      .alphaDecay(0.05)
      .velocityDecay(0.4)
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2)
      .each(function (d) {
        const sourceNode = data.nodes.find(
          (node) => node._id === d.source._id.toString()
        );
        const targetNode = data.nodes.find(
          (node) => node._id === d.target._id.toString()
        );

        if (!sourceNode || !targetNode) {
          console.error("Link source or target not found:", d);
        } else {
          d.source = sourceNode;
          d.target = targetNode;
        }
      });

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => nodeSize(d))
      .attr("fill", nodeColor)
      .attr("stroke", (d) => (d._id === selectedNodeId ? "#000" : null))
      .attr("stroke-width", (d) => (d._id === selectedNodeId ? 3 : 0))
      .attr("class", (d) => (d._id === selectedNodeId ? "highlighted-node" : ""))
      .on("click", (event, d) => {
        onNodeClick(d);
        setSelectedNodeId(d._id);

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
        svgElement.transition().call(zoom.transform, d3.zoomIdentity);
      });

    return () => {
      d3.select("#network-map").selectAll("*").remove();
    };
  }, [data, onNodeClick, selectedNodeId]);

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
    </div>
  );
};

export default NetworkMap;
