import React, { useState } from 'react';
import '../styles/InfoDrawerLeft.css';
import { updateCommunicationData, postSubConnection } from '../services/api';

const InfoDrawerLeft = ({ isOpen, node, toggleDrawer, connections }) => {
  const [editing, setEditing] = useState(false);
  const [editedBrief, setEditedBrief] = useState(node?.brief || '');
  const [selectedConnection, setSelectedConnection] = useState('');

  const saveChanges = async () => {
    try {
      await updateCommunicationData(node._id, { brief: editedBrief });
      setEditing(false);
    } catch (error) {
      console.error('Error updating communication:', error);
    }
  };

  const addConnection = async () => {
    try {
      await postSubConnection({ source: node._id, target: selectedConnection, type: 'custom' });
      setSelectedConnection('');
    } catch (error) {
      console.error('Error adding connection:', error);
    }
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
            <p><strong>Brief:</strong></p>
            {editing ? (
              <>
                <textarea value={editedBrief} onChange={(e) => setEditedBrief(e.target.value)} />
                <button onClick={saveChanges}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{node.brief}</p>
                <button onClick={() => setEditing(true)}>Edit</button>
              </>
            )}
            <p><strong>Connections:</strong></p>
            <ul>
              {connections.map((connection, index) => (
                <li key={index}>{connection?.name || 'Unnamed Node'}</li>
              ))}
            </ul>
            <div className="add-connection">
              <select
                value={selectedConnection}
                onChange={(e) => setSelectedConnection(e.target.value)}
              >
                <option value="">Select a node to connect</option>
                {connections.map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.name} (ID: {n._id})
                  </option>
                ))}
              </select>
              <button onClick={addConnection}>Add Connection</button>
            </div>
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
