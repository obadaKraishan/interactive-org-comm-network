import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DrawerMenu from './components/DrawerMenu';
import NetworkMap from './components/NetworkMap';
import InfoDrawerLeft from './components/InfoDrawerLeft';
import InfoDrawerRight from './components/InfoDrawerRight';
import sampleData from './sampleData';

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

  return (
    <div className="app">
      <Header toggleDrawer={toggleDrawer} />
      <DrawerMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <InfoDrawerLeft isOpen={isLeftDrawerOpen} node={selectedNode} />
      <InfoDrawerRight isOpen={isRightDrawerOpen} node={selectedNode} />
      <main className="main-content">
        <NetworkMap data={sampleData} onNodeClick={handleNodeClick} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
