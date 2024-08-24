import React from 'react';
import '../styles/InfoDrawerRight.css';

const InfoDrawerRight = ({ isOpen, node, toggleDrawer }) => {
  return (
    <div className={`info-drawer-right ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h2>Details</h2>
        <button className="close-btn" onClick={toggleDrawer}>
          <span>&rarr;</span>
        </button>
      </div>
      {node && (
        <div className="drawer-content">
          <p>{node.details}</p>
        </div>
      )}
      <div className="arrow" onClick={toggleDrawer}>
        <span>&larr;</span>
      </div>
    </div>
  );
};

export default InfoDrawerRight;
