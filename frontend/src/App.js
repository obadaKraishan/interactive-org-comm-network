import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DrawerMenu from './components/DrawerMenu';
import NetworkMap from './components/NetworkMap';
import sampleData from './sampleData';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="app">
      <Header toggleDrawer={toggleDrawer} />
      <DrawerMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <main className="main-content">
        <NetworkMap data={sampleData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
