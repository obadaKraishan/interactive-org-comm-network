import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DrawerMenu from './components/DrawerMenu';
import NetworkMap from './components/NetworkMap';
import InfoDrawerLeft from './components/InfoDrawerLeft';
import InfoDrawerRight from './components/InfoDrawerRight';
import sampleData from './data/sampleData';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setIsLeftDrawerOpen(true);
    setIsRightDrawerOpen(true);
  };

  const toggleLeftDrawer = () => {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  };

  const toggleRightDrawer = () => {
    setIsRightDrawerOpen(!isRightDrawerOpen);
  };

  // Get connections for the selected node
  const getConnections = (node) => {
    if (!node) return [];
    const connections = sampleData.links
      .filter(link => link.source === node.id || link.target === node.id)
      .map(link => sampleData.nodes.find(n => n.id === (link.source === node.id ? link.target : link.source)))
      .filter(connection => connection); // Filter out any undefined connections
    return connections;
  };

  // Recursively get all sub-items under the selected node
  const getSubItems = (node) => {
    if (!node) return [];

    const subItems = sampleData.nodes.filter(n => n.parent === node.id);
    const allSubItems = subItems.reduce((acc, subItem) => {
      acc.push(subItem);
      return acc.concat(getSubItems(subItem)); // Recursively fetch sub-items
    }, []);
    
    return allSubItems;
  };

  return (
    <div className="app">
      <Header toggleDrawer={toggleDrawer} />
      <DrawerMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <InfoDrawerLeft 
        isOpen={isLeftDrawerOpen} 
        node={selectedNode} 
        toggleDrawer={toggleLeftDrawer} 
        connections={getConnections(selectedNode)} 
      />
      <InfoDrawerRight 
        isOpen={isRightDrawerOpen} 
        node={selectedNode} 
        toggleDrawer={toggleRightDrawer} 
        subItems={getSubItems(selectedNode)} 
      />
      <main className="main-content">
        <NetworkMap data={sampleData} onNodeClick={handleNodeClick} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
