import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawerMenu from '../components/DrawerMenu';
import NetworkMap from '../components/NetworkMap';
import InfoDrawerLeft from '../components/InfoDrawerLeft';
import InfoDrawerRight from '../components/InfoDrawerRight';
import { getCommunicationData, getSubConnections } from '../services/api';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [data, setData] = useState({ nodes: [], links: [] });

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
        setData({ nodes: communicationData, links: subConnectionData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Get connections for the selected node
  const getConnections = (node) => {
    if (!node) return [];

    const connections = data.links
      .filter(link => link.source._id === node._id || link.target._id === node._id)
      .map(link => {
        const connectedNodeId = link.source._id === node._id ? link.target._id : link.source._id;
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
    <div className="dashboard">
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
          data={data} 
          onNodeClick={handleNodeClick} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
