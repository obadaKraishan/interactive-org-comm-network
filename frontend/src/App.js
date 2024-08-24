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
  
    console.log('Node ID:', node.id);
  
    const connections = sampleData.links
      .filter(link => {
        console.log('Checking Link:', link);
        
        // Assuming link.source and link.target are objects, get their ids
        const sourceId = link.source.id || link.source;  // If source is an object, get its id
        const targetId = link.target.id || link.target;  // If target is an object, get its id
  
        console.log('Link Source ID:', sourceId, 'Link Target ID:', targetId);
    
        const isConnected = sourceId === node.id || targetId === node.id;
        console.log('Is Connected:', isConnected);
        return isConnected;
      })
      .map(link => {
        const connectedNodeId = link.source.id === node.id ? link.target.id : link.source.id;
        console.log('Connected Node ID:', connectedNodeId);
        const connectedNode = sampleData.nodes.find(n => n.id === connectedNodeId);
        console.log('Connected Node:', connectedNode);
        return connectedNode;
      })
      .filter(connection => connection);
  
    console.log('Final Connections:', connections);
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
