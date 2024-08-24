import React, { createContext, useState, useContext } from 'react';

const CommContext = createContext();

export const CommProvider = ({ children }) => {
  const [communicationData, setCommunicationData] = useState([]);

  return (
    <CommContext.Provider value={{ communicationData, setCommunicationData }}>
      {children}
    </CommContext.Provider>
  );
};

export const useComm = () => {
  return useContext(CommContext);
};
