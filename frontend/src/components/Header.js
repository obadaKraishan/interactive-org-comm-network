import React from 'react';
import '../styles/Header.css';

const Header = ({ toggleDrawer }) => {
  return (
    <header className="header">
      <div className="burger-icon" onClick={toggleDrawer}>
        &#9776; {/* HTML Entity for a burger icon */}
      </div>
      <h1 className="header-title">Organizational Communication Network</h1>
    </header>
  );
};

export default Header;
