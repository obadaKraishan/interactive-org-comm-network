import React from 'react';
import '../styles/InfoDrawerRight.css';

const InfoDrawerRight = ({ isOpen, node, toggleDrawer, subItems }) => {
  const renderSubItems = (items) => {
    if (!items || items.length === 0) {
      return <p>No sub-items found</p>;
    }

    return items.map((item, index) => (
      <li key={index}>{item.name}</li>
    ));
  };

  return (
    <div>
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
            <p><strong>Sub-Items:</strong></p>
            <ul className="sub-item-list">
              {renderSubItems(subItems)}
            </ul>
          </div>
        )}
      </div>
      {!isOpen && (
        <div className="arrow-right" onClick={toggleDrawer}>
          <span>&larr;</span>
        </div>
      )}
    </div>
  );
};

export default InfoDrawerRight;
