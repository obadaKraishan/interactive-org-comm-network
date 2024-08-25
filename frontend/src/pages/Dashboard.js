import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawerMenu from '../components/DrawerMenu';
import NetworkMap from '../components/NetworkMap';
import { getCommunicationData } from '../services/api'; // Import the function to fetch data

const Dashboard = () => {
  const [data, setData] = useState([]); // State to hold the fetched data

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getCommunicationData(); // Fetch data from the backend
        setData(responseData); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching communication data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

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
