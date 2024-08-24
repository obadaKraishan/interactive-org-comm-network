import React from 'react';
import '../styles/InfoDrawerLeft.css';

const InfoDrawerLeft = ({ isOpen, node, toggleDrawer }) => {
  return (
    <div className={`info-drawer-left ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h2>{node ? node.name : "Details"}</h2>
        <button className="close-btn" onClick={toggleDrawer}>
          <span>&larr;</span>
        </button>
      </div>
      {node && (
        <div className="drawer-content">
          <p><strong>Brief:</strong> {node.brief}</p>
        </div>
      )}
      <div className="arrow" onClick={toggleDrawer}>
        <span>&rarr;</span>
      </div>
    </div>
  );
};

export default InfoDrawerLeft;
