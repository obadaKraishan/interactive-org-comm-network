import React from 'react';
import '../styles/InfoDrawerLeft.css';

const InfoDrawerLeft = ({ isOpen, node, toggleDrawer, connections }) => {
  const renderConnections = () => {
    if (!connections || connections.length === 0) {
      return <p>No connections found</p>;
    }

    return connections.map((connection, index) => (
      <li key={index}>{connection.name}</li>
    ));
  };

  return (
    <div>
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
            <p><strong>Connections:</strong></p>
            <ul>
              {renderConnections()}
            </ul>
          </div>
        )}
      </div>
      {!isOpen && (
        <div className="arrow-left" onClick={toggleDrawer}>
          <span>&rarr;</span>
        </div>
      )}
    </div>
  );
};

export default InfoDrawerLeft;
