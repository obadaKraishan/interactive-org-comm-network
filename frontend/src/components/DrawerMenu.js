import React, { useState } from 'react';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`drawer-menu ${open ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleDrawer}>
        {open ? 'Close' : 'Menu'}
      </button>
      {open && (
        <nav>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            {/* Add more options or links here */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default DrawerMenu;
