import React, { useEffect } from 'react';
import NetworkMap from '../components/NetworkMap';
import { useComm } from '../context/CommContext';
import { getCommunicationData } from '../services/api';

const Dashboard = () => {
  const { communicationData, setCommunicationData } = useComm();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommunicationData();
      setCommunicationData(data);
    };

    fetchData();
  }, [setCommunicationData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organizational Communication Network</h1>
      <NetworkMap data={communicationData} />
    </div>
  );
};

export default Dashboard;
