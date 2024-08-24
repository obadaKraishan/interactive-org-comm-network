import React from 'react';
import '../styles/DrawerMenu.css';

const DrawerMenu = ({ isOpen, toggleDrawer }) => {
  return (
    <div className={`drawer-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleDrawer}>×</button>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default DrawerMenu;
