import React, { useEffect } from 'react';
import NetworkMap from '../components/NetworkMap';
import { useComm } from '../context/CommContext';
import sampleData from '../sampleData';

const Dashboard = () => {
  const { setCommunicationData } = useComm();

  useEffect(() => {
    // Set the sample data in context
    setCommunicationData(sampleData);
  }, [setCommunicationData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organizational Communication Network</h1>
      <NetworkMap data={sampleData} />
    </div>
  );
};

export default Dashboard;
