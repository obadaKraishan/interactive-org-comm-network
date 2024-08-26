import React, { useState, useEffect } from 'react';
import '../styles/InfoDrawerRight.css';
import { postSubConnection } from '../services/api';

const InfoDrawerRight = ({ isOpen, node, toggleDrawer, subItems }) => {
  const [newSubItem, setNewSubItem] = useState('');

  const addSubItem = async () => {
    try {
      await postSubConnection({ source: node._id, target: newSubItem, type: 'sub-item' });
      setNewSubItem('');
    } catch (error) {
      console.error('Error adding sub-item:', error);
    }
  };

  const renderSubItems = (items) => {
    if (!items || items.length === 0) {
      return <p>No sub-items found</p>;
    }

    return items.map((item, index) => (
      <li key={index}>
        {item.name}
        {item.children && item.children.length > 0 && (
          <ul>
            {renderSubItems(item.children)}
          </ul>
        )}
      </li>
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
            <div className="add-sub-item">
              <select
                value={newSubItem}
                onChange={(e) => setNewSubItem(e.target.value)}
              >
                <option value="">Select a sub-item</option>
                {subItems.map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.name} (ID: {n._id})
                  </option>
                ))}
              </select>
              <button onClick={addSubItem}>Add Sub-Item</button>
            </div>
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
