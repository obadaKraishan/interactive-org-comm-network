import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawerMenu from '../components/DrawerMenu';
import NetworkMap from '../components/NetworkMap';
import sampleData from '../sampleData';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <DrawerMenu />
      <main className="main-content">
        <NetworkMap data={sampleData} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
