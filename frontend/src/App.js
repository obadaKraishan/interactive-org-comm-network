import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DrawerMenu from './components/DrawerMenu';
import NetworkMap from './components/NetworkMap';
import InfoDrawerLeft from './components/InfoDrawerLeft';
import InfoDrawerRight from './components/InfoDrawerRight';
import { getCommunicationData, getSubConnections } from './services/api';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [data, setData] = useState({ nodes: [], links: [] }); // State to hold the fetched communication data and links
  const [subConnections, setSubConnections] = useState([]); // State to hold the fetched sub-connections data

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

  // Fetch communication data and sub-connections from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const communicationData = await getCommunicationData();
        const subConnectionData = await getSubConnections();
        setData({ nodes: communicationData, links: communicationData.flatMap(node => node.links || []) });
        setSubConnections(subConnectionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  // Get connections for the selected node
  const getConnections = (node) => {
    if (!node) return [];

    const connections = data.links
      .filter(link => link.source === node._id || link.target === node._id)
      .map(link => {
        const connectedNodeId = link.source === node._id ? link.target : link.source;
        return data.nodes.find(n => n._id === connectedNodeId);
      })
      .filter(connection => connection);

    return connections;
  };

  // Recursively get all sub-items under the selected node
  const getSubItems = (node) => {
    if (!node) return [];

    const subItems = data.nodes.filter(n => n.parent === node._id);
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
        <NetworkMap 
          data={{ nodes: data.nodes, links: [...data.links, ...subConnections] }} 
          onNodeClick={handleNodeClick} 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
