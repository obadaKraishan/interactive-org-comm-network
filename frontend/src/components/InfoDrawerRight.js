import React from 'react';
import '../styles/InfoDrawerRight.css';

const InfoDrawerRight = ({ isOpen, node }) => {
  return (
    <div className={`info-drawer-right ${isOpen ? 'open' : ''}`}>
      <h2>Detailed Information</h2>
      <p>{node?.name}</p>
      <p>{node?.details || 'More detailed information about the node will appear here.'}</p>
    </div>
  );
};

export default InfoDrawerRight;
