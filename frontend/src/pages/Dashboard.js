import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawerMenu from '../components/DrawerMenu';
import NetworkMap from '../components/NetworkMap';
import { getCommunicationData, getSubConnections } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodes = await getCommunicationData();  // Fetch nodes (communications)
        const links = await getSubConnections();  // Fetch links (sub-connections)
        setData({ nodes, links });  // Set fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  // Call the fetch function
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <DrawerMenu />
      <main className="main-content">
        <NetworkMap data={data} /> {/* Pass the fetched data to the NetworkMap component */}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
