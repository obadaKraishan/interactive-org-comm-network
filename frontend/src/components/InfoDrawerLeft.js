import React from 'react';
import '../styles/InfoDrawerLeft.css';

const InfoDrawerLeft = ({ isOpen, node }) => {
  return (
    <div className={`info-drawer-left ${isOpen ? 'open' : ''}`}>
      <h2>{node?.name || 'Select a node'}</h2>
      <p>Type: {node?.type}</p>
      <p>{node?.brief || 'Brief information about the node.'}</p>
    </div>
  );
};

export default InfoDrawerLeft;
